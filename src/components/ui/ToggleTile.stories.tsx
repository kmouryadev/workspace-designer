import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ToggleTile } from "./Tile";

const meta: Meta<typeof ToggleTile> = {
  title: "UI/Tile/ToggleTile",
  component: ToggleTile,
  args: {
    item: {
      id: "l-desk",
      name: "Desk Lamp",
      spec: "Arm lamp, warm LED",
      priceK: 100,
      art: "lamp-desk",
    },
    maxQuantity: 1,
    onAdd: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ToggleTile>;

export const Unselected: Story = {
  args: { quantity: 0 },
};

export const Selected: Story = {
  args: { quantity: 1 },
};

export const WithStepper: Story = {
  args: {
    item: {
      id: "m27",
      name: '27" 4K Monitor',
      spec: "Up to 3 on one desk",
      priceK: 300,
      art: "desk-std",
    },
    maxQuantity: 3,
    quantity: 2,
    onIncrease: fn(),
    onDecrease: fn(),
  },
};
