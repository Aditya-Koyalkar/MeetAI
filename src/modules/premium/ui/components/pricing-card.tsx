import { CircleCheckIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const pricingCardVariants = cva("rounded-lg p-4 py-6 w-full transition-colors", {
  variants: {
    variant: {
      default: "bg-background text-foreground border border-border",
      highlighted: "bg-gradient-to-br from-primary to-secondary text-primary-foreground dark:from-primary dark:to-accent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const pricingCardIconVariants = cva("size-5", {
  variants: {
    variant: {
      default: "text-primary",
      highlighted: "text-accent dark:text-accent-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const pricingCardSecondaryTextVariants = cva("", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      highlighted: "text-muted dark:text-muted-foreground",
    },
  },
});

const pricingCardBadgeTextVariants = cva("text-xs font-normal p-1 rounded", {
  variants: {
    variant: {
      default: "bg-primary/20 text-primary",
      highlighted: "bg-accent/20 text-accent dark:bg-accent/30 dark:text-accent-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props extends VariantProps<typeof pricingCardVariants> {
  badge?: string | null;
  price: number;
  features: string[];
  title: string;
  description?: string | null;
  priceSuffix: string;
  className?: string;
  buttonText: string;
  onClick: () => void;
}

export const PricingCard = ({ buttonText, className, features, onClick, price, priceSuffix, title, badge, description, variant }: Props) => {
  return (
    <div className={cn(pricingCardVariants({ variant }), className, "border")}>
      <div className="flex items-end gap-x-4 justify-between">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <h6 className="font-medium text-xl">{title}</h6>
            {badge ? <Badge className={cn(pricingCardBadgeTextVariants({ variant }))}>{badge}</Badge> : null}
          </div>
          <p className={cn("text-xs", pricingCardBadgeTextVariants({ variant }))}>{description}</p>
        </div>
        <div className="flex items-end shrink-0 gap-x-0.5">
          <h4 className="text-3xl font-medium">
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(price)}
          </h4>
          <span className={cn(pricingCardSecondaryTextVariants({ variant }))}>{priceSuffix}</span>
        </div>
      </div>
      <div className="py-6">
        <Separator className="opacity-10 text-[#5D6B68]" />
      </div>
      <Button onClick={onClick} className="w-full" size={"lg"} variant={variant == "highlighted" ? "default" : "outline"}>
        {buttonText}
      </Button>
      <div className="flex flex-col gap-y-2 mt-6">
        <p className="font-medium uppercase">Features</p>
        <ul className={cn("flex flex-col gap-y-2.5", pricingCardSecondaryTextVariants({ variant }))}>
          {features?.map((feature, index) => (
            <li key={index} className="flex items-center gap-x-2.5">
              <CircleCheckIcon className={cn(pricingCardIconVariants({ variant }))} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
