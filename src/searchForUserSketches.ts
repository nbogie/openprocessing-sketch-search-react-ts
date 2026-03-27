import Fuse, { type FuseResult } from "fuse.js";
import type { OPSketch } from "./opUtils.ts";

export type FilteredSearchResults =
    | { type: "fuzzySearched"; items: FuseResult<OPSketch>[] }
    | { type: "exactSearched"; items: OPSketch[] };

export async function searchForUserSketches(
    userId: number,
): Promise<OPSketch[]> {
    if (userId <= 0) {
        throw new Error("Can't search for nonsense userId: " + userId);
    }

    const baseURL = "https://openprocessing.org";
    const unpaginatedURL = baseURL + `/api/user/${userId}/sketches`;
    let maybeHasMore = false;
    let safetyFetchCount = 0;

    const allData = [];

    do {
        const maxBatchSize = 980;
        const url: string = `${unpaginatedURL}?limit=${maxBatchSize}&offset=${allData.length}`;

        if (allData.length > 0) {
            const sleepDurationMillis = 1000;
            await sleep(sleepDurationMillis);
        }
        const addIdentifyingHeaders = false; //not supported by openprocessing at the moment
        const requestInit = addIdentifyingHeaders
            ? makeIdentifyingHeadersAndInit()
            : {};
        const response = await fetch(url, requestInit);
        safetyFetchCount++;
        const batchData = await response.json();
        allData.push(...batchData);

        maybeHasMore = batchData.length === maxBatchSize;
    } while (maybeHasMore && safetyFetchCount < 5);

    //todo: use zod or similar to validate this returned data
    return allData as OPSketch[];
}

// function doesAPIHaveMore(response: Response): boolean {
//     //At the moment can't get custom headers in the browser without a certain header set on server
//     const headerRaw = response.headers.get("hasMore");
//     return headerRaw !== null && headerRaw.toLowerCase() === "true";
// }

async function sleep(durationMillis: number): Promise<void> {
    await new Promise((resolve) => {
        setTimeout(resolve, durationMillis);
    });
}

function makeIdentifyingHeadersAndInit(): RequestInit {
    //TODO: find out if any custom headers are allowed, wanted by API
    return {
        headers: {
            "X-App-Contact": "neill-at-birbs-nest-discord",
            "X-App-Name": "NeillSketchSearch/0.1",
        },
    };
}

export function fuzzyFilterForMatchingNames(
    sketches: OPSketch[],
    searchPattern: string,
): FilteredSearchResults {
    if (!searchPattern) {
        return { type: "exactSearched", items: sketches };
    }
    //https://www.fusejs.io/demo.html
    const fuseOptions = {
        isCaseSensitive: false,
        includeScore: true,
        // ignoreDiacritics: false,
        shouldSort: true,
        //include the indices of the matched characters (for highlighting)
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        //exact match
        // distance: 300,
        // useExtendedSearch: false,
        ignoreLocation: true,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: ["title", "description"] satisfies (keyof OPSketch)[],
    };
    //TODO: memoize this - if we can cap memory usage?
    const fuse = new Fuse(sketches, fuseOptions);

    const rawResults = fuse.search(searchPattern);

    return {
        type: "fuzzySearched",
        items: rawResults,
    };
}

export function filterForMatchingNames(
    sketches: OPSketch[],
    searchTerm: string,
): FilteredSearchResults {
    return {
        type: "exactSearched",
        items: sketches.filter((sk) =>
            [sk.title, sk.description].some((field) =>
                field.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        ),
    };
}

export function extractOPSketchesFromSearchResults(
    filteredSketches: FilteredSearchResults,
): OPSketch[] {
    if (filteredSketches.type === "exactSearched") {
        return filteredSketches.items;
    }

    return filteredSketches.items.map((wrappedItem) => wrappedItem.item);
}
