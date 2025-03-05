import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../../../../src/components/ui/buttons/button/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    children: 'Button',
  },
};
