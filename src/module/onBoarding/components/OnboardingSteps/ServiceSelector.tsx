'use client';

import { ShoppingBag, UtensilsCrossed, ChevronRight } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TOnboardingFormValues } from '../../schemas/onboardingSchema';

const services = [
  {
    id: 'both',
    title: 'Food delivery & dining both',
    description: 'List your restaurant on both the delivery and dining sections',
    color: 'bg-orange-100',
    iconColor: 'text-orange-600',
    icon: <ShoppingBag className="h-7 w-7" />,
    secondaryIcon: <UtensilsCrossed className="h-4 w-4" />,
  },
  {
    id: 'delivery',
    title: 'Food delivery only',
    description: 'List your restaurant in the delivery section only',
    color: 'bg-orange-100',
    iconColor: 'text-orange-600',
    icon: <ShoppingBag className="h-7 w-7" />,
  },
  {
    id: 'dining',
    title: 'Dining only',
    description: 'List your restaurant in the dining section only',
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    icon: <UtensilsCrossed className="h-7 w-7" />,
  },
];

type StepAccountProps = {
  onNext: () => void;
};

export default function ServiceSelection({ onNext }: StepAccountProps) {
  const { setValue, watch, formState: { errors } } = useFormContext<TOnboardingFormValues>();
  const selectedService = watch('serviceType');

  const handleSelect = (id: string) => {
    setValue('serviceType', id as any, { shouldValidate: true });
    onNext();
  };

  return (
    <Card>
      {/* Header */}
      <CardHeader>
        <CardTitle>Select Service Type</CardTitle>
        <p className="text-sm text-muted-foreground">Choose how you want to list your restaurant</p>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-4">
        {services.map((service) => (
          <Card
            key={service.id}
            onClick={() => handleSelect(service.id)}
            className={cn(
              'group cursor-pointer border transition-all hover:border-primary hover:shadow-md',
              selectedService === service.id && 'border-primary ring-1 ring-primary'
            )}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-4">
                {/* Left Content */}
                <div className="flex-1 space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>

                  <div className="flex items-center text-sm font-medium text-primary">
                    Register now
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>

                {/* Right Icon */}
                <div className="relative flex h-20 w-20 items-center justify-center">
                  <div
                    className={cn(
                      'flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110',
                      service.color,
                      service.iconColor,
                    )}
                  >
                    {service.icon}
                  </div>

                  {service.secondaryIcon && (
                    <div className="absolute right-1 top-1 rounded-full border bg-background p-1 shadow">
                      {service.secondaryIcon}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {errors.serviceType && (
          <p className="text-sm font-medium text-destructive">{errors.serviceType.message}</p>
        )}
      </CardContent>
    </Card>
  );
}
