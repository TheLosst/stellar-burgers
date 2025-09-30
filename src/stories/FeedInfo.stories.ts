import { FeedInfoUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/FeedInfo',
  component: FeedInfoUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof FeedInfoUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultFeedInfo: Story = {
  args: {
    feed: {
      total: 1000,
      totalToday: 50
    },
    readyOrders: [123, 456, 789],
    pendingOrders: [101, 102, 103]
  }
};

export const EmptyFeedInfo: Story = {
  args: {
    feed: {
      total: 0,
      totalToday: 0
    },
    readyOrders: [],
    pendingOrders: []
  }
};
