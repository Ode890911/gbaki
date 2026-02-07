'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Download,
  Eye,
  CheckCircle,
  MoreVertical,
} from 'lucide-react'
import type { Document } from '@/lib/dashboard/types'

interface DocumentCardProps {
  document: Document
  delay?: number
}

export function DocumentCard({ document, delay = 0 }: DocumentCardProps) {
  const [showMenu, setShowMenu] = React.useState(false)

  const getFileIcon = () => {
    return <FileText className="w-6 h-6" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="group relative rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white flex-shrink-0">
          {getFileIcon()}
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            title="Document options"
            aria-label="Document options"
            className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-xl overflow-hidden z-10">
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-left">
                <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Preview
                </span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-left">
                <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Download
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Document Info */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
            {document.name}
          </h3>
          {document.isVerified && (
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <span>{document.size}</span>
          <span>•</span>
          <span>
            {new Date(document.uploadedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2">
          <Eye className="w-4 h-4" />
          View
        </button>
        <button className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </motion.div>
  )
}

