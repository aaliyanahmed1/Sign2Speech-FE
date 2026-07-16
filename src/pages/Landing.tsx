import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
export default function Landing() {
  const [mockSentence, setMockSentence] = useState('Awaiting sign input...');

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
      
      <main className="pt-24 pb-36 min-h-screen relative z-10">
        {/* Hero Section */}
        <section className="relative px-margin-mobile pt-16 md:pt-24 max-w-5xl mx-auto text-center overflow-hidden z-10">
          
          {/* Neural Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-xl"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(184,200,223,0.8)]"></span>
            <span className="text-[11px] font-bold tracking-[0.2em] text-on-surface-variant uppercase">Neural Interpretation Engine v1.0</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display-lg text-4xl md:text-6xl lg:text-7xl mb-8 max-w-4xl mx-auto text-on-surface tracking-tight font-extrabold leading-tight"
          >
            Instant Sign Language <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">Speech Synthesis</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-16 opacity-75 leading-relaxed text-sm md:text-base"
          >
            A privacy-first local engine converting webcam sign gestures into grammatically polished speech instantly.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 max-w-md mx-auto sm:max-w-none"
          >
            <Link
              to="/live"
              className="w-full sm:w-auto bg-primary text-on-primary-fixed font-bold px-12 py-4.5 rounded-full shadow-[0_20px_50px_rgba(184,200,223,0.15)] flex items-center justify-center gap-3 transition-all hover:brightness-110 active:scale-[0.97] no-underline cursor-pointer"
            >
              Open Application
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto apple-glass-dark text-on-surface border border-white/10 hover:border-white/20 font-bold px-12 py-4.5 rounded-full transition-all hover:bg-white/10 active:scale-[0.97] no-underline cursor-pointer flex items-center justify-center"
            >
              Read Architecture
            </Link>
          </motion.div>

          {/* Main Interface Preview Simulator */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="relative max-w-4xl mx-auto mb-32 px-4 md:px-0"
          >
            <div className="rounded-[2.5rem] p-3 apple-glass transition-transform duration-700 hover:scale-[1.01]">
              <div className="relative rounded-[2rem] overflow-hidden aspect-video bg-surface-container-lowest border border-white/5 flex items-center justify-center bg-black">
                <img 
                  alt="User signing mockup" 
                  className="w-full h-full object-cover opacity-60" 
                  src="/male_signing.jpg"
                />
                
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
              </div>
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
                desc: 'Over 62% of Deaf individuals encounter severe communication gaps in medical settings, resulting in treatment delays or misunderstandings.' 
              },
              { 
                stat: '66%', 
                label: 'Employment Impact', 
                desc: '66% of DHH professionals report that structural communication barriers heavily impact career decisions and professional growth opportunities.' 
              },
              { 
                stat: '24%', 
                label: 'Emergency Concerns', 
                desc: 'Nearly 24% of DHH respondents express concern that they would be unable to communicate effectively in sudden emergency situations.' 
              }
            ].map((item, idx) => (
              <div key={idx} className="apple-glass p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between group hover:border-primary/20 transition-all duration-300">
                <div className="font-syne text-5xl font-extrabold text-primary mb-6 group-hover:scale-105 transition-transform duration-300">
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
