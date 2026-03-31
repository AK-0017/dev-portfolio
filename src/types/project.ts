export interface Project {
  _id?: string;
  id: string; // The "01", "02" number
  title: string;
  image?: string;
  description: string;
  role: string;
  mission: string;
  strategy: string;
  impact: string;
  techStack: string[];
  metrics?: {
    label: string;
    value: string;
    unit: string;
  }[];
  modules?: {
    title: string;
    description: string;
    badge: string;
  }[];
  links?: {
    live?: string;
    github?: string;
  };
}
