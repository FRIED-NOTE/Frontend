import { DEFAULT_PROPS_PREFIX } from '@/utils/constants';
import { CSSProperties, HTMLAttributes } from 'react';
import { TabValueType } from './TabsMain';

export interface TabsBodyProps extends HTMLAttributes<HTMLDivElement> {
  value: TabValueType;
  bgColor?: CSSProperties['backgroundColor'];
}

export const tabsBodyType = 'tabs-body';

function TabsBody({
  value,
  bgColor: backgroundColor,
  ...props
}: TabsBodyProps) {
  return <div css={{ backgroundColor }} {...props} />;
}

TabsBody.defaultProps = {
  [DEFAULT_PROPS_PREFIX]: tabsBodyType,
};

export default TabsBody; //
