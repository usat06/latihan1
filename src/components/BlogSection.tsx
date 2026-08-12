import React, { useState } from 'react';
import { BlogArticle } from '../types';
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles, Tag, Search, Heart } from 'lucide-react';

interface BlogSectionProps {
  articles: BlogArticle[];
  onSelectArticle: (article: BlogArticle) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  articles,
  onSelectArticle
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [likes, setLikes] = useState<{ [id: string]: number }>({});
  const [likedArticles, setLikedArticles] = useState<{ [id: string]: boolean }>({});

  const handleLike = (e: React.MouseEvent, articleId: string) => {
    e.stopPropagation();
    const isLiked = likedArticles[articleId];
    setLikedArticles((prev) => ({ ...prev, [articleId]: !isLiked }));
    setLikes((prev) => ({
      ...prev,
      [articleId]: (prev[articleId] || 0) + (isLiked ? -1 : 1)
    }));
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="blog" className="py-20 bg-white border-b-2 border-black text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-mono font-bold tracking-widest uppercase mb-3 geo-shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-white" />
            <span>06 / BLOG SINGKAT & ARTIKEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
            Tulisan, Ringkasan Pembelajaran & Review Jurnal
          </h2>
          <p className="mt-4 text-neutral-700 text-sm sm:text-base font-medium">
            Menulis adalah cara terbaik untuk memperdalam pemahaman. Berikut artikel ringan yang saya tulis mengenai pengalaman coding, eksplorasi UI/UX, dan tren teknologi.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="w-4 h-4 text-black absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari judul artikel atau topik (UI/UX, React...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-mono font-bold bg-[#f4f4f2] border-2 border-black text-black placeholder:text-neutral-500 geo-shadow-sm focus:outline-none focus:bg-white"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => {
            const articleLikes = (likes[article.id] || 0) + 12; // base offset
            const isLiked = likedArticles[article.id];

            return (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group bg-[#f4f4f2] border-2 border-black geo-shadow geo-shadow-hover transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Article Cover Image */}
                  {article.coverImage && (
                    <div className="aspect-video overflow-hidden bg-neutral-200 border-b-2 border-black relative">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    {/* Meta date & read time */}
                    <div className="flex items-center justify-between text-xs font-mono font-bold uppercase text-black">
                      <span className="flex items-center gap-1 bg-white px-2 py-0.5 border border-black">
                        <Calendar className="w-3.5 h-3.5 text-black" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1 bg-white px-2 py-0.5 border border-black">
                        <Clock className="w-3.5 h-3.5 text-black" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-black text-black group-hover:underline transition-colors line-clamp-2 leading-snug uppercase">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-neutral-700 text-xs leading-relaxed line-clamp-3 font-medium">
                      {article.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {article.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-black text-[10px] font-mono font-bold text-black uppercase"
                        >
                          <Tag className="w-2.5 h-2.5 text-black" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Read More & Interactive Like */}
                <div className="p-4 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-bold text-black bg-white uppercase">
                  <span className="group-hover:underline flex items-center gap-1">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleLike(e, article.id)}
                    className={`px-2 py-1 text-[11px] font-mono font-bold flex items-center gap-1 border transition-all ${
                      isLiked
                        ? 'bg-rose-600 text-white border-rose-700 scale-105'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-black border-black'
                    }`}
                    title="Apresiasi Artikel Ini"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
                    <span>{articleLikes}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
