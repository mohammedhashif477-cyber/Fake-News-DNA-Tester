import {
  FileText,
  Image,
  Video,
  ShieldCheck,
  Activity,
  Search,
  ArrowUpRight,
} from 'lucide-react'

function Dashboard({ onNavigate }) {
  const scanners = [
    {
      title: 'Text Investigation',
      description: 'Analyze claims and identify misleading information.',
      icon: FileText,
      page: 'Text Scanner',
      tag: 'TEXT ANALYSIS',
    },
    {
      title: 'Image Investigation',
      description: 'Extract text and investigate image authenticity.',
      icon: Image,
      page: 'Image Scanner',
      tag: 'IMAGE FORENSICS',
    },
    {
      title: 'Video Investigation',
      description: 'Examine video content, context and media authenticity.',
      icon: Video,
      page: 'Video Scanner',
      tag: 'VIDEO FORENSICS',
    },
  ]

  return (
    <div className="space-y-8">

      {/* Welcome Section */}
      <section>
        <p className="text-cyan-400 text-xs tracking-[0.3em] mb-3">
          INTELLIGENCE OVERVIEW
        </p>

        <h1 className="text-3xl font-bold mb-3">
          Welcome to DNA Tester
        </h1>

        <p className="text-gray-400 max-w-2xl">
          Investigate suspicious information through intelligent,
          multilingual and evidence-based misinformation analysis.
        </p>
      </section>

      {/* System Status */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <ShieldCheck className="text-cyan-400 mb-3" size={25} />
          <p className="text-gray-400 text-sm">Investigation Platform</p>
          <h3 className="text-lg font-semibold mt-1">Ready for Development</h3>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <Activity className="text-purple-400 mb-3" size={25} />
          <p className="text-gray-400 text-sm">Analysis Engine</p>
          <h3 className="text-lg font-semibold mt-1">Under Development</h3>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <Search className="text-green-400 mb-3" size={25} />
          <p className="text-gray-400 text-sm">Supported Languages</p>
          <h3 className="text-lg font-semibold mt-1">05 Languages</h3>
        </div>

      </section>

      {/* Investigation Modules */}
      <section>

        <div className="mb-5">
          <h2 className="text-xl font-semibold">Start an Investigation</h2>
          <p className="text-sm text-gray-500 mt-1">
            Select the type of content you want to investigate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {scanners.map((scanner) => {
            const Icon = scanner.icon

            return (
              <div
                key={scanner.title}
                className="bg-[#111827] border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition group"
              >

                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-cyan-500/10 rounded-lg">
                    <Icon size={25} className="text-cyan-400" />
                  </div>

                  <span className="text-[10px] text-gray-500 tracking-widest">
                    {scanner.tag}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2">
                  {scanner.title}
                </h3>

                <p className="text-sm text-gray-400 leading-6">
                  {scanner.description}
                </p>

                <button
                  onClick={() => onNavigate(scanner.page)}
                  className="mt-7 flex items-center gap-2 text-sm text-cyan-400 hover:text-white transition"
                >
                  Start Investigation
                  <ArrowUpRight size={16} />
                </button>

              </div>
            )
          })}

        </div>
      </section>

      {/* Language Support */}
      <section className="bg-[#111827] border border-gray-800 rounded-xl p-6">

        <h2 className="text-lg font-semibold mb-3">
          Regional Language Intelligence
        </h2>

        <p className="text-sm text-gray-400 mb-5">
          The platform is designed to investigate misinformation
          across five supported languages.
        </p>

        <div className="flex flex-wrap gap-3">
          {['English', 'Hindi', 'Malayalam', 'Tamil', 'Kannada'].map(
            (language) => (
              <span
                key={language}
                className="px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm"
              >
                {language}
              </span>
            )
          )}
        </div>

      </section>

      {/* Recent Activity */}
      <section className="bg-[#111827] border border-gray-800 rounded-xl p-6">

        <h2 className="text-lg font-semibold mb-2">
          Recent Investigations
        </h2>

        <p className="text-sm text-gray-500">
          Your investigation history will appear here once the
          backend and analysis engine are connected.
        </p>

        <div className="mt-5 text-xs text-yellow-500">
          SYSTEM STATUS: ANALYSIS ENGINE UNDER DEVELOPMENT
        </div>

      </section>

    </div>
  )
}

export default Dashboard