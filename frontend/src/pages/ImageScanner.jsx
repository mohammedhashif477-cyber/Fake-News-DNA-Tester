import { useEffect, useRef, useState } from 'react'

import {
  Image as ImageIcon,
  Upload,
  Camera,
  ScanSearch,
  Trash2,
  FileText,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Lock,
  Search,
  ArrowRight,
  X,
  RefreshCw,
  FileImage,
} from 'lucide-react'

function ImageScanner() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  const MAX_SIZE = 25 * 1024 * 1024

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
  ]

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const handleFile = (file) => {
    if (!file) return

    setError('')

    const extension = file.name.split('.').pop().toLowerCase()

    const allowedExtensions = [
      'jpg',
      'jpeg',
      'png',
      'webp',
      'heic',
      'heif',
    ]

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(extension)
    ) {
      setError('Unsupported file format. Please upload JPG, PNG, WEBP or HEIC.')
      return
    }

    if (file.size > MAX_SIZE) {
      setError('Image size exceeds 25 MB. Please choose a smaller image.')
      return
    }

    if (file.size === 0) {
      setError('The selected file is empty. Please choose another image.')
      return
    }

    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleFileChange = (event) => {
    handleFile(event.target.files?.[0])
    event.target.value = ''
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragging(false)

    const file = event.dataTransfer.files?.[0]
    handleFile(file)
  }

  const clearImage = () => {
    setImage(null)
    setPreview(null)
    setError('')
    setLoading(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    if (cameraInputRef.current) {
      cameraInputRef.current.value = ''
    }
  }

  const handleAnalyze = () => {
    if (!image) return

    setLoading(true)

    // Real OCR and image analysis will be connected through the backend.
    setTimeout(() => {
      setLoading(false)
      alert(
        'Image uploaded successfully. The forensic analysis engine is not connected yet.'
      )
    }, 800)
  }

  const formatSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <div className="space-y-7">

      {/* Heading */}
      <section className="space-y-2">

        <div className="flex items-center gap-2 text-primary font-code text-xs tracking-wider">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          FORENSIC VISION ENGINE
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">

          <h1 className="font-headline text-2xl md:text-3xl font-bold">
            Image & Screenshot Scanner
          </h1>

          <span className="font-code text-xs text-on-surface-variant bg-surface-container-low px-3 py-2 rounded">
            IMAGE INVESTIGATION
          </span>

        </div>

        <p className="text-sm md:text-base text-on-surface-variant max-w-2xl leading-7">
          Investigate suspicious photographs, screenshots, viral images
          and news graphics using multilingual OCR, visual analysis
          and evidence-based verification.
        </p>

      </section>

      {/* Main Workspace */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

        {/* Upload Area */}
        <div className="lg:col-span-8 space-y-5">

          <div className="gluco-card p-5 md:p-6 space-y-5">

            {/* Drop Zone */}
            {!preview ? (

              <div
                onDragOver={(event) => {
                  event.preventDefault()
                  setDragging(true)
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`min-h-64 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center p-8 cursor-pointer transition ${
                  dragging
                    ? 'border-primary bg-primary/10'
                    : 'border-outline-variant bg-surface-container hover:bg-surface-container-high hover:border-primary/60'
                }`}
              >

                <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-5">
                  <ImageIcon size={30} />
                </div>

                <h2 className="font-headline text-lg font-semibold mb-2">
                  Drop your image here
                </h2>

                <p className="text-sm text-on-surface-variant mb-5">
                  Or browse files from your device
                </p>

                <span className="px-5 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-semibold">
                  Browse Images
                </span>

                <p className="text-xs text-outline mt-5">
                  JPG · PNG · WEBP · HEIC · Maximum 25 MB
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.heic,.heif,image/jpeg,image/png,image/webp,image/heic"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </div>

            ) : (

              /* Image Preview */
              <div className="space-y-4">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs font-code text-primary tracking-wider">
                      IMAGE PREVIEW
                    </p>

                    <h2 className="font-semibold mt-1">
                      Uploaded Image
                    </h2>
                  </div>

                  <button
                    onClick={clearImage}
                    className="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-error transition"
                    title="Remove image"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

                <div className="min-h-64 bg-surface-container-lowest rounded-xl border border-outline-variant flex items-center justify-center overflow-hidden">

                  {image?.type === 'image/heic' ||
                  image?.type === 'image/heif' ||
                  /\.(heic|heif)$/i.test(image?.name || '') ? (

                    <div className="p-8 text-center">
                      <FileImage size={40} className="mx-auto text-primary mb-3" />

                      <p className="font-semibold">
                        HEIC image selected
                      </p>

                      <p className="text-xs text-on-surface-variant mt-2">
                        Preview may not be supported by this browser.
                        The original file is selected.
                      </p>
                    </div>

                  ) : (

                    <img
                      src={preview}
                      alt="Selected image preview"
                      className="max-h-[420px] max-w-full object-contain"
                    />

                  )}

                </div>

                {/* File Information */}
                <div className="bg-surface-container rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <FileImage size={22} />
                    </div>

                    <div className="min-w-0">

                      <p className="text-sm font-semibold truncate">
                        {image.name}
                      </p>

                      <p className="text-xs text-on-surface-variant mt-1">
                        {formatSize(image.size)}
                      </p>

                    </div>

                  </div>

                  <span className="flex items-center gap-2 text-xs text-tertiary shrink-0">
                    <CheckCircle2 size={16} />
                    File selected
                  </span>

                </div>

                {/* Replace */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-sm text-primary hover:text-on-surface transition"
                >
                  <RefreshCw size={16} />
                  Replace Image
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.heic,.heif,image/jpeg,image/png,image/webp,image/heic"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </div>

            )}

            {/* Validation Error */}
            {error && (

              <div className="flex items-start gap-3 bg-error/10 border border-error/30 rounded-lg p-4 text-error">

                <AlertCircle size={18} className="shrink-0 mt-0.5" />

                <p className="text-sm">
                  {error}
                </p>

                <button
                  onClick={() => setError('')}
                  className="ml-auto"
                  aria-label="Dismiss error"
                >
                  <X size={16} />
                </button>

              </div>

            )}

            {/* Action Area */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-outline-variant/30">

              <p className="text-xs text-on-surface-variant flex items-center gap-2">
                <ShieldCheck size={17} className="text-primary shrink-0" />
                OCR and authenticity analysis are not yet connected.
              </p>

              <button
                onClick={handleAnalyze}
                disabled={!image || loading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-semibold text-sm hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >

                {loading ? (
                  <RefreshCw size={18} className="animate-spin" />
                ) : (
                  <ScanSearch size={18} />
                )}

                {loading ? 'Preparing...' : 'Investigate Image'}

              </button>

            </div>

          </div>

          {/* Camera Capture */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={() => cameraInputRef.current?.click()}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition"
          >
            <Camera size={18} />
            Capture image using camera
          </button>

        </div>

        {/* Right Information Panel */}
        <div className="lg:col-span-4 space-y-5">

          {/* Investigation Process */}
          <div className="gluco-card p-5 space-y-5">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <ShieldCheck size={21} />
              </div>

              <h2 className="font-headline font-semibold">
                What happens next?
              </h2>

            </div>

            <p className="text-sm text-on-surface-variant leading-6">
              The planned image investigation workflow includes:
            </p>

            <div className="space-y-4">

              <div className="flex items-start gap-3">

                <FileText size={19} className="text-tertiary shrink-0 mt-0.5" />

                <div>
                  <p className="text-sm font-semibold">
                    OCR Text Extraction
                  </p>

                  <p className="text-xs text-on-surface-variant mt-1 leading-5">
                    Extract text embedded in photographs, notices and screenshots.
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-3">

                <Search size={19} className="text-primary shrink-0 mt-0.5" />

                <div>
                  <p className="text-sm font-semibold">
                    Source Investigation
                  </p>

                  <p className="text-xs text-on-surface-variant mt-1 leading-5">
                    Search for matching images and publicly available source information.
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-3">

                <ScanSearch size={19} className="text-secondary shrink-0 mt-0.5" />

                <div>
                  <p className="text-sm font-semibold">
                    Visual Authenticity
                  </p>

                  <p className="text-xs text-on-surface-variant mt-1 leading-5">
                    Examine available indicators of image manipulation or synthetic generation.
                  </p>
                </div>

              </div>

            </div>

            <div className="bg-surface-container rounded-lg p-3 flex items-start gap-2">

              <Lock size={16} className="text-primary shrink-0 mt-0.5" />

              <p className="text-xs text-on-surface-variant leading-5">
                Image processing and privacy controls will be implemented with the backend.
              </p>

            </div>

          </div>

          {/* Verification Notes */}
          <div className="gluco-card p-5 space-y-4">

            <div className="flex items-center gap-2">
              <Search size={18} className="text-primary" />

              <h3 className="font-semibold text-sm">
                Investigation Checklist
              </h3>
            </div>

            <ul className="space-y-3 text-xs text-on-surface-variant leading-5">

              <li className="flex gap-2">
                <CheckCircle2 size={15} className="text-tertiary shrink-0" />
                Check whether embedded text contains factual claims.
              </li>

              <li className="flex gap-2">
                <CheckCircle2 size={15} className="text-tertiary shrink-0" />
                Compare the image with available source material.
              </li>

              <li className="flex gap-2">
                <CheckCircle2 size={15} className="text-tertiary shrink-0" />
                Examine image metadata when available.
              </li>

              <li className="flex gap-2">
                <CheckCircle2 size={15} className="text-tertiary shrink-0" />
                Separate image authenticity from claim accuracy.
              </li>

            </ul>

          </div>

        </div>

      </section>

      {/* Bottom Information */}
      <section className="gluco-card p-5 flex flex-col sm:flex-row gap-4 items-start">

        <div className="w-11 h-11 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
          <ShieldCheck size={22} />
        </div>

        <div>

          <h3 className="font-semibold mb-1">
            Safe and Transparent Investigation
          </h3>

          <p className="text-sm text-on-surface-variant leading-6">
            GLUCO aims to provide evidence-based image investigation.
            A genuine image can still carry a misleading claim, and
            missing metadata alone does not prove manipulation.
          </p>

        </div>

      </section>

      {/* Backend Status */}
      <div className="flex items-center gap-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">

        <AlertCircle size={19} className="text-yellow-400 shrink-0" />

        <p className="text-xs text-yellow-400">
          IMAGE ANALYSIS ENGINE: BACKEND INTEGRATION PENDING
        </p>

      </div>

    </div>
  )
}

export default ImageScanner