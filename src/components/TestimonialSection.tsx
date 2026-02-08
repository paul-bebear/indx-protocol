import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { cn } from '../lib/utils';

const testimonials = [
  {
    quote: "We're looking for our first restaurant partners to join our founding cohort. Be featured as a case study and get early adopter pricing.",
    name: "Founding Partner Program",
    role: "Limited Spots Available",
    metric: "Join Now",
    featured: true
  },
  {
    quote: "Voice search and AI assistants are becoming the primary way diners discover restaurants. Early adopters will have a massive advantage.",
    name: "Industry Insight",
    role: "Restaurant Tech Trends 2024",
    metric: "58% Use AI"
  },
  {
    quote: "Most restaurants don't realize their beautiful websites are invisible to Siri and Alexa. We make sure AI can actually recommend you.",
    name: "Our Promise",
    role: "Indexable.Pro",
    metric: "Under 1 Week"
  }
];

export function TestimonialSection() {
  return (
    <section className="section-padding bg-background-muted">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-4">
            Join Early
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text">
            Be Among the First
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Join our founding cohort of restaurants becoming AI-discoverable
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "relative p-6 rounded-2xl",
                testimonial.featured 
                  ? 'bg-white border-2 border-brand-accent shadow-xl' 
                  : 'bg-white border border-border shadow-sm'
              )}
            >
              {testimonial.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-accent text-white text-xs font-semibold rounded-full">
                  Limited Availability
                </div>
              )}

              {/* Quote Icon */}
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center mb-4">
                <Quote className="w-5 h-5 text-brand-primary" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-brand-accent fill-brand-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-text-muted mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-semibold text-text">{testimonial.name}</p>
                  <p className="text-sm text-text-muted">{testimonial.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-brand-accent">{testimonial.metric}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


