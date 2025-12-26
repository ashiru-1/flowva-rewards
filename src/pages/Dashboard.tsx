import { useState, useRef, useEffect } from 'react';
import { useProfile, useRewards, useRedeemReward, useDailyCheckIn } from '../hooks/useDashboard';
import { Lock, Bell, Gift, Menu, Star } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useOutletContext } from 'react-router-dom';
import EarnPointsSection from '../components/EarnPoints';
import ClaimRewardModal from '../components/dashboard/ClaimRewardModal';
import PointsBalanceCard from '../components/dashboard/PointsBalanceCard';
import DailyStreakCard from '../components/dashboard/DailyStreakCard';
import SpotlightCard from '../components/dashboard/SpotlightCard';

export default function Dashboard() {
    const { openSidebar } = useOutletContext<{ openSidebar: () => void }>();

    const { data: profile, isLoading: isProfileLoading } = useProfile();
    const { data: rewards, isLoading } = useRewards();
    const redeemMutation = useRedeemReward();
    const checkInMutation = useDailyCheckIn();

    const unlockedCount = rewards?.filter((r: any) => !r.is_coming_soon && (profile?.points_balance || 0) >= r.cost).length || 0;
    const lockedCount = rewards?.filter((r: any) => !r.is_coming_soon && (profile?.points_balance || 0) < r.cost).length || 0;
    const comingSoonCount = rewards?.filter((r: any) => r.is_coming_soon).length || 0;
    const totalCount = rewards?.length || 0;

    const isClaimedToday = profile?.last_check_in &&
        new Date().toISOString().split('T')[0] === new Date(profile.last_check_in).toISOString().split('T')[0];

    const [activeTab, setActiveTab] = useState<'earn' | 'redeem'>('earn');
    const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
    const [activeRewardFilter, setActiveRewardFilter] = useState('all');
    const [tabUnderlineStyle, setTabUnderlineStyle] = useState({ left: 0, width: 0 });
    const [filterUnderlineStyle, setFilterUnderlineStyle] = useState({ left: 0, width: 0 });


    const earnTabRef = useRef<HTMLButtonElement>(null);
    const redeemTabRef = useRef<HTMLButtonElement>(null);
    const filterTabsRef = useRef<Map<string, HTMLButtonElement>>(new Map());

    useEffect(() => {
        const activeRef = activeTab === 'earn' ? earnTabRef : redeemTabRef;
        if (activeRef.current) {
            const { offsetLeft, offsetWidth } = activeRef.current;
            setTabUnderlineStyle({ left: offsetLeft, width: offsetWidth });
        }
    }, [activeTab]);

    useEffect(() => {
        const activeRef = filterTabsRef.current.get(activeRewardFilter);
        if (activeRef) {
            const { offsetLeft, offsetWidth } = activeRef;
            setFilterUnderlineStyle({ left: offsetLeft, width: offsetWidth });
        }
    }, [activeRewardFilter, activeTab]);






    if (isLoading) {
        return (
            <div className="h-[80vh] w-full flex items-center justify-center">
                <img src="/logo.png" alt="Loading..." className="w-20 h-20 object-contain animate-scale-pulse" />
            </div>
        );
    }



    return (
        <div className="relative min-h-full">
            <Toaster position="top-center" />

            <div className="sticky top-0 z-20 bg-[#f8f9fe]/95 backdrop-blur-sm -mt-4 -mx-4 md:-mt-8 md:-mx-8 transition-all border-b border-gray-200/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 pt-4 md:px-8 md:pt-8">
                    <header className="mb-6 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={openSidebar}
                                    className="md:hidden p-1 -ml-1 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                >
                                    <Menu size={24} />
                                </button>
                                <h2 className="text-2xl font-semibold text-gray-900">Rewards Hub</h2>
                            </div>
                            <p className="text-gray-500 text-md hidden md:block">Earn points, unlock rewards, and celebrate your progress!</p>
                            <p className="text-gray-500 text-sm md:hidden mt-1">Earn points, unlock rewards, and celebrate your progress!</p>
                        </div>
                        <div className="bg-white p-2 rounded-full shadow-sm text-gray-400 hover:text-gray-600 cursor-pointer relative transition-transform hover:scale-105">
                            <Bell size={20} />
                            <div className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
                        </div>
                    </header>

                    <div className="flex relative">
                        <button
                            ref={earnTabRef}
                            onClick={() => setActiveTab('earn')}
                            className={`pb-3 px-4 text-sm font-semibold transition-colors cursor-pointer ${activeTab === 'earn'
                                ? 'text-[#9333ea]'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Earn Points
                        </button>
                        <button
                            ref={redeemTabRef}
                            onClick={() => setActiveTab('redeem')}
                            className={`pb-3 px-4 text-sm font-semibold transition-colors cursor-pointer ${activeTab === 'redeem'
                                ? 'text-[#9333ea]'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Redeem Rewards
                        </button>

                        <div
                            className="absolute bottom-0 h-0.5 bg-[#9333ea] transition-all duration-300 ease-in-out rounded-full"
                            style={{ left: tabUnderlineStyle.left, width: tabUnderlineStyle.width }}
                        />
                    </div>

                    {activeTab === 'redeem' && (
                        <div className="relative mt-4 animate-in fade-in slide-in-from-top-2 duration-300 pb-px">
                            <div className="-mx-4 px-4 md:mx-0 md:px-0">
                                <div className="flex gap-4 overflow-x-auto no-scrollbar w-full pb-2 pt-1 touch-pan-x max-w-[100vw] md:max-w-full px-4 md:px-0">
                                    {[
                                        { id: 'all', label: 'Available Rewards', count: totalCount },
                                        { id: 'unlocked', label: 'Unlocked', count: unlockedCount },
                                        { id: 'locked', label: 'Locked', count: lockedCount },
                                        { id: 'coming_soon', label: 'Coming Soon', count: comingSoonCount },
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            ref={(el) => {
                                                if (el) filterTabsRef.current.set(tab.id, el);
                                                else filterTabsRef.current.delete(tab.id);
                                            }}
                                            onClick={() => setActiveRewardFilter(tab.id)}
                                            className={`pb-2 px-1 text-sm font-semibold transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer shrink-0
                                            ${activeRewardFilter === tab.id
                                                    ? 'text-[#9333ea]'
                                                    : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            {tab.label}
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeRewardFilter === tab.id ? 'bg-[#f3e8ff] text-[#9333ea]' : 'bg-gray-100 text-gray-400'}`}>
                                                {tab.count}
                                            </span>
                                        </button>
                                    ))}
                                    <div className="w-2 shrink-0 md:hidden" />
                                </div>
                            </div>

                            <div
                                className="absolute bottom-0 h-0.5 bg-[#9333ea] transition-all duration-300 ease-in-out rounded-full hidden md:block"
                                style={{ left: filterUnderlineStyle.left, width: filterUnderlineStyle.width }}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-8 pb-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-1 h-6 bg-[#9333ea] rounded-full"></div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            {activeTab === 'earn' ? 'Your Rewards Journey' : 'Redeem Your Points'}
                        </h3>
                    </div>

                    {activeTab === 'earn' && (
                        <>
                            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <PointsBalanceCard
                                    points={profile?.points_balance || 0}
                                    isLoading={isProfileLoading}
                                />

                                <DailyStreakCard
                                    streak={profile?.current_streak || 0}
                                    isLoading={isProfileLoading}
                                    isClaimedToday={!!isClaimedToday}
                                    onClaim={() => checkInMutation.mutate()}
                                    isClaiming={checkInMutation.isPending}
                                />

                                <SpotlightCard
                                    isLoading={isProfileLoading}
                                    onOpenClaimModal={() => setIsClaimModalOpen(true)}
                                />
                            </section>

                            <EarnPointsSection />
                        </>
                    )}

                    {activeTab === 'redeem' && (
                        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {(() => {
                                const filteredRewards = rewards?.filter((r: any) => {
                                    if (activeRewardFilter === 'unlocked') return !r.is_coming_soon && (profile?.points_balance || 0) >= r.cost;
                                    if (activeRewardFilter === 'locked') return !r.is_coming_soon && (profile?.points_balance || 0) < r.cost;
                                    if (activeRewardFilter === 'coming_soon') return r.is_coming_soon;
                                    return true;
                                });

                                return (
                                    <>
                                        <div className="mb-4"></div>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[90vw] md:max-w-full">
                                            {isLoading ? (
                                                [...Array(6)].map((_, i) => (
                                                    <div key={i} className="bg-white rounded-[32px] p-6 md:p-8 border border-gray-100 flex flex-col items-center animate-pulse">
                                                        <div className="w-16 h-16 bg-gray-100 rounded-2xl mb-6"></div>
                                                        <div className="h-6 w-3/4 bg-gray-100 rounded mb-4"></div>
                                                        <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
                                                        <div className="h-4 w-2/3 bg-gray-100 rounded mb-6"></div>
                                                        <div className="mt-auto w-full h-12 bg-gray-100 rounded-full"></div>
                                                    </div>
                                                ))
                                            ) : (
                                                <>
                                                    {filteredRewards?.map((reward: any) => {
                                                        const isAffordable = (profile?.points_balance || 0) >= reward.cost;
                                                        const isLocked = !isAffordable;
                                                        const isComingSoon = reward.is_coming_soon;

                                                        return (
                                                            <div key={reward.id} className="bg-white rounded-[32px] p-1 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                                                                <div className="p-6 md:p-8 flex flex-col items-center text-center flex-1">
                                                                    <div className="w-16 h-16 bg-purple-50 text-[#9333ea] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 transform">
                                                                        {isComingSoon ? <Lock size={28} /> : <Gift size={28} />}
                                                                    </div>

                                                                    <h3 className="font-bold text-gray-900 text-lg mb-2">{reward.title}</h3>
                                                                    <p className="text-gray-500 text-xs leading-relaxed mb-6 h-10 line-clamp-2">{reward.description}</p>

                                                                    <div className="mt-auto flex items-center gap-1.5 text-[#8b5cf6] font-extrabold text-sm mb-2">
                                                                        <Star size={16} fill="currentColor" className="text-yellow-400" />
                                                                        <span className="text-[#9333ea]">{reward.cost.toLocaleString()} pts</span>
                                                                    </div>
                                                                </div>

                                                                <div className="p-2">
                                                                    <button
                                                                        onClick={() => redeemMutation.mutate(reward.id)}
                                                                        disabled={isLocked || isComingSoon || redeemMutation.isPending}
                                                                        className={`w-full py-4 rounded-[28px] font-bold text-sm transition-all shadow-sm
                                                                        ${isComingSoon
                                                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                                                : isLocked
                                                                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                                                    : 'bg-[#9333ea] hover:bg-[#7e22ce] text-white shadow-purple-200 shadow-lg cursor-pointer'}`}
                                                                    >
                                                                        {isComingSoon ? 'Coming Soon' : isLocked ? 'Locked' : redeemMutation.isPending ? 'Redeeming...' : 'Redeem Reward'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                    {filteredRewards?.length === 0 && (
                                                        <div className="col-span-full py-12 text-center text-gray-400">
                                                            No rewards found in this category.
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </>
                                );
                            })()}
                        </section>
                    )}
                </div>
            </div>

            <ClaimRewardModal isOpen={isClaimModalOpen} onClose={() => setIsClaimModalOpen(false)} />
        </div >
    );
}