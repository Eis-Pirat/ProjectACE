package isme.service_algorithm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/algorithms")
public class AlgorithmController {

    @Autowired
    private AlgorithmService algorithmService;

    @PostMapping("/detect")
    public List<String> detectAlgorithms(@RequestParam MultipartFile projectFile, @RequestParam Long projectId) throws IOException {
        return algorithmService.detectAlgorithms(projectFile, projectId);
    }
    @GetMapping("/project/{projectId}")
    public List<Algorithm> getAlgorithmsByProjectId(@PathVariable Long projectId) {
        return algorithmService.getAlgorithmsByProjectId(projectId);
    }
    @PostMapping("/detectFromGitHub")
    public List<String> detectAlgorithmsFromGitHub(@RequestParam String githubUrl, @RequestParam Long projectId) throws IOException {
        return algorithmService.detectAlgorithmsFromGitHub(githubUrl, projectId);
    }
}
