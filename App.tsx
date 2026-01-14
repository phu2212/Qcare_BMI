
import React, { useState } from 'react';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import BMIChart from './components/BMIChart';
import DataTable from './components/DataTable';
import { extractDataFromImage } from './services/geminiService';
import { ExtractionResult } from './types';

const App: React.FC = () => {
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (base64: string, mimeType: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await extractDataFromImage(base64, mimeType);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError("Không thể trích xuất dữ liệu từ hình ảnh. Vui lòng kiểm tra lại chất lượng ảnh.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Form/Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Xin chào! 👋</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tải lên bảng theo dõi sức khỏe của bạn để chúng tôi giúp bạn trực quan hóa tiến độ giảm cân một cách dễ dàng.
              </p>
            </div>

            <FileUploader onUpload={handleUpload} isLoading={isLoading} />

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {result && (
              <div className="bg-blue-600 rounded-2xl shadow-xl shadow-blue-200 p-6 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Hồ sơ khách hàng</p>
                  <h3 className="text-2xl font-bold mb-4">{result.customerName}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-blue-500/50 flex items-center justify-center">📅</span>
                      <span>Ngày bắt đầu: {result.startDate ? new Date(result.startDate).toLocaleDateString('vi-VN') : 'N/A'}</span>
                    </div>
                  </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-8 space-y-8">
            {result ? (
              <>
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <BMIChart data={result.data} />
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <DataTable data={result.data} />
                </div>
                <div className="flex justify-center">
                  <button 
                    onClick={reset}
                    className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2 px-4 py-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Xóa dữ liệu và tải ảnh mới
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-400">Chưa có dữ liệu phân tích</h3>
                <p className="text-gray-400 text-sm max-w-xs mx-auto mt-2">
                  Biểu đồ và bảng chi tiết sẽ hiển thị tại đây sau khi bạn tải ảnh lên thành công.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-12 py-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-400 font-medium">
          © {new Date().getFullYear()} BMI Tracker Assistant • Được hỗ trợ bởi Gemini AI
        </div>
      </footer>
    </div>
  );
};

export default App;
