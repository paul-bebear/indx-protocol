import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, AlertCircle, XCircle, ArrowRight, Loader2, Calendar } from 'lucide-react';
import { useExitIntent } from '../hooks/useExitIntent';
import { ExitIntentModal } from './ExitIntentModal';
import { supabase } from '../lib/supabaseClient';

type ScanStatus = 'idle' | 'scanning' | 'complete' | 'verified';

interface ScanResult {
  score: number;
  findings: Finding[];
}

interface Finding {
  type: 'good' | 'warning' | 'error';
  message: string;
}

// Sample findings for demo - in real app, these come from actual scan
const generateFindings = (isVerified: boolean): Finding[] => {
  if (isVerified) {
    return [
      { type: 'good', message: 'Business hours properly formatted' },
      { type: 'good', message: 'Menu is AI-readable (not PDF)' },
      { type: 'good', message: 'Location data is structured' },
      { type: 'good', message: 'FAQ section helps AI understand your offerings' },
    ];
  }
  
  return [
    { type: 'error', message: 'Menu is a PDF - AI cannot read it' },
    { type: 'warning', message: 'Missing structured business hours' },
    { type: 'error', message: 'No FAQ section for common questions' },
    { type: 'warning', message: 'Contact info not properly formatted' },
    { type: 'error', message: 'Not appearing in AI assistant results' },
  ];
};

const calculateScore = (findings: Finding[]): number => {
  const goodCount = findings.filter(f => f.type === 'good').length;
  return Math.round((goodCount / findings.length) * 100);
};

