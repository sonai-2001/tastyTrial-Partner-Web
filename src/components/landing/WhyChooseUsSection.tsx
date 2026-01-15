// components/landing/WhyChooseUsSection.tsx
import { Users, Truck, Mail } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Attract new customers",
    description: "Reach thousands of customers ordering food online every day.",
  },
  {
    icon: Truck,
    title: "Doorstep delivery convenience",
    description:
      "Easily get your orders delivered through our trusted delivery partners.",
  },
  {
    icon: Mail,
    title: "Onboarding support",
    description:
      "Our support team is always available to help you get started smoothly.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-background">
      <div className="container">
        <div className="py-24">

          <h2 className="text-3xl font-semibold text-center">
            Why should you partner with us?
          </h2>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((item) => (
              <div key={item.title} className="text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="text-lg font-semibold">{item.title}</h3>

                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
