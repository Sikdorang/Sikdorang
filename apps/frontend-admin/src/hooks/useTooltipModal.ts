import { useState } from 'react';

type TooltipItem = {
  title: string;
  description: string;
};

export function useTooltipModal() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [contents, setContents] = useState<TooltipItem[]>([]);

  function showText(x: number, y: number, items: TooltipItem[]) {
    setPosition({ top: y, left: x });
    setContents(items);
    setVisible(true);
  }

  function hide() {
    setVisible(false);
  }

  return { visible, position, contents, showText, hide };
}
