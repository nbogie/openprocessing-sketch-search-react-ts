import { Fragment } from "react";
import { LinkWithWarning } from "./LinkWithWarning.tsx";

/**
 * Transforms a string into an array of text (Fragment) and LinkWithWarning components.
 * Scans for standard https patterns only.  Does NOT check if there are exploits in the link.
 */

export function linkifyDescription(text: string) {
    const urlRegex = /(https:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
        if (part.match(urlRegex)) {
            return (
                <LinkWithWarning key={index} url={part}>
                    {part}
                </LinkWithWarning>
            );
        }
        return <Fragment key={index}>{part}</Fragment>;
    });
}
