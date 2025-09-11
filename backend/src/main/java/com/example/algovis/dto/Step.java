package com.example.algovis.dto;
import java.util.Arrays;

public class Step {
    private StepType type;
    private int[] indices;
    private int[] array;

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
    public static Step overwrite(int index, int newValue, int[] arr) {
        return new Step(StepType.OVERWRITE, new int[]{index, newValue}, arr.clone());
    }
    public static Step markFinal(int index, int[] arr) {
        return new Step(StepType.MARK_FINAL, new int[]{index}, arr.clone());
    }
    public static Step snapshot(int[] array) {
        return new Step(StepType.ARRAY_SNAPSHOT, null, array.clone());
    }   

    private static int[] copy(int[] a) {
        return Arrays.copyOf(a, a.length); 
    }

    public StepType getType() {
        return type;
    }
    public int[] getIndices() {
        return indices;
    }
    public int[] getArray() {
        return array;
    }
}
