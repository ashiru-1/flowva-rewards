import { useState } from 'react';
import { useProfile } from '../hooks/useDashboard';
import { Star, Share2, Users, Copy, Check, Layers, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EarnPointsSection() {
    const { data: profile, isLoading } = useProfile();
    const [copied, setCopied] = useState(false);
    const [isShareStackModalOpen, setIsShareStackModalOpen] = useState(false);
    const hasStack = profile?.has_shared_stack || false;

    // Generate referral code
    const referralLink = `https://app.flowvahub.com/signup/?ref=${profile?.first_name || 'user'}3670`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* --- EARN MORE POINTS --- */}
            <section>
                <SectionHeader title="Earn More Points" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Refer Contest */}
                    <div className="bg-transparent rounded-3xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden hover:scale-[1.02] hover:border-[#9333ea] transition-all duration-300 group cursor-pointer">
                        {isLoading ? (
                            <div className="p-6 animate-pulse bg-white h-full flex flex-col justify-between">
                                <div className="flex gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <div className="h-4 w-32 bg-gray-200 rounded mt-3"></div>
                                </div>
                                <div>
                                    <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                                    <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="bg-white p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-[#8b5cf6]">
                                            <Star size={20} />
                                        </div>
                                        <h4 className="font-semibold text-gray-800 text-sm">Refer and win 10,000 points!</h4>
                                    </div>
                                </div>
                                <div className="p-6 pt-2">
                                    <p className="font-medium text-sm leading-relaxed">
                                        Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of <span className="text-[#8b5cf6] font-bold">10,000 points</span>. Friends must complete onboarding to qualify.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Share Stack */}
                    <div className="bg-transparent rounded-3xl border border-gray-200 shadow-sm flex flex-col h-full relative overflow-hidden hover:scale-[1.02] hover:border-[#9333ea] transition-all duration-300 group cursor-pointer">
                        {isLoading ? (
                            <div className="p-6 animate-pulse bg-white h-full flex flex-col justify-between">
                                <div className="flex gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <div>
                                        <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                                        <div className="h-3 w-16 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-auto pt-4">
                                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                    <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="bg-white p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-[#8b5cf6]">
                                                <Share2 size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 text-sm  ">Share Your Stack</h4>
                                                <p className="text-gray-400 text-xs font-semibold">Earn +25 pts</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 pt-2 mt-auto flex items-center justify-between">
                                    <span className="text-sm font-medium ">Share your tool stack</span>
                                    <button
                                        onClick={() => setIsShareStackModalOpen(true)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-[#8b5cf6] text-sm font-bold hover:bg-[#8b5cf6] hover:text-white transition-all duration-300"
                                    >
                                        <Share2 size={16} /> Share
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </section>


            {/* --- REFER & EARN --- */}
            <section>
                <SectionHeader title="Refer & Earn" />
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    {isLoading ? (
                        <div className="p-8 animate-pulse">
                            <div className="flex gap-4 mb-8">
                                <div className="w-10 h-10 bg-gray-200 rounded"></div>
                                <div className="w-1/2">
                                    <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                                </div>
                            </div>
                            <div className="h-24 bg-gray-200 rounded-2xl mb-8"></div>
                            <div className="h-12 bg-gray-200 rounded-xl mb-4"></div>
                            <div className="flex justify-center gap-4">
                                {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 bg-gray-200 rounded-full"></div>)}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="p-6 md:p-8 bg-[#EEF2FF]">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 text-[#8b5cf6]">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">Share Your Link</h3>
                                        <p className="text-gray-500 text-sm">Invite friends and earn 25 points when they join!</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                {/* Stats Row */}
                                <div className="flex justify-around items-center mb-10 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-[#8b5cf6]">{profile?.referrals || 0}</div>
                                        <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Referrals</div>
                                    </div>
                                    <div className="w-px h-10 bg-gray-200"></div>
                                    <div>
                                        <div className="text-2xl font-bold text-[#8b5cf6]">{profile?.referral_points_earned || 0}</div>
                                        <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Points Earned</div>
                                    </div>
                                </div>

                                {/* Link Input */}
                                <div className="mb-8 bg-[#FAF5FF] p-6 rounded-2xl">
                                    <p className="text-sm text-gray-600 mb-2 font-medium ml-1">Your personal referral link:</p>
                                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-2 pl-4">
                                        <input
                                            readOnly
                                            value={referralLink}
                                            className="bg-transparent border-none outline-none text-gray-600 text-sm w-full font-mono"
                                        />
                                        <button
                                            onClick={handleCopy}
                                            className="p-2 bg-white rounded-lg border border-gray-200 hover:border-[#8b5cf6] text-gray-500 hover:text-[#8b5cf6] transition-all shadow-sm"
                                        >
                                            {copied ? <Check size={18} /> : <Copy size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Social Icons */}
                                <div className="flex justify-center gap-4 ">
                                    <SocialButton color="bg-[#1877F2]" icon={<FacebookIcon />} />
                                    <SocialButton color="bg-black" icon={<XIcon />} />
                                    <SocialButton color="bg-[#0A66C2]" icon={<LinkedinIcon />} />
                                    <SocialButton color="bg-[#25D366]" icon={<WhatsappIcon />} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Share Stack Modal */}
            {isShareStackModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[2px] bg-black/50"
                    onClick={() => setIsShareStackModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-2xl w-full max-w-sm shadow-2xl relative p-8 text-center animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsShareStackModalOpen(false)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-xl font-bold text-gray-900 mb-6">Share Your Stack</h3>

                        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-[#9333ea] mx-auto mb-6">
                            <Layers size={32} />
                        </div>

                        {!hasStack ? (
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                You have no stack created yet, go to Tech Stack to create one.
                            </p>
                        ) : (
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                Your stack is ready to share!
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// --- Helper Components ---

function SectionHeader({ title }: { title: string }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-[#8b5cf6] rounded-full"></div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
    );
}

function SocialButton({ color, icon }: { color: string, icon: any }) {
    return (
        <button className={`${color} w-10 h-10 rounded-full flex items-center cursor-pointer justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-gray-200`}>
            {icon}
        </button>
    );
}


const FacebookIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
);
const XIcon = () => (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const LinkedinIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
);
const WhatsappIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
);