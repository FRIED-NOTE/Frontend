import { ReactComponent as IconSearchXs } from '@/assets/icon-search-xs.svg';
import { ReactComponent as IconSearch } from '@/assets/icon-search.svg';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group, Popover, Stack, Typography } from '@base';
import { css } from '@emotion/react';
import hangul from 'hangul-js';
import {
  CSSProperties,
  HTMLAttributes,
  LegacyRef,
  MouseEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Tag, { TagDataType } from './Tag';

export interface InputBoxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  searchItems?: string[];
  onChange?: (value: string | TagDataType[]) => void;
  onItemClick?: (value: string, index: number) => void;
  placeholder?: string;
  width?: CSSProperties['width'];
  tags?: TagDataType[];
  centerdTags?: boolean;
}

const triggerStyle = {
  wrapper: css({
    padding: '16px 26px',
    backgroundColor: DesignSystem.Color.background.white,
    borderRadius: DesignSystem.Round.solid,
    border: `1px solid ${DesignSystem.Color.text.gray}`,
  }),
  group: css({
    height: 33,
    flexWrap: 'nowrap',
  }),
  input: css({
    color: DesignSystem.Color.text.black,
    flex: 1,
    height: '100%',
    padding: 0,
  }),
};

const contentStyle = {
  wrapper: css({
    boxShadow: DesignSystem.Shadow,
  }),
  stack: css({
    padding: '24px 32px',
    borderRadius: DesignSystem.Round.solid,
    background: DesignSystem.Color.background.white,
  }),
  item: css(globalStyles.button),
  text: css({
    padding: 10,
  }),
};

function InputBox({
  onChange,
  onItemClick,
  searchItems,
  placeholder = '#태그로 재료를 검색해보세요.',
  width,
  style,
  tags,
  centerdTags,
  ...props
}: InputBoxProps) {
  const [inputValue, setInputValue] = useState('');
  const filterdSearchItems = searchItems?.filter(
    (itemValue) => hangul.search(itemValue, inputValue) >= 0,
  );

  const [selectedTags, setSelectedTags] = useState<TagDataType[]>([]);
  const restTags =
    tags &&
    tags.filter(
      (tag) => !selectedTags.some((targetTag) => targetTag.value === tag.value),
    );

  const isTagSelected = !!selectedTags.length;

  useEffect(() => {
    if (onChange) onChange(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedTags.length ? selectedTags : inputValue);
    }
  }, [selectedTags]);

  const onClickTagClose = (e: MouseEvent, value: string) => {
    setSelectedTags(selectedTags.filter((item) => item.value !== value));
  };

  const onClickTag = (e: MouseEvent, value: string) => {
    const filterTag = tags?.find((item) => item.value === value);
    const duplicatedTag = selectedTags.find((item) => item.value === value);
    if (filterTag && !duplicatedTag)
      setSelectedTags([...selectedTags, filterTag]);
  };

  const searchInput = useMemo(() => {
    if (isTagSelected)
      return (
        <Group gap={13} css={{ overflowX: 'scroll', flexWrap: 'nowrap' }}>
          {selectedTags.map(({ label, value }: TagDataType, index: number) => (
            <Tag
              onClick={onClickTag}
              onClose={onClickTagClose}
              key={`${label}-${value}-${index}`}
              value={value}
              active
            >
              {label}
            </Tag>
          ))}
        </Group>
      );
    else
      return (
        <input
          placeholder={placeholder}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          value={inputValue}
          css={[triggerStyle.input, DesignSystem.Text.body]}
          type="text"
        />
      );
  }, [selectedTags, inputValue]);

  return (
    <Popover style={{ width }} preventCloseOnClickTrigger position="full-width">
      <Popover.Trigger
        preventTrigger={isTagSelected}
        renderTriggerComponent={({ ref, onClick }) => (
          <Stack {...props} spacing={24}>
            <div
              ref={ref as LegacyRef<HTMLDivElement>}
              onClick={onClick}
              css={triggerStyle.wrapper}
              style={{ ...style }}
            >
              <Group css={triggerStyle.group} gap={13}>
                <IconSearch />
                {searchInput}
              </Group>
            </div>
            <Group position={centerdTags ? 'center' : 'left'} gap={12}>
              {restTags &&
                restTags.map(({ label, value }: TagDataType, index: number) => (
                  <Tag
                    onClick={onClickTag}
                    onClose={onClickTagClose}
                    key={`${label}-${value}-${index}`}
                    value={value}
                    disableCloseOnHover
                  >
                    {label}
                  </Tag>
                ))}
            </Group>
          </Stack>
        )}
      />
      <Popover.Content triggerPopoverMargin={0} css={contentStyle.wrapper}>
        {filterdSearchItems && (
          <Stack css={contentStyle.stack} spacing={5}>
            {filterdSearchItems.map((itemValue, index) => (
              <Group
                css={contentStyle.item}
                key={`search-item-${itemValue}-${index}`}
                onClick={() => {
                  setInputValue(itemValue);
                  onItemClick && onItemClick(itemValue, index);
                }}
              >
                <IconSearchXs />
                <Typography css={contentStyle.text} variant="body">
                  {itemValue}
                </Typography>
              </Group>
            ))}
          </Stack>
        )}
      </Popover.Content>
    </Popover>
  );
}

export default InputBox;
