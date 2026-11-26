import { useEffect, useState } from 'react'

import {
  Search,
  ClipboardPaste,
  Delete,
  ShieldCheck,
  Info,
  FileText,
  AlertCircle,
  Sparkles,
  Lock,
} from 'lucide-react'
import LanguageDropdown from '../components/LanguageDropdown'

function TextScanner() {
  const [text, setText] = useState('')
  const [language, setLanguage] = useState('auto')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [result, setResult] = useState(null)

  // Retrieve a claim transferred from the Dashboard
  useEffect(() => {
    const pendingClaim = sessionStorage.getItem('gluco_pending_claim')

    if (pendingClaim) {
      setText(pendingClaim)
      sessionStorage.removeItem('gluco_pending_claim')
    }
  }, [])

  // Supported languages
  const languages = [
    { code: 'auto', name: 'Auto-detect language' },
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  ]

  // Sample claims
  const samples = [
    {
      title: 'Bank closure rumour',
      color: 'bg-error',
      text: 'Urgent notice from Reserve Bank: All regional cooperative banks will freeze automated teller accounts past 11:59 PM today due to mandatory centralized security audits. Share with immediate family.',
    },
    {
      title: 'Exam paper leak',
      color: 'bg-secondary',
      text: 'Central Staff Selection exam question paper leaked for Set C mathematics section. Answer keys circulating on private chat groups with registration code WB-2024. Exam postponed indefinitely.',
    },
    {
      title: 'Subsidy scheme',
      color: 'bg-tertiary',
      text: 'Government launched Free Solar Panel Scheme 2025. All electricity consumers receiving under 300 units can apply through third-party portal link to claim 100% subsidy before Monday.',
    },
  ]

  // Estimated token count
  const estimatedTokens = Math.ceil(text.length / 4)

  // Clear input
  const handleClear = () => {
    setText('')
    setStatus('idle')
    setMessage('')
    setResult(null)
  }

  // Clipboard paste
  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()

      if (clipboardText) {
        setText(clipboardText.slice(0, 5000))
        setStatus('idle')
        setMessage('')
        setResult(null)
      }
    } catch {
      setMessage('Clipboard access is unavailable. Please paste your text manually.')
    }
  }

  // Select sample claim
  const handleSample = (sampleText) => {
    setText(sampleText)
    setStatus('idle')
    setMessage('')
    setResult(null)
  }

  // Investigation action
  const handleInvestigate = async () => {
    console.log("Investigate button clicked");
  if (!text.trim()) {
    setMessage('Please enter a claim before starting an investigation.')
    setStatus('error')
    return
  }

  setStatus('loading')
  setMessage('')
  setResult(null)

  try {
    const response = await fetch(
      'http://127.0.0.1:8000/api/v1/analyze/text',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          language: language,
          domain: 'auto',
          include_provenance: false,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      const errorMessage =
        typeof data.detail === 'string'
          ? data.detail
          : 'The backend could not process this request.'

      throw new Error(errorMessage)
    }

    setResult(data)
    setStatus('success')
  } catch (error) {
    setStatus('error')

    setMessage(
      error.message ||
        'Unable to connect to the backend. Please check that the API server is running.'
    )
  }
}

  return (
    <div className="flex flex-col gap-7">

      {/* Header */}
      <section className="flex flex-col gap-3">

        <div className="flex items-center gap-2 text-primary-strong font-code text-xs uppercase tracking-wider">

          <Search size={17} />

          <span>Forensic Semantic Pipeline</span>

          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />

        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">

          <div>

            <h1 className="text-2xl md:text-3xl font-headline font-semibold tracking-tight">
              Text & Message Scanner
            </h1>

            <p className="text-sm md:text-base text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
              Investigate WhatsApp forwards, social media posts and news
              articles across supported Indian languages using
              evidence-based misinformation analysis.
            </p>

          </div>

          <div className="flex items-center gap-2 text-xs text-on-surface-variant bg-surface-container-low px-4 py-2 rounded-full w-fit">

            <Lock size={14} className="text-tertiary" />

            <span>Investigation Workspace</span>

          </div>

        </div>

      </section>

      {/* Main Investigation Workspace */}
      <section className="min-w-0 bg-surface-container rounded-2xl border border-outline-variant/20 shadow-xl p-4 md:p-6 flex flex-col gap-5">

        {/* Top Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">

          {/* Language Selector */}
          <LanguageDropdown
            value={language}
            onChange={setLanguage}
            options={languages}
          />

          {/* Input Actions */}
          <div className="flex flex-wrap items-center gap-2">

            <button
              type="button"
              onClick={handlePaste}
              className="flex shrink-0 items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition text-xs whitespace-nowrap"
            >
              <ClipboardPaste size={15} />
              Paste Clipboard
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="flex shrink-0 items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-error transition text-xs whitespace-nowrap"
            >
              <Delete size={15} />
              Clear
            </button>

          </div>

        </div>

        {/* Text Input */}
        <div className="relative min-w-0 bg-surface-container-lowest rounded-xl border border-outline-variant/30 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/10 transition-all p-4">

          <textarea
            value={text}
            onChange={(event) => {
              setText(event.target.value)
              setStatus('idle')
              setMessage('')
              setResult(null)
            }}
            placeholder="Paste a WhatsApp message, news headline or suspicious viral claim here..."
            rows={8}
            maxLength={5000}
            className="block w-full min-w-0 max-w-full bg-transparent text-base text-on-surface placeholder:text-outline outline-none resize-y leading-relaxed"
          />

          <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">

            <span className="text-xs text-outline">
              Preserve the original language of the claim.
            </span>

            <span className="font-code text-xs text-outline">
              {text.length.toLocaleString()} / 5,000
            </span>

          </div>

        </div>

        {/* Sample Claims */}
        <div className="flex flex-col gap-3">

          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <Sparkles size={15} className="text-primary-strong" />
            TRY A SAMPLE CLAIM
          </div>

          <div className="flex flex-wrap gap-2">

            {samples.map((sample) => (
              <button
                key={sample.title}
                type="button"
                onClick={() => handleSample(sample.text)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/20 text-xs text-on-surface transition"
              >

                <span className={`w-1.5 h-1.5 rounded-full ${sample.color}`} />

                {sample.title}

              </button>
            ))}

          </div>

        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">

          <div className="flex items-center gap-3 text-xs text-outline font-code">

            <span>{text.trim() ? estimatedTokens.toLocaleString() : 0} estimated tokens</span>

            <span>•</span>

            <span>Maximum 5,000 characters</span>

          </div>

          <button
            type="button"
            onClick={handleInvestigate}
            disabled={!text.trim()}
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-primary text-on-primary font-headline font-semibold hover:brightness-110 active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >

            <Search size={19} />

            Investigate Content

          </button>

        </div>

      </section>

      
{/* Investigation Status */}
{status === 'loading' && (
  <section className="bg-surface-container-low border border-primary/20 rounded-xl p-5">
    <div className="flex items-start gap-3">
      <AlertCircle className="text-primary-strong shrink-0 mt-0.5" size={21} />

      <div>
        <h3 className="font-semibold text-on-surface">
          Analyzing Content...
        </h3>

        <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
          Sending your text to the analysis engine. Please wait.
        </p>

        <p className="text-xs text-outline mt-3">
          Preliminary investigation · No final verdict
        </p>
      </div>
    </div>
  </section>
)}


      {/* General Message */}
      {message && status !== 'loading' && (

        <div className="flex items-center gap-3 bg-surface-container-low border border-outline-variant/30 rounded-lg p-4">

          <Info size={18} className="text-primary-strong shrink-0" />

          <p className="text-sm text-on-surface-variant">
            {message}
          </p>

        </div>

      )}
      
{/* Analysis Results */}
{result && (
  <section className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/20">
    <h2 className="text-xl font-semibold mb-3">
      Analysis Results
    </h2>

    <p className="text-sm text-on-surface-variant mb-5 leading-relaxed">
      {result.message}
    </p>

    <div className="rounded-lg bg-surface-container-lowest p-4 overflow-x-auto">
      <h3 className="font-semibold text-sm mb-3">
        Investigation Data
      </h3>

      <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-on-surface-variant">
        {JSON.stringify(result.input, null, 2)}
      </pre>
    </div>

    <p className="text-xs text-amber-400 mt-4 leading-relaxed">
      Preliminary analysis only. Evidence candidates and textual
      indicators are not verified facts or a final truth verdict.
    </p>
  </section>
)}

      {/* Investigation Information */}
      <section className="grid min-w-0 grid-cols-1 md:grid-cols-2 items-stretch gap-4">

        {/* What We Investigate */}
        <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/20">

          <div className="flex items-center gap-3 mb-4">

            <ShieldCheck size={21} className="text-primary-strong" />

            <h2 className="font-semibold">
              What GLUCO Investigates
            </h2>

          </div>

          <div className="space-y-3 text-sm text-on-surface-variant">

            <p>01. Claim Extraction and Verification</p>
            <p>02. Source and Author Analysis</p>
            <p>03. Emotional Manipulation Detection</p>
            <p>04. Logical Fallacy Scanning</p>
            <p>05. Contextual Bias and Framing</p>
            <p>06. Evidence and Context Analysis</p>

          </div>

        </div>

        {/* Investigation Guidelines */}
        <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/20">

          <div className="flex items-center gap-3 mb-4">

            <AlertCircle size={21} className="text-secondary" />

            <h2 className="font-semibold">
              Investigation Guidelines
            </h2>

          </div>

          <div className="space-y-3 text-sm text-on-surface-variant leading-relaxed">

            <p>• Submit complete news content whenever possible.</p>

            <p>• Preserve the original language of the claim.</p>

            <p>• Include source links if available.</p>

            <p>• Findings should include supporting evidence and limitations.</p>

            <p>• Unverified does not automatically mean false.</p>

          </div>

        </div>

      </section>

      {/* Technical Information */}
      <section className="bg-surface-container-low rounded-xl border border-outline-variant/20 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">

        <div className="w-11 h-11 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">

          <FileText size={22} className="text-primary-strong" />

        </div>

        <div>

          <h3 className="font-semibold">
            Evidence-Based Investigation
          </h3>

          <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
            GLUCO is designed to examine claims, sources and available
            evidence rather than relying on a simple fake-or-real label.
            Results will be displayed when the analysis engine is connected.
          </p>

        </div>

      </section>

    </div>
  )
}

export default TextScanner