import type { Order, Document, Activity, Stats } from './types'

// Mock data - Replace with API calls
export const mockStats: Stats = {
  daysRemaining: 12,
  completionPercentage: 65,
  documentsReady: 3,
  totalDocuments: 5,
  supportTickets: 0,
}

export const mockOrder: Order = {
  id: 'ord_123456',
  packageName: 'Growth',
  status: 'website_building',
  progress: 65,
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-20T14:30:00Z',
  estimatedCompletion: '2024-02-01T00:00:00Z',
  services: [
    'LLC Formation',
    'EIN Registration',
    'Website Design',
    'AI Chatbot Setup',
    'Business Email',
  ],
  assignedManager: 'Sarah Martinez',
}

export const mockDocuments: Document[] = [
  {
    id: 'doc_1',
    name: 'Articles of Organization',
    type: 'articles_of_organization',
    size: '2.4 MB',
    uploadedAt: '2024-01-16T09:00:00Z',
    url: '/documents/articles-of-organization.pdf',
    isVerified: true,
  },
  {
    id: 'doc_2',
    name: 'EIN Confirmation Letter',
    type: 'ein_letter',
    size: '1.8 MB',
    uploadedAt: '2024-01-18T11:30:00Z',
    url: '/documents/ein-letter.pdf',
    isVerified: true,
  },
  {
    id: 'doc_3',
    name: 'Operating Agreement',
    type: 'operating_agreement',
    size: '3.2 MB',
    uploadedAt: '2024-01-19T15:45:00Z',
    url: '/documents/operating-agreement.pdf',
    isVerified: true,
  },
  {
    id: 'doc_4',
    name: 'Business License Application',
    type: 'business_license',
    size: '1.5 MB',
    uploadedAt: '2024-01-20T10:20:00Z',
    url: '/documents/business-license.pdf',
    isVerified: false,
  },
  {
    id: 'doc_5',
    name: 'Certificate of Formation',
    type: 'certificate',
    size: '2.1 MB',
    uploadedAt: '2024-01-20T14:00:00Z',
    url: '/documents/certificate.pdf',
    isVerified: false,
  },
]

export const mockActivities: Activity[] = [
  {
    id: 'act_1',
    type: 'milestone',
    title: 'EIN Approved',
    description: 'Tax ID number received from IRS',
    timestamp: '2024-01-20T12:00:00Z',
    icon: 'CheckCircle2',
  },
  {
    id: 'act_2',
    type: 'document_upload',
    title: 'Document Uploaded',
    description: 'Operating Agreement signed',
    timestamp: '2024-01-19T15:45:00Z',
    icon: 'FileText',
  },
  {
    id: 'act_3',
    type: 'status_update',
    title: 'Website Development Started',
    description: 'Designer assigned to your project',
    timestamp: '2024-01-19T09:00:00Z',
    icon: 'Clock',
  },
  {
    id: 'act_4',
    type: 'milestone',
    title: 'LLC Filing Complete',
    description: 'Delaware LLC officially approved',
    timestamp: '2024-01-17T14:30:00Z',
    icon: 'CheckCircle2',
  },
]

