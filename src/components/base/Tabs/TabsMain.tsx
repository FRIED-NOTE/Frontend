import { getComponentFromType } from '@/utils/components';
import Group from '@base/Group';
import {
  CSSProperties,
  Children,
  HTMLAttributes,
  createContext,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import { tabsBodyType } from './TabsBody';
import { tabsButtonType } from './TabsButton';

export type TabValueType = string | number | undefined;

export interface TabsMainProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: TabValueType;
  value?: TabValueType;
  onTabChange?: (value: TabValueType) => void;
  buttonCss?: CSSProperties;
  bodyCss?: CSSProperties;
}

export const TabsContext = createContext<
  [TabValueType, (value: TabValueType) => void]
>(['', () => null]);

function TabsMain({
  children,
  defaultValue,
  value: propsTabValue,
  onTabChange: propsOnTabChange,
  buttonCss,
  bodyCss,
  ...props
}: TabsMainProps) {
  const [localTabValue, setLocalTabState] =
    useState<TabValueType>(defaultValue);
  const tabValue = propsTabValue === undefined ? localTabValue : propsTabValue;
  const onTabChange =
    propsOnTabChange === undefined ? setLocalTabState : propsOnTabChange;

  const tabsButton = getComponentFromType(children, tabsButtonType);
  const tabsBody = getComponentFromType(children, tabsBodyType);
  const currentBody = Children.toArray(tabsBody).filter(
    (child) => isValidElement(child) && child.props['value'] === tabValue,
  );

  useEffect(() => {
    const firstTabButton = Children.toArray(tabsButton)[0];
    if (firstTabButton && isValidElement(firstTabButton)) {
      const firstTabButtonValue = firstTabButton.props.value;
      setLocalTabState(firstTabButtonValue);
    }
  }, []);

  return (
    <TabsContext.Provider value={[tabValue, onTabChange]}>
      <div {...props}>
        {tabsButton && <Group css={{ ...buttonCss }}>{tabsButton}</Group>}
        {tabsBody && <div css={{ ...bodyCss }}>{currentBody}</div>}
      </div>
    </TabsContext.Provider>
  );
}

export default TabsMain;