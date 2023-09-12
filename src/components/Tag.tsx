import { ReactComponent as IconCacel } from '@/assets/icon-cancel.svg';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group } from '@base';
import { css } from '@emotion/react';
import {
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from 'react';

const defaultStyle = css([
  {
    width: 'auto',
    height: 42,
    padding: '9px 15px',
    borderRadius: DesignSystem.Round.solid,
    background: DesignSystem.Color.primary.yellow,

    whiteSpace: 'nowrap',
    flexWrap: 'nowrap',
  },
  globalStyles.button,
]);
const activeStyle = css({
  background: DesignSystem.Color.primary['yellow-hover'],
});

const hoverStyle = css({ ':hover': { ...activeStyle } });

export type TagDataType = { value: string; label: string | ReactNode };

export interface TagProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  onClose?: (e: MouseEvent, value: string) => void;
  value?: string;
  onClick?: (e: MouseEvent, value: string) => void;
  label?: string;
  disableCloseOnHover?: boolean;
  active?: boolean;
}

function Tag({
  children,
  onClose,
  value: propsValue,
  onClick,
  label,
  disableCloseOnHover,
  active: initialActive = false,
  ...props
}: TagProps) {
  const [isActive, setIsActive] = useState(initialActive);
  const value =
    propsValue ||
    (typeof children === 'string' && children) ||
    'undefined value';
  const activeOnHover = !disableCloseOnHover && !initialActive;

  useEffect(() => {
    setIsActive(initialActive);
  }, [initialActive]);

  return (
    <div css={{ display: 'inline-block' }}>
      <Group
        gap={12}
        onMouseEnter={() => activeOnHover && setIsActive(true)}
        onMouseLeave={() => activeOnHover && setIsActive(false)}
        css={[
          defaultStyle,
          hoverStyle,
          isActive && activeStyle,
          DesignSystem.Text.button,
        ]}
        onClick={(e) =>
          onClick && e.target === e.currentTarget && onClick(e, value)
        }
        {...props}
      >
        {label || children}
        {isActive && (
          <IconCacel
            data-testid="tag-close-icon"
            width={24}
            onClick={(e) => onClose && onClose(e, value)}
          />
        )}
      </Group>
    </div>
  );
}

export default Tag;
