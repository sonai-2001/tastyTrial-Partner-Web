import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const typographyVariants = cva(
  "text-foreground",
  {
    variants: {
      variant: {
        h1: "font-display text-5xl font-black tracking-tighter sm:text-6xl",
        h2: "font-display text-4xl font-black tracking-tight sm:text-5xl",
        h3: "font-display text-3xl font-extrabold tracking-tight sm:text-4xl",
        h4: "font-display text-2xl font-bold tracking-tight",
        h5: "font-display text-xl font-bold tracking-tight",
        h6: "font-display text-lg font-semibold tracking-tight",
        display: "font-display text-xl font-bold uppercase tracking-widest text-secondary/70",
        large: "text-lg font-semibold",
        body1: "font-sans text-base leading-relaxed",
        body2: "font-sans text-sm leading-relaxed",
        small: "text-xs font-medium leading-none",
        muted: "text-sm text-secondary/60",
      },
    },
    defaultVariants: {
      variant: "body1",
    },
  }
)

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, ...props }, ref) => {
    const Component = as || 
      (variant?.startsWith("h") ? (variant as React.ElementType) : "p")

    return (
      <Component
        ref={ref}
        className={cn(typographyVariants({ variant, className }))}
        {...props}
      />
    )
  }
)
Typography.displayName = "Typography"

export { Typography, typographyVariants }
