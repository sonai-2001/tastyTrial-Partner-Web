import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Typography } from '@/components/ui/typography';

const faqs = [
  {
    question: 'What are the instruments required to establish a TastyTrial presence?',
    answer:
      'You will require a valid PAN Identification, FSSAI Licensing, Bank Instrument details, GST Certification (where applicable), and high-fidelity visual assets for your menu.',
  },
  {
    question: 'What is the temporal window for a restaurant to initialize operations?',
    answer: 'Once your instruments are verified, establishmnets typically transition to an active state within a 24–72 hour window.',
  },
  {
    question: 'Are there upfront inscription capital requirements?',
    answer:
      'Zero upfront capital is required for registration. Commissions are calculated per transaction once your ledger begins processing live orders.',
  },
  {
    question: 'Where can I seek assistance during the inscription process?',
    answer:
      'Our dedicated concierge team is available via direct transmission (email/chat) to guide you through every phase of the process.',
  },
  {
    question: 'What is the schedule for fiscal payouts?',
    answer:
      'Payouts are processed with weekly frequency and deposited directly into your registered bank instrument.',
  },
];

export default function FaqSection() {
  return (
    <section className="bg-surface py-32">
      <div className="container max-w-4xl space-y-16">
        {/* Editorial Heading */}
        <div className="text-center space-y-4">
          <Typography variant="small" className="text-primary font-black uppercase tracking-[0.3em]">
            The Reference
          </Typography>
          <Typography variant="h2" className="text-4xl lg:text-5xl font-display font-black">
            Frequently Asked Questions
          </Typography>
        </div>

        {/* Accordion Ledger - No Lines, Pure Depth */}
        <Accordion type="single" collapsible className="space-y-6">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`faq-${index}`} 
              className="border-none bg-surface-lowest rounded-[1.5rem] px-8 shadow-ambient transition-all duration-300 hover:shadow-lg"
            >
              <AccordionTrigger className="text-left font-display font-bold text-lg no-underline hover:no-underline py-8 cursor-pointer">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-secondary/60 leading-relaxed font-medium pb-8 border-t border-primary/5 pt-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
