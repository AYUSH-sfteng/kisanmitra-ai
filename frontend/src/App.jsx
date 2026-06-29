import React, { useState } from 'react';
import { Sprout, BrainCircuit } from 'lucide-react';
import Hero from './components/Hero.jsx';
import Dashboard from './components/Dashboard.jsx';
import Architecture from './components/Architecture.jsx';

function App() {
  const [activeSection, setActiveSection] = useState('Home');
  const [triggerDemo, setTriggerDemo] = useState(false);

  // Navigate to dashboard and optionally start the demo sequence
  const handleStartDiagnosis = () => {
    setTriggerDemo(false);
    setActiveSection('Dashboard');
  };

  const handleWatchDemo = () => {
    setTriggerDemo(true);
    setActiveSection('Dashboard');
  };

  return (
    <div className="min-h-screen bg-farmbg flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-800">
      
      {/* Premium Sticky Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[72px] flex items-center justify-between">
          
          {/* Logo Branding */}
          <button 
            onClick={() => setActiveSection('Home')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="p-2 bg-emerald-50 text-primary border border-emerald-100/60 rounded-[12px] group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-base md:text-lg tracking-tight">KisanMitra AI</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md">Demo</span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Your Farming Companion</span>
            </div>
          </button>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 md:gap-2">
            {[
              { id: 'Home', label: 'Home' },
              { id: 'Dashboard', label: 'Dashboard' },
              { id: 'Architecture', label: 'Architecture' }
            ].map((tab) => {
              const isSelected = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSection(tab.id);
                    if (tab.id !== 'Dashboard') {
                      setTriggerDemo(false);
                    }
                  }}
                  className={`px-3 md:px-4 py-2 rounded-[12px] text-xs md:text-sm font-semibold transition-colors cursor-pointer ${
                    isSelected 
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Code link / Extra branding */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-[12px] border border-slate-200 text-slate-500 hover:text-slate-950 transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>

        </div>
      </header>

      {/* Main Content Sections */}
      <div className="flex-1">
        {activeSection === 'Home' && (
          <Hero 
            onStartDiagnosis={handleStartDiagnosis} 
            onWatchDemo={handleWatchDemo} 
          />
        )}
        
        {activeSection === 'Dashboard' && (
          <Dashboard 
            triggerDemoFlag={triggerDemo}
            onClearDemoFlag={() => setTriggerDemo(false)}
          />
        )}

        {activeSection === 'Architecture' && (
          <Architecture />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 md:py-8 text-center text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-600 text-sm">Multi-Agent AI Farming Network</span>
          </div>
          <span>&copy; 2026 KisanMitra AI. Built for hackathon demonstration. All data and analysis models are simulated.</span>
        </div>
      </footer>

    </div>
  );
}

export default App;
