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
            case "merge":
                steps = merge(arr);
                break;
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
        steps.add(Step.markFinal(0, arr));
        return steps;

    }

    // Insertion sort
    private static List<Step> insertion(int[] arr) {
        List<Step> steps = new ArrayList<>();
        int n = arr.length;
            for (int i = 1; i < n; i++) {
                int j = i;
                while (j > 0) {
                    steps.add(Step.compare(j - 1, j, arr));
                    if (arr[j - 1] > arr[j]) {
                        int temp = arr[j];
                        arr[j] = arr[j - 1];
                        arr[j - 1] = temp;
                        steps.add(Step.swap(j - 1, j, arr));
                        steps.add(Step.snapshot(arr));
                        j--;
                    } else {
                        break;
                    }
            }
        }
        for (int i = 0; i < n; i++) {
            steps.add(Step.markFinal(i, arr));
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
        steps.add(Step.markFinal(n-1, arr));
        return steps;
    }

    // Merge sort
    private static List<Step> merge(int[] arr) {
        List<Step> steps = new ArrayList<>();
        mergeSort(arr, 0, arr.length - 1, steps);
        for (int i = 0; i < arr.length; i++) {
            steps.add(Step.markFinal(i, arr));
        }
        return steps;
    }

    private static void mergeSort(int[] arr, int left, int right, List<Step> steps) {
        if (left >= right) return;
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid, steps);
        mergeSort(arr, mid+1, right, steps);
        merge(arr, left, mid, right, steps);
    }

    private static void merge(int[] arr, int left, int mid, int right, List<Step> steps) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        int[] leftArr = new int[n1];
        int[] rightArr = new int[n2];

        System.arraycopy(arr, left, leftArr, 0, n1);
        System.arraycopy(arr, mid + 1, rightArr, 0, n2);

        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            steps.add(Step.compare(left + i, mid + 1 + j, arr));
            if (leftArr[i] <= rightArr[j]) {
                if (arr[k] != leftArr[i]) {
                    arr[k] = leftArr[i];
                    steps.add(Step.swap(k, left + i, arr));
                    steps.add(Step.snapshot(arr));
                }
                i++;
            } else {
                if (arr[k] != rightArr[j]) {
                    arr[k] = rightArr[j];
                    steps.add(Step.swap(k, mid + 1 + j, arr));
                    steps.add(Step.snapshot(arr));
                }
                j++;
            }
            k++;
        }

        while (i < n1) {
            if (arr[k] != leftArr[i]) {
                arr[k] = leftArr[i];
                steps.add(Step.swap(k, left + i, arr));
                steps.add(Step.snapshot(arr));
            }
            i++;
            k++;
        }

        while (j < n2) {
            if (arr[k] != rightArr[j]) {
                arr[k] = rightArr[j];
                steps.add(Step.swap(k, mid + 1 + j, arr));
                steps.add(Step.snapshot(arr));
            }
            j++;
            k++;
        }
    }
    // Heap sort
    // private static List<Step> heap(int[] arr) {
        
    // }

}
