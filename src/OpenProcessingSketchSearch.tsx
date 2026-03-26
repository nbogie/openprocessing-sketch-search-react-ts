import { useState, type JSX } from "react";
import { searchForUserSketches } from "./searchForUserSketches.ts";

//finding: tags are not included on the search result items
export interface OPSketch {
    visualID: number;
    title: string;
    description: string;
    instructions: string;
    isPrivate: number;
    isDraft: number;
    createdOn: string;
    updatedOn: string;
    mode: string; //"p5js" | ?
}
function makeSketchURL(visualID: number): string {
    return "https://openprocessing.org/sketch/" + visualID;
}

export function OpenProcessingSketchSearch(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState("");
    const [userId, setUserId] = useState(135249);

    const [searchResults, setSearchResults] = useState<OPSketch[]>([]);

    async function handleSearchClick() {
        if (userId <= 0) {
            return;
        }
        //TODO: go through a local storage cache, don't hit the API every time!
        const userSketches = await searchForUserSketches(userId, searchTerm);

        setSearchResults(userSketches);
    }

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
                <button onClick={handleSearchClick}>search</button>
            </div>
            <div>
                Results meta-data
                <SketchResultsMetaData searchResults={searchResults} />
            </div>
            <div>
                {searchResults.map((sketch) => {
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
