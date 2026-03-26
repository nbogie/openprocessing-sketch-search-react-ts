import type { JSX } from "react";
import { type OPSketch, makeSketchURL } from "./opUtils.ts";

export function OPSketchCard({ sketch }: { sketch: OPSketch }): JSX.Element {
    return (
        <div className="sketchSearchResult" key={sketch.visualID}>
            <div>
                <a href={makeSketchURL(sketch.visualID)}>{sketch.visualID}</a>
            </div>
            <div>{sketch.title}</div>
            <div>{sketch.description}</div>
            <div>{sketch.mode}</div>
            <div>{sketch.updatedOn}</div>
        </div>
    );
}
