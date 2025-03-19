import '../app/[locale]/globals.css';
import type { Meta, StoryObj } from '@storybook/react';
import ModalSample from '@/components/ModalSample';

const meta = {
  title: 'COMP/ModalSample',
  component: ModalSample,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ModalSample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Modal: Story = {};
