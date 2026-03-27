import type { JSX } from "react";
import { type OPSketch, makeSketchURL } from "./opUtils.ts";

export function OPSketchCard({ sketch }: { sketch: OPSketch }): JSX.Element {
    return (
        <div className="sketchCard" key={sketch.visualID}>
            <div className="titleRow">
                <a
                    style={{ fontSize: "smaller" }}
                    href={makeSketchURL(sketch.visualID)}
                >
                    {sketch.visualID}
                </a>
                <div className="title">{sketch.title}</div>
            </div>
            <div>{sketch.description}</div>
            <div>{sketch.mode}</div>
            <div>{sketch.updatedOn}</div>
        </div>
    );
}
