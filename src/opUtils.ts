//finding: tags are not included on the search result items

export type OPSketchMode = "p5js" | "pjs" | "html";
export const allOPSketchModes = [
    "p5js",
    "html",
    "pjs",
] as const satisfies OPSketchMode[];

export interface OPSketch {
    visualID: number;
    title: string;
    description: string;
    instructions: string;
    isPrivate: number;
    isDraft: number;
    createdOn: string;
    updatedOn: string;
    mode: OPSketchMode;
}

export function makeSketchURL(visualID: number): string {
    return `https://openprocessing.org/sketch/${  visualID}`;
}
