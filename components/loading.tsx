import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-gray-200 rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#0A5C36] rounded-full" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-sm text-gray-600 text-center"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  )
}