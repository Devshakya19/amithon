/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Ticket, 
  Users, 
  Building2, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { loginWithGoogle, registerWithEmail } from '@/lib/appwrite/auth';
import { useUser } from '@/context/UserProvider';
import { departments, years } from '@/lib/departments';

export default function RegisterPage() {
  const router = useRouter();
  const { refresh } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');

  const stats = [
    { icon: <Ticket className="w-5 h-5 text-secondary" />, label: 'Live event access' },
    { icon: <Users className="w-5 h-5 text-primary" />, label: 'Role-based routing' },
    { icon: <Building2 className="w-5 h-5 text-tertiary" />, label: 'Department profiles' }
  ];

  return (
    <div className="bg-background text-on-surface min-h-screen flex items-center justify-center font-sans overflow-hidden">
      <div className="flex w-full h-screen">
        
        {/* Left Side: Illustration Area */}
        <div className="hidden lg:flex w-1/2 relative mesh-gradient dot-grid flex-col items-center justify-center p-16 overflow-hidden">
          {/* Animated Floating Orbs */}
          <motion.div 
            animate={{ 
              x: [0, 50, 0], 
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-[500px] h-[500px] rounded-full bg-primary-container/20 blur-[100px] top-1/4 -left-1/4" 
          />
          <motion.div 
            animate={{ 
              x: [0, -40, 0], 
              y: [0, 60, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute w-[400px] h-[400px] rounded-full bg-tertiary-container/20 blur-[80px] bottom-1/4 -right-1/4" 
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center text-center max-w-lg"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img 
                alt="AMITHON Brand Logo" 
                className="w-48 h-48 object-contain mb-8 filter drop-shadow-[0_0_30px_rgba(37,99,235,0.6)]" 
                src="https://lh3.googleusercontent.com/aida/ADBb0ugCIOMiv3OmMgT0zb0UdcDDi5pcfUlq-SLMfkhUfAwBRYQDvjA55xzX2yod_e860L8hDMmAzgQAGqHVnHu90efsuVgd4N0piiyup6oR-_TIz8j-KmULVhAZB9pixO4GVApcPx7lnQ_OUFt5-ZqSHit8mw-1KX-4LoydTdUHjAG0rqV79vVGDpvyVG5fdIIb2NrQe4A9lvUpHB4JmSHkDY577ptYh4rZLZ461fEkTLvu0scAjk7ZNnQTUlc"
              />
            </motion.div>
            
            <h1 className="text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 drop-shadow-lg">
              Join the elite <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary block">
                innovator network
              </span> 
              at Amity
            </h1>

            {/* Glassmorphism Pills */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass-pill px-6 py-3 rounded-full flex items-center gap-3 transform hover:scale-105 transition-transform cursor-default"
                >
                  {stat.icon}
                  <span className="font-semibold text-sm tracking-wide">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Register Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-16 relative bg-surface-container-lowest dot-grid overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel w-full max-w-md p-8 lg:p-10 rounded-2xl flex flex-col gap-8 shadow-2xl relative z-10"
          >
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-2">
              <div className="text-2xl font-black tracking-tighter text-primary-container bg-primary-container/10 px-4 py-1 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.2)] mb-2">
                AMITHON
              </div>
              <h2 className="text-3xl font-bold">Create account</h2>
              <p className="text-on-surface-variant">Create your AMITHON account</p>
            </div>

            {/* Google OAuth */}
            <button
              className="w-full h-12 flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-200 active:scale-[0.98]"
              onClick={async () => {
                setError('');
                try {
                  await loginWithGoogle();
                } catch (err) {
                  setError('Google sign-in failed. Please try again.');
                }
              }}
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 text-outline font-semibold text-xs tracking-widest uppercase opacity-50">
              <div className="flex-1 h-px bg-outline/20"></div>
              <span>OR</span>
              <div className="flex-1 h-px bg-outline/20"></div>
            </div>

            {/* Form */}
            <form
              className="flex flex-col gap-5"
              onSubmit={async (e) => {
                e.preventDefault();
                setError('');

                if (!fullName || !studentId || !email || !password || !confirmPassword || !department || !year || !semester) {
                  setError('Please fill in all required fields.');
                  return;
                }

                if (password !== confirmPassword) {
                  setError('Passwords do not match.');
                  return;
                }

                try {
                  setIsSubmitting(true);
                  await registerWithEmail({
                    email,
                    password,
                    name: fullName,
                    studentId,
                    department,
                    year,
                    semester,
                  });

                  // Refresh global user context so the dashboard renders immediately
                  try {
                    await refresh();
                  } catch (refreshErr) {
                    console.warn('User context refresh failed after registration:', refreshErr);
                  }

                  router.push('/dashboard/student');
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Full Name</label>
                  <input 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300 placeholder:text-outline-variant" 
                    placeholder="John Doe" 
                    type="text" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Student ID</label>
                  <input 
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300 placeholder:text-outline-variant" 
                    placeholder="A2304221000" 
                    type="text" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300"
                  >
                    <option value="">Select department</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-on-surface-variant">Year</label>
                    <select
                      value={year}
                      onChange={(e) => {
                        setYear(e.target.value);
                        setSemester('');
                      }}
                      className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300"
                    >
                      <option value="">Select year</option>
                      {years.map((y) => (
                        <option key={y.value} value={y.value}>{y.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-on-surface-variant">Semester</label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      disabled={year === ''}
                      className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300 disabled:opacity-60"
                    >
                      <option value="">Select semester</option>
                      {year && years.find((y) => y.value === year)?.semesters.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-on-surface-variant flex items-center justify-between">
                  Email
                </label>
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300 placeholder:text-outline-variant" 
                  placeholder="name@example.com" 
                  type="email" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Password</label>
                  <div className="relative w-full">
                    <input 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300 placeholder:text-outline-variant pr-10" 
                      placeholder="••••••••" 
                      type={showPassword ? 'text' : 'password'} 
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors p-1" 
                      type="button"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Confirm</label>
                  <div className="relative w-full">
                    <input 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300 placeholder:text-outline-variant pr-10" 
                      placeholder="••••••••" 
                      type={showConfirmPassword ? 'text' : 'password'} 
                    />
                    <button 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors p-1" 
                      type="button"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <button 
                className="w-full h-12 bg-primary-container text-white font-bold py-3 px-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 mt-2 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Account'}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {error && (
              <div className="text-sm text-rose-200 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {/* Footer Links */}
            <div className="flex flex-col items-center gap-4 mt-2 text-center">
              <Link className="text-sm font-semibold text-primary hover:text-primary-container transition-colors flex items-center gap-2 group" href="/login">
                Already have an account? Sign in 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-xs text-outline-variant mt-4 leading-relaxed max-w-[280px]">
                Use any valid email address to create your account.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
