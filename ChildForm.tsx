import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Calendar, Weight, Ruler, ChevronRight, Mic, MicOff, Trash2, Activity, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ChildFormProps {
  formData: {
    name: string;
    age: string;
    ageUnit: string;
    gender: string;
    weight: string;
    prevWeight: string;
    height: string;
    dailyLogs: { id: string; type: 'meal' | 'activity'; notes: string; time: string }[];
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: (e: React.FormEvent) => void;
  onSave?: () => void;
  isProcessing: boolean;
}

const VoiceButton: React.FC<{ onResult: (text: string) => void }> = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const { language } = useLanguage();

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Set language based on app context
    const langMap: Record<string, string> = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'te': 'te-IN'
    };
    recognition.lang = langMap[language] || 'en-IN';
    
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      onResult(speechToText);
    };
    recognition.onerror = () => setIsListening(false);

    recognition.start();
  };

  return (
    <button
      type="button"
      onClick={startListening}
      className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all z-20 ${
        isListening ? 'bg-rose-500 text-white animate-pulse shadow-lg ring-4 ring-rose-100' : 'bg-orange-50 text-orange-400 hover:bg-orange-100'
      }`}
    >
      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
    </button>
  );
};

export const ChildForm: React.FC<ChildFormProps> = ({ formData, setFormData, onSubmit, onSave, isProcessing }) => {
  const { t } = useLanguage();
  const [errors, setErrors] = React.useState<Record<string, string | null>>({});

  const handleVoiceResult = (name: string, text: string) => {
    // Robust number extraction for health metrics
    if (['age', 'weight', 'height', 'prevWeight'].includes(name)) {
      // 1. Remove commas (often used in some locales for decimals or thousands)
      // 2. Map common words to digits (though Web Speech API usually does this)
      let cleaned = text.replace(/,/g, '.');
      
      // Look for any numeric pattern
      const numMatch = cleaned.match(/\d+(\.\d+)?/);
      
      if (numMatch) {
        // Use the first numeric match found
        const value = numMatch[0];
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: null }));
      } else {
        // If no digits found, maybe it's a word? (Very rare with correct recognition.lang)
        // Just set the text if it's name, but for numbers we wait for a valid one
        console.log(`No number found in: ${text}`);
      }
    } else {
      // For non-numeric fields like 'name', just set the text
      const sanitizedText = text.trim();
      if (sanitizedText) {
        setFormData(prev => ({ ...prev, [name]: sanitizedText }));
        setErrors(prev => ({ ...prev, [name]: null }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types or changes
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateField = (name: string, value: string): string | null => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return 'required';

    if (['age', 'weight', 'height', 'prevWeight'].includes(name)) {
      const num = parseFloat(trimmedValue);
      if (isNaN(num)) return 'invalid';
      
      const ageInMonths = formData.ageUnit === 'years' 
        ? parseFloat(formData.age) * 12 
        : parseFloat(formData.age);

      if (name === 'age') {
        if (num <= 0) return 'small';
        if (formData.ageUnit === 'months' && num > 240) return 'large'; // 20 years
        if (formData.ageUnit === 'years' && num > 20) return 'large';
      }

      if (name === 'weight' || name === 'prevWeight') {
        if (num < 0.5) return 'small';
        if (num > 150) return 'large';
        
        // Realistic weight range check based on age (approximate for 0-10 years)
        if (!isNaN(ageInMonths)) {
          const minExpected = 2 + (ageInMonths * 0.1); // Very loose minimum
          const maxExpected = 10 + (ageInMonths * 2); // Very loose maximum
          if (num < minExpected * 0.5 || num > maxExpected * 1.5) {
             // We only warn if it's way off, but here we'll return a specific error for "unrealistic"
             // instead of a hard block if it's within 0.5-150. 
             // Actually, the user asked for validation logic, so let's be descriptive.
             // If weight is outside standard health bounds for the app (0-5 years usually)
             if (ageInMonths <= 60 && (num < 2 || num > 30)) return 'weightLimit';
          }
        }
      }

      if (name === 'height') {
        if (num < 30) return 'small';
        if (num > 250) return 'large';
        
        if (!isNaN(ageInMonths) && ageInMonths <= 60) {
          if (num < 45 || num > 130) return 'heightLimit';
        }
      }

      // Cross-field validation: current weight vs previous weight
      if (name === 'weight' && formData.prevWeight) {
        const prevW = parseFloat(formData.prevWeight);
        if (!isNaN(prevW)) {
          const diff = Math.abs(num - prevW);
          if (diff > 5) return 'weightDiff'; // More than 5kg change in 1 month is highly unlikely for children
        }
      }
    }

    return null;
  };

  const [logEntry, setLogEntry] = useState<{ type: 'meal' | 'activity'; notes: string }>({ type: 'meal', notes: '' });

  const addLogEntry = () => {
    if (!logEntry.notes.trim()) return;
    const newEntry = {
      ...logEntry,
      id: Math.random().toString(36).substr(2, 9),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setFormData((prev: any) => ({
      ...prev,
      dailyLogs: [newEntry, ...(prev.dailyLogs || [])]
    }));
    setLogEntry({ type: 'meal', notes: '' });
  };

  const removeLogEntry = (id: string) => {
    setFormData((prev: any) => ({
      ...prev,
      dailyLogs: (prev.dailyLogs || []).filter((log: any) => log.id !== id)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string | null> = {};
    let hasError = false;

    const fieldsToValidate = ['name', 'age', 'gender', 'weight', 'height', 'prevWeight'];
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        newErrors[field] = error;
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      // Accessibility: Focus the first error field
      const firstErrorField = fieldsToValidate.find(f => newErrors[f]);
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    onSubmit(e);
  };

  const getBorderClass = (fieldName: string) => {
    return errors[fieldName] 
      ? 'border-red-400 ring-4 ring-red-100/50 bg-red-50/50 shadow-sm' 
      : 'border-slate-100 focus:ring-4 focus:ring-slate-100/50 focus:border-slate-200 focus:bg-white shadow-sm';
  };

  const getErrorText = (type: string | null) => {
    if (!type) return null;
    switch (type) {
      case 'required': return t.requiredField;
      case 'invalid': return t.invalidNumber;
      case 'small': return t.valueTooSmall;
      case 'large': return t.valueTooLarge;
      case 'weightLimit': return t.weightLimitError;
      case 'heightLimit': return t.heightLimitError;
      case 'weightDiff': return t.weightDiffError;
      default: return t.requiredField;
    }
  };

  const ErrorMsg = ({ fieldName }: { fieldName: string }) => {
    const errorType = errors[fieldName];
    if (!errorType) return null;
    
    return (
      <motion.p 
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-[11px] text-red-500 font-bold mt-2 ml-3 flex items-center gap-2 font-round"
      >
        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
        {getErrorText(errorType)}
      </motion.p>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start">
      <div className="flex-1 w-full order-2 lg:order-1">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="relative">
                <label htmlFor="name" className={`text-[12px] font-bold uppercase tracking-[0.2em] mb-2.5 ml-3 block font-round ${errors.name ? 'text-red-500' : 'text-slate-500'}`}>
                  {t.nameLabel}
                </label>
                <div className="relative group">
                  <User className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-10 ${errors.name ? 'text-red-400' : 'text-slate-300'}`} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={t.namePlaceholder}
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-14 pr-16 py-4 text-sm bg-white rounded-2xl outline-none transition-all placeholder:text-slate-300 font-semibold text-slate-700 border-2 ${getBorderClass('name')}`}
                  />
                  <VoiceButton onResult={(text) => handleVoiceResult('name', text)} />
                </div>
                <ErrorMsg fieldName="name" />
              </div>

              <div className="relative">
                <label htmlFor="gender" className={`text-[12px] font-bold uppercase tracking-[0.2em] mb-2.5 ml-3 block font-round ${errors.gender ? 'text-red-500' : 'text-slate-500'}`}>
                  {t.genderLabel}
                </label>
                <div className="relative group">
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full px-7 py-4 text-sm bg-white rounded-2xl outline-none transition-all appearance-none text-slate-700 font-semibold border-2 ${getBorderClass('gender')}`}
                  >
                    <option value="">{t.genderSelect}</option>
                    <option value="Male">{t.genderBoy}</option>
                    <option value="Female">{t.genderGirl}</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-orange-300 group-focus-within:text-pink-400 transition-colors">
                    <ChevronRight className="w-5 h-5 rotate-90" />
                  </div>
                </div>
                <ErrorMsg fieldName="gender" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="relative">
                <div className="flex items-center justify-between mb-2.5 ml-3">
                  <label htmlFor="age" className={`text-[12px] font-bold uppercase tracking-[0.2em] font-round ${errors.age ? 'text-red-500' : 'text-slate-500'}`}>
                    {t.ageLabel}
                  </label>
                  <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, ageUnit: 'months' }))}
                      className={`px-3 py-1.5 text-[8px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                        formData.ageUnit === 'months' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      {t.ageUnitMonths}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, ageUnit: 'years' }))}
                      className={`px-3 py-1.5 text-[8px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                        formData.ageUnit === 'years' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      {t.ageUnitYears}
                    </button>
                  </div>
                </div>
                <div className="relative group">
                  <Calendar className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-10 ${errors.age ? 'text-red-400' : 'text-slate-300'}`} />
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder={formData.ageUnit === 'months' ? '24' : '2'}
                    value={formData.age}
                    onChange={handleChange}
                    className={`w-full pl-14 pr-16 py-4 text-sm bg-white rounded-2xl outline-none transition-all placeholder:text-slate-300 font-semibold text-slate-700 border-2 ${getBorderClass('age')}`}
                  />
                  <VoiceButton onResult={(text) => handleVoiceResult('age', text)} />
                </div>
                <ErrorMsg fieldName="age" />
              </div>

              <div className="relative">
                <label htmlFor="height" className={`text-[12px] font-bold uppercase tracking-[0.2em] mb-2.5 ml-3 block font-round ${errors.height ? 'text-red-500' : 'text-slate-500'}`}>
                  {t.heightLabel}
                </label>
                <div className="relative group">
                  <Ruler className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-10 ${errors.height ? 'text-red-400' : 'text-slate-300'}`} />
                  <input
                    type="number"
                    step="0.1"
                    id="height"
                    name="height"
                    placeholder="75.0"
                    value={formData.height}
                    onChange={handleChange}
                    className={`w-full pl-14 pr-16 py-4 text-sm bg-white rounded-2xl outline-none transition-all font-semibold text-slate-700 border-2 ${getBorderClass('height')}`}
                  />
                  <VoiceButton onResult={(text) => handleVoiceResult('height', text)} />
                </div>
                <ErrorMsg fieldName="height" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="relative">
                <label htmlFor="weight" className={`text-[12px] font-bold uppercase tracking-[0.2em] mb-2.5 ml-3 block font-round ${errors.weight ? 'text-red-500' : 'text-slate-500'}`}>
                  {t.weightLabel}
                </label>
                <div className="relative group">
                  <Weight className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-10 ${errors.weight ? 'text-red-400' : 'text-slate-300'}`} />
                  <input
                    type="number"
                    step="0.1"
                    id="weight"
                    name="weight"
                    placeholder="8.5"
                    value={formData.weight}
                    onChange={handleChange}
                    className={`w-full pl-14 pr-16 py-4 text-sm bg-white rounded-2xl outline-none transition-all font-semibold text-slate-700 border-2 ${getBorderClass('weight')}`}
                  />
                  <VoiceButton onResult={(text) => handleVoiceResult('weight', text)} />
                </div>
                <ErrorMsg fieldName="weight" />
              </div>

              <div className="relative">
                <label htmlFor="prevWeight" className={`text-[12px] font-bold uppercase tracking-[0.2em] mb-2.5 ml-3 block font-round ${errors.prevWeight ? 'text-red-500' : 'text-slate-500'}`}>
                  {t.previousWeightLabel}
                </label>
                <div className="relative group">
                  <Weight className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-10 ${errors.prevWeight ? 'text-red-400' : 'text-slate-300'}`} />
                  <input
                    type="number"
                    step="0.1"
                    id="prevWeight"
                    name="prevWeight"
                    placeholder="8.3"
                    value={formData.prevWeight}
                    onChange={handleChange}
                    className={`w-full pl-14 pr-16 py-4 text-sm bg-white rounded-2xl outline-none transition-all font-semibold text-slate-700 border-2 ${getBorderClass('prevWeight')}`}
                  />
                  <VoiceButton onResult={(text) => handleVoiceResult('prevWeight', text)} />
                </div>
                <ErrorMsg fieldName="prevWeight" />
              </div>
            </div>
          </div>

          {/* Daily Logs Section */}
          <div className="bg-orange-50/50 p-8 rounded-[2.5rem] border-2 border-orange-100 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-800 font-round">{t.dailyLog}</h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  {(['meal', 'activity'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setLogEntry(prev => ({ ...prev, type }))}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                        logEntry.type === type ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-100'
                      }`}
                    >
                      {type === 'meal' ? t.meal : t.activity}
                    </button>
                  ))}
                </div>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder={logEntry.type === 'meal' ? t.mealPlaceholder : t.activityPlaceholder}
                    value={logEntry.notes}
                    onChange={(e) => setLogEntry(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-5 py-3.5 text-sm bg-white rounded-xl outline-none border-2 border-transparent focus:border-orange-200 transition-all font-semibold text-slate-700"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <VoiceButton onResult={(text) => setLogEntry(prev => ({ ...prev, notes: text }))} />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={addLogEntry}
                className="px-8 py-3.5 bg-orange-500 text-white font-bold rounded-xl shadow-lg hover:bg-orange-600 transition-all active:scale-95 text-xs uppercase tracking-widest"
              >
                {t.addActivity}
              </button>
            </div>

            {/* List of Logs */}
            <div className="space-y-3">
              {(formData.dailyLogs || []).map((log: any) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-4 rounded-2xl flex items-center justify-between border border-orange-100 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${log.type === 'meal' ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'}`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">{log.time}</span>
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${log.type === 'meal' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {log.type === 'meal' ? t.meal : t.activity}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-700 mt-1">{log.notes}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLogEntry(log.id)}
                    className="p-2 text-slate-300 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              type="button"
              onClick={onSave}
              className="flex-1 py-5 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all text-sm uppercase tracking-widest font-round flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              {t.saveProgress}
            </button>
            <button
              type="submit"
              id="submit-btn"
              disabled={isProcessing}
              className={`flex-[2] py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 hover:-translate-y-1 active:translate-y-0.5 transition-all text-sm uppercase tracking-widest font-round ${
                isProcessing ? 'opacity-70 cursor-not-allowed scale-[0.98]' : ''
              }`}
            >
              <span>{isProcessing ? t.analyzingBtn : t.analyzeBtn}</span>
              {!isProcessing && <ChevronRight className="w-5 h-5 ml-2" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
