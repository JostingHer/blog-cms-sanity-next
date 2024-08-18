
export type Markdown = string;

export type Post = {
    title: string
    slug: { current: string };
    publishedAt: string;
    excerpt: string;
    body: any;
    bodyMD: Markdown;
    tags: Array<Tag>;
    _id: string;
    headings?: Array<HTMLHeadElement | string>;
    comments?: Array<Comment>;
  }
  
  export type Tag = {
    name: string;
    slug: { current: string };
    _id: string;
    postCount?: number
  }
  
  export type Comment = {
    name: string;
    comment: string;
    _createdAt: string;
    _id: string;
  }