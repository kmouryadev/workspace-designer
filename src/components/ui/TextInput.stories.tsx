import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextInput } from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "UI/TextInput",
  component: TextInput,
  args: {
    type: "text",
    placeholder: "Jane Doe",
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};

export const Invalid: Story = {
  args: { invalid: true, defaultValue: "not-an-email", type: "email" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
