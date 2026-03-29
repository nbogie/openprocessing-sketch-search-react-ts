import {
    Anchor,
    AppShell,
    Burger,
    Group,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { OPSketchSearch } from "./OPSketchSearch.tsx";

export function MyAppShell() {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    return (
        <AppShell
            padding="md"
            header={{ height: { base: 100, sm: 60 } }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
        >
            <AppShell.Header>
                <Group h="100%" px="md" wrap="nowrap">
                    <Burger
                        opened={mobileOpened}
                        onClick={toggleMobile}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Burger
                        opened={desktopOpened}
                        onClick={toggleDesktop}
                        visibleFrom="sm"
                        size="sm"
                    />
                    <Title order={2}>OpenProcessing Sketch&nbsp;Search</Title>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Stack>
                    <Text>
                        You can close this with the X above. This is a
                        placeholder for saved searches (not implemented).
                    </Text>
                    <Text>
                        This app uses the{" "}
                        <Anchor
                            href="https://www.postman.com/openprocessing-api/openprocessing-api/overview"
                            target="_blank"
                        >
                            OpenProcessing API v2
                        </Anchor>
                    </Text>
                </Stack>
            </AppShell.Navbar>
            <AppShell.Main>
                <OPSketchSearch />
            </AppShell.Main>
        </AppShell>
    );
}
