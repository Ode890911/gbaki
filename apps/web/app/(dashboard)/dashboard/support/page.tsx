'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import { supportApi, type SupportTicket } from '@/lib/api'
import { ordersApi } from '@/lib/api/orders'
import useSWR from 'swr'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  MessageSquare,
  Plus,
  Search,
  Mail,
  Phone,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Loader2,
  ExternalLink,
  ChevronRight,
  X,
} from 'lucide-react'
import Link from 'next/link'

export default function SupportPage() {
  const searchParams = useSearchParams()
  const orderIdFromUrl = searchParams.get('order_id')

  const [selectedStatus, setSelectedStatus] = React.useState<string>('all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [showNewTicketModal, setShowNewTicketModal] = React.useState(false)
  const [selectedTicket, setSelectedTicket] = React.useState<SupportTicket | null>(null)
  const [orderContext, setOrderContext] = React.useState<any>(null)

  // Fetch order context if order_id provided
  React.useEffect(() => {
    if (orderIdFromUrl) {
      ordersApi.getOrder(orderIdFromUrl)
        .then((order) => {
          setOrderContext(order)
          setShowNewTicketModal(true) // Auto-open create form
        })
        .catch((error) => {
          console.error('Error fetching order context:', error)
        })
    }
  }, [orderIdFromUrl])

  // Fetch tickets
  const { data: tickets, error, isLoading, mutate } = useSWR<SupportTicket[]>(
    selectedStatus === 'all' ? '/support' : `/support?status=${selectedStatus}`,
    () => selectedStatus === 'all'
      ? supportApi.getTickets()
      : supportApi.getTickets(selectedStatus)
  )

  // Filter tickets by search query
  const filteredTickets = React.useMemo(() => {
    if (!tickets) return []

    return tickets.filter(ticket =>
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticket_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [tickets, searchQuery])

  // Stats
  const stats = React.useMemo(() => {
    if (!tickets) return { total: 0, open: 0, closed: 0, avgResponse: '2 hours' }

    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length,
      closed: tickets.filter(t => t.status === 'closed' || t.status === 'resolved').length,
      avgResponse: '2 hours', // TODO: Calculate from actual data
    }
  }, [tickets])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      case 'in_progress':
        return <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
      case 'resolved':
      case 'closed':
        return <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
      default:
        return <MessageSquare className="w-4 h-4 text-gray-600 dark:text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'resolved':
      case 'closed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      case 'high':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
      case 'normal':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'low':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Support Center
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get help from our team or browse our knowledge base
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.total}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Tickets</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.open}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Open Tickets</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.closed}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Resolved Tickets</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.avgResponse}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</p>
        </div>
      </div>

      {/* Order Context Banner */}
      {orderContext && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
                Getting Help for Your Order
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                You&apos;re creating a support ticket for <strong>Order #{orderContext.order_number || orderContext.id}</strong> - {orderContext.package_name || 'Package'}
              </p>
              <div className="flex items-center gap-2">
                {orderContext.progress_percentage !== undefined && (
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold">
                    Progress: {orderContext.progress_percentage}%
                  </span>
                )}
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold">
                  Status: {orderContext.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => setShowNewTicketModal(true)}
          className="bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl p-6 text-left transition-all shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40"
        >
          <MessageSquare className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-bold mb-1">Create Ticket</h3>
          <p className="text-sm text-green-100">Get help from our support team</p>
        </button>

        <a
          href="mailto:hello@gbakidigital.com"
          className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-left transition-all group"
        >
          <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Email Us
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            hello@gbakidigital.com
          </p>
        </a>

        <a
          href="tel:+15551234567"
          className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-left transition-all group"
        >
          <Phone className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Call Us
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            +1 (555) 123-4567
          </p>
        </a>
      </div>

      {/* Tickets Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Your Tickets
          </h2>
          <Button
            onClick={() => setShowNewTicketModal(true)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            />
          </div>

          <div className="flex gap-2">
            {['all', 'open', 'in_progress', 'closed'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${selectedStatus === status
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-4 animate-pulse"
              >
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-3" />
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Failed to load tickets. Please try again.
            </p>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery ? 'No tickets found' : 'No tickets yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery
                ? 'Try adjusting your search or filters'
                : 'Create your first support ticket to get help'}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setShowNewTicketModal(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Ticket
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className="w-full text-left border-2 border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500 rounded-xl p-4 transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        {ticket.ticket_number}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {ticket.subject}
                    </h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    {getStatusIcon(ticket.status)}
                    {ticket.category}
                  </span>
                  <span>•</span>
                  <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{ticket.messages.length} {ticket.messages.length === 1 ? 'message' : 'messages'}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Knowledge Base */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Knowledge Base
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Find answers to common questions in our help center
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Getting Started Guide', category: 'Onboarding', articles: 8 },
            { title: 'LLC Formation Process', category: 'Legal', articles: 12 },
            { title: 'Website Management', category: 'Technical', articles: 15 },
            { title: 'Payment & Billing', category: 'Billing', articles: 6 },
          ].map((topic, i) => (
            <Link
              key={i}
              href="#"
              className="bg-white dark:bg-gray-900 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl p-4 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {topic.title}
                </h3>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold">
                  {topic.category}
                </span>
                <span>•</span>
                <span>{topic.articles} articles</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <NewTicketModal
          orderId={orderIdFromUrl || undefined}
          orderContext={orderContext}
          onClose={() => {
            setShowNewTicketModal(false)
            setOrderContext(null)
          }}
          onSuccess={() => {
            mutate()
            setShowNewTicketModal(false)
            setOrderContext(null)
          }}
        />
      )}

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdate={() => {
            mutate()
            // Refresh the selected ticket
            supportApi.getTicket(selectedTicket.id).then(setSelectedTicket)
          }}
        />
      )}
    </div>
  )
}

