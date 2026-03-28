import type { JSX } from "react";
import type { FilteredSearchResults } from "./filterSketches.ts";
import { OPSketchCard } from "./OPSketchCard.tsx";
import { SimpleGrid } from "@mantine/core";

export function OPSketchList({
    filteredSketches,
}: {
    filteredSketches: FilteredSearchResults;
}): JSX.Element {
    return (
        <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing={{ base: 10, sm: "md" }}
        >
            {filteredSketches.type === "fuzzySearched"
                ? filteredSketches.items.map((wrapper) => (
                      <OPSketchCard
                          key={wrapper.item.visualID}
                          sketchOrWrapper={{
                              type: "wrapped",
                              wrapper,
                          }}
                      />
                  ))
                : filteredSketches.items.map((sketch) => (
                      <OPSketchCard
                          key={sketch.visualID}
                          sketchOrWrapper={{
                              type: "sketch",
                              sketch,
                          }}
                      />
                  ))}
        </SimpleGrid>
    );
}
