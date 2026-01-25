import { SharedFeature } from "@/shared-features/shared-feature";
import { SubFeature } from "./sub-feature";

export const FeatureB = () => {
  return (
    <div>
      FeatureB
      <SharedFeature />
      <SubFeature />
    </div>
  );
};
