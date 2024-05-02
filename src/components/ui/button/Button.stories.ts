import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test'; //eslint-disable-line
import Button from './Button';

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Test button',
  },
};

export const Link: Story = {
  args: {
    children: 'Link button',
    variant: 'link',
  },
};

export const ActiveLink: Story = {
  args: {
    children: 'Link button',
    variant: 'link',
    active: true,
  },
};

export const Outlined: Story = {
  args: {
    children: '▶',
    variant: 'outline',
  },
};

export const Start: Story = {
  args: {
    variant: 'start',
  },
};

export const Stop: Story = {
  args: {
    variant: 'stop',
  },
};
