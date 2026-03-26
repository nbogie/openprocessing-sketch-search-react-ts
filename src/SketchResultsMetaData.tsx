import { boil } from "radash";
import type { JSX } from "react";
import { SketchLink } from "./SketchLink.tsx";
import type { OPSketch } from "./opUtils.ts";

export function SketchResultsMetaData({
    searchResults,
}: {
    searchResults: OPSketch[];
}): JSX.Element {
    const latestCreation = boil(searchResults, (s1, s2) =>
        s1.createdOn > s2.createdOn ? s1 : s2,
    );
    const firstCreation = boil(searchResults, (s1, s2) =>
        s1.createdOn < s2.createdOn ? s1 : s2,
    );
    const mostRecentUpdate = boil(searchResults, (s1, s2) =>
        s1.updatedOn > s2.updatedOn ? s1 : s2,
    );

    return (
        <div>
            <h3>Search results meta data</h3>
            <div>user id: </div>
            <div>search term: </div>
            <div>num results: {searchResults.length}</div>
            <div>
                first: {firstCreation && <SketchLink sketch={firstCreation} />}
            </div>
            <div>
                latest:{" "}
                {latestCreation && <SketchLink sketch={latestCreation} />}
            </div>
            <div>
                most recent update:{" "}
                {mostRecentUpdate && <SketchLink sketch={mostRecentUpdate} />}
            </div>
        </div>
    );
}
