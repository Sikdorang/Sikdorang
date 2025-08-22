'use client';

import ToggleSwitch from '../../common/buttons/ToggleSwitch';
import DepthIcon from '@public/icons/ic_chevron_right.svg';
import Image from 'next/image';

interface SettingTableRowProps {
  label: string;
  isFirstRow?: boolean;
  isLastRow?: boolean;
  onClick?: () => void;
  type: 'depth' | 'toggle' | 'none';
}

export default function SettingTableRow({
  label,
  isFirstRow = false,
  isLastRow = false,
  onClick,
  type,
}: SettingTableRowProps) {
  const renderRightContent = () => {
    switch (type) {
      case 'depth':
        return (
          <div className="pr-6">
            <Image src={DepthIcon} width={8} height={16} alt="" />
          </div>
        );
      case 'toggle':
        return (
          <ToggleSwitch
            isOn={false}
            onToggle={(next: boolean) => {
              console.log(`${label} toggled: `, next);
            }}
          />
        );
      case 'none':
      default:
        return null;
    }
  };

  return (
    <tr
      onClick={onClick}
      className="cursor-pointer hover:bg-gray-200 bg-gray-100"
    >
      <td
        className={`
          relative px-6 py-4 border-b border-gray-500
          ${isFirstRow ? 'rounded-tl-xl rounded-tr-xl' : ''}
          ${isLastRow ? 'rounded-bl-xl rounded-br-xl border-b-0' : ''}
        `}
      >
        <div className="flex items-center justify-between">
          <span className="text-mb-1 text-gray-900">{label}</span>
          {renderRightContent()}
        </div>
      </td>
    </tr>
  );
}
