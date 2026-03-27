import type { OPSketch } from "./opUtils.ts";

export async function searchForUserSketches(
    userId: number,
): Promise<OPSketch[]> {
    const baseURL = "https://openprocessing.org";
    const unpaginatedURL = baseURL + `/api/user/${userId}/sketches`;
    let maybeHasMore = false;
    let safetyFetchCount = 0;

    const allData = [];

    do {
        const maxBatchSize = 900;
        const url: string = `${unpaginatedURL}?limit=${maxBatchSize}&offset=${allData.length}`;

        if (allData.length > 0) {
            //delay before next fetch
            const sleepDurationMillis = 1000;
            //TODO: find out if any custom headers are allowed, wanted by API
            // const _optionsWithHeaders: RequestInit = {
            //     headers: {
            //         "X-App-Contact": "neill-at-birbs-nest-discord",
            //         "X-App-Name": "NeillSketchSearch/0.1",
            //     },
            // };
            console.log(
                "waiting " +
                    sleepDurationMillis +
                    " before fetch #" +
                    (safetyFetchCount + 1),
            );
            await sleep(sleepDurationMillis);
        }
        const response = await fetch(url);
        safetyFetchCount++;
        const batchData = await response.json();
        allData.push(...batchData);

        // doesAPIHaveMore(response);

        maybeHasMore = batchData.length === maxBatchSize;
    } while (maybeHasMore && safetyFetchCount < 5);

    //todo: use zod or similar to validate this batchData
    return allData as OPSketch[];
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function doesAPIHaveMore(response: Response): boolean {
    //At the moment can't get custom headers in the browser without a certain header set on server
    const headerRaw = response.headers.get("hasMore");
    return headerRaw !== null && (headerRaw === "true" || headerRaw === "TRUE");
}

export function filterForMatchingNames(
    sketches: OPSketch[],
    searchTerm: string,
): OPSketch[] {
    return sketches.filter((sk) =>
        [sk.title, sk.description].some((field) =>
            field.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );
}

async function sleep(durationMillis: number): Promise<void> {
    await new Promise((resolve) => {
        setTimeout(resolve, durationMillis);
    });
}