export function BrandScanner() {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [, setConnectionError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);

  // Exit Intent
  const { showModal, closeModal, resetTriggers } = useExitIntent({
    isEnabled: status === 'complete' && !isSubmitted,
    inactivityTimeout: 60000,
  });

  const handleSecureNode = useCallback(() => {
    if (emailInputRef.current) {
      emailInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => emailInputRef.current?.focus(), 500);
    }
  }, []);

  useEffect(() => {
    if (status === 'complete' && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [status]);

  // Progress animation during scanning
  useEffect(() => {
    if (status === 'scanning') {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Complete scan when progress reaches 100
  useEffect(() => {
    if (status === 'scanning' && progress >= 100) {
      setTimeout(() => {
        const findings = generateFindings(isVerified);
        setResult({
          score: calculateScore(findings),
          findings
        });
        setStatus(isVerified ? 'verified' : 'complete');
      }, 500);
    }
  }, [progress, status, isVerified]);

  const startScan = useCallback(async () => {
    if (!url) return;
    setStatus('scanning');
    setProgress(0);
    resetTriggers();
    setIsVerified(false);
    setConnectionError(null);
    setResult(null);

    let domain = url.trim().toLowerCase();
    domain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/.*$/, '');

    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('registry_nodes')
          .select('status')
          .eq('domain', domain)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Database error:', error);
        } else if (data && data.status === 'verified') {
          setIsVerified(true);
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  }, [url, resetTriggers]);

  const handleEmailSubmit = useCallback(() => {
    if (!email) return;
    setIsSubmitted(true);
    // Simulate API call
    setTimeout(() => {
      // Success state
    }, 600);
  }, [email]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-danger';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-success';
    if (score >= 50) return 'bg-warning';
    return 'bg-danger';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Good';
    if (score >= 50) return 'Needs Work';
    return 'Critical';
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-16 px-4">
      <AnimatePresence mode="wait">
        {/* IDLE STATE */}
        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl shadow-xl border border-border p-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                <Search className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-text mb-2">
                Check Your Restaurant's AI Visibility
              </h3>
              <p className="text-text-muted">
                Find out if ChatGPT, Siri, and Alexa can find your restaurant
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Enter your restaurant website
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourrestaurant.com"
                  className="w-full h-14 border border-border rounded-lg px-4 text-text placeholder:text-text-light focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                />
              </div>
              <motion.button
                onClick={startScan}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={!url}
                className="h-14 w-full rounded-lg bg-brand-accent text-white font-semibold hover:bg-brand-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                Check My Visibility
              </motion.button>
            </div>

            <p className="text-center text-xs text-text-muted mt-4">
              Free analysis • Takes under 5 minutes • No signup required
            </p>
          </motion.div>
        )}

        {/* SCANNING STATE */}
        {status === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="bg-white rounded-2xl shadow-xl border border-border p-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6">
                <Loader2 className="w-16 h-16 text-brand-accent animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                Analyzing your website...
              </h3>
              <p className="text-text-muted mb-8">
                Checking if AI assistants can read your restaurant information
              </p>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-brand-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-sm text-text-muted">{progress}% complete</p>
            </div>
          </motion.div>
        )}

        {/* COMPLETE STATE - Results */}
        {(status === 'complete' || status === 'verified') && result && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
              {/* Header with Score */}
              <div className="p-8 border-b border-border bg-gradient-to-br from-background to-white">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Score Circle */}
                  <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center ${getScoreBg(result.score)} bg-opacity-10 border-current`}>
                    <div className="text-center">
                      <span className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                        {result.score}
                      </span>
                      <span className="text-xs text-text-muted block">out of 100</span>
                    </div>
                  </div>

                  <div className="text-center md:text-left flex-1">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-2 ${getScoreBg(result.score)} bg-opacity-10 ${getScoreColor(result.score)}`}>
                      {result.score >= 80 ? <CheckCircle className="w-4 h-4" /> : 
                       result.score >= 50 ? <AlertCircle className="w-4 h-4" /> : 
                       <XCircle className="w-4 h-4" />}
                      {getScoreLabel(result.score)}
                    </div>
                    <h3 className="text-xl font-bold text-text">
                      Here's What We Found
                    </h3>
                    <p className="text-text-muted">
                      {url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/.*$/, '')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Findings List */}
              <div className="p-8">
                <h4 className="font-semibold text-text mb-4">Opportunities to Improve</h4>
                <div className="space-y-3">
                  {result.findings.map((finding, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-background-muted"
                    >
                      {finding.type === 'good' && <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />}
                      {finding.type === 'warning' && <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />}
                      {finding.type === 'error' && <XCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />}
                      <span className="text-sm text-text">{finding.message}</span>
                    </div>
                  ))}
                </div>

                {/* Impact Statement */}
                <div className="mt-6 p-4 bg-brand-primary/5 rounded-lg border border-brand-primary/20">
                  <p className="text-sm text-text">
                    <strong>Estimated impact:</strong> Restaurants with these issues lose approximately{' '}
                    <span className="text-brand-accent font-semibold">$2,000-5,000/month</span> in AI-discovered customers.
                  </p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="p-8 border-t border-border bg-background-muted">
                {!isSubmitted ? (
                  <>
                    <h4 className="font-semibold text-text mb-2 text-center">
                      Want us to fix these issues?
                    </h4>
                    <p className="text-sm text-text-muted text-center mb-6">
                      Schedule a free 15-minute call. We'll explain exactly what needs fixing and how we can help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        ref={emailInputRef}
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 h-12 border border-border rounded-lg px-4 text-text placeholder:text-text-light focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                      />
                      <motion.button
                        onClick={handleEmailSubmit}
                        disabled={!email}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="h-12 px-6 rounded-lg bg-brand-primary text-white font-semibold hover:bg-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <Calendar className="w-4 h-4" />
                        Schedule Free Call
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <h4 className="font-semibold text-text mb-2">You're All Set!</h4>
                    <p className="text-text-muted text-sm mb-4">
                      We'll email you within 24 hours to schedule your free call.
                    </p>
                    <button
                      onClick={() => {
                        setStatus('idle');
                        setIsSubmitted(false);
                        setEmail('');
                        setUrl('');
                      }}
                      className="text-brand-primary text-sm font-medium hover:underline"
                    >
                      Check another website
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent Modal */}
      <ExitIntentModal
        isOpen={showModal}
        onClose={closeModal}
        onSecureNode={handleSecureNode}
      />
    </div>
  );
}
