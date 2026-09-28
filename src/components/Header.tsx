import React from 'react';
import { ShieldCheck, Sparkles, BookOpen, FileSpreadsheet } from 'lucide-react';

interface HeaderProps {
  onOpenArchitecture: () => void;
  onOpenBatchCsv: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenArchitecture, onOpenBatchCsv }) => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                AI Missing Information Detective
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Multi-Agent System
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Autonomous 4-Agent Auditor: Completeness • Context • Risk • Adversarial Verification
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenBatchCsv}
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
            title="Inspect CSV dataset batch"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-slate-600" />
            <span className="hidden md:inline">Batch CSV</span>
          </button>

          <button
            onClick={onOpenArchitecture}
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
            <span>Architecture &amp; Methodology</span>
          </button>

          <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Multi-Agent Consensus</span>
          </div>
        </div>
      </div>
    </header>
  );
};
