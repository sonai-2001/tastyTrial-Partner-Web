"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, UtensilsCrossed, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "both",
    title: "Food delivery & dining both",
    description: "List your restaurant on both the delivery and dining sections",
    color: "bg-orange-100",
    iconColor: "text-orange-600",
    icon: <ShoppingBag className="h-7 w-7" />,
    secondaryIcon: <UtensilsCrossed className="h-4 w-4" />,
  },
  {
    id: "delivery",
    title: "Food delivery only",
    description: "List your restaurant in the delivery section only",
    color: "bg-orange-100",
    iconColor: "text-orange-600",
    icon: <ShoppingBag className="h-7 w-7" />,
  },
  {
    id: "dining",
    title: "Dining only",
    description: "List your restaurant in the dining section only",
    color: "bg-yellow-100",
    iconColor: "text-yellow-600",
    icon: <UtensilsCrossed className="h-7 w-7" />,
  },
];

type StepAccountProps = {
  onNext: () => void;
};

export default function ServiceSelection({ onNext }: StepAccountProps) {
  return (
    <Card>

      {/* Header */}
      <CardHeader>
        <CardTitle>Select Service Type</CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose how you want to list your restaurant
        </p>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-4">

        {services.map((service) => (
          <Card
            key={service.id}
            onClick={onNext}
            className="group cursor-pointer border transition-all hover:border-primary hover:shadow-md"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-4">

                {/* Left Content */}
                <div className="flex-1 space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  <Button
                    variant="link"
                    className="h-auto p-0 text-primary"
                  >
                    Register now
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>

                {/* Right Icon */}
                <div className="relative flex h-20 w-20 items-center justify-center">
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
                      service.color,
                      service.iconColor
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

      </CardContent>

      {/* Footer */}
      {/* <CardFooter className="border-t pt-4 flex justify-end">
        <Button onClick={onNext}>
          Continue
        </Button>
      </CardFooter> */}

    </Card>
  );
}
