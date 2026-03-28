import type { JSX } from "react";
import { makeSketchURL, type OPSketch } from "./opUtils.ts";

export function SketchLink({
    sketch,
    text,
}: {
    text?: string;
    sketch: OPSketch;
}): JSX.Element {
    return (
        <a
            href={makeSketchURL(sketch.visualID)}
            target="_blank"
            rel="noopener noreferrer"
        >
            {text ? (
                text
            ) : (
                <>
                    {sketch.visualID}: {sketch.title}
                </>
            )}
        </a>
    );
}
