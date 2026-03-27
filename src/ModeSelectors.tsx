import type { JSX } from "react";
import type { OPSketchMode } from "./opUtils.ts";

export function ModeSelectors({
    includeModes,
    setIncludeModes,
}: {
    includeModes: Record<OPSketchMode, boolean>;
    setIncludeModes: React.Dispatch<
        React.SetStateAction<Record<OPSketchMode, boolean>>
    >;
}): JSX.Element {
    return (
        <>
            <ModeSelector
                label={"P5"}
                keyVal={"p5js"}
                includeModes={includeModes}
                setIncludeModes={setIncludeModes}
            />
            <ModeSelector
                label={"html"}
                keyVal={"html"}
                includeModes={includeModes}
                setIncludeModes={setIncludeModes}
            />
            <ModeSelector
                label={"(legacy) Pjs"}
                keyVal={"pjs"}
                includeModes={includeModes}
                setIncludeModes={setIncludeModes}
            />
        </>
    );
}

function ModeSelector({
    label,
    keyVal,
    includeModes,
    setIncludeModes,
}: {
    label: string;
    keyVal: OPSketchMode;
    includeModes: Record<OPSketchMode, boolean>;
    setIncludeModes: React.Dispatch<
        React.SetStateAction<Record<OPSketchMode, boolean>>
    >;
}) {
    return (
        <label>
            {label}
            <input
                type="checkbox"
                checked={includeModes[keyVal]}
                onChange={() =>
                    setIncludeModes((prev) => ({
                        ...prev,
                        [keyVal]: !prev[keyVal],
                    }))
                }
            />
        </label>
    );
}
