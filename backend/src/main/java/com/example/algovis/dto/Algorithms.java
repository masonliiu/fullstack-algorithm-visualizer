package com.example.algovis.dto;

import com.example.algovis.dto.Step;
import com.example.algovis.dto.SortResponse;

import java.util.*;

public class Algorithms {
    public static SortResponse sort(String algo, int size, Long seed) {
        int[] initial = randomArray(size, seed);
        int[] arr = Arrays.copyOf(initial, initial.length);

        List<Step> steps;
        switch (algo == null ? "" : algo.toLowerCase()) {
            case "bubble":
                steps = bubble(arr);
                break;
            case "insertion":
                steps = insertion(arr);
                break;
            case "selection":
                steps = selection(arr);
                break;
            // case "merge":
            //     steps = merge(arr):
            //     break;
            // case "heap":
            //     steps = heap(arr);
            //     break;
            default:
                throw new IllegalArgumentException("Unknown algorithm: " + algo);
        }

        steps.add(Step.snapshot(arr));
        return new SortResponse(cap(algo), initial, steps);
    }

    private static int[] randomArray(int size, Long seed) {
        if (size < 2) size = 2;
        if (size > 50) size = 50;
        Random r = (seed == null) ? new Random() : new Random(seed);
        int[] a = new int[size];
        for (int i = 0; i < size; i++) 
            a[i] = 5 + r.nextInt(95);
            return a;
    }

    private static String cap(String s) {
        if (s == null || s.isEmpty()) return "";
        return s.substring(0,1).toUpperCase() + s.substring(1).toLowerCase();
    }

    // Bubble sort
    private static List<Step> bubble(int[] arr) {
        List<Step> steps = new ArrayList<>();
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int x = 0; x < n - 1 - i; x++) {
                steps.add(Step.compare(x, x + 1, arr));
                if (arr[x] > arr[x + 1]) {
                    int t = arr[x]; arr[x] = arr[x+1]; arr[x+1] = t;
                    steps.add(Step.swap(x, x + 1, arr));
                    steps.add(Step.snapshot(arr));
                }
            }
            steps.add(Step.markFinal(n - 1 - i, arr));
        }
        return steps;

    }

    // Insertion sort
    private static List<Step> insertion(int[] arr) {
        List<Step> steps = new ArrayList<>();
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int x = i-1;
            while (x >= 0) {
                steps.add(Step.compare(x, x+1, arr));
                if (arr[x] > key) {
                    arr[x+1] = arr[x];
                    steps.add(Step.overwrite(x + 1, arr[x + 1], arr));
                    steps.add(Step.snapshot(arr));
                    x--;
                } else break;
            }
            arr[x + 1] = key;
            steps.add(Step.overwrite(x + 1, key, arr));
            steps.add(Step.snapshot(arr));
            for (int k = 0; k < arr.length; k++) {
                steps.add(Step.markFinal(k, arr));
            }
        }
        return steps;
    }

    // Selection sort
    private static List<Step> selection(int[] arr) {
        List<Step> steps = new ArrayList<>();
        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int x = i + 1; x < n; x++) {
                steps.add(Step.compare(minIndex, x, arr));
                if (arr[x] < arr[minIndex]) minIndex = x;
            }
            if (minIndex != i) {
                int t = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = t;

                steps.add(Step.swap(i, minIndex, arr));
                steps.add(Step.snapshot(arr));
            }
            steps.add(Step.markFinal(i, arr));
        }
        return steps;
    }

    // // Merge sort
    // private static List<Step> merge(int[] arr) {
        
    // }

    // // Heap sort
    // private static List<Step> heap(int[] arr) {
        
    // }

}
