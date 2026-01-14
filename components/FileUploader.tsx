
import React, { useCallback } from 'react';

interface FileUploaderProps {
  onUpload: (base64: string, mimeType: string) => void;
  isLoading: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, isLoading }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      onUpload(base64, file.type);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-blue-50 text-blue-600 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tải lên lịch tiêm</h3>
        <p className="text-gray-500 text-sm mb-6">
          Chụp ảnh hoặc chọn hình ảnh bảng lịch trình giảm cân của bạn (Hình 1) để phân tích dữ liệu tự động.
        </p>
        
        <label className={`
          relative flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all cursor-pointer
          ${isLoading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-95'}
        `}>
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Đang xử lý...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Chọn hình ảnh</span>
            </>
          )}
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
            disabled={isLoading}
          />
        </label>
      </div>
    </div>
  );
};

export default FileUploader;
