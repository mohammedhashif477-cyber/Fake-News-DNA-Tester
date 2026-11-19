import { useState } from 'react'

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
  X,
} from 'lucide-react'

import Dashboard from './pages/Dashboard'
import TextScanner from './pages/TextScanner'
import ImageScanner from './pages/ImageScanner'
import VideoScanner from './pages/VideoScanner'
import DNAReport from './pages/DNAReport'

function App() {
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
    <div className="min-h-screen bg-surface text-on-surface font-body">

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="md:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-surface-container text-primary"        aria-label="Toggle navigation"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
      className="md:hidden fixed inset-0 bg-black/60 z-40"          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 bg-surface-container-lowest flex flex-col justify-between py-6 border-r border-outline-variant/30 transition-transform duration-300 ${
      mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'        }`}
      >

        <div className="flex flex-col gap-8">

          {/* GLUCO Brand */}
          <div className="px-5 flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
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
                        ? 'bg-surface-container text-primary font-semibold'
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
      <header className="fixed top-0 left-0 md:left-64 right-0 h-16 z-30 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/20">
          <div className="h-full px-5 lg:px-8 flex items-center justify-between gap-4">

            {/* Search */}
            <div className="hidden sm:flex flex-1 max-w-xl">

              <div className="w-full h-10 px-3 rounded-lg bg-surface-container-low flex items-center gap-3 text-on-surface-variant">

                <Search size={17} />

                <input
                  type="text"
                  placeholder="Search verified claims or paste link..."
                  className="w-full bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none"
                />

              </div>

            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3 ml-auto">

              {/* Language Selector */}
              <div className="h-9 px-2 sm:px-3 rounded-lg bg-surface-container-low flex items-center gap-2">

                <Languages size={16} className="text-on-surface-variant" />

                <select
                  value={selectedLanguage}
                  onChange={(event) => setSelectedLanguage(event.target.value)}
                  className="bg-transparent text-xs text-on-surface outline-none cursor-pointer max-w-24"
                  aria-label="Select language"
                >
                  {languages.map((language) => (
                    <option
                      key={language.code}
                      value={language.code}
                      className="bg-surface-container-lowest"
                    >
                      {language.name}
                    </option>
                  ))}
                </select>

              </div>

              {/* Help */}
              <button
                type="button"
                title="Help and documentation"
                className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
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
        <main className="min-h-screen pt-24 pb-8 px-5 md:px-8 bg-surface">
          <div className="max-w-7xl mx-auto">

            {/* Page Heading */}
            <div className="mb-8 flex items-center gap-2">

              <Activity size={15} className="text-primary" />

              <span className="text-[10px] font-semibold tracking-[0.18em] text-on-surface-variant uppercase">
                GLUCO Investigation Center
              </span>

              <span className="text-outline">/</span>

              <span className="text-xs text-primary">
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