import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Select } from './Select';

const OPTIONS = [
  { value: 'BTCUSDT', label: 'BTCUSDT' },
  { value: 'ICEEUR:BRN1!', label: 'ICEEUR:BRN1! (Brent futures)' },
];

const meta: Meta<typeof Select> = {
  title: 'Shared/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    options: OPTIONS,
    onChange: fn(),
  },
  argTypes: {
    label: { control: 'text' },
    error: {
      control: 'text',
      description: 'Renders below the select and switches the border to red when set.',
    },
    disabled: { control: 'boolean' },
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
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: { label: 'Symbol' },
};

export const WithError: Story = {
  args: { label: 'Symbol', error: 'Choose a symbol' },
};

export const Disabled: Story = {
  args: { label: 'Symbol', disabled: true },
};
