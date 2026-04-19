import Image from 'next/image';
import { Typography } from '@/components/ui/typography';
import { Quote } from 'lucide-react';

const stories = [
  {
    quote:
      'TastyTrial enabled me to restart my operations post-COVID when I had no hope of doing my business again. My online ordering business has done so well, it has even taken over my dine-in business!',
    name: 'Arshad Khan',
    role: 'Proprietor',
    restaurant: 'Khushboo Biryani',
    location: 'Shillong',
    avatar: '/assets/testimonials/arshad.webp',
  },
  {
    quote:
      'Thanks to TastyTrial’s invaluable support, our startup cloud kitchen has been doing wonders in the competitive food industry. Their dedication and reporting tools have been instrumental in our success.',
    name: 'Vijay',
    role: 'Proprietor',
    restaurant: 'Birgo',
    location: 'Coimbatore',
    avatar: '/assets/testimonials/vijay.webp',
  },
  {
    quote:
      'TastyTrial helped us grow by 60% since registration, and now we are one of the biggest vegetarian joints in our city.',
    name: 'Sandeep K Mohan',
    role: 'Proprietor',
    restaurant: 'Mysore Raman Idli',
    location: 'Kerala',
    avatar: '/assets/testimonials/sandeep.webp',
  },
];

export default function SuccessStoriesSection() {
  return (
    <section className="bg-surface pb-32">
      <div className="container space-y-16">
        {/* Editorial Heading */}
        <div className="text-center space-y-4">
          <Typography variant="small" className="text-primary font-black uppercase tracking-[0.3em]">
            The Chronicles
          </Typography>
          <Typography variant="h2" className="text-4xl lg:text-5xl font-display font-black">
            Restaurant Success Stories
          </Typography>
        </div>

        {/* Testimonial Anthology - No Lines, Pure Tonal Depth */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <div
              key={story.name}
              className="group rounded-[2rem] bg-surface-lowest p-10 shadow-ambient flex flex-col justify-between relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
            >
              <Quote className="absolute -top-6 -right-6 size-32 text-primary/5 rotate-12" />
              
              <div className="space-y-6 relative z-10">
                <Typography variant="body1" className="text-secondary/70 leading-relaxed italic font-medium">
                  "{story.quote}"
                </Typography>

                {/* Spectral Divider */}
                <div className="h-px w-12 bg-primary/20 transition-all duration-500 group-hover:w-full" />

                {/* Author Metadata */}
                <div className="flex items-center gap-4">
                  <div className="relative size-14">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
                    <Image
                      src={story.avatar}
                      alt={story.name}
                      width={56}
                      height={56}
                      className="rounded-full relative z-10 border-2 border-surface shadow-sm"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <Typography variant="h5" className="text-base font-display font-bold text-foreground">
                      {story.name}
                    </Typography>
                    <Typography variant="small" className="text-secondary/40 font-black uppercase tracking-widest leading-none">
                      {story.role} · {story.restaurant}
                    </Typography>
                    <Typography variant="muted" className="text-[10px] italic">
                      {story.location}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
