import DesignSystem from '@/utils/designSystem';
import { Group, Stack, Typography } from '@base';
import Button from '@copmonents/Button';
import InputBox from '@copmonents/InputBox';
import { RecipeProps } from '@copmonents/Recipe';
import { css } from '@emotion/react';
import Banner from './components/Banner';
import Recipes from './components/Recipes';

const mockBannerData = [
  {
    recipeNumber: 24,
    subject: '에디터 추천',
    title: '비건을 위한 버섯탕수육 레시피',
    description:
      '요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요. 먼저 표고버섯을 준비해주세요. 물에 씻...',
    author: '해피밀',
    isAdded: true,
  },
  {
    recipeNumber: 24,
    subject: '에디터 추천',
    title: '비건을 위한 버섯탕수육 레시피',
    description:
      '요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요. 먼저 표고버섯을 준비해주세요. 물에 씻...',
    author: '해피밀',
    isAdded: true,
  },
  {
    recipeNumber: 24,
    subject: '에디터 추천',
    title: '비건을 위한 버섯탕수육 레시피',
    description:
      '요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요. 먼저 표고버섯을 준비해주세요. 물에 씻...',
    author: '해피밀',
    isAdded: true,
  },
  {
    recipeNumber: 24,
    subject: '에디터 추천',
    title: '비건을 위한 버섯탕수육 레시피',
    description:
      '요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요. 먼저 표고버섯을 준비해주세요. 물에 씻...',
    author: '해피밀',
    isAdded: true,
  },
  {
    recipeNumber: 24,
    subject: '에디터 추천',
    title: '비건을 위한 버섯탕수육 레시피',
    description:
      '요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요. 먼저 표고버섯을 준비해주세요. 물에 씻...',
    author: '해피밀',
    isAdded: true,
  },
  {
    recipeNumber: 24,
    subject: '에디터 추천',
    title: '비건을 위한 버섯탕수육 레시피',
    description:
      '요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요. 먼저 표고버섯을 준비해주세요. 물에 씻...',
    author: '해피밀',
    isAdded: true,
  },
];

const mockTagData = [
  { value: 'ingr-1', label: '# 재료 1' },
  { value: 'ingr-2', label: '# 재료 2' },
  { value: 'ingr-3', label: '# 재료 3' },
  { value: 'ingr-4', label: '# 재료 4' },
  { value: 'ingr-5', label: '# 재료 5' },
];

export const mockRecipeData: RecipeProps[] = Array(14).fill({
  author: '해피밀',
  contents: `소스 : 스리라차 소스, 요거트 소스
반죽 : 밀가루, 계란
오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구...`,
  name: '치킨 샐러드',
});

const styles = {
  root: css({
    paddingBottom: 136,
  }),
  description: {
    root: css({
      height: 700,
    }),
    pic: css({
      width: 934,
      overflow: 'hidden',
      height: '100%',
      backgroundColor: DesignSystem.Color.primary.yellow,
    }),
    text: css({
      flex: 1,
    }),
  },
  input: css({ marginTop: 75 }),
};

export interface HomeProps {}

function Home({ ...props }: HomeProps) {
  return (
    <Stack css={styles.root} spacing={110}>
      <Group css={styles.description.root} wrapChild nowrap>
        <div css={styles.description.pic}>
          <Typography variant="display">
            세상에 똑같은 레시피는 없다. 똑같은 요리만 있을 뿐
          </Typography>
        </div>
        <div css={styles.description.text}>
          <Typography variant="body">
            세상에 똑같은 요리는 있어도 똑같은 레시피는 없습니다. 같은 계란
            후라이라도 사람이 100명이면 100개의 레시피가 있습니다. 나만의 요리
            레시피를 기록하고 최고의 레시피를 모른 레시피 북을 만들어보세요.
            프라이노트를 통해 함께 일하는 동료나 직원에게 레시피를 공유하고 주방
            재료를 함께 관리해보세요.
          </Typography>
          <Button variant="outline">새로운 레시피 생성하기</Button>
        </div>
      </Group>
      <Banner
        onRecipeBookClick={(index, item) => {}}
        onRecipeAddClick={(index, item) => {}}
        items={mockBannerData}
      />
      <InputBox
        css={styles.input}
        tags={mockTagData}
        onChange={(value) => {}}
        searchItems={[
          '여름나기 좋은 메밀 소바',
          '메밀 소고기 레시피',
          '최고로 맛있는 메밀소면',
          '여름나기 좋은 수박',
          '수박화채 레시피',
          '최고로 맛있는 소고기',
        ]}
      />
      <Recipes recipes={mockRecipeData} />
    </Stack>
  );
}

export default Home;
