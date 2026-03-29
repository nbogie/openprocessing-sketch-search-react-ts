import { Checkbox, Fieldset, Group, Tooltip } from "@mantine/core";
import type { JSX } from "react";
import type { OPSketchMode } from "./opUtils.ts";
import { useMediaQuery } from "@mantine/hooks";

export function ModeSelectors({
    includeModes,
    setIncludeModes,
    isOverFiltering,
}: {
    includeModes: Record<OPSketchMode, boolean>;
    isOverFiltering: boolean;
    setIncludeModes: React.Dispatch<
        React.SetStateAction<Record<OPSketchMode, boolean>>
    >;
}): JSX.Element {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const shouldWarnAboutOverFiltering =
        isOverFiltering && Object.values(includeModes).some((v) => v);
    return (
        <Fieldset
            legend={isDesktop ? "Filter by sketch mode" : "sketch mode"}
            style={{
                alignItems: "flex-end",
                // Direct CSS overrides are the most reliable for 'dashed'
                outline: shouldWarnAboutOverFiltering
                    ? "2px dashed var(--mantine-color-yellow-6)"
                    : undefined,
                transition: "outline 0.5s ease",
            }}
            // styles={{
            //     legend: {
            //         color: shouldWarnAboutOverFiltering
            //             ? "var(--mantine-color-yellow-6)"
            //             : undefined,
            //         fontWeight: shouldWarnAboutOverFiltering ? 700 : 500,
            //     },
            // }}
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
        <Tooltip label={tooltipLabel} refProp="rootRef" openDelay={800}>
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
