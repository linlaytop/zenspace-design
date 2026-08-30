import type React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  MessageSquare,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Landmark,
  Mountain,
  Palmtree,
  Building2,
  Sofa,
  Scroll,
  Hammer,
  TreePine,
  Lamp,
  Church,
  ChevronRight
} from 'lucide-react';
import Seo from '../components/Seo';
import { serviceCategories, getServiceCategoryBySlug, type ServiceCategory } from '../data/serviceCategories';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Landmark,
  Mountain,
  Palmtree,
  Building2,
  Sofa,
  Scroll,
  Hammer,
  TreePine,
  Lamp,
  Church,
};

export default function ServiceCategoryPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getServiceCategoryBySlug(slug) : undefined;

  if (!category) {
    return (
      <div className="min-h-screen bg-[#120e0b] text-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">服务分类未找到</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const Icon = iconMap[category.icon] || Sparkles;
  const relatedCategories = category.related
    .map(slug => serviceCategories.find(c => c.slug === slug))
    .filter(Boolean) as ServiceCategory[];

  return (
    <>
      <Seo
        title={category.title}
        description={category.description}
        keywords={category.keywords}
        path={`/service/${category.slug}`}
        breadcrumb={[
          { name: '服务分类', path: '/service' },
          { name: category.name, path: `/service/${category.slug}` },
        ]}
        faq={category.faq}
      />
      <div className="min-h-screen bg-[#120e0b] text-neutral-100">
        {/* 顶部导航栏 */}
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
                <Icon className="w-5 h-5 text-yellow-400" />
                <h1 className="text-lg font-bold">{category.name}</h1>
                <span className="text-[10px] font-mono text-neutral-500 tracking-wider mt-0.5">
                  {category.enName.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-10">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 p-8 lg:p-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-vermilion-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-vermilion-500/15 text-vermilion-300 text-[10px] font-mono border border-vermilion-500/30">
                    ZENSPACE SERVICE
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 tracking-wider">{category.enName}</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  {category.h1}
                </h1>
                <p className="text-lg text-neutral-300 leading-relaxed">
                  {category.heroText}
                </p>
                <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">
                  {category.intro}
                </p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <button
                    onClick={() => navigate('/workflow')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-[#120e0b] text-sm font-bold hover:from-yellow-400 hover:to-amber-400 transition-all flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    预约咨询
                  </button>
                  <button
                    onClick={() => navigate('/tech')}
                    className="px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm font-medium hover:border-yellow-500/30 hover:text-yellow-400 transition-all flex items-center gap-2"
                  >
                    查看技术专栏
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center">
                <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-transparent border border-yellow-500/10 flex items-center justify-center">
                  <Icon className="w-32 h-32 text-yellow-400/40" />
                </div>
              </div>
            </div>
          </section>

          {/* Highlights */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {category.highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-5 rounded-2xl bg-neutral-950/60 border border-neutral-800 flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-neutral-200">{item}</span>
              </motion.div>
            ))}
          </section>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {category.sections.map((section, index) => (
                <motion.section
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 lg:p-8 rounded-2xl bg-neutral-950/40 border border-neutral-800 flex flex-col gap-5"
                >
                  <h2 className="text-xl font-bold text-neutral-100 border-l-4 border-yellow-400 pl-4">
                    {section.h2}
                  </h2>
                  {section.content && (
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {section.content}
                    </p>
                  )}
                  {section.items && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 hover:border-yellow-500/20 transition-colors"
                        >
                          <h3 className="text-sm font-bold text-yellow-400 mb-2">{item.h3}</h3>
                          <p className="text-xs text-neutral-400 leading-relaxed">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.section>
              ))}

              {/* FAQ */}
              <section className="p-6 lg:p-8 rounded-2xl bg-neutral-950/40 border border-neutral-800 flex flex-col gap-5">
                <h2 className="text-xl font-bold text-neutral-100 border-l-4 border-vermilion-500 pl-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-vermilion-400" />
                  常见问题
                </h2>
                <div className="flex flex-col gap-4">
                  {category.faq.map((item, index) => (
                    <div key={index} className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800">
                      <h3 className="text-sm font-bold text-neutral-200 mb-2">Q: {item.q}</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Contact CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/20 flex flex-col gap-4"
              >
                <h3 className="text-lg font-bold text-neutral-100">需要{category.name}方案？</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  禅境设计提供专业寺庙设计效果图，以及从概念到落地的全流程服务。
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="tel:138-1688-6888"
                    className="px-4 py-2.5 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-sm font-medium hover:bg-yellow-500/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    138-1688-6888
                  </a>
                  <div className="px-4 py-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-sm text-neutral-300 flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    微信：LumosDesignVIP
                  </div>
                </div>
              </motion.div>

              {/* Service Process */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-800 flex flex-col gap-4"
              >
                <h3 className="text-base font-bold text-neutral-100">服务流程</h3>
                <div className="flex flex-col gap-3">
                  {['需求沟通', '概念方案', '深化设计', '施工配合', '竣工验收'].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold flex items-center justify-center border border-yellow-500/20">
                        {index + 1}
                      </span>
                      <span className="text-sm text-neutral-300">{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Related Categories */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-800 flex flex-col gap-4"
              >
                <h3 className="text-base font-bold text-neutral-100">相关服务</h3>
                <div className="flex flex-col gap-2">
                  {relatedCategories.map((related) => (
                    <button
                      key={related.slug}
                      onClick={() => navigate(`/service/${related.slug}`)}
                      className="group flex items-center justify-between p-3 rounded-xl bg-neutral-900/40 border border-neutral-800 hover:border-yellow-500/30 transition-colors text-left"
                    >
                      <span className="text-sm text-neutral-300 group-hover:text-yellow-400 transition-colors">
                        {related.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-yellow-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom CTA */}
          <section className="p-8 lg:p-12 rounded-3xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-neutral-100 mb-2">准备好打造您的{category.name}项目了吗？</h2>
              <p className="text-sm text-neutral-400">联系禅境设计，获取专业的寺庙设计方案与寺庙设计效果图服务。</p>
            </div>
            <button
              onClick={() => navigate('/workflow')}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-[#120e0b] font-bold hover:from-yellow-400 hover:to-amber-400 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              立即咨询
              <ArrowRight className="w-5 h-5" />
            </button>
          </section>
        </div>
      </div>
    </>
  );
}
