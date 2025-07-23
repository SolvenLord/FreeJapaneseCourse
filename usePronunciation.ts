
import { useState, useEffect, useCallback } from 'react';

export const usePronunciation = () => {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const getVoices = () => {
      if (typeof window.speechSynthesis === 'undefined') {
        console.warn('Speech synthesis not supported.');
        return;
      }
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const japaneseVoice = voices.find(v => v.lang.startsWith('ja'));
        setVoice(japaneseVoice || null);
        setIsReady(true);
      }
    };

    getVoices();
    if (typeof window.speechSynthesis !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = getVoices;
    }

    return () => {
        if (typeof window.speechSynthesis !== 'undefined') {
            window.speechSynthesis.cancel();
        }
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!isReady || !text || typeof window.speechSynthesis === 'undefined') return;

    window.speechSynthesis.cancel(); // Cancel any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voice) {
        utterance.voice = voice;
    }
    utterance.lang = 'ja-JP';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }, [voice, isReady]);

  return { speak, isReady: isReady && !!voice };
};
