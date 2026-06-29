/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Activity, Info, Languages, LayoutDashboard, HelpCircle } from 'lucide-react';
import { ChildForm } from './components/ChildForm';
import { NutritionResultCard } from './components/NutritionResultCard';
import { analyzeNutrition, NutritionResult } from './services/geminiService';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { TipsTab } from './components/TipsTab';
import { DashboardTab } from './components/DashboardTab';
import { SavedRecordsTab } from './components/SavedRecordsTab';

const STORAGE_KEY = 'nutrichild_form_data';

function AppContent() {
  const { t, language, setLanguage } = useLanguage();
  
  // Initialize state from local storage or default values
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error('Failed to parse saved form data', e);
      }
    }
    return {
      name: '',
      age: '',
      ageUnit: 'years',
      gender: '',
      weight: '',
      prevWeight: '',
      height: '',
      dailyLogs: [] as { id: string; type: 'meal' | 'activity'; notes: string; time: string }[],
    };
  });

  // Save to local storage whenever formData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<NutritionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'assess' | 'dashboard' | 'tips' | 'saved'>('dashboard');

  const [savedRecords, setSavedRecords] = useState<{ id: string; date: string; data: any }[]>(() => {
    const saved = localStorage.getItem('nutrichild_saved_records');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to local storage whenever savedRecords changes
  useEffect(() => {
    localStorage.setItem('nutrichild_saved_records', JSON.stringify(savedRecords));
  }, [savedRecords]);

  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleSaveProgress = () => {
    if (!formData.name) return;
    const newRecord = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString(),
      data: { ...formData }
    };
    setSavedRecords(prev => [newRecord, ...prev]);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleDeleteRecord = (id: string) => {
    setSavedRecords(prev => prev.filter(r => r.id !== id));
  };

  const handleBack = () => {
    setResult(null);
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setFormData({
      name: '',
      age: '',
      ageUnit: 'years',
      gender: '',
      weight: '',
      prevWeight: '',
      height: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent | null) => {
    if (e) e.preventDefault();
    
    setError(null);
    setIsProcessing(true);

    try {
      const ageInMonths = formData.ageUnit === 'years'
        ? (parseFloat(formData.age) * 12).toString() 
        : formData.age;

      const result = await analyzeNutrition({
        ...formData,
        age: ageInMonths,
      }, language);
      setResult(result);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans relative overflow-hidden">
      {/* Success Notification */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: showSaveSuccess ? 1 : 0, y: showSaveSuccess ? 0 : -50 }}
        className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
      >
        <div className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white/20 backdrop-blur-sm">
          <Heart className="w-5 h-5 fill-current" />
          <span className="font-black text-sm uppercase tracking-widest">{t.savedSuccessfully}</span>
        </div>
      </motion.div>
      {/* Background Layer */}
      <div className="absolute inset-0 bg-dots -z-20 opacity-30"></div>
      
      {/* Decorative Floating Blobs */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-5%] left-[-10%] w-[40vw] h-[40vw] bg-yellow-200/40 rounded-full blur-[80px] -z-10"
      ></motion.div>
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-pink-100/50 rounded-full blur-[100px] -z-10"
      ></motion.div>

      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b-8 border-orange-50 px-4 sm:px-8 py-5 flex items-center justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveTab('assess')}
              className="bg-gradient-to-br from-red-400 via-pink-400 to-orange-400 p-3 rounded-[1.5rem] text-white shadow-xl shadow-orange-200/50 cursor-pointer"
            >
              <Heart className="w-7 h-7 fill-current" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight font-round leading-none">{t.title}</h1>
              <p className="text-[10px] font-bold text-rose-500 uppercase tracking-[0.2em] mt-1.5 antialiased font-round">{t.subtitle}</p>
            </div>
          </div>
          
          {/* Main Navigation Tabs */}
          <nav className="sm:ml-8 flex bg-orange-100/30 p-1.5 rounded-[2rem] border-2 border-orange-50">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: t.tabDashboard },
              { id: 'assess', icon: Activity, label: t.tabAssess },
              { id: 'saved', icon: Heart, label: t.savedData },
              { id: 'tips', icon: HelpCircle, label: t.tabTips }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setResult(null);
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest font-round transition-all active:scale-95 ${
                  activeTab === tab.id 
                    ? 'bg-white text-orange-600 shadow-sm ring-1 ring-orange-100' 
                    : 'text-slate-400 hover:text-orange-400 hover:bg-white/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Refined Language Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-orange-100 rounded-full text-xs font-black text-slate-600 hover:border-orange-300 hover:bg-orange-50 transition-all shadow-md active:scale-95 font-round uppercase tracking-widest">
              <Languages className="w-4 h-4 text-orange-400" />
              <span className="hidden sm:inline">{language === 'en' ? 'English' : language === 'te' ? 'తెలుగు' : 'हिंदी'}</span>
              <span className="sm:hidden">{language}</span>
            </button>
            <div className="absolute right-0 top-full mt-2 bg-white border-2 border-orange-100 rounded-2xl shadow-xl py-2 w-32 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all z-50">
              {(['en', 'te', 'hi'] as const).map((lang) => (
                <button 
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-orange-50 transition-colors ${language === lang ? 'text-orange-600 bg-orange-50' : 'text-slate-600'}`}
                >
                  {lang === 'en' ? 'English' : lang === 'te' ? 'తెలుగు' : 'हिंदी'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12 relative">
        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'assess' ? (
            !result ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="space-y-6"
              >
                {/* Introduction Cute Card */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-[2.5rem] border-b-8 border-orange-100 shadow-2xl shadow-orange-200/20 relative overflow-hidden group"
                >
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-50 rounded-full -z-10 opacity-50"></div>
                  <div className="flex gap-6 relative">
                    <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-5 rounded-[2rem] h-fit shadow-xl shadow-orange-100/50 ring-4 ring-white">
                      <Activity className="w-8 h-8 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-orange-400 mb-3 font-round">{t.healthAssessment}</h2>
                      <p className="text-slate-700 font-black text-xl leading-snug font-round drop-shadow-sm">{t.assessmentDesc}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Input Section */}
                <div className="bg-white p-10 rounded-[3rem] border-4 border-orange-100 shadow-2xl shadow-orange-100/50 space-y-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-bl-[5rem] -z-10"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-2.5 h-6 bg-pink-400 rounded-full shadow-lg shadow-pink-200"></div>
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 font-round">
                      {t.inputData}
                    </h3>
                  </div>
                  
                  <ChildForm 
                    formData={formData} 
                    setFormData={setFormData} 
                    onSubmit={handleSubmit} 
                    onSave={handleSaveProgress}
                    isProcessing={isProcessing} 
                  />
                </div>

                {error && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 bg-red-50 text-red-600 text-sm font-black rounded-3xl text-center border-4 border-red-100 shadow-xl shadow-red-100"
                  >
                    {error}
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <NutritionResultCard 
                key="result"
                result={result} 
                gender={formData.gender}
                onReset={reset} 
                onBack={handleBack} 
              />
            )
          ) : activeTab === 'dashboard' ? (
            <DashboardTab key="dashboard" />
          ) : activeTab === 'saved' ? (
            <SavedRecordsTab 
              key="saved" 
              records={savedRecords} 
              onDelete={handleDeleteRecord}
              onLoad={(data) => {
                setFormData(data);
                setActiveTab('assess');
              }}
            />
          ) : (
            <TipsTab key="tips" />
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Support */}
      <footer className="p-8 text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/50 backdrop-blur-sm border-2 border-orange-50 rounded-full text-xs font-black uppercase tracking-[0.15em] text-slate-400 hover:text-orange-400 transition-colors cursor-pointer group font-round">
          <Info className="w-4 h-4 text-orange-300 group-hover:text-orange-400 transition-colors" />
          <span>{t.helpline}</span>
        </div>
        <p className="text-[10px] font-bold text-slate-300 tracking-widest uppercase">{t.footerCredit}</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

