import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'you@example.com',
    onChange: fn(),
  },
  argTypes: {
    label: { control: 'text' },
    error: {
      control: 'text',
      description: 'Renders below the input and switches the border to red when set.',
    },
    disabled: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    onChange: { table: { disable: true } },
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: { label: 'Email' },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Enter a valid email address',
    defaultValue: 'not-an-email',
  },
};

export const Disabled: Story = {
  args: { label: 'Email', disabled: true, defaultValue: 'you@example.com' },
};

export const Password: Story = {
  args: { label: 'Password', type: 'password', defaultValue: 'hunter2' },
};
