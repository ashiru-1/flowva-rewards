import { useState, useRef } from 'react';
import { X, UploadCloud } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ClaimRewardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ClaimRewardModal({ isOpen, onClose }: ClaimRewardModalProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [claimEmail, setClaimEmail] = useState('');
    const [isSubmittingClaim, setIsSubmittingClaim] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleClaimSubmit = () => {
        if (!claimEmail) {
            toast.error('Please enter your email.');
            return;
        }
        if (!selectedFile) {
            toast.error('Please upload a screenshot.');
            return;
        }

        setIsSubmittingClaim(true);

        setTimeout(() => {
            toast.success('Claim submitted! We will verify and add points shortly.');
            setIsSubmittingClaim(false);
            onClose();
            setClaimEmail('');
            setSelectedFile(null);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[2px] bg-black/50 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                    <X size={16} />
                </button>

                <div className="p-4 pb-0">
                    <h2 className="text-base font-bold text-gray-900 mb-1">Claim Your 25 Points</h2>
                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                        Sign up for Reclaim (free), then fill the form below:
                    </p>

                    <div className="space-y-1.5 mb-3 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                        <div className="flex gap-2 items-start text-xs text-gray-700">
                            <span className="shrink-0 w-3.5 h-3.5 bg-[#3b82f6] text-white rounded flex items-center justify-center font-bold text-[9px] mt-0.5">1</span>
                            <span>Enter your Reclaim sign-up email.</span>
                        </div>
                        <div className="flex gap-2 items-start text-xs text-gray-700">
                            <span className="shrink-0 w-3.5 h-3.5 bg-[#3b82f6] text-white rounded flex items-center justify-center font-bold text-[9px] mt-0.5">2</span>
                            <span>Upload a screenshot of your profile.</span>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 mb-3 font-medium">After verification, you'll get 25 Flowva Points! 🎉😉</p>

                    <div className="space-y-2.5">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Email used on Reclaim</label>
                            <input
                                type="email"
                                placeholder="user@example.com"
                                value={claimEmail}
                                onChange={(e) => setClaimEmail(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#9333ea] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Upload screenshot (mandatory)</label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <div
                                className={`border-2 border-dashed rounded-lg p-3 transition-colors cursor-pointer flex flex-col items-center justify-center gap-1 group
                                    ${selectedFile ? 'border-[#9333ea] bg-purple-50' : 'border-gray-200 hover:bg-gray-50'}`}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className={`p-1.5 rounded-full transition-colors
                                    ${selectedFile ? 'bg-[#9333ea] text-white' : 'bg-gray-100 text-gray-400 group-hover:text-[#9333ea] group-hover:bg-purple-50'}`}>
                                    <UploadCloud size={16} />
                                </div>
                                <span className={`text-xs font-medium transition-colors ${selectedFile ? 'text-[#9333ea]' : 'text-gray-500 group-hover:text-[#9333ea]'}`}>
                                    {selectedFile ? selectedFile.name : 'Choose file'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 pt-3 flex items-center gap-2.5">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleClaimSubmit}
                        disabled={isSubmittingClaim}
                        className="flex-1 px-4 py-2 rounded-lg bg-[#9333ea] text-white font-bold text-xs hover:bg-[#7e22ce] transition-colors shadow-lg shadow-purple-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmittingClaim ? (
                            <>
                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Submitting...
                            </>
                        ) : 'Submit Claim'}
                    </button>
                </div>
            </div>
        </div>
    );
}
