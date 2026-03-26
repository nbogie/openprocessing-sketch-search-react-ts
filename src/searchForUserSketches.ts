import type { OPSketch } from "./OpenProcessingSketchSearch.tsx";

export async function searchForUserSketches(
    userId: number,
    searchTerm: string,
): Promise<OPSketch[]> {
    const baseURL = "https://openprocessing.org";
    const URL = baseURL + `/api/user/${userId}/sketches`;
    const response = await fetch(URL);
    if (!response.status.toString().startsWith("2")) {
        //TODO: this could also be a 3xx indicating cached
        throw new Error(
            "non-2xx status code from server: " +
                response.status +
                " " +
                response.statusText,
        );
    }

    const data = await response.json();
    const typedData = data as OPSketch[];

    return typedData.filter((sk) =>
        [sk.title, sk.description].some((field) =>
            field.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );
}
