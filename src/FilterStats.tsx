import { Text } from "@mantine/core";
import type { FilteredSearchResults } from "./filterSketches.ts";
import type { OPSketch } from "./opUtils.ts";

export function FilterStats({
    filteredSketches,
    allData,
}: {
    filteredSketches: FilteredSearchResults;
    allData: OPSketch[];
}) {
    return (
        <Text w="27ch">
            Showing{" "}
            <span style={{ fontWeight: "bold" }}>
                {filteredSketches.items.length}
            </span>{" "}
            / {allData.length} sketches.
        </Text>
    );
}
