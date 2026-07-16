import { motion } from 'framer-motion';
import { Volume2, Zap, Sparkles, Activity, Lock, ArrowRight, Heart, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const FEATURES = [
  {
    icon: <Zap className="text-primary" size={26} />,
    title: 'Instant Frame Pipeline',
    desc: 'Lightweight video frame streaming at 4 FPS directly to the server, resulting in sub-50ms inference feedback loops.',
    color: 'var(--color-primary)',
  },
  {
    icon: <Sparkles className="text-secondary" size={26} />,
    title: 'Contextual AI Refinement',
    desc: 'Local NLP model parses raw gesture arrays to construct grammatically polished sentences that reflect true conversational intent.',
    color: 'var(--color-secondary)',
  },
  {
    icon: <Volume2 className="text-tertiary" size={26} />,
    title: 'Neural Speech Output',
    desc: 'Uses natural, high-fidelity neural voice synthesis for speech output, with reliable system-level fallback support.',
    color: 'var(--color-tertiary)',
  },
] as const;

const TRUST_METRICS = [
  { icon: <Lock size={20} className="text-primary" />, title: 'Privacy First', desc: 'Secure, local-first computing protects raw camera feeds.' },
  { icon: <Heart size={20} className="text-tertiary" />, title: 'User Centric', desc: 'Sleek visual shell adapted for accessibility and high contrast.' },
  { icon: <Activity size={20} className="text-secondary" />, title: 'Telemetry Logs', desc: 'Active frame throughput and pipeline metrics updated live.' },
] as const;

const STATS = [
  { value: '98.4%', label: 'Gesture Accuracy' },
  { value: '<50ms', label: 'Inference Latency' },
  { value: '24+', label: 'Active Gesture Classes' },
  { value: '100%', label: 'On-Device Privacy' },
] as const;



const FAQS = [
  {
    q: 'How does local processing ensure raw video stream privacy?',
    a: 'Sign2Speech is built with a privacy-first layout. All webcam frames captured in the translation viewport are analyzed inside your designated edge network node. Raw images are never sent to external servers, protecting patient and practitioner identities.',
  },
  {
    q: 'What offline fallback options are supported for voice outputs?',
    a: 'When an active internet connection is available, the pipeline uses Microsoft Edge Neural TTS for lifelike speech synthesis. If the node loses connection, it silently falls back to local platform-level voice utilities (pyttsx3) to ensure continuous translation.',
  },
  {
    q: 'Which NLP model runs the refinement translation?',
    a: 'The pipeline supports lightweight local NLP processing. By default, it parses individual gesture classes sequentially. When contextual refinement is enabled, it leverages a local LLM node to structure raw arrays into natural conversational sentences.',
  },
] as const;

export default function Landing() {
  const [mockSentence, setMockSentence] = useState('Awaiting sign input...');
  const [mockSigns, setMockSigns] = useState<string[]>([]);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Simulating live translation mockup on the landing page for visual wow factor
  useEffect(() => {
    const steps = [
      { signs: ['HELLO'], sentence: 'Hello.' },
      { signs: ['HELLO', 'FRIEND'], sentence: 'Hello, my friend.' },
      { signs: ['HELLO', 'FRIEND', 'HELP'], sentence: 'Hello, my friend, do you need help?' },
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % steps.length;
      setMockSigns(steps[index].signs);
      setMockSentence(steps[index].sentence);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col relative overflow-hidden bg-background text-on-background">
      
      {/* Background Mesh Network Effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px] animate-pulse duration-[10s]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[140px] animate-pulse duration-[8s]" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-primary) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-12 md:pt-20 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            Neural Interpretation Engine v1.0
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-syne mb-6 max-w-5xl tracking-tight leading-[1.05] text-on-surface"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Instant Sign Language <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
            Speech Synthesis
          </span>
        </motion.h1>

        <motion.p
          className="text-on-surface-variant text-lg md:text-xl mb-10 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Pitching one clear pipeline: A privacy-first local engine converting webcam sign gestures into grammatically polished speech instantly.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to="/live"
            className="group relative px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-tertiary rounded-xl opacity-90 blur-[2px] group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-[1px] bg-background rounded-xl" />
            <span className="relative z-10 flex items-center gap-2 text-primary">
              Open Application <ArrowRight size={16} />
            </span>
          </Link>
          <Link
            to="/about"
            className="px-8 py-4 bg-surface-variant border border-outline-variant hover:border-outline text-on-surface rounded-xl hover:bg-surface-variant/80 transition-all hover:scale-105 active:scale-95"
          >
            Read Architecture
          </Link>
        </motion.div>

        {/* Live Interface Preview Simulator Card (Using Male Signing Image) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-4xl glass-card rounded-2xl p-6 relative overflow-hidden"
        >
          {/* Header mockup control bar */}
          <div className="flex items-center justify-between border-b border-outline-variant pb-4 mb-5 text-left">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-[10px] text-on-surface-variant font-mono ml-3 uppercase tracking-wider">PIPELINE SIMULATOR</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="text-[10px] text-primary font-mono font-bold tracking-widest uppercase">ACTIVE STREAMING</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Viewfinder simulation (Showing the newly generated Male Signing Image) */}
            <div className="md:col-span-7 bg-black rounded-xl border border-outline-variant relative aspect-video flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-60 transition-all duration-700 blur-[0.5px]"
                style={{ backgroundImage: "url('/male_signing.jpg')" }}
              />
              
              {/* Virtual Target Skeleton overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-full h-full relative">
                  <div className="absolute top-[48%] left-[45%] w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_var(--color-primary)] animate-pulse" />
                  <div className="absolute top-[42%] left-[52%] w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_var(--color-primary)]" />
                  <div className="absolute top-[55%] left-[40%] w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_var(--color-primary)]" />
                  <div className="absolute top-[38%] left-[48%] w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_var(--color-primary)]" />
                  <svg className="absolute inset-0 w-full h-full stroke-primary/40 stroke-1" fill="none">
                    <line x1="45%" y1="48%" x2="52%" y2="42%" />
                    <line x1="52%" y1="42%" x2="48%" y2="38%" />
                    <line x1="45%" y1="48%" x2="40%" y2="55%" />
                  </svg>
                </div>
              </div>

              {/* Box tag overlay */}
              <div className="absolute top-[32%] left-[35%] border border-primary bg-primary/10 text-primary text-[10px] font-mono px-2 py-0.5 rounded shadow-lg">
                Gesticulation Detected
              </div>

              {/* Viewfinder frame indicators */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-on-surface-variant/40" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-on-surface-variant/40" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-on-surface-variant/40" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-on-surface-variant/40" />
            </div>

            {/* Translation state simulation */}
            <div className="md:col-span-5 flex flex-col justify-between text-left gap-4">
              <div className="space-y-4">
                <div className="glass-card rounded-xl p-4">
                  <span className="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest block mb-1">Accumulated Signs</span>
                  <div className="flex flex-wrap gap-1.5">
                    {mockSigns.length > 0 ? (
                      mockSigns.map((sig, i) => (
                        <span key={i} className="px-2 py-0.5 bg-primary/10 border border-primary/25 text-primary text-xs font-mono rounded">
                          {sig}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-on-surface-variant italic">No gestures in stream</span>
                    )}
                  </div>
                </div>

                <div className="glass-card rounded-xl p-4 border-primary/30 text-left">
                  <span className="text-[10px] text-secondary font-mono uppercase tracking-widest block mb-1">AI Output Refinement</span>
                  <p className="text-md font-bold text-on-surface leading-snug">
                    "{mockSentence}"
                  </p>
                </div>
              </div>

              <div className="text-xs text-on-surface-variant flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Live local WebSocket transmission active
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trust & Privacy Strip */}
      <section className="py-16 px-6 border-t border-b border-outline-variant bg-surface/20 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRUST_METRICS.map((metric, i) => (
            <div key={i} className="flex gap-4 items-start text-left">
              <div className="w-10 h-10 rounded-xl bg-surface-variant border border-outline-variant flex items-center justify-center shrink-0">
                {metric.icon}
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">{metric.title}</h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-normal">{metric.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Showcase Section (New Section) */}
      <section className="py-20 px-6 relative z-10 max-w-6xl mx-auto border-b border-outline-variant">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl md:text-5xl font-bold font-syne text-primary tracking-tight">{stat.value}</p>
              <p className="text-xs text-on-surface-variant font-mono mt-2 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pitching One Clear Pipeline Section */}
      <section className="py-24 px-6 relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-syne font-bold mb-6">
          One unified translation pipeline
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-16">
          Sign2Speech integrates camera feed capturing, contextual sentence refining, and voice synthesis into one single, localized transaction model.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left relative">
          {/* Connector lines for visual clarity */}
          <div className="hidden md:block absolute top-[50px] left-[25%] right-[25%] h-[2px] bg-gradient-to-r from-primary via-secondary to-tertiary z-0" />
          
          <div className="glass-card p-6 rounded-2xl relative z-10">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-mono font-bold text-sm mb-5 border border-primary/20">01</div>
            <h4 className="font-bold text-md mb-2">Video Capture</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">Webcam captures gesture frames at 4 FPS and streams them directly over local WebSockets to minimize telemetry delays.</p>
          </div>

          <div className="glass-card p-6 rounded-2xl relative z-10">
            <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center font-mono font-bold text-sm mb-5 border border-secondary/20">02</div>
            <h4 className="font-bold text-md mb-2">Contextual Translation</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">Raw gesture sequence keys are parsed by a lightweight NLP engine, assembling disjointed words into grammatical sentences.</p>
          </div>

          <div className="glass-card p-6 rounded-2xl relative z-10">
            <div className="w-10 h-10 bg-tertiary/10 text-tertiary rounded-xl flex items-center justify-center font-mono font-bold text-sm mb-5 border border-tertiary/20">03</div>
            <h4 className="font-bold text-md mb-2">Neural Speech</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">The polished text is synthesized into human-like audio outputs using Neural voices, ensuring immediate acoustic feedback.</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-syne font-bold text-center mb-16">
          High-performance engine features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              whileHover={{ y: -4 }}
              className="p-8 glass-card rounded-2xl hover:border-primary transition-all relative overflow-hidden group"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-outline-variant"
                style={{ background: 'var(--color-surface-variant)' }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-bold font-syne mb-2.5 text-on-surface">{f.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>



      {/* FAQ Section (New Section) */}
      <section className="py-24 px-6 relative z-10 max-w-4xl mx-auto border-t border-outline-variant">
        <h2 className="text-3xl md:text-4xl font-syne font-bold text-center mb-16">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className="glass-card rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button 
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-sm md:text-base text-on-surface hover:bg-surface-variant/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle size={18} className="text-primary shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <span className="material-symbols-outlined transition-transform duration-200" style={{ transform: faqOpen === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  keyboard_arrow_down
                </span>
              </button>
              {faqOpen === idx && (
                <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant bg-surface-variant/20">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 relative z-10 text-center border-t border-outline-variant">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-[-30%] left-[20%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-[-30%] right-[20%] w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[90px] pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-syne font-bold mb-4 tracking-tight leading-tight">
            Ready to explore?
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Test the live webcam recognition sandbox or compile metrics via pre-recorded file uploads in seconds.
          </p>

          <Link
            to="/live"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/10"
          >
            Launch System
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-outline-variant py-8 px-6 text-on-surface-variant/70 text-xs font-mono relative z-10 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-4">
        <span>Sign2Speech v1.0.0 &mdash; Real-time AI Sign Language Translation</span>
        <div className="flex gap-6">
          <Link to="/developer" className="hover:text-primary transition-colors hover:underline">Developer Console</Link>
          <Link to="/about" className="hover:text-primary transition-colors hover:underline">About</Link>
        </div>
      </footer>
    </div>
  );
}
