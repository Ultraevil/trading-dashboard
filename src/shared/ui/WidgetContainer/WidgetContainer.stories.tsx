import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { WidgetContainer } from './WidgetContainer';

const meta: Meta<typeof WidgetContainer> = {
  title: 'Shared/WidgetContainer',
  component: WidgetContainer,
  tags: ['autodocs'],
  args: {
    title: 'Brent Crude',
    children: (
      <div style={{ fontSize: '24px', fontWeight: 600 }}>$82.14</div>
    ),
  },
  argTypes: {
    title: { control: 'text' },
    onRemove: { table: { disable: true } },
    onRefresh: { table: { disable: true } },
  },
  parameters: {
    // WidgetContainer fills its parent (`height: 100%`) since on the real
    // dashboard that parent is a react-grid-layout cell - give it an
    // explicit box here so it has something to fill.
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '280px', height: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WidgetContainer>;

export const Default: Story = {};

export const WithRefresh: Story = {
  args: { onRefresh: fn() },
};

export const WithRemove: Story = {
  args: { onRemove: fn() },
};

export const WithBothActions: Story = {
  args: { onRefresh: fn(), onRemove: fn() },
};

export const LongTitle: Story = {
  args: {
    title: 'A very long widget title that should be truncated with an ellipsis',
    onRefresh: fn(),
    onRemove: fn(),
  },
};
