import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, GraduationCap, Chrome } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import GlassPanel from '../ui/GlassPanel';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const { login, signup, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      navigate('/dashboard'); // ✅ redirect after login/signup
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      await resetPassword(email);
      setResetEmailSent(true);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <GlassPanel className="p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 rounded-xl shadow-lg shadow-[#3BBC9B]/25">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">BPEC-LMS</h1>
            </div>
            <p className="text-gray-400">AI-Powered Learning Management System</p>
          </div>

          {resetEmailSent ? (
            <div className="text-center">
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg mb-6">
                <p className="text-green-400">Password reset email sent! Check your inbox.</p>
              </div>
              <button
                onClick={() => setResetEmailSent(false)}
                className="text-[#3BBC9B] hover:text-[#3BBC9B]/80 transition-colors"
              >
                Back to login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-[#3BBC9B] focus:ring-1 focus:ring-[#3BBC9B] outline-none"
                  placeholder="Email address"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-[#3BBC9B] focus:ring-1 focus:ring-[#3BBC9B] outline-none"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 text-white font-semibold rounded-lg shadow-lg shadow-[#3BBC9B]/25 hover:scale-105 transition-all disabled:opacity-50"
                whileTap={{ scale: 0.98 }}
              >
                {loading ? <LoadingSpinner size="sm" /> : isLogin ? 'Sign In' : 'Sign Up'}
              </motion.button>

              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
              >
                <Chrome className="w-5 h-5" /> Sign in with Google
              </button>

              {/* Forgot Password + Switch */}
              <div className="flex justify-between text-sm text-gray-400">
                <button type="button" onClick={handleResetPassword} className="hover:text-[#3BBC9B]">
                  Forgot password?
                </button>
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="hover:text-[#3BBC9B]">
                  {isLogin ? "Create account" : "Already have an account?"}
                </button>
              </div>
            </form>
          )}
        </GlassPanel>
      </motion.div>
    </div>
  );
};

export default Login;
