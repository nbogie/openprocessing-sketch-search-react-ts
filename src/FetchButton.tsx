import { Button, Loader } from "@mantine/core";
import { IconCloudDown, IconRepeat } from "@tabler/icons-react";
import type { OPSketch } from "./opUtils.ts";
import type { FetchStatus } from "@tanstack/react-query";
export function FetchButton({
    fetchStatus,
    data,
    refetchWithToast,
}: {
    fetchStatus: FetchStatus;
    data: OPSketch[] | undefined;
    refetchWithToast: () => void;
}) {
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
                <>Fetch all sketches from API</>
            ) : (
                <>Re-fetch all sketches from API!</>
            )}
        </Button>
    );
}
