import { useQuery } from "@tanstack/react-query";
import { useState, type JSX } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ExportControls } from "./ExportControls.tsx";
import {
    exportFilteredListToClipboard,
    type ExportFormat,
} from "./exportFilteredList.ts";
import { fetchAllUserSketches } from "./fetchAllUserSketches.ts";
import {
    extractOPSketchesFromSearchResults,
    filterForMatchingNames,
    fuzzyFilterForMatchingNames,
    type FilteredSearchResults,
} from "./filterSketches.ts";
import { OPSketchList } from "./OPSketchList.tsx";
import type { OPSketch } from "./opUtils.ts";
import { SketchResultsMetaData } from "./SketchResultsMetaData.tsx";

export function OPSketchSketchSearch(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState("");
    const [useFuzzySearch, setUseFuzzySearch] = useState(false);
    const [userId, setUserId, removeUserIdFromLocalStorage] =
        useLocalStorage<number>("userId", 0);

    const { data, isPending, error, refetch, fetchStatus } = useQuery({
        queryKey: ["sketches", userId],
        queryFn: () => fetchAllUserSketches(userId),
        enabled: false,
        retry: false,
    });

    const filteredSketches: FilteredSearchResults = data
        ? useFuzzySearch
            ? fuzzyFilterForMatchingNames(data, searchTerm)
            : filterForMatchingNames(data, searchTerm)
        : { type: "exactSearched", items: [] as OPSketch[] };

    return (
        <main>
            <h1>OpenProcessing Sketch Search</h1>
            <div className="inputsRow">
                userID:{" "}
                <input
                    type="text"
                    onChange={(e) => setUserId(parseInt(e.target.value))}
                    // if it's zero or undefined
                    value={userId || ""}
                    placeholder={"userID"}
                />
                {userId && (
                    <>
                        <button onClick={() => refetch()}>
                            {data === undefined ? (
                                <>Fetch all sketches from API</>
                            ) : (
                                <>Re-fetch all sketches from API!</>
                            )}
                        </button>
                    </>
                )}
                <div>
                    <div>
                        <div>Fetch Status: {fetchStatus}</div>
                        <div>
                            {isPending ? "No fetch yet." : "Data loaded."}
                        </div>
                    </div>
                    <div>{error ? "ERROR: " + error.message : <>&nbsp;</>}</div>
                </div>
            </div>

            <div className="inputsRow">
                Filter sketches:{" "}
                <input
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    placeholder={"search term"}
                />
                <label>
                    Fuzzy?
                    <input
                        type="checkbox"
                        checked={useFuzzySearch}
                        onChange={() => setUseFuzzySearch((prev) => !prev)}
                    />
                </label>
                {data && (
                    <>
                        Showing {filteredSketches.items.length}/{data.length}{" "}
                        sketches
                    </>
                )}
            </div>
            <ExportControls
                exportControls={{
                    exportFilteredList: (fmt: ExportFormat) => {
                        return exportFilteredListToClipboard(
                            extractOPSketchesFromSearchResults(
                                filteredSketches,
                            ),
                            fmt,
                        );
                    },
                }}
            />
            <SketchResultsMetaData
                searchResults={extractOPSketchesFromSearchResults(
                    filteredSketches,
                )}
            />

            <OPSketchList filteredSketches={filteredSketches} />

            <footer style={{ alignSelf: "stretch" }}>
                <hr />
                <button onClick={removeUserIdFromLocalStorage}>
                    Remove userId from localStorage
                </button>
            </footer>
        </main>
    );
}
