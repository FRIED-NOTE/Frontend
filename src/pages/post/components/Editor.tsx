import DesignSystem from '@/utils/designSystem';
import { Stack, Stroke } from '@base';
import { css } from '@emotion/react';
import { produce } from 'immer';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Image from './Editor/Image';
import Ingredient, { IngredientType } from './Editor/Ingredient';
import TextInput, { TextInputValueItemType } from './Editor/TextInput';
import Timer from './Editor/Timer';
import Tip from './Editor/Tip';
import Toolbar from './Editor/Toolbar';

const styles = {
  root: css({
    padding: '154px 82px 0 82px',
    border: '1px solid var(--background-disabled)',
    background: DesignSystem.Color.background.white,
  }),
  input: css(
    {
      '::placeholder': {
        color: DesignSystem.Color.text.gray,
      },
      color: DesignSystem.Color.text.black,
      width: '100%',
    },
    DesignSystem.Text.headline,
  ),
  stroke: css({
    backgroundColor: DesignSystem.Color.background.disabled,
    marginTop: 12,
  }),
  addArea: css({
    cursor: 'text',
    height: 154,
    marginTop: -12,
  }),
};

export interface EditorProps {
  onChange: (data: PostDataType) => void;
}

export type TextType = TextInputValueItemType & { key: number; id: string };

export interface PostDataType {
  ingredients: (IngredientType & { key: number })[];
  text: TextType[];
  title: string;
}

