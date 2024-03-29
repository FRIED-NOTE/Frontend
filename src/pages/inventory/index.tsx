import { ReactComponent as IconComplete } from '@/assets/icons/icon-complete-edit-text.svg';
import { ReactComponent as IconEdit } from '@/assets/icons/icon-edit-text.svg';
import { ReactComponent as IconList } from '@/assets/icons/icon-list.svg';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group, Stack, Typography } from '@base';
import Pagenumber from '@copmonents/Pagenumber';
import Recipe from '@copmonents/Recipe';
import { css } from '@emotion/react';
import moment, { Moment } from 'moment';
import { useEffect, useRef, useState } from 'react';
import { mockRecipeData } from '../home';
import IngrInputBox from './components/IngrInputBox';
import ShortExpirationItem from './components/ShortExpirationItem';
const styles = {
  wrapper: css({ paddingBottom: 100 }),
  inventory: {
    background: css(
      {
        backgroundColor: DesignSystem.Color.background.gray,
        width: '100%',
        padding: '100px 10px',
      },
      globalStyles.center,
    ),
    header: css({
      backgroundColor: DesignSystem.Color.background.black,
      color: DesignSystem.Color.background.white,
      padding: '16px 0',
      boxSizing: 'border-box',
    }),

    ingredients: {
      box: css({
        backgroundColor: DesignSystem.Color.background.white,
        padding: '45px 0 61px 43px',
        position: 'relative',
        width: 1264,
        boxSizing: 'border-box',
      }),
      scrollBox: css({
        overflowX: 'hidden',
        overflowY: 'scroll',
        marginRight: 37,
        zIndex: 2,
        '&::-webkit-scrollbar': {
          borderRadius: 19,
          width: 10,
          zIndex: 1,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: DesignSystem.Color.text.gray,
          borderRadius: 19,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },

        '&::-webkit-scrollbar-track-piece:end': {
          backgroundColor: 'transparent',
          marginBottom: 13,
        },
      }),
      scrollTrackStart: (isEditing: boolean) => {
        return {
          '&::-webkit-scrollbar-track-piece:start': {
            backgroundColor: 'transparent',
            marginTop: isEditing ? 125 : 38,
          },
        };
      },
      scrollBar: css({
        backgroundColor: DesignSystem.Color.background.disabled,
        position: 'absolute',
        height: 454,
        top: 213,
        right: 37,
        width: 10,
        borderRadius: 19,
      }),
      guide: css(DesignSystem.Text.info, {
        color: DesignSystem.Color.text.gray,
        width: 260,
      }),
    },
  },
};
const mockIngredientData: IngredientDataType[][] = [
  [
    {
      name: '김치',
      quantity: '3개',
      registrationDate: moment('2023-02-05'),
      expirationDate: moment('2026-02-05'),
      uniqueId: 1,
    },
    {
      name: '양파',
      quantity: '2개',
      registrationDate: moment('2023-02-05'),
      expirationDate: moment('2023-02-05'),
      uniqueId: 2,
    },
    {
      name: '당근',
      quantity: '1개',
      registrationDate: moment('2023-02-05'),
      expirationDate: moment('2023-02-05'),
      uniqueId: 3,
    },
    {
      name: '소고기',
      quantity: '300g',
      registrationDate: moment('2023-02-05'),
      expirationDate: moment('2023-02-05'),
      uniqueId: 4,
    },
  ],
  [
    {
      name: '돼지고기',
      quantity: '300g',
      registrationDate: moment('2023-02-05'),
      expirationDate: moment('2023-02-05'),
      uniqueId: 5,
    },
  ],
];
export interface IngredientDataType {
  name: string;
  quantity: string;
  registrationDate: Moment;
  expirationDate: Moment | null;
  uniqueId?: number;
}

