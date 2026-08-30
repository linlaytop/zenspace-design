import { motion } from "motion/react";
import { BookOpen, Calendar, Tag, Clock, ArrowLeft } from "lucide-react";
import { TECH_COLUMN_ARTICLES, type TechArticle } from "../data/techColumnArticles";

interface TechColumnModalProps {
  onClose: () => void;
  onArticleClick: (index: number) => void;
}

export default function TechColumnModal({ onClose, onArticleClick }: TechColumnModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="relative bg-[#1a1310] border border-purple-500/30 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 sm:p-6 border-b border-neutral-800/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-100">技术专栏</h2>
            <p className="text-[10px] text-neutral-500 font-mono">TECHNICAL INSIGHTS & INDUSTRY TRENDS</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-neutral-800/60 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
        <div className="flex flex-col gap-4">
          <p className="text-xs text-neutral-400 leading-relaxed">
            寺庙佛教设计技术团队分享寺庙设计专业知识，包括寺庙建筑、寺庙室内、寺庙软装、寺庙景观、寺庙灯光等领域的技术指南与行业趋势分析。
          </p>

          {/* Articles List - 改为竖排布局，类似微信公众号 */}
          <div className="flex flex-col gap-6 mt-4">
            {TECH_COLUMN_ARTICLES.map((article: TechArticle, idx: number) => (
              <div
                key={article.id}
                onClick={() => onArticleClick(idx)}
                className="group cursor-pointer transition-all duration-300"
              >
                {/* 文章卡片 - 微信公众号风格 */}
                <div className="flex flex-col gap-3 p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                  {/* 标题 */}
                  <h3 className="text-base font-bold text-neutral-100 group-hover:text-purple-400 transition-colors">
                    {article.title}
                  </h3>

                  {/* 封面图 + 摘要 */}
                  <div className="flex gap-4">
                    {/* 封面图 */}
                    <div className="w-32 h-24 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* 摘要和元信息 */}
                    <div className="flex-1 flex flex-col justify-between">
                      <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                        {article.summary}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          {article.tags.slice(0, 2).map((tag: string, i: number) => (
                            <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-neutral-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {article.publishDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-800/60 flex items-center justify-between">
        <p className="text-[10px] text-neutral-500 font-mono">
          {TECH_COLUMN_ARTICLES.length} 篇技术文章 · 持续更新中
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-medium cursor-pointer transition-colors"
        >
          关闭
        </button>
      </div>
    </motion.div>
  );
}