function Editor({ onChange, ...props }: EditorProps) {
  const [ingrCount, setIngrCount] = useState(1);
  const [dataCount, setDataCount] = useState(1);
  const [lastFocusedIndex, setLastFocusedIndex] = useState<number>();
  const [isFocused, setIsFocused] = useState(false);
  const [titleImage, setTitleImage] = useState<number>();
  const [data, setData] = useState<PostDataType>({
    ingredients: [{ groupTitle: '', tags: [], key: ingrCount }],
    text: [{ value: '', index: 1, key: dataCount, id: 'index-text' }],
    title: '',
  });
  const textRefs = useRef<Array<HTMLTextAreaElement | HTMLInputElement | null>>(
    [],
  );

  useEffect(() => {
    if (titleImage !== undefined) return;
    const image = data.text.find((item) => item.id === 'image');
    if (image) setTitleImage(image.key);
  }, [titleImage]);

  useEffect(() => {
    onChange(data);
  }, [data]);

  useEffect(() => {
    if (data.text.length > 1000)
      setData({ ...data, text: data.text.slice(0, 1000) });
  }, [data]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      title: e.target.value,
    });
  };

  const handleIngrChange = (
    item: IngredientType,
    targetIndex: number,
    key: number,
  ) => {
    if (targetIndex === data.ingredients.length - 1) {
      if (item.groupTitle === '') return;
      setData(
        produce((draft) => {
          draft.ingredients.push({
            groupTitle: '',
            tags: [],
            key: ingrCount + 1,
          });
        }),
      );
      setIngrCount(ingrCount + 1);
    } else
      setData(
        produce((draft) => {
          draft.ingredients[targetIndex] = { ...item, key };
        }),
      );
  };

  const handleIngrDelete = (targetIndex: number) => {
    if (
      data.ingredients.length === 1 ||
      targetIndex === data.ingredients.length - 1
    )
      return;
    setData({
      ...data,
      ingredients: data.ingredients.filter((_, index) => index !== targetIndex),
    });
  };

  const handleTextChange = (
    item: Partial<TextInputValueItemType> | string,
    targetIndex: number,
  ) => {
    setData(
      produce((draft) => {
        if (typeof item === 'string')
          draft.text[targetIndex] = { ...draft.text[targetIndex], value: item };
        else draft.text[targetIndex] = { ...draft.text[targetIndex], ...item };
      }),
    );
  };

  const handleTextSubmit = (value: string, index: number) => {
    const prevItem = data.text[index];

    setData({
      ...data,
      text: [
        ...data.text.slice(0, index),
        {
          ...prevItem,
          value: prevItem.value.slice(0, prevItem.value.length - value.length),
        },
        {
          value,
          index: prevItem?.index && prevItem.index + 1,
          key: dataCount + 1,
          id: 'index-text',
        },
        ...data.text.slice(index + 1),
      ],
    });
    setDataCount(dataCount + 1);
  };

  const handleTextDelete = (
    value: string,
    targetIndex: number,
    type: string,
  ) => {
    const prevRef = textRefs.current[targetIndex - 1];
    const remainText = data.text.filter((item) => item.id === 'index-text');
    if (remainText.length <= 1 && type === 'index-text') return;
    if (type === 'image' && titleImage === data.text[targetIndex].key)
      setTitleImage(undefined);
    setData({
      ...data,
      text: data.text
        .map((item, index) =>
          index === targetIndex - 1
            ? { ...item, value: `${item.value}${value}` }
            : item,
        )
        .filter((_, index) => index !== targetIndex),
    });

    prevRef?.focus();
    setTimeout(() => {
      prevRef?.setSelectionRange(-1, -1);
    }, 1);
  };

  const handleInputArrowKey = (
    direction: 'up' | 'down',
    caretPosition: number | undefined,
    index: number,
  ) => {
    const isDirectinoUp = direction === 'up';
    const ref = textRefs.current[isDirectinoUp ? index - 1 : index + 1];
    const indexCheck = isDirectinoUp
      ? index === 0
      : index === data.text.length - 1;
    const position = isDirectinoUp ? 0 : -1;

    if (indexCheck || !ref) {
      // direction에 따라, 다음이나 이전 index가 없다면, 마지막이나 첫번째 index라면
      textRefs.current[index]?.setSelectionRange(position, position);
    } else if (caretPosition !== undefined) {
      // direction에 따라, 다음이나 이전 index가 있다면, caretPosition이 있다면
      // TextInput에서 마지막이나 첫번째 caret에서 좌/우 방향키가 눌린 상황
      setTimeout(() => {
        ref.focus();
        ref.setSelectionRange(caretPosition, caretPosition);
      });
    } else {
      // 일반적인 위/아래 방향키가 눌린 상황
      ref.focus();
    }
  };

  const handleFocusBlur = (isFocus: boolean, index: number) => {
    if (isFocus) setLastFocusedIndex(index);
    setIsFocused(isFocus);
  };

  const handleToolBarClick = (
    type: 'tip' | 'image' | 'timer',
    imageSrc?: string,
  ) => {
    if (lastFocusedIndex !== undefined)
      switch (type) {
        case 'tip':
          setData(
            produce(data, (draft) => {
              draft.text.splice(lastFocusedIndex + 1, 0, {
                id: 'tip',
                value: '',
                key: dataCount + 1,
              });
            }),
          );
          setDataCount(dataCount + 1);
          break;
        case 'image':
          if (!imageSrc) break;
          if (titleImage === undefined) setTitleImage(dataCount + 1);
          setData(
            produce(data, (draft) => {
              draft.text.splice(lastFocusedIndex + 1, 0, {
                id: 'image',
                value: imageSrc,
                key: dataCount + 1,
              });
            }),
          );
          setDataCount(dataCount + 1);
          break;
        case 'timer':
          setData(
            produce(data, (draft) => {
              draft.text.splice(lastFocusedIndex + 1, 0, {
                id: 'timer',
                value: '',
                key: dataCount + 1,
              });
            }),
          );
          setDataCount(dataCount + 1);
          break;
      }
  };

  return (
    <Stack spacing={85} css={styles.root}>
      <div>
        <input
          css={styles.input}
          placeholder="레시피의 이름을 알려주세요."
          onChange={handleTitleChange}
          maxLength={13}
        />
        <Stroke css={styles.stroke} />
      </div>
      <Stack spacing={12}>
        {data.ingredients.map(({ key }, listIndex) => {
          const onRemove =
            listIndex !== data.ingredients.length - 1
              ? () => handleIngrDelete(listIndex)
              : undefined;
          return (
            <Ingredient
              key={`data-ingr-${key}`}
              onChange={(item) => handleIngrChange(item, listIndex, key)}
              onRemove={onRemove}
              index={key}
            />
          );
        })}
        {data.text.map((item, index) =>
          item.id === 'index-text' ? (
            <TextInput
              key={`data-text-${item.key}`}
              ref={(el) => (textRefs.current[index] = el)}
              propsValue={item}
              onValueChange={(data) => handleTextChange(data, index)}
              onSubmit={(value) => handleTextSubmit(value, index)}
              onDelete={(value) => handleTextDelete(value, index, item.id)}
              onClickArrowKey={(direction, caretPosition) =>
                handleInputArrowKey(direction, caretPosition, index)
              }
              placeholder="이미지와 함께 조리과정을 적어보세요."
              onFocusBlur={(isFocus) => handleFocusBlur(isFocus, index)}
            />
          ) : item.id === 'tip' ? (
            <Tip
              key={`data-tip-${item.key}`}
              ref={(el) => (textRefs.current[index] = el)}
              onChange={(data) => handleTextChange(data, index)}
              onClickArrowKey={(direction, caretPos) =>
                handleInputArrowKey(direction, caretPos, index)
              }
              onSubmit={(value) => handleTextSubmit(value, index)}
              onDelete={(value) => handleTextDelete(value, index, item.id)}
              onFocusBlur={(isFocus) => handleFocusBlur(isFocus, index)}
            />
          ) : item.id === 'image' ? (
            <Image
              isTitle={item.key === titleImage}
              item={item}
              handleImageClick={() => setTitleImage(item.key)}
              key={`data-image-${item.key}`}
              handleRemove={() => handleTextDelete('', index, item.id)}
            />
          ) : item.id === 'timer' ? (
            <Timer
              key={`data-timer-${item.key}`}
              ref={(el) => (textRefs.current[index] = el)}
              onChange={(data) => handleTextChange(data, index)}
              onClickArrowKey={(direction, caretPos) =>
                handleInputArrowKey(direction, caretPos, index)
              }
              onSubmit={(value) => handleTextSubmit(value, index)}
              onDelete={(value) => handleTextDelete(value, index, item.id)}
              onFocusBlur={(isFocus) => handleFocusBlur(isFocus, index)}
            />
          ) : (
            <Navigate to="/404" />
          ),
        )}
        <div
          data-testid="add-area"
          css={styles.addArea}
          onClick={() => {
            const length = data.text.length;
            if (data.text[length - 1].value === '')
              textRefs.current[length - 1]?.focus();
            else handleTextSubmit('', length - 1);
          }}
        />
      </Stack>
      <Toolbar
        active={isFocused}
        onItemClicked={handleToolBarClick}
        onMouseUp={() =>
          lastFocusedIndex !== undefined &&
          textRefs.current[lastFocusedIndex]?.focus()
        }
      />
    </Stack>
  );
}

export default Editor;
