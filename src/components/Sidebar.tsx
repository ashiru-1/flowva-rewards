import { Gift, Compass, Layers, CreditCard, Settings, Library, Home, X } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const location = useLocation();

    // Helper to determine if a path is active
    const isActive = (path: string) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-[2px] animate-in fade-in duration-200"
                    onClick={onClose}
                />
            )}

            <aside className={`
                w-64 bg-white flex flex-col fixed left-0 top-0 h-screen z-50 border-r border-gray-100 shadow-xl md:shadow-none
                transition-transform duration-300 ease-in-out
                md:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-8 pb-4 flex items-center justify-between">
                    <div className="text-2xl font-bold text-[#8b5cf6] flex gap-2 w-full">
                        <img src="/logo.png" alt="Flowva" className="object-contain w-[80%]" />
                    </div>
                    {/* Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="md:hidden p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
                    <NavItem
                        to="/home"
                        icon={<Home size={20} />}
                        label="Home"
                        active={isActive('/home')}
                    />
                    <NavItem
                        to="/discover"
                        icon={<Compass size={20} />}
                        label="Discover"
                        active={isActive('/discover')}
                    />
                    <NavItem
                        to="/library"
                        icon={<Library size={20} />}
                        label="Library"
                        active={isActive('/library')}
                    />
                    <NavItem
                        to="/tech-stack"
                        icon={<Layers size={20} />}
                        label="Tech Stack"
                        active={isActive('/tech-stack')}
                    />
                    <NavItem
                        to="/subscriptions"
                        icon={<CreditCard size={20} />}
                        label="Subscriptions"
                        active={isActive('/subscriptions')}
                    />

                    <div className="my-6 border-t border-gray-50"></div>

                    <NavItem
                        to="/"
                        icon={<Gift size={20} />}
                        label="Rewards Hub"
                        active={isActive('/')}
                    />
                    <NavItem
                        to="/settings"
                        icon={<Settings size={20} />}
                        label="Settings"
                        active={isActive('/settings')}
                    />
                </nav>

                <div className="p-6">
                    <div className="border-t border-gray-100 pt-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#d946ef] text-white flex items-center justify-center font-bold text-lg shrink-0">
                            D
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-bold text-sm text-gray-800 truncate">John</p>
                            <p className="text-gray-400 text-xs truncate">dadesola75@gmail.com</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

function NavItem({ icon, label, to, active = false }: { icon: any, label: string, to: string, active?: boolean }) {
    return (
        <Link
            to={to}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-all
            ${active
                    ? 'bg-[#f3e8ff] text-[#9333ea]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
        >
            {icon}
            <span className="text-[15px]">{label}</span>
        </Link>
    );
}
