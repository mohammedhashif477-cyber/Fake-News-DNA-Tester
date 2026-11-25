import { useState } from 'react'
import './App.css'

import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Video,
  FileBarChart,
  ShieldCheck,
  Languages,
  Search,
  HelpCircle,
  UserRound,
  Activity,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react'

import Dashboard from './pages/Dashboard'
import TextScanner from './pages/TextScanner'
import ImageScanner from './pages/ImageScanner'
import VideoScanner from './pages/VideoScanner'
import DNAReport from './pages/DNAReport'
import LanguageDropdown from './components/LanguageDropdown'

function App() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  )
  const [activePage, setActivePage] = useState('Dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Text Scanner', icon: FileText },
    { name: 'Image Scanner', icon: ImageIcon },
    { name: 'Video Scanner', icon: Video },
    { name: 'DNA Report', icon: FileBarChart },
  ]

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
  ]

  const navigateTo = (page) => {
    setActivePage(page)
    setMobileMenuOpen(false)
  }

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = nextTheme
    localStorage.setItem('gluco-theme', nextTheme)

    const themeColor = document.querySelector('meta[name="theme-color"]')
    if (themeColor) {
      themeColor.content = nextTheme === 'light' ? '#F5F8FC' : '#051424'
    }

    setTheme(nextTheme)
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard onNavigate={navigateTo} />

      case 'Text Scanner':
        return <TextScanner />

      case 'Image Scanner':
        return <ImageScanner />

      case 'Video Scanner':
        return <VideoScanner />

      case 'DNA Report':
        return <DNAReport />

      default:
        return <Dashboard onNavigate={navigateTo} />
    }
  }

  return (
    <div data-theme={theme} className="min-h-screen bg-surface text-on-surface font-body">

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-surface-container text-primary-strong"
        aria-label="Toggle navigation"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
      className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 bg-sidebar flex flex-col justify-between py-6 border-r border-outline-variant/30 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >

        <div className="flex flex-col gap-8">

          {/* GLUCO Brand */}
          <div className="px-5 flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-strong">
              <ShieldCheck size={22} />
            </div>

            <div className="flex flex-col">
              <span className="font-headline text-lg font-bold tracking-tight text-on-surface">
                GLUCO
              </span>

              <span className="text-[10px] text-on-surface-variant tracking-wide">
                Fake News Detection
              </span>
            </div>

          </div>

          {/* Navigation */}
          <div className="px-3">

            <p className="text-[10px] font-semibold tracking-[0.15em] text-outline px-3 mb-3">
              MAIN MENU
            </p>

            <nav className="flex flex-col gap-1">

              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activePage === item.name

                return (
                  <button
                    key={item.name}
                    onClick={() => navigateTo(item.name)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-surface-container text-primary-strong font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                    }`}
                  >
                    <Icon size={19} />
                    <span>{item.name}</span>
                  </button>
                )
              })}

            </nav>
          </div>

        </div>

        {/* Sidebar Bottom */}
        <div className="px-4 flex flex-col gap-5">

          <div className="p-3 rounded-lg bg-surface-container-low">

            <div className="flex items-center justify-between mb-2">

              <span className="text-xs text-on-surface-variant">
                Analysis Engine
              </span>

              <span className="w-2 h-2 rounded-full bg-tertiary" />

            </div>

            <p className="text-xs font-code text-on-surface">
              Development Mode
            </p>

          </div>

          <div className="flex items-center gap-2 text-on-surface-variant">
            <Languages size={15} />

            <span className="text-[10px] tracking-wider font-semibold">
              SUPPORTED LANGUAGES
            </span>
          </div>

          <p className="text-xs text-on-surface-variant leading-6">
            English · Hindi · Malayalam · Tamil · Kannada
          </p>

          <div className="pt-4 border-t border-outline-variant/30">

            <p className="text-[10px] text-outline">
              GLUCO PROJECT
            </p>

            <p className="text-xs text-on-surface-variant mt-1">
              Fake News Detection v1.0
            </p>

          </div>

        </div>

      </aside>

      {/* Main Application Area */}
      <div className="app-main">
          {/* Top Header */}
      <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 z-30 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/20">
          <div className="h-full pl-14 pr-4 sm:pl-16 sm:pr-5 lg:px-8 flex items-center justify-between gap-4">

            {/* Search */}
            <div className="hidden sm:flex min-w-0 flex-1 max-w-xl">

              <div className="w-full min-w-0 h-10 px-3 rounded-lg bg-surface-container-low flex items-center gap-3 text-on-surface-variant">

                <Search size={17} />

                <input
                  type="text"
                  placeholder="Search verified claims or paste link..."
                  className="w-full bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none"
                />

              </div>

            </div>

            {/* Header Actions */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3 max-[359px]:gap-1 ml-auto">

              {/* Language Selector */}
              <LanguageDropdown
                value={selectedLanguage}
                onChange={setSelectedLanguage}
                options={languages}
                label="Select global language"
                compact
              />

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="group relative flex h-9 w-9 items-center justify-center rounded-lg border border-outline-variant/40 bg-surface-container-low text-on-surface-variant transition-colors hover:border-primary/40 hover:bg-surface-container hover:text-primary-strong active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-full z-[80] mt-2 w-max rounded-md border border-outline-variant bg-card px-2.5 py-1.5 text-xs text-on-surface opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                </span>
              </button>

              {/* Help */}
              <button
                type="button"
                title="Help and documentation"
                className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary-strong transition-colors"
              >
                <HelpCircle size={18} />
              </button>

              {/* User Avatar */}
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary">
                <UserRound size={18} />
              </div>

            </div>

          </div>

        </header>

        {/* Page Content */}
        <main className="min-h-screen min-w-0 pt-24 pb-8 px-5 md:px-8 bg-surface">
          <div className="w-full max-w-7xl mx-auto">

            {/* Page Heading */}
            <div className="mb-8 flex flex-wrap items-center gap-2">

              <Activity size={15} className="text-primary-strong" />

              <span className="text-[10px] font-semibold tracking-[0.18em] text-on-surface-variant uppercase">
                GLUCO Investigation Center
              </span>

              <span className="text-outline">/</span>

              <span className="text-xs text-primary-strong">
                {activePage}
              </span>

            </div>

            {renderPage()}

          </div>

        </main>

      </div>

    </div>
  )
}

export default App