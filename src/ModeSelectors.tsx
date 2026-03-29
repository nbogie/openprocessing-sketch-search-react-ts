import { Checkbox, Fieldset, Group, Tooltip } from "@mantine/core";
import type { JSX } from "react";
import type { OPSketchMode } from "./opUtils.ts";
import { useMediaQuery } from "@mantine/hooks";

export function ModeSelectors({
    includeModes,
    setIncludeModes,
}: {
    includeModes: Record<OPSketchMode, boolean>;
    setIncludeModes: React.Dispatch<
        React.SetStateAction<Record<OPSketchMode, boolean>>
    >;
}): JSX.Element {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <Fieldset
            legend={isDesktop ? "Filter by sketch mode" : "sketch mode"}
            style={{ alignItems: "flex-end" }}
        >
            <Group style={{ alignItems: "flex-end" }}>
                <ModeSelector
                    label="P5"
                    keyVal="p5js"
                    tooltipLabel="include p5.js sketches"
                    includeModes={includeModes}
                    setIncludeModes={setIncludeModes}
                />
                <ModeSelector
                    label="html"
                    keyVal="html"
                    tooltipLabel="include html/css/js sketches"
                    includeModes={includeModes}
                    setIncludeModes={setIncludeModes}
                />
                <ModeSelector
                    label="(legacy) Pjs"
                    keyVal="pjs"
                    tooltipLabel="include legacy Pjs sketches"
                    includeModes={includeModes}
                    setIncludeModes={setIncludeModes}
                />
            </Group>
        </Fieldset>
    );
}

function ModeSelector({
    label,
    keyVal,
    tooltipLabel,
    includeModes,
    setIncludeModes,
}: {
    label: string;
    keyVal: OPSketchMode;
    tooltipLabel: string;
    includeModes: Record<OPSketchMode, boolean>;
    setIncludeModes: React.Dispatch<
        React.SetStateAction<Record<OPSketchMode, boolean>>
    >;
}) {
    return (
        <Tooltip label={tooltipLabel} refProp="rootRef" openDelay={500}>
            <Checkbox
                checked={includeModes[keyVal]}
                // onChange={(event) => setChecked(event.currentTarget.checked)}
                onChange={() =>
                    setIncludeModes((prev) => ({
                        ...prev,
                        [keyVal]: !prev[keyVal],
                    }))
                }
                label={label}
            />
        </Tooltip>
    );
}
