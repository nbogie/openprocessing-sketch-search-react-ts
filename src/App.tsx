// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import "./App.css";
import { OPSketchSearchMantine } from "./OPSketchSearchMantine.tsx";

function App() {
    return (
        <MantineProvider defaultColorScheme="auto">
            <OPSketchSearchMantine />
        </MantineProvider>
    );
}

export default App;
