import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { authSchema, type AuthFormData } from '../lib/schemas';
import { Eye, EyeOff } from 'lucide-react';


export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<AuthFormData>({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState<Partial<AuthFormData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (formErrors[name as keyof AuthFormData]) {
            setFormErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFormErrors({});

        // --- ZOD VALIDATION START ---
        const validationResult = authSchema.safeParse(formData);
        if (!validationResult.success) {
            const fieldErrors: Partial<AuthFormData> = {};
            validationResult.error.issues.forEach((err) => {
                if (err.path[0]) {
                    const fieldName = err.path[0] as keyof AuthFormData;
                    fieldErrors[fieldName] = err.message;
                }
            });

            setFormErrors(fieldErrors);
            setLoading(false);
            return;
        }
        // --- ZOD VALIDATION END ---

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: { data: { first_name: 'Explorer' } },
                });
                if (error) throw error;
                toast.success('Account created! You can now log in.');
                setIsSignUp(false);
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (error) throw error;
                toast.success('Welcome back!');
                navigate('/');
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#8b5cf6] p-4">
            <Toaster position="top-center" />

            <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl">

                {/* Header */}
                <div className="flex justify-center mb-6">
                    <img src="/logo.png" alt="Flowva" className="h-12 w-auto object-contain" />
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    {isSignUp ? 'Create an account' : 'Log in to flowva'}
                </h2>

                <p className="text-center text-gray-500 mb-8 text-sm">
                    {isSignUp ? 'Start your journey today' : 'Log in to your dashboard'}
                </p>

                {/* Form */}
                <form onSubmit={handleAuth} className="space-y-4">

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50
                ${formErrors.email
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                    : 'border-gray-200 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]/20'
                                }`}
                            placeholder="user@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {/* Error Message */}
                        {formErrors.email && (
                            <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 pr-10
                ${formErrors.password
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]/20'
                                    }`}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {formErrors.password && (
                            <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.password}</p>
                        )}
                        <div className="flex justify-end mt-2">
                            <a href="/forgot-password" className="text-xs font-semibold text-[#8b5cf6] hover:text-[#7c3aed] transition-colors cursor-pointer">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-[#8b5cf6]/30 disabled:opacity-70 disabled:cursor-not-allowed mt-2 cursor-pointer"
                    >
                        {loading ? 'Processing...' : (isSignUp ? 'Sign up' : 'Sign in')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setFormErrors({});
                            setFormData({ email: '', password: '' });
                        }}
                        className="text-sm text-gray-500 hover:text-[#8b5cf6] font-medium transition-colors cursor-pointer"
                    >
                        {isSignUp
                            ? 'Already have an account? Sign in'
                            : "Don't have an account? Sign up"}
                    </button>
                </div>
            </div>
        </div>
    );
}