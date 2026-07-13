import type { Meta, StoryObj, Decorator } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { createTestStore } from '@/test/createTestStore';
import type { Toast, ToastVariant } from '@/features/ui/uiSlice';
import { ToastContainer } from './ToastContainer';

/**
 * ToastContainer has no props of its own - it reads its list of toasts
 * straight from the `ui` slice. So instead of args, each story below
 * supplies its own Redux store, preloaded with the toasts it wants to
 * show, and provides it via a nested <Provider> that overrides the one
 * `.storybook/preview.tsx` sets up globally.
 */
const withToasts = (toasts: Toast[]): Decorator => {
  const store = createTestStore({
    ui: { isSidebarCollapsed: false, isAlertSoundEnabled: true, toasts },
  });

  return (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  );
};

const toast = (message: string, variant: ToastVariant, id = '1'): Toast => ({
  id,
  message,
  variant,
});

const meta: Meta<typeof ToastContainer> = {
  title: 'Shared/Toast',
  component: ToastContainer,
  tags: ['autodocs'],
  parameters: {
    // ToastStack positions itself with `position: fixed; bottom/right`
    // relative to the viewport, so it reads best without docs padding
    // boxing it in.
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ToastContainer>;

export const Success: Story = {
  decorators: [withToasts([toast('Dashboard layout saved', 'success')])],
};

export const Error: Story = {
  decorators: [
    withToasts([toast('Failed to connect to the market feed', 'error')]),
  ],
};

export const Info: Story = {
  decorators: [withToasts([toast('Reconnecting…', 'info')])],
};

export const Stacked: Story = {
  decorators: [
    withToasts([
      toast('Dashboard layout saved', 'success', '1'),
      toast('Reconnecting to market feed…', 'info', '2'),
      toast('Failed to save widget position', 'error', '3'),
    ]),
  ],
};

export const Empty: Story = {
  decorators: [withToasts([])],
};
