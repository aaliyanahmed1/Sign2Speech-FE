import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from './store';
import { useToast } from './components/Toast';
import Landing from './pages/Landing';
import UploadAnalyze from './pages/UploadAnalyze';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import SignSpeakTranslate from './pages/SignSpeakTranslate';
import SignSpeakResult from './pages/SignSpeakResult';
import SignSpeakHistory from './pages/SignSpeakHistory';
import SignSpeakSettings from './pages/SignSpeakSettings';
import Developer from './pages/Developer';

const NAV_LINKS = [
  { to: '/live', label: 'Live Demo' },
  { to: '/upload', label: 'Upload' },
  { to: '/about', label: 'About' },
] as const;


function NavBar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSignSpeak = location.pathname.startsWith('/signspeak') || location.pathname.startsWith('/live');
  const { addToast } = useToast();
  const { isAuthenticated, user, logoutUser } = useAppStore();

  const isActive = (path: string) => location.pathname === path;

  const navClass = isSignSpeak ? "hidden md:block" : "block";
  const visibleLinks = isAuthenticated ? NAV_LINKS : [];

  return (
    <nav className={`border-b border-outline-variant bg-background/80 backdrop-blur-md sticky top-0 z-50 ${navClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl tracking-wider uppercase font-syne no-underline">
            <img src="/logo.jpg" alt="Sign2Speech Logo" className="w-8 h-8 rounded-lg object-cover border border-outline-variant" />
            <span>Sign2Speech</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {visibleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-primary bg-primary-container'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-variant'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center gap-3 border-l border-outline-variant pl-4 ml-2">
                <span className="text-xs text-on-surface-variant font-mono">
                  {user?.name || 'User'}
                </span>
                <button
                  onClick={() => {
                    logoutUser();
                    addToast('Logged out successfully', 'info');
                  }}
                  className="px-3 py-1.5 border border-red-500/30 hover:border-red-500 bg-transparent text-red-600 text-xs font-semibold rounded-lg active:scale-95 transition-all cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 ml-4 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/10"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-on-surface-variant hover:text-on-surface transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-outline-variant bg-background/95 backdrop-blur-md"
          >
            <div className="px-4 py-3 space-y-1">
              {visibleLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? 'text-primary bg-primary-container'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-variant'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-outline-variant pt-3 mt-3">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant font-mono">
                      {user?.name || 'User'}
                    </span>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        logoutUser();
                        addToast('Logged out successfully', 'info');
                      }}
                      className="px-3 py-1.5 border border-red-500/30 hover:border-red-500 bg-transparent text-red-600 text-xs font-semibold rounded-lg active:scale-95 transition-all cursor-pointer"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full py-2.5 text-center bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/10"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function SignSpeakHeader() {
  const location = useLocation();
  const prefix = location.pathname.startsWith('/live') ? '/live' : '/signspeak';
  
  const isTranslate = location.pathname === prefix || location.pathname === `${prefix}/result`;
  const isHistory = location.pathname === `${prefix}/history`;

  return (
    <header className="absolute top-0 lg:top-[40px] left-0 w-full z-50 glass-header flex justify-between items-center px-margin-mobile h-touch-target-min">
      <Link to="/" className="flex items-center gap-2 active:scale-95 transition-transform cursor-pointer hover:opacity-85 no-underline">
        <span className="material-symbols-outlined text-primary text-headline-md">accessibility_new</span>
        <h1 className="font-headline-md text-headline-md text-primary m-0">Sign2Speech</h1>
      </Link>
      <div className="flex items-center">
        {isTranslate ? (
          <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-2.5 h-2.5 rounded-full bg-secondary pulse-secondary"></div>
            <span className="font-label-caps text-label-caps text-primary tracking-widest">ONLINE</span>
          </div>
        ) : isHistory ? (
          <span className="text-label-caps font-label-caps text-primary bg-primary-container/20 border border-primary/30 px-3 py-1 rounded-full">
            ONLINE
          </span>
        ) : (
          <span className="text-label-caps font-label-caps bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full uppercase">
            Online
          </span>
        )}
      </div>
    </header>
  );
}

function SignSpeakBottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const prefix = currentPath.startsWith('/live') ? '/live' : '/signspeak';
  const isTranslateActive = currentPath === prefix || currentPath === `${prefix}/result`;
  const isHistoryActive = currentPath === `${prefix}/history`;
  const isSettingsActive = currentPath === `${prefix}/settings`;

  return (
    <nav className="absolute bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2 glass-header rounded-t-xl shadow-md">
      <Link
        to={prefix}
        className={`flex flex-col items-center justify-center px-4 py-2 transition-all duration-200 active:scale-90 ${
          isTranslateActive
            ? 'bg-secondary-container text-on-secondary-container rounded-full'
            : 'text-on-surface-variant hover:bg-white/5 rounded-xl'
        }`}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: isTranslateActive ? "'FILL' 1" : "'FILL' 0" }}>translate</span>
        <span className="font-label-caps text-[10px] tracking-wider uppercase mt-1">Translate</span>
      </Link>

      <Link
        to={`${prefix}/history`}
        className={`flex flex-col items-center justify-center px-4 py-2 transition-all duration-200 active:scale-90 ${
          isHistoryActive
            ? 'bg-secondary-container text-on-secondary-container rounded-full'
            : 'text-on-surface-variant hover:bg-white/5 rounded-xl'
        }`}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: isHistoryActive ? "'FILL' 1" : "'FILL' 0" }}>history</span>
        <span className="font-label-caps text-[10px] tracking-wider uppercase mt-1">History</span>
      </Link>

      <Link
        to={`${prefix}/settings`}
        className={`flex flex-col items-center justify-center px-4 py-2 transition-all duration-200 active:scale-90 ${
          isSettingsActive
            ? 'bg-secondary-container text-on-secondary-container rounded-full'
            : 'text-on-surface-variant hover:bg-white/5 rounded-xl'
        }`}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: isSettingsActive ? "'FILL' 1" : "'FILL' 0" }}>settings</span>
        <span className="font-label-caps text-[10px] tracking-wider uppercase mt-1">Settings</span>
      </Link>

      <Link
        to="/"
        className="flex flex-col items-center justify-center px-4 py-2 transition-all duration-200 active:scale-90 text-on-surface-variant hover:bg-white/5 rounded-xl"
      >
        <span className="material-symbols-outlined">logout</span>
        <span className="font-label-caps text-[10px] tracking-wider uppercase mt-1">Exit</span>
      </Link>
    </nav>
  );
}

function SignSpeakLayout() {
  const { currentGesture, sentence, isStreaming, useOllama } = useAppStore();
  const [fps, setFps] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setFps((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const next = prev + delta;
        return Math.max(28, Math.min(32, next));
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-on-background relative overflow-hidden flex items-center justify-center py-0 lg:py-6 px-0 lg:px-4 font-sans select-none">
      {/* Premium Ambient Glowing Background */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none animate-pulse duration-[8000ms] hidden lg:block" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-tertiary/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[6000ms] hidden lg:block" />
      
      {/* Blueprint Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none hidden lg:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, #4f46e5 1px, transparent 1px),
            linear-gradient(to bottom, #4f46e5 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 h-full lg:h-[860px]">
        
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 self-stretch justify-center h-full overflow-hidden">
          <div className="glass-card rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="flex items-center justify-between border-b border-outline-variant pb-3">
              <span className="font-label-caps text-xs text-primary tracking-widest uppercase">RECOGNITION ENGINE</span>
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-variant rounded-xl p-3 border border-outline-variant">
                <p className="text-[10px] text-on-surface-variant font-mono">THROUGHPUT</p>
                <p className="text-xl font-bold font-syne text-primary mt-1">{isStreaming ? `${fps} FPS` : '0 FPS'}</p>
              </div>
              <div className="bg-surface-variant rounded-xl p-3 border border-outline-variant">
                <p className="text-[10px] text-on-surface-variant font-mono">LATENCY</p>
                <p className="text-xl font-bold font-syne text-secondary mt-1">{isStreaming ? '32.4 ms' : '--'}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Model Precision</span>
                <span className="font-mono text-on-surface">FP16 (Half)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Confidence Thresh</span>
                <span className="font-mono text-on-surface">0.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Classes Monitored</span>
                <span className="font-mono text-on-surface">22 gestures</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 flex-grow flex flex-col gap-4 overflow-hidden relative min-h-[300px]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent" />
            <h3 className="font-label-caps text-xs text-secondary tracking-widest uppercase border-b border-outline-variant pb-3">LIVE GESTURE FEED</h3>
            
            <div className="flex-grow overflow-y-auto space-y-2.5 pr-1 text-sm font-mono scrollbar-none">
              {currentGesture ? (
                <div className="bg-surface-variant rounded-lg p-2.5 border border-outline-variant flex items-center justify-between animate-fade-in">
                  <div>
                    <span className="text-primary font-bold">▶ {currentGesture.class}</span>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">{new Date(currentGesture.timestamp).toLocaleTimeString()}</p>
                  </div>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded border border-primary/20 font-bold">
                    {(currentGesture.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-on-surface-variant/75 py-12 text-center text-xs">
                  <span className="material-symbols-outlined text-3xl mb-2 text-outline/40">sensors</span>
                  <p>Awaiting gesture input...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MIDDLE PANEL: Smartphone Device Frame Mockup */}
        <div className="col-span-1 lg:col-span-6 flex justify-center items-center h-full w-full">
          
          {/* Physical Phone frame bezel */}
          <div className="relative w-full h-[100dvh] lg:h-[840px] lg:max-w-[410px] bg-background lg:bg-[#000000] lg:rounded-[52px] lg:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3),0_0_80px_rgba(79,70,229,0.05)] lg:p-[12px] lg:border-4 lg:border-[#1E2022] overflow-hidden flex flex-col select-none group">
            
            {/* Phone glare effect */}
            <div className="hidden lg:block absolute top-0 right-0 w-[150%] h-[150%] bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none z-40 rounded-[40px] transform rotate-12 -translate-y-[40%] translate-x-[20%]" />
            
            {/* Speaker & Sensor Notch (Dynamic Island) */}
            <div className="hidden lg:flex absolute top-[22px] left-1/2 -translate-x-1/2 w-[110px] h-[28px] bg-black rounded-full z-50 items-center justify-between px-3 border border-white/5 shadow-inner">
              <div className="w-[10px] h-[10px] rounded-full bg-[#111115] border border-white/5 flex items-center justify-center">
                <div className="w-[3px] h-[3px] rounded-full bg-[#0d3466]" />
              </div>
              <div className="w-[50px] h-[4px] rounded-full bg-white/10" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#0d0d0f]" />
            </div>

            {/* Screen inner wrapper */}
            <div className="w-full h-full lg:rounded-[40px] overflow-hidden bg-background relative flex flex-col border-0 lg:border border-outline-variant">
              
              {/* Screen Top Status Bar */}
              <div className="hidden lg:flex absolute top-0 left-0 w-full h-[40px] z-50 justify-between items-center px-6 pt-1 text-[11px] font-mono text-on-surface-variant select-none pointer-events-none">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[12px]">signal_cellular_alt</span>
                  <span className="material-symbols-outlined text-[12px]">wifi</span>
                  <span className="material-symbols-outlined text-[14px]">battery_5_bar</span>
                </div>
              </div>

              {/* Header inside wrapper */}
              <SignSpeakHeader />

              {/* Main Application Routes Content */}
              <div className="flex-1 flex flex-col pt-12 lg:pt-[88px] pb-20 overflow-y-auto">
                <Routes>
                  <Route index element={<SignSpeakTranslate />} />
                  <Route path="history" element={<SignSpeakHistory />} />
                  <Route path="settings" element={<SignSpeakSettings />} />
                  <Route path="result" element={<SignSpeakResult />} />
                </Routes>
              </div>

              <SignSpeakBottomNav />
            </div>
            
            {/* Physical Buttons (Volume/Power) for realism */}
            <div className="hidden lg:block absolute left-[-4px] top-[140px] w-[4px] h-[45px] bg-[#1a1a1c] border-l border-white/10 rounded-l" />
            <div className="hidden lg:block absolute left-[-4px] top-[195px] w-[4px] h-[45px] bg-[#1a1a1c] border-l border-white/10 rounded-l" />
            <div className="hidden lg:block absolute right-[-4px] top-[160px] w-[4px] h-[65px] bg-[#1a1a1c] border-r border-white/10 rounded-r" />
          </div>

        </div>

        {/* RIGHT PANEL: NLP translation engine diagnostics */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 self-stretch justify-center h-full overflow-hidden">
          <div className="glass-card rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="flex items-center justify-between border-b border-outline-variant pb-3">
              <span className="font-label-caps text-xs text-primary tracking-widest uppercase">NLP ENGINE STATUS</span>
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Active Model</span>
                <span className="font-mono text-on-surface">Local AI Model</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Refinement Mode</span>
                <span className="font-mono text-[#4f46e5]">{useOllama ? 'LLM ACTIVE' : 'PASSTHROUGH'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">TTS Engine</span>
                <span className="font-mono text-on-surface">Speech Synthesis</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 flex-grow flex flex-col gap-4 overflow-hidden relative min-h-[300px]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-tertiary to-transparent" />
            <h3 className="font-label-caps text-xs text-tertiary tracking-widest uppercase border-b border-outline-variant pb-3">TRANSLATION STREAM</h3>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-sm font-mono scrollbar-none flex flex-col">
              {sentence ? (
                <div className="bg-surface-variant rounded-xl p-4 border border-outline-variant flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-on-surface-variant text-xs uppercase font-bold tracking-wide">Accumulated signs:</span>
                    <p className="text-tertiary text-sm mt-1.5 leading-relaxed font-bold">"{sentence}"</p>
                  </div>
                  <div className="border-t border-outline-variant pt-3 mt-4 text-[10px] text-on-surface-variant/75">
                    Press "SPEAK NOW" inside the device screen to query NLP model and speak.
                  </div>
                </div>
              ) : (
                <div className="h-full flex-grow flex flex-col items-center justify-center text-on-surface-variant/75 py-12 text-center text-xs">
                  <span className="material-symbols-outlined text-3xl mb-2 text-outline/40">translate</span>
                  <p>Accumulating sentence signs...</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/live/*"
        element={
          <ProtectedRoute>
            <SignSpeakLayout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadAnalyze />
          </ProtectedRoute>
        }
      />

      <Route
        path="/developer"
        element={
          <ProtectedRoute>
            <Developer />
          </ProtectedRoute>
        }
      />
      <Route path="/about" element={<About />} />
      <Route
        path="/signspeak/*"
        element={
          <ProtectedRoute>
            <SignSpeakLayout />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-on-background font-sans selection:bg-primary selection:text-on-primary">
        <NavBar />
        <main className="min-h-[calc(100vh-64px)]">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}
