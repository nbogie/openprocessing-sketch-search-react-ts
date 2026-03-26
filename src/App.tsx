import { useState } from "react";
import "./App.css";
import { OpenProcessingSketchSearch } from "./OpenProcessingSketchSearch.tsx";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <section id="center">
                <OpenProcessingSketchSearch />
                <button
                    className="counter"
                    onClick={() => setCount((count) => count + 1)}
                >
                    Count is {count}
                </button>
            </section>

            <div className="ticks"></div>
            <section id="spacer"></section>
        </>
    );
}

export default App;
