import React, { useState } from 'react';
import {
  getForumPosts,
  addForumPost,
  toggleLikePost,
  addForumReply,
  toggleLikeReply,
  ForumPost,
} from '@/data/forum';
import { FishingSpot } from '@/data/spots';
import {
  MessageSquare,
  ThumbsUp,
  Image as ImageIcon,
  Send,
  PlusCircle,
  Search,
  MapPin,
  Sparkles,
  Flame,
  Clock,
  User,
  X,
  Upload,
  CheckCircle2,
  Share2,
} from 'lucide-react';

interface CommunityForumProps {
  spots: FishingSpot[];
  onSelectSpot?: (spot: FishingSpot) => void;
  onClose?: () => void;
}

const PRESET_PHOTOS = [
  { name: 'Bass Catch', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Lake Sunset', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tackle Gear', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },
  { name: 'River Fly Fishing', url: 'https://images.unsplash.com/photo-1516570161787-2fd96222ed70?auto=format&fit=crop&w=800&q=80' },
];

export const CommunityForum: React.FC<CommunityForumProps> = ({ spots, onSelectSpot }) => {
  const [posts, setPosts] = useState<ForumPost[]>(getForumPosts());
  const [activeTab, setActiveTab] = useState<'feed' | 'create'>('feed');
  const [filterSort, setFilterSort] = useState<'trending' | 'latest'>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  // New Post Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [selectedSpotName, setSelectedSpotName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Reply Input State per Post
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [replyAuthorMap, setReplyAuthorMap] = useState<Record<string, string>>({});

  // Handle Image File Upload (convert to Base64 data URL)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageUrl(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const created = addForumPost({
      title: newTitle.trim(),
      content: newContent.trim(),
      author: newAuthor.trim() || 'Angler',
      spotName: selectedSpotName || undefined,
      imageUrl: imageUrl || undefined,
    });

    setPosts(getForumPosts());
    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
    setSelectedSpotName('');
    setImageUrl('');
    setImagePreview(null);
    setActiveTab('feed');
    setExpandedPostId(created.id);
  };

  const handleLikePost = (postId: string) => {
    const updated = toggleLikePost(postId);
    setPosts(updated);
  };

  const handleAddReply = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const content = replyTextMap[postId] || '';
    const author = replyAuthorMap[postId] || '';
    if (!content.trim()) return;

    const updated = addForumReply(postId, author, content);
    setPosts(updated);
    setReplyTextMap((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleLikeReply = (postId: string, replyId: string) => {
    const updated = toggleLikeReply(postId, replyId);
    setPosts(updated);
  };

  // Filter & Sort Posts
  const filteredPosts = posts
    .filter((p) => {
      const query = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        (p.spotName && p.spotName.toLowerCase().includes(query)) ||
        p.author.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (filterSort === 'trending') {
        return b.likes + b.replies.length * 2 - (a.likes + a.replies.length * 2);
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <div className="p-4 pt-12 flex flex-col h-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-border/60">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 shadow-md">
              <MessageSquare className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                <span>Angler Q&A Forum</span>
                <span className="text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                  Reddit-Style
                </span>
              </h2>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Ask questions, share photos, give feedback, and swap gear advice with fellow anglers.
        </p>
      </div>

      {/* Tabs & Filter Bar */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-1 bg-secondary/40 p-1 rounded-xl border border-border/50">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'feed'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Feed ({posts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'create'
                ? 'bg-cyan-500 text-slate-950 shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Ask Question</span>
          </button>
        </div>

        {activeTab === 'feed' && (
          <div className="flex items-center gap-1 bg-secondary/30 p-1 rounded-lg border border-border/40 text-[11px]">
            <button
              onClick={() => setFilterSort('trending')}
              className={`px-2 py-1 rounded-md font-bold transition-all ${
                filterSort === 'trending' ? 'bg-cyan-500/20 text-cyan-400' : 'text-muted-foreground'
              }`}
            >
              Hot
            </button>
            <button
              onClick={() => setFilterSort('latest')}
              className={`px-2 py-1 rounded-md font-bold transition-all ${
                filterSort === 'latest' ? 'bg-cyan-500/20 text-cyan-400' : 'text-muted-foreground'
              }`}
            >
              New
            </button>
          </div>
        )}
      </div>

      {/* Tab 1: FEED */}
      {activeTab === 'feed' && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Search Input */}
          <div className="relative mb-3 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions, spots, or anglers..."
              className="w-full bg-input/40 border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Posts List */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-10 px-4 bg-secondary/20 rounded-2xl border border-dashed border-border">
                <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-sm font-semibold text-foreground">No questions found</p>
                <p className="text-xs text-muted-foreground mt-1 mb-4">
                  Be the first to ask the community a question!
                </p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-cyan-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  Ask Question Now
                </button>
              </div>
            ) : (
              filteredPosts.map((post) => {
                const isExpanded = expandedPostId === post.id;
                const spotMatch = spots.find((s) => s.name === post.spotName);

                return (
                  <div
                    key={post.id}
                    className="bg-card/90 border border-border/80 rounded-2xl overflow-hidden shadow-sm hover:border-cyan-500/40 transition-all duration-200"
                  >
                    <div className="p-3.5">
                      {/* Post Author Header */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-xs">
                            {post.author.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-foreground block leading-tight">
                              u/{post.author}
                            </span>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {post.spotName && (
                          <button
                            onClick={() => spotMatch && onSelectSpot && onSelectSpot(spotMatch)}
                            className="text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 hover:bg-cyan-500/20 transition-colors"
                          >
                            <MapPin className="w-2.5 h-2.5" />
                            <span className="truncate max-w-[120px]">{post.spotName}</span>
                          </button>
                        )}
                      </div>

                      {/* Post Title */}
                      <h3
                        onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                        className="text-sm font-bold text-foreground leading-snug cursor-pointer hover:text-cyan-400 transition-colors mb-1.5"
                      >
                        {post.title}
                      </h3>

                      {/* Post Body */}
                      <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line mb-3">
                        {post.content}
                      </p>

                      {/* Attached Image */}
                      {post.imageUrl && (
                        <div className="mb-3 rounded-xl overflow-hidden border border-border/60 bg-black/40 max-h-56">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Action Bar (Upvote, Replies, Share) */}
                      <div className="flex items-center justify-between border-t border-border/40 pt-2.5 mt-1 text-xs">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleLikePost(post.id)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                              post.likedByUser
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                                : 'bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground'
                            }`}
                          >
                            <ThumbsUp className={`w-3.5 h-3.5 ${post.likedByUser ? 'fill-rose-400' : ''}`} />
                            <span>{post.likes}</span>
                          </button>

                          <button
                            onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                              isExpanded
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                : 'bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground'
                            }`}
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{post.replies.length} Replies</span>
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(window.location.href);
                              alert('Link copied to clipboard!');
                            }
                          }}
                          className="text-muted-foreground hover:text-foreground p-1"
                          title="Share link"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Thread / Replies Section */}
                    {isExpanded && (
                      <div className="bg-secondary/20 border-t border-border/60 p-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                          <span>Feedback & Answers ({post.replies.length})</span>
                        </div>

                        {/* Existing Replies List */}
                        {post.replies.length > 0 && (
                          <div className="space-y-2.5">
                            {post.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className="bg-card/90 p-2.5 rounded-xl border border-border/50 text-xs space-y-1"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                                    <User className="w-3 h-3 text-muted-foreground" />
                                    u/{reply.author}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-muted-foreground">
                                      {new Date(reply.date).toLocaleDateString()}
                                    </span>
                                    <button
                                      onClick={() => handleLikeReply(post.id, reply.id)}
                                      className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] ${
                                        reply.likedByUser
                                          ? 'bg-rose-500/20 text-rose-400'
                                          : 'text-muted-foreground hover:text-foreground'
                                      }`}
                                    >
                                      <ThumbsUp className="w-2.5 h-2.5" />
                                      <span>{reply.likes}</span>
                                    </button>
                                  </div>
                                </div>
                                <p className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-cyan-500/30">
                                  {reply.content}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply Form */}
                        <form
                          onSubmit={(e) => handleAddReply(post.id, e)}
                          className="space-y-2 pt-1 border-t border-border/40"
                        >
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Your Angler Handle (optional)"
                              value={replyAuthorMap[post.id] || ''}
                              onChange={(e) =>
                                setReplyAuthorMap((prev) => ({
                                  ...prev,
                                  [post.id]: e.target.value,
                                }))
                              }
                              className="bg-input/50 border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            />
                            <button
                              type="submit"
                              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg py-1.5 px-3 flex items-center justify-center gap-1 transition-colors"
                            >
                              <Send className="w-3 h-3 stroke-[2.5]" />
                              <span>Post Reply</span>
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            required
                            placeholder="Add your feedback, gear tip, or answer..."
                            value={replyTextMap[post.id] || ''}
                            onChange={(e) =>
                              setReplyTextMap((prev) => ({
                                ...prev,
                                [post.id]: e.target.value,
                              }))
                            }
                            className="w-full bg-input/50 border border-border rounded-lg p-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
                          />
                        </form>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Tab 2: CREATE QUESTION */}
      {activeTab === 'create' && (
        <form onSubmit={handleCreatePost} className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1">
          {/* Question Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span>Question / Title</span>
              <span className="text-cyan-400 text-[10px] normal-case">*Required</span>
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. What lures are working on Lake Anna this week?"
              className="w-full bg-input/50 border border-border rounded-xl px-3.5 py-2.5 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Details / Body */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span>Details & Context</span>
              <span className="text-cyan-400 text-[10px] normal-case">*Required</span>
            </label>
            <textarea
              rows={4}
              required
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Provide context on water conditions, depth, targeted species, or questions for other anglers..."
              className="w-full bg-input/50 border border-border rounded-xl p-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            />
          </div>

          {/* Your Handle & Linked Spot */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Your Angler Handle
              </label>
              <input
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="e.g. BassMaster_99"
                className="w-full bg-input/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Tag Water Body / Spot
              </label>
              <select
                value={selectedSpotName}
                onChange={(e) => setSelectedSpotName(e.target.value)}
                className="w-full bg-input/50 border border-border rounded-lg px-2.5 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500 truncate"
              >
                <option value="">-- Optional Spot --</option>
                {spots.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload / Preset Photo Section */}
          <div className="space-y-2 pt-2 border-t border-border/40">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Attach Image (Upload or Pick Preset)</span>
            </label>

            {/* Custom File Upload */}
            <div className="flex items-center gap-2">
              <label className="flex-1 border-2 border-dashed border-border/80 hover:border-cyan-500/60 bg-input/20 rounded-xl p-3 text-center cursor-pointer transition-colors">
                <Upload className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <span className="text-xs font-bold text-foreground block">Choose Local Image</span>
                <span className="text-[10px] text-muted-foreground">PNG, JPG, WEBP (Instant preview)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Photo Presets */}
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground font-semibold">Or Pick Sample Angler Photo:</span>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_PHOTOS.map((p) => {
                  const isSelected = imageUrl === p.url;
                  return (
                    <button
                      type="button"
                      key={p.name}
                      onClick={() => {
                        setImageUrl(p.url);
                        setImagePreview(p.url);
                      }}
                      className={`relative h-14 rounded-xl overflow-hidden border transition-all text-left group ${
                        isSelected ? 'border-cyan-500 ring-2 ring-cyan-500/50' : 'border-border/60 hover:border-cyan-500/40'
                      }`}
                    >
                      <img src={p.url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-slate-950/50 p-1.5 flex items-end justify-between">
                        <span className="text-[10px] font-bold text-white shadow-xs">{p.name}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/30 shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Image Preview */}
            {imagePreview && (
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/50 max-h-40">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setImageUrl('');
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 bg-slate-950/80 text-white p-1 rounded-full hover:bg-rose-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Post Question to Community</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
