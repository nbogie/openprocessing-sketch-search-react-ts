import { useQuery } from "@tanstack/react-query";
import { useState, type JSX } from "react";
import {
    filterForMatchingNames,
    searchForUserSketches,
} from "./searchForUserSketches.ts";
import { SketchResultsMetaData } from "./SketchResultsMetaData.tsx";
import { OPSketchCard } from "./OPSketchCard.tsx";

export function OPSketchSketchSearch(): JSX.Element {
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
                userID:{" "}
                <input
                    type="text"
                    onChange={(e) => setUserId(parseInt(e.target.value))}
                    value={userId}
                    placeholder={"userID"}
                />
                <button onClick={() => refetch()}>Get all sketches</button>
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
            <SketchResultsMetaData searchResults={filteredSketches} />
            <div className={"sketchCardsList"}>
                {filteredSketches.map((sketch) => {
                    return (
                        <OPSketchCard key={sketch.visualID} sketch={sketch} />
                    );
                })}
            </div>
        </section>
    );
}
