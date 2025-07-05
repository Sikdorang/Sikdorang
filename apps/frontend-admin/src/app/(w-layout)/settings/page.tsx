'use client';

import SettingItem from '@/components/pages/settings/SettingItem';
import TableIcon from '@public/icons/ic_list.svg';

export default function SettingsPage() {
  return (
    <div className="wrapper flex w-full flex-col gap-4 py-10">
      <SettingItem image={TableIcon}>테이블 연동</SettingItem>
      <SettingItem image={TableIcon}>직원호출 설정</SettingItem>
      <SettingItem image={TableIcon}>설명서 보러가기</SettingItem>
      <SettingItem image={TableIcon}>공지사항</SettingItem>
      <SettingItem image={TableIcon}>버그 신고</SettingItem>
      <SettingItem image={TableIcon}>회원 탈퇴</SettingItem>
    </div>
  );
}
