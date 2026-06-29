import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Cpu, 
  Sprout, 
  CloudSun, 
  TrendingUp, 
  Landmark, 
  ShieldCheck, 
  FileCheck 
} from 'lucide-react';

export default function Architecture() {
  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
          Multi-Agent System Architecture
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Under the hood, KisanMitra AI uses an orchestrator-agent pattern. A primary orchestrator analyzes the user request and farm telemetry, coordinates specialized subprocesses in parallel, and secures all outputs before presentation.
        </p>
      </div>

      {/* SVG-based Node Diagram Container */}
      <div className="relative bg-white border border-slate-100 rounded-[16px] shadow-sm p-8 md:p-12 mb-12 flex flex-col items-center overflow-x-auto min-w-[700px]">
        
        {/* Row 1: Farmer Input */}
        <div className="flex flex-col items-center z-10">
          <div className="flex flex-col items-center bg-slate-50 border border-slate-200 px-6 py-4 rounded-[16px] shadow-sm w-56 text-center transition-all duration-300 hover:border-emerald-500">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-[12px] border border-emerald-100 mb-3">
              <User className="w-5 h-5" />
            </div>
            <span className="font-semibold text-slate-800 text-sm">Farmer Input</span>
            <span className="text-slate-500 text-xs mt-1">Image, Telemetry & Location</span>
          </div>
        </div>

        {/* Connection: Farmer Input -> Orchestrator */}
        <div className="h-12 w-full flex justify-center items-center relative z-0">
          <svg className="h-12 w-1" overflow="visible">
            <line 
              x1="0" y1="0" x2="0" y2="48" 
              stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" 
              className="line-dash-flow" 
            />
          </svg>
        </div>

        {/* Row 2: Orchestrator */}
        <div className="flex flex-col items-center z-10">
          <div className="flex flex-col items-center bg-emerald-550 border border-emerald-600 px-6 py-4 rounded-[16px] shadow-sm w-56 text-center text-white bg-primary transition-all duration-300 hover:bg-primary-dark">
            <div className="p-2.5 bg-white/10 text-white rounded-[12px] mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-semibold text-sm">Orchestrator Agent</span>
            <span className="text-emerald-100 text-xs mt-1">Routing, Plan Formulation</span>
          </div>
        </div>

        {/* Connection: Orchestrator -> 4 Agents (Fan Out) */}
        <div className="h-16 w-full max-w-4xl relative z-0">
          <svg className="w-full h-16" overflow="visible">
            {/* Center X is 50%. The coordinates represent fan-out to 4 columns. */}
            {/* Line 1: to Disease (12.5%) */}
            <path d="M 50% 0 L 12.5% 64" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" className="line-dash-flow" />
            {/* Line 2: to Weather (37.5%) */}
            <path d="M 50% 0 L 37.5% 64" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" className="line-dash-flow" />
            {/* Line 3: to Market (62.5%) */}
            <path d="M 50% 0 L 62.5% 64" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" className="line-dash-flow" />
            {/* Line 4: to Scheme (87.5%) */}
            <path d="M 50% 0 L 87.5% 64" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" className="line-dash-flow" />
          </svg>
        </div>

        {/* Row 3: Parallel Agents */}
        <div className="grid grid-cols-4 gap-4 w-full max-w-4xl z-10 my-1">
          {/* Disease Agent */}
          <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-4 rounded-[16px] shadow-sm text-center transition-all duration-300 hover:border-emerald-500">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-[12px] border border-emerald-100 mb-2">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-800 text-xs block">Disease Agent</span>
            <span className="text-slate-400 text-[10px] block mt-1">Image Vision Model</span>
          </div>

          {/* Weather Agent */}
          <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-4 rounded-[16px] shadow-sm text-center transition-all duration-300 hover:border-emerald-500">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-[12px] border border-blue-100 mb-2">
              <CloudSun className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-800 text-xs block">Weather Agent</span>
            <span className="text-slate-400 text-[10px] block mt-1">Regional API Telemetry</span>
          </div>

          {/* Market Agent */}
          <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-4 rounded-[16px] shadow-sm text-center transition-all duration-300 hover:border-emerald-500">
            <div className="p-2 bg-amber-50 text-amber-700 rounded-[12px] border border-amber-100 mb-2">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-800 text-xs block">Market Agent</span>
            <span className="text-slate-400 text-[10px] block mt-1">Mandi Pricing Feed</span>
          </div>

          {/* Scheme Agent */}
          <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-4 rounded-[16px] shadow-sm text-center transition-all duration-300 hover:border-emerald-500">
            <div className="p-2 bg-purple-50 text-purple-700 rounded-[12px] border border-purple-100 mb-2">
              <Landmark className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-800 text-xs block">Scheme Agent</span>
            <span className="text-slate-400 text-[10px] block mt-1">DB Scheme Rules</span>
          </div>
        </div>

        {/* Connection: 4 Agents -> Security Agent (Fan In) */}
        <div className="h-16 w-full max-w-4xl relative z-0">
          <svg className="w-full h-16" overflow="visible">
            {/* Center X is 50%. The coordinates represent fan-in from 4 columns to center. */}
            <path d="M 12.5% 0 L 50% 64" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" className="line-dash-flow" />
            <path d="M 37.5% 0 L 50% 64" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" className="line-dash-flow" />
            <path d="M 62.5% 0 L 50% 64" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" className="line-dash-flow" />
            <path d="M 87.5% 0 L 50% 64" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" className="line-dash-flow" />
          </svg>
        </div>

        {/* Row 4: Security Agent */}
        <div className="flex flex-col items-center z-10">
          <div className="flex flex-col items-center bg-rose-50 border border-rose-200 px-6 py-4 rounded-[16px] shadow-sm w-56 text-center transition-all duration-300 hover:border-rose-500">
            <div className="p-2.5 bg-rose-100 text-rose-700 rounded-[12px] mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-semibold text-rose-950 text-sm">Security Guardrail Agent</span>
            <span className="text-rose-600 text-xs mt-1">PII Masking, Safety Auditing</span>
          </div>
        </div>

        {/* Connection: Security Agent -> Final Output */}
        <div className="h-12 w-full flex justify-center items-center relative z-0">
          <svg className="h-12 w-1" overflow="visible">
            <line 
              x1="0" y1="0" x2="0" y2="48" 
              stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" 
              className="line-dash-flow" 
            />
          </svg>
        </div>

        {/* Row 5: Final Output */}
        <div className="flex flex-col items-center z-10">
          <div className="flex flex-col items-center bg-emerald-50 border border-emerald-200 px-6 py-4 rounded-[16px] shadow-sm w-56 text-center transition-all duration-300 hover:border-emerald-500">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-[12px] mb-3">
              <FileCheck className="w-5 h-5" />
            </div>
            <span className="font-semibold text-emerald-950 text-sm">Final Integrated Output</span>
            <span className="text-emerald-700 text-xs mt-1">Action Plan & Verified Dashboard</span>
          </div>
        </div>

      </div>

      {/* Description Section */}
      <div className="bg-slate-50 border border-slate-100 rounded-[16px] p-8 text-left">
        <h3 className="text-lg font-bold text-slate-900 mb-3">Orchestration & Parallel Execution</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          When the farmer submits a crop leaf image, the **Orchestrator Agent** acts as the primary cognitive layer. It extracts key metadata (such as location, season, and crop variety) and triggers specialized agents in parallel to collect insights simultaneously:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm mb-6">
          <li><strong>Disease Agent:</strong> Evaluates the image using agricultural vision-language models.</li>
          <li><strong>Weather Agent:</strong> Fetches local short-term precipitation and wind speed forecasts.</li>
          <li><strong>Market Agent:</strong> Gathers commodity price metrics and checks historical trends.</li>
          <li><strong>Scheme Agent:</strong> Queries database rules to locate compatible subsidies and government support.</li>
        </ul>
        <div className="border-t border-slate-200/60 pt-4">
          <p className="text-slate-600 text-sm leading-relaxed">
            Finally, the **Security Agent** enforces strict safety alignments. It ensures the synthesized action plan is free of prompt injections, masks sensitive details, verifies the advice meets confidence levels (minimum 85%), and delivers clean, verified diagnostics.
          </p>
        </div>
      </div>
    </div>
  );
}
