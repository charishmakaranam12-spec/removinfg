import React from 'react';
import { AlertOctagon, HelpCircle, ShieldAlert } from 'lucide-react';
import { Contradiction } from '../types/agent';

interface ContradictionsCardProps {
  contradictions: Contradiction[];
}

export const ContradictionsCard: React.FC<ContradictionsCardProps> = ({ contradictions }) => {
  if (contradictions.length === 0) {
    return null;
  }

  return (
    <div className="bg-rose-50/50 border border-rose-200 rounded-xl p-5 mb-6">
      <div className="flex items-center space-x-2 text-rose-900 mb-3">
        <AlertOctagon className="w-5 h-5 text-rose-600" />
        <h3 className="text-sm font-bold">
          Adversarial Verification Flags: Contradictions &amp; Inconsistencies ({contradictions.length})
        </h3>
      </div>
      <p className="text-xs text-rose-800 mb-4 leading-relaxed">
        The Verification Agent analyzed cross-field relationships and detected factual or mathematical contradictions in the submitted data:
      </p>

      <div className="space-y-3">
        {contradictions.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-lg p-3.5 border border-rose-200 shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-900 flex items-center">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500 mr-1.5" />
                {c.title}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  c.severity === 'Critical'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {c.severity}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              {c.description}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span className="font-medium text-slate-700">Conflicting Fields:</span>
              {c.conflictingFields.map((f) => (
                <span
                  key={f}
                  className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-mono text-[10px]"
                >
                  {f}
                </span>
              ))}
              <span className="ml-auto text-[10px] text-slate-400">
                Flagged by {c.detectedBy}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
