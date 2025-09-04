import { useState, useEffect } from 'react';

export default function LoadingSpinner() {
  const [loadingStage, setLoadingStage] = useState(0); // 0: name, 1: battery, 2: complete
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show name for 2.5 seconds (increased from 2)
    if (loadingStage === 0) {
      const timer = setTimeout(() => {
        setLoadingStage(1);
      }, 2500);
      return () => clearTimeout(timer);
    }

    // Animate battery filling - slower and smoother
    if (loadingStage === 1) {
      const interval = setInterval(() => {
        setBatteryLevel(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setLoadingStage(2);
              setShowContent(true);
            }, 800); // Slightly longer pause at 100%
            return 100;
          }
          return prev + 1; // Slower fill speed (was 2)
        });
      }, 70); // Slightly longer interval (was 50ms)
      return () => clearInterval(interval);
    }
  }, [loadingStage]);

  // Render website content when loading is complete
  if (showContent) {
    return (
      <div className="fade-in-content">
        <h1>Welcome to My Website</h1>
        <p>Your content goes here...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center overflow-hidden">
      {loadingStage === 0 && (
        <div className="name-display">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-indigo-800">
            ADISA OLASHILE
          </h1>
          <div className="mt-4 h-1 w-24 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      )}
      
      {loadingStage === 1 && (
        <div className="battery-loader">
          <div className="battery-container">
            <div className="battery-top"></div>
            <div className="battery-body">
              <div 
                className="battery-level" 
                style={{ width: `${batteryLevel}%` }}
              ></div>
            </div>
            <div className="battery-capacity-text">{batteryLevel}%</div>
          </div>
          <div className="loading-text mt-6">
            <span className="loading-dots">
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </span>
          </div>
        </div>
      )}

      <style>{`
        .name-display {
          animation: nameAnimation 2.5s ease-in-out;
          text-align: center;
        }
        
        .battery-container {
          width: 180px;
          height: 85px;
          border: 4px solid #334155;
          border-radius: 12px;
          position: relative;
          margin: 0 auto;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .battery-top {
          position: absolute;
          right: -12px;
          top: 25px;
          width: 10px;
          height: 35px;
          background: #334155;
          border-radius: 0 4px 4px 0;
        }
        
        .battery-body {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.5);
        }
        
        .battery-level {
          position: absolute;
          height: 100%;
          background: linear-gradient(to right, #22c55e, #16a34a);
          transition: width 0.4s ease;
          border-radius: 4px;
        }
        
        .battery-capacity-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: bold;
          color: #1e293b;
          font-size: 1.25rem;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
          z-index: 10;
        }
        
        .loading-text {
          font-size: 1.25rem;
          font-weight: 600;
          text-align: center;
          color: #334155;
        }
        
        .loading-dots {
          display: inline-flex;
        }
        
        .dot {
          animation: dotPulse 1.5s infinite;
          opacity: 0;
          margin: 0 2px;
        }
        
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes nameAnimation {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          30% { 
            opacity: 1; 
            transform: translateY(0) scale(1.05); 
          }
          70% { 
            opacity: 1; 
            transform: scale(1); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        @keyframes dotPulse {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        .fade-in-content {
          animation: fadeIn 1.2s ease;
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(15px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}