import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BubbleSort from "./pages/Sorting/BubbleSort";
import InsertionSort from "./pages/Sorting/InsertionSort";
import SelectionSort from "./pages/Sorting/SelectionSort";
import MergeSort from "./pages/Sorting/MergeSort";
import QuickSort from "./pages/Sorting/QuickSort";
import HeapSort from "./pages/Sorting/HeapSort";
import LinearSearch from "./pages/Searching/LinearSearch";
import BinarySearch from "./pages/Searching/BinarySearch";
import Dijkstra from "./pages/Graph/Dijkstra";
import Kruskal from "./pages/Graph/Kruskal";
import FloydWarshall from "./pages/Graph/FloydWarshall";
import Prim from "./pages/Graph/Prim";
import BFS from "./pages/Pathfinding/BFS";
import DFS from "./pages/Pathfinding/DFS";
import AStar from "./pages/Pathfinding/AStar";
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
                <Route path="/searching/linear" element={<LinearSearch />} />
                <Route path="/searching/binary" element={<BinarySearch />} />
                <Route path="/graph/dijkstra" element={<Dijkstra />} />
                <Route path="/graph/kruskal" element={<Kruskal />} />
                <Route path="/graph/floydwarshall" element={<FloydWarshall />} />
                <Route path="/graph/prim" element={<Prim />} />
                <Route path="/pathfinding/bfs" element={<BFS />} />
                <Route path="/pathfinding/dfs" element={<DFS />} />
                <Route path="/pathfinding/astar" element={<AStar />} />
            </Routes>
        </Layout>
    );
}