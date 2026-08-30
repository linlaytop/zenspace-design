import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { WORKFLOW_STEPS } from "../components/HeaderModals";

export default function WorkflowDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const stepIndex = Number(id) - 1;
  const step = stepIndex >= 0 && stepIndex < WORKFLOW_STEPS.length ? WORKFLOW_STEPS[stepIndex] : null;

  if (!step) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">步骤不存在</h1>
          <button
            onClick={() => navigate('/workflow')}
            className="text-cyan-400 hover:text-cyan-300 cursor-pointer"
          >
            ← 返回服务流程
          </button>
        </div>
      </div>
    );
  }

  // 解析 fullArticle 为结构化内容块
  const lines = step.fullArticle.split('\n');
  const contentBlocks: { type: 'heading' | 'subheading' | 'list' | 'text'; content: string; level?: number }[] = [];
  let currentSection: { type: 'text'; content: string } | null = null;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentSection) { contentBlocks.push(currentSection); currentSection = null; }
      contentBlocks.push({ type: 'heading', content: line.replace('## ', ''), level: 2 });
    } else if (line.startsWith('### ')) {
      if (currentSection) { contentBlocks.push(currentSection); currentSection = null; }
      contentBlocks.push({ type: 'subheading', content: line.replace('### ', '') });
    } else if (line.startsWith('- **') && line.includes('**：')) {
      if (currentSection) { contentBlocks.push(currentSection); currentSection = null; }
      contentBlocks.push({ type: 'list', content: line.replace('- ', '') });
    } else if (line.trim()) {
      if (!currentSection) {
        currentSection = { type: 'text', content: '' };
      }
      currentSection.content += (currentSection.content ? '\n' : '') + line;
    }
  }
  if (currentSection) { contentBlocks.push(currentSection); }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* 封面区域 */}
      <header className="relative overflow-hidden border-b border-cyan-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/25 via-[#0a0e1a] to-blue-900/15" />
        <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-[150px]" />

        <div className="relative max-w-4xl mx-auto px-6 py-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* 返回按钮 */}
            <button
              onClick={() => navigate('/workflow')}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-cyan-400 transition-colors mb-8 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              返回服务流程列表
            </button>

            {/* 步骤编号 */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-mono font-bold mb-6">
              STEP {String(step.step).padStart(2, '0')} / 06
            </div>

            {/* 标题 */}
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
              {step.title}
            </h1>

            {/* 摘要 */}
            <p className="text-lg text-neutral-400 leading-relaxed max-w-3xl">
              {step.desc}
            </p>

            {/* 元信息 */}
            <div className="flex items-center gap-6 mt-8 text-sm text-neutral-500">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-500" />
                阅读约 {step.readTime}
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>禅境设计标准服务流程</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* 正文内容 */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-8"
        >
          {contentBlocks.map((block, i) => {
            switch (block.type) {
              case 'heading':
                return (
                  <h2 key={i} className="text-2xl font-bold text-cyan-400 mt-12 mb-5 pb-3 border-b border-cyan-800/40 flex items-center gap-3">
                    <span className="w-1.5 h-7 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full shrink-0" />
                    {block.content}
                  </h2>
                );
              case 'subheading':
                return (
                  <h3 key={i} className="text-lg font-semibold text-white mt-8 mb-3 pl-4 border-l-2 border-cyan-700">
                    {block.content}
                  </h3>
                );
              case 'list':
                // 解析 "- **项**：值" 格式
                const match = block.content.match(/\*\*(.+?)\*\*[：:]\s*(.+)/);
                if (match) {
                  return (
                    <div key={i} className="flex items-start gap-3 bg-cyan-950/20 rounded-xl p-4 border border-cyan-900/20">
                      <span className="text-cyan-400 font-bold text-sm whitespace-nowrap mt-0.5">{match[1]}</span>
                      <span className="text-neutral-300 text-sm leading-relaxed">{match[2]}</span>
                    </div>
                  );
                }
                return (
                  <div key={i} className="flex items-start gap-2 text-neutral-300 text-sm leading-relaxed pl-4">
                    <span className="text-cyan-400 mt-1.5">•</span>
                    <span>{block.content.replace(/^- /, '')}</span>
                  </div>
                );
              case 'text':
                return (
                  <p key={i} className="text-neutral-300 leading-relaxed text-[15px]" dangerouslySetInnerHTML={{
                    __html: block.content
                      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                      .replace(/`([^`]+)`/g, '<code class="bg-cyan-950/50 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
                  }} />
                );
              default:
                return null;
            }
          })}
        </motion.div>

        {/* 底部导航 */}
        <nav className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
          {stepIndex > 0 ? (
            <button
              onClick={() => navigate(`/workflow/${stepIndex}`)}
              className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 text-sm text-neutral-400 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              上一步：{WORKFLOW_STEPS[stepIndex - 1].title}
            </button>
          ) : <div />}

          {stepIndex < WORKFLOW_STEPS.length - 1 ? (
            <button
              onClick={() => navigate(`/workflow/${stepIndex + 2}`)}
              className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/40 text-sm text-cyan-400 hover:text-cyan-300 transition-all cursor-pointer"
            >
              下一步：{WORKFLOW_STEPS[stepIndex + 1].title}
              <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/40 text-sm text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer"
            >
              返回首页开始咨询
              <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </nav>
      </article>
    </div>
  );
}
