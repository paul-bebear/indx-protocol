import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Lock, Zap, Sparkles, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialUrl: string;
}

interface FormErrors {
    businessName?: string;
    contactName?: string;
    email?: string;
    websiteUrl?: string; // kept for compatibility
}

export function LeadCaptureModal({ isOpen, onClose, initialUrl }: LeadCaptureModalProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState({
        businessName: '',
        contactName: '',
        email: '',
        websiteProtocol: 'https://',
        websiteDomain: initialUrl.replace(/^https?:\/\//, ''),
        businessType: 'Restaurant'
    });

    useEffect(() => {
        if (isOpen) {
            setIsSubmitted(false);
            setIsLoading(false);
            setSubmitError(null);
            setErrors({});
            setFormData(prev => ({ 
                ...prev, 
                websiteProtocol: 'https://',
                websiteDomain: initialUrl.replace(/^https?:\/\//, '')
            }));
        } else {
            const timer = setTimeout(() => {
                setIsSubmitted(false);
                setIsLoading(false);
                setSubmitError(null);
                setErrors({});
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, initialUrl]);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const getFullUrl = (): string => {
        return formData.websiteProtocol + formData.websiteDomain;
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.businessName.trim()) {
            newErrors.businessName = 'Business name is required';
        }

        if (!formData.contactName.trim()) {
            newErrors.contactName = 'Your name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.websiteDomain.trim()) {
            newErrors.websiteUrl = 'Website domain is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('https://bernardine-nonneural-glacially.ngrok-free.dev/webhook/audit-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    website: getFullUrl(),
                    email: formData.email.trim().toLowerCase(),
                    businessName: formData.businessName.trim(),
                    contactName: formData.contactName.trim(),
                    businessType: formData.businessType,
                    date: new Date().toISOString()
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                setSubmitError('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting lead:', error);
            setSubmitError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const inputClassName = (fieldError?: string) =>
        cn(
            "w-full h-11 bg-white border rounded-lg px-4 text-text focus:outline-none focus:ring-2 transition-all",
            fieldError
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-border focus:border-brand-primary focus:ring-brand-primary/20"
        );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="pointer-events-auto w-full max-w-md"
                        >
                            <div className={cn(
                                "bg-white rounded-2xl border shadow-xl p-6",
                                isSubmitted ? "border-green-200" : "border-border"
                            )}>
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className={cn(
                                        "text-xl font-bold",
                                        isSubmitted ? "text-green-600" : "text-text"
                                    )}>
                                        {isSubmitted ? "Audit Scheduled!" : "Get Your Free AI Audit"}
                                    </h3>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-gray-100 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Content */}
                                <AnimatePresence mode="wait">
                                    {isSubmitted ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex flex-col items-center text-center py-6 gap-4"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                                                <Sparkles className="w-8 h-8 text-green-600" />
                                            </div>
                                            <p className="text-lg text-text font-medium">
                                                Audit submitted! Check your email for results.
                                            </p>
                                            <p className="text-sm text-text-muted">
                                                We'll analyze {getFullUrl()} and send your personalized AI readiness report.
                                            </p>

                                            <button
                                                onClick={onClose}
                                                className="mt-4 px-6 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                                            >
                                                Close
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            onSubmit={handleSubmit}
                                            className="flex flex-col gap-4"
                                        >
                                            {/* Business Name */}
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-text">
                                                    Business Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.businessName}
                                                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                                                    placeholder="Rossi's Trattoria"
                                                    className={inputClassName(errors.businessName)}
                                                />
                                                {errors.businessName && (
                                                    <p className="text-xs text-red-500">{errors.businessName}</p>
                                                )}
                                            </div>

                                            {/* Your Name */}
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-text">
                                                    Your Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.contactName}
                                                    onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                                                    placeholder="Maria Rossi"
                                                    className={inputClassName(errors.contactName)}
                                                />
                                                {errors.contactName && (
                                                    <p className="text-xs text-red-500">{errors.contactName}</p>
                                                )}
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-text">
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="maria@rossistrattoria.com"
                                                    className={inputClassName(errors.email)}
                                                />
                                                {errors.email && (
                                                    <p className="text-xs text-red-500">{errors.email}</p>
                                                )}
                                            </div>

                                            {/* Website URL */}
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-text">
                                                    Website URL <span className="text-red-500">*</span>
                                                </label>
                                                <div className="flex gap-2">
                                                    <select
                                                        value={formData.websiteProtocol}
                                                        onChange={e => setFormData({ ...formData, websiteProtocol: e.target.value })}
                                                        className="h-11 bg-white border border-border rounded-lg px-3 text-text focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all"
                                                    >
                                                        <option value="https://">https://</option>
                                                        <option value="http://">http://</option>
                                                    </select>
                                                    <input
                                                        type="text"
                                                        value={formData.websiteDomain}
                                                        onChange={e => setFormData({ ...formData, websiteDomain: e.target.value })}
                                                        placeholder="rossistrattoria.com"
                                                        className={cn(inputClassName(errors.websiteUrl), 'flex-1')}
                                                    />
                                                </div>
                                                {errors.websiteUrl && (
                                                    <p className="text-xs text-red-500">{errors.websiteUrl}</p>
                                                )}
                                            </div>

                                            {/* Business Type */}
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-text">
                                                    Business Type
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.businessType}
                                                        onChange={e => setFormData({ ...formData, businessType: e.target.value })}
                                                        className="w-full h-11 bg-white border border-border rounded-lg px-4 text-text focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none appearance-none transition-all"
                                                    >
                                                        <option value="Restaurant">Restaurant</option>
                                                        <option value="E-commerce">E-commerce</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                                                        <ChevronDown size={16} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Error message */}
                                            {submitError && (
                                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                                                    {submitError}
                                                </div>
                                            )}

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="mt-2 h-12 w-full bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        <span>Submitting...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Get My Free Audit</span>
                                                        <ArrowRight size={18} />
                                                    </>
                                                )}
                                            </button>

                                            {/* Trust signals */}
                                            <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-xs text-text-muted">
                                                <div className="flex items-center gap-1.5">
                                                    <Lock size={12} className="text-brand-primary" />
                                                    <span>No credit card required</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Zap size={12} className="text-brand-primary" />
                                                    <span>Results in 24 hours</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Sparkles size={12} className="text-brand-primary" />
                                                    <span>Free forever</span>
                                                </div>
                                            </div>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
