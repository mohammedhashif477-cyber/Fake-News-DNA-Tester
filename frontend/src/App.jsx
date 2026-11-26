import { useState } from 'react'
import {
  LayoutDashboard,
  FileText,
  Image,
  Video,
  FileBarChart,
  Shield,
  Languages,
  Activity,
} from 'lucide-react'

import Dashboard from './pages/Dashboard'
import TextScanner from './pages/TextScanner'
import ImageScanner from './pages/ImageScanner'
import VideoScanner from './pages/VideoScanner'
import DNAReport from './pages/DNAReport'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Text Scanner', icon: FileText },
    { name: 'Image Scanner', icon: Image },
    { name: 'Video Scanner', icon: Video },
    { name: 'DNA Reports', icon: FileBarChart },
  ]

  const renderPage = () => {
  switch (activePage) {
    case 'Dashboard':
      return <Dashboard onNavigate={setActivePage} />

    case 'Text Scanner':
      return <TextScanner />
    case 'Image Scanner':
  return <ImageScanner />
    case 'Video Scanner':
  return <VideoScanner />
    case 'DNA Reports':
  return <DNAReport />

    default:
      return (
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-8">
          <Activity className="text-cyan-400 mb-4" size={30} />

          <h2 className="text-2xl font-semibold mb-3">
            {activePage}
          </h2>

          <p className="text-gray-400">
            This module is currently under development.
          </p>
        </div>
      )
  }
}
  return (
    <div className="min-h-screen bg-[#080b14] text-white flex">

      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[#0d1220] border-r border-gray-800 p-6 flex flex-col">

        <div className="flex items-center gap-3 mb-2">
          <Shield className="text-cyan-400" size={28} />

          <h1 className="text-xl font-bold tracking-wide">
            DNA TESTER
          </h1>
        </div>

        <p className="text-[10px] text-gray-500 tracking-widest mb-10">
          MISINFORMATION INTELLIGENCE
        </p>

        <p className="text-xs text-gray-600 mb-4 tracking-widest">
          MAIN MENU
        </p>

        <nav className="space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <button
                key={item.name}
                onClick={() => setActivePage(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${
                  activePage === item.name
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            )
          })}

        </nav>

        <div className="mt-auto pt-8">

          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <Languages size={15} />
            SUPPORTED LANGUAGES
          </div>

          <p className="text-xs text-gray-400 leading-7">
            English · Hindi · Malayalam · Tamil · Kannada
          </p>

          <div className="mt-8 pt-5 border-t border-gray-800">
            <p className="text-[10px] text-gray-600">
              PROJECT VERSION 1.0
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Fake News DNA Tester
            </p>
          </div>

        </div>

      </aside>

      {/* Main Area */}
      <main className="flex-1 min-w-0 p-8 lg:p-10">

        <header className="flex justify-between items-center mb-10">

          <div>
            <p className="text-xs text-gray-500 tracking-widest mb-2">
              INVESTIGATION CENTER
            </p>

            <h2 className="text-2xl font-semibold">
              {activePage}
            </h2>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>

            <span className="text-xs text-green-400">
              FRONTEND ONLINE
            </span>
          </div>

        </header>

        {renderPage()}

      </main>

    </div>
  )
}

export default App