// New Ticket Modal Component
function NewTicketModal({
  orderId,
  orderContext,
  onClose,
  onSuccess,
}: {
  orderId?: string
  orderContext?: any
  onClose: () => void
  onSuccess: () => void
}) {
  const [formData, setFormData] = React.useState({
    subject: orderContext ? `Question about Order #${orderContext.order_number || orderContext.id}` : '',
    category: orderContext ? 'order' : '',
    description: '',
    priority: 'medium',
    order_id: orderId || '',
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.subject || !formData.category || !formData.description) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      await supportApi.createTicket({
        subject: formData.subject,
        category: formData.category,
        description: formData.description,
        priority: formData.priority,
        order_id: formData.order_id || undefined,
      })

      toast.success('Ticket created successfully!')
      onSuccess()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create ticket'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create Support Ticket
          </h2>
          <button
            onClick={onClose}
            title="Close modal"
            aria-label="Close modal"
            className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Subject *
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Brief description of your issue"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                title="Select category"
                aria-label="Select support ticket category"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                required
              >
                <option value="">Select a category</option>
                <option value="general">General Inquiry</option>
                <option value="order">Order Issue</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing & Payments</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                title="Select priority"
                aria-label="Select support ticket priority"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={8}
              placeholder="Please provide as much detail as possible..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 resize-none"
              required
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 rounded-xl border-2 py-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl py-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Create Ticket
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Ticket Detail Modal Component
function TicketDetailModal({
  ticket,
  onClose,
  onUpdate,
}: {
  ticket: SupportTicket
  onClose: () => void
  onUpdate: () => void
}) {
  const [newMessage, setNewMessage] = React.useState('')
  const [isSending, setIsSending] = React.useState(false)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) {
      toast.error('Please enter a message')
      return
    }

    setIsSending(true)

    try {
      await supportApi.addTicketMessage(ticket.id, newMessage)
      toast.success('Message sent!')
      setNewMessage('')
      onUpdate()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send message'
      toast.error(message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b-2 border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {ticket.ticket_number}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${ticket.status === 'open'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : ticket.status === 'in_progress'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {ticket.subject}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Created {new Date(ticket.created_at).toLocaleString()}
              </p>
            </div>
            <button
              onClick={onClose}
              title="Close modal"
              aria-label="Close modal"
              className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {ticket.messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 ${message.is_staff ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.is_staff
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                }`}>
                {message.is_staff ? '🎯' : '👤'}
              </div>
              <div className={`flex-1 ${message.is_staff ? '' : 'flex flex-col items-end'}`}>
                <div className={`inline-block max-w-2xl rounded-2xl p-4 ${message.is_staff
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'bg-gradient-to-br from-green-600 to-emerald-600 text-white'
                  }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                  {new Date(message.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        {ticket.status !== 'closed' && ticket.status !== 'resolved' && (
          <form onSubmit={handleSendMessage} className="border-t-2 border-gray-200 dark:border-gray-800 p-6">
            <div className="flex gap-3">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                rows={3}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 resize-none"
              />
              <Button
                type="submit"
                disabled={isSending || !newMessage.trim()}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 self-end"
              >
                {isSending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
