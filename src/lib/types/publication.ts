export type Comment = { id: string; avatar: string; message: string; name: string; likes?: string; isLiked: boolean };

export type Publication = {
  id: string;
  url: string;
  likes: string;
  comments: Comment[];
  description: string;
  hashtags: string[];
  isLiked: boolean;
};
