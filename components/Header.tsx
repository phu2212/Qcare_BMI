
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
            W
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">BMI Tracker</h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Weight Loss Assistant</p>
          </div>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-blue-600 transition-colors">Báo cáo</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Lịch sử</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Cài đặt</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
