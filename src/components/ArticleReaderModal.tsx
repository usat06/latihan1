import React from 'react';
import { BlogArticle } from '../types';
import { X, Calendar, Clock, Tag, Share2 } from 'lucide-react';

interface ArticleReaderModalProps {
  article: BlogArticle | null;
  onClose: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-2 border-black geo-shadow text-black p-6 sm:p-8 space-y-6">
        
        {/* Close button */}
        <button
          id="btn-close-article-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer border border-black"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Article Meta */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase text-black">
            <span className="flex items-center gap-1 bg-[#f4f4f2] px-2 py-0.5 border border-black">
              <Calendar className="w-3.5 h-3.5 text-black" />
              {article.date}
            </span>
            <span className="flex items-center gap-1 bg-[#f4f4f2] px-2 py-0.5 border border-black">
              <Clock className="w-3.5 h-3.5 text-black" />
              {article.readTime}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-black leading-tight uppercase">
            {article.title}
          </h2>
        </div>

        {/* Article Image */}
        {article.coverImage && (
          <div className="aspect-video w-full bg-neutral-200 border-2 border-black overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose max-w-none text-neutral-900 text-sm sm:text-base leading-relaxed space-y-4 font-medium bg-[#f4f4f2] border-2 border-black p-6 geo-shadow-sm">
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h3 key={idx} className="text-lg font-black text-black pt-2 border-b-2 border-black pb-1 uppercase">
                  {paragraph.replace('## ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h4 key={idx} className="text-base font-bold text-black pt-1 uppercase">
                  {paragraph.replace('### ', '')}
                </h4>
              );
            }
            if (paragraph.startsWith('* ')) {
              return (
                <ul key={idx} className="list-disc list-inside space-y-1 text-neutral-900 pl-2">
                  {paragraph.split('\n* ').map((item, iIdx) => (
                    <li key={iIdx}>{item.replace('* ', '')}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="whitespace-pre-line">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Article Tags */}
        <div className="pt-4 border-t-2 border-black flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-black mr-1">TOPIK:</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#f4f4f2] border border-black text-xs font-mono font-bold text-black uppercase"
              >
                <Tag className="w-3 h-3 text-black" />
                <span>{tag}</span>
              </span>
            ))}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase border border-black cursor-pointer geo-shadow-sm"
          >
            Selesai Membaca
          </button>
        </div>

      </div>
    </div>
  );
};
