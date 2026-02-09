import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { CalButton } from './CalButton';
import { cn } from '../lib/utils';

interface PricingSectionProps {
  onOpenAuditModal?: () => void;
}

const tiers = [
  {
    name: 'Free Visibility Check',
    price: 'FREE',
    description: 'See where you stand',
    features: [
      'Complete AI readability scan',
      'Lost customer estimate',
      'Specific fix recommendations',
      'No obligation, no signup required',
    ],
    cta: 'Get Free Check',
    action: 'audit' as const,
    featured: false,
  },
  {
    name: 'AI-Ready Setup',
    price: '$1,500',
    description: 'One-time • 5-day delivery',
    roi: 'Pays for itself in 2 weeks',
    features: [
      'Everything in Free Check',
      'Full AI optimization',
      'Menu and hours restructuring',
      'AI discovery files created',
      'Before/after testing',
      'First month monitoring',
    ],
    cta: 'Get Started',
    action: 'cal' as const,
    featured: true,
  },
  {
    name: 'Full Growth Package',
    price: '$4,000',
    description: 'One-time • Includes 3 months',
    roi: 'Best for busy restaurants',
    features: [
      'Everything in AI-Ready Setup',
      '3 months of optimization',
      'Priority support (same-day)',
      'Quarterly strategy reviews',
      'Competitor monitoring',
    ],
    cta: 'Contact Us',
    action: 'cal' as const,
    featured: false,
  },
];

export function PricingSection({ onOpenAuditModal }: PricingSectionProps) {
  return (
    <section className="section-padding bg-background-alt" id="pricing">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent text-sm font-medium mb-4">
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold mb-4 text-text">
            Transparent Pricing
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Most restaurants see return on investment within 2-4 weeks. Start with a free
            check to see your exact numbers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                'relative p-6 rounded-2xl border bg-white flex flex-col',
                tier.featured
                  ? 'border-2 border-brand-accent shadow-xl scale-105 md:scale-110 z-10'
                  : 'border-border shadow-sm'
              )}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-brand-accent text-white text-sm font-semibold rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-serif font-semibold mb-1 text-text">
                  {tier.name}
                </h3>
                <div className="text-4xl font-bold mb-1 text-text">{tier.price}</div>
                <p className="text-sm text-text-muted">{tier.description}</p>
                {tier.roi && (
                  <p className="text-sm text-brand-accent font-medium mt-2 flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    {tier.roi}
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-sm text-text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button - Cal.com for paid tiers, regular button for free */}
              {tier.action === 'audit' ? (
                <button
                  onClick={onOpenAuditModal}
                  className={cn(
                    'w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2',
                    'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white'
                  )}
                >
                  {tier.cta}
                </button>
              ) : (
                <CalButton
                  calLink="indexable/15min"
                  className={cn(
                    'w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2',
                    tier.featured
                      ? 'bg-brand-accent text-white hover:bg-brand-accent-hover shadow-md hover:shadow-lg'
                      : 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white'
                  )}
                  prefillData={{
                    notes: `Interested in: ${tier.name} (${tier.price})`,
                  }}
                >
                  {tier.cta}
                  {tier.featured && <ArrowRight className="w-4 h-4" />}
                </CalButton>
              )}
            </motion.div>
          ))}
        </div>

        {/* ROI Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-background-muted rounded-xl">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
              <Check className="w-5 h-5 text-success" />
            </div>
            <p className="text-text">
              <span className="font-semibold">ROI Guarantee:</span>{' '}
              <span className="text-text-muted">
                If you don&apos;t show up in AI queries within 30 days, we&apos;ll refund 100%
                of your fee.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
