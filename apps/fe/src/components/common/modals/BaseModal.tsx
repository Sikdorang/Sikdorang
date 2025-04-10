'use client';

import { ReactNode, Children, isValidElement, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

interface BaseModalProps extends PropsWithChildren {
  onClose: () => void;
}

function Title({ children }: { children: ReactNode }) {
  return <h2 className="text-title-sm text-gray-800 mb-3">{children}</h2>;
}

function Content({ children }: { children: ReactNode }) {
  return <div className="text-gray-600 text-body-md-m mb-7">{children}</div>;
}

function Actions({ children }: { children: ReactNode }) {
  return <div className="flex justify-between gap-2">{children}</div>;
}

export default function BaseModal({ children, onClose }: BaseModalProps) {
  const parsed: {
    title: React.ReactNode;
    content: React.ReactNode;
    actions: React.ReactNode;
  } = {
    title: null,
    content: null,
    actions: null,
  };

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;

    if (child.type === Title) parsed.title = child;
    else if (child.type === Content) parsed.content = child;
    else if (child.type === Actions) parsed.actions = child;
  });

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center " onClick={onClose}>
      <div className="bg-white p-6 rounded-lg min-w-80" onClick={(e) => e.stopPropagation()}>
        {parsed.title}
        {parsed.content}
        {parsed.actions}
      </div>
    </div>,
    document.body,
  );
}

BaseModal.title = Title;
BaseModal.content = Content;
BaseModal.actions = Actions;
