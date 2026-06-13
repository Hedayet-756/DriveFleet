import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex h-[85vh] w-full flex-col items-center justify-center gap-4 bg-transparent">

      {/* 🏎️ মডার্ন স্পিন লোডার */}
      <div className="relative flex items-center justify-center">
        {/* বাইরের বড় হালকা রিং */}
        <div className="h-16 w-16 rounded-full border-4 border-slate-100"></div>

        {/* ভেতরের স্পিনিং রিং (Cyan-Blue Gradient Touch) */}
        <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-t-cyan-500 border-r-blue-500 border-b-transparent border-l-transparent"></div>
      </div>

      {/* 📝 নিচে সুন্দর গ্লোয়িং টেক্সট */}
      <div className="flex items-center gap-1 text-sm font-bold uppercase tracking-widest text-slate-500">
        Loading
        <span className="flex gap-0.5 ml-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-500 [animation-delay:-0.3s]"></span>
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-500 [animation-delay:-0.15s]"></span>
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500"></span>
        </span>
      </div>

    </div>
  );
};

export default LoadingPage;