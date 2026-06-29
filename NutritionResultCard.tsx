import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, AlertCircle, CheckCircle2, Utensils, Lightbulb, Info, Languages, RotateCcw } from 'lucide-react';
import { NutritionResult } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

interface NutritionResultCardProps {
  result: NutritionResult;
  gender: string;
  onReset: () => void;
  onBack: () => void;
}

import { Mascot } from './Mascot';

export const NutritionResultCard: React.FC<NutritionResultCardProps> = ({ result, gender, onReset, onBack }) => {
  const { t } = useLanguage();
  const getStatusColor = () => {
    switch (result.nutrition_status) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'Warning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Normal': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getMascotProps = () => {
    const status = result.nutrition_status.toLowerCase();
    const isCritical = status.includes('critical') || status.includes('severely') || status.includes('growth faltering');
    const isWarning = status.includes('warning') || status.includes('underweight');
    
    return {
      mood: isCritical ? 'concerned' : (isWarning ? 'thinking' : 'excited') as 'happy' | 'concerned' | 'thinking' | 'excited',
      message: isCritical ? t.mascotCritical : (isWarning ? t.mascotWarning : t.mascotNormal),
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="bg-white rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(251,146,60,0.2)] overflow-hidden border-4 border-orange-50 relative"
    >
      {/* Decorative Whimsical Details */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-100/40 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-yellow-100/40 rounded-full blur-3xl -z-10"></div>

      {/* Header Section with Playful Aesthetic */}
      <div className={`p-10 pb-12 border-b-6 border-dashed border-orange-50 relative`}>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex flex-col items-center sm:items-start gap-3">
            <span className={`px-6 py-2 rounded-full text-[12px] font-bold uppercase tracking-[0.25em] font-round shadow-lg border-4 ${getStatusColor()}`}>
              {result.nutrition_status === 'Normal' ? t.statusNormal : 
               result.nutrition_status === 'Warning' ? t.statusUnderweight : 
               t.statusSeverelyUnderweight}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center gap-2.5 px-6 py-3 bg-white border-2 border-orange-100 rounded-full text-[12px] font-bold text-slate-500 shadow-sm transition-all font-round uppercase tracking-[0.1em]"
            >
              <RotateCcw className="w-4 h-4 text-orange-400" />
              {t.backAndEdit}
            </motion.button>
            <span className="px-6 py-3 bg-slate-900 text-white rounded-full text-[12px] font-bold tracking-widest shadow-xl shadow-slate-200 uppercase font-round">
              {t.reportId}: #{Math.floor(Math.random() * 9000) + 1000}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-10 items-center text-center sm:text-left">
          <Mascot 
             gender={gender === 'Female' ? 'girl' : 'boy'} 
             {...getMascotProps()}
             className="scale-90 lg:scale-100 shrink-0"
          />
          <p className="text-slate-800 font-extrabold text-3xl leading-tight font-round flex-1">
            {result.observation}
          </p>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Basic Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-orange-50/50 p-6 rounded-3xl border-2 border-orange-100 transition-transform hover:scale-[1.02] cursor-default">
            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em] mb-1.5 font-round">{t.childName}</p>
            <p className="text-slate-800 font-extrabold text-lg truncate">{result.name}</p>
          </div>
          <div className="bg-orange-50/50 p-6 rounded-3xl border-2 border-orange-100 transition-transform hover:scale-[1.02] cursor-default">
            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em] mb-1.5 font-round">{t.ageMonths}</p>
            <p className="text-slate-800 font-extrabold text-lg">{result.age}</p>
          </div>
        </div>

        {/* Translation Bubble */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-[2rem] border-2 border-blue-100 relative group transition-all hover:bg-white active:scale-98 cursor-default">
          <div className="absolute top-4 right-6 text-blue-200">
            <Languages className="w-8 h-8 opacity-20 group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex items-center gap-3 mb-3 text-blue-600 font-black uppercase text-[11px] tracking-[0.2em] font-round">
            <Languages className="w-4 h-4" />
            <span>{t.localizedSummary}</span>
          </div>
          <p className="text-slate-700 font-bold text-xl leading-snug">
            {result.local_translation}
          </p>
        </div>

        {/* Action Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Food Suggestions */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-4 bg-orange-400 rounded-full"></div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] font-round">
                {t.foodSuggestions}
              </h4>
            </div>
            <ul className="space-y-3">
              {result.food_suggestions.map((food, idx) => (
                <li key={idx} className="flex items-center gap-4 text-slate-700 text-sm font-semibold group">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-400 group-hover:scale-125 group-hover:rotate-12 transition-all"></div>
                  <span className="leading-tight">{food}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Recommendation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-4 bg-pink-400 rounded-full"></div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] font-round">
                {t.nextStep}
              </h4>
            </div>
            <div className="bg-slate-900 p-5 rounded-[1.5rem] shadow-xl shadow-slate-200 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 text-white opacity-5 group-hover:opacity-10 transition-opacity">
                <Lightbulb className="w-20 h-20" />
              </div>
              <p className="text-white font-bold text-sm leading-relaxed relative z-10">
                {result.medical_action}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-8 border-t-2 border-dashed border-orange-100 flex flex-col sm:flex-row gap-4">
          <button
            onClick={onReset}
            className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0.5 transition-all text-sm uppercase tracking-widest font-round"
          >
            {t.checkAnother}
          </button>
          <button className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all text-sm uppercase tracking-widest font-round shadow-sm">
            {t.printReport}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

