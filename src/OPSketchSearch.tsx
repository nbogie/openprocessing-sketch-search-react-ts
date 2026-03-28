import { Button, NumberInput } from "@mantine/core";
import { IconCloudDown, IconRepeat } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState, type JSX } from "react";
import { toast } from "sonner";
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
import { ModeSelectors } from "./ModeSelectors.tsx";
import { OPSketchList } from "./OPSketchList.tsx";
import type { OPSketch, OPSketchMode } from "./opUtils.ts";
import { SketchResultsMetaData } from "./SketchResultsMetaData.tsx";

export function OPSketchSearch(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState("");
    const [useFuzzySearch, setUseFuzzySearch] = useState(false);

    type ModeCheckboxStates = Record<OPSketchMode, boolean>;

    const [includeModes, setIncludeModes] = useState<ModeCheckboxStates>({
        p5js: false,
        html: false,
        pjs: false,
    });

    const [userId, setUserId, removeUserIdFromLocalStorage] =
        useLocalStorage<number>("userId", 0);

    const { data, isPending, error, refetch, fetchStatus } = useQuery({
        queryKey: ["sketches", userId],
        queryFn: () => fetchAllUserSketches(userId),
        enabled: false,
        retry: false,
    });

    async function refetchWithToast() {
        //We will run our tanstack query's refetch,
        // but as we need to pass the refetch's promise to toast.promise
        //we need to call it different so it throws on error.
        //(toast.promise will handle the error for us)

        // Use throwOnError to make the promise reject on failure
        const fetchPromise = refetch({ throwOnError: true });

        toast.promise(fetchPromise, {
            loading: `Loading all sketches for ${userId}...`,
            success: `Sketches loaded for ${userId}!`,
            error: (err: Error) => `Failed: ${err.message}.  See console.`,
        });
    }

    function sketchesMatchingModes(sketch: OPSketch) {
        const { p5js, html, pjs } = includeModes;

        if (!html && !p5js && !pjs) {
            return true;
        }
        return includeModes[sketch.mode];
    }
    const sketchesFilteredToModes: OPSketch[] = data
        ? data.filter(sketchesMatchingModes)
        : [];
    const filteredSketches: FilteredSearchResults = data
        ? useFuzzySearch
            ? fuzzyFilterForMatchingNames(sketchesFilteredToModes, searchTerm)
            : filterForMatchingNames(sketchesFilteredToModes, searchTerm)
        : { type: "exactSearched", items: [] as OPSketch[] };

    return (
        <main>
            <div className="inputsRow">
                <NumberInput
                    // label="User ID"
                    // description="id of openprocessing user to get sketches for"
                    placeholder="userID"
                    min={1}
                    max={9999999999}
                    allowNegative={false}
                    allowDecimal={false}
                    allowLeadingZeros={false}
                    onChange={(strOrNum) => {
                        if (typeof strOrNum === "number") {
                            setUserId(strOrNum);
                        } else {
                            setUserId(0);
                        }
                    }}
                    // if it's zero or undefined
                />
                {userId > 0 && (
                    <>
                        <Button
                            variant="default"
                            leftSection={
                                data ? (
                                    <IconRepeat size={20} />
                                ) : (
                                    <IconCloudDown size={20} />
                                )
                            }
                            onClick={() => refetchWithToast()}
                        >
                            {data === undefined ? (
                                <>Fetch all sketches from API</>
                            ) : (
                                <>Re-fetch all sketches from API!</>
                            )}
                        </Button>
                    </>
                )}
                <div>
                    <div>
                        <div>Fetch Status: {fetchStatus}</div>
                        <div>
                            {isPending ? "No fetch yet." : "Data loaded."}
                        </div>
                    </div>
                    <div>{error ? `ERROR: ${error.message}` : <>&nbsp;</>}</div>
                </div>
            </div>

            <div className="inputsRow">
                Filter sketches:{" "}
                <input
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    placeholder="search term"
                />
                <label>
                    Fuzzy?
                    <input
                        type="checkbox"
                        checked={useFuzzySearch}
                        onChange={() => setUseFuzzySearch((prev) => !prev)}
                    />
                </label>
                <ModeSelectors
                    includeModes={includeModes}
                    setIncludeModes={setIncludeModes}
                />
                {data && (
                    <>
                        <div>
                            Showing{" "}
                            <span style={{ fontWeight: "bold" }}>
                                {filteredSketches.items.length}
                            </span>{" "}
                            / {data.length} sketches.
                        </div>
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
                <button type="button" onClick={removeUserIdFromLocalStorage}>
                    Remove userId from localStorage
                </button>
            </footer>
        </main>
    );
}
