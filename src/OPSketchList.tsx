import type { JSX } from "react";
import type { FilteredSearchResults } from "./filterSketches.ts";
import { OPSketchCard } from "./OPSketchCard.tsx";

export function OPSketchList({
    filteredSketches,
}: {
    filteredSketches: FilteredSearchResults;
}): JSX.Element {
    return (
        <div className={"sketchCardsList"}>
            {filteredSketches.type === "fuzzySearched"
                ? filteredSketches.items.map((wrapper) => (
                      <OPSketchCard
                          key={wrapper.item.visualID}
                          sketchOrWrapper={{
                              type: "wrapped",
                              wrapper: wrapper,
                          }}
                      />
                  ))
                : filteredSketches.items.map((sketch) => (
                      <OPSketchCard
                          key={sketch.visualID}
                          sketchOrWrapper={{
                              type: "sketch",
                              sketch: sketch,
                          }}
                      />
                  ))}
        </div>
    );
}
