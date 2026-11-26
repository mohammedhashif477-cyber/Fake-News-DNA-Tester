import { useState } from 'react'
import {
  FileText,
  Languages,
  ScanSearch,
  Trash2,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react'

function TextScanner() {
  const [text, setText] = useState('')
  const [language, setLanguage] = useState('Auto Detect')
  const [loading, setLoading] = useState(false)

  const languages = [
    'Auto Detect',
    'English',
    'Hindi',
    'Malayalam',
    'Tamil',
    'Kannada',
  ]

  const handleAnalyze = () => {
    if (!text.trim()) return

    setLoading(true)

    // Backend integration will be added later.
    setTimeout(() => {
      setLoading(false)
      alert('Text Scanner interface is ready. Analysis engine is not connected yet.')
    }, 1000)
  }

  const clearText = () => {
    setText('')
  }

  return (
    <div className="space-y-7">

      {/* Introduction */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-cyan-500/10">
            <FileText className="text-cyan-400" size={25} />
          </div>

          <div>
            <h1 className="text-xl font-semibold">
              Text Investigation
            </h1>
            <p className="text-xs text-gray-500">
              CLAIM INTELLIGENCE MODULE
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-400 max-w-3xl leading-6">
          Submit suspicious news, social media posts or claims.
          The platform will investigate the content using
          multilingual intelligence and evidence-based analysis.
        </p>
      </section>

      {/* Input Panel */}
      <section className="bg-[#111827] border border-gray-800 rounded-xl p-6">

        <div className="flex flex-wrap justify-between items-center gap-4 mb-5">

          <div>
            <h2 className="font-semibold">
              Enter Suspicious Content
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Paste the news article, message or claim below.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-cyan-400">
            <Languages size={16} />
            LANGUAGE SUPPORT
          </div>

        </div>

        {/* Language Selection */}
        <div className="mb-5">

          <label className="block text-sm text-gray-400 mb-2">
            Select Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full md:w-64 bg-[#080b14] border border-gray-700 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

        </div>

        {/* Text Area */}
        <div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste suspicious news, social media content or a claim here..."
            rows={10}
            maxLength={10000}
            className="w-full bg-[#080b14] border border-gray-700 rounded-xl p-5 text-sm text-gray-200 placeholder-gray-600 resize-y outline-none focus:border-cyan-500 transition"
          />

          <div className="flex justify-between items-center mt-3">

            <span className="text-xs text-gray-500">
              Maximum 10,000 characters
            </span>

            <span className="text-xs text-gray-500">
              {text.length} / 10,000
            </span>

          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-7">

          <button
            onClick={handleAnalyze}
            disabled={!text.trim() || loading}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed px-6 py-3 rounded-lg text-sm font-medium transition"
          >
            <ScanSearch size={18} />

            {loading ? 'Preparing...' : 'Start Investigation'}
          </button>

          <button
            onClick={clearText}
            className="flex items-center gap-2 border border-gray-700 hover:bg-gray-800 px-5 py-3 rounded-lg text-sm text-gray-300 transition"
          >
            <Trash2 size={16} />
            Clear
          </button>

        </div>

      </section>

      {/* Investigation Information */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">

          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-cyan-400" size={22} />

            <h3 className="font-semibold">
              Investigation Modules
            </h3>
          </div>

          <ul className="space-y-3 text-sm text-gray-400">
            <li>01. Claim Extraction</li>
            <li>02. Credibility Scoring</li>
            <li>03. Emotional Manipulation Detection</li>
            <li>04. Logical Fallacy Scanning</li>
            <li>05. Source and Author Analysis</li>
            <li>06. Contextual Bias and Framing Analysis</li>
          </ul>

        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">

          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-yellow-400" size={22} />

            <h3 className="font-semibold">
              Investigation Guidelines
            </h3>
          </div>

          <ul className="space-y-3 text-sm text-gray-400 leading-6">
            <li>• Submit complete news content whenever possible.</li>
            <li>• Preserve the original language of the claim.</li>
            <li>• Provide source links if available.</li>
            <li>• Findings will include supporting evidence and limitations.</li>
            <li>• Unverified does not automatically mean false.</li>
          </ul>

        </div>

      </section>

      {/* Backend Status */}
      <div className="flex items-center gap-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">

        <AlertCircle className="text-yellow-400 shrink-0" size={19} />

        <p className="text-xs text-yellow-400">
          TEXT ANALYSIS ENGINE: BACKEND INTEGRATION PENDING
        </p>

      </div>

    </div>
  )
}

export default TextScanner