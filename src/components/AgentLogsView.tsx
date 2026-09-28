import React from 'react';
import { Terminal, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { AgentStepLog } from '../types/agent';

interface AgentLogsViewProps {
  logs: AgentStepLog[];
  selectedAgent?: AgentStepLog;
}

export const AgentLogsView: React.FC<AgentLogsViewProps> = ({ logs, selectedAgent }) => {
  const activeLog = selectedAgent || logs[0];

  if (!activeLog) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-md mb-6 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-200">
            Agent Reasoning &amp; Decision Trace: {activeLog.agentName}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
          <Clock className="w-3.5 h-3.5" />
          <span>Execution: {activeLog.executionTimeMs || 120} ms</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
          <span className="text-slate-400 block mb-1 text-[11px] uppercase tracking-wider font-semibold">
            Role &amp; Prompt Directive:
          </span>
          <p className="text-emerald-300 font-sans text-xs">
            {activeLog.role}
          </p>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
          <span className="text-slate-400 block mb-2 text-[11px] uppercase tracking-wider font-semibold">
            Agent Chain-of-Thought Thoughts:
          </span>
          <ul className="space-y-1.5 list-none font-sans text-xs text-slate-300">
            {activeLog.thoughts.map((thought, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <ChevronRight className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                <span>{thought}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
          <span className="text-slate-400 block mb-1 text-[11px] uppercase tracking-wider font-semibold">
            Agent Output Consensus Summary:
          </span>
          <p className="text-cyan-300 font-sans text-xs">
            {activeLog.findingsSummary}
          </p>
        </div>
      </div>
    </div>
  );
};
