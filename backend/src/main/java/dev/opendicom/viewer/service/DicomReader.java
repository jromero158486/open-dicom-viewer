package dev.opendicom.viewer.service;

import java.io.IOException;
import java.nio.file.Path;

import dev.opendicom.viewer.api.DicomMetadata;
import org.dcm4che3.data.Attributes;
import org.dcm4che3.data.Tag;
import org.dcm4che3.io.DicomInputStream;
import org.springframework.stereotype.Service;

@Service
public class DicomReader {

    public DicomMetadata read(Path file) throws IOException {
        
        try(DicomInputStream input = new DicomInputStream(file.toFile())) {
            Attributes data = input.readDatasetUntilPixelData();

            return new DicomMetadata(
                file.getFileName().toString(),
                data.getString(Tag.Modality),
                data.getInt(Tag.Rows, 0),
                data.getInt(Tag.Columns, 0),
                data.getDoubles(Tag.PixelSpacing),
                data.getDoubles(Tag.ImagePositionPatient),
                data.getString(Tag.SeriesInstanceUID),
                data.getString(Tag.SOPInstanceUID),
                data.getDoubles(Tag.ImageOrientationPatient)
            );
        }

    }
    
}
