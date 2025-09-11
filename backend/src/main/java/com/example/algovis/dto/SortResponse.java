package com.example.algovis.dto;

import java.util.List;

public class SortResponse {
    private String algorithm;
    private int[] initialArray;
    private List<Step> steps;

    public SortResponse(String algorithm, int[] initialArray, List<Step> steps) {
        this.algorithm = algorithm;
        this.initialArray = initialArray;
        this.steps = steps; 
    }

    public String getAlgorithm() {
        return algorithm;
    }
    public int[] getInitialArray() {
        return initialArray;
    }
    public List<Step> getSteps() {
        return steps;
    }
}
