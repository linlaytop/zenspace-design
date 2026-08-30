import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, Tag, ChevronRight, BookOpen } from 'lucide-react';
import { TECH_COLUMN_ARTICLES } from '../data/techColumnArticles';
import Seo from '../components/Seo';

export default function TechArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 根据 ID 查找文章
  const article = TECH_COLUMN_ARTICLES.find(a => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#120e0b] text-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-neutral-800 mx-auto mb-4" />
          <p className="text-neutral-500">文章未找到</p>
          <button
            onClick={() => navigate('/tech')}
            className="mt-4 px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-sm text-purple-400 hover:bg-purple-500/30 transition-all cursor-pointer"
          >
            返回技术专栏
          </button>
        </div>
      </div>
    );
  }

  // 获取标签颜色
  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      '古建照明': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      '设计指南': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      '文物保护': 'bg-red-500/10 text-red-400 border-red-500/30',
      '文旅夜游': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      '行业趋势': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      '策划指南': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      'DMX512': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      '协议': 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    };
    return colors[tag] || 'bg-neutral-500/10 text-neutral-400 border-neutral-500/30';
  };

  return (
    <>
      <Seo
        title={`${article.title}-灯光设计技术文章`}
        description={article.summary || `${article.title} - 禅境设计技术专栏，分享户外灯光设计、夜景照明、古建照明等专业技术知识。`}
        keywords={`${(article.tags || []).join(',')},灯光设计技术,${article.title},户外照明,夜景照明设计`}
        path={`/tech/${id}`}
        type="article"
        breadcrumb={[{ name: '技术专栏', path: '/tech' }, { name: article.title, path: `/tech/${id}` }]}
      />
    <div className="min-h-screen bg-[#120e0b] text-neutral-100">
      
      {/* 顶部导航栏 */}
      <div className="border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/tech')}
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回技术专栏</span>
          </button>

          <div className="flex items-center gap-3">
            {/* 分享按钮区域 - 可扩展 */}
            <span className="text-[10px] font-mono text-neutral-600">TECH COLUMN ARTICLE</span>
          </div>
        </div>
      </div>

      {/* 文章主体 - 微信公众号风格 */}
      <article className="max-w-3xl mx-auto px-6 py-8">
        
        {/* 文章头部 */}
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          {/* 标签区 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] px-2.5 py-1 rounded-full border ${getTagColor(tag)} font-medium`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 标题 */}
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-100 leading-tight mb-5">
            {article.title}
          </h1>

          {/* 元信息行 */}
          <div className="flex items-center gap-5 text-xs text-neutral-500 pb-5 border-b border-neutral-900">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time>{article.publishDate}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
            {article.author && (
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="text-purple-400">{article.author}</span>
              </div>
            )}
          </div>
        </motion.header>

        {/* 封面大图 */}
        {article.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8 rounded-2xl overflow-hidden border border-neutral-800"
          >
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full max-h-[450px] object-cover"
            />
          </motion.div>
        )}

        {/* 文章正文 - 结构化渲染（图文混排） */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="prose-custom"
        >
          {article.content.map((block, i) => {
            switch (block.type) {
              case 'heading':
                if (block.level === 2) {
                  return (
                    <h2 key={i} className="text-xl font-bold text-white mt-10 mb-4 pb-3 border-b border-purple-500/20 flex items-center gap-2">
                      <div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-purple-600" />
                      {block.content}
                    </h2>
                  );
                } else if (block.level === 3) {
                  return (
                    <h3 key={i} className="text-lg font-semibold text-neutral-200 mt-7 mb-3 pl-3 border-l-2 border-purple-500/40">
                      {block.content}
                    </h3>
                  );
                }
                return (
                  <h4 key={i} className="text-base font-medium text-neutral-300 mt-5 mb-2">
                    {block.content}
                  </h4>
                );

              case 'text':
                return (
                  <p
                    key={i}
                    className="text-[14px] leading-relaxed text-neutral-300 mb-5"
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                );

              case 'image':
                return (
                  <figure key={i} className="my-8 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950/40">
                    <img
                      src={block.imageUrl}
                      alt={block.content}
                      className="w-full"
                      loading="lazy"
                    />
                    {block.imageCaption && (
                      <figcaption className="text-center text-[11px] text-neutral-500 py-3 px-4 font-mono border-t border-neutral-900 bg-neutral-950/60">
                        {block.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                );

              case 'list':
                return (
                  <div key={i} className="mb-5 pl-4">
                    {block.content.split('\n').map((item, j) => (
                      <div key={j} className="flex items-start gap-2.5 mb-2 last:mb-0">
                        <ChevronRight className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                        <span className="text-[14px] text-neutral-300 leading-relaxed whitespace-pre-wrap">{item}</span>
                      </div>
                    ))}
                  </div>
                );

              case 'quote':
                return (
                  <blockquote
                    key={i}
                    className="my-7 border-l-4 border-purple-500/50 pl-5 pr-4 py-4 rounded-r-xl bg-gradient-to-r from-purple-500/5 to-transparent"
                  >
                    <p className="text-[14px] text-neutral-200 italic leading-relaxed">"{block.content}"</p>
                  </blockquote>
                );

              default:
                return null;
            }
          })}
        </motion.div>

        {/* 文章底部：标签 + 导航 */}
        <footer className="mt-12 pt-6 border-t border-neutral-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-purple-400" />
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-[10px] px-2 py-1 rounded-full border ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <button
              onClick={() => navigate('/tech')}
              className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              查看更多文章
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      </article>
    </div>
    </>
  );
}
