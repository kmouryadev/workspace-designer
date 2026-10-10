import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { SelectTile } from "./Tile";

const meta: Meta<typeof SelectTile> = {
  title: "UI/Tile/SelectTile",
  component: SelectTile,
  args: {
    item: {
      id: "desk-std",
      name: "Standing Desk Pro",
      spec: "Height adjustable, 120 x 70 cm",
      priceK: 450,
      art: "desk-std",
    },
    onSelect: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof SelectTile>;

export const Unselected: Story = {
  args: { selected: false },
};

export const Selected: Story = {
  args: { selected: true },
};
