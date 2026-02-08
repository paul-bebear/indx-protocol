import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Phone, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ConsultingHeroProps {
  onGetAudit?: () => void;
  onSeeHowItWorks?: () => void;
}

const AI_MODELS = [
  { name: 'ChatGPT', color: '#10a37f', gradient: 'from-emerald-500 to-teal-600' },      // OpenAI green
  { name: 'Claude', color: '#d97757', gradient: 'from-orange-500 to-coral-600' },       // Anthropic orange
  { name: 'Gemini', color: '#4285f4', gradient: 'from-blue-500 to-blue-600' },          // Google blue
  { name: 'Perplexity', color: '#20808d', gradient: 'from-teal-500 to-cyan-600' },      // Perplexity teal
  { name: 'Siri', color: '#1e3a5f', gradient: 'from-indigo-500 to-purple-600' },        // Apple-ish
  { name: 'Alexa', color: '#00ca8c', gradient: 'from-emerald-400 to-green-500' },       // Amazon teal
];

export function ConsultingHero({ onGetAudit, onSeeHowItWorks }: ConsultingHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AI_MODELS.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const currentModel = AI_MODELS[currentIndex];

  return (
    <section className="min-h-[90vh] w-full flex items-center px-6 pt-20 pb-12 relative bg-gradient-to-br from-background via-white to-background">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-6"
            >
              <Users className="w-4 h-4" />
              <span>Trusted by 47+ Restaurants</span>
            </motion.div>

            {/* Main Headline with Animated AI Model */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-text">
              Are Customers Finding Your Restaurant on{' '}
              <span className="relative inline-block min-w-[200px] md:min-w-[280px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentModel.name}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: 90 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`inline-block bg-gradient-to-r ${currentModel.gradient} bg-clip-text text-transparent`}
                    style={{ color: currentModel.color }}
                  >
                    {currentModel.name}?
                  </motion.span>
                </AnimatePresence>
                {/* Cursor blink effect */}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block w-[3px] h-[0.9em] ml-1 align-middle rounded-full"
                  style={{ backgroundColor: currentModel.color }}
                />
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-lg md:text-xl text-text-muted mb-8 max-w-xl leading-relaxed">
              90% of restaurants are invisible to AI assistants. When customers ask 
              "Where should I eat?", AI recommends your competitors—not you. 
              We fix that in less than a week.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
              <motion.button
                onClick={onGetAudit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-brand-accent text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all text-base"
              >
                Free AI Visibility Check
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <button
                onClick={onSeeHowItWorks}
                className="px-8 py-4 border-2 border-brand-primary text-brand-primary rounded-lg font-semibold hover:bg-brand-primary hover:text-white transition-all text-base bg-white"
              >
                See How It Works
              </button>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 text-sm text-text-muted"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>Under a Week</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>Results Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>No Tech Skills Required</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 relative p-4 md:p-8"
          >
            {/* Main Image Placeholder - Restaurant Scene */}
            <div className="relative aspect-[4/3] rounded-2xl shadow-2xl bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 overflow-hidden">
              {/* Placeholder for restaurant image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-brand-primary" />
                  </div>
                  <p className="text-text-muted text-sm">
                    [Restaurant interior photo]<br />
                    Warm, busy dining room scene
                  </p>
                </div>
              </div>
              
              {/* Floating Card - AI Query Simulation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-2 md:bottom-4 md:-left-6 bg-white rounded-xl shadow-xl p-4 border border-border max-w-[200px] z-10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-brand-accent" />
                  </div>
                  <span className="text-xs text-text-muted font-medium">Customer asks:</span>
                </div>
                <p className="text-sm text-text font-medium">
                  "Best Italian restaurant near me?"
                </p>
                <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-text-muted">
                    ChatGPT recommends:<br />
                    <span className="text-danger font-medium">Your competitor</span>
                  </p>
                </div>
              </motion.div>
              
              {/* Floating Card - Stats */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -top-6 -right-2 md:top-4 md:-right-6 bg-white rounded-xl shadow-xl p-4 border border-border z-10"
              >
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-accent">58%</p>
                  <p className="text-xs text-text-muted mt-1">
                    of customers use<br />AI to find restaurants
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
