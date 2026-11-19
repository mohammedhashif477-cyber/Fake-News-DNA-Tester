import { useState } from 'react'
import {
  Search,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  Image as ImageIcon,
  Film,
  CheckCircle2,
  Languages,
  Activity,
  FileSearch,
} from 'lucide-react'

function Dashboard({ onNavigate }) {
  const [claim, setClaim] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('English')

  const languages = [
    'English',
    'हिन्दी',
    'മലയാളം',
    'தமிழ்',
    'ಕನ್ನಡ',
  ]

  const scanners = [
    {
      title: 'Text & Messages',
      description:
        'Investigate WhatsApp forwards, viral circulars, inflammatory posts and suspicious claims.',
      button: 'Start Text Scan',
      icon: MessageSquare,
      page: 'Text Scanner',
      engine: 'NLP ENGINE',
    },
    {
      title: 'Images & Photos',
      description:
        'Extract text, inspect image information and investigate potentially manipulated media.',
      button: 'Upload Image',
      icon: ImageIcon,
      page: 'Image Scanner',
      engine: 'IMAGE FORENSICS',
    },
    {
      title: 'Videos & Media',
      description:
        'Investigate video claims, suspicious edits and potential synthetic media.',
      button: 'Analyze Video',
      icon: Film,
      page: 'Video Scanner',
      engine: 'VIDEO FORENSICS',
    },
  ]

  const handleInvestigate = () => {
    if (!claim.trim()) return

    sessionStorage.setItem('gluco_pending_claim', claim.trim())
    onNavigate('Text Scanner')
  }

  return (
    <div className="w-full space-y-12">

      {/* Hero Section */}
      <section className="max-w-5xl pt-5 space-y-5">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low text-primary">

          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />

          <span className="font-code text-xs tracking-wide uppercase">
            GLUCO Investigation Engine
          </span>

        </div>

        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Check news, messages, and viral media
        </h1>

        <p className="text-on-surface-variant text-base md:text-lg max-w-2xl leading-relaxed">
          Investigate suspicious WhatsApp forwards, viral photos,
          and video claims through multilingual and
          evidence-based misinformation analysis.
        </p>

        {/* Supported Languages */}
        <div className="flex flex-wrap items-center gap-2 pt-2">

          <span className="text-xs text-outline mr-2">
            Supported languages:
          </span>

          {languages.map((language, index) => (
            <span
              key={language}
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                index === 0
                  ? 'bg-surface-container text-on-surface'
                  : 'bg-surface-container-low text-on-surface-variant'
              }`}
            >
              {language}
            </span>
          ))}

        </div>

      </section>

      {/* Quick Verification */}
      <section className="max-w-5xl">

        <div className="rounded-2xl bg-surface-container-low p-2 focus-within:bg-surface-container transition-colors">

          <div className="flex flex-col sm:flex-row items-center gap-3 p-2">

            <Search size={22} className="text-primary shrink-0 hidden sm:block" />

            <input
              type="text"
              value={claim}
              onChange={(event) => setClaim(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleInvestigate()
              }}
              placeholder="Paste a claim, WhatsApp forward, or suspicious message..."
              className="w-full bg-transparent text-sm text-on-surface placeholder:text-outline outline-none px-2 py-3"
            />

            <button
              onClick={handleInvestigate}
              disabled={!claim.trim()}
              className="w-full sm:w-auto shrink-0 h-11 px-5 rounded-xl bg-primary text-on-primary font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Verify Claim
              <ArrowRight size={17} />
            </button>

          </div>

        </div>

      </section>

      {/* Investigation Modes */}
      <section className="max-w-5xl">

        <div className="flex flex-wrap justify-between items-end gap-3 mb-5">

          <div>
            <h2 className="text-xl font-headline font-semibold">
              What would you like to investigate?
            </h2>

            <p className="text-sm text-on-surface-variant mt-1">
              Select an investigation method.
            </p>
          </div>

          <span className="font-code text-xs text-outline">
            03 MODALITIES
          </span>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {scanners.map((scanner) => {
            const Icon = scanner.icon

            return (
              <article
                key={scanner.title}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/20 hover:border-primary/30 transition-all duration-200"
              >

                <div>

                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <Icon size={25} />
                  </div>

                  <h3 className="text-lg font-semibold mt-6 mb-2 group-hover:text-primary transition-colors">
                    {scanner.title}
                  </h3>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {scanner.description}
                  </p>

                </div>

                <div className="pt-7 flex items-center justify-between gap-2">

                  <button
                    onClick={() => onNavigate(scanner.page)}
                    className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-on-surface transition-colors"
                  >
                    {scanner.button}
                    <ArrowRight size={16} />
                  </button>

                  <span className="text-[9px] font-code text-outline tracking-wider">
                    {scanner.engine}
                  </span>

                </div>

              </article>
            )
          })}

        </div>

      </section>

      {/* Investigation System Information */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">

        <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <ShieldCheck size={21} />
            </div>

            <h3 className="font-semibold">
              Evidence-Based Investigation
            </h3>

          </div>

          <p className="text-sm text-on-surface-variant leading-relaxed">
            GLUCO is designed to examine claims, sources,
            contextual information and available evidence
            instead of relying on a simple fake-or-real label.
          </p>

        </div>

        <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-tertiary">
              <Languages size={21} />
            </div>

            <h3 className="font-semibold">
              Regional Language Intelligence
            </h3>

          </div>

          <p className="text-sm text-on-surface-variant leading-relaxed">
            The project targets misinformation investigation
            across English, Hindi, Malayalam, Tamil and Kannada.
          </p>

        </div>

      </section>

      {/* Recent Investigations */}
      <section className="max-w-5xl pb-8">

        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">

          <div>

            <h2 className="text-xl font-headline font-semibold">
              Recent Investigations
            </h2>

            <p className="text-sm text-on-surface-variant mt-1">
              Your investigation history will appear here.
            </p>

          </div>

          <span className="flex items-center gap-2 text-xs text-tertiary">
            <Activity size={14} />
            Investigation History
          </span>

        </div>

        <div className="rounded-2xl border border-dashed border-outline-variant/50 bg-surface-container-low/50 p-10 flex flex-col items-center text-center">

          <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-outline mb-4">
            <FileSearch size={27} />
          </div>

          <h3 className="font-semibold text-on-surface mb-2">
            No investigations yet
          </h3>

          <p className="text-sm text-on-surface-variant max-w-md leading-relaxed">
            Once you investigate content, your analysis
            history and evidence reports will appear here.
          </p>

        </div>

      </section>

    </div>
  )
}

export default Dashboard