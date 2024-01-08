import { ReactComponent as IconCaution } from '@/assets/icon-caution.svg';
import DesignSystem from '@/utils/designSystem';
import { Group, Stack, Typography } from '@base';
import { css } from '@emotion/react';
import moment from 'moment';
import { IngredientDataType } from '..';
interface ShortExpirationItemProps {
  item: IngredientDataType;
}
const styles = {
  infoBox: css({
    backgroundColor: DesignSystem.Color.background.gray,
    border: '1px solid',
    borderColor: DesignSystem.Color.background.black,
    boxSizing: 'border-box',
    width: 317,
    padding: '17.5px 119px 32px 18.6px',
  }),
};
function ShortExpirationItem({ item }: ShortExpirationItemProps) {
  return (
    <td style={{ padding: 0 }}>
      <Group gap={3} css={{ marginBottom: 14 }}>
        <Typography variant="subtitle">{item.name}</Typography>
        {item.expirationDate?.isBefore(moment()) && (
          <IconCaution css={{ width: 24, height: 24 }} />
        )}
      </Group>
      <Stack
        css={styles.infoBox}
        style={{
          backgroundColor: `${
            item.expirationDate?.isBefore(moment())
              ? DesignSystem.Color.primary.yellow
              : DesignSystem.Color.background.gray
          }`,
        }}
      >
        <Typography variant="body">수량 : {item.quantity}</Typography>
        <Typography variant="body">
          등록 일자 : {item.registrationDate?.format('YYYY/MM/DD').toString()}
        </Typography>
        <Typography variant="body">
          유통기한 : {item.expirationDate?.format('YYYY/MM/DD').toString()}
        </Typography>
      </Stack>
    </td>
  );
}

export default ShortExpirationItem;
