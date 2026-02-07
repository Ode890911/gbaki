'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

// Use ISO 3166-1 alpha-2 codes for reliable image flags (emoji flags often don't render on Windows/Linux)
const countries = [
  { name: 'Nigeria', code: 'ng' },
  { name: 'Ethiopia', code: 'et' },
  { name: 'Ghana', code: 'gh' },
  { name: 'Kenya', code: 'ke' },
  { name: 'South Africa', code: 'za' },
  { name: 'Cameroon', code: 'cm' },
  { name: 'Senegal', code: 'sn' },
  { name: 'Uganda', code: 'ug' },
]

const FLAG_SIZE = 40

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
          <div className="cursor-pointer transition-all duration-300 rounded overflow-hidden shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-2 hover:ring-green-500/50">
            <Image
              src={`https://flagcdn.com/w80/${country.code}.png`}
              alt={country.name}
              width={FLAG_SIZE}
              height={FLAG_SIZE * 0.75}
              className="w-10 h-[30px] object-cover"
              unoptimized
            />
          </div>

          {/* Tooltip */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
            {country.name}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

