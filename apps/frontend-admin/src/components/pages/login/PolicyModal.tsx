import CtaButton from '../../common/buttons/CtaButton';

interface PolicyModalProps {
  title: string;
  content: string | React.ReactNode;
  onClose: () => void;
}

export default function PolicyModal({
  title,
  content,
  onClose,
}: PolicyModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-4 bg-white rounded-xl max-w-lg p-6 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-dt-1 text-center">{title}</div>
        <div className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap text-gray-800 bg-gray-100 rounded-xl p-4">
          {content}
        </div>
        <div className="flex justify-center">
          <CtaButton text="확인" width="fit" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
