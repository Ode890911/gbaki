'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { documentsApi, ordersApi, type Document } from '@/lib/api'
import useSWR from 'swr'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  FileText,
  Download,
  Upload,
  Trash2,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  File,
  Image as ImageIcon,
  FileSpreadsheet,
  X,
  Loader2,
  FileCheck,
  Calendar,
  HardDrive,
} from 'lucide-react'

export default function DocumentsPage() {
  const searchParams = useSearchParams()
  const orderIdFromUrl = searchParams.get('order_id') // ✅ Get order_id from URL

  const [selectedOrder, setSelectedOrder] = React.useState<string>(orderIdFromUrl || 'all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [showUploadModal, setShowUploadModal] = React.useState(false)

  // Update selectedOrder when URL param changes
  React.useEffect(() => {
    if (orderIdFromUrl) {
      setSelectedOrder(orderIdFromUrl)
    }
  }, [orderIdFromUrl])

  // Fetch documents
  const { data: documents, error, isLoading, mutate } = useSWR<Document[]>(
    selectedOrder === 'all' ? '/documents' : `/documents?order_id=${selectedOrder}`,
    () => selectedOrder === 'all'
      ? documentsApi.getDocuments()
      : documentsApi.getDocuments(selectedOrder)
  )

  // Fetch orders for filter
  const { data: orders } = useSWR('/orders', () => ordersApi.getOrders())

  // Filter documents by search query
  const filteredDocuments = React.useMemo(() => {
    if (!documents) return []

    return documents.filter(doc =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.document_type.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [documents, searchQuery])

  // Stats
  const stats = React.useMemo(() => {
    if (!documents) return { total: 0, verified: 0, pending: 0, totalSize: '0 MB' }

    const totalSize = documents.reduce((acc, doc) => acc + (doc.file_size || 0), 0)

    return {
      total: documents.length,
      verified: documents.filter(d => d.is_verified).length,
      pending: documents.filter(d => !d.is_verified).length,
      totalSize: `${(totalSize / 1024 / 1024).toFixed(2)} MB`,
    }
  }, [documents])

  const getDocumentIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return ImageIcon
    if (mimeType.includes('pdf')) return FileText
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return FileSpreadsheet
    return File
  }

  const getDocumentColor = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30'
    if (mimeType.includes('pdf')) return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
    return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`
  }

  const handleDownload = async (document: Document) => {
    try {
      toast.loading('Preparing download...', { id: 'download' })

      const { download_url } = await documentsApi.getDownloadUrl(document.id)

      // Create a temporary link and trigger download
      const link = window.document.createElement('a')
      link.href = download_url
      link.download = document.name
      window.document.body.appendChild(link)
      link.click()
      window.document.body.removeChild(link)

      toast.success('Download started!', { id: 'download' })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to download document'
      toast.error(message, { id: 'download' })
    }
  }

  const handleDelete = async (document: Document) => {
    if (!window.confirm(`Are you sure you want to delete "${document.name}"?`)) return

    try {
      await documentsApi.deleteDocument(document.id)
      mutate()
      toast.success('Document deleted successfully')
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete document'
      toast.error(message)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {orderIdFromUrl ? 'Order Documents' : 'Documents'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {orderIdFromUrl
              ? 'Upload required documents for your order'
              : 'Manage your business documents and files'
            }
          </p>
        </div>
        <Button
          onClick={() => setShowUploadModal(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl shadow-lg shadow-green-600/30"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* ✅ Required Documents Notice (if for order) */}
      {orderIdFromUrl && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
                Required Documents
              </h3>
              <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                <li>• Government-issued ID (passport, driver&apos;s license)</li>
                <li>• Proof of address (utility bill, bank statement)</li>
                <li>• Business formation documents (if existing)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.total}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Documents</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.verified}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Verified</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.pending}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalSize}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Size</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            />
          </div>

          <select
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
            title="Filter by order"
            aria-label="Filter by order"
            className="px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
          >
            <option value="all">All Orders</option>
            {orders?.map((order) => (
              <option key={order.id} value={order.id}>
                {order.order_number}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 animate-pulse"
              >
                <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Failed to load documents. Please try again.
            </p>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery ? 'No documents found' : 'No documents yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery
                ? 'Try adjusting your search or filters'
                : 'Upload your first document to get started'}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setShowUploadModal(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((document) => {
              const Icon = getDocumentIcon(document.mime_type || '')
              const colorClass = getDocumentColor(document.mime_type || '')

              return (
                <div
                  key={document.id}
                  className="group border-2 border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500 rounded-xl p-6 transition-all"
                >
                  {/* Document Icon */}
                  <div className={`w-16 h-16 rounded-xl ${colorClass} flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Document Info */}
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {document.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 font-semibold">
                        {document.document_type}
                      </span>
                      {document.is_verified && (
                        <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-3 h-3" />
                        {formatFileSize(document.file_size || 0)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(document.uploaded_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownload(document)}
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button
                      onClick={() => handleDelete(document)}
                      size="sm"
                      variant="outline"
                      className="rounded-xl border-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadDocumentModal
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            mutate()
            setShowUploadModal(false)
          }}
          orders={orders || []}
        />
      )}
    </div>
  )
}

