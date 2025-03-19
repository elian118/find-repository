import '../app/[locale]/globals.css';
import type { Meta, StoryObj } from '@storybook/react';
import PageLoadingView from '@/components/page-loading-view';

const meta = {
  title: 'COMP/PageLoadingView',
  component: PageLoadingView,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PageLoadingView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PageLoading: Story = {};
