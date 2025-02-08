import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";

export type skill = {
  number: number;
  icon: IconDefinition;
  description: string;
};

export type repository = {
  number: number;
  url: string;
  name: string;
  description: string;
};
