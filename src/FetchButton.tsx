import { Button, Loader } from "@mantine/core";
import { IconCloudDown, IconRepeat } from "@tabler/icons-react";
import type { OPSketch } from "./opUtils.ts";
import type { FetchStatus } from "@tanstack/react-query";
import { useMediaQuery } from "@mantine/hooks";
export function FetchButton({
    fetchStatus,
    data,
    refetchWithToast,
}: {
    fetchStatus: FetchStatus;
    data: OPSketch[] | undefined;
    refetchWithToast: () => void;
}) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <Button
            variant="default"
            leftSection={
                fetchStatus === "fetching" ? (
                    <Loader size={20} />
                ) : data ? (
                    <IconRepeat size={20} />
                ) : (
                    <IconCloudDown size={20} />
                )
            }
            onClick={() => refetchWithToast()}
        >
            {data === undefined ? (
                <>Fetch all {isDesktop && "sketches from API"}</>
            ) : (
                <>Re-fetch all {isDesktop && "sketches from API!"}</>
            )}
        </Button>
    );
}
