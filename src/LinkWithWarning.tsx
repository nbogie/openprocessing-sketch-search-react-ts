import { Anchor, Button, Code, Group, Modal, Stack, Text } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { useState } from "react";

/** Provides a clickable text link that opens a warning+confirmation dialog form which the user can finally open the link. */
//started with LLM (gemini)
export function LinkWithWarning({
    url,
    children,
}: {
    url: string;
    children: React.ReactNode;
}) {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleProceed = () => {
        window.open(url, "_blank", "noopener,noreferrer");
        setModalOpen(false);
    };

    return (
        <>
            <Anchor component="button" onClick={() => setModalOpen(true)}>
                {children}
            </Anchor>

            <Modal
                opened={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="External Link Warning"
                centered
            >
                <Stack gap="md">
                    <Text size="sm">
                        This link leads to an external site, maybe not safe.
                    </Text>

                    <Code
                        block
                        style={{
                            wordBreak: "break-all",
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        {url}
                    </Code>
                    <Text size="sm">Are you sure you want to visit it?</Text>
                    <Group justify="flex-end" mt="md">
                        <Button
                            variant="subtle"
                            onClick={() => setModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="orange"
                            onClick={handleProceed}
                            leftSection={<IconExternalLink size={16} />}
                        >
                            Open the link
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
}
