import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  LayoutDashboard, 
  Sprout, 
  CloudSun, 
  TrendingUp, 
  Landmark, 
  History, 
  Settings as SettingsIcon, 
  Upload, 
  Camera, 
  AlertTriangle, 
  FileText, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight,
  Download,
  Share2,
  FileCheck,
  Eye
} from 'lucide-react';

// Price trend mock data
const priceTrendData = [
  { day: 'Mon', price: 14.5 },
  { day: 'Tue', price: 15.0 },
  { day: 'Wed', price: 15.8 },
  { day: 'Thu', price: 16.2 },
  { day: 'Fri', price: 17.0 },
  { day: 'Sat', price: 17.5 },
  { day: 'Sun', price: 18.0 },
];

const agentsList = [
  { id: 'orchestrator', name: 'Orchestrator Agent', emoji: '🧠', role: 'Telemetry Coordinator' },
  { id: 'disease', name: 'Disease Agent', emoji: '🌿', role: 'Leaf Image Classifier' },
  { id: 'weather', name: 'Weather Agent', emoji: '🌦', role: 'Regional Forecast Analyst' },
  { id: 'market', name: 'Market Agent', emoji: '📈', role: 'Commodity Pricing Engine' },
  { id: 'schemes', name: 'Scheme Agent', emoji: '🏛', role: 'Subsidy Database Matcher' },
  { id: 'security', name: 'Security Agent', emoji: '🛡', role: 'Safety Compliance Filter' },
];

