export type Comment = { id: string; avatar: string; message: string; name: string };

export type Picture = {
  id: string;
  url: string;
  likes: string;
  comments: Comment[];
  description: string;
  hashtags: string[];
};
