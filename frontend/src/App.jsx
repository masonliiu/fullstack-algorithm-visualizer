import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import BubbleSort from "./pages/Sorting/BubbleSort";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sorting/bubble" element={<BubbleSort />} />
        </Routes>
    );
}