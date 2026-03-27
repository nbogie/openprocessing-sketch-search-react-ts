import type { JSX } from "react";
import { type OPSketch } from "./opUtils.ts";
import { SketchLink } from "./SketchLink.tsx";

export function OPSketchCard({ sketch }: { sketch: OPSketch }): JSX.Element {
    return (
        <div className="sketchCard" key={sketch.visualID}>
            <div className="titleRow">
                <SketchLink text={sketch.visualID.toString()} sketch={sketch} />
                <div className="title">{sketch.title}</div>
            </div>
            <div>{sketch.description}</div>
            <div>{sketch.mode}</div>
            <div>{sketch.updatedOn}</div>
        </div>
    );
}
