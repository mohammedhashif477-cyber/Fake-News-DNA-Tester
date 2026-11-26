import { useState } from 'react'
import {
  Image,
  Upload,
  Camera,
  ScanSearch,
  Trash2,
  FileText,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react'

function ImageScanner() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10 MB.')
      return
    }

    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const clearImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }

    setImage(null)
    setPreview(null)
  }

  const handleAnalyze = () => {
    if (!image) return

    alert('Image Scanner interface is ready. Backend analysis is not connected yet.')
  }

  return (
    <div className="space-y-7">

      {/* Introduction */}
      <section>
        <div className="flex items-center gap-3 mb-3">

          <div className="p-3 rounded-xl bg-purple-500/10">
            <Image className="text-purple-400" size={25} />
          </div>

          <div>
            <h1 className="text-xl font-semibold">
              Image Investigation
            </h1>

            <p className="text-xs text-gray-500">
              VISUAL INTELLIGENCE MODULE
            </p>
          </div>

        </div>

        <p className="text-sm text-gray-400 max-w-3xl leading-6">
          Upload suspicious images, viral photographs, screenshots
          or news graphics. The platform will eventually extract
          embedded text and investigate image authenticity and context.
        </p>
      </section>

      {/* Upload Section */}
      <section className="bg-[#111827] border border-gray-800 rounded-xl p-6">

        <div className="mb-5">
          <h2 className="font-semibold">
            Upload Image
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Supported formats: JPG, JPEG, PNG and WEBP. Maximum 10 MB.
          </p>
        </div>

        {!preview ? (

          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-purple-500 rounded-xl p-12 cursor-pointer transition bg-[#080b14]">

            <Upload size={35} className="text-purple-400 mb-4" />

            <h3 className="text-sm font-semibold mb-2">
              Drop your image here or browse
            </h3>

            <p className="text-xs text-gray-500">
              Upload an image for investigation
            </p>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />

          </label>

        ) : (

          <div className="bg-[#080b14] border border-gray-700 rounded-xl p-5">

            <div className="flex justify-between items-center mb-4">

              <h3 className="text-sm font-semibold text-purple-400">
                IMAGE PREVIEW
              </h3>

              <button
                onClick={clearImage}
                className="text-gray-400 hover:text-red-400 transition"
              >
                <Trash2 size={18} />
              </button>

            </div>

            <img
              src={preview}
              alt="Uploaded investigation preview"
              className="max-h-96 max-w-full mx-auto rounded-lg object-contain"
            />

            <div className="mt-4 text-xs text-gray-400 break-all">
              <p>Filename: {image.name}</p>
              <p className="mt-1">
                Size: {(image.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>

          </div>

        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">

          <button
            onClick={handleAnalyze}
            disabled={!image}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed px-6 py-3 rounded-lg text-sm font-medium transition"
          >
            <ScanSearch size={18} />
            Investigate Image
          </button>

          <button
            onClick={() => alert('Camera capture will be implemented later.')}
            className="flex items-center gap-2 border border-gray-700 hover:bg-gray-800 px-5 py-3 rounded-lg text-sm text-gray-300 transition"
          >
            <Camera size={17} />
            Camera Capture
          </button>

        </div>

      </section>

      {/* Analysis Modules */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">

          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-purple-400" size={22} />

            <h3 className="font-semibold">
              Image Intelligence
            </h3>
          </div>

          <ul className="space-y-3 text-sm text-gray-400">
            <li>01. OCR Text Extraction</li>
            <li>02. Embedded Claim Identification</li>
            <li>03. Image Metadata Inspection</li>
            <li>04. Visual Context Investigation</li>
            <li>05. Image Manipulation Indicators</li>
            <li>06. Source and Provenance Investigation</li>
          </ul>

        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">

          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-cyan-400" size={22} />

            <h3 className="font-semibold">
              Investigation Guidelines
            </h3>
          </div>

          <ul className="space-y-3 text-sm text-gray-400 leading-6">
            <li>• Upload clear and readable images.</li>
            <li>• Screenshots and news graphics are supported as input formats.</li>
            <li>• Extracted text will be investigated separately from image authenticity.</li>
            <li>• Missing metadata does not prove manipulation.</li>
            <li>• AI-generated media detection requires separate forensic analysis.</li>
          </ul>

        </div>

      </section>

      {/* Backend Status */}
      <div className="flex items-center gap-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">

        <AlertCircle className="text-yellow-400 shrink-0" size={19} />

        <p className="text-xs text-yellow-400">
          IMAGE ANALYSIS ENGINE: BACKEND INTEGRATION PENDING
        </p>

      </div>

    </div>
  )
}

export default ImageScanner