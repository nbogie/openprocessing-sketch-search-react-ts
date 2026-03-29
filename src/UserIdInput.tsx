import { NumberInput } from "@mantine/core";
import type { JSX } from "react";

export function UserIdInput({
    userId,
    setUserId,
}: {
    userId: number;
    setUserId: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
    function handlePasteLookingForURL(e: React.ClipboardEvent) {
        const pastedText = e.clipboardData.getData("text").trim();
        const extractedId = parsePossibleOpenProcessingURLForUserId(pastedText);

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
    );
}

/**
 * Extract and return a numeric ID from an OpenProcessing URL (for now, a user profile url), or null if invalid.
 * Example: input: https://openprocessing.org/user/135249/#sketches output 135249
 * Example: input: https://openprocessing.org/user/1 output: 1
 */
function parsePossibleOpenProcessingURLForUserId(text: string): number | null {
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
