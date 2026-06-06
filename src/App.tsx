import { useState, useEffect, useCallback, useRef } from 'react';
import { WhatsAppButton } from './components/WhatsAppButton';

interface Project {
  id: number;
  title: string;
  category: 'kitchen' | 'living' | 'bedroom' | 'luxury';
  categoryLabel: string;
  slogan: string;
  image: string;
  description: string;
  gridClass?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  focusAreas: string[];
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

interface WorkRoom {
  label: string;
  images: string[];
}

interface WorkProject {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  stats: { label: string; value: string }[];
  rooms: WorkRoom[];
}

const navLinks = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Works', id: 'works' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
];

const serviceItems = [
  {
    id: 1,
    title: 'Space Planning',
    description: 'Architectural spatial optimization that maximizes flow, scale, and function — establishing an intuitive relationship between every zone.',
    image: '/images/living-room-main.jpg',
    tag: 'Architecture',
  },
  {
    id: 2,
    title: 'Interior Design',
    description: 'Bespoke interiors crafted entirely around your narrative — from the very first concept sketch to the final curated detail.',
    image: '/images/bedroom-main.jpg',
    tag: 'Design',
  },
  {
    id: 3,
    title: 'Material Sourcing',
    description: 'Rare marbles, rich timbers, fine metals, and bespoke textiles — each element hand-selected for your unique project.',
    image: '/images/living-room-close.jpg',
    tag: 'Curation',
  },
  {
    id: 4,
    title: 'Furniture & Decor',
    description: 'Custom furniture design and artisan decor selection that defines a personal aesthetic you will cherish for decades.',
    image: '/images/living-room-main.jpg',
    tag: 'Furniture',
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Discovery',
    description: 'A deep-dive consultation to understand your lifestyle, aesthetic sensibilities, and the functional requirements of your dream space.',
  },
  {
    num: '02',
    title: 'Concept Design',
    description: 'Our designers craft bespoke mood boards, detailed 3D renders, and spatial layouts — tailored entirely to your brief.',
  },
  {
    num: '03',
    title: 'Execution',
    description: 'From material sourcing to on-site supervision, every element is managed with meticulous precision and care.',
  },
  {
    num: '04',
    title: 'Handover',
    description: 'We deliver your fully finished, styled space — exactly as envisioned — with a personal walkthrough and dedicated aftercare.',
  },
];

const stats = [
  { num: '200+', label: 'Projects Delivered' },
  { num: '5', label: 'Cities Across India' },
  { num: '10+', label: 'Years of Excellence' },
  { num: '500+', label: 'Happy Families' },
];

const projects: Project[] = [
  {
    id: 1,
    title: 'The Gilded Branch Lounge',
    category: 'living',
    categoryLabel: 'Living Area',
    slogan: 'Nature Merged in Timber',
    image: '/images/living-room-main.jpg',
    description: 'Hand-crafted brass tree sculpture on fluted walnut panels, balanced with curved bouclé chairs and marble flooring.',
    gridClass: 'md:col-span-8 md:row-span-2',
  },
  {
    id: 2,
    title: 'The Monolithic Sanctuary',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    slogan: 'Serenity in Texture',
    image: '/images/bedroom-main.jpg',
    description: 'Vertical oak slats, custom terracotta leather headboard, and hidden LED backlighting.',
    gridClass: 'md:col-span-4 md:row-span-2',
  },
  {
    id: 3,
    title: 'The Sculptured Hearth',
    category: 'living',
    categoryLabel: 'Living Area',
    slogan: 'Plaster & Stone Dialogue',
    image: '/images/living-room-close.jpg',
    description: 'Raw plaster wave art piece, low-slung linen sofa, and travertine coffee tables.',
    gridClass: 'md:col-span-4 md:row-span-1',
  },
  {
    id: 4,
    title: 'The Obsidian Cinema',
    category: 'luxury',
    categoryLabel: 'Luxury Spaces',
    slogan: 'Acoustic Perfection',
    image: '/images/living-room-main.jpg',
    description: 'Acoustic wood slot panels and plush deep velvet upholstery for an immersive experience.',
    gridClass: 'md:col-span-4 md:row-span-1',
  },
  {
    id: 5,
    title: 'The Amber Lounge',
    category: 'luxury',
    categoryLabel: 'Luxury Spaces',
    slogan: 'Atmospheric Bar & Wine Cellar',
    image: '/images/bedroom-main.jpg',
    description: 'Backlit quartzite stone, raw timber counters, and atmospheric mood lighting.',
    gridClass: 'md:col-span-4 md:row-span-2',
  },
  {
    id: 6,
    title: "Chef's Culinary Hearth",
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    slogan: 'The Heart of the Home',
    image: '/images/living-room-close.jpg',
    description: 'Monolithic marble island, seamless hidden appliances, and crafted oak cabinetry.',
    gridClass: 'md:col-span-8 md:row-span-1',
  },
];

const heroSlides = [
  { image: '/images/living-room-main.jpg', alt: 'Exotica flagship living room concept' },
  { image: '/images/bedroom-main.jpg', alt: 'Master bedroom with modern lighting' },
  { image: '/images/living-room-close.jpg', alt: 'Minimalist residential lounge' },
];

const filterTabs = [
  { id: 'all', label: 'All' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'living', label: 'Living' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'luxury', label: 'Luxury' },
];

const marqueeItems = [
  'Space Planning', 'Interior Design', 'Material Sourcing',
  'Furniture Curation', 'Lighting Design', 'Color Consultation',
];

