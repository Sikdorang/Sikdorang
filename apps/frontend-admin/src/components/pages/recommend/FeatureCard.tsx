interface FeatureCardProps {
  title: string;
  description: string;
  subDescription?: string;
  image?: React.ReactNode;
  onClick?: () => void;
}

export default function FeatureCard({
  title,
  description,
  subDescription,
  image,
  onClick,
}: FeatureCardProps) {
  return (
    <div
      className="bg-gray-100 rounded-2xl shadow-sm w-[320px] overflow-hidden flex flex-col"
      onClick={onClick}
    >
      <div className="flex-1 flex items-center justify-center min-h-[200px] bg-white">
        {image}
      </div>
      <div className="bg-[#191A23] px-6 py-6">
        <div className="text-white text-lg font-bold mb-2">{title}</div>
        <div className="text-gray-100 text-base leading-normal">
          {description}
        </div>
        {subDescription && (
          <div className="text-gray-400 text-[15px] mt-1">{subDescription}</div>
        )}
      </div>
    </div>
  );
}
