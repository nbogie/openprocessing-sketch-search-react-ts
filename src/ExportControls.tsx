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
        <div className={"exportControlsRow"}>
            <button onClick={() => exportControls.exportFilteredList(format)}>
                Export filtered list
            </button>
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
    const renderRadio = (value: ExportFormat) => (
        <label key={value}>
            <input
                type="radio"
                value={value}
                checked={format === value}
                onChange={handleOptionChange}
            />
            {value.charAt(0).toUpperCase() + value.slice(1)}
        </label>
    );
    return (
        <div className="radioGroup">
            {(["idOnly", "short", "full"] satisfies ExportFormat[]).map(
                renderRadio,
            )}
        </div>
    );
}
