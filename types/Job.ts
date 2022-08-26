export type ApplicationStatus =
  | "Pending"
  | "Applied"
  | "Accepted"
  | "Rejected"
  | "Not Applied";

export interface JobData {
  title: string;
  company: string;
  tags: string[];
  applicationStatus: ApplicationStatus;
  salary: string;
  description: string;
  isFellowship: boolean;
}
