import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { OPSketchSearch } from "./OPSketchSearch.tsx";

export function OPSketchSearchMantine() {
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
                Placeholder text - I don't need anything displayed here for now,
                just testing.
            </AppShell.Navbar>
            <AppShell.Main>
                <OPSketchSearch />
            </AppShell.Main>
        </AppShell>
    );
}
