import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  ArrowRight,
  Clock,
  GitMerge,
  MapPin,
  ClipboardCheck,
  Wrench,
  Cpu,
  CheckCircle,
  Video,
} from "lucide-react";
import { WORKFLOW_CATEGORIES, WORKFLOW_STEPS } from "../components/HeaderModals";
import Seo from "../components/Seo";

// 图标映射
const stepIcons: Record<number, React.ReactNode> = {
  1: <GitMerge className="w-5 h-5 text-cyan-400" />,
  2: <Video className="w-5 h-5 text-cyan-400" />,
  3: <ClipboardCheck className="w-5 h-5 text-emerald-400" />,
  4: <Wrench className="w-5 h-5 text-purple-400" />,
  5: <Cpu className="w-5 h-5 text-amber-400" />,
  6: <CheckCircle className="w-5 h-5 text-rose-400" />,
};

export default function WorkflowPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 过滤步骤
  const filteredSteps = WORKFLOW_STEPS.filter((step) => {
    const matchCategory =
      selectedCategory === "all" ||
      (selectedCategory === "design" && step.step <= 3) ||
      (selectedCategory === "build" && step.step >= 4);
    const matchSearch =
      searchQuery === "" ||
      step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      step.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      <Seo
        title="服务流程-专业灯光设计实施步骤"
        description="寺庙佛教设计灯光设计服务流程详解：需求沟通、概念方案、深化设计、施工配合、竣工验收、运维支持。6步专业流程确保灯光设计项目高质量交付。"
        keywords="灯光设计流程,照明设计服务,灯光设计方案,灯光设计步骤,夜景照明施工,灯光设计报价,照明工程流程,灯光设计服务流程"
        path="/workflow"
        breadcrumb={[{ name: '服务流程', path: '/workflow' }]}
      />
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* ====== 页面头部 ====== */}
      <header className="relative overflow-hidden border-b border-cyan-500/20">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-[#0a0e1a] to-blue-900/10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] -translate-y-1/2 translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 面包屑 */}
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-cyan-400 transition-colors mb-6 cursor-pointer"
            >
              ← 返回首页
            </button>

            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                服务流程
              </span>
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl font-light leading-relaxed">
              寺庙佛教设计六步专业服务体系 —— 从现场勘测到验收交付，每一步都精益求精，确保每个项目都达到国际顶级标准。
            </p>
          </motion.div>
        </div>
      </header>

      {/* ====== 主体内容（左侧分类 + 右侧卡片） ====== */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧分类导航 */}
          <aside className="lg:w-56 shrink-0">
            <nav className="lg:sticky lg:top-28 space-y-1">
              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 mb-3 px-3">
                流程阶段
              </p>
              {WORKFLOW_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-cyan-500/15 text-cyan-400 border-l-2 border-cyan-400"
                      : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5 border-l-2 border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </span>
                  <span className="text-[10px] font-mono opacity-60 mt-0.5 block">
                    {cat.count}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          {/* 右侧卡片网格 */}
          <section className="flex-1 min-w-0">
            {/* 搜索栏 */}
            <div className="mb-6 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索服务步骤..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all"
              />
            </div>

            {/* 步骤卡片网格 */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={selectedCategory + searchQuery}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {filteredSteps.map((step, index) => (
                  <motion.article
                    key={step.step}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.06, duration: 0.35 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    onClick={() => navigate(`/workflow/${step.step}`)}
                    className="group cursor-pointer relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-40/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 overflow-hidden"
                  >
                    {/* 背景装饰 */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* 步骤编号角标 */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-cyan-400 font-mono">
                        {String(step.step).padStart(2, '0')}
                      </span>
                    </div>

                    {/* 图标 + 标题 */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="mt-0.5 shrink-0">{stepIcons[step.step]}</div>
                      <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors leading-tight pr-10">
                        {step.title}
                      </h3>
                    </div>

                    {/* 摘要 */}
                    <p className="text-[13px] text-neutral-400 leading-relaxed line-clamp-3 group-hover:text-neutral-300 transition-colors">
                      {step.desc}
                    </p>

                    {/* 底部信息栏 */}
                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                        <Clock className="w-3 h-3" />
                        <span>阅读约 {step.readTime}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-cyan-500/0 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all duration-200" />
                    </div>
                  </motion.article>
                ))}

                {/* 空状态 */}
                {filteredSteps.length === 0 && (
                  <div className="col-span-full py-16 text-center">
                    <GitMerge className="w-12 h-12 text-neutral-700 mx-auto mb-3" />
                    <p className="text-neutral-500">没有找到匹配的服务步骤</p>
                    <button
                      onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                      className="mt-3 text-sm text-cyan-400 hover:text-cyan-300 cursor-pointer"
                    >
                      清除筛选条件
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </main>
    </div>
    </>
  );
}
