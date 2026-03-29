import { ActionIcon, Button, Group, Menu, Stack, Text } from "@mantine/core";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import { IconChevronDown, IconCopy } from "@tabler/icons-react";
import { type JSX } from "react";
import type { ExportFormat } from "./exportFilteredList.ts";

type ExportControls = {
    exportFilteredList: (format: ExportFormat) => void;
};
export function ExportSplitButton({
    exportControls,
}: {
    exportControls: ExportControls;
}): JSX.Element {
    const [format, setFormat] = useLocalStorage<ExportFormat>({
        key: "export-format",
        defaultValue: "idOnly",
    });
    const allFormats: { fmt: ExportFormat; description: string }[] = [
        { fmt: "idOnly", description: "ids" },
        { fmt: "linkOnly", description: "links" },
        { fmt: "short", description: "id & title" },
        { fmt: "full", description: "all properties" },
    ];
    // `(min-width: ${theme.breakpoints.md})`
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return (
        <Group wrap="nowrap" gap={0}>
            <Button
                w="100%"
                onClick={() => exportControls.exportFilteredList(format)}
                leftSection={<IconCopy size={16} />}
                variant="default"
                style={{
                    //don't round these corners
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    // borderRightWidth: `${rem(1)} solid var(--mantine-color-body)`,
                    borderRightWidth: "1px",
                }}
            >
                Copy list {isDesktop && <>(format: {format})</>}
            </Button>

            <Menu position="bottom-end" withinPortal>
                <Menu.Target>
                    <ActionIcon
                        variant="default"
                        size={36} //TODO: this is standard button height, but brittle
                        style={{
                            //don't round these corners
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                        }}
                    >
                        <IconChevronDown size={16} stroke={1.5} />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Exports will be an array of...</Menu.Label>
                    {allFormats.map((info) => (
                        <Menu.Item onClick={() => setFormat(info.fmt)}>
                            <Stack gap={0}>
                                <Text size="sm" fw={500}>
                                    {info.fmt}
                                </Text>
                                <Text size="xs" c="dimmed">
                                    {info.description} from each sketch
                                </Text>
                            </Stack>
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
}
