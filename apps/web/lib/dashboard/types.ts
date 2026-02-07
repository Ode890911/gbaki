export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'llc_filed'
  | 'ein_approved'
  | 'website_building'
  | 'website_review'
  | 'completed'

export type DocumentType = 
  | 'articles_of_organization'
  | 'ein_letter'
  | 'operating_agreement'
  | 'business_license'
  | 'certificate'
  | 'contract'
  | 'invoice'

export interface Order {
  id: string
  packageName: 'Starter' | 'Growth' | 'Premium'
  status: OrderStatus
  progress: number // 0-100
  createdAt: string
  updatedAt: string
  estimatedCompletion: string
  services: string[]
  assignedManager?: string
}

export interface Document {
  id: string
  name: string
  type: DocumentType
  size: string
  uploadedAt: string
  url: string
  isVerified?: boolean
}

export interface Activity {
  id: string
  type: 'status_update' | 'document_upload' | 'message' | 'milestone'
  title: string
  description: string
  timestamp: string
  icon?: string
}

export interface Stats {
  daysRemaining: number
  completionPercentage: number
  documentsReady: number
  totalDocuments: number
  supportTickets: number
}

