export interface DocumentData {
  ID?: number;
  title: string;
  pageCount: number;
  uri?: string;
  custom: boolean;
  createdAt?: Date;
  user: number;
  isVerified: boolean;
}

export interface CustomDocumentResponse {
  File: string;
  PagesNo: number;
  Title: string;
  id: number;
  isVerified: boolean;
  upload_time: Date;
  user: number;
}

export interface NADDocumentResponse {
  BirthCertificate: number;
  CasteCertificate: number;
  DisabilityCertificate: number;
  DomicileCertificate: number;
  HSC: number;
  IncomeCertificate: number;
  JEEallotmentLetter: number;
  JEEmarksheet: number;
  MedicalCertificate: number;
  MigrationCertificate: number;
  NationalityCertificate: number;
  PAN: number;
  Passport: number;
  SSC: number;
  SportsCertificate: number;
  TransferCertificate: number;
  id: number;
  user: number;
}
