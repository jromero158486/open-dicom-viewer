package dev.opendicom.viewer.api;

public record StudySummary (
    String id,
    String modality,
    int sliceCount
) {}
