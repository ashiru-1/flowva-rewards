import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;
            setSubmitted(true);
            toast.success('Reset link sent!');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#8b5cf6] p-4">
            <Toaster position="top-center" />
            <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[#8b5cf6] mb-2">Reset Password</h2>
                    <p className="text-gray-500 text-sm">Enter your email to receive a reset link</p>
                </div>

                {submitted && (
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6 text-center animate-in fade-in slide-in-from-top-2">
                        <p className="text-green-800 text-sm leading-relaxed">
                            We've sent you a password reset link. If your email is registered, it should arrive shortly.
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/10 transition-all bg-gray-50"
                            placeholder="your@email.com"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || submitted}
                        className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-[#8b5cf6]/30 disabled:opacity-70 disabled:cursor-not-allowed mt-2 cursor-pointer flex items-center justify-center gap-2"
                    >
                        {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Remember your password?{' '}
                        <Link to="/login" className="text-[#8b5cf6] font-semibold hover:underline cursor-pointer">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
