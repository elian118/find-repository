import '../app/[locale]/globals.css';
import type { Meta, StoryObj } from '@storybook/react';
import LoadingView from '@/components/loading-view';

const meta = {
  title: 'COMP/LoadingView',
  component: LoadingView,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LoadingView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};
