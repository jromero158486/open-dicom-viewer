package dev.opendicom.viewer.api;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class StudyController {

    @GetMapping("/api/studies")
    public List<StudySummary> getStudies() {

        return List.of(new StudySummary("study-001", "CT", 120), new StudySummary("study-002", "CT", 85));
    }  
}
