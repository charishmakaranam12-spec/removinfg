import React, { useState } from 'react';
import { X, FileSpreadsheet, ArrowRight, Check } from 'lucide-react';

interface CsvBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRow: (rowContent: string) => void;
}

export const CsvBatchModal: React.FC<CsvBatchModalProps> = ({
  isOpen,
  onClose,
  onSelectRow,
}) => {
  const [csvText, setCsvText] = useState(`id,name,age,occupation,monthly_income,loan_amount,employment_years,credit_score,existing_emi
101,Rahul Kumar,25,Software Developer,45000,500000,,,
102,Meera Sen,34,Accountant,65000,300000,6,740,12000
103,Amitabh Roy,42,Self-Employed,120000,2000000,,680,
104,Sneha Patil,29,Consultant,85000,800000,4,,35000`);

  if (!isOpen) return null;

  const lines = csvText.split('\n').filter((l) => l.trim().length > 0);
  const headers = lines[0]?.split(',').map((h) => h.trim()) || [];
  const rows = lines.slice(1).map((line) => line.split(',').map((cell) => cell.trim()));

  const handleSelectRecord = (row: string[]) => {
    // Convert row into readable Key: Value format
    const formatted = headers
      .map((header, idx) => {
        const val = row[idx];
        return val ? `${header}: ${val}` : null;
      })
      .filter(Boolean)
      .join('\n');

    onSelectRow(formatted);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                CSV Dataset Ingestion &amp; Batch Applicant Inspection
              </h3>
              <p className="text-xs text-slate-500">
                Inspect tabular records and select any record to run the multi-agent detective
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

        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-semibold">
                <tr>
                  {headers.map((h, i) => (
                    <th key={i} className="py-2.5 px-3 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    {row.map((val, cellIdx) => (
                      <td
                        key={cellIdx}
                        className={`py-2 px-3 whitespace-nowrap font-mono ${
                          !val ? 'text-rose-400 italic bg-rose-50/40' : 'text-slate-700'
                        }`}
                      >
                        {val || '(Missing)'}
                      </td>
                    ))}
                    <td className="py-2 px-3 text-right">
                      <button
                        onClick={() => handleSelectRecord(row)}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs"
                      >
                        <span>Audit Row</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Edit or Paste Custom CSV:
            </label>
            <textarea
              rows={4}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              className="w-full text-xs font-mono p-3 rounded-lg border border-slate-200 focus:outline-indigo-500 bg-slate-50"
            />
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
