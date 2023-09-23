import { Button } from '.';
import type { StoryObj } from '@storybook/react';
import type { Meta } from '@storybook/react';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default = {
  args: {
    children: 'Click me!',
  },
} satisfies Story;
