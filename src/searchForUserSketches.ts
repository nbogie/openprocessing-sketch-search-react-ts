import type { OPSketch } from "./opUtils.ts";

export async function searchForUserSketches(
    userId: number,
): Promise<OPSketch[]> {
    const baseURL = "https://openprocessing.org";
    const URL = baseURL + `/api/user/${userId}/sketches`;
    const response = await fetch(URL);

    const data = await response.json();
    //todo: use zod or similar to validate this data
    return data as OPSketch[];
}

export function filterForMatchingNames(
    sketches: OPSketch[],
    searchTerm: string,
): OPSketch[] {
    return sketches.filter((sk) =>
        [sk.title, sk.description].some((field) =>
            field.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );
}
