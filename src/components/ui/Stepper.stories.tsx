import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stepper } from "./Stepper";

const meta: Meta<typeof Stepper> = {
  title: "UI/Stepper",
  component: Stepper,
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Setup: Story = {
  args: { current: 1 },
};

export const Accessories: Story = {
  args: { current: 2 },
};

export const Summary: Story = {
  args: { current: 3 },
};

export const RentalRequest: Story = {
  args: { current: 4 },
};
