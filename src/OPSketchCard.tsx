import { Text, Card, Group, Title, Tooltip } from "@mantine/core";
import type { FuseResult } from "fuse.js";
import type { JSX } from "react";
import { type OPSketch } from "./opUtils.ts";
import { SketchLink } from "./SketchLink.tsx";
import { linkifyDescription } from "./linkifyDescription.tsx";

export function OPSketchCard({
    sketchOrWrapper,
}: {
    sketchOrWrapper:
        | { type: "wrapped"; wrapper: FuseResult<OPSketch> }
        | { type: "sketch"; sketch: OPSketch };
}): JSX.Element {
    const sketch =
        sketchOrWrapper.type === "wrapped"
            ? sketchOrWrapper.wrapper.item
            : sketchOrWrapper.sketch;
    return (
        <Card shadow="sm" padding="sm" radius="md" withBorder>
            {/* Card.Section is designed to ignore the card's padding, e.g. to stretch images out to the edges */}
            {/* <Card.Section> */}

            <Group>
                <Title order={5} textWrap="wrap">
                    <SketchLink
                        text={sketch.visualID.toString()}
                        sketch={sketch}
                    />
                    &nbsp;&nbsp;
                    {sketch.title}
                </Title>
            </Group>
            {/* </Card.Section> */}
            <>
                {/* {wrapper && (
                <>
                    <div>Score: {wrapper.score}</div>
                </>
            )} */}

                <Text>{linkifyDescription(sketch.description)}</Text>

                <Text size="xs" c="dimmed">
                    Mode: {sketch.mode}
                </Text>
                <Tooltip
                    label={
                        <>
                            <Text size="sm">Created: {sketch.createdOn}</Text>
                            <Text size="sm">Updated: {sketch.updatedOn}</Text>
                        </>
                    }
                    openDelay={800}
                >
                    <Group style={{ columnGap: "1rem", rowGap: "0rem" }}>
                        <Text size="xs" c="dimmed">
                            Created:{" "}
                            {sketch.createdOn?.split(" ").at(0) ?? "null"}
                        </Text>
                        <Text size="xs" c="dimmed">
                            Updated:{" "}
                            {sketch.updatedOn?.split(" ").at(0) ?? "null"}
                        </Text>
                    </Group>
                </Tooltip>
            </>
        </Card>
    );
}
