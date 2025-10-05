package com.example.algovis.dto;
import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

public class Step {
    private StepType type;
    private int[] indices;
    private int[] array;

    private List<Integer> nodes;
    private List<int[]> edges;
    private List<Integer> visited;
    private List<Integer> finalized;
    private List<int[]> mstEdges;
    private int[] activeEdge;

    private String[][] grid;

    private Map<String, Object> extra;

    public Step() {}

    public Step(StepType type, int[] indices, int[] array) {
        this.type = type;
        this.indices = indices;
        this.array = array;
    }

    public static Step compare(int index1, int index2, int[] arr) {
        return new Step(StepType.COMPARE, new int[]{index1, index2}, arr.clone());
    }
    public static Step swap(int index1, int index2, int[] arr) {
        return new Step(StepType.SWAP, new int[]{index1, index2}, arr.clone());
    }
    public static Step markFinal(int index, int[] arr) {
        return new Step(StepType.MARK_FINAL, new int[]{index}, arr.clone());
    }
    public static Step snapshot(int[] array) {
        return new Step(StepType.ARRAY_SNAPSHOT, null, array.clone());
    }

    public static Step graph(List<Integer> nodes, List<int[]> edges,
                             List<Integer> visited, List<Integer> finalized) {
        Step step = new Step();
        step.type = StepType.GRAPH_SNAPSHOT;
        step.nodes = new ArrayList<>(nodes);
        step.edges = new ArrayList<>(edges);
        step.visited = new ArrayList<>(visited);
        step.finalized = new ArrayList<>(finalized);
        return step;
    }

    public static Step graph(List<Integer> nodes, List<int[]> edges, List<int[]> mstEdges,
                             List<Integer> visited, List<Integer> finalized) {
        Step step = new Step();
        step.type = StepType.GRAPH_SNAPSHOT;
        step.nodes = new ArrayList<>(nodes);
        step.edges = new ArrayList<>(edges);
        step.mstEdges = new ArrayList<>(mstEdges);
        step.visited = new ArrayList<>(visited);
        step.finalized = new ArrayList<>(finalized);
        return step;
    }

    public static Step graphMST(
            List<Integer> nodes,
            List<int[]> allEdges,
            List<int[]> mstEdges,
            int[] activeEdge,
            List<Integer> visitedNodes,
            List<Integer> finalizedNodes
    ) {
        Step step = new Step();
        step.type = StepType.GRAPH_SNAPSHOT;
        step.nodes = new ArrayList<>(nodes);
        step.edges = (allEdges == null) ? new ArrayList<>() : new ArrayList<>(allEdges);
        step.mstEdges = (mstEdges == null) ? new ArrayList<>() : new ArrayList<>(mstEdges);
        step.activeEdge = (activeEdge == null) ? null : java.util.Arrays.copyOf(activeEdge, activeEdge.length);
        step.visited = (visitedNodes == null) ? new ArrayList<>() : new ArrayList<>(visitedNodes);
        step.finalized = (finalizedNodes == null) ? new ArrayList<>() : new ArrayList<>(finalizedNodes);
        return step;
    }

    public static Step grid(String[][] grid) {
        Step step = new Step();
        step.type = StepType.GRID_SNAPSHOT;
        step.grid = grid;
        return step;
    }

    
    public StepType getType() { return type; }
    public int[] getIndices() { return indices; }
    public int[] getArray() { return array; }
    public List<Integer> getNodes() { return nodes; }
    public List<int[]> getEdges() { return edges; }
    public List<int[]> getMstEdges() { return mstEdges; }
    public int[] getActiveEdge() { return activeEdge; }
    public List<Integer> getVisited() { return visited; }
    public List<Integer> getFinalized() { return finalized; }
    public String[][] getGrid() { return grid; }

    public Map<String, Object> getExtra() { return extra; }
    public void setExtra(Map<String, Object> extra) { this.extra = extra; }

    public Step withMeta(String key, Object value) {
        if (this.extra == null) this.extra = new HashMap<>();
        this.extra.put(key, value);
        return this;
    }
}