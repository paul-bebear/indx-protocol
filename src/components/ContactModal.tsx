import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageType: 'setup' | 'growth';
}

interface FormData {
  name: string;
  email: string;
  website: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  website?: string;
}

export function ContactModal({ isOpen, onClose, packageType }: ContactModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    website: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const packageName = packageType === 'setup' ? 'AI-Ready Setup' : 'Full Growth Package';
  const packagePrice = packageType === 'setup' ? '$1,500' : '$4,000';

  // Pre-fill message based on package
  const getPrefilledMessage = () => {
    if (packageType === 'setup') {
      return "I'm interested in the AI-Ready Setup package. I'd like to learn more about how you can help my restaurant become AI-visible in 5 days.";
    }
    return "I'm interested in the Full Growth Package. I'd like to discuss the 3-month optimization plan and priority support for my restaurant.";
  };

  // Set initial message when modal opens
  useState(() => {
    if (isOpen && !formData.message) {
      setFormData((prev) => ({ ...prev, message: getPrefilledMessage() }));
    }
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUrl = (url: string): boolean => {
    return url.startsWith('http://') || url.startsWith('https://');
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.website.trim()) {
      newErrors.website = 'Website URL is required';
    } else if (!validateUrl(formData.website)) {
      newErrors.website = 'URL must start with http:// or https://';
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

    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://bernardine-nonneural-glacially.ngrok-free.dev/webhook/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            website: formData.website.trim(),
            message: formData.message.trim() || getPrefilledMessage(),
            package_type: packageName,
            date: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form after close animation
    setTimeout(() => {
      setFormData({ name: '', email: '', website: '', message: '' });
      setErrors({});
      setIsSubmitted(false);
      setSubmitError(null);
    }, 300);
  };

  const inputClassName = (fieldError?: string) =>
    cn(
      'w-full h-11 bg-white border rounded-lg px-4 text-text focus:outline-none focus:ring-2 transition-all',
      fieldError
        ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
        : 'border-border focus:border-brand-primary focus:ring-brand-primary/20'
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
            onClick={handleClose}
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
              <div
                className={cn(
                  'bg-white rounded-2xl border shadow-xl p-6',
                  isSubmitted ? 'border-green-200' : 'border-border'
                )}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  {isSubmitted ? (
                    <h3 className="text-xl font-bold text-green-600">Message Sent!</h3>
                  ) : (
                    <div>
                      <h3 className="text-xl font-bold text-text">
                        Get Started with {packageName}
                      </h3>
                      <p className="text-sm text-text-muted">{packagePrice}</p>
                    </div>
                  )}
                  <button
                    onClick={handleClose}
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
                        <Check className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-lg text-text font-medium">
                        Thanks! We&apos;ll reach out within 24 hours.
                      </p>
                      <button
                        onClick={handleClose}
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
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-text">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="John Smith"
                          className={inputClassName(errors.name)}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500">{errors.name}</p>
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
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="john@restaurant.com"
                          className={inputClassName(errors.email)}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500">{errors.email}</p>
                        )}
                      </div>

                      {/* Website */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-text">
                          Restaurant Website <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.website}
                          onChange={(e) =>
                            setFormData({ ...formData, website: e.target.value })
                          }
                          placeholder="https://yourrestaurant.com"
                          className={inputClassName(errors.website)}
                        />
                        {errors.website && (
                          <p className="text-xs text-red-500">{errors.website}</p>
                        )}
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-text">
                          Message <span className="text-text-muted">(optional)</span>
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder="Tell us about your restaurant..."
                          rows={3}
                          className={cn(
                            inputClassName(),
                            'py-3 resize-none'
                          )}
                        />
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
                        disabled={isSubmitting}
                        className="mt-2 h-12 w-full bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <span>Send Message</span>
                        )}
                      </button>
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
