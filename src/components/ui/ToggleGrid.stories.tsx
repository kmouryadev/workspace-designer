import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ToggleGrid } from "./ToggleGrid";
import type { Item } from "@/data/items";

const LIGHTS: Item[] = [
  { id: "l-desk", name: "Desk Lamp", spec: "Arm lamp, warm LED", priceK: 100, art: "lamp-desk", max: 1 },
  { id: "l-led", name: "LED Light Bar", spec: "Mounted above the monitors", priceK: 120, art: "lamp-led", max: 1 },
  { id: "l-floor", name: "Floor Lamp", spec: "Stands left of the desk", priceK: 150, art: "lamp-floor", max: 1 },
];

const MONITORS: Item[] = [
  { id: "m27", name: '27" 4K Monitor', spec: "Up to 3 on one desk", priceK: 300, art: "desk-std", max: 3 },
];

const meta: Meta<typeof ToggleGrid> = {
  title: "UI/ToggleGrid",
  component: ToggleGrid,
};

export default meta;
type Story = StoryObj<typeof ToggleGrid>;

export const SingleSelect: Story = {
  args: {
    items: LIGHTS,
    qty: { "l-desk": 1 },
    onAdd: fn(),
  },
};

export const WithQuantityStepper: Story = {
  args: {
    items: MONITORS,
    qty: { m27: 2 },
    onAdd: fn(),
    onIncrease: fn(),
    onDecrease: fn(),
  },
};
