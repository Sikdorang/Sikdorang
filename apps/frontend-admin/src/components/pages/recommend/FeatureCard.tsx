import CtaButton from '@/components/common/buttons/CtaButton';

interface FeatureCardProps {
  title: string;
  subTitle: string;
  description: string;
  subDescription?: string;
  image?: React.ReactNode;
  onClick?: () => void;
}

export default function FeatureCard({
  title,
  subTitle,
  description,
  subDescription,
  image,
  onClick,
}: FeatureCardProps) {
  return (
    <div
      className="bg-gray-100 rounded-2xl border border-gray-100 overflow-hidden flex flex-col shadow-sm transition-all duration-200 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="relative flex-1 flex items-center justify-center min-h-[200px] bg-white">
        {image}
        <div className="absolute top-3 right-3">
          <CtaButton
            color="gray"
            size="small"
            width="fit"
            text={subTitle}
            onClick={(e) => {
              e.stopPropagation();
              console.log('CTA clicked!');
            }}
          />
        </div>
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
