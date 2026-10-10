import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "./FormField";
import { TextInput } from "./TextInput";

const meta: Meta<typeof FormField> = {
  title: "UI/FormField",
  component: FormField,
  args: {
    id: "fullName",
    label: "Full name",
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: (args) => (
    <FormField {...args}>
      <TextInput id="field-fullName" type="text" />
    </FormField>
  ),
};

export const Required: Story = {
  args: { required: true },
  render: (args) => (
    <FormField {...args}>
      <TextInput id="field-fullName" type="text" />
    </FormField>
  ),
};

export const WithError: Story = {
  args: { required: true, error: "Enter your full name." },
  render: (args) => (
    <FormField {...args}>
      <TextInput id="field-fullName" type="text" invalid />
    </FormField>
  ),
};
