import React from 'react';
import {
  AlertOctagon,
  FileCheck2,
  Mail,
  Download,
  AlertTriangle,
  Layers,
  Sparkles,
} from 'lucide-react';
import { MissingInfoReport } from '../types/agent';

interface ExecutiveSummaryProps {
  report: MissingInfoReport;
  onOpenLetterModal: () => void;
  onDownloadJson: () => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  report,
  onOpenLetterModal,
  onDownloadJson,
}) => {
  const percentage = report.overallCompletenessPercentage;
  const strokeColor =
    percentage >= 80 ? 'text-emerald-500' : percentage >= 50 ? 'text-amber-500' : 'text-rose-500';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              Domain: {report.domain}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Case: {report.caseType}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
            {report.criticalNotice}
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            {report.applicationSummary}
          </p>
        </div>

        {/* Circular Progress Gauge */}
        <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80 min-w-[240px]">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`${strokeColor} transition-all duration-1000 ease-out`}
                strokeDasharray={`${percentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-sm font-extrabold text-slate-800">
              {percentage}%
            </span>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Data Completeness
            </div>
            <div className="text-sm font-bold text-slate-800">
              {percentage >= 80 ? 'Comprehensive' : percentage >= 50 ? 'Partially Complete' : 'Critical Deficit'}
            </div>
            <div className="text-xs text-slate-500">
              {report.presentFields.length} present / {report.presentFields.length + report.issues.length} expected
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
        <div className="bg-rose-50/70 border border-rose-200 rounded-lg p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-700">High Priority Risks</span>
            <AlertOctagon className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-rose-900 mt-1">
            {report.highPriorityCount}
          </div>
          <span className="text-[11px] text-rose-600">Decision-blocking items</span>
        </div>

        <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-700">Medium Priority</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-900 mt-1">
            {report.mediumPriorityCount}
          </div>
          <span className="text-[11px] text-amber-600">Important for appraisal</span>
        </div>

        <div className="bg-indigo-50/70 border border-indigo-200 rounded-lg p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-700">Contradictions</span>
            <Layers className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-indigo-900 mt-1">
            {report.contradictions.length}
          </div>
          <span className="text-[11px] text-indigo-600">Adversarial discrepancies</span>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700">Verified Present</span>
            <FileCheck2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-900 mt-1">
            {report.presentFields.length}
          </div>
          <span className="text-[11px] text-emerald-600">Available verified fields</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center text-xs text-slate-500 space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>
            Evaluated by Coordinator Agent via {report.modelUsed}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenLetterModal}
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-colors"
          >
            <Mail className="w-3.5 h-3.5 mr-1.5 text-slate-600" />
            <span>Generate Applicant Notice</span>
          </button>

          <button
            onClick={onDownloadJson}
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-slate-600" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
};
