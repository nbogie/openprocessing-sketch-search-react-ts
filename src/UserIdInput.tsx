import { NumberInput, Tooltip } from "@mantine/core";
import type { JSX } from "react";
import { fetchSketchBySketchId } from "./fetchAllUserSketches.ts";
import { toast } from "sonner";

export function UserIdInput({
    userId,
    setUserId,
}: {
    userId: number;
    setUserId: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
    async function handlePasteLookingForURL(e: React.ClipboardEvent) {
        const pastedText = e.clipboardData.getData("text").trim();
        const extractedId =
            await parsePossibleOpenProcessingURLAnyTypeForUserId(pastedText);

        if (extractedId) {
            //don't let the underlying input process this paste event.
            e.preventDefault();
            //we'll set it ourselves at the controlled input's source.
            setUserId(extractedId);
        }
        // Fall-through if we didn't find from a relevant URL.
        // If someone just pasted an id we don't catch it here but the event will propagate and be dealt with as normal.
    }

    return (
        <Tooltip
            openDelay={8000}
            label="You can also paste a full sketch URL or user URL here"
        >
            <NumberInput
                leftSection="user id: "
                leftSectionWidth="8ch"
                //TODO: really necessary? (prevent left section capturing clicks)
                styles={{ section: { pointerEvents: "none" } }}
                hideControls
                placeholder="userID"
                min={1}
                max={999_999_999_999}
                value={userId === 0 ? "" : userId}
                allowNegative={false}
                allowDecimal={false}
                allowLeadingZeros={false}
                onPaste={handlePasteLookingForURL}
                onChange={(strOrNum) => {
                    setUserId(typeof strOrNum === "number" ? strOrNum : 0);
                }}
            />
        </Tooltip>
    );
}
/** Try to get the UserID from an openprocessing URL.  It may do a fetch if it recognises a potential sketch URL.
 * @returns the userId parsed from either the user url or found by asking the API about the sketch id it found in a sketch url.
 */
async function parsePossibleOpenProcessingURLAnyTypeForUserId(
    text: string,
): Promise<number | null> {
    const result = parsePossibleOpenProcessingUserURLForUserId(text);
    if (result) {
        toast(`Got userID ${result} from user URL`);

        return result;
    }
    const sketchId = parsePossibleOpenProcessingSketchURLForSketchId(text);
    if (sketchId) {
        const sketchInfo = await fetchSketchBySketchId(sketchId);
        if (sketchInfo?.userID) {
            toast(`Got userID ${sketchInfo.userID} from sketch ${sketchId}`);
            return sketchInfo.userID;
        }
    }
    return null;
}

/**
 *  @TODO: move this url parser to opUtils
 * Extract and return a numeric user ID from an OpenProcessing URL (for now, a user profile url), or null if invalid.
 * Example: input: https://openprocessing.org/user/135249/#sketches output 135249
 * Example: input: https://openprocessing.org/user/1 output: 1
 */
function parsePossibleOpenProcessingUserURLForUserId(
    text: string,
): number | null {
    const urlMatch = text.match(
        // user https://openprocessing.org/user/ then 1 to 15 digits then either: end of input, or / or #
        /https:\/\/openprocessing\.org\/user\/(\d{1,15})(?:\/|$|#)/i,
    );
    if (!urlMatch) {
        return null;
    }
    const userIdAsString = urlMatch.at(1);
    if (!userIdAsString) {
        return null;
    }
    return parseInt(userIdAsString, 10) ?? null;
}

/**
 * @TODO: move this url parser to opUtils
 * Extract and return a numeric sketch ID from an OpenProcessing sketch URL,  or null if invalid.
 * Example input: https://openprocessing.org/sketch/1751229# output: 1751229
 * Example input: https://openprocessing.org/sketch/1751229/ output: 1751229
 * Example input: https://openprocessing.org/sketch/1751229  output: 1751229
 */
function parsePossibleOpenProcessingSketchURLForSketchId(
    text: string,
): number | null {
    const urlMatch = text.match(
        // user https://openprocessing.org/sketch/ then 1 to 15 digits then either: end of input, or / or #
        /https:\/\/openprocessing\.org\/sketch\/(\d{1,15})(?:\/|$|#)/i,
    );
    if (!urlMatch) {
        return null;
    }
    const sketchIdAsString = urlMatch.at(1);
    if (!sketchIdAsString) {
        return null;
    }
    return parseInt(sketchIdAsString, 10) ?? null;
}
