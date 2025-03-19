import type { Meta, StoryObj } from '@storybook/react';
import SamplePage from '@/stories/SamplePage';

const meta = {
  title: 'Example/SamplePage',
  component: SamplePage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SamplePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const def: Story = {};
//
// export const LoggedOut: Story = {};
//
// // More on component testing: https://storybook.js.org/docs/writing-tests/component-testing
// export const LoggedIn: Story = {
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const loginButton = canvas.getByRole('button', { name: /Log in/i });
//     await expect(loginButton).toBeInTheDocument();
//     await userEvent.click(loginButton);
//     await expect(loginButton).not.toBeInTheDocument();
//
//     const logoutButton = canvas.getByRole('button', { name: /Log out/i });
//     await expect(logoutButton).toBeInTheDocument();
//   },
// };
