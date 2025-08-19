import React from 'react';

interface RecommendResultCardProps {
  title: string;
  description: string;
  result: string;
  image: React.ReactNode;
  onClose: () => void;
}

export default function RecommendResultModal({
  title,
  description,
  result,
  image,
  onClose,
}: RecommendResultCardProps) {
  return (
    <div className="fixed inset-0 bg-black/25 z-40" onClick={onClose}>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-gray-100 rounded-2xl border border-gray-100 overflow-hidden flex flex-col shadow-sm transition-all duration-200 hover:shadow-lg relative"
          style={{
            width: '80vw',
            maxWidth: '400px',
            aspectRatio: '335 / 583',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex-1 flex items-center justify-center p-6 bg-main-200">
            {image}
          </div>
          <div className="bg-main-100 px-6 py-6 text-center">
            <div className="text-main-900 text-mb-1 mb-2">{title}</div>
            <div className="text-main-900 text-mb-4 mb-6">{description}</div>
            {result && (
              <div className="text-main-900 text-mb-4 mt-1">{result}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
