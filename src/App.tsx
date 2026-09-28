import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Sparkles,
  FileText,
  RotateCcw,
  Bot,
  Layers,
  CheckCircle2,
  FileSpreadsheet,
  AlertTriangle,
  Send,
  Loader2,
  HelpCircle,
  Code2,
} from 'lucide-react';
import { Header } from './components/Header';
import { AgentPipelineVisualizer } from './components/AgentPipelineVisualizer';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { MissingIssuesList } from './components/MissingIssuesList';
import { ContradictionsCard } from './components/ContradictionsCard';
import { PresentFieldsTable } from './components/PresentFieldsTable';
import { AgentLogsView } from './components/AgentLogsView';
import { FollowUpLetterModal } from './components/FollowUpLetterModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { CsvBatchModal } from './components/CsvBatchModal';
import { PRESET_EXAMPLES } from './data/presets';
import { MissingInfoReport, AgentStepLog } from './types/agent';

export default function App() {
  const [inputText, setInputText] = useState<string>(PRESET_EXAMPLES[0].content);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESET_EXAMPLES[0].id);
  const [domainHint, setDomainHint] = useState<string>('loan');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activeAgentIndex, setActiveAgentIndex] = useState<number>(0);
  const [report, setReport] = useState<MissingInfoReport | null>(null);
  const [activeTab, setActiveTab] = useState<'issues' | 'present' | 'trace' | 'json'>('issues');
  const [selectedAgentLog, setSelectedAgentLog] = useState<AgentStepLog | undefined>(undefined);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState<boolean>(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);
  const [isBatchCsvModalOpen, setIsBatchCsvModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Run audit for a given text
  const runAudit = async (textToAudit: string, domain?: string) => {
    if (!textToAudit.trim()) return;

    setIsAnalyzing(true);
    setErrorMessage(null);
    setActiveAgentIndex(0);

    // Animate multi-agent progression steps for UX
    const stepInterval = setInterval(() => {
      setActiveAgentIndex((prev) => (prev < 4 ? prev + 1 : prev));
    }, 450);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: textToAudit,
          domainHint: domain || domainHint,
        }),
      });

      if (!response.ok) {
        throw new Error(`Audit request failed with status: ${response.status}`);
      }

      const data: MissingInfoReport = await response.json();
      setReport(data);
      if (data.agentLogs && data.agentLogs.length > 0) {
        setSelectedAgentLog(data.agentLogs[0]);
      }
    } catch (err: any) {
      console.error('Audit failed:', err);
      setErrorMessage(err.message || 'Failed to complete multi-agent analysis.');
    } finally {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      setActiveAgentIndex(4);
    }
  };

  // Run initial audit on mount so user sees immediate results
  useEffect(() => {
    runAudit(PRESET_EXAMPLES[0].content, 'loan');
  }, []);

  const handlePresetSelect = (presetId: string) => {
    const preset = PRESET_EXAMPLES.find((p) => p.id === presetId);
    if (preset) {
      setSelectedPresetId(presetId);
      setInputText(preset.content);

      let hint = 'loan';
      if (presetId.includes('accident') || presetId.includes('insurance')) hint = 'insurance';
      else if (presetId.includes('hospital')) hint = 'hospital';
      else if (presetId.includes('job') || presetId.includes('engineering')) hint = 'job';
      else if (presetId.includes('vendor')) hint = 'vendor';
      setDomainHint(hint);

      runAudit(preset.content, hint);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setInputText(content);
        setSelectedPresetId('custom');
        runAudit(content);
      }
    };
    reader.readAsText(file);
  };

  const handleResolveIssue = (id: string, userResponseText: string) => {
    if (!report) return;

    const updatedIssues = report.issues.map((iss) => {
      if (iss.id === id) {
        return {
          ...iss,
          isResolved: true,
          userResponse: userResponseText,
        };
      }
      return iss;
    });

    // Add resolved field to present fields
    const targetIssue = report.issues.find((i) => i.id === id);
    const updatedPresent = [...report.presentFields];
    if (targetIssue) {
      updatedPresent.push({
        field: targetIssue.field,
        value: userResponseText,
        confidence: 1.0,
        isValid: true,
        notes: 'Provided via interactive follow-up resolution',
      });
    }

    const unresolvedCount = updatedIssues.filter((i) => !i.isResolved).length;
    const total = updatedPresent.length + unresolvedCount;
    const newCompleteness = total > 0 ? Math.round((updatedPresent.length / total) * 100) : 100;

    setReport({
      ...report,
      issues: updatedIssues,
      presentFields: updatedPresent,
      overallCompletenessPercentage: newCompleteness,
      criticalNotice:
        unresolvedCount > 0
          ? `Before this application can be fully processed, ${unresolvedCount} important pieces of information should be collected.`
          : 'All essential information has been collected. Application is ready for final decisioning!',
      highPriorityCount: updatedIssues.filter((i) => i.priority === 'High' && !i.isResolved).length,
      mediumPriorityCount: updatedIssues.filter((i) => i.priority === 'Medium' && !i.isResolved).length,
      lowPriorityCount: updatedIssues.filter((i) => i.priority === 'Low' && !i.isResolved).length,
    });
  };

  const handleDownloadJson = () => {
    if (!report) return;
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Missing_Info_Audit_${report.caseType.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans">
      <Header
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        onOpenBatchCsv={() => setIsBatchCsvModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Input & Ingestion Section */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center">
                <FileText className="w-4 h-4 text-indigo-600 mr-2" />
                Upload Document, Form, or Dataset to Audit
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Paste raw application text, choose domain benchmarks, or upload CSV / PDF text
              </p>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".csv,.txt,.json,.md"
              className="hidden"
            />

            <div className="flex items-center space-x-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <Upload className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                <span>Upload File (.csv / .txt)</span>
              </button>

              <button
                onClick={() => {
                  setInputText('');
                  setSelectedPresetId('custom');
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                title="Clear input"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Presets Pills */}
          <div className="mt-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Select Demo Case Study:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_EXAMPLES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedPresetId === preset.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Editor & Run Control */}
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setSelectedPresetId('custom');
                }}
                rows={5}
                placeholder="Paste application text, loan details, medical intake, or CSV rows here..."
                className="w-full text-xs font-mono p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-indigo-500 text-slate-800 leading-relaxed shadow-inner"
              />
            </div>

            <div className="flex flex-col justify-between space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Domain Context:
                </label>
                <select
                  value={domainHint}
                  onChange={(e) => setDomainHint(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 focus:outline-indigo-500"
                >
                  <option value="loan">Banking &amp; Lending (Credit)</option>
                  <option value="insurance">Insurance Accident Claims</option>
                  <option value="hospital">Hospital Emergency Intake</option>
                  <option value="job">HR Recruitment &amp; Hiring</option>
                  <option value="vendor">Vendor Procurement &amp; Tax</option>
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Grounds expected requirements to standard checklists
                </span>
              </div>

              <button
                onClick={() => runAudit(inputText)}
                disabled={isAnalyzing || !inputText.trim()}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  isAnalyzing || !inputText.trim()
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 active:scale-[0.98]'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Orchestrating 4 Agents...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run Multi-Agent Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Multi-Agent Orchestration Flow Graph */}
        <AgentPipelineVisualizer
          logs={report?.agentLogs || []}
          isAnalyzing={isAnalyzing}
          activeAgentIndex={activeAgentIndex}
          onSelectAgent={(log) => {
            setSelectedAgentLog(log);
            setActiveTab('trace');
          }}
          selectedAgentName={selectedAgentLog?.agentName}
        />

        {/* Report Section */}
        {report && (
          <>
            {/* Executive Summary with circular completeness gauge */}
            <ExecutiveSummary
              report={report}
              onOpenLetterModal={() => setIsLetterModalOpen(true)}
              onDownloadJson={handleDownloadJson}
            />

            {/* Contradictions Flag Card (if any detected) */}
            <ContradictionsCard contradictions={report.contradictions} />

            {/* View Tabs */}
            <div className="flex border-b border-slate-200 mb-5 gap-4">
              <button
                onClick={() => setActiveTab('issues')}
                className={`pb-3 text-xs font-bold flex items-center space-x-2 transition-colors relative ${
                  activeTab === 'issues'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Missing Information ({report.issues.length})</span>
                {report.highPriorityCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                    {report.highPriorityCount} High
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('present')}
                className={`pb-3 text-xs font-bold flex items-center space-x-2 transition-colors relative ${
                  activeTab === 'present'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Information Present ({report.presentFields.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('trace')}
                className={`pb-3 text-xs font-bold flex items-center space-x-2 transition-colors relative ${
                  activeTab === 'trace'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Agent Reasoning &amp; Trace</span>
              </button>

              <button
                onClick={() => setActiveTab('json')}
                className={`pb-3 text-xs font-bold flex items-center space-x-2 transition-colors relative ${
                  activeTab === 'json'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Structured JSON</span>
              </button>
            </div>

            {/* Tab Views */}
            {activeTab === 'issues' && (
              <MissingIssuesList
                issues={report.issues}
                onResolveIssue={handleResolveIssue}
              />
            )}

            {activeTab === 'present' && (
              <PresentFieldsTable fields={report.presentFields} />
            )}

            {activeTab === 'trace' && (
              <AgentLogsView
                logs={report.agentLogs}
                selectedAgent={selectedAgentLog}
              />
            )}

            {activeTab === 'json' && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 overflow-x-auto text-emerald-400 font-mono text-xs max-h-[600px]">
                <pre>{JSON.stringify(report, null, 2)}</pre>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <FollowUpLetterModal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
        report={report || ({} as any)}
      />

      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />

      <CsvBatchModal
        isOpen={isBatchCsvModalOpen}
        onClose={() => setIsBatchCsvModalOpen(false)}
        onSelectRow={(rowContent) => {
          setInputText(rowContent);
          setSelectedPresetId('custom');
          setDomainHint('loan');
          runAudit(rowContent, 'loan');
        }}
      />
    </div>
  );
}
