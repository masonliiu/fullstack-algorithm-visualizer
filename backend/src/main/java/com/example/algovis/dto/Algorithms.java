package com.example.algovis.dto;

import com.example.algovis.dto.Step;
import com.example.algovis.dto.SortResponse;

import java.util.*;
import java.util.Map;
import java.util.Queue;
import java.util.LinkedList;
import java.util.Stack;

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
            case "heap":
                steps = heap(arr);
                break;
            case "quick":
                steps = quick(arr);
                break;
            case "linearsearch":
                steps = linearSearch(arr, 42);
                break;
            case "binarysearch":
                Arrays.sort(arr);
                steps = binarySearch(arr, 42);
                break;
            case "dfs":
                steps = dfs(0, demoGraph(), arr.length);
                break;
            case "bfs":
                steps = bfs(0, demoGraph(), arr.length);
                break;
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

    // bubble sort
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

    // insertion sort
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
    // selection sort
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

    // merge sort
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
    // heap sort
    private static List<Step> heap(int[] arr) {
        List<Step> steps = new ArrayList<>();
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i, steps);
        }
        
        for (int i = n - 1; i > 0; i--) {
            steps.add(Step.swap(0, i, arr));
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            steps.add(Step.snapshot(arr));
            steps.add(Step.markFinal(i, arr));
            heapify(arr, i, 0, steps);
        }
        steps.add(Step.markFinal(0, arr));
        return steps;
    }

    private static void heapify(int[] arr, int n, int i, List<Step> steps) {
        int largest = i;
        int l = 2 * i + 1;
        int r = 2 * i + 2;
        if (l < n) {
            steps.add(Step.compare(largest, l, arr));
            if (arr[l] > arr[largest])
                largest = l;
        }
        if (r < n) {
            steps.add(Step.compare(largest, r, arr));
            if (arr[r] > arr[largest])
                largest = r;
        }
        if (largest != i) {
            steps.add(Step.swap(i, largest, arr));
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            steps.add(Step.snapshot(arr));
            heapify(arr, n, largest, steps);
        }
    }

    // quick sort
    private static List<Step> quick(int[] arr) {
        List<Step> steps = new ArrayList<>();
        quickSort(arr, 0, arr.length - 1, steps);
        for (int i = 0; i < arr.length; i++) {
            steps.add(Step.markFinal(i, arr));
        }
        return steps;
    }

    private static void quickSort(int[] arr, int low, int high, List<Step> steps) {
        if (low < high) {
            int pi = divide(arr, low, high, steps);
            quickSort(arr, low, pi - 1, steps);
            quickSort(arr, pi + 1, high, steps);
        }
    }

    private static int divide(int[] arr, int low, int high, List<Step> steps) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            steps.add(Step.compare(j, high, arr));
            if (arr[j] < pivot) {
                i++;
                steps.add(Step.swap(i, j, arr));
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                steps.add(Step.snapshot(arr));
            }
        }
        steps.add(Step.swap(i + 1, high, arr));
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        steps.add(Step.snapshot(arr));
        steps.add(Step.markFinal(i + 1, arr));
        return i + 1;
    }

    // linear search
    private static List<Step> linearSearch(int[] arr, int target) {
        List<Step> steps = new ArrayList<>();
        for (int i = 0; i < arr.length; i++) {
            steps.add(Step.compare(i, -1, arr));
            if (arr[i] == target) {
                steps.add(Step.markFinal(i, arr));
                break;
            }
        }
        return steps;
    }

    // binary Search
    private static List<Step> binarySearch(int[] arr, int target) {
        List<Step> steps = new ArrayList<>();
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            steps.add(Step.compare(mid, -1, arr));
            if (arr[mid] == target) {
                steps.add(Step.markFinal(mid, arr));
                break;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return steps;
    }

    // dfs
    private static List<Step> dfs(int start, Map<Integer, List<Integer>> graph, int n) {
        List<Step> steps = new ArrayList<>();
        boolean[] visited = new boolean[n];
        Stack<Integer> stack = new Stack<>();
        stack.push(start);
        while (!stack.isEmpty()) {
            int node = stack.pop();
            if (!visited[node]) {
                visited[node] = true;
                steps.add(Step.markFinal(node, new int[n]));
                for (int neighbor : graph.getOrDefault(node, Collections.emptyList())) {
                    steps.add(Step.compare(node, neighbor, new int[n]));
                    if (!visited[neighbor]) {
                        stack.push(neighbor);
                    }
                }
            }
        }
        return steps;
    }

    // bfs
    private static List<Step> bfs(int start, Map<Integer, List<Integer>> graph, int n) {
        List<Step> steps = new ArrayList<>();
        boolean[] visited = new boolean[n];
        Queue<Integer> queue = new LinkedList<>();
        queue.add(start);
        visited[start] = true;
        while (!queue.isEmpty()) {
            int node = queue.poll();
            steps.add(Step.markFinal(node, new int[n]));
            for (int neighbor : graph.getOrDefault(node, Collections.emptyList())) {
                steps.add(Step.compare(node, neighbor, new int[n]));
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.add(neighbor);
                }
            }
        }
        return steps;
    }

    // adjacency list
    private static Map<Integer, List<Integer>> demoGraph() {
        Map<Integer, List<Integer>> graph = new HashMap<>();
        // 0 -> 1,2; 1 -> 2,3; 2 -> 3; 3 -> 4; 4 -> (empty)
        graph.put(0, Arrays.asList(1,2));
        graph.put(1, Arrays.asList(2,3));
        graph.put(2, Arrays.asList(3));
        graph.put(3, Arrays.asList(4));
        graph.put(4, new ArrayList<>());
        return graph;
    }

}
