
export interface CertificateRecord {
  id: string;
  certificateId: string; // Maps to register_number / USN
  studentName: string;
  degreeName: string;
  institution: string; // Maps to college
  graduationYear: number;
  issueDate: string;
  status: 'active' | 'revoked';
  semester?: string;
  totalMarks?: string;
  resultStatus?: string; // Maps to class_or_result
}

export interface VerificationResult {
  isGenuine: boolean;
  confidenceScore: number;
  detectedData: Partial<CertificateRecord> & { isAcademicCertificate?: boolean };
  matchedRecord?: CertificateRecord;
  tamperingDetected: boolean;
  analysisNotes: string;
}

export enum AppRoute {
  HOME = 'home',
  VERIFY = 'verify',
  ADMIN = 'admin',
  ABOUT = 'about'
}
