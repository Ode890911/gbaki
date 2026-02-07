'use client'

import { motion } from 'framer-motion'
import {
    BarChart3,
    Users,
    ArrowUpRight,
    MoreHorizontal,
    Search,
    Bell,
    Home,
    Settings,
    Wallet,
    Globe
} from 'lucide-react'

export function DashboardPreview() {
    return (
        <div className="relative mx-auto max-w-6xl perspective-[2000px]">
            {/* 3D Tilted Container */}
            <motion.div
                initial={{ rotateX: 20, opacity: 0, scale: 0.9 }}
                animate={{ rotateX: 10, opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative rounded-t-3xl border border-gray-200/20 dark:border-gray-800/60 bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl shadow-2xl overflow-hidden will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none z-50" />

                {/* Top Navigation Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/10 dark:border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                            <div className="w-3 h-3 rounded-full bg-green-400/80" />
                        </div>
                        <div className="ml-6 h-8 w-64 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 flex items-center px-3 gap-2">
                            <Search className="w-4 h-4 text-gray-400" />
                            <div className="h-2 w-24 bg-gray-300/50 dark:bg-gray-600/50 rounded" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full hover:bg-gray-100/10 transition-colors">
                            <Bell className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 ring-2 ring-white/10" />
                    </div>
                </div>

                {/* Dashboard Layout */}
                <div className="flex min-h-[600px]">

                    {/* Sidebar */}
                    <div className="w-64 border-r border-gray-200/10 dark:border-white/5 p-4 flex flex-col gap-2">
                        {[
                            { icon: Home, label: 'Overview', active: true },
                            { icon: BarChart3, label: 'Analytics' },
                            { icon: Wallet, label: 'Finance' },
                            { icon: Users, label: 'Customers' },
                            { icon: Globe, label: 'Website' },
                            { icon: Settings, label: 'Settings' },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${item.active
                                    ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5'
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </div>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 p-8 bg-gray-50/30 dark:bg-black/20">

                        {/* Header */}
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    Business Overview
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Welcome back, Alex. Here&apos;s what&apos;s happening today.
                                </p>
                            </div>
                            <div className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-green-500/20">
                                + New Order
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-6 mb-8">
                            {[
                                { label: 'Total Revenue', value: '$24,562.00', change: '+12.5%', trend: 'up' },
                                { label: 'Active Customers', value: '1,240', change: '+3.2%', trend: 'up' },
                                { label: 'Pending Orders', value: '18', change: '-2.1%', trend: 'down' },
                            ].map((stat, i) => (
                                <div key={i} className="p-5 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200/50 dark:border-white/5 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {stat.label}
                                        </span>
                                        {stat.trend === 'up' ? (
                                            <span className="inline-flex items-center text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                                <ArrowUpRight className="w-3 h-3 mr-1" />
                                                {stat.change}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                                                <ArrowUpRight className="w-3 h-3 mr-1 rotate-90" />
                                                {stat.change}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {stat.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Large Chart Area */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2 p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200/50 dark:border-white/5 shadow-sm h-64 relative overflow-hidden">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                        Revenue Growth
                                    </h3>
                                    <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
                                </div>

                                {/* CSS Chart Construction */}
                                <div className="absolute bottom-0 left-0 right-0 h-40 px-6 flex items-end justify-between gap-1">
                                    {[35, 45, 30, 60, 75, 50, 65, 80, 55, 70, 45, 60, 90, 75, 85].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                                            className="w-full rounded-t bg-gradient-to-t from-green-500/20 to-green-500 opacity-60 hover:opacity-100 transition-opacity"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Right Side List */}
                            <div className="col-span-1 p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200/50 dark:border-white/5 shadow-sm h-64">
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                                    Recent Activity
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { title: 'New LLC Filed', time: '2 mins ago', color: 'bg-blue-500' },
                                        { title: 'Website Published', time: '1 hour ago', color: 'bg-purple-500' },
                                        { title: 'Payment Received', time: '3 hours ago', color: 'bg-green-500' },
                                        { title: 'Document Signed', time: '5 hours ago', color: 'bg-orange-500' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${item.color}`} />
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {item.title}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {item.time}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fade Out Mask - The key to avoiding the "Card" look */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-gray-950 dark:via-transparent dark:to-transparent z-40 pointer-events-none h-full -bottom-[1px]" />
            </motion.div>
        </div>
    )
}
