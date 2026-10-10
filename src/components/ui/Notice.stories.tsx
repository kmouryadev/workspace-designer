import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Notice } from "./Notice";

const meta: Meta<typeof Notice> = {
  title: "UI/Notice",
  component: Notice,
};

export default meta;
type Story = StoryObj<typeof Notice>;

export const Error: Story = {
  args: {
    notice: { type: "error", text: "Up to 3 monitors fit on this desk. Remove one to add another." },
    onDismiss: fn(),
  },
};

export const Info: Story = {
  args: {
    notice: { type: "info", text: "Standard monitors replace the ultrawide." },
    onDismiss: fn(),
  },
};

export const WithoutDismiss: Story = {
  args: {
    notice: { type: "info", text: "An ultrawide takes the whole desk, so your other monitors were removed." },
  },
};
