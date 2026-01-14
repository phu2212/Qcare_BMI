
import React from 'react';
import { ProgressData } from '../types';

interface DataTableProps {
  data: ProgressData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Chi tiết dữ liệu</h3>
        <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded">
          {data.length} lần đo
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-gray-50/50">
            <tr>
              <th className="px-6 py-3 font-semibold">STT</th>
              <th className="px-6 py-3 font-semibold">Ngày tiêm</th>
              <th className="px-6 py-3 font-semibold text-right">Cân nặng (kg)</th>
              <th className="px-6 py-3 font-semibold text-right">BMI</th>
              <th className="px-6 py-3 font-semibold text-right">Mỡ nội tạng</th>
              <th className="px-6 py-3 font-semibold text-center">Ghi chú</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{row.stt}</td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(row.date).toLocaleDateString('vi-VN')}
                </td>
                <td className="px-6 py-4 text-right font-medium text-gray-900">{row.weight.toFixed(2)}</td>
                <td className="px-6 py-4 text-right font-bold text-blue-600">{row.bmi.toFixed(1)}</td>
                <td className="px-6 py-4 text-right text-gray-600">{row.visceralFat ?? '-'}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`
                    inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase
                    ${row.notes?.includes('Đã Tiêm') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}
                  `}>
                    {row.notes || 'N/A'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
