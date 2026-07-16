import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
export default function Landing() {
  const [mockSentence, setMockSentence] = useState('Awaiting sign input...');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [simulatedSign, setSimulatedSign] = useState<string>('HELLO');
  const [simulatedSentence, setSimulatedSentence] = useState('Hello.');

  // Simulate live translation preview on the landing page for visual engagement
  useEffect(() => {
    const steps = [
      { signs: ['HELLO'], sentence: 'Hello.' },
      { signs: ['HELLO', 'FRIEND'], sentence: 'Hello, my friend.' },
      { signs: ['HELLO', 'FRIEND', 'HELP'], sentence: 'Hello, my friend, do you need help?' },
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % steps.length;
      setMockSentence(steps[index].sentence);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[url('/male_signing.jpg')] bg-fixed bg-cover bg-center text-on-surface antialiased overflow-x-hidden selection:bg-primary/30 font-sans relative">
      {/* Dark frosted overlay to make text pop while keeping the background image beautifully visible */}
      <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-[5px] pointer-events-none z-0" />
      
      <main className="pt-16 pb-20 min-h-screen relative z-10">
        {/* Hero Section */}
        <section className="relative px-margin-mobile pt-4 md:pt-6 max-w-5xl mx-auto text-center overflow-hidden z-10">
          
          {/* Neural Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-5 backdrop-blur-xl"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(184,200,223,0.8)]"></span>
            <span className="text-[11px] font-bold tracking-[0.2em] text-on-surface-variant uppercase">Neural Interpretation Engine v1.0</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display-lg text-4xl md:text-6xl lg:text-7xl mb-4 max-w-4xl mx-auto text-on-surface tracking-tight font-extrabold leading-tight"
          >
            Speak Your Signs.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">Hear Your Voice Instantly.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-6 opacity-75 leading-relaxed text-sm md:text-base"
          >
            Bridging the gap between sign language and spoken conversation. Translate webcam gestures into polished, natural speech in under 18ms—100% locally and privately in your browser with zero setup.
          </motion.p>

          {/* Active Status Callout Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.22 }}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 mb-8 max-w-md mx-auto shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase font-mono">Web Engine Status: Active & Ready</span>
          </motion.div>

          {/* Quick Specs / Telemetry Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-6 max-w-3xl mx-auto"
          >
            {[
              { label: 'Latency', val: '< 18ms', icon: 'speed', color: 'text-emerald-400' },
              { label: 'Inference', val: 'Local Neural', icon: 'neurology', color: 'text-cyan-400' },
              { label: 'Vocabulary', val: '23 Actions', icon: 'gesture', color: 'text-amber-400' },
              { label: 'Data Privacy', val: '100% Local', icon: 'lock', color: 'text-blue-400' },
              { label: 'Audio Synthesis', val: 'Neural TTS', icon: 'keyboard_voice', color: 'text-purple-400' }
            ].map((s) => (
              <div key={s.label} className="apple-glass px-4 py-2 rounded-full flex items-center gap-2 border border-white/5 shadow-sm text-[10px] font-semibold font-mono text-on-surface-variant">
                <span className={`material-symbols-outlined text-sm ${s.color}`}>{s.icon}</span>
                <span className="uppercase tracking-wider">{s.label}:</span>
                <span className="text-on-surface font-sans font-bold">{s.val}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none mb-4">
              <Link
                to="/live"
                className="w-full sm:w-auto bg-gradient-to-r from-primary via-secondary to-primary text-on-primary-fixed font-bold px-12 py-4.5 rounded-full shadow-[0_0_30px_rgba(184,200,223,0.25)] flex items-center justify-center gap-3 transition-all hover:scale-[1.03] active:scale-[0.97] no-underline cursor-pointer border-0"
              >
                Start Translating Free
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto apple-glass-dark text-on-surface border border-white/10 hover:border-white/20 font-bold px-12 py-4.5 rounded-full transition-all hover:bg-white/10 active:scale-[0.97] no-underline cursor-pointer flex items-center justify-center"
              >
                Read Architecture
              </Link>
            </div>
            
            {/* Conversion Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono text-on-surface-variant opacity-80 mt-3">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-emerald-400 font-bold">check_circle</span> 
                No Sign-Up Required
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-emerald-400 font-bold">check_circle</span> 
                100% On-Device Privacy
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-emerald-400 font-bold">check_circle</span> 
                Zero Cloud Latency
              </span>
            </div>
          </motion.div>

          {/* Quick Metrics Counters Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-10 border border-white/5 py-6 text-center bg-black/40 rounded-3xl px-6 backdrop-blur-sm shadow-inner"
          >
            {[
              { value: '23+', label: 'Active Gesture Signs', desc: 'Real-time vocab classes supported' },
              { value: '18ms', label: 'Local Neural Latency', desc: 'Instant frame-by-frame inference' },
              { value: '100%', label: 'On-Device Execution', desc: 'Zero cloud dependencies, edge secure' },
              { value: 'Dual', label: 'Translation Modes', desc: 'Two-way audio & visual interpreter' }
            ].map((c) => (
              <div key={c.label} className="space-y-1.5 text-center">
                <p className="font-syne text-3xl font-extrabold text-primary">{c.value}</p>
                <p className="text-[11px] font-bold text-on-surface tracking-wider uppercase">{c.label}</p>
                <p className="text-[9px] text-on-surface-variant opacity-75 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Main Interface Preview Simulator */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="relative max-w-4xl mx-auto mb-32 px-4 md:px-0"
          >
            <div className="rounded-[2.5rem] p-3 apple-glass transition-transform duration-700 hover:scale-[1.01]">
              <Link 
                to="/live" 
                className="relative rounded-[2rem] overflow-hidden aspect-video bg-surface-container-lowest border border-white/5 flex items-center justify-center bg-black group/preview block w-full h-full cursor-pointer"
              >
                <img 
                  alt="User signing mockup" 
                  className="w-full h-full object-cover opacity-50 transition-opacity duration-300 group-hover/preview:opacity-40" 
                  src="/male_signing.jpg"
                />
                
                {/* Large Pulsing Central Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/80 to-secondary/80 text-on-primary-fixed flex items-center justify-center shadow-[0_0_40px_rgba(184,200,223,0.3)] group-hover/preview:scale-110 group-hover/preview:shadow-[0_0_55px_rgba(184,200,223,0.4)] transition-all duration-300">
                    <span className="material-symbols-outlined text-4xl font-extrabold ml-1">play_arrow</span>
                  </div>
                  <div className="apple-glass px-6 py-2.5 rounded-full border border-white/10 text-on-surface font-syne font-bold text-xs uppercase tracking-widest group-hover/preview:border-primary/30 transition-all">
                    Launch Live Stream Interpreter
                  </div>
                </div>
                
                {/* Simulated Hand Tracking Overlays */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-[48%] left-[45%] w-2 h-2 bg-primary rounded-full shadow-[0_0_12px_rgba(184,200,223,0.8)] animate-pulse" />
                  <div className="absolute top-[42%] left-[52%] w-2.5 h-2.5 bg-secondary rounded-full shadow-[0_0_12px_rgba(200,198,200,0.8)]" />
                  <div className="absolute top-[55%] left-[40%] w-2 h-2 bg-primary rounded-full shadow-[0_0_12px_rgba(184,200,223,0.8)]" />
                  <div className="absolute top-[38%] left-[48%] w-2 h-2 bg-tertiary rounded-full shadow-[0_0_12px_rgba(173,198,255,0.8)]" />
                  <svg className="absolute inset-0 w-full h-full stroke-primary/30 stroke-[1.5]" fill="none">
                    <line x1="45%" y1="48%" x2="52%" y2="42%" />
                    <line x1="52%" y1="42%" x2="48%" y2="38%" />
                    <line x1="45%" y1="48%" x2="40%" y2="55%" />
                  </svg>
                </div>

                {/* Box tag overlay */}
                <div className="absolute top-[32%] left-[32%] border border-primary bg-primary/10 backdrop-blur-md text-primary text-[10px] font-mono px-2.5 py-0.5 rounded shadow-lg uppercase tracking-wider">
                  Tracking Active
                </div>

                {/* Overlay HUD Elements */}
                <div className="absolute top-6 left-6">
                  <div className="flex gap-2 px-5 py-2.5 apple-glass-dark rounded-full border border-white/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                    <span className="ml-2 text-white/80 text-[10px] uppercase tracking-[0.15em] font-bold font-mono">Pipeline Simulator</span>
                  </div>
                </div>
                
                <div className="absolute bottom-6 right-6">
                  <div className="flex items-center gap-3 px-6 py-3 apple-glass-dark rounded-2xl text-primary border border-primary/20">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_12px_rgba(184,200,223,0.8)]"></span>
                    <span className="font-bold text-[10px] uppercase tracking-widest font-mono">Active Streaming</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Floating Semantic Cards */}
            <div className="hidden lg:block absolute -left-20 top-1/4 apple-glass p-6 rounded-2xl w-56 text-left animate-float">
              <div className="text-[10px] font-bold text-primary uppercase tracking-[0.15em] mb-3">Hand Tracking</div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-primary w-[92%] shadow-[0_0_12px_rgba(184,200,223,0.6)]"></div>
              </div>
              <div className="text-[11px] text-on-surface-variant opacity-70">92% Inference Confidence</div>
            </div>

            <div className="hidden lg:block absolute -right-20 bottom-1/4 apple-glass p-6 rounded-2xl w-64 text-left animate-float" style={{ animationDelay: '-4s' }}>
              <div className="text-[10px] font-bold text-primary uppercase tracking-[0.15em] mb-3">Refinement Output</div>
              <p className="text-xs text-on-surface font-semibold leading-normal">
                "{mockSentence}"
              </p>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto mb-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Spatial Logic */}
            <div className="apple-glass-dark p-8 rounded-[2rem] group hover:scale-[1.02] transition-all duration-500 text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                <span className="material-symbols-outlined text-primary text-3xl">gesture</span>
              </div>
              <h3 className="font-syne font-bold text-lg text-on-surface mb-3">Spatial Logic</h3>
              <p className="text-xs text-on-surface-variant opacity-70 leading-relaxed">Advanced hand-skeletal mapping that recognizes nuances in gesture depth and speed.</p>
            </div>

            {/* Edge Privacy */}
            <div className="relative overflow-hidden p-8 rounded-[2rem] bg-primary text-on-primary-fixed group hover:scale-[1.02] transition-all duration-500 shadow-[0_30px_60px_rgba(184,200,223,0.1)] text-left">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-8 border border-white/30 relative z-10">
                <span className="material-symbols-outlined text-on-primary-fixed text-3xl">security</span>
              </div>
              <h3 className="font-syne font-bold text-lg mb-3 relative z-10">Edge Privacy</h3>
              <p className="text-xs opacity-90 leading-relaxed font-medium relative z-10">All neural processing happens on your local machine. No video stream ever leaves your browser.</p>
            </div>

            {/* Natural Syntax */}
            <div className="apple-glass-dark p-8 rounded-[2rem] group hover:scale-[1.02] transition-all duration-500 text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                <span className="material-symbols-outlined text-primary text-3xl">text_fields</span>
              </div>
              <h3 className="font-syne font-bold text-lg text-on-surface mb-3">Natural Syntax</h3>
              <p className="text-xs text-on-surface-variant opacity-70 leading-relaxed">Converts ASL/BSL syntax structures into grammatically perfect spoken sentences.</p>
            </div>

          </div>
        </section>

        {/* Real-World Impact Statistics Section */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto mb-20 relative z-10 border-t border-white/5 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 text-left">
            <div className="max-w-xl">
              <span className="text-primary font-mono text-xs uppercase tracking-widest block mb-2">The Accessibility Gap</span>
              <h2 className="text-3xl md:text-4xl font-syne font-bold leading-tight">Why Assistive AI Translation Matters</h2>
            </div>
            <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed max-w-md">
              Communication barriers for Deaf and Hard of Hearing (DHH) individuals restrict autonomy in critical daily settings. Sign2Speech bridges this divide locally and privately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { 
                stat: '62%', 
                label: 'Healthcare Barriers', 
                desc: 'Over 62% of Deaf individuals encounter severe communication gaps in medical settings, resulting in treatment delays or misunderstandings.',
                glow: 'border-red-500/10 hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]',
                color: 'text-red-400'
              },
              { 
                stat: '66%', 
                label: 'Employment Impact', 
                desc: '66% of DHH professionals report that structural communication barriers heavily impact career decisions and professional growth opportunities.',
                glow: 'border-amber-500/10 hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
                color: 'text-amber-400'
              },
              { 
                stat: '24%', 
                label: 'Emergency Concerns', 
                desc: 'Nearly 24% of DHH respondents express concern that they would be unable to communicate effectively in sudden emergency situations.',
                glow: 'border-purple-500/10 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
                color: 'text-purple-400'
              }
            ].map((item, idx) => (
              <div key={idx} className={`apple-glass p-8 rounded-[2rem] border flex flex-col justify-between group transition-all duration-300 ${item.glow}`}>
                <div className={`font-syne text-5xl font-extrabold mb-6 group-hover:scale-105 transition-transform duration-300 ${item.color}`}>
                  {item.stat}
                </div>
                <div>
                  <h4 className="font-syne font-bold text-sm text-on-surface mb-2">{item.label}</h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed opacity-85">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Supported Gesture Vocabulary Showcase */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto mb-20 relative z-10 border-t border-white/5 pt-20 text-left">
          <div className="max-w-xl mb-12">
            <span className="text-primary font-mono text-xs uppercase tracking-widest block mb-2">Lexicon Database</span>
            <h2 className="text-3xl md:text-4xl font-syne font-bold leading-tight">Supported Sign Vocabulary</h2>
            <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed mt-2">
              Sign2Speech supports 23 active gesture vocabulary classifications locally on-device.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                category: 'Basic Conversation', 
                color: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]',
                items: ['school', 'sorry', 'help', 'easy', 'work', 'age', 'effort', 'respect'] 
              },
              { 
                category: 'Locations & Directions', 
                color: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]',
                items: ['near', 'home', 'village', 'washroom'] 
              },
              { 
                category: 'Social Interactions', 
                color: 'from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)]',
                items: ['friend', 'teacher', 'message', 'good'] 
              },
              { 
                category: 'Actions & Verbs', 
                color: 'from-orange-500/20 to-orange-500/5 border-orange-500/20 text-orange-400 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)]',
                items: ['eating', 'drinking', 'pass', 'fail'] 
              },
              { 
                category: 'System Triggers', 
                color: 'from-purple-500/20 to-purple-500/5 border-purple-500/20 text-purple-400 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]',
                items: ['preset', 'dress'] 
              }
            ].map((group) => (
              <div key={group.category} className="apple-glass rounded-[2rem] p-6 space-y-4 border border-white/5 flex flex-col justify-between">
                <div>
                  <h3 className="font-syne font-bold text-xs uppercase tracking-wider text-on-surface border-b border-white/5 pb-3 flex items-center justify-between">
                    <span>{group.category}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-on-surface-variant font-normal">
                      {group.items.length} signs
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {group.items.map((g) => (
                      <span 
                        key={g} 
                        className={`px-3 py-1 bg-gradient-to-br ${group.color} border rounded-xl text-xs font-mono font-semibold transition-all hover:scale-105 active:scale-95 duration-200 cursor-pointer`}
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Unified pipeline description */}
        <section className="py-20 px-6 max-w-5xl mx-auto text-center relative z-10 border-t border-white/5">
          <h2 className="text-3xl font-syne font-bold mb-4">Unified Translation Pipeline</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto text-xs leading-relaxed mb-12 opacity-85">
            Sign2Speech aggregates camera feed capturing, contextual sentence refining, and voice synthesis into a single local loop.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              { num: '01', title: 'Video Stream', desc: 'Streams camera frames via optimized local WebSockets directly to the local model.' },
              { num: '02', title: 'Sentence Refinement', desc: 'Lightweight transformers structure raw sign sequences into natural grammatical intent.' },
              { num: '03', title: 'Acoustic Voice', desc: 'Synthesizes neural voice outputs instantly for responsive spoken feedback.' }
            ].map((p) => (
              <div key={p.num} className="apple-glass-dark p-6 rounded-2xl border border-white/5">
                <div className="w-10 h-10 bg-primary/15 text-primary rounded-xl flex items-center justify-center font-mono font-bold text-xs mb-4 border border-primary/20">{p.num}</div>
                <h4 className="font-bold text-sm mb-2">{p.title}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed opacity-75">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Interactive Inference Sandbox */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto mb-20 relative z-10 border-t border-white/5 pt-20 text-left">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div className="max-w-xl">
              <span className="text-primary font-mono text-xs uppercase tracking-widest block mb-2">Simulated Sandbox</span>
              <h2 className="text-3xl md:text-4xl font-syne font-bold leading-tight">Inference Simulator</h2>
              <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed mt-2">
                Click any vocabulary gesture below to simulate hand keypoint tracking and grammar translation in real-time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Control card: List of selectable signs */}
            <div className="lg:col-span-1 apple-glass rounded-[2rem] p-6 border border-white/5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest block border-b border-white/5 pb-2">Select Gesture</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'HELLO', text: 'HELLO', sentence: 'Hello.' },
                    { id: 'HELP', text: 'HELP', sentence: 'Do you need help?' },
                    { id: 'SCHOOL', text: 'SCHOOL', sentence: 'I am going to school.' },
                    { id: 'FRIEND', text: 'FRIEND', sentence: 'You are my friend.' },
                    { id: 'HOME', text: 'HOME', sentence: 'Let us go home.' },
                    { id: 'SORRY', text: 'SORRY', sentence: 'I am extremely sorry.' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSimulatedSign(s.id);
                        setSimulatedSentence(s.sentence);
                      }}
                      className={`py-3 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all border cursor-pointer active:scale-95 ${
                        simulatedSign === s.id
                          ? 'bg-primary border-primary text-on-primary-fixed shadow-md'
                          : 'bg-white/5 border-white/5 text-on-surface-variant hover:bg-white/10 hover:text-on-surface'
                      }`}
                    >
                      {s.text}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-[11px] text-on-surface-variant leading-relaxed font-mono">
                <span className="font-bold text-primary">Simulation Active:</span> Keypoint extraction matrices are drawn programmatically.
              </div>
            </div>

            {/* Viewport card: Simulated skeletal hands tracking visualizer */}
            <div className="lg:col-span-2 apple-glass-dark rounded-[2.5rem] p-8 border border-white/5 flex flex-col justify-between relative overflow-hidden bg-black">
              {/* Subtle grid lines background */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              <div className="flex justify-between items-start z-10 border-b border-white/5 pb-4">
                <div>
                  <span className="text-[9px] font-mono text-primary uppercase tracking-widest block">Camera Viewfinder (Simulated)</span>
                  <h4 className="font-syne font-bold text-lg text-on-surface uppercase mt-1">Telemetry Canvas</h4>
                </div>
                <div className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono font-semibold uppercase tracking-wider animate-pulse">
                  Engine Ready
                </div>
              </div>

              {/* Skeletal Hands Canvas Simulation */}
              <div className="h-48 flex items-center justify-center relative my-4">
                {/* Simulated Hand Skeletal structure mapping */}
                <div className="relative w-72 h-40 border border-white/5 rounded-2xl bg-white/5 flex items-center justify-center overflow-hidden">
                  <div className="absolute top-[45%] left-[40%] w-2 h-2 bg-primary rounded-full shadow-[0_0_12px_rgba(184,200,223,0.8)] animate-pulse" />
                  <div className="absolute top-[38%] left-[48%] w-2.5 h-2.5 bg-secondary rounded-full shadow-[0_0_12px_rgba(200,198,200,0.8)]" />
                  <div className="absolute top-[52%] left-[35%] w-2 h-2 bg-primary rounded-full shadow-[0_0_12px_rgba(184,200,223,0.8)]" />
                  <div className="absolute top-[32%] left-[42%] w-2 h-2 bg-tertiary rounded-full shadow-[0_0_12px_rgba(173,198,255,0.8)] animate-bounce" />
                  
                  {/* Dynamic sign indicator details */}
                  <div className="absolute bottom-2 left-2 text-[9px] font-mono text-on-surface-variant uppercase">Sign Detected: {simulatedSign}</div>
                  
                  <svg className="absolute inset-0 w-full h-full stroke-primary/30 stroke-[1.5]" fill="none">
                    <line x1="40%" y1="45%" x2="48%" y2="38%" />
                    <line x1="48%" y1="38%" x2="42%" y2="32%" />
                    <line x1="40%" y1="45%" x2="35%" y2="52%" />
                  </svg>
                </div>
              </div>

              {/* Grammar Translation HUD Output */}
              <div className="glass-card rounded-2xl p-5 border border-white/10 text-left z-10 space-y-1 bg-[#0a0c0c]/85">
                <span className="text-[9px] font-mono text-primary uppercase tracking-widest block">Grammar Refined output</span>
                <p className="text-base font-bold text-on-surface font-syne leading-relaxed">
                  "{simulatedSentence}"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive FAQ Section */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto mb-28 relative z-10 border-t border-white/5 pt-20 text-left">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-primary font-mono text-xs uppercase tracking-widest block mb-2">Frequently Asked</span>
            <h2 className="text-3xl font-syne font-bold leading-tight">Got Questions?</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Does Sign2Speech process my video on the cloud?",
                a: "No. Sign2Speech is designed as a local-first application. All video capturing and skeletal tracking processes run directly in your local browser environment. No video stream is ever uploaded or stored, ensuring total data privacy."
              },
              {
                q: "What sign languages are supported?",
                a: "The core model is trained on a 23-gesture subset of American Sign Language (ASL) and British Sign Language (BSL), including location directions, conversation greetings, action verbs, and system triggers."
              },
              {
                q: "How do I download and install the app on iOS?",
                a: "Simply open your deployment link in Safari on iOS, tap the Share icon, and select 'Add to Home Screen'. The app will install with its high-res icon and open in native fullscreen standalone mode."
              },
              {
                q: "Is a dedicated GPU required to run this engine?",
                a: "No. The neural networks and deep keypoint architectures are highly optimized and run efficiently on standard CPU architectures (including mobile phone processors), delivering smooth real-time performance."
              }
            ].map((faq, idx) => (
              <div key={idx} className="apple-glass rounded-[1.5rem] border border-white/5 overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center bg-transparent border-0 cursor-pointer active:bg-white/5 text-on-surface font-syne font-bold text-sm"
                >
                  <span>{faq.q}</span>
                  <span className={`material-symbols-outlined transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-primary' : 'text-on-surface-variant'}`}>
                    expand_more
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-xs text-on-surface-variant leading-relaxed animate-fade-in border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-on-surface-variant/70 text-[11px] font-mono relative z-10 flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto gap-4">
        <span>Sign2Speech v1.0.0 &mdash; Real-time AI Sign Language Translation</span>
        <div className="flex gap-6">
          <Link to="/developer" className="hover:text-primary transition-colors hover:underline no-underline">Developer Console</Link>
          <Link to="/about" className="hover:text-primary transition-colors hover:underline no-underline">About</Link>
        </div>
      </footer>
    </div>
  );
}
