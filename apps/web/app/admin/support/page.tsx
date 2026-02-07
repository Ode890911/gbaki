'use client'

import { useState, useEffect, useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { adminApi } from '@/lib/api/admin'
import {
  MessageSquare,
  Eye,
  Clock,
  User,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Pagination } from '@/components/admin/Pagination'
import Link from 'next/link'
import { format } from 'date-fns'

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  const fetchTickets = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await adminApi.listTickets({
        page,
        per_page: 20,
        search: searchQuery || undefined,
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
      })
      setTickets(data.data || [])
      setTotal(data.total || 0)
      setTotalPages(data.total_pages || 1)
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setIsLoading(false)
    }
  }, [page, searchQuery, statusFilter, priorityFilter])

  useEffect(() => {
    fetchTickets()

    // Auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchTickets, 30000)
    return () => clearInterval(interval)
  }, [fetchTickets])

  // Debounced search handler
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value)
    setPage(1) // Reset to first page on search
  }, 500)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'normal':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'low':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Support Tickets
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage and respond to customer support tickets
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div className="lg:col-span-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets, users..."
              defaultValue={searchQuery}
              onChange={(e) => debouncedSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            title="Filter by status"
            aria-label="Filter tickets by status"
            className="px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => {
              setPriorityFilter(e.target.value)
              setPage(1)
            }}
            title="Filter by priority"
            aria-label="Filter tickets by priority"
            className="px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          >
            <option value="">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {tickets.length} of {total} tickets
        </div>
      </div>

      {/* Tickets List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      ) : tickets.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-12 text-center">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No Tickets Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery || statusFilter || priorityFilter ? 'Try adjusting your filters' : 'No support tickets yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket: any) => (
            <div
              key={ticket.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {ticket.subject}
                        </h3>
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        #{ticket.ticket_number} • {ticket.category} • {ticket.message_count} messages
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">{ticket.user?.name || 'Unknown'}</span>
                        <span className="text-gray-400"> • {ticket.user?.email}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Created: {ticket.created_at
                          ? format(new Date(ticket.created_at), 'MMM d, yyyy')
                          : 'Unknown'}
                      </span>
                    </div>
                    {ticket.updated_at && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Updated: {format(new Date(ticket.updated_at), 'MMM d, yyyy')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link href={`/dashboard/support/${ticket.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      title="View ticket details"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
