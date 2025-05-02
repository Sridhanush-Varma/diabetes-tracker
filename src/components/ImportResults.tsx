import React from 'react';
import { ImportResult } from '@/utils/importUtils';

interface ImportResultsProps {
  result: ImportResult;
  onClose: () => void;
}

const ImportResults: React.FC<ImportResultsProps> = ({ result, onClose }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-100">
      <div className="flex items-center mb-6">
        {result.success ? (
          <div className="bg-gradient-to-r from-tertiary-500 to-primary-500 p-3 rounded-full mr-4 shadow-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-rose-500 to-primary-500 p-3 rounded-full mr-4 shadow-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
        <h2 className="text-xl font-semibold gradient-text">
          {result.success ? 'Import Completed' : 'Import Failed'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 p-4 rounded-xl border border-white shadow-sm">
          <div className="flex items-center mb-2">
            <div className="bg-white/80 p-1.5 rounded-md shadow-sm mr-2">
              <svg className="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-xs text-neutral-600 font-medium">Total Records</p>
          </div>
          <p className="text-xl font-bold text-primary-700 mt-1">{result.totalRecords}</p>
        </div>

        <div className="bg-gradient-to-br from-tertiary-50 to-tertiary-100/50 p-4 rounded-xl border border-white shadow-sm">
          <div className="flex items-center mb-2">
            <div className="bg-white/80 p-1.5 rounded-md shadow-sm mr-2">
              <svg className="w-3.5 h-3.5 text-tertiary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-xs text-neutral-600 font-medium">New Records</p>
          </div>
          <p className="text-xl font-bold text-tertiary-700 mt-1">{result.importedRecords}</p>
        </div>

        <div className="bg-gradient-to-br from-accent-50 to-accent-100/50 p-4 rounded-xl border border-white shadow-sm">
          <div className="flex items-center mb-2">
            <div className="bg-white/80 p-1.5 rounded-md shadow-sm mr-2">
              <svg className="w-3.5 h-3.5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <p className="text-xs text-neutral-600 font-medium">Updated Records</p>
          </div>
          <p className="text-xl font-bold text-accent-700 mt-1">{result.updatedRecords}</p>
        </div>
      </div>

      {result.errors.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2 text-neutral-800">Errors ({result.errors.length}):</h3>
          <div className="bg-rose-50 rounded-lg border border-rose-100 p-4 max-h-60 overflow-y-auto">
            <ul className="list-disc pl-5 space-y-1 text-sm text-rose-700">
              {result.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 font-medium py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-opacity-50 inline-flex items-center justify-center"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImportResults;