function Inventory() {
  const [data, setData] = useState<IngredientDataType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [isOverflowed, setIsOverflowed] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const checkRef = useRef<HTMLDivElement>(null);

  const handleDataChange = (inputData: IngredientDataType) => {
    setData([{ ...inputData }, ...data]);
  };
  const handleEdit = () => {
    setIsEditing(true);
    setSubmit(false);
  };
  const handleContentEdit = (
    targetIdx: number,
    inputData: IngredientDataType,
  ) => {
    setData(data.map((item, idx) => (targetIdx === idx ? inputData : item)));
  };
  const handleDelete = (targetIdx: number) => {
    setData(data.filter((_, idx) => idx !== targetIdx));
  };
  const handleComplete = () => {
    setIsEditing(false);
    setSubmit(true);
  };

  useEffect(() => {
    setIsOverflowed(
      !!checkRef.current &&
        checkRef.current?.scrollHeight > checkRef.current?.clientHeight,
    );
  }, [checkRef.current?.scrollHeight, isEditing]);

  useEffect(() => {
    if (data.length === 0) {
      handleComplete();
    }
  }, [data]);
  return (
    <Stack align="center" css={styles.wrapper}>
      <Stack css={styles.inventory.background}>
        <Group position="apart" style={{ marginBottom: 31, width: 1264 }}>
          <Group gap={11}>
            <IconList />
            <Typography variant="headline">INVENTORY</Typography>
          </Group>
          {data.length !== 0 &&
            (isEditing ? (
              <IconComplete onClick={handleComplete} />
            ) : (
              <IconEdit onClick={handleEdit} />
            ))}
        </Group>
        <Stack>
          <Group gap={1}>
            <Typography
              variant="body"
              css={[styles.inventory.header, { width: 332, paddingLeft: 59 }]}
            >
              재료명
            </Typography>
            <Typography
              variant="body"
              css={[styles.inventory.header, { width: 263, paddingLeft: 22 }]}
            >
              수량
            </Typography>
            <Typography
              variant="body"
              css={[styles.inventory.header, { width: 263, paddingLeft: 22 }]}
            >
              등록일자
            </Typography>
            <Typography
              variant="body"
              css={[styles.inventory.header, { width: 403, paddingLeft: 22 }]}
            >
              유통기한
            </Typography>
          </Group>
          <Stack css={styles.inventory.ingredients.box}>
            <Group
              position="apart"
              style={{
                paddingRight: 136,
                marginBottom: 19,
                opacity: `${isEditing ? 0 : 1}`,
              }}
            >
              <Typography
                variant="info"
                css={styles.inventory.ingredients.guide}
              >
                *당근
              </Typography>
              <Typography
                variant="info"
                css={styles.inventory.ingredients.guide}
              >
                *2개
              </Typography>
              <Typography
                variant="info"
                css={styles.inventory.ingredients.guide}
              >
                *{moment().format('YYYY/MM/DD').toString()}
              </Typography>
              <Typography
                variant="info"
                css={styles.inventory.ingredients.guide}
              >
                *{moment().add(1, 'months').format('YYYY/MM/DD').toString()}
              </Typography>
            </Group>

            <Stack spacing={17} style={{ maxHeight: 592 }}>
              {(!isEditing || data.length === 0) && (
                <IngrInputBox
                  type="input"
                  handleDataChange={handleDataChange}
                />
              )}
              <Stack
                css={[
                  styles.inventory.ingredients.scrollBox,
                  styles.inventory.ingredients.scrollTrackStart(isEditing),
                ]}
                spacing={17}
                justify="flex-start"
                ref={checkRef}
              >
                {data.map((item, idx) => {
                  return (
                    <IngrInputBox
                      type={isEditing ? 'edit' : 'list'}
                      item={item}
                      submit={submit}
                      hanldeEdit={(input: IngredientDataType) => {
                        handleContentEdit(idx, input);
                      }}
                      handleRemove={() => {
                        handleDelete(idx);
                      }}
                      key={`ingredient-${item.name}-${item.registrationDate}-${item.uniqueId}`}
                    />
                  );
                })}
              </Stack>
            </Stack>
            {isOverflowed && (
              <div css={styles.inventory.ingredients.scrollBar}></div>
            )}
          </Stack>
        </Stack>
      </Stack>
      <Stack css={{ margin: '148px 0 65px 0', width: 1264 }} spacing={53}>
        <Typography variant="headline">
          유통기한이 얼마 남지 않은 재료
        </Typography>
        <Group>
          {mockIngredientData[currentPage - 1].map((item) => {
            return (
              <ShortExpirationItem
                item={item}
                key={`short-exporation-${item.name}-${item.expirationDate}-${item.uniqueId}`}
              />
            );
          })}
        </Group>
      </Stack>
      <Pagenumber
        pageCount={mockIngredientData.length}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
      <Stack>
        <Typography variant="headline" css={{ margin: '190px 0 53px 0' }}>
          재료 기반 추천 레시피
        </Typography>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '53px 15px',
          }}
        >
          {mockRecipeData.map((props, idx) => (
            <Recipe
              {...props}
              key={`recipe-${props.name}-${props.author}-${idx}
              `}
            />
          ))}
        </div>
      </Stack>
    </Stack>
  );
}
export default Inventory;
