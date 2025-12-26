import { Calendar, Zap } from 'lucide-react';

interface DailyStreakCardProps {
    streak: number;
    isLoading: boolean;
    isClaimedToday: boolean;
    onClaim: () => void;
    isClaiming: boolean;
}

export default function DailyStreakCard({ streak, isLoading, isClaimedToday, onClaim, isClaiming }: DailyStreakCardProps) {
    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const currentDayIndex = (new Date().getDay() + 6) % 7;

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex items-center gap-2 bg-[#EEF2FF] p-6">
                <div className="text-[#3b82f6]">
                    <Calendar size={18} />
                </div>
                <h3 className="font-bold text-gray-700 text-sm">Daily Streak</h3>
            </div>

            <div className="p-6 pt-2 flex flex-col flex-1">
                {isLoading ? (
                    <div className="animate-pulse flex flex-col h-full justify-between mt-4">
                        <div className="h-10 w-24 bg-gray-200 rounded mb-6"></div>
                        <div className="flex justify-between mb-6">
                            {[...Array(7)].map((_, i) => (
                                <div key={i} className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            ))}
                        </div>
                        <div className="h-12 w-full bg-gray-200 rounded-full mt-auto"></div>
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-[#9333ea]">{streak || 0} day</span>
                        </div>

                        <div className="flex justify-between mb-6">
                            {weekDays.map((day, idx) => (
                                <div
                                    key={idx}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold
                                ${idx === currentDayIndex
                                            ? 'border-2 border-[#9333ea] text-[#9333ea] bg-[#f3e8ff]'
                                            : 'bg-gray-100 text-gray-400'
                                        }`}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-gray-400 text-xs mb-4">Check in daily to earn +5 points</p>

                        <button
                            onClick={onClaim}
                            disabled={isClaiming || isClaimedToday}
                            className={`w-full font-bold py-3 rounded-full text-sm flex items-center justify-center gap-2 transition-colors
                        ${isClaimedToday
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-[#9333ea] hover:bg-[#7e22ce] text-white cursor-pointer shadow-lg shadow-purple-200'}`}
                        >
                            {isClaiming ? <div className="animate-spin">⌛</div> : <Zap size={16} />}
                            {isClaiming ? 'Claiming...' : isClaimedToday ? 'Claimed Today' : 'Claim Daily Points'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
