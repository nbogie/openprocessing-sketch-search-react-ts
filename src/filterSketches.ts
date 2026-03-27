import Fuse, { type FuseResult } from "fuse.js";
import type { OPSketch } from "./opUtils.ts";

export type FilteredSearchResults =
    | { type: "fuzzySearched"; items: FuseResult<OPSketch>[] }
    | { type: "exactSearched"; items: OPSketch[] };

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
