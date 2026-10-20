import { ArrowDown, ArrowDownRight, ArrowUp, ArrowUpRight } from 'lucide-react';

type ArrowDirection = 'up' | 'up-right' | 'down' | 'down-right';

interface ArrowIconProps {
  direction?: ArrowDirection;
  className?: string;
}

const ARROW_ICONS = {
  up: ArrowUp,
  'up-right': ArrowUpRight,
  down: ArrowDown,
  'down-right': ArrowDownRight
};

export default function ArrowIcon({
  direction = 'up-right',
  className
}: ArrowIconProps) {
  const Icon = ARROW_ICONS[direction];

  return (
    <Icon
      className={className}
      aria-hidden="true"
      focusable="false"
      strokeWidth={1.7}
    />
  );
}
