import { useQuery } from "@tanstack/react-query";
import { useState, type JSX } from "react";
import { makeSketchURL } from "./opUtils.ts";
import {
    filterForMatchingNames,
    searchForUserSketches,
} from "./searchForUserSketches.ts";
import { SketchResultsMetaData } from "./SketchResultsMetaData.tsx";

export function OpenProcessingSketchSearch(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState("");
    const [userId, setUserId] = useState(135249);

    const { data, isPending, error, refetch, fetchStatus } = useQuery({
        queryKey: ["sketches", userId],
        queryFn: () => searchForUserSketches(userId),
        enabled: false,
    });

    const filteredSketches = data
        ? filterForMatchingNames(data, searchTerm)
        : [];

    return (
        <section>
            <h2>OpenProcessing Sketch Search</h2>
            <div className="searchInputs">
                <input
                    type="text"
                    onChange={(e) => setUserId(parseInt(e.target.value))}
                    value={userId}
                    placeholder={"userID"}
                />
                <input
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    placeholder={"search term"}
                />
                <button onClick={() => refetch()}>search</button>
            </div>
            <div>
                <div>
                    Fetch Status: {fetchStatus}. {isPending ? "PENDING" : "-"}
                </div>
                <div>
                    {error ? "ERROR: " + JSON.stringify(error) : "no error"}
                </div>
            </div>
            <SketchResultsMetaData searchResults={filteredSketches} />
            <div>
                {filteredSketches.map((sketch) => {
                    return (
                        <div
                            className="sketchSearchResult"
                            key={sketch.visualID}
                        >
                            <div>
                                <a href={makeSketchURL(sketch.visualID)}>
                                    {sketch.visualID}
                                </a>
                            </div>
                            <div>{sketch.title}</div>
                            <div>{sketch.description}</div>
                            <div>{sketch.mode}</div>
                            <div>{sketch.updatedOn}</div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
