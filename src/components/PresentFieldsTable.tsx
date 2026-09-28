import React from 'react';
import { CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { PresentField } from '../types/agent';

interface PresentFieldsTableProps {
  fields: PresentField[];
}

export const PresentFieldsTable: React.FC<PresentFieldsTableProps> = ({ fields }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs mb-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-800">
            Information Already Available ({fields.length} Fields)
          </h3>
        </div>
        <span className="text-xs text-slate-500">
          Verified by Data Completeness Agent
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <th className="py-2.5 px-3">Field Name</th>
              <th className="py-2.5 px-3">Extracted Stated Value</th>
              <th className="py-2.5 px-3 text-center">Extraction Confidence</th>
              <th className="py-2.5 px-3 text-right">Validity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fields.map((field, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-900">
                  {field.field}
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-700 max-w-xs truncate">
                  {field.value}
                </td>
                <td className="py-2.5 px-3 text-center text-slate-500">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 font-medium text-[11px]">
                    {Math.round(field.confidence * 100)}%
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right">
                  {field.isValid ? (
                    <span className="inline-flex items-center text-emerald-700 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      Valid
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-amber-700 font-semibold text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      Partial / Empty
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
