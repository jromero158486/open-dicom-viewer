package dev.opendicom.viewer.api;

public record DicomMetadata (
    String fileName,
    String modality,
    int rows,
    int columns,
    double[] pixelSpacing,
    double[] imagePositionPatient,
    String seriesInstanceUID,
    String sopInstanceUID,
    double[] imageOrientationPatient
) {}

