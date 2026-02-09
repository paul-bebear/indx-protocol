import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, AlertCircle, XCircle, Loader2 } from 'lucide-react';
import { CalButton } from './CalButton';

interface Finding {
  type: 'good' | 'warning' | 'error';
  message: string;
}

// Example findings array (replace with real data later)
const generateFindings = (): Finding[] => [
  { type: 'error', message: 'Menu is a PDF - AI cannot read it' },
  { type: 'warning', message: 'Missing structured business hours' },
  { type: 'good', message: 'Website loads properly' },
  { type: 'error', message: 'No restaurant schema markup found' },
];

type ScanStatus = 'idle' | 'scanning' | 'complete';

export function BrandScanner() {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [findings, setFindings] = useState<Finding[]>([]);

  // Progress animation during scanning
  useEffect(() => {
    if (status === 'scanning') {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
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

  // Complete scan after 3 seconds
  useEffect(() => {
    if (status === 'scanning' && progress >= 100) {
      setTimeout(() => {
        setFindings(generateFindings());
        setStatus('complete');
      }, 300);
    }
  }, [progress, status]);

  const startScan = useCallback(() => {
    if (!url) return;
    setStatus('scanning');
    setProgress(0);
    setFindings([]);
  }, [url]);

  const resetScan = useCallback(() => {
    setStatus('idle');
    setProgress(0);
    setFindings([]);
    setUrl('');
  }, []);

  const getScore = () => {
    if (findings.length === 0) return 0;
    const goodCount = findings.filter((f) => f.type === 'good').length;
    return Math.round((goodCount / findings.length) * 100);
  };

  const score = getScore();

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
                Check Your Restaurant&apos;s AI Visibility
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
        {status === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
              {/* Header with Score */}
              <div className="p-8 border-b border-border bg-gradient-to-br from-background to-white">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Score Circle */}
                  <div
                    className={`w-24 h-24 rounded-full border-4 flex items-center justify-center ${
                      score >= 50 ? 'border-success bg-success/10' : 'border-danger bg-danger/10'
                    }`}
                  >
                    <div className="text-center">
                      <span
                        className={`text-3xl font-bold ${
                          score >= 50 ? 'text-success' : 'text-danger'
                        }`}
                      >
                        {score}
                      </span>
                      <span className="text-xs text-text-muted block">out of 100</span>
                    </div>
                  </div>

                  <div className="text-center md:text-left flex-1">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                        score >= 50
                          ? 'bg-success/10 text-success'
                          : 'bg-danger/10 text-danger'
                      }`}
                    >
                      {score >= 50 ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      {score >= 50 ? 'Needs Improvement' : 'Critical Issues Found'}
                    </div>
                    <h3 className="text-xl font-bold text-text">
                      Here&apos;s What We Found
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
                  {findings.map((finding, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-background-muted"
                    >
                      {finding.type === 'good' && (
                        <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      )}
                      {finding.type === 'warning' && (
                        <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                      )}
                      {finding.type === 'error' && (
                        <XCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                      )}
                      <span className="text-sm text-text">{finding.message}</span>
                    </div>
                  ))}
                </div>

                {/* Impact Statement */}
                <div className="mt-6 p-4 bg-brand-primary/5 rounded-lg border border-brand-primary/20">
                  <p className="text-sm text-text">
                    <strong>Estimated impact:</strong> Restaurants with these issues lose
                    approximately{' '}
                    <span className="text-brand-accent font-semibold">$2,000-5,000/month</span>{' '}
                    in AI-discovered customers.
                  </p>
                </div>
              </div>

              {/* CTA Section with Cal.com */}
              <div className="p-8 border-t border-border bg-background-muted">
                <h4 className="font-semibold text-text mb-2 text-center">
                  Want us to fix these issues?
                </h4>
                <p className="text-sm text-text-muted text-center mb-6">
                  Schedule a free 15-minute call. We&apos;ll explain exactly what needs fixing
                  and how we can help.
                </p>
                <div className="flex flex-col items-center gap-3">
                  <CalButton
                    calLink="indexable/15min"
                    className="h-12 px-6 rounded-lg bg-brand-accent text-white font-semibold hover:bg-brand-accent-hover transition-all shadow-md hover:shadow-lg"
                    prefillData={{
                      notes: `Website scanned: ${url}\nScore: ${score}/100\nFindings: ${findings.length} issues found`,
                    }}
                  >
                    Schedule Free 15-Min Call
                  </CalButton>
                  <button
                    onClick={resetScan}
                    className="text-brand-primary text-sm font-medium hover:underline mt-2"
                  >
                    Check another website
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
