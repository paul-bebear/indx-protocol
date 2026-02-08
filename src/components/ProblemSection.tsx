import { motion } from 'framer-motion';
import { Search, Users, TrendingDown, Utensils } from 'lucide-react';

export function ProblemSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text">
            You're Losing{' '}
            <span className="text-brand-accent">
              $36,000+
            </span>
            {' '}Per Year
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Here's why customers can't find your restaurant—and how to fix it
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card text-center hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-brand-primary" />
              </div>
              <div className="text-4xl font-bold mb-2 text-text">{stat.value}</div>
              <div className="text-base font-semibold mb-1 text-text">{stat.label}</div>
              <p className="text-sm text-text-muted">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* The Problem Explained */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-background-muted rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-brand-accent" />
                </div>
                <span className="text-sm font-medium text-brand-accent uppercase tracking-wide">
                  The Problem
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-text">
                Why AI Can't See Your Beautiful Website
              </h3>
              
              <div className="space-y-4 text-text-muted">
                <p>
                  Your website was designed for human eyes. Gorgeous photos of your dishes, 
                  PDF menus, beautiful design.
                </p>
                <p className="text-text font-semibold text-lg">
                  To ChatGPT, Siri, and Alexa, it's practically blank.
                </p>
                <p>
                  AI assistants don't look at pictures—they read code. If your menu is a PDF, 
                  your hours are buried in images, or your location isn't properly formatted, 
                  AI skips you and recommends your competitor instead.
                </p>
              </div>
            </div>

            {/* Visual Comparison */}
            <div className="space-y-4">
              {/* What AI Can't See */}
              <div className="bg-white rounded-xl p-5 border border-danger/20 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-danger/10 flex items-center justify-center">
                    <span className="text-danger text-sm">✕</span>
                  </div>
                  <span className="font-medium text-text">What AI Can't Read</span>
                </div>
                <ul className="space-y-2 text-sm text-text-muted">
                  <li className="flex items-center gap-2">
                    <span className="text-danger">•</span> Menu in PDF format
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-danger">•</span> Hours in image files
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-danger">•</span> Contact info without proper formatting
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-danger">•</span> No FAQ about your cuisine
                  </li>
                </ul>
              </div>

              {/* What AI Can See */}
              <div className="bg-white rounded-xl p-5 border border-success/20 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                    <span className="text-success text-sm">✓</span>
                  </div>
                  <span className="font-medium text-text">What AI Can Read</span>
                </div>
                <ul className="space-y-2 text-sm text-text-muted">
                  <li className="flex items-center gap-2">
                    <span className="text-success">•</span> Structured menu with prices
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">•</span> Machine-readable business hours
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">•</span> Clear location and contact data
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">•</span> FAQ about dishes, allergens, etc.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const stats = [
  {
    icon: Search,
    value: '58%',
    label: 'Use AI to Find You',
    description: 'More than half of diners now search via ChatGPT, Siri, or Alexa'
  },
  {
    icon: TrendingDown,
    value: '90%',
    label: 'Are Invisible',
    description: 'Of restaurant websites cannot be properly read by AI assistants'
  },
  {
    icon: Users,
    value: '$80B',
    label: 'Voice Orders by 2026',
    description: 'If AI cannot find you, you miss this entire market'
  }
];
