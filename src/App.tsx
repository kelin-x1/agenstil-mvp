import { Link, Route, Routes } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const videoUrl = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';

type NavItem = 'Home' | 'New Project' | 'Projects' | 'Brand Analysis' | 'Latest Collection' | 'Product Image Redesign' | 'LEGO Review Video' | 'Premium Product Ad' | 'Agents' | 'Asset Library' | 'Settings';

type DemoProject = {
  id: string;
  name: string;
  brand: string;
  url: string;
  status: 'Pending Review' | 'Ready for Production' | 'In Progress';
};

const navItems: NavItem[] = [
  'Home',
  'New Project',
  'Projects',
  'Brand Analysis',
  'Latest Collection',
  'Product Image Redesign',
  'LEGO Review Video',
  'Premium Product Ad',
  'Agents',
  'Asset Library',
  'Settings',
];

const project: DemoProject = {
  id: 'A-1042',
  name: 'Luma Atelier',
  brand: 'Luma Atelier',
  url: 'lumaatelier.com',
  status: 'Ready for Production',
};

const agents = [
  { name: 'Creative Director', role: 'Coordinates all production', status: 'Active' },
  { name: 'Brand & Website Analyzer', role: 'Analyzes the public website', status: 'Ready' },
  { name: 'Product Intelligence Agent', role: 'Tracks product references', status: 'Ready' },
  { name: 'Image Creative Agent', role: 'Handles image styles and redesigns', status: 'Ready' },
  { name: 'Video Creative Agent', role: 'Handles video scripts and ads', status: 'Ready' },
  { name: 'Quality & Brand Review Agent', role: 'Checks brand and output compliance', status: 'Ready' },
];

const deliverables = [
  {
    name: 'LEGO Character Review',
    style: 'Seated tan-skin LEGO personality',
    status: 'Pending',
    action: 'Edit with Agent',
  },
  {
    name: 'Latest Collection',
    style: 'Bold × Studio / Nature / Advertising',
    status: 'Ready',
    action: 'Edit with Agent',
  },
  {
    name: 'Product Image Redesign',
    style: 'Bold / Nature / LEGO Ad',
    status: 'Queued',
    action: 'Edit with Agent',
  },
  {
    name: 'Premium Product Ad',
    style: '20–35s integrated story',
    status: 'Draft',
    action: 'Edit with Agent',
  },
];

const libraryAssets = [
  { title: 'Luma Stool — Original reference', type: 'Original product image', status: 'Verified' },
  { title: 'Collection Image — Bold Studio', type: 'Latest collection image', status: 'Completed' },
  { title: 'LEGO Review Video', type: 'Video asset', status: 'Queued' },
  { title: 'Premium Product Ad', type: 'Short-form ad', status: 'Completed' },
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleScrub = (event: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const percent = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    video.currentTime = percent * video.duration || 0;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.preload = 'metadata';
    video.playsInline = true;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage videoReady={videoReady} setVideoReady={setVideoReady} videoRef={videoRef} onScrub={handleScrub} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />} />
      <Route path="/studio" element={<StudioView mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />} />
      <Route path="/agents" element={<AgentsView />} />
      <Route path="/library" element={<LibraryView />} />
    </Routes>
  );
}

