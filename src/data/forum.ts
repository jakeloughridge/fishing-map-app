export type ForumReply = {
  id: string;
  postId: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  likedByUser?: boolean;
};

export type ForumPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  spotName?: string;
  date: string;
  likes: number;
  likedByUser?: boolean;
  replies: ForumReply[];
};

const FORUM_STORAGE_KEY = 'fish_mapper_forum_v1';
const CLOUD_FORUM_URL = 'https://api.restful-api.dev/objects/ff8081819f7e10ae019f8743c8530ec4_forum';

const INITIAL_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    title: 'What rigs are producing for Lake Anna bass right now?',
    content: 'Heading out to Lake Anna near the marina this weekend! Are largemouth bass holding in 12–15ft timber or moving shallow near dock pilings? What colors and rigs are working best?',
    author: 'VirginiaAngler_Jake',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    spotName: 'Lake Anna',
    date: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    likes: 18,
    likedByUser: false,
    replies: [
      {
        id: 'rep-1',
        postId: 'post-1',
        author: 'Capn_Dave',
        content: 'Texas-rigged green pumpkin Senkos (3/8oz bullet weight) around 10ft dock posts near Pigeon Creek mouth! Dead-stick on the drop — bites are subtle taps.',
        date: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        likes: 6,
      },
      {
        id: 'rep-2',
        postId: 'post-1',
        author: 'ShadHunter_99',
        content: 'White/chartreuse 1/2oz spinnerbaits slow-rolled over submerged point ledges at first light. Hooked a 5lb female yesterday!',
        date: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
        likes: 4,
      },
    ],
  },
  {
    id: 'post-2',
    title: 'Salmon River Pulaski run — gear advice for first-timers?',
    content: 'Planning my first autumn trip up to Pulaski, NY for King Salmon on the Salmon River. Should I bring a 9wt fly rod or heavy spinning gear with egg loops? What water flow is ideal?',
    author: 'GreatLakesFisher',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    spotName: 'Salmon River — Pulaski & Douglaston Run, NY',
    date: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    likes: 24,
    likedByUser: false,
    replies: [
      {
        id: 'rep-3',
        postId: 'post-2',
        author: 'SteelheadSteve',
        content: 'Bring both if you can! 9wt fly rod with 15lb tippet for Douglaston run, or heavy spinning setup with 1/2oz slip float and cured roe cluster in deep gravel holes.',
        date: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
        likes: 9,
      },
    ],
  },
  {
    id: 'post-3',
    title: 'Montauk Point Tautog & Black Sea Bass — Green crabs vs Fiddler crabs?',
    content: 'Setting up for tog (blackfish) and sea bass off the Montauk rock ledges. Do you guys prefer half a green crab on a 1.5oz jig or small live fiddlers when fishing structure?',
    author: 'SaltwaterSam',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    spotName: 'Montauk Point — The Surfcasting Capital, NY',
    date: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    likes: 15,
    likedByUser: false,
    replies: [
      {
        id: 'rep-4',
        postId: 'post-3',
        author: 'MontaukStriper',
        content: 'Half a green crab on a 1.5oz flat-bottom jig! Hold rod steady and set hook hard on the first thump — zero slack or toggs dive straight into rock crevices.',
        date: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
        likes: 7,
      },
    ],
  },
];

export const getForumPosts = (): ForumPost[] => {
  if (typeof window === 'undefined') return INITIAL_POSTS;
  const stored = localStorage.getItem(FORUM_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as ForumPost[];
    } catch {
      return INITIAL_POSTS;
    }
  }
  localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
  return INITIAL_POSTS;
};

export const saveForumPosts = (posts: ForumPost[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(posts));
};

export const addForumPost = (post: Omit<ForumPost, 'id' | 'date' | 'likes' | 'replies'>): ForumPost => {
  const current = getForumPosts();
  const newPost: ForumPost = {
    ...post,
    id: `post-${Date.now()}`,
    date: new Date().toISOString(),
    likes: 1,
    likedByUser: true,
    replies: [],
  };
  const updated = [newPost, ...current];
  saveForumPosts(updated);
  return newPost;
};

export const toggleLikePost = (postId: string): ForumPost[] => {
  const current = getForumPosts();
  const updated = current.map((p) => {
    if (p.id === postId) {
      const isLiked = !p.likedByUser;
      return {
        ...p,
        likedByUser: isLiked,
        likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
      };
    }
    return p;
  });
  saveForumPosts(updated);
  return updated;
};

export const addForumReply = (postId: string, author: string, content: string): ForumPost[] => {
  const current = getForumPosts();
  const updated = current.map((p) => {
    if (p.id === postId) {
      const newReply: ForumReply = {
        id: `rep-${Date.now()}`,
        postId,
        author: author.trim() || 'Angler',
        content: content.trim(),
        date: new Date().toISOString(),
        likes: 1,
        likedByUser: true,
      };
      return {
        ...p,
        replies: [...p.replies, newReply],
      };
    }
    return p;
  });
  saveForumPosts(updated);
  return updated;
};

export const toggleLikeReply = (postId: string, replyId: string): ForumPost[] => {
  const current = getForumPosts();
  const updated = current.map((p) => {
    if (p.id === postId) {
      const updatedReplies = p.replies.map((r) => {
        if (r.id === replyId) {
          const isLiked = !r.likedByUser;
          return {
            ...r,
            likedByUser: isLiked,
            likes: isLiked ? r.likes + 1 : Math.max(0, r.likes - 1),
          };
        }
        return r;
      });
      return { ...p, replies: updatedReplies };
    }
    return p;
  });
  saveForumPosts(updated);
  return updated;
};
