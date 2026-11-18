import { useState, useEffect } from 'react'
import {
  Video,
  Upload,
  ScanSearch,
  Trash2,
  Film,
  AudioLines,
  ShieldCheck,
  AlertCircle,
  Clock,
} from 'lucide-react'

function VideoScanner() {
  const [video, setVideo] = useState(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const handleVideoUpload = (event) => {
    const file = event.target.files[0]

    if (!file) return

    if (!file.type.startsWith('video/')) {
      alert('Please upload a valid video file.')
      return
    }

    if (file.size > 100 * 1024 * 1024) {
      alert('Video size must be less than 100 MB.')
      return
    }

    if (preview) {
      URL.revokeObjectURL(preview)
    }

    setVideo(file)
    setPreview(URL.createObjectURL(file))
  }

  const clearVideo = () => {
    setVideo(null)
    setPreview(null)
  }

  const handleAnalyze = () => {
    if (!video) return

    alert('Video Scanner interface is ready. Backend analysis is not connected yet.')
  }

  return (
    <div className="space-y-7">

      {/* Introduction */}
      <section>
        <div className="flex items-center gap-3 mb-3">

          <div className="p-3 rounded-xl bg-purple-500/10">
            <Video className="text-purple-400" size={25} />
          </div>

          <div>
            <h1 className="text-xl font-semibold">
              Video Investigation
            </h1>

            <p className="text-xs text-gray-500">
              VIDEO FORENSICS MODULE
            </p>
          </div>

        </div>

        <p className="text-sm text-gray-400 max-w-3xl leading-6">
          Investigate suspicious viral videos, news clips and
          social media footage. The system is designed to examine
          video frames, extract spoken content and investigate
          the context and authenticity of the media.
        </p>
      </section>

      {/* Upload Panel */}
      <section className="bg-[#111827] border border-gray-800 rounded-xl p-6">

        <div className="mb-5">
          <h2 className="font-semibold">
            Upload Video
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Supported formats depend on your browser. Maximum 100 MB.
          </p>
        </div>

        {!preview ? (

          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-purple-500 rounded-xl p-12 cursor-pointer transition bg-[#080b14]">

            <Upload size={36} className="text-purple-400 mb-4" />

            <h3 className="text-sm font-semibold mb-2">
              Drop your video here or browse
            </h3>

            <p className="text-xs text-gray-500">
              Upload a video for investigation
            </p>

            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
              onChange={handleVideoUpload}
              className="hidden"
            />

          </label>

        ) : (

          <div className="bg-[#080b14] border border-gray-700 rounded-xl p-5">

            <div className="flex justify-between items-center mb-4">

              <h3 className="text-sm font-semibold text-purple-400">
                VIDEO PREVIEW
              </h3>

              <button
                onClick={clearVideo}
                className="text-gray-400 hover:text-red-400 transition"
              >
                <Trash2 size={18} />
              </button>

            </div>

            <video
              src={preview}
              controls
              className="w-full max-h-96 rounded-lg bg-black"
            />

            <div className="mt-4 text-xs text-gray-400 break-all">
              <p>Filename: {video.name}</p>

              <p className="mt-1">
                Size: {(video.size / (1024 * 1024)).toFixed(2)} MB
              </p>

              <p className="mt-1">
                Format: {video.type || 'Unknown'}
              </p>
            </div>

          </div>

        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-6">

          <button
            onClick={handleAnalyze}
            disabled={!video}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed px-6 py-3 rounded-lg text-sm font-medium transition"
          >
            <ScanSearch size={18} />
            Investigate Video
          </button>

          <button
            onClick={clearVideo}
            disabled={!video}
            className="flex items-center gap-2 border border-gray-700 hover:bg-gray-800 disabled:opacity-40 px-5 py-3 rounded-lg text-sm text-gray-300 transition"
          >
            <Trash2 size={17} />
            Clear Video
          </button>

        </div>

      </section>

      {/* Investigation Modules */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">

          <div className="flex items-center gap-3 mb-4">
            <Film className="text-purple-400" size={22} />

            <h3 className="font-semibold">
              Video Intelligence
            </h3>
          </div>

          <ul className="space-y-3 text-sm text-gray-400">
            <li>01. Video Metadata Inspection</li>
            <li>02. Keyframe Extraction</li>
            <li>03. Visual Context Analysis</li>
            <li>04. Frame Manipulation Indicators</li>
            <li>05. Original Source Investigation</li>
            <li>06. Cross-Modal Consistency Analysis</li>
          </ul>

        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">

          <div className="flex items-center gap-3 mb-4">
            <AudioLines className="text-cyan-400" size={22} />

            <h3 className="font-semibold">
              Audio Intelligence
            </h3>
          </div>

          <ul className="space-y-3 text-sm text-gray-400">
            <li>01. Audio Extraction</li>
            <li>02. Speech-to-Text Conversion</li>
            <li>03. Multilingual Speech Analysis</li>
            <li>04. Spoken Claim Identification</li>
            <li>05. Audio-Visual Consistency</li>
            <li>06. AI-Generated Media Indicators</li>
          </ul>

        </div>

      </section>

      {/* Guidelines */}
      <section className="bg-[#111827] border border-gray-800 rounded-xl p-6">

        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="text-cyan-400" size={22} />

          <h3 className="font-semibold">
            Investigation Guidelines
          </h3>
        </div>

        <ul className="space-y-3 text-sm text-gray-400 leading-6">
          <li>• Upload the clearest available video.</li>
          <li>• Preserve the original video whenever possible.</li>
          <li>• Edited footage is not automatically misinformation.</li>
          <li>• Media authenticity and factual accuracy are investigated separately.</li>
          <li>• AI-generated media indicators require additional forensic validation.</li>
        </ul>

      </section>

      {/* Status */}
      <div className="flex items-center gap-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">

        <AlertCircle className="text-yellow-400 shrink-0" size={19} />

        <p className="text-xs text-yellow-400">
          VIDEO ANALYSIS ENGINE: BACKEND INTEGRATION PENDING
        </p>

      </div>

    </div>
  )
}

export default VideoScanner