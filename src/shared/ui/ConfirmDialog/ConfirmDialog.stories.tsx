import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ConfirmDialog } from './ConfirmDialog';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Shared/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  args: {
    open: true,
    message: 'Delete this alert?',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    onConfirm: fn(),
    onCancel: fn(),
  },
  argTypes: {
    onConfirm: { table: { disable: true } },
    onCancel: { table: { disable: true } },
  },
  parameters: {
    // The backdrop is `position: fixed; inset: 0`, so it needs the full
    // viewport rather than being boxed in by docs padding.
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {};

export const Danger: Story = {
  args: { variant: 'danger' },
};

export const Closed: Story = {
  args: { open: false },
};
