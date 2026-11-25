import { useState } from 'react'
import {
  Dna,
  FileText,
  ShieldCheck,
  Search,
  Globe,
  AlertTriangle,
  Activity,
  Clock,
  ExternalLink,
  ChevronDown,
  History,
  BookOpen,
  Microscope,
  Scale,
  Languages,
  Image,
  Lock,
  Info,
} from 'lucide-react'

function DNAReport() {
  const [expandedModules, setExpandedModules] = useState([])

  const diagnosticModules = [
    {
      title: 'Claim Extraction and Verification',
      description:
        'Identifies individual factual claims and evaluates them against available evidence.',
      icon: Search,
    },
    {
      title: 'Credibility Scoring',
      description:
        'Examines source reliability, evidence quality and available credibility indicators.',
      icon: ShieldCheck,
    },
    {
      title: 'Emotional Manipulation Detection',
      description:
        'Identifies urgency, fear, outrage and other persuasive emotional patterns.',
      icon: Activity,
    },
    {
      title: 'Logical Fallacy Scanning',
      description:
        'Examines reasoning patterns for common logical fallacies and unsupported conclusions.',
      icon: Scale,
    },
    {
      title: 'Source and Author Analysis',
      description:
        'Investigates identifiable publishers, authors and publicly available source information.',
      icon: Globe,
    },
    {
      title: 'Contextual Bias and Framing',
      description:
        'Examines framing, missing context and potential political or communal bias.',
      icon: Languages,
    },
  ]

  const outcomes = [
    'Supported',
    'False / Contradicted',
    'Misleading / Out of Context',
    'Conflicting Evidence',
    'Unverified',
    'Insufficient Evidence',
  ]

  const toggleModule = (index) => {
    setExpandedModules((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    )
  }

  return (
    <div className="w-full min-w-0 space-y-7">

      {/* Report Header */}
      <section className="space-y-4">

        <div className="flex flex-wrap items-center justify-between gap-3">

          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <ShieldCheck size={16} className="text-primary-strong" />

            <span className="text-primary-strong font-mono">
              GLUCO INVESTIGATION ENGINE
            </span>

            <span>/</span>
            <span>DNA Reports</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-warning">
            <span className="w-2 h-2 rounded-full bg-warning" />
            REPORT ENGINE UNDER DEVELOPMENT
          </div>

        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">

            <div className="p-3 rounded-xl bg-primary/10">
              <Dna className="text-primary-strong" size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold">
                Misinformation DNA Report
              </h1>

              <p className="text-xs text-outline mt-1 font-mono">
                EVIDENCE-BASED INVESTIGATION RECORD
              </p>
            </div>

          </div>

          <p className="text-sm text-on-surface-variant max-w-3xl leading-6">
            A structured investigation record combining factual claim
            verification, source intelligence, media forensics,
            contextual analysis and supporting evidence.
          </p>
        </div>

      </section>

      {/* Report Status */}
      <section className="bg-surface-container-low border border-outline-variant rounded-xl p-6">

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div className="space-y-3">

            <div className="flex flex-wrap items-center gap-2">

              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-warning/10 border border-warning/20 text-warning text-xs">
                <Clock size={14} />
                No Report Available
              </span>

              <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs">
                Waiting for Investigation
              </span>

            </div>

            <h2 className="text-xl font-semibold">
              No Investigation Selected
            </h2>

            <p className="text-sm text-on-surface-variant max-w-2xl leading-6">
              Complete a text, image or video investigation to
              generate a detailed Misinformation DNA Report.
              Findings and evidence will appear here once
              the analysis engine is connected.
            </p>

          </div>

          <div className="flex items-center justify-center min-w-32">

            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Dna size={42} className="text-primary-strong" />
            </div>

          </div>

        </div>

      </section>

      {/* Main Report Layout */}
      <div className="grid min-w-0 grid-cols-1 xl:grid-cols-12 gap-5">

        {/* Main Investigation Area */}
        <div className="min-w-0 xl:col-span-8 space-y-5">

          {/* Executive Summary */}
          <section className="bg-surface-container-low border border-outline-variant rounded-xl p-6">

            <div className="flex items-center gap-3 mb-5">

              <FileText size={21} className="text-primary-strong" />

              <h2 className="font-semibold">
                Executive Investigation Summary
              </h2>

            </div>

            <div className="bg-surface-container-lowest border border-dashed border-outline-variant/70 rounded-lg p-6 text-center">

              <Info size={25} className="text-outline mx-auto mb-3" />

              <p className="text-sm text-on-surface-variant">
                The investigation summary will appear here
                after a completed analysis.
              </p>

            </div>

          </section>

          {/* Claim-Level Breakdown */}
          <section className="bg-surface-container-low border border-outline-variant rounded-xl p-6">

            <div className="flex items-center justify-between mb-5">

              <div className="flex items-center gap-3">
                <Search size={21} className="text-primary-strong" />

                <h2 className="font-semibold">
                  Specific Claims Tested
                </h2>
              </div>

              <span className="text-xs text-outline font-mono">
                0 CLAIMS
              </span>

            </div>

            <div className="bg-surface-container-lowest border border-dashed border-outline-variant/70 rounded-lg p-5 text-center">

              <p className="text-sm text-outline">
                Individual factual claims and their evidence-based
                findings will be displayed here.
              </p>

            </div>

          </section>

          {/* Six Diagnostic Dimensions */}
          <section className="bg-surface-container-low border border-outline-variant rounded-xl p-6">

            <div className="flex flex-wrap justify-between items-center gap-3 mb-5">

              <div className="flex items-center gap-3">
                <Microscope size={22} className="text-primary-strong" />

                <h2 className="font-semibold">
                  Six Forensic Diagnostic Dimensions
                </h2>
              </div>

              <span className="text-xs text-outline">
                Click to expand
              </span>

            </div>

            <div className="space-y-2">

              {diagnosticModules.map((module, index) => {
                const Icon = module.icon
                const isExpanded = expandedModules.includes(index)

                return (
                  <div
                    key={module.title}
                    className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden"
                  >

                    <button
                      onClick={() => toggleModule(index)}
                      className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-surface-container-high transition"
                    >

                      <div className="flex items-center gap-3 min-w-0">

                        <Icon
                          size={19}
                          className="text-primary-strong shrink-0"
                        />

                        <div className="min-w-0">

                          <p className="text-sm text-on-surface font-medium">
                            {module.title}
                          </p>

                          <p className="text-xs text-outline mt-1">
                            Diagnostic Module 0{index + 1}
                          </p>

                        </div>

                      </div>

                      <ChevronDown
                        size={18}
                        className={`text-outline shrink-0 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />

                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-outline-variant">

                        <p className="text-sm text-on-surface-variant leading-6">
                          {module.description}
                        </p>

                        <p className="text-xs text-warning mt-3">
                          Analysis results will appear after backend integration.
                        </p>

                      </div>
                    )}

                  </div>
                )
              })}

            </div>

          </section>

          {/* Source Provenance */}
          <section className="bg-surface-container-low border border-outline-variant rounded-xl p-6">

            <div className="flex items-center gap-3 mb-5">

              <History size={22} className="text-primary-strong" />

              <h2 className="font-semibold">
                Source Provenance & Mutation History
              </h2>

            </div>

            <div className="bg-surface-container-lowest border border-dashed border-outline-variant/70 rounded-lg p-6 text-center">

              <Globe size={25} className="text-outline mx-auto mb-3" />

              <p className="text-sm text-on-surface-variant">
                Publicly discoverable source references and
                available content history will appear here.
              </p>

              <p className="text-xs text-outline mt-2">
                The earliest source found will not necessarily
                be the original source.
              </p>

            </div>

          </section>

        </div>

        {/* Evidence Sidebar */}
        <aside className="min-w-0 xl:col-span-4 space-y-5">

          {/* Claim Outcomes */}
          <section className="bg-surface-container-low border border-outline-variant rounded-xl p-5">

            <div className="flex items-center gap-3 mb-4">

              <Scale size={20} className="text-primary-strong" />

              <h3 className="font-semibold">
                Claim Investigation Outcomes
              </h3>

            </div>

            <div className="space-y-2">

              {outcomes.map((outcome) => (

                <div
                  key={outcome}
                  className="px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant text-xs text-on-surface-variant"
                >
                  {outcome}
                </div>

              ))}

            </div>

            <p className="text-xs text-outline leading-5 mt-4">
              Findings are assigned to individual claims.
              Unverified does not automatically mean false.
            </p>

          </section>

          {/* Primary Evidence */}
          <section className="bg-surface-container-low border border-outline-variant rounded-xl p-5">

            <div className="flex items-center gap-3 mb-4">

              <BookOpen size={20} className="text-primary-strong" />

              <h3 className="font-semibold">
                Primary Evidence Sources
              </h3>

            </div>

            <div className="bg-surface-container-lowest border border-dashed border-outline-variant/70 rounded-lg p-5 text-center">

              <FileText size={24} className="text-outline mx-auto mb-3" />

              <p className="text-xs text-on-surface-variant">
                Supporting sources and reference links
                will be listed here.
              </p>

            </div>

          </section>

          {/* Forward vs Reality */}
          <section className="bg-surface-container-low border border-outline-variant rounded-xl p-5">

            <div className="flex items-center gap-3 mb-4">

              <Activity size={20} className="text-secondary" />

              <h3 className="font-semibold">
                Claim vs Evidence
              </h3>

            </div>

            <p className="text-sm text-on-surface-variant leading-6">
              GLUCO will compare submitted claims against
              available evidence and relevant context.
            </p>

            <div className="mt-4 space-y-3">

              <div className="bg-surface-container-lowest rounded-lg p-3">
                <p className="text-xs text-error font-medium mb-1">
                  SUBMITTED CLAIM
                </p>

                <p className="text-xs text-outline">
                  Original claim will appear here.
                </p>
              </div>

              <div className="bg-surface-container-lowest rounded-lg p-3">
                <p className="text-xs text-tertiary font-medium mb-1">
                  AVAILABLE EVIDENCE
                </p>

                <p className="text-xs text-outline">
                  Supporting or conflicting evidence will appear here.
                </p>
              </div>

            </div>

          </section>

          {/* Limitations */}
          <section className="bg-surface-container-low border border-outline-variant rounded-xl p-5">

            <div className="flex items-center gap-3 mb-4">

              <Lock size={19} className="text-primary-strong" />

              <h3 className="font-semibold">
                Limitations & Scope
              </h3>

            </div>

            <div className="space-y-3 text-xs text-on-surface-variant leading-5">

              <p>
                • Findings depend on the quality and availability
                of supporting evidence.
              </p>

              <p>
                • Missing metadata does not prove manipulation.
              </p>

              <p>
                • Media authenticity and factual accuracy are
                investigated separately.
              </p>

              <p>
                • Source tracing identifies publicly discoverable
                references, not necessarily the original creator.
              </p>

            </div>

          </section>

        </aside>

      </div>

      {/* Backend Status */}
      <div className="flex items-center gap-3 bg-warning/5 border border-warning/20 rounded-lg p-4">

        <AlertTriangle
          className="text-warning shrink-0"
          size={19}
        />

        <p className="text-xs text-warning">
          DNA REPORT GENERATION ENGINE: BACKEND INTEGRATION PENDING
        </p>

      </div>

    </div>
  )
}

export default DNAReport