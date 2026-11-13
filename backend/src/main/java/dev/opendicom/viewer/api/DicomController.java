
package dev.opendicom.viewer.api;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Stream;
import java.util.Comparator;

import dev.opendicom.viewer.service.DicomReader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DicomController {

    private final Path sampleFile;
    private final DicomReader reader;

    public DicomController(
        @Value("${DICOM_SAMPLE_FILE}") String filePath,
        DicomReader reader
    ) {
        this.sampleFile = Path.of(filePath);
        this.reader = reader;
    }

    @GetMapping("/api/sample/metadata")
    public DicomMetadata readSample() throws IOException {
        return reader.read(sampleFile);
    }

    @GetMapping("/api/sample/slices")
    public List<DicomMetadata> readSlices() throws IOException {

        List<DicomMetadata> slices = new ArrayList<>();

        try (Stream<Path> paths = Files.walk(sampleFile.getParent())) {

            List<Path> files = paths
                .filter(Files::isRegularFile)
                .filter(path -> path.getFileName().toString()
                .toLowerCase(Locale.ROOT).endsWith(".dcm"))
                .sorted()
                .toList();

            for (Path file : files) {
                slices.add(reader.read(file));
            }
        }

        slices.sort(Comparator.comparingDouble(slice -> slice.imagePositionPatient()[2]));

        return slices;
    }

    @GetMapping("/api/sample/spacing")
    public double getSliceSpacing() throws IOException {
        List<DicomMetadata> slices = readSlices();

        if (slices.size() < 2) {
            throw new IllegalStateException("At least two slices required");
        }

        double totalSpacing = 0;

        for (int i = 1; i < slices.size(); i++) {
            double previousZ = slices.get(i-1).imagePositionPatient()[2];
            double currentZ = slices.get(i).imagePositionPatient()[2];

            double distance = currentZ - previousZ;

            totalSpacing += distance;
        }

        return totalSpacing/(slices.size() - 1);
    }

    @GetMapping("/api/sample/geometry")
    public SeriesGeometry getGeometry() throws IOException {

        List<DicomMetadata> slices = readSlices();

        if (slices.size() < 2) {
            throw new IllegalStateException("At least two slices required");
        }

        DicomMetadata first = slices.get(0);

        double minGap = Double.POSITIVE_INFINITY;
        double maxGap = Double.NEGATIVE_INFINITY;
        double total = 0.0;

        for (int i=1; i < slices.size(); i++) {
            double previousZ = slices.get(i-1).imagePositionPatient()[2];
            double currentZ = slices.get(i).imagePositionPatient()[2];
            double gap = currentZ - previousZ;

            minGap = Math.min(minGap, gap);
            maxGap = Math.max(maxGap, gap);
            total += gap;
        }

        double average = total/ (slices.size()-1);
        boolean uniform = (maxGap - minGap) < 0.001;

        return new SeriesGeometry(
            first.seriesInstanceUID(),
            slices.size(),
            first.rows(),
            first.columns(),
            first.pixelSpacing(),
            average,
            uniform
        );
    }
}
