import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BubbleSort from "./pages/Sorting/BubbleSort";
import InsertionSort from "./pages/Sorting/InsertionSort";
import SelectionSort from "./pages/Sorting/SelectionSort";
import MergeSort from "./pages/Sorting/MergeSort";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
    return (
        <Layout>
            <ScrollToTop/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sorting/bubble" element={<BubbleSort />} />
                <Route path="/sorting/insertion" element={<InsertionSort />} />
                <Route path="/sorting/selection" element={<SelectionSort />} />
                <Route path="/sorting/merge" element={<MergeSort />} />
            </Routes>
        </Layout>
    );
}