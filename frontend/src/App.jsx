import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BubbleSort from "./pages/Sorting/BubbleSort";
import InsertionSort from "./pages/Sorting/InsertionSort";
import SelectionSort from "./pages/Sorting/SelectionSort";
import MergeSort from "./pages/Sorting/MergeSort";
import QuickSort from "./pages/Sorting/QuickSort";
import HeapSort from "./pages/Sorting/HeapSort";
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
                <Route path="/sorting/quick" element={<QuickSort />} />
                <Route path="/sorting/heap" element={<HeapSort />} />
            </Routes>
        </Layout>
    );
}