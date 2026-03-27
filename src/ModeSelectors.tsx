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
            <label>
                P5
                <input
                    type="checkbox"
                    checked={includeModes.p5js}
                    onChange={() =>
                        setIncludeModes((prev) => ({
                            ...prev,
                            p5js: !prev.p5js,
                        }))
                    }
                />
            </label>
            <label>
                html
                <input
                    type="checkbox"
                    checked={includeModes.html}
                    onChange={() =>
                        setIncludeModes((prev) => ({
                            ...prev,
                            html: !prev.html,
                        }))
                    }
                />
            </label>
            <label>
                (legacy) Pjs
                <input
                    type="checkbox"
                    checked={includeModes.pjs}
                    onChange={() =>
                        setIncludeModes((prev) => ({
                            ...prev,
                            pjs: !prev.pjs,
                        }))
                    }
                />
            </label>
        </>
    );
}
