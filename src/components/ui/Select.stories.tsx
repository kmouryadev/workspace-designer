import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  render: (args) => (
    <Select {...args}>
      <option value="weekly">Weekly</option>
      <option value="biweekly">Biweekly</option>
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </Select>
  ),
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: { defaultValue: "monthly" },
};

export const Invalid: Story = {
  args: { defaultValue: "monthly", invalid: true },
};
