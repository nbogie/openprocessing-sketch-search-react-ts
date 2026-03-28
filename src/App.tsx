// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import "./App.css";
import { OPSketchSketchSearch } from "./OPSketchSearch.tsx";

function App() {
    return (
        <MantineProvider>
            <OPSketchSketchSearch />
        </MantineProvider>
    );
}

export default App;
