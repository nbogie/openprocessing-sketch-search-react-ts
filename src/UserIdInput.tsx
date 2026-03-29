import { NumberInput } from "@mantine/core";
import type { JSX } from "react";

export function UserIdInput({
    userId,
    setUserId,
}: {
    userId: number;
    setUserId: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
    return (
        <NumberInput
            // label="User ID"
            // description="id of openprocessing user to get sketches for"
            leftSection="user id: "
            leftSectionWidth="8ch"
            //TODO: really necessary? (prevent left section capturing clicks)
            styles={{ section: { pointerEvents: "none" } }}
            hideControls
            placeholder="userID"
            min={1}
            max={9999999999}
            key="userIdInput"
            value={userId}
            allowNegative={false}
            allowDecimal={false}
            allowLeadingZeros={false}
            onChange={(strOrNum) => {
                if (typeof strOrNum === "number") {
                    setUserId(strOrNum);
                } else {
                    setUserId(0);
                }
            }}
            // if it's zero or undefined
        />
    );
}
