import SettingTableRow from '@/components/pages/settings/SettingTableRow';
import { ISettingAction } from '@/types/model/store';

interface SettingTableProps {
  settingTitle: string;
  actions: ISettingAction[];
}

export default function SettingTable({
  settingTitle,
  actions,
}: SettingTableProps) {
  return (
    <div className="w-full mx-auto">
      <div className="text-dh-1 mb-4">{settingTitle}</div>

      <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-xl">
        <tbody>
          {actions.map((action, index) => (
            <SettingTableRow
              key={action.label}
              label={action.label}
              isFirstRow={index === 0}
              isLastRow={index === actions.length - 1}
              onClick={action.onClick}
              type={action.type}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