function LandingPage({ videoReady, setVideoReady, videoRef, onScrub, mobileOpen, setMobileOpen }: {
  videoReady: boolean;
  setVideoReady: (value: boolean) => void;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  onScrub: (event: React.MouseEvent<HTMLDivElement>) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="hero-video"
          src={videoUrl}
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoReady(true)}
        />
        <div className="hero-overlay" />
      </div>

      <header className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10 lg:px-16">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[15px] font-medium tracking-[0.18em] uppercase text-white">
            <span className="font-display text-lg">Agenstil</span>
            <span className="text-white/80">✦</span>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.16em] text-white/70 md:flex">
          <a href="#">Studio</a>
          <a href="#">Creatives</a>
          <a href="#">Workflow</a>
          <a href="#">Agents</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="pill hidden px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] md:inline-flex">Open Studio</button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/5 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile navigation"
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 h-px w-full bg-white transition ${mobileOpen ? 'top-2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-2 h-px w-full bg-white transition ${mobileOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 h-px w-full bg-white transition ${mobileOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
            </span>
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="relative z-30 mx-6 mb-4 rounded-full border border-white/20 bg-black/70 px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-white/70 md:hidden">
          <div className="flex flex-col gap-3">
            <a href="#">Studio</a>
            <a href="#">Creatives</a>
            <a href="#">Workflow</a>
            <a href="#">Agents</a>
          </div>
        </div>
      )}

      <section className="relative z-10 flex min-h-[calc(100vh-120px)] items-center px-6 md:px-10 lg:px-16">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-[780px]">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.26em] text-white/70 backdrop-blur-md">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
              Meet Agenstil
            </div>

            <h1 className="font-display text-[42px] leading-[0.93] tracking-[-0.06em] text-white md:text-[64px] lg:text-[82px]">
              Your Brand's AI Creative Studio
            </h1>

            <div className="mt-6 flex min-h-[48px] items-center text-[18px] text-white/80 md:text-[26px]">
              <span className="typewriter font-light tracking-[-0.03em] text-white/90 text-balance">
                One brand. Four creative experiences. A more distinctive way to showcase your products.
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/studio" className="pill pill--solid inline-flex items-center justify-center px-6 py-3 text-[11px] uppercase tracking-[0.18em]">
                Start with a Brand
              </Link>
              <Link to="/studio" className="pill inline-flex items-center justify-center px-6 py-3 text-[11px] uppercase tracking-[0.18em]">
                Open Studio
              </Link>
              <Link to="/studio" className="pill inline-flex items-center justify-center px-6 py-3 text-[11px] uppercase tracking-[0.18em]">
                Explore the Creatives
              </Link>
              <Link to="/agents" className="pill inline-flex items-center justify-center px-6 py-3 text-[11px] uppercase tracking-[0.18em]">
                How It Works
              </Link>
            </div>
          </div>

          <div className="hidden justify-end lg:flex">
            <div className="w-full max-w-[420px] rounded-[24px] border border-white/15 bg-black/20 p-4 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/55">
                <span>Creative pipeline</span>
                <span>{videoReady ? 'Live preview' : 'Loading'}</span>
              </div>

              <div className="mb-4 h-28 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-2">
                <div className="flex h-full items-end gap-2">
                  {[38, 52, 44, 66, 58, 74, 68, 82, 60, 90].map((h, idx) => (
                    <div key={idx} className="flex-1 rounded-t-lg bg-white/80" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-sm text-white/75">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span>Brand scan</span>
                  <span>Verified</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span>Latest collection</span>
                  <span>Selected</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span>Creative brief</span>
                  <span>Ready</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Agent review</span>
                  <span>Queued</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20 px-6 pb-8 md:px-10 lg:px-16">
        <div className="hero-border max-w-[1300px] rounded-full border bg-black/20 px-4 py-3 backdrop-blur-sm">
          <div onMouseMove={onScrub} onClick={onScrub} className="relative h-1.5 w-full cursor-ew-resize rounded-full bg-white/10">
            <div className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-white/80" />
          </div>
        </div>
      </div>
    </main>
  );
}

function StudioView({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (value: boolean) => void; }) {
  const [activeNav, setActiveNav] = useState<NavItem>('Home');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className={`${mobileOpen ? 'block' : 'hidden'} border-r border-white/10 bg-[#090909] lg:block`}>
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="font-display text-[20px]">Agenstil</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">MVP</div>
            </div>
            <button className="text-sm text-white/60 lg:hidden" onClick={() => setMobileOpen(false)}>Close</button>
          </div>

          <nav className="space-y-2 px-3 py-4">
            {navItems.map((item) => (
              <button
                key={item}
                className={`nav-item flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[12px] uppercase tracking-[0.14em] text-white/75 ${activeNav === item ? 'active' : ''}`}
                onClick={() => {
                  setActiveNav(item);
                  setMobileOpen(false);
                }}
              >
                <span>{item}</span>
                {item === 'Agents' && <span className="text-[10px] text-white/50">6</span>}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="toolbar px-4 py-4 md:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-3 xl:hidden">
                <button className="pill inline-flex w-10 justify-center px-2 py-2 text-sm" onClick={() => setMobileOpen(!mobileOpen)}>☰</button>
                <span className="font-display text-lg">Agenstil</span>
              </div>

              <div className="flex flex-1 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2.5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">URL</span>
                <input
                  className="w-full border-none bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                  placeholder="Paste your brand website URL..."
                />
              </div>

              <button className="pill pill--solid inline-flex items-center justify-center px-5 py-3 text-[10px] uppercase tracking-[0.18em]">
                Analyze Brand
              </button>
            </div>
          </header>

          <main className="flex-1 space-y-6 p-4 md:p-6">
            <div className="panel-surface rounded-[24px] p-4 md:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-white/50">Active project</div>
                  <h2 className="mt-2 font-display text-[30px] tracking-[-0.04em] text-white">{project.name}</h2>
                </div>
                <div className="rounded-full border border-emerald-300/40 bg-emerald-500/10 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-emerald-200">
                  {project.status}
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <MetaCard label="Brand" value={project.brand} />
                <MetaCard label="Website" value={project.url} />
                <MetaCard label="Project ID" value={project.id} />
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              {deliverables.map((item) => (
                <div key={item.name} className="panel-surface rounded-[24px] p-4 md:p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">Deliverable</div>
                      <h3 className="mt-2 font-display text-[24px] tracking-[-0.04em]">{item.name}</h3>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-white/70">{item.status}</span>
                  </div>

                  <p className="text-sm text-white/70">{item.style}</p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button className="pill inline-flex items-center justify-center px-4 py-2 text-[10px] uppercase tracking-[0.18em]">Preview</button>
                    <button className="pill inline-flex items-center justify-center px-4 py-2 text-[10px] uppercase tracking-[0.18em]">Regenerate</button>
                    <button className="pill pill--solid inline-flex items-center justify-center px-4 py-2 text-[10px] uppercase tracking-[0.18em]">{item.action}</button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">{label}</div>
      <div className="mt-2 text-sm text-white/85">{value}</div>
    </div>
  );
}

function AgentsView() {
  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.26em] text-white/50">Agenstil workspace</div>
            <h1 className="mt-2 font-display text-[42px] tracking-[-0.05em]">Agent Directory</h1>
          </div>
          <Link to="/studio" className="pill inline-flex items-center justify-center px-5 py-3 text-[10px] uppercase tracking-[0.18em]">Return to Studio</Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent) => (
            <div key={agent.name} className="panel-surface rounded-[24px] p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="font-display text-[24px] tracking-[-0.04em]">{agent.name}</div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-white/75">{agent.status}</span>
              </div>
              <p className="text-sm text-white/70">{agent.role}</p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white/65">
                Active project: {project.brand}
              </div>
              <div className="mt-5 flex gap-3">
                <button className="pill inline-flex items-center justify-center px-4 py-2 text-[10px] uppercase tracking-[0.18em]">Open Workspace</button>
                <button className="pill inline-flex items-center justify-center px-4 py-2 text-[10px] uppercase tracking-[0.18em]">Tasks</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LibraryView() {
  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.26em] text-white/50">Asset library</div>
            <h1 className="mt-2 font-display text-[42px] tracking-[-0.05em]">Project Assets</h1>
          </div>
          <Link to="/studio" className="pill inline-flex items-center justify-center px-5 py-3 text-[10px] uppercase tracking-[0.18em]">Back to Studio</Link>
        </div>

        <div className="panel-surface rounded-[24px] p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {libraryAssets.map((asset) => (
              <div key={asset.title} className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                <div className="mb-4 h-32 rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">{asset.type}</div>
                <div className="mt-2 font-display text-[20px] tracking-[-0.04em]">{asset.title}</div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-emerald-200">{asset.status}</span>
                  <button className="pill inline-flex items-center justify-center px-3 py-2 text-[9px] uppercase tracking-[0.18em]">Open</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
