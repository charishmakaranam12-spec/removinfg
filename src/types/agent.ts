export type Priority = 'High' | 'Medium' | 'Low';
export type IssueStatus = 'missing' | 'uncertain' | 'inconsistent';

export interface PresentField {
  field: string;
  value: string;
  confidence: number; // 0 to 1
  sourceSnippet?: string;
  isValid: boolean;
  notes?: string;
}

export interface MissingIssue {
  id: string;
  field: string;
  category: 'Financial' | 'Identification & KYC' | 'Employment & History' | 'Contact & Location' | 'Legal & Compliance' | 'Medical & Health' | 'General';
  status: IssueStatus;
  priority: Priority;
  whyRequired: string;
  potentialImpact: string;
  suggestedQuestion: string;
  identifiedBy: string[]; // e.g. ['Data Completeness Agent', 'Context Agent']
  verifiedBy?: string; // e.g. 'Verification Agent'
  domainStandardReference?: string;
  userResponse?: string;
  isResolved?: boolean;
}

export interface Contradiction {
  id: string;
  title: string;
  description: string;
  conflictingFields: string[];
  severity: 'Critical' | 'Warning';
  detectedBy: string;
}

export interface AgentStepLog {
  agentName: 'Data Completeness Agent' | 'Context Agent' | 'Risk Agent' | 'Verification Agent' | 'Coordinator Agent';
  role: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  executionTimeMs?: number;
  thoughts: string[];
  findingsSummary: string;
  outputSnippet?: Record<string, any>;
}

export interface MissingInfoReport {
  caseType: string;
  domain: string;
  applicationSummary: string;
  overallCompletenessPercentage: number;
  criticalNotice: string;
  totalMissingCount: number;
  highPriorityCount: number;
  mediumPriorityCount: number;
  lowPriorityCount: number;
  presentFields: PresentField[];
  issues: MissingIssue[];
  contradictions: Contradiction[];
  agentLogs: AgentStepLog[];
  evaluatedAt: string;
  modelUsed: string;
}

export interface AuditRequestPayload {
  rawText: string;
  fileName?: string;
  fileType?: string;
  domainHint?: string;
}
