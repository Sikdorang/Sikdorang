'use client';

import { useState } from 'react';
import SettingIcon from '@public/icons/ic_setting.svg';
import AdminModal from './AdminModal';

export default function AdminButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="shadow-sm fixed left-5 bottom-5 z-10 flex items-center justify-center bg-yellow rounded-full w-10 h-10"
        onClick={() => setOpen(true)}
      >
        <SettingIcon />
      </button>
      {open && <AdminModal onClose={() => setOpen(false)} />}
    </>
  );
}
