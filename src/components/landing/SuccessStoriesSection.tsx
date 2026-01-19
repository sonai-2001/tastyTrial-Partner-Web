import Image from 'next/image';

const stories = [
  {
    quote:
      'TastyTrial enabled me to restart my operations post-COVID when I had no hope of doing my business again. My online ordering business has done so well, it has even taken over my dine-in business!',
    name: 'Arshad Khan',
    role: 'Owner',
    restaurant: 'Khushboo Biryani',
    location: 'Shillong',
    avatar: '/assets/testimonials/arshad.webp',
  },
  {
    quote:
      'Thanks to TastyTrial’s invaluable support, our startup cloud kitchen has been doing wonders in the competitive food industry. Their dedication and reporting tools have been instrumental in our success.',
    name: 'Vijay',
    role: 'Owner',
    restaurant: 'Birgo',
    location: 'Coimbatore',
    avatar: '/assets/testimonials/vijay.webp',
  },
  {
    quote:
      'TastyTrial helped us grow by 60% since registration, and now we are one of the biggest vegetarian joints in our city.',
    name: 'Sandeep K Mohan',
    role: 'Owner',
    restaurant: 'Mysore Raman Idli',
    location: 'Kerala',
    avatar: '/assets/testimonials/sandeep.webp',
  },
];

export default function SuccessStoriesSection() {
  return (
    <section className="bg-muted/50">
      <div className="container py-20">
        {/* Heading */}
        <h2 className="text-center text-3xl lg:text-4xl font-bold">Restaurant success stories</h2>

        {/* Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <div
              key={story.name}
              className="rounded-2xl bg-card p-8 shadow-sm border flex flex-col justify-between"
            >
              {/* Quote */}
              <p className="text-muted-foreground leading-relaxed">{story.quote}</p>

              {/* Divider */}
              <div className="my-6 h-px bg-border" />

              {/* Author */}
              <div className="flex items-center gap-4">
                <Image
                  src={story.avatar}
                  alt={story.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />

                <div>
                  <p className="font-medium">{story.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {story.role} · {story.restaurant}
                  </p>
                  <p className="text-xs text-muted-foreground">{story.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
