import { Text } from "@mantine/core";
import type { FilteredSearchResults } from "./filterSketches.ts";
import type { OPSketch } from "./opUtils.ts";
import { useMediaQuery } from "@mantine/hooks";

export function FilterStats({
    filteredSketches,
    allData,
}: {
    filteredSketches: FilteredSearchResults;
    allData: OPSketch[];
}) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <Text
            style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "0.2rem",
            }}
        >
            <span style={{ fontWeight: "bold" }}>
                {filteredSketches.items.length}
            </span>{" "}
            / {allData.length} sketches{isDesktop && " match"}.
        </Text>
    );
}
