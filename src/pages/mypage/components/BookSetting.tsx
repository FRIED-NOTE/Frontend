import EmptyCheckbox from '@/assets/icons/checkbox-empty.svg';
import FillCheckbox from '@/assets/icons/checkbox-fill.svg';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group, Stack, Stroke, Typography } from '@base';
import Button from '@copmonents/Button';
import { css } from '@emotion/react';
import { ChangeEvent, useState } from 'react';
import { RecipeBookType } from '..';

const styles = {
  innerContent: {
    stroke: css({
      background: DesignSystem.Color.background.disabled,
      marginTop: 16,
    }),
    input: {
      stack: css({ marginTop: 41 }),
    },
    checkboxStack: css({ marginTop: 32 }),
    checkbox: css(globalStyles.button),
    button: css({
      width: 265,
      alignSelf: 'center',
      marginTop: 44,
      cursor: 'default',
      background: DesignSystem.Color.background.disabled,
    }),
    buttonActive: css({
      background: DesignSystem.Color.background.black,
      cursor: 'pointer',
    }),
  },
};
interface BookSettingProps {
  data: RecipeBookType;
  onSubmit: (data: RecipeBookType) => void;
  submitText: string;
}

function BookSetting({ data, onSubmit, submitText }: BookSettingProps) {
  const [inputData, setInputData] = useState<RecipeBookType>(data);
  const {
    title: inputTitle,
    intro: inputIntro,
    forPublic: inputForPublic,
  } = inputData;

  return (
    <Stack>
      <Typography variant="subtitle">레시피북 설정 편집</Typography>
      <Stroke css={styles.innerContent.stroke} />
      <Stack spacing={15} css={styles.innerContent.input.stack}>
        <Typography variant="info" color={DesignSystem.Color.text.gray}>
          레시피북 제목
        </Typography>

        <TextInput
          value={inputTitle}
          setValue={(text) => {
            setInputData({ ...inputData, title: text });
          }}
          maxLength={20}
        />
      </Stack>
      <Stack spacing={20} css={styles.innerContent.checkboxStack}>
        <Typography variant="info" color={DesignSystem.Color.text.gray}>
          공개범위 설정
        </Typography>
        <Group gap={46}>
          <Group
            gap={2}
            onClick={() => {
              setInputData({ ...inputData, forPublic: true });
            }}
            css={styles.innerContent.checkbox}
          >
            <img src={inputForPublic ? FillCheckbox : EmptyCheckbox} />
            <Typography variant="button">모든 대상에게 공개</Typography>
          </Group>
          <Group
            gap={2}
            onClick={() => {
              setInputData({ ...inputData, forPublic: false });
            }}
            css={styles.innerContent.checkbox}
          >
            <img src={inputForPublic ? EmptyCheckbox : FillCheckbox} />
            <Typography variant="button">
              링크를 가진 대상에게만 공개
            </Typography>
          </Group>
        </Group>
      </Stack>
      <Stack spacing={15} css={styles.innerContent.input.stack}>
        <Typography variant="info" color={DesignSystem.Color.text.gray}>
          한줄 소개
        </Typography>
        <TextInput
          value={inputIntro}
          setValue={(text) => {
            setInputData({ ...inputData, intro: text });
          }}
          maxLength={45}
        />
      </Stack>
      <Button
        variant="icon"
        css={[
          styles.innerContent.button,
          inputTitle && inputIntro && styles.innerContent.buttonActive,
        ]}
        onClick={() => onSubmit(inputData)}
      >
        {submitText}
      </Button>
    </Stack>
  );
}

const textInputStyles = {
  wrapper: css({
    position: 'relative',
  }),
  box: css(DesignSystem.Text.button, {
    background: DesignSystem.Color.background.gray,
    color: DesignSystem.Color.text.black,
    height: 42,
    borderRadius: DesignSystem.Round.solid,
    textIndent: 15,
    padding: '0 70px 0 0',
    width: 658,
    boxSizing: 'border-box',
    '&:focus': {
      border: '1px solid',
      borderColor: DesignSystem.Color.primary['yellow-hover'],
    },
  }),
  counter: css({
    color: DesignSystem.Color.text.gray,
    position: 'absolute',
    top: '20%',
    right: 17,
  }),
};

interface TextInputProps {
  value: string;
  setValue: (text: string) => void;
  maxLength: number;
}

function TextInput({ value, setValue, maxLength }: TextInputProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    setValue(e.target.value);
  };
  const length = value.length;
  return (
    <div css={textInputStyles.wrapper}>
      <input
        type="text"
        value={value}
        onChange={handleInput}
        maxLength={maxLength}
        css={textInputStyles.box}
      />
      <Typography variant="info" css={textInputStyles.counter}>
        ({length}/{maxLength})
      </Typography>
    </div>
  );
}
export default BookSetting;
