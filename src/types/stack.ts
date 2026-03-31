export interface Skill {
  name: string;
  level: number; // 0-100
  desc?: string; // Optional description
}

export interface StackCategory {
  _id?: string;
  id: string; // e.g. "01"
  title: string; // e.g. "Frontend"
  icon: string; // lucide icon name
  skills: Skill[];
}
