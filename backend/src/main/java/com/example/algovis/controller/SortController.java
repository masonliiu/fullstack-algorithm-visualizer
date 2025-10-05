package com.example.algovis.controller;

import com.example.algovis.dto.SortResponse;
import com.example.algovis.dto.Algorithms;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/") 
@CrossOrigin(origins = "http://localhost:5173")
public class SortController {

    @GetMapping("/sort")
    public org.springframework.http.ResponseEntity<?> sort(
            @RequestParam(defaultValue = "quick") String algorithm,
            @RequestParam(defaultValue = "50") int size,
            @RequestParam(required = false) Long seed,
            @RequestParam(required = false) Integer target
    ) {
        try {
            Integer actualTarget = target;
            if (actualTarget == null) {
                java.util.Random rand = (seed != null) ? new java.util.Random(seed) : new java.util.Random();
                actualTarget = rand.nextInt(100);
            }

            SortResponse response = Algorithms.sort(algorithm, size, seed, actualTarget);
            return org.springframework.http.ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return org.springframework.http.ResponseEntity.status(500).body("Error in algorithm '" + algorithm + "': " + e.getMessage());
        }
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