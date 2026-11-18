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
} from 'lucide-react'

function DNAReport() {
  const diagnosticModules = [
    'Claim Extraction',
    'Credibility Scoring',
    'Emotional Manipulation Detection',
    'Logical Fallacy Scanning',
    'Source and Author Analysis',
    'Contextual Bias and Framing Analysis',
  ]

  const reportSections = [
    {
      title: 'Claim Verification',
      description: 'Evidence-based factual claim investigation.',
      icon: Search,
    },
    {
      title: 'Source Intelligence',
      description: 'Source credibility and provenance investigation.',
      icon: Globe,
    },
    {
      title: 'Media Forensics',
      description: 'Image and video authenticity indicators.',
      icon: ShieldCheck,
    },
    {
      title: 'Evidence Analysis',
      description: 'Supporting evidence and conflicting information.',
      icon: FileText,
    },
  ]

  return (
    <div className="space-y-7">

      {/* Introduction */}
      <section>
        <div className="flex items-center gap-3 mb-3">

          <div className="p-3 rounded-xl bg-cyan-500/10">
            <Dna className="text-cyan-400" size={27} />
          </div>

          <div>
            <h1 className="text-xl font-semibold">
              Misinformation DNA Report
            </h1>

            <p className="text-xs text-gray-500">
              EVIDENCE-BASED INVESTIGATION REPORT
            </p>
          </div>

        </div>

        <p className="text-sm text-gray-400 max-w-3xl leading-6">
          A structured investigation report combining claim
          verification, credibility analysis, emotional manipulation,
          logical fallacies, source provenance and media intelligence.
        </p>
      </section>

      {/* Empty Report State */}
      <section className="bg-[#111827] border border-gray-800 rounded-xl p-10 text-center">

        <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-5">
          <Dna className="text-cyan-400" size={34} />
        </div>

        <h2 className="text-xl font-semibold mb-3">
          No Investigation Reports Yet
        </h2>

        <p className="text-sm text-gray-400 max-w-lg mx-auto leading-6">
          Your investigation reports will appear here after
          completing a text, image or video investigation.
          Each report will contain findings, evidence and
          uncertainty information.
        </p>

        <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs">
          <Clock size={14} />
          WAITING FOR FIRST INVESTIGATION
        </div>

      </section>

      {/* Report Structure */}
      <section>

        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            DNA Report Structure
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Information included in a completed investigation report.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {reportSections.map((section) => {
            const Icon = section.icon

            return (
              <div
                key={section.title}
                className="bg-[#111827] border border-gray-800 rounded-xl p-5"
              >

                <div className="flex items-center gap-3 mb-3">
                  <Icon className="text-cyan-400" size={22} />

                  <h3 className="font-semibold">
                    {section.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-400">
                  {section.description}
                </p>

              </div>
            )
          })}

        </div>

      </section>

      {/* Diagnostic Modules */}
      <section className="bg-[#111827] border border-gray-800 rounded-xl p-6">

        <div className="flex items-center gap-3 mb-5">
          <Activity className="text-purple-400" size={22} />

          <h2 className="font-semibold">
            Six Diagnostic Modules
          </h2>
        </div>

        <div className="space-y-3">

          {diagnosticModules.map((module, index) => (

            <div
              key={module}
              className="flex items-center gap-4 bg-[#080b14] border border-gray-800 rounded-lg p-4"
            >

              <span className="text-xs text-cyan-400 font-mono">
                0{index + 1}
              </span>

              <span className="text-sm text-gray-300">
                {module}
              </span>

            </div>

          ))}

        </div>

      </section>

      {/* Possible Findings */}
      <section className="bg-[#111827] border border-gray-800 rounded-xl p-6">

        <div className="flex items-center gap-3 mb-5">
          <AlertTriangle className="text-yellow-400" size={22} />

          <h2 className="font-semibold">
            Claim Investigation Outcomes
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">

          {[
            'Supported',
            'False / Contradicted',
            'Misleading / Out of Context',
            'Conflicting Evidence',
            'Unverified',
            'Insufficient Evidence',
          ].map((outcome) => (

            <span
              key={outcome}
              className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-xs text-gray-300"
            >
              {outcome}
            </span>

          ))}

        </div>

        <p className="text-xs text-gray-500 mt-5 leading-6">
          These are possible claim-level findings, not a single
          overall truth score. Each finding will be accompanied
          by evidence and relevant limitations.
        </p>

      </section>

      {/* Report Status */}
      <div className="flex items-center gap-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">

        <AlertTriangle className="text-yellow-400 shrink-0" size={19} />

        <p className="text-xs text-yellow-400">
          REPORT GENERATION ENGINE: BACKEND INTEGRATION PENDING
        </p>

      </div>

    </div>
  )
}

export default DNAReport