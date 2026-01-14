
import React, { useRef, useCallback } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList 
} from 'recharts';
import { toPng } from 'html-to-image';
import { ProgressData } from '../types';

interface BMIChartProps {
  data: ProgressData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-lg">
        <p className="text-xs text-gray-400 font-bold uppercase mb-1">{label}</p>
        <p className="text-sm font-semibold text-blue-600">
          BMI: {payload[0].value}
        </p>
        <p className="text-sm font-medium text-gray-600">
          Cân nặng: {payload[0].payload.weight} kg
        </p>
      </div>
    );
  }
  return null;
};

const BMIChart: React.FC<BMIChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const downloadChart = useCallback(() => {
    if (chartRef.current === null) return;
    
    toPng(chartRef.current, { backgroundColor: '#ffffff', cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `bmi-chart-${new Date().getTime()}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Lỗi khi tải biểu đồ:', err);
      });
  }, [chartRef]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-[450px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Biểu đồ thay đổi BMI</h3>
          <p className="text-xs text-gray-400 font-medium">Theo dõi tiến trình giảm cân qua từng ngày tiêm</p>
        </div>
        <button 
          onClick={downloadChart}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors border border-blue-100 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Tải hình ảnh
        </button>
      </div>
      
      <div ref={chartRef} className="w-full h-full pb-6 pt-4 bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sortedData} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              stroke="#94a3b8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(date) => {
                const d = new Date(date);
                return `${d.getDate()}/${d.getMonth() + 1}`;
              }}
              dy={10}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              domain={['dataMin - 1', 'dataMax + 1']}
              tickFormatter={(val) => val.toFixed(1)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="bmi" 
              stroke="#2563eb" 
              strokeWidth={3} 
              dot={{ r: 5, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 7, strokeWidth: 0 }}
              animationDuration={1500}
            >
              <LabelList 
                dataKey="bmi" 
                position="top" 
                offset={12}
                fill="#1e40af" 
                fontSize={11} 
                fontWeight="bold"
                formatter={(val: number) => val.toFixed(1)}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BMIChart;
