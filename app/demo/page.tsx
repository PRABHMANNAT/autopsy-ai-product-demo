import type { Metadata } from "next";
import { DemoFlow } from "@/components/playground/demo-flow";

export const metadata: Metadata = {
  title: "60-second validation demo",
  description:
    "Run a simulated startup autopsy, product audit and human-validation campaign.",
};

export default function DemoPage() {
  return <DemoFlow />;
}
