import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { TileSection } from "./TileSection";
import { SelectTile } from "./Tile";

const meta: Meta<typeof TileSection> = {
  title: "UI/TileSection",
  component: TileSection,
  args: {
    title: "Choose a Desk",
  },
};

export default meta;
type Story = StoryObj<typeof TileSection>;

export const Default: Story = {
  render: (args) => (
    <TileSection {...args}>
      <SelectTile
        item={{ id: "desk-std", name: "Standing Desk Pro", spec: "120 x 70 cm", priceK: 450, art: "desk-std" }}
        selected
        onSelect={fn()}
      />
      <SelectTile
        item={{ id: "desk-classic", name: "Classic Desk", spec: "140 x 70 cm", priceK: 300, art: "desk-classic" }}
        selected={false}
        onSelect={fn()}
      />
    </TileSection>
  ),
};

export const WithSubtitle: Story = {
  args: { subtitle: "Up to 3 monitors, or 1 ultrawide." },
  render: (args) => (
    <TileSection {...args}>
      <SelectTile
        item={{ id: "desk-std", name: "Standing Desk Pro", spec: "120 x 70 cm", priceK: 450, art: "desk-std" }}
        selected
        onSelect={fn()}
      />
    </TileSection>
  ),
};
