import { motion } from 'framer-motion';
import { Search, Wrench, Users } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'We Audit',
    description: 'We check if ChatGPT, Siri, and Alexa can actually find and understand your restaurant.',
    icon: Search,
  },
  {
    number: '02',
    title: 'We Fix',
    description: 'Our team makes your website AI-friendly: structured menus, readable hours, proper location data.',
    icon: Wrench,
  },
  {
    number: '03',
    title: 'You Get Customers',
    description: 'In less than a week, AI assistants start recommending your restaurant when customers ask.',
    icon: Users,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-padding bg-background">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text">
            How It{' '}
            <span className="text-brand-accent">
              Works
            </span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            From invisible to AI-ready in less than a week—no technical skills required
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Connector Line (hidden on mobile) */}
              {idx < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
              )}

              <div className="card h-full hover:shadow-lg transition-shadow border-t-4 border-t-brand-accent">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center">
                    <span className="text-brand-accent font-bold text-sm">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text mb-2">{step.title}</h3>
                <p className="text-text-muted leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-border shadow-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-brand-primary/20 border-2 border-white flex items-center justify-center"
                >
                  <span className="text-xs text-brand-primary font-medium">{i}</span>
                </div>
              ))}
            </div>
            <span className="text-sm text-text-muted">
              <strong className="text-text">No tech skills needed.</strong> We handle everything.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
