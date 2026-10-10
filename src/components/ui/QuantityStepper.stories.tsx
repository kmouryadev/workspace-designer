import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { QuantityStepper } from "./QuantityStepper";

const meta: Meta<typeof QuantityStepper> = {
  title: "UI/QuantityStepper",
  component: QuantityStepper,
  args: {
    itemName: '27" 4K Monitor',
    quantity: 1,
    onDecrease: fn(),
    onIncrease: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof QuantityStepper>;

export const Default: Story = {};

export const HigherQuantity: Story = {
  args: { quantity: 3 },
};
