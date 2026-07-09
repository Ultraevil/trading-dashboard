import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'ghost', 'danger', 'subtle'],
      description: 'Visual style. `primary` for the main action in a view, `danger` for destructive actions, `ghost`/`subtle` for secondary actions.',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    fullWidth: { control: 'boolean' },
    isLoading: {
      control: 'boolean',
      description: 'Shows a spinner and disables the button (e.g. while a request is in flight).',
    },
    disabled: { control: 'boolean' },
    onClick: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete widget' },
};

export const Subtle: Story = {
  args: { variant: 'subtle' },
};

export const Loading: Story = {
  args: { variant: 'primary', isLoading: true, children: 'Signing in…' },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
};

export const FullWidth: Story = {
  args: { variant: 'primary', fullWidth: true },
  parameters: {
    layout: 'padded',
  },
};

/** All four variants side by side, at both sizes - useful for a quick visual diff. */
export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {(['primary', 'ghost', 'danger', 'subtle'] as const).map((variant) => (
            <Button key={variant} {...args} variant={variant} size={size}>
              {variant}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
