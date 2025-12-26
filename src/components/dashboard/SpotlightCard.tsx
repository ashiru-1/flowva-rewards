import { Calendar, User, Gift } from 'lucide-react';

interface SpotlightCardProps {
    isLoading: boolean;
    onOpenClaimModal: () => void;
}

export default function SpotlightCard({ isLoading, onOpenClaimModal }: SpotlightCardProps) {
    return (
        <div className="bg-white p-0 rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow group cursor-pointer">
            {isLoading ? (
                <div className="animate-pulse h-full flex flex-col">
                    <div className="h-32 bg-gray-200 w-full mb-4"></div>
                    <div className="p-6 pt-0 flex-1 flex flex-col">
                        <div className="h-5 w-24 bg-gray-200 rounded mb-4"></div>
                        <div className="flex gap-3 mb-4">
                            <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0"></div>
                            <div className="w-full">
                                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-3 w-full bg-gray-200 rounded mb-1"></div>
                                <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-auto">
                            <div className="h-10 w-full bg-gray-200 rounded-full"></div>
                            <div className="h-10 w-full bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="bg-linear-to-r from-[#a855f7] to-[#3b82f6] p-6 text-white h-32 relative group-hover:scale-105 transition-transform duration-500">
                        <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold mb-2 backdrop-blur-sm">
                            Featured
                        </div>
                        <h3 className="font-bold text-lg leading-tight">Top Tool Spotlight</h3>
                        <div className="absolute bottom-4 right-4 bg-white/20 p-2 rounded-full backdrop-blur-sm">
                            <div className="w-8 h-8 rounded-full bg-[#fcd34d] flex items-center justify-center">
                                <div className="grid grid-cols-2 gap-0.5">
                                    <div className="w-2 h-2 bg-[#1e293b] rounded-full"></div>
                                    <div className="w-2 h-2 bg-[#ef4444] rounded-full"></div>
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white relative flex flex-col flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">Reclaim</h4>
                        <div className="flex items-start gap-3 mb-4">
                            <div className="mt-1 text-[#9333ea]">
                                <Calendar size={18} />
                            </div>
                            <div>
                                <h5 className="font-bold text-gray-800 text-sm">Automate and Optimize Your Schedule</h5>
                                <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-3">
                                    Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks to boost productivity.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-auto">
                            <button
                                onClick={() => window.open('https://go.reclaim.ai/ur9i6g5eznps', '_blank')}
                                className="flex-1 bg-linear-to-r from-[#9333ea] to-[#7e22ce] hover:opacity-90 text-white text-xs font-bold py-2.5 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                            >
                                <User size={16} /> Sign up
                            </button>
                            <button
                                onClick={onOpenClaimModal}
                                className="flex-1 bg-linear-to-r from-[#e879f9] to-[#c026d3] hover:opacity-90 text-white text-xs font-bold py-2.5 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                            >
                                <Gift size={16} /> Claim 50 pts
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
