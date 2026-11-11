// Store DICOM files
export interface DicomFileInfo {
    file: File;
    name: string;
    sizeKB: number;
    lastModified: Date;
}