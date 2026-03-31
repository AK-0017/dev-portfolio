export interface WritingEntry {
  _id?: string;
  id: string; // e.g., "01", "02"
  title: string;
  category: string;
  excerpt: string;
  content?: string; // Optional full text
  date: string;
  link?: string; // External link if applicable
}
