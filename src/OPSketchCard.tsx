import { Card, Group, Title } from "@mantine/core";
import type { FuseResult } from "fuse.js";
import type { JSX } from "react";
import { type OPSketch } from "./opUtils.ts";
import { SketchLink } from "./SketchLink.tsx";

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
    // const wrapper =
    //     sketchOrWrapper.type === "wrapped"
    //         ? sketchOrWrapper.wrapper
    //         : undefined;
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
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
            </Card.Section>
            <>
                {/* {wrapper && (
                <>
                    <div>Score: {wrapper.score}</div>
                </>
            )} */}

                <div>{sketch.description}</div>
                <div>{sketch.mode}</div>
                <div>{sketch.updatedOn}</div>
            </>
        </Card>
    );
}
