import { useEffect, useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { useWebSocket } from '../hooks/useWebSocket';
import { useToast } from '../components/Toast';
import { apiClient } from '../lib/api';
import type { SignSpeakHistoryEntry } from '../types/api';
import { motion, AnimatePresence } from 'framer-motion';

// Complete visual tutorials database for the 23 classes
const SIGN_TUTORIALS: Record<string, { title: string; steps: string[]; illustration: string }> = {
  school: {
    title: 'School',
    steps: ['Place your dominant hand flat, palm down.', 'Clap it against your other flat hand at a right angle twice.', 'Mimic a teacher clapping for attention.'],
    illustration: '👏'
  },
  sorry: {
    title: 'Sorry',
    steps: ['Form an "A" hand shape (closed fist, thumb on the side).', 'Place it over your chest/heart area.', 'Rub your fist in a circle on your chest clockwise 2-3 times.'],
    illustration: '✊'
  },
  help: {
    title: 'Help',
    steps: ['Place your closed dominant hand with thumb up (like a thumbs up) on top of your flat non-dominant hand palm.', 'Lift both hands together upward in a single smooth motion.'],
    illustration: '👍'
  },
  easy: {
    title: 'Easy',
    steps: ['Hold both hands in front of you, palms facing up, fingers curved.', 'Brush the fingertips of your dominant hand upward against the back of the other fingertips twice.'],
    illustration: '🪶'
  },
  work: {
    title: 'Work',
    steps: ['Form closed fists with both hands.', 'Tap the wrist/heel of your dominant hand on the back of your non-dominant wrist twice.'],
    illustration: '🔨'
  },
  age: {
    title: 'Age',
    steps: ['Place your dominant hand in a fist near your chin, like holding a beard.', 'Pull the hand downward a few inches while squeezing your fist tighter.'],
    illustration: '🧔'
  },
  effort: {
    title: 'Effort',
    steps: ['Form "E" hand shapes with both hands (fingers curled, resting on thumb).', 'Push both hands forward in a circular motion, symbolizing pushing hard.'],
    illustration: '💪'
  },
  respect: {
    title: 'Respect',
    steps: ['Form "R" hand shapes with both hands (index and middle fingers crossed).', 'Move both hands from near your forehead forward and downward towards the person.'],
    illustration: '🫡'
  },
  near: {
    title: 'Near',
    steps: ['Hold your non-dominant hand bent slightly in front of your chest.', 'Bring your dominant hand from behind it, moving it close to the back of the non-dominant palm.'],
    illustration: '🤏'
  },
  home: {
    title: 'Home',
    steps: ['Form a flat "O" hand shape (fingertips touching thumb).', 'Touch the fingertips to your cheek near your mouth, then touch near your ear.'],
    illustration: '🏠'
  },
  friend: {
    title: 'Friend',
    steps: ['Hook your right index finger over your left index finger.', 'Reverse the hook, hooking your left index finger over your right index finger.'],
    illustration: '🤝'
  },
  washroom: {
    title: 'Washroom',
    steps: ['Form a "T" hand shape (fist with thumb tucked under index finger).', 'Shake your wrist back and forth gently several times.'],
    illustration: '🚽'
  },
  preset: {
    title: 'Preset',
    steps: ['Form both hands flat, palms facing you.', 'Push both hands forward together, representing locking a set position in place.'],
    illustration: '⚙️'
  },
  pass: {
    title: 'Pass',
    steps: ['Hold both hands in fists, thumbs up, palms facing each other.', 'Move your dominant fist forward past the stationary non-dominant fist.'],
    illustration: '🏁'
  },
  fail: {
    title: 'Fail',
    steps: ['Place your non-dominant hand flat, palm facing up.', 'Slide your flat dominant hand (palm facing up) off the edge of the non-dominant hand quickly.'],
    illustration: '❌'
  },
  village: {
    title: 'Village',
    steps: ['Form a roof shape with your hands (fingertips touching).', 'Tap your fingertips together several times while moving your hands side-to-side, representing houses.'],
    illustration: '🏡'
  },
  eating: {
    title: 'Eating',
    steps: ['Form a flat "O" hand shape with your dominant hand (fingertips touching thumb).', 'Bring the fingertips to your mouth twice in a feeding motion.'],
    illustration: '🍞'
  },
  eatig: {
    title: 'Eating',
    steps: ['Form a flat "O" hand shape with your dominant hand (fingertips touching thumb).', 'Bring the fingertips to your mouth twice in a feeding motion.'],
    illustration: '🍞'
  },
  drinking: {
    title: 'Drinking',
    steps: ['Form a "C" hand shape with your dominant hand, as if holding a cup.', 'Tilt the hand toward your mouth, mimicking drinking from a glass.'],
    illustration: '🥛'
  },
  teacher: {
    title: 'Teacher',
    steps: ['Form flattened "O" shapes with both hands near your temples.', 'Move them forward twice, then move both hands flat downwards to indicate a person.'],
    illustration: '👨‍🏫'
  },
  dress: {
    title: 'Dress',
    steps: ['Place both hands flat on your chest (thumbs touching chest).', 'Sweep both hands downward along your body, flaring outwards.'],
    illustration: '👗'
  },
  message: {
    title: 'Message',
    steps: ['Pinch your thumb and index fingers together on both hands.', 'Touch them together, then pull them apart while opening and closing the pinch.'],
    illustration: '✉️'
  },
  good: {
    title: 'Good',
    steps: ['Place the fingers of your flat right hand to your lips.', 'Bring the hand down, resting the back of it in the palm of your flat left hand.'],
    illustration: '✨'
  }
};

export default function SignSpeakTranslate() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const {
    gestureHistory, sentence,
    cameraOn,
    setIsStreaming, setCameraOn,
    voiceSpeed, voicePitch, vibrationEnabled,
    setCurrentResult, addHistoryEntry,
    useOllama,
    voiceId,
    facingMode, setFacingMode,
    bandwidthMode,
  } = useAppStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // App mode segment selector
  const [translateMode, setTranslateMode] = useState<'sign2speech' | 'speech2sign' | 'practice'>('sign2speech');

  // Speech-to-Sign (mic translation) state
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [matchedSigns, setMatchedSigns] = useState<string[]>([]);
  const recognitionRef = useRef<any>(null);
  const [typedText, setTypedText] = useState('');

  // Practice Arena state variables
  const [targetWord, setTargetWord] = useState('help');
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('sign_speak_streak') || '0'));
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('sign_speak_high_score') || '0'));
  const [arenaCompleted, setArenaCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Ref to pass latest state to websocket callbacks without triggering reconnects
  const arenaMatchRef = useRef({ translateMode, targetWord, arenaCompleted });
  useEffect(() => {
    arenaMatchRef.current = { translateMode, targetWord, arenaCompleted };
  }, [translateMode, targetWord, arenaCompleted]);

  const loadNextArenaWord = useCallback(() => {
    const keys = Object.keys(SIGN_TUTORIALS).filter(k => k !== 'eatig');
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setTargetWord(randomKey);
    setArenaCompleted(false);
    setShowHint(false);
  }, []);

  const handleArenaMatch = useCallback(() => {
    setArenaCompleted(true);
    const newStreak = streak + 1;
    setStreak(newStreak);
    localStorage.setItem('sign_speak_streak', String(newStreak));
    
    if (newStreak > highScore) {
      setHighScore(newStreak);
      localStorage.setItem('sign_speak_high_score', String(newStreak));
      addToast('New High Score! Excellent!', 'success');
    } else {
      addToast('Sign Match! Correct!', 'success');
    }
    
    // Play Web Audio beep
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(580, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.16);
    } catch (e) {
      console.warn("AudioContext beep failed", e);
    }
    
    setTimeout(() => {
      loadNextArenaWord();
    }, 2500);
  }, [streak, highScore, addToast, loadNextArenaWord]);

  const handleSkipArenaWord = () => {
    setStreak(0);
    localStorage.setItem('sign_speak_streak', '0');
    addToast('Streak reset to 0', 'info');
    loadNextArenaWord();
  };

  const { connect, disconnect, connected, sendMessage } = useWebSocket({
    onDetection: (data) => {
      if (vibrationEnabled && 'vibrate' in navigator) {
        navigator.vibrate(50);
      }

      const { translateMode: currentMode, targetWord: currentWord, arenaCompleted: currentCompleted } = arenaMatchRef.current;
      
      if (currentMode === 'practice' && !currentCompleted) {
        const detectedCls = data.gesture.toLowerCase();
        const targetCls = currentWord.toLowerCase();
        
        if (detectedCls === targetCls || 
            (targetCls === 'eating' && detectedCls === 'eatig') || 
            (targetCls === 'eatig' && detectedCls === 'eating')) {
          handleArenaMatch();
        }
      }
    },
  });

  const startCamera = useCallback(async (modeOverride?: 'user' | 'environment') => {
    try {
      const activeMode = modeOverride || facingMode;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: activeMode },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);
      setIsStreaming(true);
      connect();
      addToast(`Camera started using ${activeMode === 'user' ? 'front' : 'rear'} lens.`, 'success');
    } catch {
      addToast('Camera access denied. Please allow camera permissions.', 'error');
    }
  }, [connect, setCameraOn, setIsStreaming, addToast, facingMode]);

  const handleSwapCamera = useCallback(() => {
    if (vibrationEnabled && 'vibrate' in navigator) navigator.vibrate(30);
    const newMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newMode);
    if (cameraOn) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      startCamera(newMode);
    } else {
      addToast(`Camera mode set to ${newMode === 'user' ? 'front' : 'rear'}. Tap to start.`, 'info');
    }
  }, [cameraOn, facingMode, startCamera, vibrationEnabled, addToast]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    disconnect();
    setIsStreaming(false);
    setCameraOn(false);
  }, [disconnect, setIsStreaming, setCameraOn]);

  useEffect(() => {
    return () => { stopCamera(); };
  }, [stopCamera]);

  // Frame sender loop for Sign-to-Speech & Practice Arena
  useEffect(() => {
    if (!cameraOn || !connected || (translateMode !== 'sign2speech' && translateMode !== 'practice')) return;

    const intervalTime = bandwidthMode === 'high' ? 200 : bandwidthMode === 'standard' ? 250 : 333;

    const intervalId = setInterval(() => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context && video.readyState >= 2 && video.videoWidth > 0) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
          sendMessage({
            type: 'frame',
            image: dataUrl,
          });
        }
      }
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [cameraOn, connected, sendMessage, translateMode, bandwidthMode]);

  // Stop camera when switching to Speech-to-Sign
  useEffect(() => {
    if (translateMode === 'speech2sign' && cameraOn) {
      stopCamera();
    }
  }, [translateMode, cameraOn, stopCamera]);

  // Initialize practice word when joining Practice Mode
  useEffect(() => {
    if (translateMode === 'practice') {
      loadNextArenaWord();
    }
  }, [translateMode, loadNextArenaWord]);

  const handleToggleCamera = () => {
    if (vibrationEnabled && 'vibrate' in navigator) navigator.vibrate(15);
    if (cameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const handleSpeak = async (text?: string) => {
    const t = text || sentence || "Hello, how can I help you today?";
    if (!t.trim()) {
      addToast('No translation text available to speak.', 'error');
      return;
    }
    try {
      const data = await apiClient.speak(t, voiceId);
      if (data.audio_url) {
        const audio = new Audio(`${apiClient.getApiBaseUrl()}${data.audio_url}`);
        audio.playbackRate = voiceSpeed;
        await audio.play();
      } else {
        const utterance = new SpeechSynthesisUtterance(t);
        utterance.rate = voiceSpeed;
        utterance.pitch = voicePitch;
        window.speechSynthesis.speak(utterance);
      }
      addToast('Speaking...', 'success');
    } catch {
      const utterance = new SpeechSynthesisUtterance(t);
      utterance.rate = voiceSpeed;
      utterance.pitch = voicePitch;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSpeakAndSave = async () => {
    let textToSpeak = sentence || "Hello, how can I help you today?";
    
    if (useOllama && sentence) {
      addToast('Refining sentence using Ollama local AI...', 'info');
      try {
        const response = await apiClient.translate(sentence, useOllama);
        if (response.translated) {
          textToSpeak = response.translated;
        }
      } catch (err) {
        console.warn('Ollama refinement fallback', err);
      }
    }

    const newResult: SignSpeakHistoryEntry = {
      id: crypto.randomUUID(),
      sentence: textToSpeak,
      signs: gestureHistory.map(g => g.class),
      confidence: gestureHistory.length > 0 ? (gestureHistory.reduce((sum, g) => sum + g.confidence, 0) / gestureHistory.length) : 0.9,
      timestamp: new Date().toISOString(),
      audioUrl: '',
      pinned: false
    };

    try {
      const speakResponse = await apiClient.speak(textToSpeak, voiceId);
      if (speakResponse.audioUrl || speakResponse.audio_url) {
        newResult.audioUrl = speakResponse.audioUrl || speakResponse.audio_url || '';
      }
    } catch (err) {
      console.warn('Speak generation fail', err);
    }

    addHistoryEntry(newResult);
    setCurrentResult(newResult);

    if (vibrationEnabled && 'vibrate' in navigator) navigator.vibrate([30, 30]);

    if (newResult.audioUrl) {
      const audio = new Audio(`${apiClient.getApiBaseUrl()}${newResult.audioUrl}`);
      audio.playbackRate = voiceSpeed;
      audio.play().catch(() => {});
    } else {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = voiceSpeed;
      utterance.pitch = voicePitch;
      window.speechSynthesis.speak(utterance);
    }

    addToast('Speak and Archive session saved.', 'success');
    navigate('/live/result');
  };

  const handleToggleVoiceListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addToast('Web Speech API is not supported in this browser.', 'error');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = 'en-US';

    rec.onstart = () => {
      setIsListening(true);
      setRecognizedText('Listening to speaker...');
      setMatchedSigns([]);
      if (vibrationEnabled && 'vibrate' in navigator) navigator.vibrate(30);
    };

    rec.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setRecognizedText(text);

      const cleanWords = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/);
      const vocabKeys = Object.keys(SIGN_TUTORIALS);
      const matches = vocabKeys.filter(key => cleanWords.includes(key));
      setMatchedSigns(matches);

      if (matches.length > 0) {
        addToast(`Parsed gestures: ${matches.join(', ')}`, 'success');
      } else {
        addToast('No vocabulary gestures detected in the speech.', 'info');
      }
    };

    rec.onerror = (err: any) => {
      console.error(err);
      setIsListening(false);
      addToast('Microphone error or speech not detected.', 'error');
    };

    rec.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = rec;
    rec.start();
  };

  const handleTypeTextSubmit = () => {
    if (!typedText.trim()) return;
    setRecognizedText(typedText);

    const cleanWords = typedText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/);
    const vocabKeys = Object.keys(SIGN_TUTORIALS);
    const matches = vocabKeys.filter(key => cleanWords.includes(key));
    setMatchedSigns(matches);

    setTypedText('');
    if (matches.length > 0) {
      addToast(`Parsed gestures: ${matches.join(', ')}`, 'success');
    } else {
      addToast('No vocabulary gestures detected in the typed text.', 'info');
    }
  };

  return (
    <div className="flex-grow flex flex-col bg-background select-none font-sans">
      {/* Segment Mode Selector */}
      <div className="flex border-b border-outline-variant glass-header p-2 gap-1 justify-between shrink-0">
        {[
          { id: 'sign2speech', label: 'Sign to Voice', icon: 'interpreter_mode' },
          { id: 'speech2sign', label: 'Voice to Sign', icon: 'sign_language' },
          { id: 'practice', label: 'Practice Arena', icon: 'sports_esports' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => {
              if (vibrationEnabled && 'vibrate' in navigator) navigator.vibrate(10);
              setTranslateMode(m.id as any);
            }}
            className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 font-bold text-[10px] tracking-wider uppercase active:scale-95 transition-all cursor-pointer ${
              translateMode === m.id
                ? 'bg-primary text-white shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-variant/50'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{m.icon}</span>
            {m.label}
          </button>
        ))}
      </div>

      {translateMode === 'sign2speech' ? (
        // Mode A: Sign-to-Speech (Deaf to Speaking)
        <>
          <section 
            className="relative w-full h-[45vh] min-h-[380px] bg-surface-container-lowest overflow-hidden cursor-pointer shadow-inner"
            onClick={handleToggleCamera}
            title={cameraOn ? "Click to turn camera off" : "Click to turn camera on"}
          >
            {cameraOn ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover opacity-85"
                />
                {/* Floating Camera Swap FAB */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSwapCamera();
                  }}
                  className="absolute top-4 right-4 z-40 w-11 h-11 rounded-full bg-surface/85 backdrop-blur-md border border-outline-variant flex items-center justify-center text-primary active:scale-90 hover:text-secondary shadow-lg transition-all"
                  title="Switch Camera Source"
                >
                  <span className="material-symbols-outlined text-[20px]">flip_camera_ios</span>
                </button>
              </>
            ) : (
              <div 
                className="absolute inset-0 w-full h-full opacity-80 bg-cover bg-center transition-all duration-300"
                style={{ 
                  backgroundImage: "url('/male_signing.jpg')" 
                }}
              />
            )}

            {/* Viewfinder Overlays */}
            <div className="absolute top-6 left-6 viewfinder-corner border-t-2 border-l-2 border-primary/30"></div>
            <div className="absolute top-6 right-6 viewfinder-corner border-t-2 border-r-2 border-primary/30"></div>
            <div className="absolute bottom-6 left-6 viewfinder-corner border-b-2 border-l-2 border-primary/30"></div>
            <div className="absolute bottom-6 right-6 viewfinder-corner border-b-2 border-r-2 border-primary/30"></div>

            {/* Simulated Hand Tracking Overlays */}
            {cameraOn && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="skeleton-dot animate-ping bg-primary" style={{ top: '48%', left: '45%' }}></div>
                <div className="skeleton-dot bg-secondary" style={{ top: '42%', left: '52%', animationDelay: '0.2s' }}></div>
                <div className="skeleton-dot bg-primary" style={{ top: '55%', left: '40%', animationDelay: '0.4s' }}></div>
                <div className="skeleton-dot bg-tertiary" style={{ top: '38%', left: '48%', animationDelay: '0.6s' }}></div>
              </div>
            )}

            {cameraOn && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-surface/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-outline-variant shadow-md">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-on-surface">Gesture Stream Active</span>
              </div>
            )}

            {!cameraOn && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[2px]">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-white animate-pulse mb-3">
                  <span className="material-symbols-outlined text-3xl">videocam</span>
                </div>
                <p className="font-syne font-bold text-sm text-white tracking-widest uppercase">Tap to start camera feed</p>
              </div>
            )}
          </section>

          {/* Controls & Translation Card */}
          <section className="flex-grow flex flex-col p-6 gap-6 bg-background">
            <div className="flex-grow glass-card rounded-2xl p-6 relative flex flex-col justify-center min-h-[160px] shadow-sm text-left">
              <span className="absolute top-4 left-4 text-xs font-mono uppercase text-on-surface-variant tracking-wider">Accumulated Translation</span>
              <p className="text-2xl font-syne font-bold text-on-surface leading-tight transition-opacity duration-300 pt-3">
                {sentence || "Begin signing to construct sentences..."}
              </p>
              <div className="absolute bottom-4 right-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleSpeak(); }}
                  disabled={!sentence}
                  aria-label="Listen to translation" 
                  className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full hover:opacity-90 active:scale-90 transition-all cursor-pointer shadow-md disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-xl">volume_up</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={handleSpeakAndSave}
                disabled={!sentence}
                className="w-full h-14 bg-primary text-white font-syne font-bold rounded-xl flex items-center justify-center gap-2.5 active:scale-98 transition-transform shadow-md shadow-primary/10 cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-lg">campaign</span>
                SPEAK & ARCHIVE
              </button>
            </div>
          </section>
        </>
      ) : translateMode === 'speech2sign' ? (
        // Mode B: Speech-to-Sign (Speaking to Deaf)
        <>
          <section className="relative w-full h-[40vh] min-h-[340px] bg-background flex flex-col items-center justify-center p-6 border-b border-outline-variant/60 shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {isListening ? (
                <motion.div 
                  key="listening"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center gap-6"
                >
                  {/* Glowing Pulse waveforms */}
                  <div className="flex items-center gap-1.5 h-16">
                    {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                      <motion.div
                        key={bar}
                        className="w-1.5 bg-primary rounded-full"
                        animate={{ height: [12, 56, 12] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: bar * 0.08,
                        }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs text-primary uppercase tracking-widest animate-pulse">
                    Listening to spoken audio...
                  </span>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center text-center w-full max-w-sm px-6 space-y-5"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <button 
                      onClick={handleToggleVoiceListening}
                      className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary text-primary flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-4xl">mic</span>
                    </button>
                    <div>
                      <h3 className="font-syne font-bold text-on-surface text-sm">Tap Microphone to Speak</h3>
                      <p className="text-[11px] text-on-surface-variant mt-1">Speak words like "school", "home", "sorry", "friend", "good".</p>
                    </div>
                  </div>
                  
                  {/* Or Type Message Option */}
                  <div className="w-full border-t border-outline-variant/60 pt-4 flex flex-col space-y-2">
                    <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider text-center">Or write message</span>
                    <div className="flex gap-2 w-full">
                      <input 
                        type="text"
                        placeholder="Type sign words here..."
                        value={typedText}
                        onChange={(e) => setTypedText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleTypeTextSubmit();
                        }}
                        className="flex-grow h-10 px-3.5 rounded-xl border border-outline-variant bg-surface text-on-surface text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner"
                      />
                      <button 
                        onClick={handleTypeTextSubmit}
                        className="h-10 px-4 bg-primary hover:opacity-95 text-white text-xs font-bold rounded-xl active:scale-95 transition-all cursor-pointer shadow-sm"
                      >
                        Show Signs
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Transcribed Text & Demonstrative Gesture Cards */}
          <section className="flex-grow flex flex-col p-6 gap-6 bg-background overflow-hidden">
            {/* Transcribed Text Output */}
            <div className="glass-card rounded-2xl p-5 relative flex flex-col justify-center min-h-[100px] shadow-sm text-left">
              <span className="text-xs font-mono uppercase text-on-surface-variant tracking-wider mb-1">Speaker Transcription</span>
              <p className="text-xl font-syne font-bold text-on-surface leading-snug">
                {recognizedText || 'Waiting for spoken voice input...'}
              </p>
            </div>

            {/* Sign Demonstration Board */}
            <div className="flex-1 flex flex-col overflow-hidden text-left">
              <span className="text-xs font-mono uppercase text-on-surface-variant tracking-wider mb-3">Demonstrative Sign Gestures</span>
              
              <div className="flex-grow overflow-x-auto pb-2 flex gap-4 items-start snap-x scrollbar-thin">
                {matchedSigns.map((signKey) => {
                  const tutorial = SIGN_TUTORIALS[signKey];
                  if (!tutorial) return null;
                  
                  return (
                    <motion.div
                      key={signKey}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="w-[280px] shrink-0 glass-card rounded-2xl p-5 shadow-sm snap-center flex flex-col space-y-4"
                    >
                      <div className="flex items-center gap-3 border-b border-outline-variant pb-3">
                        <span className="text-3xl">{tutorial.illustration}</span>
                        <div>
                          <h4 className="font-syne font-bold text-lg text-primary capitalize">{tutorial.title}</h4>
                          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Vocabulary Sign</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2.5 flex-1">
                        {tutorial.steps.map((step, idx) => (
                          <div key={idx} className="flex gap-2 text-xs text-on-surface">
                            <span className="font-mono text-primary font-bold">{idx + 1}.</span>
                            <p className="leading-normal">{step}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}

                {matchedSigns.length === 0 && (
                  <div className="w-full h-full border border-dashed border-outline-variant rounded-2xl flex flex-col items-center justify-center p-8 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl mb-2 text-outline">gesture</span>
                    <p className="text-sm font-syne font-semibold">No active sign cards</p>
                    <p className="text-xs max-w-xs mt-1">Speak into the microphone above to map voice into signing cards.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        // Mode C: Interactive Sign Practice Arena
        <>
          <section 
            className="relative w-full h-[40vh] min-h-[340px] bg-surface-container-lowest overflow-hidden cursor-pointer shadow-inner"
            onClick={handleToggleCamera}
            title={cameraOn ? "Click to turn camera off" : "Click to turn camera on"}
          >
            {cameraOn ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover opacity-85"
                />
                {/* Floating Camera Swap FAB */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSwapCamera();
                  }}
                  className="absolute top-4 right-4 z-40 w-11 h-11 rounded-full bg-surface/85 backdrop-blur-md border border-outline-variant flex items-center justify-center text-primary active:scale-90 hover:text-secondary shadow-lg transition-all"
                  title="Switch Camera Source"
                >
                  <span className="material-symbols-outlined text-[20px]">flip_camera_ios</span>
                </button>
              </>
            ) : (
              <div 
                className="absolute inset-0 w-full h-full opacity-80 bg-cover bg-center transition-all duration-300"
                style={{ 
                  backgroundImage: "url('/male_signing.jpg')" 
                }}
              />
            )}

            {/* Viewfinder Overlays */}
            <div className="absolute top-6 left-6 viewfinder-corner border-t-2 border-l-2 border-primary/30"></div>
            <div className="absolute top-6 right-6 viewfinder-corner border-t-2 border-r-2 border-primary/30"></div>
            <div className="absolute bottom-6 left-6 viewfinder-corner border-b-2 border-l-2 border-primary/30"></div>
            <div className="absolute bottom-6 right-6 viewfinder-corner border-b-2 border-r-2 border-primary/30"></div>

            {/* Simulated Hand Tracking Overlays */}
            {cameraOn && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="skeleton-dot animate-ping bg-primary" style={{ top: '48%', left: '45%' }}></div>
                <div className="skeleton-dot bg-secondary" style={{ top: '42%', left: '52%', animationDelay: '0.2s' }}></div>
                <div className="skeleton-dot bg-primary" style={{ top: '55%', left: '40%', animationDelay: '0.4s' }}></div>
                <div className="skeleton-dot bg-tertiary" style={{ top: '38%', left: '48%', animationDelay: '0.6s' }}></div>
              </div>
            )}

            {cameraOn && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-surface/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-outline-variant shadow-md">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-on-surface">Arena Recognition Active</span>
              </div>
            )}

            {!cameraOn && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[2px]">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-white animate-pulse mb-3">
                  <span className="material-symbols-outlined text-3xl">videocam</span>
                </div>
                <p className="font-syne font-bold text-sm text-white tracking-widest uppercase">Tap to start camera feed</p>
              </div>
            )}
          </section>

          {/* Arena Control Board */}
          <section className="flex-grow flex flex-col p-6 gap-5 bg-background overflow-y-auto">
            {/* Score and Streak metrics */}
            <div className="grid grid-cols-2 gap-4 shrink-0">
              <div className="glass-card rounded-xl p-4 text-left">
                <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-wider">Current Streak</p>
                <p className="text-xl font-bold font-syne text-primary mt-1">🔥 {streak} Signs</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-left">
                <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-wider">All-Time High</p>
                <p className="text-xl font-bold font-syne text-secondary mt-1">🏆 {highScore} Signs</p>
              </div>
            </div>

            {/* Target sign prompt card */}
            <div className="glass-card rounded-2xl p-6 relative flex flex-col justify-center min-h-[140px] shadow-sm text-left shrink-0">
              <span className="absolute top-4 left-4 text-xs font-mono uppercase text-on-surface-variant tracking-wider">Target Sign Challenge</span>
              
              {arenaCompleted ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-4 space-y-2 w-full"
                >
                  <span className="text-3xl">🎉</span>
                  <h3 className="text-lg font-syne font-bold text-primary">MATCH DETECTED!</h3>
                  <p className="text-xs text-on-surface-variant">Correct gesture shown. Preparing next sign...</p>
                </motion.div>
              ) : (
                <div className="pt-3 space-y-1">
                  <p className="text-[11px] text-on-surface-variant">Perform the gesture for:</p>
                  <p className="text-2xl font-syne font-black text-on-surface tracking-wider uppercase">
                    {SIGN_TUTORIALS[targetWord]?.title || targetWord}
                  </p>
                </div>
              )}

              {!arenaCompleted && (
                <div className="absolute bottom-4 right-4">
                  <button 
                    onClick={() => {
                      if (vibrationEnabled && 'vibrate' in navigator) navigator.vibrate(15);
                      setShowHint(!showHint);
                    }}
                    aria-label="Toggle Hint" 
                    className={`w-10 h-10 flex items-center justify-center rounded-full hover:opacity-90 active:scale-90 transition-all cursor-pointer shadow-md ${
                      showHint ? 'bg-primary text-white' : 'bg-surface border border-outline-variant text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">help_outline</span>
                  </button>
                </div>
              )}
            </div>

            {/* Interactive Hint drawer */}
            <AnimatePresence>
              {showHint && !arenaCompleted && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden glass-card rounded-2xl p-4 text-left space-y-3 shrink-0"
                >
                  <div className="flex items-center gap-2 border-b border-outline-variant pb-2">
                    <span className="text-2xl">{SIGN_TUTORIALS[targetWord]?.illustration}</span>
                    <div>
                      <h4 className="font-syne font-bold text-sm text-primary">Tutorial Hints</h4>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {SIGN_TUTORIALS[targetWord]?.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-2 text-xs text-on-surface leading-normal">
                        <span className="font-mono text-primary font-bold">{idx + 1}.</span>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action controls */}
            <div className="flex gap-3 shrink-0">
              <button 
                onClick={handleSkipArenaWord}
                className="flex-1 h-12 border border-outline-variant text-on-surface hover:bg-surface-variant font-syne font-bold rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">skip_next</span>
                SKIP CHALLENGE
              </button>
            </div>
          </section>
        </>
      )}

      {/* Hidden Canvas for optimized video processing */}
      <canvas 
        ref={canvasRef} 
        className="hidden" 
        width={bandwidthMode === 'high' ? 640 : bandwidthMode === 'standard' ? 480 : 320} 
        height={bandwidthMode === 'high' ? 480 : bandwidthMode === 'standard' ? 360 : 240} 
      />
    </div>
  );
}
