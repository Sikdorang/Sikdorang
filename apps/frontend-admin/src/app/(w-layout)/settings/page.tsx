'use client';

import SoundButton from '@/components/common/buttons/SoundButton';
import SettingTable from '@/components/pages/settings/SettingTable';
import { ISettingAction } from '@/types/model/store';

const manageActions: ISettingAction[] = [
  {
    label: '영업 상태',
    onClick: () => console.log('영업 상태 클릭'),
    type: 'toggle',
  },
  {
    label: '실시간 주문 알림',
    onClick: () => console.log('실시간 주문 알림 클릭'),
    type: 'toggle',
  },
];

const recommendActions: ISettingAction[] = [
  {
    label: '추천 기능 사용 여부',
    onClick: () => console.log('추천 기능 사용 여부 클릭'),
    type: 'toggle',
  },
  {
    label: '추천 기능 초기화',
    onClick: () => console.log('추천 기능 초기화 클릭'),
    type: 'depth',
  },
];

const helpActions: ISettingAction[] = [
  {
    label: '문의 하기',
    onClick: () => console.log('문의 하기 클릭'),
    type: 'none',
  },
  {
    label: '버그 신고',
    onClick: () => console.log('버그 신고 클릭'),
    type: 'depth',
  },
];

const accountActions: ISettingAction[] = [
  {
    label: '로그아웃',
    onClick: () => console.log('로그아웃 클릭'),
    type: 'none',
  },
  {
    label: '회원탈퇴',
    onClick: () => console.log('회원탈퇴 클릭'),
    type: 'none',
  },
];

export default function SettingsPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-10 border-t border-gray-200">
      <div className="wrapper flex flex-col w-full gap-4">
        <SettingTable settingTitle="운영 관리" actions={manageActions} />
        <SettingTable settingTitle="추천 관리" actions={recommendActions} />
        <SettingTable settingTitle="도움말" actions={helpActions} />
        <SettingTable settingTitle="계정 관리" actions={accountActions} />
      </div>

      <SoundButton />
    </div>
  );
}
