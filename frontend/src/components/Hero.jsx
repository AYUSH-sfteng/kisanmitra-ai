import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sprout, 
  CloudSun, 
  TrendingUp, 
  Landmark, 
  BrainCircuit, 
  ShieldCheck, 
  Play, 
  ArrowRight 
} from 'lucide-react';

const features = [
  {
    icon: Sprout,
    title: 'Crop Disease Detection',
    description: 'Instant computer vision analysis of leaf symptoms with treatment protocols.',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  },
  {
    icon: CloudSun,
    title: 'Weather Intelligence',
    description: 'Hyperlocal forecasts matched against farm operations to prevent loss.',
    color: 'text-blue-600 bg-blue-50 border-blue-100',
  },
  {
    icon: TrendingUp,
    title: 'Market Prices',
    description: 'Real-time commodity rates from local mandis with 7-day predictive trends.',
    color: 'text-amber-600 bg-amber-50 border-amber-100',
  },
  {
    icon: Landmark,
    title: 'Government Schemes',
    description: 'Automated eligibility checks for state insurance and direct subsidy support.',
    color: 'text-purple-600 bg-purple-50 border-purple-100',
  },
  {
    icon: BrainCircuit,
    title: 'AI Advisor',
    description: 'Central orchestrator agent synthesizing multiple sources into actionable instructions.',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
  },
  {
    icon: ShieldCheck,
    title: 'Secure AI',
    description: 'Real-time checks for prompt injections, data leaks, and output safety constraints.',
    color: 'text-rose-600 bg-rose-50 border-rose-100',
  },
];

export default function Hero({ onStartDiagnosis, onWatchDemo }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-medium mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Hackathon Demo: Multi-Agent AI System
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-none mb-6"
        >
          AI That Helps Farmers Make <span className="text-primary">Better Decisions</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Secure Multi-Agent Intelligence for Crop Health, Weather, Market Prices & Government Schemes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onStartDiagnosis}
            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-[12px] transition-colors shadow-md flex items-center justify-center gap-2 group cursor-pointer"
          >
            Start Diagnosis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onWatchDemo}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-[12px] border border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 text-primary fill-primary" />
            Watch Demo
          </button>
        </motion.div>
      </div>

      {/* Feature Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-8 bg-white border border-slate-100 rounded-[16px] shadow-sm hover:shadow-md transition-shadow flex flex-col items-start text-left"
            >
              <div className={`p-3.5 rounded-[12px] border ${feature.color} mb-5`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
