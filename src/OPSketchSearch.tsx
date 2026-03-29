import {
    Anchor,
    Button,
    Checkbox,
    Fieldset,
    Group,
    SimpleGrid,
    Stack,
    Text,
    TextInput,
    Tooltip,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconCancel } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState, type JSX } from "react";
import { toast } from "sonner";
import {
    exportFilteredListToClipboard,
    type ExportFormat,
} from "./exportFilteredList.ts";
import { ExportSplitButton } from "./ExportSplitButton.tsx";
import { fetchAllUserSketches } from "./fetchAllUserSketches.ts";
import { FetchButton } from "./FetchButton.tsx";
import {
    extractOPSketchesFromSearchResults,
    filterForMatchingNames,
    fuzzyFilterForMatchingNames,
    type FilteredSearchResults,
} from "./filterSketches.ts";
import { FilterStats } from "./FilterStats.tsx";
import { ModeSelectors } from "./ModeSelectors.tsx";
import { OPSketchList } from "./OPSketchList.tsx";
import type { OPSketch, OPSketchMode } from "./opUtils.ts";
import { UserIdInput } from "./UserIdInput.tsx";

export function OPSketchSearch(): JSX.Element {
    const isDevMode = import.meta.env.DEV;

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

    const { data, error, refetch, fetchStatus } = useQuery({
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

    function handleExportFilteredList(fmt: ExportFormat) {
        exportFilteredListToClipboard(
            extractOPSketchesFromSearchResults(filteredSketches),
            fmt,
        );
        toast.success(
            `Copied ${filteredSketches.items.length} sketch infos to clipboard`,
            {
                description: `Used ${fmt} format`,
            },
        );
    }
    //A flag indicating there ARE sketches that could be shown but between the filter term and the mode toggles, we've narrowed it to zero!
    const isOverFiltering =
        data !== undefined &&
        data.length > 0 &&
        filteredSketches.items.length === 0;

    return (
        <main>
            <Stack>
                <SimpleGrid
                    cols={2}
                    style={{
                        alignItems: "stretch", // Pushes all cells to the bottom of their row
                        justifyItems: "stretch", // Pushes all cells to the right of their column
                    }}
                >
                    {error && (
                        <>
                            <Text>ERROR: </Text>
                            <Text>{error.message}</Text>
                        </>
                    )}

                    <UserIdInput userId={userId} setUserId={setUserId} />
                    {userId > 0 && (
                        <FetchButton
                            fetchStatus={fetchStatus}
                            data={data}
                            refetchWithToast={refetchWithToast}
                        />
                    )}

                    <Group style={{ alignItems: "flex-end" }}>
                        <Tooltip label="Use fuzzy search?" openDelay={500}>
                            <Checkbox
                                label="Fuzzy search?"
                                type="checkbox"
                                checked={useFuzzySearch}
                                onChange={() =>
                                    setUseFuzzySearch((prev) => !prev)
                                }
                            />
                        </Tooltip>
                        <TextInput
                            w="100%"
                            style={
                                isOverFiltering
                                    ? {
                                          outline:
                                              "2px dashed  var(--mantine-color-yellow-6)",
                                          transition: "outline 0.5s ease",
                                      }
                                    : {}
                            }
                            leftSection="Filter: "
                            leftSectionWidth="6ch"
                            //TODO: really necessary? (prevent left section capturing clicks)
                            styles={{ section: { pointerEvents: "none" } }}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            placeholder="search term"
                        />
                    </Group>
                    <ModeSelectors
                        isOverFiltering={isOverFiltering}
                        includeModes={includeModes}
                        setIncludeModes={setIncludeModes}
                    />
                    {data && (
                        <>
                            <FilterStats
                                filteredSketches={filteredSketches}
                                allData={data}
                            />

                            <ExportSplitButton
                                exportControls={{
                                    exportFilteredList:
                                        handleExportFilteredList,
                                }}
                            />
                        </>
                    )}
                </SimpleGrid>

                <OPSketchList filteredSketches={filteredSketches} />

                <footer style={{ alignSelf: "stretch" }}>
                    <hr />
                    {isDevMode && (
                        <Fieldset legend="dev stuff">
                            <Stack style={{ alignItems: "flex-start" }}>
                                <Button
                                    variant="default"
                                    onClick={() => {
                                        removeUserIdFromLocalStorage();
                                        toast.success("Removed!", {
                                            description:
                                                "Removed userID from localStorage",
                                        });
                                    }}
                                    leftSection={<IconCancel />}
                                >
                                    Remove userId from localStorage
                                </Button>
                                <Anchor
                                    href="https://mantine.dev/core/package/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Mantine components
                                </Anchor>
                                <Anchor
                                    href="https://tabler.io/icons"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    tabler.io/icons
                                </Anchor>
                            </Stack>
                        </Fieldset>
                    )}
                    <Anchor href="https://github.com/nbogie/openprocessing-sketch-search-react-ts">
                        Source on github
                    </Anchor>
                </footer>
            </Stack>
        </main>
    );
}
