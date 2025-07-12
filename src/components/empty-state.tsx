import { Box, LucideIcon } from "lucide-react";

type Props = {
  title: string;
  description: string;
  Icon?: LucideIcon;
};

const EmptyState = ({ description, title, Icon = Box }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
        <Icon />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
