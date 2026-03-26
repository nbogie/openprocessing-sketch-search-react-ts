//finding: tags are not included on the search result items
export interface OPSketch {
    visualID: number;
    title: string;
    description: string;
    instructions: string;
    isPrivate: number;
    isDraft: number;
    createdOn: string;
    updatedOn: string;
    mode: string; //"p5js" | ?
}

export function makeSketchURL(visualID: number): string {
    return "https://openprocessing.org/sketch/" + visualID;
}
