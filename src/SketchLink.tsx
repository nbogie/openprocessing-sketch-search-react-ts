import type { JSX } from "react";
import { makeSketchURL, type OPSketch } from "./opUtils.ts";

export function SketchLink({ sketch }: { sketch: OPSketch }): JSX.Element {
    return (
        <a href={makeSketchURL(sketch.visualID)}>
            {sketch.visualID}: {sketch.title}
        </a>
    );
}
