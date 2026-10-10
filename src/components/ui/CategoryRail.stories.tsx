import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Decorator } from "@storybook/react";
import { CategoryRail } from "./CategoryRail";
import { useWorkspace, type Step, type Section } from "@/store/workspace";

const meta: Meta<typeof CategoryRail> = {
  title: "UI/CategoryRail",
  component: CategoryRail,
};

export default meta;
type Story = StoryObj<typeof CategoryRail>;

function withWorkspaceState(step: Step, section: Section): Decorator {
  return (Story) => {
    useWorkspace.setState({ step, activeSection: section });
    return <Story />;
  };
}

export const SetupStep: Story = {
  decorators: [withWorkspaceState("setup", "section-desks")],
};

export const AccessoriesStep: Story = {
  decorators: [withWorkspaceState("accessories", "section-lighting")],
};
