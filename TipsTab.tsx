import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Heart, Star, Baby, Apple, Utensils, Hand } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const TipsTab: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Introduction Card */}
      <div className="bg-white p-10 rounded-[3rem] border-4 border-orange-50 shadow-xl shadow-orange-100/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Baby className="w-32 h-32 text-orange-500" />
        </div>
        
        <h2 className="text-3xl font-extrabold text-slate-800 mb-6 font-round">{t.tipsTitle}</h2>
        <p className="text-slate-600 font-medium text-lg leading-relaxed mb-8">
          {t.tipsIntro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-50 p-6 rounded-[2rem] border-2 border-rose-100">
            <div className="flex items-center gap-3 mb-3 text-rose-600">
              <Apple className="w-6 h-6" />
              <h3 className="font-bold font-round uppercase tracking-wider">{t.diverseDietTitle}</h3>
            </div>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">{t.diverseDietDesc}</p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-[2rem] border-2 border-blue-100">
            <div className="flex items-center gap-3 mb-3 text-blue-600">
              <Hand className="w-6 h-6" />
              <h3 className="font-bold font-round uppercase tracking-wider">{t.hygieneTitle}</h3>
            </div>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">{t.hygieneDesc}</p>
          </div>
        </div>
      </div>

      {/* Guidelines Section */}
      <div className="bg-white p-10 rounded-[3rem] border-4 border-orange-50 shadow-xl shadow-orange-100/50">
        <h2 className="text-3xl font-black text-slate-800 mb-8 font-round flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-400 fill-current" />
          {t.guidelinesTitle}
        </h2>
        
        <div className="space-y-8">
          {[
            { 
              icon: Utensils, 
              title: t.feedingFreqTitle, 
              desc: t.feedingFreqDesc,
              color: "text-orange-500",
              bg: "bg-orange-50"
            },
            { 
              icon: Heart, 
              title: t.activePlayTitle, 
              desc: t.activePlayDesc,
              color: "text-rose-500",
              bg: "bg-rose-50"
            },
            { 
              icon: BookOpen, 
              title: t.growthMonTitle, 
              desc: t.growthMonDesc,
              color: "text-blue-500",
              bg: "bg-blue-50"
            }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-6 items-start group">
              <div className={`${item.bg} ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-black/5`}>
                <item.icon className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-800 mb-2 font-round">{item.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-gradient-to-r from-orange-400 to-rose-400 p-8 rounded-[3rem] text-white shadow-xl shadow-orange-200">
         <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white/20 p-4 rounded-full">
               <Star className="w-10 h-10 text-white fill-current" />
            </div>
            <div>
               <h3 className="text-2xl font-black font-round mb-2 uppercase tracking-widest">{t.heroTitle}</h3>
               <p className="font-black opacity-90">{t.heroDesc}</p>
            </div>
         </div>
      </div>
    </motion.div>
  );
};
