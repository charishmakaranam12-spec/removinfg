import React, { useState } from 'react';
import {
  AlertTriangle,
  HelpCircle,
  Copy,
  Check,
  CheckCircle,
  MessageSquare,
  Bot,
  ShieldAlert,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { MissingIssue, Priority, IssueStatus } from '../types/agent';

interface MissingIssuesListProps {
  issues: MissingIssue[];
  onResolveIssue: (id: string, responseText: string) => void;
}

export const MissingIssuesList: React.FC<MissingIssuesListProps> = ({
  issues,
  onResolveIssue,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [responseInputs, setResponseInputs] = useState<Record<string, string>>({});

  const handleCopyQuestion = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInputChange = (id: string, val: string) => {
    setResponseInputs((prev) => ({ ...prev, [id]: val }));
  };

  const handleResolveClick = (id: string) => {
    const text = responseInputs[id]?.trim() || '';
    if (text) {
      onResolveIssue(id, text);
    }
  };

  const filteredIssues = issues.filter((issue) => {
    if (filterPriority !== 'all' && issue.priority !== filterPriority) return false;
    if (filterStatus !== 'all' && issue.status !== filterStatus) return false;
    return true;
  });

  const getPriorityBadge = (priority: Priority) => {
    switch (priority) {
      case 'High':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            High Priority
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            Medium Priority
          </span>
        );
      case 'Low':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            Low Priority
          </span>
        );
    }
  };

  const getStatusBadge = (status: IssueStatus) => {
    switch (status) {
      case 'missing':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
            Missing
          </span>
        );
      case 'uncertain':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200">
            Uncertain
          </span>
        );
      case 'inconsistent':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
            Inconsistent
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter and Count Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-800">
            Identified Missing Information &amp; Risks ({filteredIssues.length})
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Priority:</span>
          </div>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-indigo-500"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Only</option>
            <option value="Medium">Medium Only</option>
            <option value="Low">Low Only</option>
          </select>

          <div className="flex items-center space-x-1.5 text-xs text-slate-500 ml-2">
            <span>Status:</span>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="missing">Missing</option>
            <option value="uncertain">Uncertain</option>
            <option value="inconsistent">Inconsistent</option>
          </select>
        </div>
      </div>

      {/* Issues Cards */}
      <div className="space-y-3.5">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className={`bg-white rounded-xl border transition-all ${
              issue.isResolved
                ? 'border-emerald-200 bg-emerald-50/20 opacity-80'
                : issue.priority === 'High'
                ? 'border-slate-200 hover:border-rose-300 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 shadow-xs'
            } p-5`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-slate-900 tracking-tight">
                  {issue.field}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                  {issue.category}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {getPriorityBadge(issue.priority)}
                {getStatusBadge(issue.status)}
                {issue.isResolved && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Resolved
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
              {/* Why required */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex items-center space-x-1.5 font-semibold text-slate-800 mb-1">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Why is this required?</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {issue.whyRequired}
                </p>
              </div>

              {/* Potential Impact */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex items-center space-x-1.5 font-semibold text-slate-800 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Decision &amp; Operational Risk</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {issue.potentialImpact}
                </p>
              </div>
            </div>

            {/* Suggested Follow-Up Question */}
            <div className="mt-3 bg-indigo-50/50 border border-indigo-100 rounded-lg p-3.5">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-indigo-900">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Suggested Question to Request from User:</span>
                </div>

                <button
                  onClick={() => handleCopyQuestion(issue.id, issue.suggestedQuestion)}
                  className="inline-flex items-center text-[11px] font-medium text-indigo-700 hover:text-indigo-900 transition-colors"
                >
                  {copiedId === issue.id ? (
                    <>
                      <Check className="w-3 h-3 mr-1 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      <span>Copy Question</span>
                    </>
                  )}
                </button>
              </div>

              <blockquote className="text-xs text-indigo-950 font-medium italic border-l-2 border-indigo-400 pl-2.5 py-0.5">
                &ldquo;{issue.suggestedQuestion}&rdquo;
              </blockquote>

              {/* Interactive Resolution Panel */}
              {!issue.isResolved ? (
                <div className="mt-3 pt-3 border-t border-indigo-100/80 flex items-center space-x-2">
                  <input
                    type="text"
                    value={responseInputs[issue.id] || ''}
                    onChange={(e) => handleInputChange(issue.id, e.target.value)}
                    placeholder="Enter answer (e.g. 3 years permanent, or ₹12,000 EMI)..."
                    className="flex-1 text-xs px-3 py-1.5 rounded-md border border-slate-200 bg-white focus:outline-indigo-500 text-slate-800"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleResolveClick(issue.id);
                    }}
                  />
                  <button
                    onClick={() => handleResolveClick(issue.id)}
                    className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs cursor-pointer"
                  >
                    <span>Submit &amp; Resolve</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              ) : (
                <div className="mt-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
                  <span className="font-semibold">User Answer Provided:</span> {issue.userResponse}
                </div>
              )}
            </div>

            {/* Agent Attribution Footer */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
              <div className="flex items-center space-x-2">
                <span className="flex items-center text-slate-600">
                  <Bot className="w-3 h-3 mr-1 text-indigo-500" />
                  Discovered by:
                </span>
                {issue.identifiedBy.map((ag) => (
                  <span
                    key={ag}
                    className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700"
                  >
                    {ag.replace(' Agent', '')}
                  </span>
                ))}
              </div>

              {issue.verifiedBy && (
                <span className="text-emerald-700 font-medium flex items-center">
                  <Check className="w-3 h-3 mr-1" />
                  Verified by: {issue.verifiedBy.replace(' Agent', '')}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
