
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';


export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#f9fafb] flex font-sans text-slate-800 relative">

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 p-4 md:p-8 md:ml-64 min-h-screen md:mt-0 transition-all duration-300">
                <Outlet context={{ openSidebar: () => setIsSidebarOpen(true) }} />
            </main>
        </div>
    );
}
