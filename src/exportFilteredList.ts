import { makeSketchURL, type OPSketch } from "./opUtils.ts";

export type ExportFormat = "idOnly" | "linkOnly" | "short" | "full";
export function exportFilteredListToClipboard(
    sketches: OPSketch[],
    format: ExportFormat,
) {
    type ExportFormatter = (
        sk: OPSketch,
    ) => Partial<OPSketch> | string | number;

    const idOnly: ExportFormatter = (sk: OPSketch) => sk.visualID;
    const linkOnly: ExportFormatter = (sk: OPSketch) =>
        makeSketchURL(sk.visualID);
    const full: ExportFormatter = (sk: OPSketch) => sk;
    const short: ExportFormatter = (sk: OPSketch) => ({
        visualId: sk.visualID,
        title: sk.title,
    });

    const formatter = { idOnly, linkOnly, short, full }[
        format
    ] satisfies ExportFormatter;

    const valsForExport = sketches.map(formatter);
    navigator.clipboard.writeText(JSON.stringify(valsForExport, null, 2));
}
