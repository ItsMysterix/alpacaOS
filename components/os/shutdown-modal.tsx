import { Power } from "lucide-react"
import Image from "next/image"

interface ShutdownModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function ShutdownModal({ isOpen, onClose, onConfirm }: ShutdownModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#E0E0E0] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] w-full max-w-md p-1 relative animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="bg-[#000080] p-2 flex justify-between items-center mb-4">
          <span className="text-white font-vt323 font-bold text-xl uppercase tracking-wider">System Warning</span>
          <button onClick={onClose}>
             {/* Using standard X if image missing, but sticking to requested image path if known */}
             {/* <Image src="/images/pixel-close-button.png" width={20} height={20} alt="Close" /> */} 
             <div className="w-5 h-5 bg-gray-300 border border-black flex items-center justify-center font-bold text-black text-xs hover:bg-red-500 hover:text-white">X</div>
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-6 text-center space-y-6">
          <div className="w-16 h-16 bg-yellow-400 border-2 border-black rounded-full mx-auto flex items-center justify-center animate-bounce">
            <Power className="w-8 h-8 text-black" />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-vt323 text-3xl font-bold uppercase">Terminate Session?</h3>
            <p className="font-vt323 text-xl text-gray-700">Ready to go back to minimal mode?</p>
          </div>

          <div className="flex gap-4 justify-center pt-2">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 font-vt323 text-xl hover:bg-gray-100 transition-all uppercase"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="px-6 py-2 bg-red-500 text-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 font-vt323 text-xl hover:bg-red-600 transition-all uppercase"
            >
              Shut Down
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
