// Hebrew Text-to-Speech using Web Speech API

export const speakHebrew = (text: string): void => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return;
  }

  // Check if browser supports speech synthesis
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Create utterance
  const utterance = new SpeechSynthesisUtterance(text);

  // Set language to Hebrew
  utterance.lang = 'he-IL';

  // Set voice properties
  utterance.rate = 0.9; // Slightly slower for clarity
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Try to find a Hebrew voice
  const voices = window.speechSynthesis.getVoices();
  const hebrewVoice = voices.find((voice) => voice.lang.startsWith('he'));

  if (hebrewVoice) {
    utterance.voice = hebrewVoice;
  }

  // Speak
  window.speechSynthesis.speak(utterance);
};

// Load voices when available (only in browser)
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
