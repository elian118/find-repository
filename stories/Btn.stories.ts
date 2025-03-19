import '../app/[locale]/globals.css';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Btn, { BtnProps } from '@/components/btn';

const meta = {
  title: 'COMP/Btn',
  component: Btn,
  parameters: {
    layout: 'centered',
  },
  args: { onClick: fn() },
} satisfies Meta<BtnProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading',
  },
};

export const Disabled: Story = {
  args: {
    isLoading: false,
    children: 'Disabled',
  },
};
