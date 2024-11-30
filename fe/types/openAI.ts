export type Role = "user" | "bot";

export type ChatMode = "simpleChat" | "textReview";

export interface ChatBaloonProps {
  role: Role;
  message: string;
}