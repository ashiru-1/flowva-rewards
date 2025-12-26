import { Trophy, Rocket } from 'lucide-react';

interface PointsBalanceCardProps {
    points: number;
    isLoading: boolean;
}

export default function PointsBalanceCard({ points, isLoading }: PointsBalanceCardProps) {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex items-center gap-2 bg-[#EEF2FF] p-6">
                <Trophy size={18} className="text-[#a855f7]" />
                <h3 className="font-bold text-gray-700 text-sm">Points Balance</h3>
            </div>

            <div className="p-6 pt-2 flex flex-col flex-1">
                {isLoading ? (
                    <div className="animate-pulse flex flex-col h-full justify-between">
                        <div className="h-8 w-8 bg-gray-200 rounded-full mb-4"></div>
                        <div>
                            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                            <div className="h-10 w-16 bg-gray-200 rounded"></div>
                        </div>
                        <div className="mt-4">
                            <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                            <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ) : (
                    <>

                        <div className="mb-6">
                            <span className="text-5xl font-bold text-[#9333ea] tracking-tight">{points?.toLocaleString() || 0}</span>
                        </div>

                        <div className="mt-auto">
                            <div className="flex justify-between text-xs text-gray-500 font-medium mb-2">
                                <span>Progress to $5 Gift Card</span>
                                <span>{points || 0}/5000</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-4">
                                <div
                                    className="bg-[#e9d5ff] h-full relative"
                                    style={{ width: `${Math.min(((points || 0) / 5000) * 100, 100)}%` }}
                                >
                                    <div className="absolute right-0 top-0 bottom-0 w-full bg-[#a855f7] rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-gray-400">
                                <Rocket size={12} />
                                <span>Just getting started — keep earning points!</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
