'use client'

import { motion } from 'framer-motion'

const countries = [
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'Ethiopia', flag: '🇪🇹' },
  { name: 'Ghana', flag: '🇬🇭' },
  { name: 'Kenya', flag: '🇰🇪' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'Cameroon', flag: '🇨🇲' },
  { name: 'Senegal', flag: '🇸🇳' },
  { name: 'Uganda', flag: '🇺🇬' },
]

export function CountryFlags() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {countries.map((country, index) => (
        <motion.div
          key={country.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.6 + index * 0.05,
            type: 'spring',
            stiffness: 200,
          }}
          whileHover={{ scale: 1.2, rotate: 5 }}
          className="group relative"
        >
          <div className="text-3xl cursor-pointer filter grayscale-0 hover:grayscale-0 transition-all duration-300">
            {country.flag}
          </div>
          
          {/* Tooltip */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {country.name}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

