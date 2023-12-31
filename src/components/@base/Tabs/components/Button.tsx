import { CSSProperties, HTMLAttributes, useContext } from 'react';
import { TabValueType, TabsContext } from '../Tabs';
import { DEFAULT_PROPS_PREFIX } from '../utils';

export interface TabsButtonProps extends HTMLAttributes<HTMLButtonElement> {
  value: TabValueType;
  bgColor?: CSSProperties['backgroundColor'];
}
export const tabsButtonType = 'tabs-button';

function TabsButton({
  children,
  value,
  bgColor: backgroundColor,
  onClick,
  ...props
}: TabsButtonProps) {
  const [, onTabChange] = useContext(TabsContext);

  return (
    <button
      css={{ backgroundColor, color: 'inherit' }}
      onClick={(e) => {
        onTabChange(value);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

TabsButton.defaultProps = {
  [DEFAULT_PROPS_PREFIX]: tabsButtonType,
};

export default TabsButton;
