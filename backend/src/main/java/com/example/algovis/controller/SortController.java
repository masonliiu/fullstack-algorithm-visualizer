package com.example.algovis.controller;

import com.example.algovis.dto.SortResponse;
import com.example.algovis.dto.Algorithms;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/") 
@CrossOrigin(origins = "http://localhost:5173") // allow frontend dev server
public class SortController {

    @GetMapping("/sort")
    public SortResponse sort(
            @RequestParam(defaultValue = "quick") String algorithm,
            @RequestParam(defaultValue = "50") int size,
            @RequestParam(required = false) Long seed
    ) {
        return Algorithms.sort(algorithm, size, seed);
    }

    @GetMapping("/health")
    public String health() {
        return "ok";
    }
    @GetMapping
    public String root() {
        return "Backend is running! Try /health or /sort";
    }
}