const worksData: WorkProject[] = [
  {
    id: 1,
    title: 'The Grand Residence',
    subtitle: 'Full Home Design · Hyderabad',
    description: 'A comprehensive luxury residence spanning living zones, master suites, walk-in closets, and private corridors. Every room tells a connected story — unified by material language and spatial rhythm.',
    cover: '/works/1/living-1.jpg.jpeg',
    stats: [
      { label: 'Rooms', value: '8 Spaces' },
      { label: 'Photos', value: '25 Views' },
      { label: 'Style', value: 'Contemporary Luxury' },
    ],
    rooms: [
      {
        label: 'Living',
        images: [
          '/works/1/living-1.jpg.jpeg',
          '/works/1/family-living-1.jpg.jpeg',
          '/works/1/family-living-2.jpg.jpeg',
          '/works/1/family-living-3.jpg.jpeg',
          '/works/1/feature-wall-1.jpg.jpeg',
        ],
      },
      {
        label: 'Corridor',
        images: [
          '/works/1/corridor-1.jpg.jpeg',
          '/works/1/corridor-2.jpg.jpeg',
        ],
      },
      {
        label: 'Bedroom 2',
        images: [
          '/works/1/bedroom-2-1.jpg.jpeg',
          '/works/1/bedroom-2-2.jpg.jpeg',
          '/works/1/bedroom-2-3.jpg.jpeg',
          '/works/1/bedroom-2-4.jpg.jpeg',
          '/works/1/bedroom-2-5.jpg.jpeg',
          '/works/1/bedroom-2-wic-1.jpg.jpeg',
          '/works/1/bedroom-2-wic-2.jpg.jpeg',
          '/works/1/bedroom-2-wic-3.jpg.jpeg',
          '/works/1/bedroom-2-wic-4.jpg.jpeg',
        ],
      },
      {
        label: 'Master Bedroom',
        images: [
          '/works/1/master-bedroom-1.jpg.jpeg',
          '/works/1/master-bedroom-2.jpg.jpeg',
          '/works/1/master-bedroom-3.jpg.jpeg',
          '/works/1/master-bedroom-4.jpg.jpeg',
          '/works/1/mbr-closet-1.jpg.jpeg',
          '/works/1/mbr-closet-2.jpg.jpeg',
          '/works/1/mbr-closet-3.jpg.jpeg',
          '/works/1/mbr-closet-4.jpg.jpeg',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'The Bedroom Collection',
    subtitle: 'Bedroom Suites · 3 Spaces',
    description: 'Three distinct bedroom designs within a single residence — each with its own character, palette, and spatial rhythm. From the master suite to guest rooms, every space is a study in refined comfort.',
    cover: '/works/2/master-bedroom-01.jpg.jpeg',
    stats: [
      { label: 'Rooms', value: '3 Bedrooms' },
      { label: 'Photos', value: '15 Views' },
      { label: 'Style', value: 'Modern Luxury' },
    ],
    rooms: [
      {
        label: 'Master Bedroom',
        images: [
          '/works/2/master-bedroom-01.jpg.jpeg',
          '/works/2/master-bedroom-02.jpg.jpeg',
          '/works/2/master-bedroom-03.jpg.jpeg',
          '/works/2/master-bedroom-04.jpg.jpeg',
          '/works/2/master-bedroom-dresser.jpg.jpeg',
          '/works/2/master-bedroom-dresser-1.jpg.jpeg',
        ],
      },
      {
        label: 'Bedroom 2',
        images: [
          '/works/2/bedroom-2-01.jpg.jpeg',
          '/works/2/bedroom-2-02.jpg.jpeg',
          '/works/2/bedroom-2-03.jpg.jpeg',
          '/works/2/bedroom-2-04.jpg.jpeg',
        ],
      },
      {
        label: 'Bedroom 3',
        images: [
          '/works/2/bedroom-3-01.jpg.jpeg',
          '/works/2/bedroom-3-02.jpg.jpeg',
          '/works/2/bedroom-3-03.jpg.jpeg',
          '/works/2/bedroom-3-04.jpg.jpeg',
          '/works/2/bedroom-3-dresser.jpg.jpeg',
        ],
      },
    ],
  },
];

function WorkModal({ project, onClose }: { project: WorkProject; onClose: () => void }) {
  const allImages = project.rooms.flatMap((r) => r.images);
  const [activeRoom, setActiveRoom] = useState<string>('All');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const roomTabs = ['All', ...project.rooms.map((r) => r.label)];
  const displayed =
    activeRoom === 'All'
      ? allImages
      : project.rooms.find((r) => r.label === activeRoom)?.images ?? [];

  const currentIdx = lightbox ? displayed.indexOf(lightbox) : -1;
  const goPrev = () => currentIdx > 0 && setLightbox(displayed[currentIdx - 1]);
  const goNext = () => currentIdx < displayed.length - 1 && setLightbox(displayed[currentIdx + 1]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') lightbox ? setLightbox(null) : onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className="fixed inset-0 z-[8000] flex items-start justify-center overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#1C1C1C]/95 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-10 bg-[#FBFBFA] flex flex-col">

        {/* Header */}
        <div className="flex items-start justify-between px-8 md:px-14 py-10 border-b border-[#1C1C1C]/8">
          <div>
            <span className="font-sans text-[0.65rem] tracking-[0.4em] uppercase text-[#D34E36] block mb-2">
              Project {String(project.id).padStart(2, '0')}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1C1C1C] tracking-tight mb-1">
              {project.title}
            </h2>
            <p className="font-sans text-xs text-[#1C1C1C]/45 tracking-wider">{project.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="mt-1 w-10 h-10 flex items-center justify-center border border-[#1C1C1C]/15 text-[#1C1C1C]/60 hover:text-[#D34E36] hover:border-[#D34E36] transition-all duration-200 cursor-pointer bg-transparent text-xl leading-none flex-shrink-0"
          >
            ×
          </button>
        </div>

        {/* Description + stats */}
        <div className="px-8 md:px-14 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-[#1C1C1C]/8">
          <p className="md:col-span-2 font-sans font-light text-sm text-[#1C1C1C]/60 leading-relaxed">
            {project.description}
          </p>
          <div className="flex md:flex-col gap-6 md:gap-4 md:items-end">
            {project.stats.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-xl text-[#1C1C1C] font-light">{s.value}</div>
                <div className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[#1C1C1C]/35 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Room filter tabs */}
        <div className="px-8 md:px-14 pt-8 pb-4 flex gap-2 flex-wrap">
          {roomTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveRoom(tab)}
              className={`font-sans text-[0.65rem] font-semibold uppercase tracking-widest px-4 py-2 border transition-all duration-200 cursor-pointer ${
                activeRoom === tab
                  ? 'bg-[#D34E36] border-[#D34E36] text-[#FBFBFA]'
                  : 'bg-transparent border-[#1C1C1C]/15 text-[#1C1C1C]/50 hover:border-[#1C1C1C] hover:text-[#1C1C1C]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Image grid */}
        <div className="px-8 md:px-14 pb-14 grid grid-cols-2 md:grid-cols-3 gap-3">
          {displayed.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setLightbox(src)}
              className="group relative overflow-hidden aspect-square cursor-pointer bg-transparent border-none p-0"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#1C1C1C]/0 group-hover:bg-[#1C1C1C]/20 transition-all duration-300 flex items-center justify-center">
                <span className="text-[#FBFBFA] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl">⊕</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-[#1C1C1C]/98"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt=""
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {currentIdx > 0 && (
            <button onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-[#FBFBFA]/30 text-[#FBFBFA] flex items-center justify-center hover:border-[#FBFBFA] transition-all cursor-pointer bg-transparent text-xl">
              ←
            </button>
          )}
          {currentIdx < displayed.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-[#FBFBFA]/30 text-[#FBFBFA] flex items-center justify-center hover:border-[#FBFBFA] transition-all cursor-pointer bg-transparent text-xl">
              →
            </button>
          )}
          <button onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-10 h-10 border border-[#FBFBFA]/30 text-[#FBFBFA] flex items-center justify-center hover:border-[#FBFBFA] transition-all cursor-pointer bg-transparent text-xl">
            ×
          </button>
        </div>
      )}
    </div>
  );
}

function VideoCard({ src, title, tag, description }: { src: string; title: string; tag: string; description: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) { vid.play(); setIsPlaying(true); }
    else { vid.pause(); setIsPlaying(false); }
  };

  return (
    <div className="group relative overflow-hidden bg-[#1C1C1C]">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full aspect-video object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
      />
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-[#1C1C1C]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      {/* Play / Pause button */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className="absolute inset-0 flex items-center justify-center cursor-pointer bg-transparent border-none"
      >
        <span className={`w-16 h-16 rounded-full border border-[#FBFBFA]/60 flex items-center justify-center text-[#FBFBFA] transition-all duration-300 backdrop-blur-sm ${isPlaying ? 'opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100' : 'opacity-100 scale-100'}`}>
          {isPlaying
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
          }
        </span>
      </button>
      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 px-8 py-6 bg-gradient-to-t from-[#1C1C1C]/80 to-transparent">
        <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-[#C5A880] block mb-1">{tag}</span>
        <h3 className="font-serif text-xl text-[#FBFBFA] font-light">{title}</h3>
        <p className="font-sans font-light text-xs text-[#FBFBFA]/55 mt-1 max-w-sm">{description}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [animateGrid, setAnimateGrid] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionPhase, setTransitionPhase] = useState<'enter' | 'hold' | 'exit' | 'idle'>('idle');

  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', focusAreas: ['Space Planning'], message: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [selectedWork, setSelectedWork] = useState<WorkProject | null>(null);

  const navigateTo = useCallback((targetId: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionPhase('enter');
    setIsMobileMenuOpen(false);

    setTimeout(() => {
      setTransitionPhase('hold');
      const el = document.getElementById(targetId);
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'auto' });
    }, 500);

    setTimeout(() => setTransitionPhase('exit'), 1100);
    setTimeout(() => { setTransitionPhase('idle'); setIsTransitioning(false); }, 1600);
  }, [isTransitioning]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveSlide((p) => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAnimateGrid(false);
    const t = setTimeout(() => setAnimateGrid(true), 60);
    return () => clearTimeout(t);
  }, [activeTab]);

  const filteredProjects = activeTab === 'all' ? projects : projects.filter((p) => p.category === activeTab);

  const validateField = (name: keyof FormData, value: string): string => {
    if (!value.trim()) return `Please enter your ${name === 'name' ? 'full name' : name === 'phone' ? 'phone number' : 'email address'}.`;
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.';
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'name' || name === 'email' || name === 'phone') {
      setFormErrors((prev) => ({ ...prev, [name]: validateField(name as keyof FormData, value) }));
    }
  };

  const handleCheckboxChange = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter((a) => a !== area)
        : [...prev.focusAreas, area],
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: FormErrors = {};
    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const phoneErr = validateField('phone', formData.phone);
    if (nameErr) errors.name = nameErr;
    if (emailErr) errors.email = emailErr;
    if (phoneErr) errors.phone = phoneErr;
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('https://formspree.io/f/xgoborkb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          focusAreas: formData.focusAreas.join(', '),
          message: formData.message || '—',
        }),
      });
      if (res.ok) {
        setIsFormSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data?.errors?.[0]?.message ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', phone: '', focusAreas: ['Space Planning'], message: '' });
    setFormErrors({});
    setIsFormSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#1C1C1C] font-sans overflow-x-hidden selection:bg-[#D34E36] selection:text-white">

      {/* ─── Page Transition Overlay ─── */}
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center ${transitionPhase === 'idle' ? 'invisible pointer-events-none' : 'visible pointer-events-auto'}`}
        aria-hidden="true"
      >
        <div className={`absolute inset-0 bg-[#D34E36] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          transitionPhase === 'enter' || transitionPhase === 'hold' ? 'translate-x-0' :
          transitionPhase === 'exit' ? 'translate-x-full' : '-translate-x-full'
        }`} />
        <div className={`relative z-10 flex flex-col items-center gap-4 transition-all duration-300 ${transitionPhase === 'hold' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <img src="/images/exotica-logo.jpg" alt="" className="h-20 w-20 object-cover shadow-2xl" />
          <div className="flex flex-col items-center">
            <span className="font-serif font-bold text-4xl tracking-[0.2em] text-[#FBFBFA] leading-none">EXOTICA</span>
            <span className="font-sans text-[0.65rem] font-semibold tracking-[0.4em] text-[#FBFBFA]/70 mt-2">INTERIOR DESIGN STUDIO</span>
          </div>
          <div className="w-16 h-[1px] bg-[#C5A880] mt-2 animate-pulse" />
        </div>
      </div>

      {/* ─── Navigation ─── */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#FBFBFA]/96 backdrop-blur-md shadow-sm border-b border-[#1C1C1C]/8 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">

          <button onClick={() => navigateTo('hero')} className="flex items-center gap-3.5 cursor-pointer bg-transparent border-none" aria-label="Exotica Home">
            <img src="/images/exotica-logo.jpg" alt="Exotica" className="h-10 w-10 object-cover" />
            <div className="flex flex-col text-left">
              <span className={`font-serif font-bold text-xl tracking-[0.18em] leading-none transition-colors duration-300 ${isScrolled ? 'text-[#D34E36]' : 'text-[#FBFBFA]'}`}>EXOTICA</span>
              <span className={`font-sans text-[0.55rem] font-semibold tracking-[0.3em] mt-1 leading-none transition-colors duration-300 ${isScrolled ? 'text-[#1C1C1C]/50' : 'text-[#FBFBFA]/60'}`}>INTERIOR DESIGN STUDIO</span>
            </div>
          </button>

          <nav className="hidden lg:block" aria-label="Primary Navigation">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => navigateTo(link.id)}
                    className={`font-sans text-[0.7rem] tracking-[0.15em] uppercase relative py-1 bg-transparent border-none cursor-pointer transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D34E36] after:transition-all after:duration-300 hover:after:w-full ${
                      isScrolled ? 'text-[#1C1C1C]/70 hover:text-[#1C1C1C]' : 'text-[#FBFBFA]/80 hover:text-[#FBFBFA]'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:+919703400005" className={`font-sans text-[0.7rem] tracking-wider transition-colors duration-300 ${isScrolled ? 'text-[#1C1C1C]/50 hover:text-[#D34E36]' : 'text-[#FBFBFA]/60 hover:text-[#FBFBFA]'}`}>
              +91 9703 400005
            </a>
            <button
              onClick={() => navigateTo('contact')}
              className="bg-[#D34E36] hover:bg-[#B93C27] text-white text-[0.7rem] font-semibold tracking-[0.15em] uppercase px-6 py-3 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer border-none"
            >
              Free Consultation
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col justify-between w-6 h-4 bg-transparent border-none cursor-pointer z-50"
            aria-label="Toggle Menu"
          >
            <span className={`w-full h-[1.5px] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px] bg-[#1C1C1C]' : isScrolled ? 'bg-[#1C1C1C]' : 'bg-[#FBFBFA]'}`} />
            <span className={`w-full h-[1.5px] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 bg-[#1C1C1C]' : isScrolled ? 'bg-[#1C1C1C]' : 'bg-[#FBFBFA]'}`} />
            <span className={`w-full h-[1.5px] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px] bg-[#1C1C1C]' : isScrolled ? 'bg-[#1C1C1C]' : 'bg-[#FBFBFA]'}`} />
          </button>
        </div>

        {/* Mobile Drawer */}
        <div className={`fixed top-0 right-0 w-[80%] max-w-[380px] h-screen bg-[#FBFBFA] border-l border-[#1C1C1C]/10 shadow-2xl p-10 pt-24 flex flex-col gap-10 transition-transform duration-500 ease-out z-40 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button onClick={() => navigateTo(link.id)} className="font-serif text-2xl text-[#1C1C1C] uppercase bg-transparent border-none cursor-pointer tracking-wider hover:text-[#D34E36] transition-colors">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <a href="tel:+919703400005" className="font-sans text-sm text-[#1C1C1C]/50">+91 9703 400005</a>
            <button onClick={() => navigateTo('contact')} className="w-full text-center bg-[#D34E36] text-white text-sm font-semibold tracking-[0.15em] uppercase py-4 cursor-pointer border-none">
              Free Consultation
            </button>
          </div>
        </div>
      </header>

      <main>

        {/* ══════════════════════════════════════════════
            SECTION 1 — HERO
        ══════════════════════════════════════════════ */}
        <section id="hero" className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
          {heroSlides.map((slide, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-[2000ms] ${idx === activeSlide ? 'opacity-100' : 'opacity-0'}`}>
              <img
                src={slide.image}
                alt={slide.alt}
                className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${idx === activeSlide ? 'scale-105' : 'scale-100'}`}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-[#1C1C1C]/55" />
          <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#1C1C1C]/50 to-transparent" />

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <span className="font-sans text-[0.7rem] font-semibold tracking-[0.45em] text-[#C5A880] uppercase mb-8 inline-block">
              Crafting Spaces That Inspire
            </span>
            <h1 className="font-serif text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.95] text-[#FBFBFA] font-light mb-8 tracking-tight">
              Where Artistry<br />Meets Space
            </h1>
            <p className="font-sans font-light text-sm md:text-base text-[#FBFBFA]/65 mb-12 max-w-lg mx-auto leading-relaxed tracking-wide">
              Bespoke ultra-luxury residential interiors crafted for the discerning eye — across Hyderabad, Bangalore, Vizag, Vijayawada & Warangal.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => navigateTo('contact')} className="bg-[#D34E36] hover:bg-[#B93C27] text-white text-[0.7rem] font-semibold tracking-[0.25em] uppercase px-10 py-4 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer border-none">
                Begin Your Story
              </button>
              <button onClick={() => navigateTo('portfolio')} className="border border-[#FBFBFA]/50 hover:bg-[#FBFBFA] hover:text-[#1C1C1C] text-[#FBFBFA] text-[0.7rem] font-semibold tracking-[0.25em] uppercase px-10 py-4 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer bg-transparent">
                View Portfolio
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {heroSlides.map((_, idx) => (
              <button key={idx} onClick={() => setActiveSlide(idx)} aria-label={`Slide ${idx + 1}`}
                className={`h-[1px] transition-all duration-500 cursor-pointer border-none ${idx === activeSlide ? 'bg-[#C5A880] w-14' : 'bg-[#FBFBFA]/35 w-7'}`}
              />
            ))}
          </div>

          <button onClick={() => navigateTo('about')} className="absolute bottom-8 right-10 z-20 flex flex-col items-center gap-2 text-[#FBFBFA]/50 hover:text-[#FBFBFA] transition-colors cursor-pointer bg-transparent border-none">
            <span className="font-sans text-[0.6rem] tracking-[0.35em] uppercase">Scroll</span>
            <span className="animate-bounce text-lg">↓</span>
          </button>
        </section>

        {/* ── Marquee Strip ── */}
        <div className="bg-[#D34E36] py-4 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="inline-flex items-center gap-6 mx-6 font-sans text-[0.65rem] font-semibold tracking-[0.3em] text-[#FBFBFA] uppercase flex-shrink-0">
                {marqueeItems.map((item, j) => (
                  <span key={j} className="inline-flex items-center gap-6">
                    <span>{item}</span>
                    <span className="text-[#C5A880]">·</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            SECTION 2 — ABOUT (full-bg image)
        ══════════════════════════════════════════════ */}
        <section id="about" className="relative min-h-screen flex items-center overflow-hidden">
          {/* Full-bleed background image */}
          <div className="absolute inset-0">
            <img
              src="/images/living-room-main.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          {/* Gradient overlay — deep left for text, reveals image on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C]/95 via-[#1C1C1C]/80 to-[#1C1C1C]/35" />

          <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 md:px-12 py-40 md:py-52">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">

              {/* Text column */}
              <div className="lg:col-span-7">
                <span className="font-sans text-[0.7rem] font-semibold tracking-[0.35em] text-[#C5A880] uppercase mb-6 inline-block">
                  Our Story
                </span>
                <h2 className="font-serif text-[2.5rem] md:text-[4rem] leading-[1.05] text-[#FBFBFA] mb-8 font-light tracking-tight">
                  Architects of Dreams,<br />Craftsmen of Imagination
                </h2>
                <p className="font-sans font-light text-base text-[#FBFBFA]/65 mb-6 leading-relaxed max-w-xl">
                  At Exotica, we believe a home is a living canvas. We design not just for the eyes, but for the soul — sculpting proportions, curating rare materials, and balancing tones to tell your unique story.
                </p>
                <p className="font-sans font-light text-base text-[#FBFBFA]/65 mb-10 leading-relaxed max-w-xl">
                  From the first conceptual sketch to the final flourish, every detail is engineered to inspire. Our visionary designers, expert builders, and creative curators work in harmony to realise your dream.
                </p>
                <blockquote className="font-serif text-xl md:text-2xl font-light italic text-[#C5A880] border-l-2 border-[#D34E36] pl-6 py-1 mb-10">
                  "From concept to creation, every detail matters."
                </blockquote>

                {/* Framework */}
                <div className="flex flex-col gap-0">
                  {[
                    { n: '01', title: 'Visionary Designers', desc: 'Scribing unique spatial narratives drawn from client briefs.' },
                    { n: '02', title: 'Expert Builders', desc: 'Translating abstract visuals into structural elements with precision.' },
                    { n: '03', title: 'Creative Curators', desc: 'Sourcing rare wood, stone, plaster, and artisan textiles.' },
                  ].map((item) => (
                    <div key={item.n} className="flex gap-5 items-start py-4 border-b border-[#FBFBFA]/10">
                      <span className="font-serif text-sm text-[#C5A880] font-medium min-w-[24px]">{item.n}</span>
                      <div>
                        <h4 className="font-sans font-semibold text-xs tracking-widest uppercase text-[#FBFBFA]/80 mb-1">{item.title}</h4>
                        <p className="font-sans font-light text-sm text-[#FBFBFA]/45">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats grid — glass cards */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                {[
                  { num: '10+', label: 'Years of Excellence' },
                  { num: '200+', label: 'Projects Delivered' },
                  { num: '5', label: 'Cities Across India' },
                  { num: '500+', label: 'Happy Families' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-[#FBFBFA]/8 backdrop-blur-sm border border-[#FBFBFA]/12 p-6 hover:bg-[#FBFBFA]/14 transition-colors duration-300"
                  >
                    <div className="font-serif text-4xl md:text-5xl text-[#D34E36] font-light mb-2">{s.num}</div>
                    <div className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[#FBFBFA]/50">{s.label}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 3 — SERVICES
        ══════════════════════════════════════════════ */}
        <section id="services" className="py-32 md:py-44 bg-[#F4F2EF]">
          <div className="max-w-[1300px] mx-auto px-6 md:px-12">

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="font-sans text-[0.7rem] font-semibold tracking-[0.35em] text-[#D34E36] uppercase mb-4 inline-block">What We Do</span>
                <h2 className="font-serif text-[2.5rem] md:text-[3.8rem] text-[#1C1C1C] font-light leading-tight tracking-tight">
                  Our Core Services
                </h2>
              </div>
              <p className="font-sans font-light text-sm text-[#1C1C1C]/50 max-w-xs leading-relaxed">
                Every service is rooted in our philosophy — beautiful spaces are lived, not just admired.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {serviceItems.map((service) => (
                <div key={service.id} className="group relative overflow-hidden aspect-[16/10] cursor-pointer">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-[#1C1C1C]/15 to-transparent" />
                  <div className="absolute inset-0 bg-[#D34E36]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                    <span className="font-sans text-[0.6rem] tracking-[0.35em] uppercase text-[#C5A880] group-hover:text-[#FBFBFA]/60 transition-colors duration-300 mb-2">{service.tag}</span>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#FBFBFA] font-light mb-3">{service.title}</h3>
                    <p className="font-sans font-light text-sm text-[#FBFBFA] opacity-0 group-hover:opacity-90 translate-y-3 group-hover:translate-y-0 transition-all duration-500 max-w-xs leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 4 — PORTFOLIO
        ══════════════════════════════════════════════ */}
        <section id="portfolio" className="py-32 md:py-44 bg-[#FBFBFA]">
          <div className="max-w-[1300px] mx-auto px-6 md:px-12">

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <span className="font-sans text-[0.7rem] font-semibold tracking-[0.35em] text-[#D34E36] uppercase mb-4 inline-block">Our Work</span>
                <h2 className="font-serif text-[2.5rem] md:text-[3.8rem] text-[#1C1C1C] font-light leading-tight tracking-tight">
                  Featured Projects
                </h2>
              </div>
              <div className="flex flex-wrap gap-2" role="tablist">
                {filterTabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} role="tab" aria-selected={activeTab === tab.id}
                    className={`font-sans text-[0.65rem] font-semibold uppercase tracking-widest px-5 py-2.5 border transition-all duration-300 cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#1C1C1C] text-[#FBFBFA] border-[#1C1C1C]'
                        : 'bg-transparent text-[#1C1C1C]/45 border-[#1C1C1C]/20 hover:border-[#1C1C1C] hover:text-[#1C1C1C]'
                    }`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`grid grid-cols-1 md:grid-cols-12 md:auto-rows-[240px] gap-4 transition-all duration-500 ease-out ${animateGrid ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              aria-live="polite"
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className={`relative overflow-hidden group min-h-[300px] md:min-h-0 ${activeTab === 'all' && project.gridClass ? project.gridClass : 'md:col-span-4 md:row-span-2'}`}
                >
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/90 via-[#1C1C1C]/10 to-transparent transition-all duration-300 group-hover:from-[#1C1C1C]/95" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <span className="font-sans text-[0.6rem] tracking-[0.3em] text-[#C5A880] uppercase mb-1.5">{project.categoryLabel}</span>
                    <h4 className="font-serif text-xl md:text-2xl text-[#FBFBFA] font-light leading-tight">{project.title}</h4>
                    <p className="font-serif text-sm italic text-[#FBFBFA]/55 mt-1">{project.slogan}</p>
                    <p className="font-sans font-light text-xs text-[#FBFBFA] opacity-0 group-hover:opacity-70 mt-2.5 translate-y-2 group-hover:translate-y-0 transition-all duration-500 leading-relaxed max-w-xs">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 5 — COMPLETED WORKS
        ══════════════════════════════════════════════ */}
        <section id="works" className="py-32 md:py-44 bg-[#F4F2EF]">
          <div className="max-w-[1300px] mx-auto px-6 md:px-12">

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <div>
                <span className="font-sans text-[0.7rem] font-semibold tracking-[0.35em] text-[#D34E36] uppercase mb-4 inline-block">Completed Projects</span>
                <h2 className="font-serif text-[2.5rem] md:text-[3.8rem] text-[#1C1C1C] font-light leading-tight tracking-tight">
                  Works Done By Us
                </h2>
              </div>
              <p className="font-sans font-light text-sm text-[#1C1C1C]/50 max-w-xs leading-relaxed">
                Click any project to explore the full image gallery — room by room.
              </p>
            </div>

            {/* Project list — alternating layout */}
            <div className="flex flex-col gap-6">
              {worksData.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedWork(project)}
                  className="group w-full text-left bg-transparent border-none cursor-pointer p-0"
                  aria-label={`Explore ${project.title}`}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 overflow-hidden border border-[#1C1C1C]/8 hover:border-[#D34E36]/40 transition-all duration-500 ${idx % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
                    {/* Cover image */}
                    <div className="lg:col-span-7 aspect-[16/9] lg:aspect-auto overflow-hidden relative" style={{ direction: 'ltr' }}>
                      <img
                        src={project.cover}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 min-h-[260px]"
                      />
                      <div className="absolute inset-0 bg-[#1C1C1C]/10 group-hover:bg-[#1C1C1C]/0 transition-all duration-500" />
                    </div>

                    {/* Info panel */}
                    <div className="lg:col-span-5 bg-[#FBFBFA] p-10 md:p-14 flex flex-col justify-between" style={{ direction: 'ltr' }}>
                      <div>
                        <span className="font-sans text-[0.6rem] tracking-[0.45em] uppercase text-[#D34E36] block mb-3">
                          Project {String(project.id).padStart(2, '0')}
                        </span>
                        <h3 className="font-serif text-3xl md:text-4xl text-[#1C1C1C] font-light leading-tight mb-3 tracking-tight">
                          {project.title}
                        </h3>
                        <p className="font-sans text-xs text-[#1C1C1C]/40 tracking-wider mb-6">{project.subtitle}</p>
                        <p className="font-sans font-light text-sm text-[#1C1C1C]/60 leading-relaxed mb-8">
                          {project.description}
                        </p>

                        {/* Room tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.rooms.map((r) => (
                            <span key={r.label} className="font-sans text-[0.6rem] tracking-widest uppercase px-3 py-1.5 border border-[#1C1C1C]/12 text-[#1C1C1C]/50">
                              {r.label}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="flex gap-8 pt-6 border-t border-[#1C1C1C]/8">
                        {project.stats.map((s) => (
                          <div key={s.label}>
                            <div className="font-serif text-lg text-[#1C1C1C] font-light">{s.value}</div>
                            <div className="font-sans text-[0.55rem] tracking-[0.2em] uppercase text-[#1C1C1C]/35 mt-0.5">{s.label}</div>
                          </div>
                        ))}
                        <div className="ml-auto flex items-center">
                          <span className="font-sans text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-[#D34E36] group-hover:translate-x-1 transition-transform duration-300 inline-block">
                            Explore →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Videos sub-section */}
            <div className="mt-16 pt-16 border-t border-[#1C1C1C]/10">
              <span className="font-sans text-[0.7rem] font-semibold tracking-[0.35em] text-[#D34E36] uppercase mb-4 inline-block">Works in Motion</span>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
                <VideoCard src="/videos/video1.mp4" tag="Completed Project" title="The Gilded Living Suite" description="A bespoke living space blending walnut wood paneling, brass accents, and curated stone flooring." />
                <VideoCard src="/videos/video2.mp4" tag="Completed Project" title="The Monolithic Bedroom" description="An ultra-luxury master bedroom featuring layered textures, hidden lighting, and artisan finishes." />
              </div>
            </div>

          </div>
        </section>

        {/* Modal */}
        {selectedWork && <WorkModal project={selectedWork} onClose={() => setSelectedWork(null)} />}

        {/* ══════════════════════════════════════════════
            SECTION 6 — PROCESS
        ══════════════════════════════════════════════ */}
        <section id="process" className="py-32 md:py-44 bg-[#1C1C1C]">
          <div className="max-w-[1300px] mx-auto px-6 md:px-12">

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <div>
                <span className="font-sans text-[0.7rem] font-semibold tracking-[0.35em] text-[#C5A880] uppercase mb-4 inline-block">How We Work</span>
                <h2 className="font-serif text-[2.5rem] md:text-[3.8rem] text-[#FBFBFA] font-light leading-tight tracking-tight">
                  Our Design Process
                </h2>
              </div>
              <p className="font-sans font-light text-sm text-[#FBFBFA]/40 max-w-xs leading-relaxed">
                A structured journey from your first conversation to the final reveal — transparent at every stage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
              {processSteps.map((step, idx) => (
                <div key={step.num} className="group relative flex flex-col">
                  {idx < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-[1px] bg-[#FBFBFA]/8 z-0 translate-x-3" />
                  )}
                  <div className="font-serif text-[5rem] leading-none text-[#D34E36]/15 group-hover:text-[#D34E36]/30 transition-colors duration-500 mb-6 font-light select-none">
                    {step.num}
                  </div>
                  <h3 className="font-serif text-2xl text-[#FBFBFA] font-light mb-4">{step.title}</h3>
                  <p className="font-sans font-light text-sm text-[#FBFBFA]/45 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

            {/* CTA within process */}
            <div className="mt-20 pt-16 border-t border-[#FBFBFA]/8 flex flex-col md:flex-row items-center justify-between gap-8">
              <p className="font-serif text-2xl md:text-3xl text-[#FBFBFA] font-light max-w-lg">
                Ready to begin your design journey with us?
              </p>
              <button onClick={() => navigateTo('contact')} className="flex-shrink-0 bg-[#D34E36] hover:bg-[#B93C27] text-white text-[0.7rem] font-semibold tracking-[0.25em] uppercase px-10 py-4 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer border-none">
                Start a Conversation
              </button>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 6 — STATS
        ══════════════════════════════════════════════ */}
        <section className="py-24 bg-[#D34E36]">
          <div className="max-w-[1300px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-[3.5rem] md:text-[5rem] text-[#FBFBFA] font-light leading-none mb-3">{stat.num}</div>
                  <div className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-[#FBFBFA]/65">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 7 — CONTACT
        ══════════════════════════════════════════════ */}
        <section id="contact" className="py-32 md:py-44 bg-[#FBFBFA]">
          <div className="max-w-[1300px] mx-auto px-6 md:px-12">

            <div className="text-center mb-20">
              <span className="font-sans text-[0.7rem] font-semibold tracking-[0.35em] text-[#D34E36] uppercase mb-4 inline-block">Get In Touch</span>
              <h2 className="font-serif text-[2.5rem] md:text-[3.8rem] text-[#1C1C1C] font-light mb-5 tracking-tight">
                Let's Create Together
              </h2>
              <p className="font-sans font-light text-sm text-[#1C1C1C]/45 max-w-md mx-auto leading-relaxed">
                Begin your design journey with a free consultation. Our chief architect will contact you within 24 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">

              {/* Info column */}
              <div className="lg:col-span-4 flex flex-col gap-10">
                <div>
                  <h3 className="font-sans text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-[#D34E36] mb-5">Direct Contact</h3>
                  <div className="flex flex-col gap-5">
                    <div>
                      <div className="font-sans text-[0.6rem] text-[#1C1C1C]/35 uppercase tracking-wider mb-1.5">Phone / WhatsApp</div>
                      <a href="tel:+919703400005" className="font-serif text-xl text-[#1C1C1C] hover:text-[#D34E36] transition-colors">+91 9703 400005</a>
                    </div>
                    <div>
                      <div className="font-sans text-[0.6rem] text-[#1C1C1C]/35 uppercase tracking-wider mb-1.5">Email</div>
                      <a href="mailto:exoticadesignstudio3@gmail.com" className="font-serif text-base text-[#1C1C1C] hover:text-[#D34E36] transition-colors break-all">exoticadesignstudio3@gmail.com</a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-sans text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-[#D34E36] mb-5">Our Offices</h3>
                  <div className="flex flex-col gap-0">
                    {[
                      { city: 'Hyderabad', note: 'Head Office · Banjara Hills, Road No. 12' },
                      { city: 'Bangalore', note: 'Branch · Indiranagar, 100 Feet Rd' },
                      { city: 'Vizag', note: 'Branch · VIP Road, Siripuram' },
                      { city: 'Vijayawada', note: 'Branch · M.G. Road, Labbipet' },
                      { city: 'Warangal', note: 'Branch · Hanamkonda Main Road' },
                    ].map((loc) => (
                      <div key={loc.city} className="py-4 border-b border-[#1C1C1C]/6">
                        <span className="font-serif text-base text-[#1C1C1C]">{loc.city}</span>
                        <p className="font-sans text-xs text-[#1C1C1C]/35 mt-0.5 font-light">{loc.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form column */}
              <div className="lg:col-span-8 bg-[#F4F2EF] p-8 md:p-14">
                {!isFormSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="flex flex-col" noValidate>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] font-light mb-10">Book a Free Consultation</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="relative">
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder=" " required
                          className={`w-full bg-transparent border-b py-3 font-sans text-sm text-[#1C1C1C] focus:outline-none focus:border-[#D34E36] transition-colors peer ${formErrors.name ? 'border-[#D34E36]' : 'border-[#1C1C1C]/20'}`} />
                        <label htmlFor="name" className="absolute left-0 top-3 font-sans font-light text-sm text-[#1C1C1C]/40 pointer-events-none transition-all duration-300 peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-[#D34E36] peer-focus:tracking-wider peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#D34E36] peer-[:not(:placeholder-shown)]:tracking-wider">
                          Full Name
                        </label>
                        {formErrors.name && <span className="text-[0.65rem] text-[#D34E36] absolute bottom-[-18px] left-0">{formErrors.name}</span>}
                      </div>
                      <div className="relative">
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder=" " required
                          className={`w-full bg-transparent border-b py-3 font-sans text-sm text-[#1C1C1C] focus:outline-none focus:border-[#D34E36] transition-colors peer ${formErrors.email ? 'border-[#D34E36]' : 'border-[#1C1C1C]/20'}`} />
                        <label htmlFor="email" className="absolute left-0 top-3 font-sans font-light text-sm text-[#1C1C1C]/40 pointer-events-none transition-all duration-300 peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-[#D34E36] peer-focus:tracking-wider peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#D34E36] peer-[:not(:placeholder-shown)]:tracking-wider">
                          Email Address
                        </label>
                        {formErrors.email && <span className="text-[0.65rem] text-[#D34E36] absolute bottom-[-18px] left-0">{formErrors.email}</span>}
                      </div>
                    </div>

                    <div className="relative mb-6">
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder=" " required
                        className={`w-full bg-transparent border-b py-3 font-sans text-sm text-[#1C1C1C] focus:outline-none focus:border-[#D34E36] transition-colors peer ${formErrors.phone ? 'border-[#D34E36]' : 'border-[#1C1C1C]/20'}`} />
                      <label htmlFor="phone" className="absolute left-0 top-3 font-sans font-light text-sm text-[#1C1C1C]/40 pointer-events-none transition-all duration-300 peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-[#D34E36] peer-focus:tracking-wider peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#D34E36] peer-[:not(:placeholder-shown)]:tracking-wider">
                        Phone Number
                      </label>
                      {formErrors.phone && <span className="text-[0.65rem] text-[#D34E36] absolute bottom-[-18px] left-0">{formErrors.phone}</span>}
                    </div>

                    <div className="flex flex-col mb-6">
                      <span className="font-sans text-[0.6rem] font-semibold text-[#1C1C1C]/35 uppercase tracking-wider mb-3">Focus Area</span>
                      <div className="flex flex-wrap gap-2">
                        {['Space Planning', 'Color Schemes', 'Furniture Selection', 'Full Home Design'].map((area) => {
                          const isChecked = formData.focusAreas.includes(area);
                          return (
                            <label key={area} className="cursor-pointer">
                              <input type="checkbox" name="focus-area" checked={isChecked} onChange={() => handleCheckboxChange(area)} className="sr-only" />
                              <span className={`inline-block px-4 py-2 border text-xs tracking-wider font-sans transition-all duration-300 ${isChecked ? 'bg-[#D34E36] border-[#D34E36] text-[#FBFBFA]' : 'bg-transparent border-[#1C1C1C]/15 text-[#1C1C1C] hover:border-[#D34E36]'}`}>
                                {area}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="relative mb-10">
                      <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder=" " rows={4}
                        className="w-full bg-transparent border-b py-3 font-sans text-sm text-[#1C1C1C] focus:outline-none focus:border-[#D34E36] transition-colors peer border-[#1C1C1C]/20 resize-none" />
                      <label htmlFor="message" className="absolute left-0 top-3 font-sans font-light text-sm text-[#1C1C1C]/40 pointer-events-none transition-all duration-300 peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-[#D34E36] peer-focus:tracking-wider peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#D34E36] peer-[:not(:placeholder-shown)]:tracking-wider">
                        Tell us about your space (Optional)
                      </label>
                    </div>

                    {submitError && (
                      <p className="text-[0.7rem] text-[#D34E36] mb-4 font-sans">{submitError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#D34E36] hover:bg-[#B93C27] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[0.7rem] font-semibold tracking-[0.25em] uppercase py-4 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer border-none"
                    >
                      {isSubmitting ? 'Sending…' : 'Request Free Consultation'}
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center text-center py-20">
                    <div className="w-14 h-14 bg-[#D34E36]/10 rounded-full flex items-center justify-center text-[#D34E36] text-xl mb-6">✓</div>
                    <h4 className="font-serif text-3xl mb-3 text-[#1C1C1C] font-light">Thank You</h4>
                    <p className="font-sans font-light text-sm text-[#1C1C1C]/45 max-w-xs mb-8 leading-relaxed">
                      Your brief has been received. Our chief architect will contact you within 24 hours.
                    </p>
                    <button onClick={handleResetForm} className="border border-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FBFBFA] text-[#1C1C1C] text-[0.7rem] font-semibold tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300 cursor-pointer bg-transparent">
                      Submit Another
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-[#1C1C1C] text-[#FBFBFA] pt-20 pb-8">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 pb-16 border-b border-[#FBFBFA]/8">

            <div className="md:col-span-5">
              <div className="flex items-center gap-3.5 mb-6">
                <img src="/images/exotica-logo.jpg" alt="Exotica" className="h-10 w-10 object-cover" />
                <div>
                  <div className="font-serif text-xl tracking-[0.18em] text-[#D34E36] font-bold leading-none">EXOTICA</div>
                  <div className="font-sans text-[0.55rem] tracking-[0.3em] text-[#FBFBFA]/35 mt-1 leading-none">INTERIOR DESIGN STUDIO</div>
                </div>
              </div>
              <p className="font-sans font-light text-sm text-[#FBFBFA]/40 leading-relaxed max-w-xs mb-8">
                Crafting ultra-luxury residential spaces that inspire — where artistry meets architecture.
              </p>
              <div className="flex gap-6">
                {[
                  { label: 'Instagram', href: 'https://www.instagram.com' },
                  { label: 'Pinterest', href: 'https://www.pinterest.com' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
                  { label: 'YouTube', href: 'https://www.youtube.com' },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-[#FBFBFA]/35 hover:text-[#C5A880] transition-colors">{s.label}</a>
                ))}
              </div>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-sans text-[0.6rem] font-semibold tracking-[0.3em] uppercase text-[#FBFBFA]/30 mb-6">Navigation</h4>
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button onClick={() => navigateTo(link.id)} className="font-sans font-light text-sm text-[#FBFBFA]/50 hover:text-[#FBFBFA] transition-colors cursor-pointer bg-transparent border-none text-left">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-sans text-[0.6rem] font-semibold tracking-[0.3em] uppercase text-[#FBFBFA]/30 mb-6">Contact</h4>
              <div className="flex flex-col gap-3">
                <a href="tel:+919703400005" className="font-sans font-light text-sm text-[#FBFBFA]/50 hover:text-[#FBFBFA] transition-colors">+91 9703 400005</a>
                <a href="mailto:exoticadesignstudio3@gmail.com" className="font-sans font-light text-sm text-[#FBFBFA]/50 hover:text-[#FBFBFA] transition-colors break-all">exoticadesignstudio3@gmail.com</a>
                <p className="font-sans font-light text-sm text-[#FBFBFA]/50 mt-2">Hyderabad · Bangalore · Vizag<br />Vijayawada · Warangal</p>
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans font-light text-xs text-[#FBFBFA]/25">&copy; 2026 Exotica Interior Design Studio. All rights reserved.</p>
            <p className="font-sans font-light text-xs text-[#FBFBFA]/25">Artistry In Every Design</p>
          </div>

        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
