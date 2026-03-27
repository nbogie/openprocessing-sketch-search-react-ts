import type { FuseResult } from "fuse.js";
import type { JSX } from "react";
import { type OPSketch } from "./opUtils.ts";
import { SketchLink } from "./SketchLink.tsx";

export function OPSketchCard({
    sketchOrWrapper,
}: {
    sketchOrWrapper:
        | { type: "wrapped"; wrapper: FuseResult<OPSketch> }
        | { type: "sketch"; sketch: OPSketch };
}): JSX.Element {
    const sketch =
        sketchOrWrapper.type === "wrapped"
            ? sketchOrWrapper.wrapper.item
            : sketchOrWrapper.sketch;
    const wrapper =
        sketchOrWrapper.type === "wrapped"
            ? sketchOrWrapper.wrapper
            : undefined;
    return (
        <div className="sketchCard" key={sketch.visualID}>
            {/* {wrapper && (
                <>
                    <div>Score: {wrapper.score}</div>
                </>
            )} */}
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
