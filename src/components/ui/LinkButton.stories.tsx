import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LinkButton } from "./LinkButton";

const meta: Meta<typeof LinkButton> = {
  title: "UI/LinkButton",
  component: LinkButton,
  args: {
    href: "/",
    children: "Design another setup",
  },
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};
