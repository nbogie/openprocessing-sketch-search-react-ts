import { Button, Group, Radio, Tooltip } from "@mantine/core";
import { IconCopy } from "@tabler/icons-react";
import { useState, type JSX } from "react";
import type { ExportFormat } from "./exportFilteredList.tsx";

type ExportControls = {
    exportFilteredList: (format: ExportFormat) => void;
};
export function ExportControls({
    exportControls,
}: {
    exportControls: ExportControls;
}): JSX.Element {
    const [format, setFormat] = useState<ExportFormat>("idOnly");
    return (
        <Group>
            <Button
                variant="default"
                rightSection={<IconCopy />}
                onClick={() => exportControls.exportFilteredList(format)}
            >
                Copy filtered list
            </Button>
            <FormatRadioGroup format={format} setFormat={setFormat} />
        </Group>
    );
}

function FormatRadioGroup({
    format,
    setFormat,
}: {
    format: ExportFormat;
    setFormat: (ex: ExportFormat) => void;
}): JSX.Element {
    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormat(e.target.value as ExportFormat);
    };
    const allFormats: { fmt: ExportFormat; description: string }[] = [
        { fmt: "idOnly", description: "only id" },
        { fmt: "short", description: "only id and title" },
        { fmt: "full", description: "all properties" },
    ];

    return (
        <Radio.Group name="ExportFormat" label="Export format">
            <Group>
                {allFormats.map((fmtInfo) => {
                    return (
                        <Tooltip
                            label={fmtInfo.description}
                            openDelay={500}
                            refProp="rootRef"
                        >
                            <Radio
                                value={fmtInfo.fmt}
                                label={fmtInfo.fmt}
                                onChange={handleOptionChange}
                                checked={fmtInfo.fmt === format}
                            />
                        </Tooltip>
                    );
                })}
            </Group>
        </Radio.Group>
    );
}
