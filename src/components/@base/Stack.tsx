import { CSSProperties, HTMLAttributes, forwardRef } from 'react';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  spacing?: CSSProperties['gap'];
}

const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  {
    children,
    justify: justifyContent = 'center',
    align: alignItems = 'stretch',
    spacing: gap,
    ...props
  }: StackProps,
  ref,
) {
  const inputRef = ref;
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent,
        alignItems,
        gap,
      }}
      ref={inputRef}
      {...props}
    >
      {children}
    </div>
  );
});

export default Stack;
