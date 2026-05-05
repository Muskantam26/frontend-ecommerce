import React from 'react'

const Pageloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer rotating ring */}
        <div className="absolute w-24 h-24 border-4 border-t-[#fdc402] border-r-transparent border-b-[#fdc402] border-l-transparent rounded-full animate-spin"></div>
        
        {/* Inner pulsing dot */}
        <div className="w-16 h-16 bg-[#fdc402] rounded-full animate-pulse shadow-[0_0_20px_rgba(253,196,2,0.6)]"></div>
        
        {/* Loading text below */}
        <div className="mt-10 flex items-center gap-1">
          <span className="text-lg font-bold tracking-[0.2em] text-[#181818] uppercase">
            Loading
          </span>
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-[#181818] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1.5 h-1.5 bg-[#181818] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1.5 h-1.5 bg-[#181818] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Pageloader