// Upload Document Modal
function UploadDocumentModal({
  onClose,
  onSuccess,
  orders,
}: {
  onClose: () => void
  onSuccess: () => void
  orders: any[]
}) {
  const [formData, setFormData] = React.useState({
    order_id: '',
    document_type: '',
    file: null as File | null,
  })
  const [isUploading, setIsUploading] = React.useState(false)
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const [dragActive, setDragActive] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB')
      return
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Allowed: PDF, JPG, PNG, DOC, DOCX')
      return
    }

    setFormData({ ...formData, file })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.order_id || !formData.document_type || !formData.file) {
      toast.error('Please fill in all fields')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      await documentsApi.uploadDocument(
        formData.order_id,
        formData.document_type,
        formData.file
      )

      clearInterval(progressInterval)
      setUploadProgress(100)

      setTimeout(() => {
        toast.success('Document uploaded successfully!')
        onSuccess()
      }, 500)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to upload document'
      toast.error(message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Upload Document
          </h2>
          <button
            onClick={onClose}
            title="Close"
            aria-label="Close modal"
            className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Order Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Select Order *
            </label>
            <select
              value={formData.order_id}
              onChange={(e) => setFormData({ ...formData, order_id: e.target.value })}
              required
              title="Select Order"
              aria-label="Select Order"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            >
              <option value="">Choose an order</option>
              {orders.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.order_number} - {order.package_type}
                </option>
              ))}
            </select>
          </div>

          {/* Document Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Document Type *
            </label>
            <select
              value={formData.document_type}
              onChange={(e) => setFormData({ ...formData, document_type: e.target.value })}
              required
              title="Document Type"
              aria-label="Document Type"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            >
              <option value="">Select type</option>
              <option value="identification">Identification Document</option>
              <option value="proof_of_address">Proof of Address</option>
              <option value="business_license">Business License</option>
              <option value="tax_document">Tax Document</option>
              <option value="contract">Contract</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              File *
            </label>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragActive
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : formData.file
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="hidden"
                title="Select file to upload"
              />

              {formData.file ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                    <FileCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">
                      {formData.file.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setFormData({ ...formData, file: null })}
                    variant="outline"
                    className="rounded-xl border-2"
                  >
                    Choose Different File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">
                      Drop your file here or click to browse
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      PDF, JPG, PNG, DOC, DOCX (max 10MB)
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="rounded-xl border-2"
                  >
                    Select File
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Uploading...
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {uploadProgress}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t-2 border-gray-200 dark:border-gray-800">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 rounded-xl border-2 py-6"
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUploading || !formData.file}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl py-6"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Document
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
