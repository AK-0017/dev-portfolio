export interface Communication {
  _id?: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  status: "new" | "read" | "archived";
}
