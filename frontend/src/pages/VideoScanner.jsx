import { useEffect, useRef, useState } from 'react'
import {
  Video,
  Upload,
  Link,
  Download,
  Film,
  ShieldCheck,
  AudioLines,
  AlertCircle,
  Trash2,
  Search,
  Lock,
  FileVideo,
  CheckCircle2,
} from 'lucide-react'

function VideoScanner() {
  const [activeTab, setActiveTab] = useState('upload')
  const [video, setVideo] = useState(null)
  const [preview, setPreview] = useState(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [message, setMessage] = useState('')

  const fileInputRef = useRef(null)

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const handleVideoUpload = (file) => {
    if (!file) return

    if (!file.type.startsWith('video/')) {
      setMessage('Please select a valid video file.')
      return
    }

    if (file.size > 100 * 1024 * 1024) {
      setMessage('Video size must not exceed 100 MB.')
      return
    }

    if (preview) URL.revokeObjectURL(preview)

    setVideo(file)
    setPreview(URL.createObjectURL(file))
    setMessage('')
  }

  const clearVideo = () => {
    setVideo(null)
    setPreview(null)
    setMessage('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleInvestigate = () => {
    if (activeTab === 'upload' && !video) {
      setMessage('Please upload a video first.')
      return
    }

    if (activeTab === 'url' && !videoUrl.trim()) {
      setMessage('Please enter a video URL first.')
      return
    }

    setMessage(
      'Video analysis is not connected yet. Backend integration is pending.'
    )
  }

  const handleFetchUrl = () => {
    if (!videoUrl.trim()) {
      setMessage('Please enter a video URL.')
      return
    }

    try {
      const parsedUrl = new URL(videoUrl)

      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('Invalid URL')
      }

      setMessage(
        'URL received. Automatic video retrieval is not implemented yet.'
      )
    } catch {
      setMessage('Please enter a valid URL.')
    }
  }

  return (
    <div className="space-y-7">

      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-5">

        <div>
          <div className="flex items-center gap-2 text-primary-strong text-xs font-semibold tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Forensic Media Verification
            <span className="text-outline">•</span>
            <span className="font-code">MODULE 04</span>
          </div>

          <h1 className="text-3xl font-headline font-bold tracking-tight mb-2">
            Video & Deepfake Scanner
          </h1>

          <p className="text-on-surface-variant max-w-2xl leading-7">
            Investigate viral video clips, speech recordings and news
            broadcasts for manipulated context and potential synthetic media.
          </p>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">

          <ShieldCheck className="text-tertiary" size={25} />

          <div>
            <p className="text-sm font-semibold">Investigation Workspace</p>
            <p className="text-xs text-on-surface-variant font-code">
              Backend integration pending
            </p>
          </div>

        </div>

      </section>

      {/* Main Workspace */}
      <section className="grid min-w-0 grid-cols-1 xl:grid-cols-12 gap-6">

        {/* Left Workspace */}
        <div className="min-w-0 xl:col-span-8">

          <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-5 md:p-7 space-y-6">

            {/* Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4">

              <div className="flex max-w-full flex-wrap gap-1 p-1 rounded-xl bg-surface-container">

                <button
                  onClick={() => {
                    setActiveTab('upload')
                    setMessage('')
                  }}
                  className={`flex min-w-0 items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm transition ${
                    activeTab === 'upload'
                      ? 'bg-surface-container-highest text-on-surface'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Upload size={16} />
                  Upload Clip
                </button>

                <button
                  onClick={() => {
                    setActiveTab('url')
                    setMessage('')
                  }}
                  className={`flex min-w-0 items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm transition ${
                    activeTab === 'url'
                      ? 'bg-surface-container-highest text-on-surface'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Link size={16} />
                  Web & Social Link
                </button>

              </div>

              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <Lock size={14} />
                Local preview only
              </div>

            </div>

            {/* Upload Tab */}
            {activeTab === 'upload' && (

              <div className="space-y-5">

                {!preview ? (

                  <label
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault()
                      handleVideoUpload(event.dataTransfer.files[0])
                    }}
                    className="flex flex-col items-center justify-center text-center min-h-64 p-8 rounded-xl border-2 border-dashed border-outline-variant hover:border-primary bg-surface-container transition cursor-pointer"
                  >

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/mp4,video/quicktime,video/x-matroska,video/webm"
                      onChange={(event) =>
                        handleVideoUpload(event.target.files[0])
                      }
                      className="hidden"
                    />

                    <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary-strong mb-5">
                      <Film size={30} />
                    </div>

                    <h3 className="text-lg font-semibold mb-2">
                      Upload a video file
                    </h3>

                    <p className="text-sm text-on-surface-variant mb-5">
                      Drag and drop your video or browse local files.
                    </p>

                    <span className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-semibold">
                      <Upload size={16} />
                      Browse Videos
                    </span>

                    <p className="text-xs text-outline mt-5 font-code">
                      MP4 · MOV · MKV · WEBM · MAX 100 MB
                    </p>

                  </label>

                ) : (

                  <div className="rounded-xl overflow-hidden bg-surface-container border border-outline-variant/30">

                    <div className="flex justify-between items-center p-4 border-b border-outline-variant/20">

                      <div className="flex items-center gap-2 text-primary-strong text-sm font-semibold">
                        <FileVideo size={18} />
                        VIDEO PREVIEW
                      </div>

                      <button
                        onClick={clearVideo}
                        className="flex items-center gap-2 text-xs text-on-surface-variant hover:text-error"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>

                    </div>

                    <div className="bg-surface-container-lowest">

                      <video
                        src={preview}
                        controls
                        className="w-full max-h-[420px]"
                      />

                    </div>

                    <div className="p-4 space-y-2">

                      <p className="text-sm font-semibold break-all">
                        {video.name}
                      </p>

                      <div className="flex flex-wrap gap-4 text-xs text-on-surface-variant font-code">

                        <span>
                          {(video.size / (1024 * 1024)).toFixed(2)} MB
                        </span>

                        <span>
                          {video.type || 'Unknown format'}
                        </span>

                      </div>

                    </div>

                  </div>

                )}

                {/* URL Input */}
                <div className="space-y-3">

                  <p className="text-xs text-on-surface-variant font-semibold">
                    OR PROVIDE A VIDEO LINK
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">

                    <div className="flex min-w-0 items-center gap-3 flex-1 px-4 h-12 rounded-xl bg-surface-container border border-outline-variant/20">
                      <Link size={18} className="text-outline shrink-0" />

                      <input
                        type="url"
                        value={videoUrl}
                        onChange={(event) => setVideoUrl(event.target.value)}
                        placeholder="Paste a public video URL..."
                        className="w-full bg-transparent text-sm outline-none placeholder:text-outline"
                      />

                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('url')
                        handleFetchUrl()
                      }}
                      className="flex items-center justify-center gap-2 px-5 h-12 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-sm font-semibold transition"
                    >
                      <Download size={17} />
                      Use Link
                    </button>

                  </div>

                </div>

              </div>

            )}

            {/* URL Tab */}
            {activeTab === 'url' && (

              <div className="space-y-5">

                <div className="p-8 rounded-xl bg-surface-container text-center border border-outline-variant/20">

                  <div className="w-16 h-16 mx-auto rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary-strong mb-5">
                    <Link size={30} />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    Investigate a Video Link
                  </h3>

                  <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                    Enter a publicly accessible video URL. Automatic
                    downloading and platform retrieval are not connected yet.
                  </p>

                </div>

                <div className="space-y-3">

                  <label className="text-sm font-medium">
                    Video URL
                  </label>

                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(event) => setVideoUrl(event.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full h-12 px-4 rounded-xl bg-surface-container border border-outline-variant/30 text-sm outline-none focus:border-primary"
                  />

                  <button
                    onClick={handleFetchUrl}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-sm font-semibold transition"
                  >
                    <Search size={17} />
                    Validate Link
                  </button>

                </div>

              </div>

            )}

            {/* Investigation Button */}
            <div className="pt-5 border-t border-outline-variant/20">

              <button
                onClick={handleInvestigate}
                disabled={activeTab === 'upload' && !video}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-primary hover:brightness-110 text-on-primary font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <Video size={19} />
                Investigate Video
              </button>

              {message && (
                <p className="mt-4 text-sm text-warning flex items-start gap-2">
                  <AlertCircle size={17} className="shrink-0 mt-0.5" />
                  {message}
                </p>
              )}

            </div>

          </div>

        </div>

        {/* Right Information Panel */}
        <div className="min-w-0 xl:col-span-4 space-y-5">

          <section className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-primary-strong" size={23} />

              <h2 className="font-semibold">
                How Video Verification Works
              </h2>
            </div>

            <p className="text-sm text-on-surface-variant leading-6 mb-5">
              The planned video investigation workflow includes multiple
              independent verification stages.
            </p>

            <div className="space-y-4">

              <div className="flex gap-3">

                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary-strong flex items-center justify-center shrink-0">
                  <Film size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Frame Examination
                  </h3>

                  <p className="text-xs text-on-surface-variant leading-5 mt-1">
                    Extract keyframes and examine visual context and
                    potential manipulation indicators.
                  </p>
                </div>

              </div>

              <div className="flex gap-3">

                <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <AudioLines size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Audio & Speech Analysis
                  </h3>

                  <p className="text-xs text-on-surface-variant leading-5 mt-1">
                    Extract spoken content, identify claims and examine
                    audio-visual consistency.
                  </p>
                </div>

              </div>

              <div className="flex gap-3">

                <div className="w-8 h-8 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                  <Search size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Source Investigation
                  </h3>

                  <p className="text-xs text-on-surface-variant leading-5 mt-1">
                    Compare available evidence and search for earlier
                    publicly discoverable versions.
                  </p>
                </div>

              </div>

            </div>

          </section>

          {/* Checklist */}
          <section className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-5">

            <h2 className="font-semibold mb-4">
              Investigation Checklist
            </h2>

            <div className="space-y-3 text-sm text-on-surface-variant">

              {[
                'Inspect available video metadata.',
                'Examine selected video frames.',
                'Extract and analyse spoken claims.',
                'Compare audio and visual context.',
                'Investigate source and provenance.',
              ].map((item) => (

                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-tertiary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>

              ))}

            </div>

          </section>

        </div>

      </section>

      {/* Important Notice */}
      <section className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-4">

        <ShieldCheck size={24} className="text-primary-strong shrink-0" />

        <div>
          <h3 className="font-semibold mb-1">
            Responsible Media Investigation
          </h3>

          <p className="text-sm text-on-surface-variant leading-6">
            Edited footage is not automatically misinformation.
            Media authenticity and factual accuracy must be investigated
            separately. Missing metadata alone does not prove manipulation.
          </p>
        </div>

      </section>

      {/* Backend Status */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-warning/5 border border-warning/20">

        <AlertCircle size={18} className="text-warning shrink-0" />

        <p className="text-xs text-warning">
          VIDEO ANALYSIS ENGINE: BACKEND INTEGRATION PENDING
        </p>

      </div>

    </div>
  )
}

export default VideoScanner