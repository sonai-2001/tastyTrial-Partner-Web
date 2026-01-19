import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What are the documents and details required to get started with TastyTrial?',
    answer:
      'You will need a PAN card, FSSAI license, bank account details, GST number (if applicable), and clear menu and profile food images.',
  },
  {
    question: 'How long does it take for a restaurant to go live after submitting documents?',
    answer: 'Once all documents are verified, restaurants typically go live within 24–72 hours.',
  },
  {
    question: 'Is there any onboarding or registration fee?',
    answer:
      'There is no upfront onboarding fee. Commission is charged per order once you start receiving customers.',
  },
  {
    question: 'How can I get help if I face issues during onboarding?',
    answer:
      'Our onboarding support team is available via email and chat to help you through every step.',
  },
  {
    question: 'How and when will I receive my payouts?',
    answer:
      'Payouts are processed weekly and deposited directly into your registered bank account.',
  },
];

export default function FaqSection() {
  return (
    <section className="bg-background">
      <div className="container py-20 max-w-3xl">
        {/* Heading */}
        <h2 className="text-center text-3xl lg:text-4xl font-bold">Frequently asked questions</h2>

        {/* Accordion */}
        <Accordion type="single" collapsible className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border rounded-xl px-6">
              <AccordionTrigger className="text-left font-medium no-underline hover:no-underline py-6 cursor-pointer">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
