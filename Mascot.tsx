import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Star, AlertCircle } from 'lucide-react';

interface MascotProps {
  gender: 'boy' | 'girl';
  message: string;
  mood?: 'happy' | 'concerned' | 'thinking' | 'excited';
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({ gender, message, mood = 'happy', className = '' }) => {
  const getEmojiUrl = () => {
    switch (mood) {
      case 'excited':
        return 'https://emojicdn.elk.sh/😄?style=apple';
      case 'happy':
        return 'https://emojicdn.elk.sh/😊?style=apple';
      case 'thinking':
        return 'https://emojicdn.elk.sh/🤔?style=apple';
      case 'concerned':
        return 'https://emojicdn.elk.sh/😟?style=apple';
      default:
        return 'https://emojicdn.elk.sh/😊?style=apple';
    }
  };

  const getMoodColor = () => {
    switch (mood) {
      case 'excited': return 'bg-green-100 border-green-200 text-green-600';
      case 'concerned': return 'bg-rose-100 border-rose-200 text-rose-600';
      case 'thinking': return 'bg-blue-100 border-blue-200 text-blue-600';
      default: return 'bg-orange-100 border-orange-200 text-orange-600';
    }
  };

  const MoodIcon = () => {
    switch (mood) {
      case 'excited': return <Sparkles className="w-4 h-4" />;
      case 'concerned': return <AlertCircle className="w-4 h-4" />;
      case 'thinking': return <Star className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center gap-4 ${className}`}
    >
      <div className="relative group">
        <motion.img 
          src={getEmojiUrl()}
          alt="Mascot"
          className="w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl"
          animate={{ 
            y: mood === 'excited' ? [0, -10, 0] : [0, -2, 0],
            rotate: mood === 'thinking' ? [0, 5, -5, 0] : 0
          }}
          transition={{ 
            duration: mood === 'excited' ? 0.6 : 3, 
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />

        {/* Speech Bubble */}
        {message && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white p-4 rounded-2xl shadow-xl min-w-[220px] z-50 border border-slate-100"
          >
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-slate-100 rotate-45"></div>
            <p className="text-slate-700 font-bold font-sans text-xs text-center leading-relaxed">
              {message}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
