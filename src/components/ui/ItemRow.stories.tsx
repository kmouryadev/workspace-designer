import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ItemRow } from "./ItemRow";
import { Button } from "./Button";
import { QuantityStepper } from "./QuantityStepper";

const meta: Meta<typeof ItemRow> = {
  title: "UI/ItemRow",
  component: ItemRow,
  args: {
    art: "desk-std",
    name: "Standing Desk Pro",
    meta: "Rp 450.000 / month",
  },
};

export default meta;
type Story = StoryObj<typeof ItemRow>;

export const Default: Story = {};

export const Small: Story = {
  args: { thumbSize: "sm" },
};

export const WithChangeAction: Story = {
  args: {
    trailing: (
      <Button variant="plain" size="inline" className="text-[12px] text-gold-text">
        Change
      </Button>
    ),
  },
};

export const WithQuantityStepper: Story = {
  args: {
    art: "chair-ergo",
    name: '27" 4K Monitor',
    meta: "Rp 300.000 / month × 2",
    trailing: (
      <QuantityStepper itemName='27" 4K Monitor' quantity={2} onDecrease={fn()} onIncrease={fn()} />
    ),
  },
};
