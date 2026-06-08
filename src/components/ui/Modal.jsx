import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './Button'

export function Modal({ open, title, children, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="w-full max-w-xl rounded-3xl border bg-card p-6 shadow-premium" initial={{ y: 24, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 24, opacity: 0, scale: 0.98 }}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">{title}</h2>
              <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal"><X size={18} /></Button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
