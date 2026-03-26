import type { JSX } from "react";
import type { OPSketch } from "./OpenProcessingSketchSearch.tsx";

export function SketchResultsMetaData({
    searchResults,
}: {
    searchResults: OPSketch[];
}): JSX.Element {
    return (
        <div>
            <h3>Searcxh results meta data</h3>
            <div>user id: </div>
            <div>search term: </div>
            <div>num results: {searchResults.length}</div>
            <div>earliest creation: </div>
            <div>latest creation: </div>
            <div>most recently updated: </div>
        </div>
    );
}
