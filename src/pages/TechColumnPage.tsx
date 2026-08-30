import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Clock, Calendar, ArrowLeft, Search, Tag, ChevronRight, Zap, Landmark, Cpu, FileText } from 'lucide-react';
import { TECH_COLUMN_ARTICLES, TechArticle } from '../data/techColumnArticles';
import Seo from '../components/Seo';

// 分类数据
const categories = [
  { id: 'all', name: '全部文章', icon: BookOpen, active: true },
  { id: 'design', name: '设计指南', icon: Landmark },
  { id: 'trend', name: '行业趋势', icon: Zap },
  { id: 'tech', name: '技术手册', icon: Cpu },
  { id: 'case', name: '案例解析', icon: FileText },
];

export default function TechColumnPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 根据分类和搜索过滤文章
  const filteredArticles = TECH_COLUMN_ARTICLES.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.tags.some(tag => {
      if (activeCategory === 'design') return tag.includes('设计') || tag.includes('指南');
      if (activeCategory === 'trend') return tag.includes('趋势') || tag.includes('策划');
      if (activeCategory === 'tech') return tag.includes('协议') || tag.includes('技术') || tag.includes('DMX');
      if (activeCategory === 'case') return tag.includes('案例') || tag.includes('项目');
      return false;
    });
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleArticleClick = (articleId: string) => {
    navigate(`/tech/${articleId}`);
  };

  // 获取文章标签颜色
  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      '古建照明': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      '设计指南': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      '文物保护': 'bg-red-500/10 text-red-400 border-red-500/20',
      '文旅夜游': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      '行业趋势': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      '策划指南': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      'DMX512': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      '协议': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      '技术手册': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    };
    return colors[tag] || 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20';
  };

  // 获取文章角标
  const getBadge = (article: TechArticle) => {
    if (article.tags.includes('指南')) return { text: 'CORE', className: 'bg-blue-500 text-white' };
    if (article.tags.includes('趋势')) return { text: 'HOT', className: 'bg-red-500 text-white' };
    if (article.tags.includes('协议')) return { text: 'TECH', className: 'bg-orange-500 text-white' };
    return null;
  };

  return (
    <>
      <Seo
        title="技术专栏-寺庙设计技术指南"
        description="寺庙佛教设计技术专栏，分享寺庙建筑形制、寺庙室内设计、寺庙软装陈设、寺庙景观营造、寺庙灯光设计、古建修缮工艺等专业文章。"
        keywords="寺庙设计技术,汉传佛教建筑设计,藏传寺庙设计,道教宫观设计,寺庙室内设计,寺庙景观设计,寺庙灯光设计,寺庙修缮技术,古建营造技术,寺院规划设计"
        path="/tech"
        breadcrumb={[{ name: '技术专栏', path: '/tech' }]}
      />
    <div className="min-h-screen bg-[#120e0b] text-neutral-100">
      {/* 顶部导航栏 - 与首页共享同一个 header，这里是页面内的面包屑 */}
      <div className="border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>返回首页</span>
            </button>
            <div className="w-px h-5 bg-neutral-800" />
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <h1 className="text-lg font-bold">技术专栏</h1>
              <span className="text-[10px] font-mono text-neutral-500 tracking-wider mt-0.5">
                TECHNICAL COLUMN
              </span>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-purple-500/50 text-sm text-neutral-200 placeholder-neutral-600 outline-none w-64 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 主内容区：左侧导航 + 右侧卡片网格（参考 Evai 风格） */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
        
        {/* ===== 左侧分类导航 ===== */}
        <aside className="w-56 shrink-0 hidden md:block">
          <div className="sticky top-24 bg-neutral-950/60 border border-neutral-850 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-900 bg-neutral-900/40">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5 text-purple-400" />
                文章分类
              </div>
            </div>
            
            <nav className="p-2 flex flex-col gap-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer w-full text-left ${
                      isActive
                        ? "bg-purple-500/15 border border-purple-500/30 text-purple-300 shadow-sm"
                        : "hover:bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-transparent"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : ''}`} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* 分类统计 */}
            <div className="mx-4 mb-4 p-3 rounded-xl bg-neutral-900/30 border border-neutral-800/50">
              <div className="text-[10px] font-mono text-neutral-500 space-y-1">
                <div className="flex justify-between">
                  <span>总文章数</span>
                  <span className="text-purple-400 font-bold">{TECH_COLUMN_ARTICLES.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>当前筛选</span>
                  <span className="text-neutral-300">{filteredArticles.length} 篇</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ===== 右侧文章卡片网格（参考 Evai 卡片风格）===== */}
        <main className="flex-1 min-w-0">
          {/* 移动端搜索框 + 分类选择 */}
          <div className="md:hidden flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-purple-500/50 text-sm outline-none"
              />
            </div>
          </div>

          {/* 移动端分类横向滚动 */}
          <div className="md:hidden flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-purple-500/20 border border-purple-500/30 text-purple-300"
                      : "bg-neutral-900 border border-neutral-800 text-neutral-400"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* 文章标题行 */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-5 rounded-full bg-purple-500" />
            <span className="text-sm font-mono text-neutral-400 tracking-wide">
              {categories.find(c => c.id === activeCategory)?.name || '全部文章'}
            </span>
            <span className="text-[10px] font-mono text-neutral-600">/ MOST USED</span>
          </div>

          {/* 文章卡片网格 */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredArticles.map((article, idx) => {
                const badge = getBadge(article);
                return (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    onClick={() => handleArticleClick(article.id)}
                    className="group cursor-pointer bg-neutral-950/60 border border-neutral-850 hover:border-purple-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-neutral-950/80 hover:shadow-lg hover:shadow-purple-500/5"
                  >
                    {/* 封面图 */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* 角标 */}
                      {badge && (
                        <div className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold ${badge.className}`}>
                          {badge.text}
                        </div>
                      )}
                      {/* Before/After 标签（装饰性） */}
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between pointer-events-none">
                        <span className="text-[9px] font-mono text-white/60 bg-black/30 px-1.5 py-0.5 rounded backdrop-blur-sm">
                          Article
                        </span>
                      </div>
                      {/* 悬停遮罩 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* 悬停箭头 */}
                      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-purple-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* 内容区域 */}
                    <div className="p-4 flex flex-col gap-2">
                      {/* 标题 */}
                      <h3 className="text-sm font-bold text-neutral-100 group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>

                      {/* 摘要 */}
                      <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                        {article.summary}
                      </p>

                      {/* 底部信息：标签 + 元信息 */}
                      <div className="flex items-center justify-between pt-2 mt-auto">
                        <div className="flex gap-1.5 flex-wrap">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className={`text-[9px] px-1.5 py-0.5 rounded-md border ${getTagColor(tag)}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-[9px] text-neutral-600 shrink-0">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* 空状态 */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <BookOpen className="w-16 h-16 text-neutral-800 mb-4" />
              <p className="text-neutral-500 text-sm">没有找到相关文章</p>
              <p className="text-neutral-600 text-[11px] mt-1">试试其他关键词或分类</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-4 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-neutral-400 hover:text-white hover:border-purple-500/30 transition-all cursor-pointer"
              >
                清除筛选条件
              </button>
            </motion.div>
          )}
        </main>
      </div>
    </div>
    </>
  );
}
