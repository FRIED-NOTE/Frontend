import { StoryObjWithCSSProp } from '@/utils/types';
import type { Meta } from '@storybook/react';
import Tag from './Tag';

const meta: Meta<typeof Tag> = {
  component: Tag,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObjWithCSSProp<typeof Tag>;

export const TagDefault: Story = {
  args: {
    children: 'tag-example',
  },
};
export const TagWithValue: Story = {
  args: {
    children: 'tag-example1',
    value: 'tag-value-1',
  },
};