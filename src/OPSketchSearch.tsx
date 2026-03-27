import { useQuery } from "@tanstack/react-query";
import { useState, type JSX } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ExportControls } from "./ExportControls.tsx";
import {
    exportFilteredListToClipboard,
    type ExportFormat,
} from "./exportFilteredList.ts";
import { OPSketchCard } from "./OPSketchCard.tsx";
import {
    filterForMatchingNames,
    searchForUserSketches,
} from "./searchForUserSketches.ts";
import { SketchResultsMetaData } from "./SketchResultsMetaData.tsx";

export function OPSketchSketchSearch(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState("");

    const [userId, setUserId, removeUserIdFromLocalStorage] =
        useLocalStorage<number>("userId", 0);

    const { data, isPending, error, refetch, fetchStatus } = useQuery({
        queryKey: ["sketches", userId],
        queryFn: () => searchForUserSketches(userId),
        enabled: false,
    });

    //TODO: don't search with missing or invalid userId
    const filteredSketches = data
        ? filterForMatchingNames(data, searchTerm)
        : [];

    return (
        <main>
            <h1>OpenProcessing Sketch Search</h1>
            <div className="searchInputs">
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
                        <button onClick={removeUserIdFromLocalStorage}>
                            Remove userId from localStorage
                        </button>
                    </>
                )}
                <div>
                    <div>
                        Fetch Status: {fetchStatus}.{" "}
                        {isPending ? "PENDING" : "-"}
                    </div>
                    <div>
                        {error ? "ERROR: " + JSON.stringify(error) : "no error"}
                    </div>
                </div>
            </div>

            <div>
                Filter sketches:{" "}
                <input
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    placeholder={"search term"}
                />
            </div>
            <ExportControls
                exportControls={{
                    exportFilteredList: (fmt: ExportFormat) =>
                        exportFilteredListToClipboard(filteredSketches, fmt),
                }}
            />
            <SketchResultsMetaData searchResults={filteredSketches} />
            <div>
                {data && (
                    <>
                        Showing {filteredSketches.length}/{data.length} sketches
                    </>
                )}
            </div>
            <div className={"sketchCardsList"}>
                {filteredSketches.map((sketch) => {
                    return (
                        <OPSketchCard key={sketch.visualID} sketch={sketch} />
                    );
                })}
            </div>
        </main>
    );
}
