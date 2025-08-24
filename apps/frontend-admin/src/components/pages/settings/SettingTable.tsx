import SettingTableRow from '@/components/pages/settings/SettingTableRow';
import { ISettingAction } from '@/types/model/store';

interface SettingTableProps {
  settingTitle: string;
  actions: ISettingAction[];
  toggleStates?: Record<string, boolean>;
}

export default function SettingTable({
  settingTitle,
  actions,
  toggleStates = {},
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
              isOn={toggleStates[action.label] ?? false}
              onToggle={action.onClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
