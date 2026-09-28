import React from 'react';
import {
  FileSearch,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Workflow,
  ChevronRight,
  BrainCircuit,
  Clock,
} from 'lucide-react';
import { AgentStepLog } from '../types/agent';

interface AgentPipelineVisualizerProps {
  logs: AgentStepLog[];
  isAnalyzing: boolean;
  activeAgentIndex: number;
  onSelectAgent: (log: AgentStepLog) => void;
  selectedAgentName?: string;
}

export const AgentPipelineVisualizer: React.FC<AgentPipelineVisualizerProps> = ({
  logs,
  isAnalyzing,
  activeAgentIndex,
  onSelectAgent,
  selectedAgentName,
}) => {
  const agentIcons: Record<string, React.ReactNode> = {
    'Data Completeness Agent': <FileSearch className="w-4 h-4" />,
    'Context Agent': <Compass className="w-4 h-4" />,
    'Risk Agent': <AlertTriangle className="w-4 h-4" />,
    'Verification Agent': <CheckCircle2 className="w-4 h-4" />,
    'Coordinator Agent': <BrainCircuit className="w-4 h-4" />,
  };

  const defaultAgents = [
    {
      agentName: 'Data Completeness Agent' as const,
      role: 'Examines uploaded fields, detects missing/empty slots.',
    },
    {
      agentName: 'Context Agent' as const,
      role: 'Determines case domain, retrieves expected industry requirements.',
    },
    {
      agentName: 'Risk Agent' as const,
      role: 'Assigns priority (High/Med/Low) & assesses decision impact.',
    },
    {
      agentName: 'Verification Agent' as const,
      role: 'Prunes redundant questions & detects contradictions.',
    },
    {
      agentName: 'Coordinator Agent' as const,
      role: 'Synthesizes report, completeness %, and follow-up questionnaire.',
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs mb-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <Workflow className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-semibold text-slate-800">
            Multi-Agent Orchestration Pipeline
          </h3>
        </div>
        <div className="text-xs text-slate-500 flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          <span>4 Autonomous Specialists + Coordinator</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {defaultAgents.map((def, idx) => {
          const log = logs.find((l) => l.agentName === def.agentName);
          const isCurrent = isAnalyzing && activeAgentIndex === idx;
          const isDone = Boolean(log) && !isAnalyzing;
          const isSelected = selectedAgentName === def.agentName;

          return (
            <div
              key={def.agentName}
              onClick={() => log && onSelectAgent(log)}
              className={`relative rounded-lg p-3 border transition-all cursor-pointer ${
                isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/40'
                  : isCurrent
                  ? 'border-amber-400 bg-amber-50/50 shadow-sm animate-pulse'
                  : isDone
                  ? 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
                  : 'border-slate-200 bg-slate-50/30 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono font-medium text-slate-500">
                  Agent #{idx + 1}
                </span>
                {isCurrent && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800">
                    Active
                  </span>
                )}
                {isDone && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Done</span>
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 mb-1">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    idx === 0
                      ? 'bg-blue-100 text-blue-700'
                      : idx === 1
                      ? 'bg-purple-100 text-purple-700'
                      : idx === 2
                      ? 'bg-amber-100 text-amber-700'
                      : idx === 3
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}
                >
                  {agentIcons[def.agentName]}
                </div>
                <h4 className="text-xs font-semibold text-slate-800 truncate" title={def.agentName}>
                  {def.agentName.replace(' Agent', '')}
                </h4>
              </div>

              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                {log?.role || def.role}
              </p>

              {log?.executionTimeMs !== undefined && (
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center text-[10px] text-slate-400">
                  <Clock className="w-2.5 h-2.5 mr-1" />
                  <span>{log.executionTimeMs} ms</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
