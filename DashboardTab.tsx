import React from 'react';
import { motion } from 'motion/react';
import { Users, TrendingUp, Heart, Shield, Apple, Sparkles, Activity, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

export const DashboardTab: React.FC = () => {
  const { t } = useLanguage();

  const chartData = [
    { age: '6m', boys: 7.9, girls: 7.3 },
    { age: '1y', boys: 9.6, girls: 8.9 },
    { age: '2y', boys: 12.2, girls: 11.5 },
    { age: '3y', boys: 14.3, girls: 13.9 },
    { age: '4y', boys: 16.3, girls: 16.1 },
    { age: '5y', boys: 18.3, girls: 18.2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-16 pb-20 relative"
    >
      {/* 1. Introduction: App Purpose */}
      <section className="bg-white p-12 rounded-[4rem] border-4 border-orange-50 shadow-2xl shadow-orange-100/50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-50 rounded-full -z-10"></div>
        <div className="relative z-10 space-y-6">
          <div className="inline-flex bg-orange-100 px-6 py-2 rounded-full text-orange-600 font-bold text-xs uppercase tracking-widest font-round mb-4">
            {t.welcomeNutriChild}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 font-round leading-tight">
            {t.nurturingFuture.split('Future').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-rose-500 underline decoration-8 decoration-rose-100 underline-offset-4">Future</span>
                )}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-slate-600 font-medium text-xl leading-relaxed font-round max-w-2xl">
            {t.dashboardIntro}
          </p>
        </div>
      </section>

      {/* 2. Growth Standards: Boys & Girls */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-800 font-round">{t.whoStandards}</h2>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest font-round">{t.healthyGrowthDesc}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Boy Standards */}
          <div className="bg-blue-50/50 p-10 rounded-[3.5rem] border-4 border-blue-100 shadow-xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Users className="w-40 h-40 text-blue-500" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-blue-700 mb-6 font-round flex items-center gap-3">
                <div className="p-3 bg-blue-500 text-white rounded-2xl">👦</div>
                {t.growthBoys}
              </h3>
              <div className="space-y-4">
                {[
                  { label: t.age2Years, h: "87 cm", w: "12.2 kg" },
                  { label: t.age5Years, h: "110 cm", w: "18.3 kg" },
                  { label: t.growthVelocity, desc: t.growthVelocityVal }
                ].map((item, i) => (
                  <div key={i} className="bg-white/80 p-4 rounded-2xl flex justify-between items-center border-2 border-blue-100 font-round">
                    <span className="font-black text-slate-500 uppercase text-[10px] tracking-widest">{item.label}</span>
                    <span className="font-black text-blue-600">{item.h ? `${item.h} / ${item.w}` : item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Girl Standards */}
          <div className="bg-pink-50/50 p-10 rounded-[3.5rem] border-4 border-pink-100 shadow-xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Heart className="w-40 h-40 text-pink-500" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-pink-700 mb-6 font-round flex items-center gap-3">
                <div className="p-3 bg-pink-500 text-white rounded-2xl">👧</div>
                {t.growthGirls}
              </h3>
              <div className="space-y-4">
                {[
                  { label: t.age2Years, h: "86 cm", w: "11.5 kg" },
                  { label: t.age5Years, h: "109 cm", w: "18.2 kg" },
                  { label: t.growthVelocity, desc: t.growthVelocityVal }
                ].map((item, i) => (
                  <div key={i} className="bg-white/80 p-4 rounded-2xl flex justify-between items-center border-2 border-pink-100 font-round">
                    <span className="font-black text-slate-500 uppercase text-[10px] tracking-widest">{item.label}</span>
                    <span className="font-black text-pink-600">{item.h ? `${item.h} / ${item.w}` : item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Weight Distribution Chart */}
      <section className="bg-white p-12 rounded-[4rem] border-4 border-orange-50 shadow-2xl shadow-orange-100/50">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl font-extrabold text-slate-800 font-round">Weight Distribution by Age</h2>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest font-round">Average weight (kg) for healthy boys and girls</p>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="age" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  padding: '12px'
                }}
              />
              <Legend 
                verticalAlign="top" 
                align="right" 
                iconType="circle"
                wrapperStyle={{ paddingBottom: '20px', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
              />
              <Bar 
                dataKey="boys" 
                name="Boys" 
                fill="#3b82f6" 
                radius={[6, 6, 0, 0]} 
                barSize={32}
              />
              <Bar 
                dataKey="girls" 
                name="Girls" 
                fill="#ec4899" 
                radius={[6, 6, 0, 0]} 
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 4. Nutritious Food Section */}
      <section className="bg-white p-12 rounded-[4rem] border-4 border-orange-50 shadow-2xl shadow-orange-100/50">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex bg-green-100 px-6 py-2 rounded-full text-green-600 font-black text-xs uppercase tracking-widest font-round">
              {t.nutritionGuide}
            </div>
            <h2 className="text-3xl font-black text-slate-800 font-round leading-tight">
              {t.fuelingBody}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: t.milkEggs, icon: "🥛", desc: t.proteinCalcium },
                { label: t.greenLeaves, icon: "🥬", desc: t.ironVitamins },
                { label: t.dalBeans, icon: "🥣", desc: t.muscleBuilding },
                { label: t.freshFruits, icon: "🍎", desc: t.immunityBoost }
              ].map((food, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-3xl border-2 border-slate-100 group hover:border-green-200 transition-colors">
                  <span className="text-2xl mb-2 block">{food.icon}</span>
                  <p className="font-black text-slate-800 text-xs font-round">{food.label}</p>
                  <p className="text-[10px] font-bold text-slate-400">{food.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-80 group">
             <div className="relative p-6 bg-green-50 rounded-[3rem] border-4 border-green-100 shadow-xl overflow-hidden">
                <div className="absolute inset-0 opacity-10"></div>
                <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                   <span className="text-6xl animate-bounce">🥗</span>
                   <p className="font-black text-green-700 font-round text-lg uppercase tracking-wider">{t.balancedMeal}</p>
                   <p className="text-xs font-bold text-slate-500">{t.balancedMealDesc}</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Problem Solving Section */}
      <section className="bg-slate-900 p-12 rounded-[4rem] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"></div>
        <div className="relative z-10 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black font-round mb-2 tracking-tight">{t.solvingGlobal}</h2>
            <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em]">{t.grassrootsImpact}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: t.zeroHunger, desc: t.zeroHungerDesc, color: "text-rose-500", bg: "bg-rose-500/10" },
              { icon: Apple, title: t.microNutrition, desc: t.microNutritionDesc, color: "text-orange-500", bg: "bg-orange-500/10" },
              { icon: Sparkles, title: t.aiPrecision, desc: t.aiPrecisionDesc, color: "text-blue-500", bg: "bg-blue-500/10" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 p-8 rounded-[3rem] border-2 border-white/10 hover:border-white/20 transition-all text-center">
                <div className={`${item.bg} ${item.color} w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-round">{item.title}</h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

