import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Heading, Typography } from "./Typography";

const meta: Meta<typeof Heading> = {
  title: "UI/Typography",
};

export default meta;

export const HeadingLarge: StoryObj<typeof Heading> = {
  render: () => <Heading size="lg">Design your workspace</Heading>,
};

export const HeadingMedium: StoryObj<typeof Heading> = {
  render: () => <Heading size="md">Design your workspace</Heading>,
};

export const HeadingSmall: StoryObj<typeof Heading> = {
  render: () => <Heading size="sm">Design your workspace</Heading>,
};

export const BodyText: StoryObj<typeof Typography> = {
  render: () => <Typography size="md">We confirm dates and delivery with you by WhatsApp or email.</Typography>,
};

export const BodyTextMuted: StoryObj<typeof Typography> = {
  render: () => (
    <Typography size="sm" muted>
      Rental requests you&apos;ve submitted from this browser.
    </Typography>
  ),
};
