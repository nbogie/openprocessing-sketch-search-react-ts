import { toast } from "sonner";
import type { OPSketch } from "./opUtils.ts";

export async function fetchAllUserSketches(
    userId: number,
): Promise<OPSketch[]> {
    if (userId <= 0) {
        throw new Error(`Can't search for nonsense userId: ${userId}`);
    }

    const baseURL = "https://openprocessing.org";
    const unpaginatedURL = `${baseURL}/api/user/${userId}/sketches`;
    let maybeHasMore = false;
    let safetyFetchCount = 0;

    const allData = [];

    do {
        const maxBatchSize = 980;
        const url: string = `${unpaginatedURL}?limit=${maxBatchSize}&offset=${allData.length}`;

        if (safetyFetchCount > 0) {
            const sleepDurationMillis = 1000;
            await sleep(sleepDurationMillis);
        }
        const addIdentifyingHeaders = false; //not supported by openprocessing at the moment
        const requestInit = addIdentifyingHeaders
            ? makeIdentifyingHeadersAndInit()
            : {};
        safetyFetchCount++;
        const response = await fetch(url, requestInit);
        const batchData = await response.json();
        allData.push(...batchData);

        maybeHasMore = batchData.length === maxBatchSize;
    } while (maybeHasMore && safetyFetchCount < 3);

    //todo: use zod or similar to validate this returned data
    return allData.reverse() as OPSketch[];
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

type OPSketchWithUserID = {
    userID: number;
};
export async function fetchSketchBySketchId(
    sketchId: number,
): Promise<OPSketchWithUserID | null> {
    const baseURL = "https://openprocessing.org";
    const url = `${baseURL}/api/sketch/${sketchId}`;

    //TODO: handle errors here
    try {
        const response = await fetch(url);
        const data = await response.json();
        //TODO: verify with zod.  our only use case atm is that it has a userID - a number.
        if (typeof data === "object" && "userID" in data) {
            return data;
        }
    } catch (err) {
        toast(`error fetching sketch info for ${sketchId}`);
        // console.log("error whilst fetching sketch data from API: ", err);
        return null;
    }

    return null;
}
