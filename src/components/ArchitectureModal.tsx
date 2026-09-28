import React from 'react';
import { X, Layers, BrainCircuit, ShieldAlert, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Multi-Agent Architecture &amp; Methodology
              </h3>
              <p className="text-xs text-slate-500">
                Autonomous Collaborative Reasoning for Missing Information Discovery
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

        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600 leading-relaxed">
          {/* Why Multi-Agent? */}
          <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-100">
            <h4 className="font-bold text-indigo-950 mb-2 flex items-center text-sm">
              <Sparkles className="w-4 h-4 mr-1.5 text-indigo-600" />
              Why Multi-Agent Instead of a Single Chatbot?
            </h4>
            <p className="text-xs text-indigo-900/90 leading-relaxed">
              Standard LLM chatbots suffer from &ldquo;over-generation syndrome&rdquo; — when asked what is missing, they either generate 30 trivial questions, hallucinate that present data is missing, or fail to prioritize high-risk decision blockers. By separating concerns across four specialized autonomous agents with an adversarial verification stage, the system delivers precise, calibrated, and actionable audits.
            </p>
          </div>

          {/* The 4 Specialized Agents + Coordinator */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm flex items-center">
              <Layers className="w-4 h-4 mr-1.5 text-slate-700" />
              The 4 Specialized Agents + Coordinator
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                <span className="font-bold text-slate-900 block mb-1">
                  1. Data Completeness Agent
                </span>
                <p className="text-slate-600">
                  Parses unstructured text, CSV rows, or key-value entries. Identifies stated data points, flags empty or placeholder values (&ldquo;N/A&rdquo;, blanks), and establishes what is already present.
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                <span className="font-bold text-slate-900 block mb-1">
                  2. Context Agent
                </span>
                <p className="text-slate-600">
                  Determines application intent and regulatory framework (lending credit, clinical intake, insurance claim, hiring, procurement). Compares available data against institutional checklists.
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                <span className="font-bold text-slate-900 block mb-1">
                  3. Risk Agent
                </span>
                <p className="text-slate-600">
                  Evaluates downstream failure modes. Assigns priority (High, Medium, Low) and explains why each missing field represents a severe financial, clinical, or compliance hazard.
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                <span className="font-bold text-slate-900 block mb-1">
                  4. Verification Agent (Adversarial)
                </span>
                <p className="text-slate-600">
                  Acts as the critical sanity filter. Prunes bureaucratic over-reach, ensures no already-present fields are re-asked, and detects mathematical or chronological contradictions.
                </p>
              </div>
            </div>
          </div>

          {/* Flow Pipeline */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-900 text-slate-100">
            <h4 className="font-bold text-slate-200 mb-2 text-xs uppercase tracking-wider font-mono">
              Pipeline State Machine
            </h4>
            <div className="font-mono text-xs space-y-1.5 text-slate-300">
              <div className="text-blue-400">Raw Input (Text / CSV / Report)</div>
              <div>&nbsp;&nbsp;↓ Ingestion &amp; Key Extraction</div>
              <div className="text-indigo-300">[Data Completeness Agent] → Stated Fields &amp; Omissions</div>
              <div>&nbsp;&nbsp;↓ Domain Context Grounding</div>
              <div className="text-purple-300">[Context Agent] → Domain Checklist &amp; Norms</div>
              <div>&nbsp;&nbsp;↓ Risk Impact Analysis</div>
              <div className="text-amber-300">[Risk Agent] → High/Med/Low Priority Mapping</div>
              <div>&nbsp;&nbsp;↓ Adversarial Sanity &amp; Contradiction Audit</div>
              <div className="text-emerald-300">[Verification Agent] → Filtered Issues &amp; Flagged Contradictions</div>
              <div>&nbsp;&nbsp;↓ Synthesis &amp; Questionnaire Formulation</div>
              <div className="text-cyan-300">[Coordinator Agent] → Executive Report &amp; Follow-up Actions</div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
