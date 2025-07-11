import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image?: string;
};

const EmptyState = ({ description, title, image = "/empty.svg" }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
        <Image src={image} alt="Empty" width={240} height={240} />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
