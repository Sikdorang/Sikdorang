'use client';

import CtaButton from '@/components/common/buttons/CtaButton';
import SoundButton from '@/components/common/buttons/SoundButton';
import ConfirmModal from '@/components/common/modals/ConfirmModal';
import KakaoChannelGuide from '@/components/pages/settings/KakaoChannelGuide';
import SettingTable from '@/components/pages/settings/SettingTable';
import { useLogin } from '@/hooks/useLogin';
import { ISettingAction, ISettingStates } from '@/types/model/store';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function SettingsPage() {
  const router = useRouter();
  const { logout } = useLogin();

  const [showInquiryModal, setShowInquiryModal] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [shouldShowSaveButton, setShouldShowSaveButton] = useState(false);
  const [settings, setSettings] = useState<ISettingStates>({
    businessOpen: true,
    realtimeOrderAlert: false,
    recommendEnabled: true,
  });
  const initialSettings = useRef<ISettingStates>({
    businessOpen: true,
    realtimeOrderAlert: false,
    recommendEnabled: true,
  });

  useEffect(() => {
    const changed =
      settings.businessOpen !== initialSettings.current.businessOpen ||
      settings.realtimeOrderAlert !==
        initialSettings.current.realtimeOrderAlert ||
      settings.recommendEnabled !== initialSettings.current.recommendEnabled;

    setShouldShowSaveButton(changed);
  }, [settings]);

  const toggle = (key: keyof ISettingStates) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    initialSettings.current = { ...settings };
    setShouldShowSaveButton(false);
  };

  const manageActions: ISettingAction[] = [
    {
      label: '영업 상태',
      onClick: () => toggle('businessOpen'),
      type: 'toggle',
    },
    {
      label: '실시간 주문 알림',
      onClick: () => toggle('realtimeOrderAlert'),
      type: 'toggle',
    },
  ];

  const recommendActions: ISettingAction[] = [
    {
      label: '추천 기능 사용 여부',
      onClick: () => toggle('recommendEnabled'),
      type: 'toggle',
    },
    {
      label: '추천 기능 초기화',
      onClick: () => router.push('/settings/reset'),
      type: 'depth',
    },
  ];

  const helpActions: ISettingAction[] = [
    {
      label: '문의 하기',
      onClick: () => setShowInquiryModal(true),
      type: 'none',
    },
    {
      label: '버그 신고',
      onClick: () => router.push('/settings/report'),
      type: 'depth',
    },
  ];

  const accountActions: ISettingAction[] = [
    {
      label: '로그아웃',
      onClick: () => setShowLogoutModal(true),
      type: 'none',
    },
    {
      label: '회원탈퇴',
      onClick: () => setShowWithdrawModal(true),
      type: 'none',
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-10 border-t border-gray-200">
      <div className="wrapper flex flex-col w-full gap-4">
        <SettingTable
          settingTitle="운영 관리"
          actions={manageActions}
          toggleStates={{
            '영업 상태': settings.businessOpen,
            '실시간 주문 알림': settings.realtimeOrderAlert,
          }}
        />
        <SettingTable
          settingTitle="추천 관리"
          actions={recommendActions}
          toggleStates={{
            '추천 기능 사용 여부': settings.recommendEnabled,
          }}
        />
        <SettingTable settingTitle="도움말" actions={helpActions} />
        <SettingTable settingTitle="계정 관리" actions={accountActions} />
      </div>

      <KakaoChannelGuide
        channelName="식도랑 채널"
        isOpen={showInquiryModal}
        onClose={() => {
          setShowInquiryModal(false);
        }}
      />

      <ConfirmModal
        isOpen={showLogoutModal}
        title="로그아웃 하시겠습니까?"
        onConfirm={() => {
          logout();
          router.push('/');
        }}
        onCancel={() => setShowLogoutModal(false)}
      />

      <ConfirmModal
        isOpen={showWithdrawModal}
        title="회원 탈퇴하시겠습니까?"
        message={
          <div className="text-mb-2">
            탈퇴하시면 등록하신 가게 정보 및 관련 데이터를 복구할 수 없습니다.
          </div>
        }
        onConfirm={() => router.push('/')}
        onCancel={() => setShowWithdrawModal(false)}
      />

      <SoundButton />

      <div
        className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${
          shouldShowSaveButton
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <CtaButton
          text="변경사항 저장하기"
          size="medium"
          onClick={handleSave}
        />
      </div>
    </div>
  );
}
