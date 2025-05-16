import SettingIcon from '@public/icons/ic_setting.svg';

interface AdminButtonProps {
  onClick: () => void;
}

export default function AdminButton({ onClick }: AdminButtonProps) {
  return (
    <button
      className="shadow-sm fixed left-5 bottom-5 z-10 flex items-center justify-center bg-yellow rounded-full w-10 h-10"
      onClick={onClick}
    >
      <SettingIcon />
    </button>
  );
}
