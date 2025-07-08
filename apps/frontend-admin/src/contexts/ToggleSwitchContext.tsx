'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ToggleSwitchContextType {
  isOn: boolean;
  toggle: () => void;
  setToggle: (value: boolean) => void;
}

const ToggleSwitchContext = createContext<ToggleSwitchContextType | undefined>(
  undefined,
);

export function ToggleSwitchProvider({
  children,
  initialValue = false,
}: {
  children: ReactNode;
  initialValue?: boolean;
}) {
  const [isOn, setIsOn] = useState(initialValue);

  const toggle = () => setIsOn((prev) => !prev);
  const setToggle = (value: boolean) => setIsOn(value);

  return (
    <ToggleSwitchContext.Provider value={{ isOn, toggle, setToggle }}>
      {children}
    </ToggleSwitchContext.Provider>
  );
}

export function useToggleSwitch() {
  const context = useContext(ToggleSwitchContext);
  if (!context) {
    throw new Error('useToggleSwitch must be used within ToggleSwitchProvider');
  }
  return context;
}
