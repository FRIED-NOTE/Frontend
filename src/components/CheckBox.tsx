import globalStyles from '@/utils/styles';
import { Typography } from '@base';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const styles = {
  wrapper: css(
    {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
    },
    globalStyles.button,
  ),
  check: {
    unChecked: css({
      width: 15,
      height: 15,
      borderRadius: 16,
      margin: 2,
      border: '2.4px solid var(--background-black)',
      background: 'var(--background-disabled)',
      boxSizing: 'border-box',
    }),
    checked: css({
      background: `var(--sub-pink)`,
    }),
  },
};

export interface CheckBoxProps {
  label: string;
  onCheckChanged?: (checked: boolean) => void;
  initialValue?: boolean;
}

function CheckBox({
  label,
  onCheckChanged,
  initialValue = false,
  ...props
}: CheckBoxProps) {
  const [checked, setChecked] = useState(initialValue);

  useEffect(() => {
    onCheckChanged?.(checked);
  }, [checked]);

  return (
    <div css={styles.wrapper} onClick={() => setChecked(!checked)}>
      <div css={[styles.check.unChecked, checked && styles.check.checked]} />
      <Typography variant="button" color="text.black">
        {label}
      </Typography>
    </div>
  );
}

export default CheckBox;
