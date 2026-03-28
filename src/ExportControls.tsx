import { Button, Group, Radio } from "@mantine/core";
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
        <div className="inputsRow">
            <Button
                variant="default"
                rightSection={<IconCopy />}
                onClick={() => exportControls.exportFilteredList(format)}
            >
                Export filtered list
            </Button>
            <FormatRadioGroup format={format} setFormat={setFormat} />
        </div>
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
    const allFormats: ExportFormat[] = ["idOnly", "short", "full"];

    return (
        <Radio.Group name="ExportFormat" label="Export format">
            <Group mt="xs">
                {allFormats.map((fmt) => {
                    return (
                        <Radio
                            value={fmt}
                            label={fmt}
                            onChange={handleOptionChange}
                            checked={fmt === format}
                        />
                    );
                })}
            </Group>
        </Radio.Group>
    );
}
