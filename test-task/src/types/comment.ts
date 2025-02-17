export interface Comment {
  id: string;
  author: string;
  email: string;
  text: string;
  timestamp: Date;
  rating: number;
  isCollapsed: boolean;
}
