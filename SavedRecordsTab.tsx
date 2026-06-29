import React from 'react';
import { motion } from 'motion/react';
import { Trash2, User, Calendar, Weight, Ruler, ChevronRight, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SavedRecordsTabProps {
  records: { id: string; date: string; data: any }[];
  onDelete: (id: string) => void;
  onLoad: (data: any) => void;
}

export const SavedRecordsTab: React.FC<SavedRecordsTabProps> = ({ records, onDelete, onLoad }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800 font-round">{t.savedData}</h2>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest font-round">View and manage your previously saved child assessments</p>
      </div>

      {records.length === 0 ? (
        <div className="bg-white p-12 rounded-[3rem] border-4 border-orange-50 text-center space-y-4">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-orange-200">
            <User className="w-10 h-10" />
          </div>
          <p className="text-slate-400 font-bold font-round">{t.noSavedData}</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {records.map((record) => (
            <motion.div
              layout
              key={record.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 rounded-[2.5rem] border-4 border-orange-50 shadow-xl shadow-orange-100/30 group hover:border-orange-200 transition-all cursor-pointer relative"
              onClick={() => onLoad(record.data)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${record.data.gender === 'boy' ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'}`}>
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 font-round">{record.data.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      <Clock className="w-3 h-3" />
                      {record.date}
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(record.id);
                  }}
                  className="p-3 bg-red-50 text-red-400 rounded-2xl hover:bg-red-100 hover:text-red-500 transition-all active:scale-90"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-orange-50/50 p-3 rounded-2xl flex flex-col items-center justify-center gap-1">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  <span className="text-[10px] font-black text-slate-800 uppercase">{record.data.age} {record.data.ageUnit === 'years' ? 'yr' : 'mo'}</span>
                </div>
                <div className="bg-orange-50/50 p-3 rounded-2xl flex flex-col items-center justify-center gap-1">
                  <Weight className="w-4 h-4 text-orange-400" />
                  <span className="text-[10px] font-black text-slate-800 uppercase">{record.data.weight} kg</span>
                </div>
                <div className="bg-orange-50/50 p-3 rounded-2xl flex flex-col items-center justify-center gap-1">
                  <Ruler className="w-4 h-4 text-orange-400" />
                  <span className="text-[10px] font-black text-slate-800 uppercase">{record.data.height} cm</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 py-2 border-t border-orange-50 text-[10px] font-black text-orange-400 uppercase tracking-widest">
                <span>View Details</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
