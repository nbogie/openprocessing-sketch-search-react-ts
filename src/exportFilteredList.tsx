import type { OPSketch } from "./opUtils.ts";

export type ExportFormat = "idOnly" | "short" | "full";
export function exportFilteredListToClipboard(
    sketches: OPSketch[],
    format: ExportFormat,
) {
    type ExportFormatter = (sk: OPSketch) => Partial<OPSketch> | number;

    const idOnly: ExportFormatter = (sk: OPSketch) => sk.visualID;
    const full: ExportFormatter = (sk: OPSketch) => sk;
    const short: ExportFormatter = (sk: OPSketch) => ({
        visualId: sk.visualID,
        description: sk.description,
    });

    const formatter = { idOnly, short, full }[format] satisfies ExportFormatter;

    const valsForExport = sketches.map(formatter);
    navigator.clipboard.writeText(JSON.stringify(valsForExport, null, 2));
}
