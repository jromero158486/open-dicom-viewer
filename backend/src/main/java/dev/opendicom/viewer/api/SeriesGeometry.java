package dev.opendicom.viewer.api;

public record SeriesGeometry(
    String seriesInstanceUID,
    int sliceCount,
    int rows,
    int columns,
    double[] pixelSpacing,
    double sliceSpacing,
    boolean uniformSpacing
) {}