export default function Dashboard({ triggerDemoFlag, onClearDemoFlag }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [image, setImage] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState('idle'); // idle, analyzing, completed
  const [activeAgentIndex, setActiveAgentIndex] = useState(-1);
  const [agentStatuses, setAgentStatuses] = useState(
    agentsList.map(() => 'idle') // idle, thinking, fetching, completed
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Auto-trigger demo if redirected from Home
  useEffect(() => {
    if (triggerDemoFlag) {
      handleRunDemo();
      onClearDemoFlag();
    }
  }, [triggerDemoFlag]);

  // Sidebar navigation items
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Diagnosis', icon: Sprout },
    { name: 'Weather', icon: CloudSun },
    { name: 'Market', icon: TrendingUp },
    { name: 'Schemes', icon: Landmark },
    { name: 'History', icon: History },
    { name: 'Settings', icon: SettingsIcon },
  ];

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsDemoMode(false);
      setImage(URL.createObjectURL(file));
      setAnalysisStatus('idle');
      resetAgents();
    }
  };

  const resetAgents = () => {
    setActiveAgentIndex(-1);
    setAgentStatuses(agentsList.map(() => 'idle'));
  };

  // Run the sequential multi-agent simulation
  const startAnalysis = (demo = false) => {
    if (demo) {
      setIsDemoMode(true);
      setImage('MOCK_TOMATO');
    }
    setAnalysisStatus('analyzing');
    resetAgents();
    
    let currentAgent = 0;
    
    const runNextAgent = () => {
      if (currentAgent >= agentsList.length) {
        setAnalysisStatus('completed');
        setActiveAgentIndex(-1);
        return;
      }
      
      setActiveAgentIndex(currentAgent);
      
      // Step 1: Thinking (0ms - 300ms)
      setAgentStatuses(prev => {
        const next = [...prev];
        next[currentAgent] = 'thinking...';
        return next;
      });

      // Step 2: Fetching data (300ms - 600ms)
      setTimeout(() => {
        setAgentStatuses(prev => {
          const next = [...prev];
          next[currentAgent] = 'fetching data...';
          return next;
        });
      }, 300);

      // Step 3: Completed (900ms)
      setTimeout(() => {
        setAgentStatuses(prev => {
          const next = [...prev];
          next[currentAgent] = 'completed ✓';
          return next;
        });
        
        currentAgent++;
        runNextAgent();
      }, 900);
    };

    runNextAgent();
  };

  const handleRunDemo = () => {
    startAnalysis(true);
  };

  return (
    <div className="flex min-h-[calc(100vh-73px)] max-w-7xl mx-auto px-4 md:px-6 py-6 gap-6 relative">
      
      {/* Sidebar Navigation */}
      <aside className={`bg-white border border-slate-100 rounded-[16px] shadow-sm p-4 flex flex-col justify-between transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'} hidden md:flex`}>
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-50 pb-4 px-2">
            {!sidebarCollapsed && <span className="font-bold text-slate-800 text-sm tracking-wider uppercase">Farming Suite</span>}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-[8px] hover:bg-slate-50 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>
          </div>
          
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-[12px] text-sm font-medium transition-colors cursor-pointer ${
                    isSelected 
                      ? 'bg-emerald-50 text-emerald-800 border-l-4 border-primary' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-slate-400'}`} />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {!sidebarCollapsed && (
          <div className="bg-emerald-50/50 border border-emerald-100/60 p-4 rounded-[12px] text-left">
            <span className="text-xs font-semibold text-emerald-800 uppercase block mb-1">Agent Telemetry</span>
            <span className="text-[11px] text-slate-500 leading-relaxed block">
              Agent operations are audited in real-time. Minimum safety threshold configured at 85%.
            </span>
          </div>
        )}
      </aside>

      {/* Mobile Sticky Tab Bar (Fallback for mobile screens) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 px-4 flex justify-around z-50 md:hidden shadow-lg">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isSelected = activeTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex flex-col items-center p-2 text-xs font-semibold cursor-pointer ${
                isSelected ? 'text-primary' : 'text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 min-w-0 pb-16 md:pb-0">
        
        {/* Render View Based on Active Tab */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-6">
            
            {/* 1. Upload & Demo Trigger Card */}
            <div className="bg-white border border-slate-100 rounded-[16px] shadow-sm p-6 md:p-8 text-center max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-slate-900 mb-2">New Crop Diagnosis</h2>
              <p className="text-slate-500 text-sm mb-6">Upload a clear photo of the infected crop leaf to identify diseases and receive market/weather/subsidy reports.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                {/* Drag and Drop Zone */}
                <div className="relative border-2 border-dashed border-slate-200 rounded-[16px] p-6 hover:border-primary transition-colors flex flex-col items-center justify-center min-h-[200px] bg-slate-50/50">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {image ? (
                    image === 'MOCK_TOMATO' ? (
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-4xl mb-3 shadow-inner">
                          🍅
                        </div>
                        <span className="text-sm font-semibold text-slate-700">tomato_leaf_disease.png</span>
                        <span className="text-xs text-slate-400 mt-0.5">Mocked Tomato Crop Preview</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <img src={image} alt="Crop Preview" className="max-h-32 rounded-[12px] object-cover shadow-sm mb-3 border border-slate-200" />
                        <span className="text-sm font-semibold text-slate-700">Uploaded Image</span>
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="p-3 bg-white border border-slate-100 shadow-sm rounded-full text-slate-400 mb-3">
                        <Camera className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">Upload crop image or drag & drop</span>
                      <span className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WEBP up to 10MB</span>
                    </div>
                  )}
                </div>

                {/* Analysis Action Buttons */}
                <div className="flex flex-col gap-3.5 text-left h-full justify-center">
                  <div className="text-xs text-slate-400 leading-normal mb-1">
                    Select a leaf image locally to analyze your crop, or use the pre-configured Demo Mode to simulate tomato Early Blight diagnosis.
                  </div>
                  
                  <button
                    disabled={!image || analysisStatus === 'analyzing'}
                    onClick={() => startAnalysis(false)}
                    className="w-full py-3.5 bg-primary hover:bg-primary-dark disabled:bg-slate-100 disabled:text-slate-400 text-white font-semibold rounded-[12px] transition-colors shadow-sm text-center block cursor-pointer disabled:cursor-not-allowed"
                  >
                    {analysisStatus === 'analyzing' ? 'Analyzing...' : 'Analyze Crop'}
                  </button>
                  
                  <button
                    disabled={analysisStatus === 'analyzing'}
                    onClick={handleRunDemo}
                    className="w-full py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold rounded-[12px] transition-colors shadow-sm text-center block cursor-pointer"
                  >
                    Run Demo
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Multi-Agent Sequential Flow Animation */}
            {analysisStatus === 'analyzing' && (
              <div className="bg-white border border-slate-100 rounded-[16px] shadow-sm p-6 md:p-8 max-w-2xl mx-auto">
                <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Multi-Agent Processing Flow</h3>
                <div className="flex flex-col space-y-0.5">
                  {agentsList.map((agent, index) => {
                    const isActive = activeAgentIndex === index;
                    const isCompleted = index < activeAgentIndex;
                    const status = agentStatuses[index];
                    
                    let statusColor = 'text-slate-400 bg-slate-100';
                    if (status.includes('thinking')) statusColor = 'text-amber-700 bg-amber-50 border border-amber-100 animate-pulse';
                    if (status.includes('fetching')) statusColor = 'text-blue-700 bg-blue-50 border border-blue-100 animate-pulse';
                    if (status.includes('completed')) statusColor = 'text-emerald-700 bg-emerald-50 border border-emerald-100';

                    return (
                      <React.Fragment key={agent.id}>
                        {/* Agent Row */}
                        <div 
                          className={`p-4 bg-white border border-slate-100 rounded-[12px] flex items-center justify-between transition-all duration-300 ${
                            isActive ? 'agent-active-glow border-emerald-500 scale-[1.01] z-10' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <span className="text-2xl">{agent.emoji}</span>
                            <div className="text-left">
                              <h4 className="font-semibold text-slate-800 text-sm">{agent.name}</h4>
                              <p className="text-slate-400 text-xs mt-0.5">{agent.role}</p>
                            </div>
                          </div>
                          
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${statusColor}`}>
                            {status}
                          </span>
                        </div>

                        {/* Connection Line */}
                        {index < agentsList.length - 1 && (
                          <div className="h-6 flex justify-center items-center relative z-0">
                            <svg className="w-2 h-6" overflow="visible">
                              <line 
                                x1="4" y1="0" x2="4" y2="24" 
                                stroke={isCompleted ? '#2E7D32' : isActive ? '#81C784' : '#e2e8f0'} 
                                strokeWidth="2" 
                                strokeDasharray={isActive ? "5 5" : undefined}
                                className={isActive ? "line-dash-flow" : ""}
                              />
                            </svg>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Results Section (Visible when completed) */}
            {analysisStatus === 'completed' && (
              <div className="space-y-6">
                
                {/* 3A. Final Action Plan (Top High-Priority Card) */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden rounded-[16px] border border-emerald-200/80 bg-gradient-to-br from-emerald-50/60 to-white p-6 md:p-8 text-left shadow-sm"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-100/60 pb-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="p-1 bg-emerald-100 text-emerald-800 rounded-md">
                          <FileCheck className="w-4 h-4" />
                        </span>
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Integrated Strategy</span>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900">Your AI Action Plan</h2>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-100/80 border border-emerald-200 px-4 py-2 rounded-[12px] text-right">
                        <span className="text-[10px] text-emerald-800 font-bold uppercase block leading-none mb-1">Synthesized Confidence</span>
                        <span className="text-xl font-extrabold text-emerald-950 block leading-none">96%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mt-0.5">1</div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        <strong className="font-semibold text-slate-900">Apply Mancozeb fungicide:</strong> Treat tomato plants showing early blight symptoms immediately. Avoid overhead irrigation for the next 2 days to maintain leaf dry duration.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mt-0.5">2</div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        <strong className="font-semibold text-slate-900">Delay chemical spray operations:</strong> Rain is forecast on Thursday. Keep sprays scheduled for Friday or Saturday morning to prevent pesticide run-off.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mt-0.5">3</div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        <strong className="font-semibold text-slate-900">Hold tomato stock:</strong> Local Mandi prices are low (₹18/kg) but trending up. Price forecast suggests a delay in selling by 3-5 days will capture an expected ₹2-3/kg price increase.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mt-0.5">4</div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        <strong className="font-semibold text-slate-900">File insurance request:</strong> You have active tomato eligibility for the PMFBY Crop Insurance subsidy. Complete application registration prior to the July 31st season deadline.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                    <button className="flex-1 py-3 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-[12px] flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                      <Download className="w-4 h-4" />
                      Export Action Plan PDF
                    </button>
                    <button className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-[12px] flex items-center justify-center gap-2 cursor-pointer transition-colors">
                      <Share2 className="w-4 h-4 text-slate-500" />
                      Share Summary Report
                    </button>
                  </div>
                </motion.div>

                {/* Grid of Results: Disease, Weather, Market, Schemes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Crop Disease Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white border border-slate-100 rounded-[16px] shadow-sm p-6 text-left flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <Sprout className="text-emerald-700 w-5 h-5" />
                          Crop Disease Diagnosis
                        </h3>
                        <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-full uppercase tracking-wider">
                          Severity: Moderate
                        </span>
                      </div>

                      <div className="mb-4">
                        <span className="text-xs text-slate-400 block font-semibold uppercase mb-1">Diagnosed Disease</span>
                        <h4 className="text-xl font-bold text-slate-800">Early Blight</h4>
                        <span className="text-sm italic text-slate-500 font-medium">Alternaria solani</span>
                      </div>

                      {/* Confidence Score Bar */}
                      <div className="mb-5">
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1.5">
                          <span>Diagnostic Confidence</span>
                          <span className="text-emerald-700">94%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className="bg-emerald-600 h-2 rounded-full transition-all duration-1000" style={{ width: '94%' }} />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <span className="text-xs text-slate-400 block font-semibold uppercase mb-1">Key Symptoms Identified</span>
                          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                            <li>Concentric rings (target board spot structure) on older leaves.</li>
                            <li>Progressive foliar chlorosis surrounding lesions.</li>
                            <li>Early defoliation commencing from basal foliage.</li>
                          </ul>
                        </div>

                        <div>
                          <span className="text-xs text-slate-400 block font-semibold uppercase mb-1">Treatment Protocol</span>
                          <p className="text-sm text-slate-700 bg-slate-50 border border-slate-100 p-3 rounded-[12px] font-medium leading-relaxed">
                            Spray Mancozeb 75% WP formulation at 2 grams per Liter of clean water. Spray on leaf undersides thoroughly.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500">
                      <span>Expected Recovery: <strong>10-14 days</strong></span>
                      <span className="font-semibold text-orange-600">Medium Risk Level</span>
                    </div>
                  </motion.div>

                  {/* Weather Intelligence Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white border border-slate-100 rounded-[16px] shadow-sm p-6 text-left flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <CloudSun className="text-blue-600 w-5 h-5" />
                          Weather Intelligence
                        </h3>
                        <span className="text-xs text-slate-500 font-medium">Telemetry: Bengaluru IN</span>
                      </div>

                      {/* Current Weather details */}
                      <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-100 p-4 rounded-[12px] mb-4 text-center">
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Temp</span>
                          <span className="text-lg font-bold text-slate-800">28°C</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Forecast</span>
                          <span className="text-sm font-bold text-slate-800 block truncate mt-0.5">Partly Cloudy</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Humidity</span>
                          <span className="text-lg font-bold text-slate-800">65%</span>
                        </div>
                      </div>

                      {/* Rain Alert Banner */}
                      <div className="bg-amber-50 border border-amber-200/60 p-3.5 rounded-[12px] mb-4 text-amber-900 flex items-start gap-2.5">
                        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                        <div className="text-xs leading-relaxed">
                          <strong className="font-semibold block mb-0.5">Rain expected in 48 hours</strong>
                          Moderate-to-heavy precipitation event predicted Thursday. Heavy risk of foliar chemical runoff.
                        </div>
                      </div>

                      {/* 7-day forecast chips */}
                      <div className="mb-4">
                        <span className="text-xs text-slate-400 block font-semibold uppercase mb-2">7-Day Local Forecast</span>
                        <div className="flex gap-2 overflow-x-auto pb-1.5">
                          {[
                            { day: 'Mon', icon: '🌦', temp: '28°' },
                            { day: 'Tue', icon: '🌦', temp: '27°' },
                            { day: 'Wed', icon: '🌧', temp: '25°' },
                            { day: 'Thu', icon: '🌧', temp: '24°' },
                            { day: 'Fri', icon: '⛅', temp: '28°' },
                            { day: 'Sat', icon: '☀️', temp: '30°' },
                            { day: 'Sun', icon: '☀️', temp: '31°' },
                          ].map((item, idx) => (
                            <div key={idx} className="flex-shrink-0 bg-slate-550 border border-slate-200/50 bg-slate-50/50 px-2 py-2 rounded-[8px] text-center w-11 flex flex-col items-center">
                              <span className="text-[10px] font-bold text-slate-500 block mb-0.5">{item.day}</span>
                              <span className="text-base block mb-0.5">{item.icon}</span>
                              <span className="text-xs font-bold text-slate-800">{item.temp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-50 bg-emerald-50/40 p-3 rounded-[12px] border border-emerald-100/50">
                      <span className="text-xs font-semibold text-emerald-800 uppercase block mb-1">Farming Weather Advice</span>
                      <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                        "Avoid spraying pesticides for the next 2 days. Pesticides require a 6-hour dry window for absorption to prevent soil and run-off wash away."
                      </p>
                    </div>
                  </motion.div>

                  {/* Market Pricing Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white border border-slate-100 rounded-[16px] shadow-sm p-6 text-left flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <TrendingUp className="text-amber-600 w-5 h-5" />
                          Market Pricing Analytics
                        </h3>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          Price Trend: Upwardward
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-xs text-slate-400 block font-semibold uppercase mb-0.5">Average Local Price</span>
                          <span className="text-2xl font-extrabold text-slate-900">₹18 <span className="text-sm font-semibold text-slate-500">/ kg</span></span>
                        </div>
                        <div className="bg-amber-50 text-amber-900 p-2.5 rounded-[12px] text-right border border-amber-100/50">
                          <span className="text-[10px] font-bold uppercase block text-amber-800 mb-0.5">Trading Recommendation</span>
                          <span className="text-xs font-semibold">Hold stock for 3-5 days</span>
                        </div>
                      </div>

                      {/* Pricing graph using Recharts */}
                      <div className="mb-4">
                        <span className="text-xs text-slate-400 block font-semibold uppercase mb-2">7-Day Tomato price trend</span>
                        <div className="h-44 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={priceTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                              <YAxis stroke="#94a3b8" fontSize={11} domain={[12, 20]} tickLine={false} />
                              <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: 'none' }} />
                              <Line type="monotone" dataKey="price" stroke="#2E7D32" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 1.5 }} activeDot={{ r: 6 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Nearby Mandi Prices */}
                      <div>
                        <span className="text-xs text-slate-400 block font-semibold uppercase mb-2">Nearby Market Outlets</span>
                        <div className="space-y-1.5">
                          {[
                            { name: 'Kolar Mandi', distance: '12 km', price: '₹17.50/kg' },
                            { name: 'Chintamani Mandi', distance: '28 km', price: '₹18.20/kg' },
                            { name: 'Yeshwanthpura Mandi', distance: '42 km', price: '₹19.00/kg' },
                          ].map((mandi, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs p-2 bg-slate-50/50 border border-slate-100 rounded-[8px]">
                              <span className="font-semibold text-slate-700">{mandi.name}</span>
                              <div className="flex gap-4 items-center">
                                <span className="text-slate-400">{mandi.distance}</span>
                                <span className="font-bold text-slate-800">{mandi.price}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Schemes Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white border border-slate-100 rounded-[16px] shadow-sm p-6 text-left flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <Landmark className="text-purple-700 w-5 h-5" />
                          Government Support & Schemes
                        </h3>
                        <span className="text-xs text-slate-400 font-semibold uppercase">DB Match Status</span>
                      </div>

                      <div className="space-y-4">
                        
                        {/* Scheme 1 */}
                        <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-[12px] flex items-start justify-between gap-3">
                          <div className="text-left">
                            <h4 className="font-bold text-sm text-slate-800">PMFBY Crop Insurance</h4>
                            <p className="text-slate-500 text-xs mt-0.5">Comprehensive insurance yield protection covering disease outbreak losses.</p>
                          </div>
                          <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full flex items-center gap-1 uppercase tracking-wider">
                            <CheckCircle className="w-3 h-3" /> Eligible
                          </span>
                        </div>

                        {/* Scheme 2 */}
                        <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-[12px] flex items-start justify-between gap-3">
                          <div className="text-left">
                            <h4 className="font-bold text-sm text-slate-800">PM-KISAN Subsidy</h4>
                            <p className="text-slate-500 text-xs mt-0.5">Direct benefit landholder cash transfer of ₹6,000 yearly in 3 splits.</p>
                          </div>
                          <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full flex items-center gap-1 uppercase tracking-wider">
                            <CheckCircle className="w-3 h-3" /> Eligible
                          </span>
                        </div>

                        {/* Scheme 3 */}
                        <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-[12px] flex items-start justify-between gap-3">
                          <div className="text-left">
                            <h4 className="font-bold text-sm text-slate-800">Soil Health Card Scheme</h4>
                            <p className="text-slate-500 text-xs mt-0.5">Provide chemical nutrients analysis cards with fertilizer advisories.</p>
                          </div>
                          <button className="flex-shrink-0 text-[10px] font-bold px-2 py-1 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-[6px] transition-colors cursor-pointer">
                            Check eligibility
                          </button>
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-6 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-[12px] text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                      <FileText className="w-4 h-4 text-slate-400" />
                      View Comprehensive Scheme Guidelines
                    </button>
                  </motion.div>

                </div>

                {/* 3B. Security Guardrail Panel (Bottom Card) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white border border-slate-100 rounded-[16px] shadow-sm p-5 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-3xl mx-auto"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-rose-50 text-rose-700 border border-rose-100 rounded-[12px]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">Security Guardrails Status</h4>
                      <p className="text-slate-500 text-xs mt-0.5">All outputs verified by Security Agent before display.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: 'Prompt Injection', val: 'Passed' },
                      { label: 'Sensitive Data', val: 'Removed' },
                      { label: 'Output Safety', val: 'Passed' },
                      { label: 'Confidence Score', val: '96%' },
                    ].map((item, idx) => (
                      <div key={idx} className="border-l-2 border-emerald-500 pl-3">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none mb-1">{item.label}</span>
                        <span className="text-xs font-bold text-slate-800">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>
            )}
            
          </div>
        )}

        {/* 4. Filtered Sub-Tabs (Empty or Loaded states for tabs) */}
        {activeTab !== 'Dashboard' && activeTab !== 'History' && activeTab !== 'Settings' && (
          <div className="max-w-2xl mx-auto py-12 text-center bg-white border border-slate-100 rounded-[16px] shadow-sm p-8">
            {analysisStatus !== 'completed' ? (
              <div className="flex flex-col items-center">
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-full mb-4">
                  <Sprout className="w-8 h-8 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Telemetry Locked</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                  Please run a crop diagnosis first. Once the Orchestrator finishes executing the pipeline, this section will unlock automatically.
                </p>
                <button
                  onClick={() => setActiveTab('Dashboard')}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  Return to Diagnosis
                </button>
              </div>
            ) : (
              <div className="text-left space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                  <button 
                    onClick={() => setActiveTab('Dashboard')}
                    className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    &larr; Back to Full Dashboard
                  </button>
                  <span className="text-slate-300">/</span>
                  <span className="text-xs text-slate-500 font-semibold">{activeTab} Focus Area</span>
                </div>
                
                {/* Render activeTab focused components */}
                {activeTab === 'Diagnosis' && (
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Crop Leaf Diagnosis Report</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-[12px] flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-5xl block mb-2">🍅</span>
                          <span className="text-xs text-slate-400 font-bold block uppercase">Infected Leaf Sample</span>
                          <span className="text-sm font-semibold text-slate-700">Early Blight Preview</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                          <span className="text-xs text-slate-400 font-bold uppercase block">Pathogen Name</span>
                          <span className="text-base font-bold text-slate-800">Alternaria solani (Fungal)</span>
                        </div>
                        <div className="border-b border-slate-100 pb-3">
                          <span className="text-xs text-slate-400 font-bold uppercase block">Confidence Score</span>
                          <span className="text-base font-bold text-slate-800">94.2% Verified Accuracy</span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-400 font-bold uppercase block">Action Plan Target</span>
                          <span className="text-sm text-slate-600 block mt-1 leading-relaxed">
                            Mancozeb chemical application within 48 hours to suppress foliar sporulation.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Weather' && (
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Hyperlocal Weather Diagnostics</h3>
                    <p className="text-slate-500 text-sm mb-4">Regional station coordinates retrieved automatically from IP location telemetry.</p>
                    <div className="space-y-4 bg-slate-50 border border-slate-100 p-4 rounded-[12px]">
                      <div className="flex justify-between items-center text-sm border-b border-slate-200/50 pb-2">
                        <span className="font-semibold text-slate-700">Wind Direction & Speed</span>
                        <span className="text-slate-900 font-medium">ENE at 12 km/h</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-slate-200/50 pb-2">
                        <span className="font-semibold text-slate-700">Expected Precipitation (Thursday)</span>
                        <span className="text-slate-900 font-medium">8.4 mm (78% probability)</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-slate-700">Foliar Micro-climate Humidity</span>
                        <span className="text-slate-900 font-medium">Optimal for fungal growth (&gt;60%)</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Market' && (
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Regional Commodity pricing</h3>
                    <p className="text-slate-500 text-sm mb-4">Showing current prices of local markets comparison within 50 km radius.</p>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-[12px] border border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-slate-400 font-bold uppercase block">Selected Mandi Outlet</span>
                          <span className="font-bold text-slate-800 text-sm">Chintamani Mandi (28 km away)</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-slate-400 font-bold uppercase block">Highest Bid Rate</span>
                          <span className="font-extrabold text-emerald-700 text-sm">₹18.20 / kg</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-normal">
                        Note: Local prices are updated every 6 hours by the APMC commodity feed agents. Make sure to lock transport contracts before transit.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'Schemes' && (
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Matching Policies & Subsidies</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-emerald-50/50 border border-emerald-100/60 rounded-[12px]">
                        <span className="text-xs font-bold text-emerald-800 uppercase block mb-1">Eligible Crop Subsidy</span>
                        <h4 className="font-bold text-slate-800 text-sm mb-1">Tomato Cultivation Incentive Scheme</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Farmers affected by early blight or late blight fungal issues in this sub-region qualify for a 20% discount on copper oxychloride fungicides from registered warehouses.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        )}

        {/* 5. History Sub-Tab */}
        {activeTab === 'History' && (
          <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-[16px] shadow-sm p-6 md:p-8 text-left">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Diagnosis History</h3>
            <p className="text-slate-500 text-sm mb-6">Access previous visual scans and multi-agent synthesized outputs.</p>
            
            <div className="space-y-3">
              {[
                { date: 'June 25, 2026', crop: 'Potato', disease: 'Late Blight (Phytophthora infestans)', confidence: '91%', severity: 'High', status: 'Resolved' },
                { date: 'June 10, 2026', crop: 'Onion', disease: 'Healthy Leaf Canopy', confidence: '98%', severity: 'None', status: 'Healthy' },
                { date: 'May 28, 2026', crop: 'Tomato', disease: 'Leaf Miner Damage', confidence: '87%', severity: 'Low', status: 'Treated' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50/50 border border-slate-100 rounded-[12px] flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-400">{item.date}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-semibold text-emerald-800">{item.crop}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-800">{item.disease}</h4>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none mb-1">Severity</span>
                      <span className="text-xs font-bold text-slate-700">{item.severity}</span>
                    </div>
                    <button className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-[8px] text-slate-500 transition-colors cursor-pointer">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Settings Sub-Tab */}
        {activeTab === 'Settings' && (
          <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-[16px] shadow-sm p-6 md:p-8 text-left">
            <h3 className="text-xl font-bold text-slate-900 mb-2">System Settings</h3>
            <p className="text-slate-500 text-sm mb-6">Manage system coordinates, language settings, and API access thresholds.</p>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase block mb-2">Location Coordinates</label>
                <input 
                  type="text" 
                  value="Bengaluru, Karnataka, India (12.9716° N, 77.5946° E)"
                  disabled
                  className="w-full bg-slate-50/80 border border-slate-200 px-4 py-3 rounded-[12px] text-sm text-slate-600 cursor-not-allowed font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase block mb-2">Language Preference</label>
                  <select className="w-full bg-white border border-slate-200 px-4 py-3 rounded-[12px] text-sm text-slate-700 font-medium focus:outline-none focus:border-primary">
                    <option>English</option>
                    <option>Kannada (ಕನ್ನಡ)</option>
                    <option>Hindi (हिन्दी)</option>
                    <option>Telugu (తెలుగు)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase block mb-2">Min Agent Confidence</label>
                  <select className="w-full bg-white border border-slate-200 px-4 py-3 rounded-[12px] text-sm text-slate-700 font-medium focus:outline-none focus:border-primary">
                    <option>85% (Recommended)</option>
                    <option>90% (Strict)</option>
                    <option>80% (Lenient)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-bold uppercase block mb-2">Audit Trails & Security Logs</label>
                <div className="p-3.5 bg-slate-50/50 border border-slate-100 rounded-[12px] text-xs text-slate-500 leading-normal">
                  KisanMitra AI is running in sandbox demo mode for hackathon review. LLM outputs are mocked locally and processed sequentially to simulate real-world API latencies.
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
