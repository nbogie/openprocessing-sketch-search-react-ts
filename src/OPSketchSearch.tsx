import {
    Button,
    Checkbox,
    Group,
    NavLink,
    NumberInput,
    TextInput,
    Tooltip,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconCancel, IconCloudDown, IconRepeat } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState, type JSX } from "react";
import { toast } from "sonner";
import { ExportSplitButton } from "./ExportControls.tsx";
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
        useLocalStorage<number>({ key: "userId", defaultValue: 0 });
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
            <Group>
                <NumberInput
                    // label="User ID"
                    // description="id of openprocessing user to get sketches for"
                    leftSection="userid: "
                    leftSectionWidth="8ch"
                    hideControls
                    placeholder="userID"
                    min={1}
                    max={9999999999}
                    key="userIdInput"
                    value={userId}
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
            </Group>

            <Group align="flex-end">
                <TextInput
                    label="Filter sketches"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    placeholder="search term"
                />
                <Tooltip label="Use fuzzy search?" openDelay={500}>
                    <Checkbox
                        label="Fuzzy?"
                        type="checkbox"
                        checked={useFuzzySearch}
                        onChange={() => setUseFuzzySearch((prev) => !prev)}
                    />
                </Tooltip>
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
            </Group>
            <ExportSplitButton
                exportControls={{
                    exportFilteredList: (fmt: ExportFormat) => {
                        exportFilteredListToClipboard(
                            extractOPSketchesFromSearchResults(
                                filteredSketches,
                            ),
                            fmt,
                        );
                        toast.success(
                            `Copied ${filteredSketches.items.length} sketch infos to clipboard`,
                            { description: `Used ${fmt} format` },
                        );
                    },
                }}
            />
            <Group>
                <SketchResultsMetaData
                    searchResults={extractOPSketchesFromSearchResults(
                        filteredSketches,
                    )}
                />
            </Group>

            <OPSketchList filteredSketches={filteredSketches} />

            <footer style={{ alignSelf: "stretch" }}>
                <hr />
                <Button
                    variant="default"
                    onClick={() => {
                        removeUserIdFromLocalStorage();
                        toast.success("Removed!", {
                            description: "Removed userID from localStorage",
                        });
                    }}
                    leftSection={<IconCancel />}
                >
                    Remove userId from localStorage
                </Button>
                <NavLink
                    href="https://tabler.io/icons"
                    label="browse tabler.io/icons"
                    target="_blank"
                />
            </footer>
        </main>
    );
}
