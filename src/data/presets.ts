export interface PresetExample {
  id: string;
  name: string;
  domain: string;
  description: string;
  tags: string[];
  content: string;
}

export const PRESET_EXAMPLES: PresetExample[] = [
  {
    id: 'rahul-loan',
    name: 'Rahul’s Loan Application (Prompt Example)',
    domain: 'Banking & Lending',
    description: 'Personal loan application with basic employment info, missing crucial risk & liability factors.',
    tags: ['Lending', 'FinTech', 'High Risk'],
    content: `Name: Rahul
Age: 25
Occupation: Software Developer
Monthly Income: ₹45,000
Loan Amount: ₹5,00,000`,
  },
  {
    id: 'car-accident-claim',
    name: 'Motor Insurance Accident Claim',
    domain: 'Insurance Claims',
    description: 'Vehicle damage claim report with missing police report number, date of incident, and third-party details.',
    tags: ['Insurance', 'Claims Processing', 'Compliance'],
    content: `Claimant: Priya Sharma
Policy Number: POL-98442-AX
Vehicle: Honda City 2021 (KA-05-MM-3321)
Incident Description: Rear-ended at traffic signal while coming home from office. Rear bumper cracked and taillight broken.
Estimated Repair Cost: ₹38,000
Workshop: QuickFix Motors, Indiranagar`,
  },
  {
    id: 'hospital-emergency-intake',
    name: 'Hospital Emergency Admission Record',
    domain: 'Healthcare & Clinical',
    description: 'Emergency ward intake with clinical vitals but missing critical drug allergies, emergency contact, and insurance ID.',
    tags: ['Healthcare', 'Patient Safety', 'Critical'],
    content: `Patient Name: David Miller
Age: 62
Gender: Male
Chief Complaint: Severe acute chest discomfort radiating to left shoulder and mild dyspnea for 2 hours.
Blood Pressure: 154/96 mmHg
Pulse Rate: 98 bpm
Past Medical History: Type 2 Diabetes diagnosed 2018.
Admitting Physician: Dr. Sarah Vance, MD`,
  },
  {
    id: 'engineering-job-application',
    name: 'Senior Full-Stack Engineer Candidate',
    domain: 'HR & Talent Acquisition',
    description: 'Job application containing candidate tech stack and salary request but missing notice period and citizenship/work authorization.',
    tags: ['HR Recruitment', 'Hiring', 'Screening'],
    content: `Applicant: Ananya Reddy
Email: ananya.reddy@example.com
Target Role: Senior Full Stack Engineer
Years of Experience: 6 years
Primary Skills: React, Node.js, TypeScript, PostgreSQL, AWS
Current CTC: 18 LPA
Expected CTC: 25 LPA
Portfolio: github.com/ananyared
Highest Degree: B.Tech Computer Science (2018)`,
  },
  {
    id: 'vendor-procurement-due-diligence',
    name: 'Enterprise Vendor Procurement Form',
    domain: 'Supply Chain & Procurement',
    description: 'Vendor onboarding form lacking GSTIN tax registration, bank account details, and ISO compliance certification.',
    tags: ['Procurement', 'B2B', 'Audit'],
    content: `Vendor Name: Apex Cloud Logistics Pvt Ltd
Business Address: Tech Park Tower B, Whitefield, Bengaluru
Contact Person: Vikram Malhotra (VP Sales)
Offered Services: Managed Cold-Chain Refrigerated Transport
Annual Contract Value Proposed: ₹42,00,000
Payment Terms Requested: 30 days net`,
  },
  {
    id: 'inconsistent-loan-application',
    name: 'Applicant with Suspicious Contradictions',
    domain: 'Fraud & Verification Audit',
    description: 'A loan submission with contradictory income vs liabilities, impossible timeline, and vague employment.',
    tags: ['Fraud Detection', 'Contradiction', 'Verification'],
    content: `Applicant Name: Sanjay Verma
Age: 21
Current Designation: Chief Executive Officer & Senior Principal Architect
Total Years of Experience: 9 years
Monthly Take-Home Salary: ₹30,000
Declared Existing Monthly EMI Payments: ₹55,000
Requested Personal Loan: ₹15,00,000
Loan Purpose: Vacation & Luxury Shopping
Contact: sanjay@temporary-mail.org`,
  },
  {
    id: 'csv-batch-sample',
    name: 'Batch Loan Applicants (CSV Table)',
    domain: 'Data Science / Batch Audit',
    description: 'A structured CSV dataset with 4 applicant records with different missing attributes.',
    tags: ['CSV / Tabular', 'Data Science', 'Batch'],
    content: `id,name,age,occupation,monthly_income,loan_amount,employment_years,credit_score,existing_emi
101,Rahul Kumar,25,Software Developer,45000,500000,,,
102,Meera Sen,34,Accountant,65000,300000,6,740,12000
103,Amitabh Roy,42,Self-Employed,120000,2000000,,680,
104,Sneha Patil,29,Consultant,85000,800000,4,,35000`,
  },
];
