import React, { useState } from 'react';
import { X, Copy, Check, Mail, Send } from 'lucide-react';
import { MissingInfoReport } from '../types/agent';

interface FollowUpLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: MissingInfoReport;
}

export const FollowUpLetterModal: React.FC<FollowUpLetterModalProps> = ({
  isOpen,
  onClose,
  report,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const letterText = `Subject: Additional Information Required for Your ${report.caseType}

Dear Applicant / Stakeholder,

Thank you for submitting your application for ${report.caseType}.

Our automated application review system has completed an initial completeness audit. To finalize the processing and make a definitive decision, we require additional details on the following items:

${report.issues
  .map(
    (issue, i) =>
      `${i + 1}. ${issue.field} [Priority: ${issue.priority}]
   • Question: "${issue.suggestedQuestion}"
   • Purpose: ${issue.whyRequired}`
  )
  .join('\n\n')}

${
  report.contradictions.length > 0
    ? `\nClarifications Required on Stated Data:\n${report.contradictions
        .map((c, i) => `${i + 1}. ${c.title}: ${c.description}`)
        .join('\n')}\n`
    : ''
}
Please reply directly to this notice or upload the necessary documentation within 5 business days to proceed with your case without cancellation or delay.

Sincerely,
Underwriting & Review Operations Team
AI Missing Information Detective System`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Official Applicant Follow-up Notice
              </h3>
              <p className="text-xs text-slate-500">
                Generated from Coordinator Agent consensus
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1 font-mono text-xs text-slate-700 bg-slate-50/60 leading-relaxed whitespace-pre-wrap">
          {letterText}
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white rounded-b-2xl">
          <span className="text-xs text-slate-500">
            {report.issues.length} missing items included
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1.5" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1.5" />
                  <span>Copy Notice Text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
