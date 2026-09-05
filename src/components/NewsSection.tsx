import { useState, useEffect, Fragment, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Newspaper, Calendar, Eye, X, Tag, Clock, ArrowLeft, ChevronRight, BookOpen, Plus, Pencil, Trash2, Save, Upload } from "lucide-react";
import { TECH_COLUMN_ARTICLES, TechArticle, ArticleContentBlock } from "../data/techColumnArticles";
import { useAuth } from "../context/AuthContext";

export default function NewsSection() {
  const [selectedArticle, setSelectedArticle] = useState<TechArticle | null>(null);

  return (
    <>
      <section className="border-t border-neutral-900 pt-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Newspaper className="w-4 h-4 text-purple-400" />
              <span className="font-mono text-[10px] tracking-widest text-purple-400 uppercase font-semibold">
                NEWS & INSIGHTS / 行业洞见
              </span>
            </div>
            <h3 className="text-2xl font-bold text-neutral-100">新闻与行业洞见</h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-xl">
              分享最新项目落地、寺庙设计趋势与专业技术观点，像公众号一样图文并茂。
            </p>
          </div>
          <span className="text-[10px] text-neutral-600 font-mono">
            共 {TECH_COLUMN_ARTICLES.length} 篇
          </span>
        </div>

        {/* News Grid + Light Standards Board */}
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:flex-[2]">
            {TECH_COLUMN_ARTICLES.slice(0, 6).map((article) => (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group cursor-pointer bg-neutral-950/50 border border-neutral-900 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 flex flex-col self-start"
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded-lg bg-purple-500/15 border border-purple-500/25 text-[10px] font-mono text-purple-300">
                      {article.tags[0] || "寺庙设计"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-2.5 flex-1">
                  <h4 className="text-sm font-bold text-neutral-100 group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed flex-1">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-neutral-600 font-mono pt-2 border-t border-neutral-900/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.publishDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="lg:flex-1">
            <LightStandardsBoard />
          </div>
        </div>
      </section>

      {/* Article Modal - 参考技术专栏文章页设计 */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-neutral-950/90 backdrop-blur-sm"
              onClick={() => setSelectedArticle(null)}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-[95vw] max-w-5xl h-[90vh] max-h-[900px] bg-[#120e0b] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Top Navigation Bar */}
              <div className="border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md shrink-0">
                <div className="px-5 sm:px-8 py-3 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>返回新闻列表</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-neutral-600">NEWS ARTICLE</span>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="w-7 h-7 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto custom-scrollbar">
                <article className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
                  {/* Article Header */}
                  <motion.header
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8"
                  >
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedArticle.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${getTagColor(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-black text-neutral-100 leading-tight mb-5">
                      {selectedArticle.title}
                    </h2>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-5 text-xs text-neutral-500 pb-5 border-b border-neutral-900">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <time>{selectedArticle.publishDate}</time>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{selectedArticle.readTime}</span>
                      </div>
                      {selectedArticle.author && (
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span className="text-purple-400">{selectedArticle.author}</span>
                        </div>
                      )}
                    </div>
                  </motion.header>

                  {/* Cover Image */}
                  {selectedArticle.coverImage && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="mb-8 rounded-2xl overflow-hidden border border-neutral-800"
                    >
                      <img
                        src={selectedArticle.coverImage}
                        alt={selectedArticle.title}
                        className="w-full max-h-[450px] object-cover"
                      />
                    </motion.div>
                  )}

                  {/* Article Body */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="space-y-1"
                  >
                    {selectedArticle.content.map((block, idx) => (
                      <Fragment key={idx}>
                        <ContentBlock block={block} />
                      </Fragment>
                    ))}
                  </motion.div>

                  {/* Footer: Tags + Back */}
                  <footer className="mt-12 pt-6 border-t border-neutral-900">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag className="w-4 h-4 text-purple-400" />
                        {selectedArticle.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] px-2 py-1 rounded-full border ${getTagColor(tag)}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => setSelectedArticle(null)}
                        className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
                      >
                        返回新闻列表
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </footer>
                </article>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// 国际及国内灯光标准文章 - 支持上传、编辑、删除、自动保存
interface StandardArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  coverImage?: string;
  tags: string[];
  color: "purple" | "amber" | "blue" | "green" | "rose";
  publishDate: string;
  createdAt: string;
}

const DEFAULT_STANDARD_ARTICLES: StandardArticle[] = [
  {
    id: "std-1",
    title: "寺庙灯光设计：见光不见灯与古建零损伤安装技术规范",
    summary: "寺庙夜景照明的真实工程底线——1800K-2400K 暖色温、平均照度 15-30Lx、非破坏性抱箍承载、GB 50034 与 JGJ/T 163 双重要求。",
    content: `寺庙灯光设计以「见光不见灯」为最高原则，烘托庄严静穆而非夺目。

【色温与照度的克制原则】寺庙建筑立面平均照度控制在 15-30Lx，色温统一 1800K-2400K 暖古铜区间，避免冷白光破坏木构彩画与宗教空间静穆氛围。佛塔塔刹做竖向焦点照明，殿宇檐口斗拱做层次擦亮。

【古建零损伤安装】涉及全国重点文保单位的古建寺庙，全部采用非破坏性张力抱箍承载，杜绝在古木、砖石上打孔；选用无紫外、蓝光波谱窄幅的 LED 保护彩画木作；控制系统采用 DALI 或 Zigbee 无线方案免布线扰动，全过程可逆。

【智能分时场景】按早晚课、节庆法会、闭寺设定多套场景，深夜自动降至安全照度（一般 ≤5Lx），节能 30%-50%，同时减少对周边居民的光干扰。

国际参考 IES DG-2-15《Lighting for Religious Facilities》；国内执行 GB 50034《建筑照明设计标准》对文物保护建筑的照度上限、色温区间、紫外含量、年曝光量的强制要求；JGJ/T 163《城市夜景照明设计规范》对防眩、溢散光的限值。古建部分还需符合 GB 50165《古建筑木结构维护与加固技术规范》。`,
    coverImage: "https://images.unsplash.com/photo-1515630278258-407f66498911?w=800&q=80",
    tags: ["寺庙灯光设计", "见光不见灯", "古建照明", "GB 50034", "文物保护"],
    color: "amber",
    publishDate: "2026-08-30",
    createdAt: "2026-08-30T00:00:00.000Z",
  },
  {
    id: "std-2",
    title: "寺庙建筑设计：营造法式与仿古材料的工程规范",
    summary: "寺庙建筑设计的形制法度与现代规范底线——伽蓝七堂制、营造法式材分推算、木构与混凝土仿古比选、GB 50016 隐蔽消防。",
    content: `寺庙建筑设计是宗教空间营造的主体工程，须在传统形制法度与现代工程规范之间取得平衡。

【形制与法度】汉传佛教寺院依伽蓝七堂制与中轴对称布局（山门—天王殿—大雄宝殿—法堂—藏经楼—钟鼓楼—僧寮），屋顶等级序列不可颠倒；道教宫观重因山就势与神阶秩序；藏传佛教以曼陀罗图式组织空间，收分墙体与平顶碉房是核心语汇。比例推算依据宋《营造法式》材分制与清《工程做法则例》斗口制，开间、进深、柱高、举折、斗拱层数须严校。

【结构体系比选】木构形制最纯正但造价高、防腐防火严苛；混凝土仿古耐久、造价可控、易满足消防与抗震，外观可做仿木饰面；钢木组合主体钢满足大跨度、外露部分木构保观感——适合大经堂等大空间。

【隐蔽式消防】喷淋管道藏于吊顶与墙体、消防车道结合景观铺装、防火分区利用院落自然分隔、设备管线沿墙内暗敷，在满足 GB 50016 与 GB 50011 抗震规范的前提下不破坏传统风貌。

国际层面参考 ICOMOS《关于历史性建筑保护与修复的威尼斯宪章》；国内执行 GB 50016《建筑设计防火规范》、GB 50011《建筑抗震设计规范》、GB 50763《无障碍设计规范》，以及涉及文物保护单位时文物部门的额外审批。`,
    coverImage: "https://images.unsplash.com/photo-1565514020176-7ab1fcc81a3f?w=800&q=80",
    tags: ["寺庙建筑设计", "营造法式", "古建营造", "GB 50016", "仿古建筑"],
    color: "amber",
    publishDate: "2026-08-30",
    createdAt: "2026-08-30T00:00:00.000Z",
  },
];

const STANDARD_COLORS: Record<StandardArticle["color"], string> = {
  purple: "border-purple-500/30 bg-purple-500/5 text-purple-400",
  amber: "border-amber-500/30 bg-amber-500/5 text-amber-400",
  blue: "border-blue-500/30 bg-blue-500/5 text-blue-400",
  green: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
  rose: "border-rose-500/30 bg-rose-500/5 text-rose-400",
};

function generateStandardId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function compressImage(file: File, maxSize = 800, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context unavailable"));
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function LightStandardsBoard() {
  const { isAdmin } = useAuth();
  const [articles, setArticles] = useState<StandardArticle[]>(DEFAULT_STANDARD_ARTICLES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<StandardArticle>>({});
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<StandardArticle | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Load from localStorage (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("lumos_light_standards");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setArticles(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load light standards:", e);
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("lumos_light_standards", JSON.stringify(articles));
      setLastSaved(new Date());
      setUploadError(null);
    } catch (e) {
      console.error("Failed to save light standards:", e);
      setUploadError("保存失败：存储空间不足，请删除部分文章或封面图");
    }
  }, [articles]);

  const addArticle = () => {
    const newArticle: StandardArticle = {
      id: generateStandardId(),
      title: "新文章标题",
      summary: "输入文章摘要...",
      content: "输入正文内容，支持多行。可植入寺庙设计、汉传佛教设计、道教宫观设计、寺庙灯光等专业关键词。",
      coverImage: undefined,
      tags: ["灯光标准"],
      color: "purple",
      publishDate: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
    };
    setArticles((prev) => [newArticle, ...prev]);
    setEditingId(newArticle.id);
    setEditForm(newArticle);
  };

  const deleteArticle = (id: string) => {
    if (window.confirm("确定要删除这篇标准文章吗？")) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setEditForm({});
      }
      if (selectedArticle?.id === id) {
        setSelectedArticle(null);
      }
    }
  };

  const startEdit = (article: StandardArticle) => {
    setEditingId(article.id);
    setEditForm({ ...article });
    setUploadError(null);
  };

  const saveEdit = () => {
    if (!editingId || !editForm.title?.trim() || !editForm.content?.trim()) return;
    setArticles((prev) =>
      prev.map((a) =>
        a.id === editingId
          ? {
              ...a,
              title: editForm.title.trim(),
              summary: (editForm.summary || editForm.content.slice(0, 60)).trim(),
              content: editForm.content.trim(),
              coverImage: editForm.coverImage,
              tags: (editForm.tags || ["灯光标准"]).map((t) => t.trim()).filter(Boolean),
              color: (editForm.color as StandardArticle["color"]) || a.color,
              publishDate: editForm.publishDate || a.publishDate,
              createdAt: new Date().toISOString(),
            }
          : a
      )
    );
    setEditingId(null);
    setEditForm({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
    setUploadError(null);
  };

  const handleCoverUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setUploadError(null);
    try {
      const dataUrl = await compressImage(file, 800, 0.85);
      setEditForm((prev) => ({ ...prev, coverImage: dataUrl }));
    } catch (err) {
      console.error("Image upload failed:", err);
      setUploadError("图片上传失败，请重试");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveCover = () => {
    setEditForm((prev) => ({ ...prev, coverImage: undefined }));
  };

  const colorOptions = Object.keys(STANDARD_COLORS) as StandardArticle["color"][];

  return (
    <>
      <aside className="h-full bg-[#120e0b] border border-neutral-800 rounded-2xl p-4 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              国际及国内灯光标准
            </h4>
            <p className="text-[10px] text-neutral-500 mt-0.5">
              {isAdmin ? "已登录 · 可上传 · 可编辑 · 自动保存" : "聚焦寺庙设计、汉传佛教设计、道教宫观设计、寺庙灯光等10大专业领域"}
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={addArticle}
              className="w-7 h-7 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center transition-colors cursor-pointer"
              title="新增标准文章"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 max-h-[400px] lg:max-h-none">
          {articles.length === 0 ? (
            <div className="text-center py-8 text-xs text-neutral-600">
              暂无标准文章
            </div>
          ) : (
            articles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  if (isAdmin) {
                    if (editingId !== article.id) startEdit(article);
                  } else {
                    setSelectedArticle(article);
                  }
                }}
                className={`group relative rounded-xl border p-3.5 transition-all hover:shadow-sm cursor-pointer ${
                  isAdmin ? "hover:border-opacity-60" : "hover:border-opacity-80"
                } ${STANDARD_COLORS[article.color]}`}
              >
                {editingId === article.id ? (
                  <div className="space-y-3 pointer-events-auto">
                    <input
                      type="text"
                      value={editForm.title || ""}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-purple-500/50"
                      placeholder="文章标题"
                    />
                    <textarea
                      value={editForm.summary || ""}
                      onChange={(e) => setEditForm({ ...editForm, summary: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-purple-500/50 resize-none"
                      rows={2}
                      placeholder="摘要"
                    />
                    <textarea
                      value={editForm.content || ""}
                      onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-purple-500/50 resize-none"
                      rows={5}
                      placeholder="正文内容（支持多行）"
                    />
                    <input
                      type="text"
                      value={(editForm.tags || []).join(", ")}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                        })
                      }
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-purple-500/50"
                      placeholder="标签，用逗号分隔"
                    />
                    <input
                      type="date"
                      value={editForm.publishDate || ""}
                      onChange={(e) => setEditForm({ ...editForm, publishDate: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-purple-500/50"
                    />

                    {/* Cover image upload */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs cursor-pointer transition-colors">
                          <Upload className="w-3 h-3" />
                          {isUploading ? "上传中..." : "上传封面图"}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverUpload}
                            className="hidden"
                            disabled={isUploading}
                          />
                        </label>
                        {editForm.coverImage && (
                          <button
                            onClick={handleRemoveCover}
                            className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-red-500/20 border border-neutral-800 text-neutral-400 hover:text-red-400 text-xs transition-colors cursor-pointer"
                          >
                            删除封面
                          </button>
                        )}
                      </div>
                      {editForm.coverImage && (
                        <div className="relative rounded-lg overflow-hidden border border-neutral-800">
                          <img
                            src={editForm.coverImage}
                            alt="封面预览"
                            className="w-full h-24 object-cover"
                          />
                        </div>
                      )}
                      {uploadError && (
                        <p className="text-[10px] text-red-400">{uploadError}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {colorOptions.map((c) => (
                        <button
                          key={c}
                          onClick={() => setEditForm({ ...editForm, color: c })}
                          className={`w-5 h-5 rounded-full border-2 transition-all ${
                            editForm.color === c ? "border-white scale-110" : "border-transparent"
                          }`}
                          style={{ backgroundColor: getStandardColorHex(c) }}
                          title={c}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={saveEdit}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs transition-colors cursor-pointer"
                      >
                        <Save className="w-3 h-3" />
                        保存
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 text-xs transition-colors cursor-pointer"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="text-sm font-bold text-neutral-100 leading-snug">
                        {article.title}
                      </h5>
                      {isAdmin && (
                        <div
                          className="flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => startEdit(article)}
                            className="w-6 h-6 rounded-md bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-neutral-200 flex items-center justify-center cursor-pointer"
                            title="编辑"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => deleteArticle(article.id)}
                            className="w-6 h-6 rounded-md bg-neutral-900/80 hover:bg-red-500/20 border border-neutral-800 hover:border-red-500/30 text-neutral-400 hover:text-red-400 flex items-center justify-center cursor-pointer"
                            title="删除"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {article.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-950/60 border border-neutral-800 text-neutral-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-[9px] text-neutral-600 font-mono">
                        {article.publishDate}
                      </p>
                      {!isAdmin && (
                        <span className="text-[10px] text-neutral-500 flex items-center gap-0.5 group-hover:text-purple-400 transition-colors">
                          查看详情
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
          {isAdmin ? (
            <>
              <span className="text-[9px] text-neutral-600 font-mono">
                {lastSaved ? `已保存 ${lastSaved.toLocaleTimeString("zh-CN")}` : "自动保存中..."}
              </span>
              <button
                onClick={addArticle}
                className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                新增
              </button>
            </>
          ) : (
            <span className="text-[9px] text-neutral-600 font-mono">
              管理员登录后可编辑此栏目
            </span>
          )}
        </div>
      </aside>

      {/* Article Detail Modal for visitors */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          >
            <div
              className="absolute inset-0 bg-neutral-950/90 backdrop-blur-sm"
              onClick={() => setSelectedArticle(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-[95vw] max-w-2xl max-h-[90vh] bg-[#120e0b] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-900 bg-neutral-950/50 shrink-0">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getStandardColorHex(selectedArticle.color) }}
                  />
                  <span className="text-xs font-bold text-neutral-200">国际及国内灯光标准</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-7 h-7 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
                  title="关闭"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {selectedArticle.coverImage && (
                  <div className="rounded-xl overflow-hidden border border-neutral-800">
                    <img
                      src={selectedArticle.coverImage}
                      alt={selectedArticle.title}
                      className="w-full max-h-[280px] object-cover"
                    />
                  </div>
                )}
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-100 leading-tight">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center gap-3 text-[10px] text-neutral-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {selectedArticle.publishDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {selectedArticle.tags.join(" · ")}
                  </span>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                  {selectedArticle.content}
                </p>

                {isAdmin && (
                  <div className="flex items-center gap-2 pt-4 mt-2 border-t border-neutral-900">
                    <button
                      onClick={() => {
                        const a = selectedArticle;
                        setSelectedArticle(null);
                        startEdit(a);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                      编辑
                    </button>
                    <button
                      onClick={() => {
                        const a = selectedArticle;
                        setSelectedArticle(null);
                        deleteArticle(a.id);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-red-500/20 border border-neutral-800 hover:border-red-500/30 text-neutral-400 hover:text-red-400 text-xs transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      删除
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function getStandardColorHex(color: StandardArticle["color"]) {
  const hex: Record<StandardArticle["color"], string> = {
    purple: "#a855f7",
    amber: "#d4a441",
    blue: "#9b7a51",
    green: "#778c63",
    rose: "#f43f5e",
  };
  return hex[color];
}

// 标签配色 - 与技术专栏文章页保持一致
function getTagColor(tag: string) {
  const colors: Record<string, string> = {
    '古建照明': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    '设计指南': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    '文物保护': 'bg-red-500/10 text-red-400 border-red-500/30',
    '文旅夜游': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    '协议': 'bg-pink-500/10 text-pink-400 border-pink-500/30',
  };
  return colors[tag] || 'bg-neutral-500/10 text-neutral-400 border-neutral-500/30';
}

function ContentBlock({ block }: { block: ArticleContentBlock }) {
  switch (block.type) {
    case "heading":
      const level = block.level || 2;
      if (level === 1 || level === 2) {
        return (
          <h3 className="text-xl font-bold text-white mt-10 mb-4 pb-3 border-b border-purple-500/20 flex items-center gap-2">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-purple-600" />
            {block.content}
          </h3>
        );
      } else if (level === 3) {
        return (
          <h4 className="text-lg font-semibold text-neutral-200 mt-7 mb-3 pl-3 border-l-2 border-purple-500/40">
            {block.content}
          </h4>
        );
      }
      return (
        <h5 className="text-base font-medium text-neutral-300 mt-5 mb-2">
          {block.content}
        </h5>
      );
    case "text":
      return (
        <p
          className="text-[15px] leading-relaxed text-neutral-300 mb-5"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );
    case "image":
      return (
        <figure className="my-7 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950/40">
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
    case "list":
      return (
        <div className="mb-5 pl-4">
          {block.content.split("\n").map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 mb-2 last:mb-0">
              <ChevronRight className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
              <span className="text-[15px] text-neutral-300 leading-relaxed whitespace-pre-wrap">{item}</span>
            </div>
          ))}
        </div>
      );
    case "quote":
      return (
        <blockquote className="my-7 border-l-4 border-purple-500/50 pl-5 pr-4 py-4 rounded-r-xl bg-gradient-to-r from-purple-500/5 to-transparent">
          <p className="text-[15px] text-neutral-200 italic leading-relaxed">"{block.content}"</p>
        </blockquote>
      );
    case "code":
      return (
        <pre className="bg-neutral-950 border border-neutral-900 rounded-xl p-4 overflow-x-auto mb-5">
          <code className="text-xs font-mono text-neutral-400">{block.content}</code>
        </pre>
      );
    default:
      return <p className="text-[15px] text-neutral-300 mb-5">{block.content}</p>;
  }
}
