package com.example.algovis.dto;

import java.util.List;

public class SortResponse {
    private String algorithm;
    private int[] initialArray;
    private List<Step> steps;

    public SortResponse() {}

    public SortResponse(String algorithm, int[] initialArray, List<Step> steps) {
        this.algorithm = algorithm;
        this.initialArray = initialArray;
        this.steps = steps; 
    }

    public String getAlgorithm() {
        return algorithm;
    }
    public void setAlgorithm(String algorithm) {
        this.algorithm = algorithm;
    }

    public int[] getInitialArray() {
        return initialArray;
    }
    public void setInitialArray(int[] initialArray) {
        this.initialArray = initialArray;
    }

    public List<Step> getSteps() {
        return steps;
    }
    public void setSteps(List<Step> steps) {
        this.steps = steps;
    }
}
