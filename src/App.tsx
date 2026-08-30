import { useState, useEffect, Fragment, useRef } from "react";
import { useNavigate, useLocation, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Layers,
  MapPin,
  Cpu,
  Flame,
  Sun,
  Award,
  Leaf,
  Video,
  MessageSquare,
  Phone,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  RotateCcw,
  Globe,
  Home,
  Users,
  GitMerge,
  BookOpen,
  Eye,
  Star,
  LogIn,
  LogOut,
  Settings
} from "lucide-react";
import TechColumnPage from "./pages/TechColumnPage";
import TechArticlePage from "./pages/TechArticlePage";
import ArtLandmarksPage from "./pages/ArtLandmarksPage";
import ArtLandmarkDetailPage from "./pages/ArtLandmarkDetailPage";
import InterviewsPage from "./pages/InterviewsPage";
import InterviewDetailPage from "./pages/InterviewDetailPage";
import WorkflowPage from "./pages/WorkflowPage";
import WorkflowDetailPage from "./pages/WorkflowDetailPage";
import ServiceCategoryPage from "./pages/ServiceCategoryPage";
import ShowcaseGallery from "./components/ShowcaseGallery";
import FireworksCanvas from "./components/FireworksCanvas";
import HeaderModals from "./components/HeaderModals";
import LoginModal from "./components/LoginModal";
import AdminDashboard from "./components/AdminDashboard";
import { useAuth } from "./context/AuthContext";
import Seo from "./components/Seo";

interface Contact {
  id: string;
  type: 'channel' | 'wechat' | 'phone';
  label: string;
  value: string;
}

const DEFAULT_CONTACTS: Contact[] = [
  { id: '1', type: 'channel', label: '官方视频号', value: '寺庙佛教设计空间美学' },
  { id: '2', type: 'wechat', label: '专属微信号', value: 'LumosDesignVIP' },
  { id: '3', type: 'phone', label: '设计预约手机号', value: '138-1688-6888' }
];

/**
 * 逐字渲染的 RGB 流彩文本（宋体 + 厚重）
 * 每个字符独立 <span>，通过逐字 animationDelay 形成流动的彩虹波。
 */
function RgbParagraph({ text }: { text: string }) {
  return (
    <p className="rgb-text-block">
      {Array.from(text).map((ch, i) => {
        // 保留段落内的换行
        if (ch === '\n') return <br key={i} />;
        return (
          <span
            key={i}
            className="rgb-char"
            style={{ animationDelay: `${(i % 40) * 0.09}s` }}
          >
            {ch}
          </span>
        );
      })}
    </p>
  );
}

/**
 * 佛教风装饰分割线（Hero 顶部）
 * 鎏金—朱红—鎏金 渐隐线 + 居中莲华宝相，替代原七彩 LED 灯带。
 */
function TempleDivider() {
  return (
    <div className="w-full flex items-center justify-center gap-4 select-none pointer-events-none py-1">
      <span className="h-px flex-1 temple-rule" />
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        className="text-yellow-500 shrink-0 animate-soft-breath"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* 莲华：中心莲蓬 + 左右对称花瓣 */}
        <path d="M12 21c-4.4 0-7.8-2.5-7.8-5.8 2.1 0 3.7.9 4.9 2.1 1.1-1.2 1.9-1.6 2.9-1.6s1.8.4 2.9 1.6c1.2-1.2 2.8-2.1 4.9-2.1 0 3.3-3.4 5.8-7.8 5.8Z" />
        <path d="M12 15.7V4.5" />
        <path d="M12 7.2c-1.5-1.3-1.5-3 0-4.2 1.5 1.1 1.5 2.8 0 4.2Z" />
        <path d="M12 9c1.5-1.1 3.2-.9 4.1.3-1.3.9-2.8.9-4.1-.3Z" />
        <path d="M12 9c-1.5-1.1-3.2-.9-4.1.3 1.3.9 2.8.9 4.1-.3Z" />
      </svg>
      <span className="h-px flex-1 temple-rule" />
    </div>
  );
}

export default function App() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'showcase'>('showcase');
  const [activeHeaderModal, setActiveHeaderModal] = useState<'art' | 'interview' | 'workflow' | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Hero 文字编辑（管理员可编辑，localStorage 自动保存）
  const [isHeroEditing, setIsHeroEditing] = useState(false);
  const [heroTitle, setHeroTitle] = useState(() => {
    const saved = localStorage.getItem('lumos_hero_title');
    return saved || '为寺院筑一方安住身心的净土';
  });
  const [heroParagraphs, setHeroParagraphs] = useState<string[]>(() => {
    const saved = localStorage.getItem('lumos_hero_paragraphs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [
      '禅境设计专注汉传、藏传、南传佛教寺院与道教宫观的整体营造，从总体规制、空间秩序到材质工艺，皆以形制法度为根、以禅意美学为用。',
      '我们主张古建零损伤干预：以非破坏性张力抱箍承载灯具与设备，保护彩绘与榫卯；以暖色低色温光突出木构层次，见光不见灯，让殿宇在夜色中更显肃穆庄严。',
      '从概念方案、施工图到落地营造，全流程一体化服务，让每一座寺院在当代仍保有安详、克制而有序的精神气场。'
    ];
  });

  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem('lumos_contacts_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_CONTACTS;
      }
    }
    return DEFAULT_CONTACTS;
  });

  // ICP 备案信息（前台 footer 展示，来自 localStorage，管理员后台「备案管理」可编辑）
  const [filing, setFiling] = useState<null | { image: string; icpNumber: string; icpUrl: string; policeNumber: string; policeUrl: string }>(() => {
    try {
      const s = localStorage.getItem('lumos_icp_filing');
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newType, setNewType] = useState<'channel' | 'wechat' | 'phone'>('channel');
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editType, setEditType] = useState<'channel' | 'wechat' | 'phone'>('channel');
  const [editLabel, setEditLabel] = useState('');
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    localStorage.setItem('lumos_contacts_v2', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('lumos_hero_title', heroTitle);
  }, [heroTitle]);

  useEffect(() => {
    localStorage.setItem('lumos_hero_paragraphs', JSON.stringify(heroParagraphs));
  }, [heroParagraphs]);

  // 后台「备案管理」保存后，前台 footer 同步刷新备案展示
  useEffect(() => {
    const handler = () => {
      try {
        const s = localStorage.getItem('lumos_icp_filing');
        setFiling(s ? JSON.parse(s) : null);
      } catch {
        setFiling(null);
      }
    };
    window.addEventListener('zenspace:filing-changed', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('zenspace:filing-changed', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  // 微信二维码：使用共享 Hook，保证与 ShowcaseGallery 两处状态一致、自动保存、实时同步
  const handleAdd = () => {
    if (!newLabel.trim() || !newValue.trim()) return;
    const item: Contact = {
      id: Date.now().toString(),
      type: newType,
      label: newLabel,
      value: newValue
    };
    setContacts([...contacts, item]);
    setNewLabel('');
    setNewValue('');
    setIsAdding(false);
  };

  const handleStartEdit = (item: Contact) => {
    setEditingId(item.id);
    setEditType(item.type);
    setEditLabel(item.label);
    setEditValue(item.value);
  };

  const handleSaveEdit = (id: string) => {
    if (!editLabel.trim() || !editValue.trim()) return;
    setContacts(contacts.map(c => c.id === id ? { ...c, type: editType, label: editLabel, value: editValue } : c));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleReset = () => {
    if (window.confirm('是否确认恢复默认联系方式？')) {
      setContacts(DEFAULT_CONTACTS);
    }
  };

  // 判断是否在独立页面（技术专栏/环球艺术/业主采访/服务流程）
  const isTechPage = location.pathname.startsWith('/tech');
  const isArtPage = location.pathname.startsWith('/art');
  const isInterviewPage = location.pathname.startsWith('/interview');
  const isWorkflowPage = location.pathname.startsWith('/workflow');
  const isServicePage = location.pathname.startsWith('/service');
  const isSubPage = isTechPage || isArtPage || isInterviewPage || isWorkflowPage || isServicePage;

  return (
    <div id="main-root-container" className="min-h-screen bg-[#120e0b] text-neutral-100 font-sans tracking-tight relative overflow-hidden">
      {!isSubPage && (
        <Seo
          title="寺庙佛教设计-专业寺庙设计|汉传佛教设计|道教宫观设计|寺庙建筑设计"
          description="禅境设计 ZENSPACE DESIGN 专注专业寺庙设计与佛教建筑设计，提供汉传佛教、道教宫观、藏传佛教、南传佛教寺院，以及寺庙建筑、室内、软装、雕塑、景观、灯光的全流程一体化设计。形制合规、禅意美学、古建零损伤营造。"
          keywords="寺庙设计,寺院设计,佛教建筑设计,汉传佛教设计,道教宫观设计,藏传佛教设计,南传佛教设计,寺庙建筑设计,寺庙室内设计,寺庙软装设计,寺庙造型雕塑设计,寺庙景观设计,寺庙灯光设计,禅意设计,寺庙效果图,寺院规划设计,宗教建筑设计,寺庙设计院,佛教建筑设计"
          path="/"
          faq={[
            { q: '寺庙设计项目一般报价区间是多少？', a: '寺庙佛教设计根据形制、规模、选材与设计深度分档报价，从概念方案到施工图全程一体化服务，单体项目可按殿堂计费或按整体院落面积计费。' },
            { q: '古建寺庙修缮与新建的设计流程有何不同？', a: '新建项目侧重总体规制与空间秩序；修缮项目须先做现状测绘与残损评估，依据文保级别报批后再做设计，确保干预最小化且全程可逆。' },
            { q: '汉传、藏传、南传三种形制如何匹配选址？', a: '汉传以中轴对称、院落递进为骨，适合平原与缓坡；藏传依山就势、错层台地，适合高原山地；南传以佛塔为中心、平面展开，适合热带气候。' },
            { q: '服务范围覆盖哪些城市？', a: '覆盖上海、北京、深圳、广州、成都、杭州、西安、拉萨、景洪等全国城市，同时服务马来西亚吉隆坡、槟城等东南亚市场。' },
          ]}
        />
      )}

      {/* Decorative Blur Background Highlights - 檀木暖色 + 朱红 + 鎏金 */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-red-700/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-amber-500/3 rounded-full blur-[180px] pointer-events-none" />

      {/* Header / Navigation Bar - 在所有页面都显示 */}
      <div className="border-b border-neutral-900 bg-neutral-950/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-400 p-0.5 shadow-lg shadow-yellow-500/10 flex items-center justify-center">
              <div className="w-full h-full bg-[#120e0b] rounded-[10px] flex items-center justify-center">
                <span className="text-yellow-400 font-kai font-bold text-lg leading-none">禅</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-wider uppercase bg-gradient-to-r from-neutral-50 via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                  ZENSPACE DESIGN
                </h1>
                <span className="text-[9px] bg-yellow-500/10 text-yellow-500 font-mono border border-yellow-500/20 px-1.5 py-0.5 rounded">
                  寺庙佛教设计版
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 mt-0.5 font-mono">专业寺庙 · 宗教建筑空间一体化设计机构</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5 bg-neutral-950/40 p-1 rounded-xl border border-neutral-900/60 shadow-inner">
              {/* 首页按钮 - 白色醒目，方便各年龄段用户 */}
              <button
                onClick={() => navigate('/')}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                  !isSubPage
                    ? "bg-white/15 border border-white/40 text-white shadow-sm"
                    : "bg-[#1a1310] hover:bg-white/10 border border-white/20 hover:border-white/50 text-white/80 hover:text-white"
                }`}
                title="返回首页"
              >
                <Home className="w-3.5 h-3.5 text-white shrink-0" />
                <span>首页</span>
              </button>

              <button
                onClick={() => navigate('/art')}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                  isArtPage
                    ? "bg-yellow-500/20 border border-yellow-500/50 text-[#e3ba5f] shadow-sm"
                    : "bg-[#1a1310] hover:bg-neutral-950 border border-neutral-850 hover:border-yellow-500/40 text-[#e3ba5f] hover:text-yellow-400"
                }`}
                title="查看全球高端夜景艺术地标谱"
              >
                <Globe className="w-3 h-3 text-yellow-500 animate-pulse shrink-0" />
                <span>环球艺术创造力</span>
              </button>

              <button
                onClick={() => navigate('/interview')}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                  isInterviewPage
                    ? "bg-emerald-500/20 border border-emerald-500/50 text-[#778c63] shadow-sm"
                    : "bg-[#1a1310] hover:bg-neutral-950 border border-neutral-850 hover:border-emerald-500/40 text-[#778c63] hover:text-emerald-400"
                }`}
                title="浏览并管理尊贵贵宾的回访采访"
              >
                <Users className="w-3 h-3 emerald-400 shrink-0" />
                <span>业主采访</span>
              </button>

              <button
                onClick={() => navigate('/workflow')}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                  isWorkflowPage
                    ? "bg-cyan-500/20 border border-cyan-500/50 text-[#d9603f] shadow-sm"
                    : "bg-[#1a1310] hover:bg-neutral-950 border border-neutral-850 hover:border-cyan-500/40 text-[#c2452b] hover:text-[#d9603f]"
                }`}
                title="了解零损非侵入式高级调试流程"
              >
                <GitMerge className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>服务流程</span>
              </button>

              {/* 技术专栏按钮 - 导航到独立页面 */}
              <button
                onClick={() => navigate('/tech')}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                  isTechPage
                    ? "bg-purple-500/20 border border-purple-500/50 text-purple-300"
                    : "bg-[#1a1310] hover:bg-neutral-950 border border-neutral-850 hover:border-purple-500/40 text-[#a855f7] hover:text-purple-400"
                }`}
                title="阅读专业技术专栏文章"
              >
                <BookOpen className="w-3 h-3 text-purple-400 shrink-0" />
                <span>技术专栏</span>
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 ml-2 pl-3 border-l border-neutral-800">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setIsAdminDashboardOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-yellow-500/30 text-[11px] font-bold text-yellow-400 hover:text-yellow-300 transition-all cursor-pointer flex items-center gap-1.5"
                    title="打开后台管理"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>后台</span>
                  </button>
                  <button
                    onClick={logout}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-[11px] text-red-400 hover:text-red-300 transition-all cursor-pointer flex items-center gap-1.5"
                    title="退出登录"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>退出</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-yellow-500/10 to-amber-600/10 hover:from-yellow-500/20 hover:to-amber-600/20 border border-yellow-500/30 text-[11px] font-bold text-yellow-400 hover:text-yellow-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  title="管理员登录"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>管理员登录</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ====== 独立页面（技术专栏/环球艺术/业主采访/服务流程） ====== */}
      {isSubPage ? (
        <Routes>
          {/* 技术专栏 */}
          <Route path="/tech" element={<TechColumnPage />} />
          <Route path="/tech/:id" element={<TechArticlePage />} />
          {/* 环球艺术创造力 */}
          <Route path="/art" element={<ArtLandmarksPage />} />
          <Route path="/art/:id" element={<ArtLandmarkDetailPage />} />
          {/* 业主采访 */}
          <Route path="/interview" element={<InterviewsPage />} />
          <Route path="/interview/:id" element={<InterviewDetailPage />} />
          {/* 服务流程 */}
          <Route path="/workflow" element={<WorkflowPage />} />
          <Route path="/workflow/:id" element={<WorkflowDetailPage />} />
          {/* 服务分类 */}
          <Route path="/service" element={<Navigate to="/" replace />} />
          <Route path="/service/:slug" element={<ServiceCategoryPage />} />
        </Routes>
      ) : (
      <>
      {/* ====== 首页内容 ====== */}
      {/* Main Container Wrapper */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-10 relative z-10">
        
        {/* HORIZONTAL CONTACT BAR / 顶部横向联系方式 */}
        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contacts.length === 0 ? (
              <div className="md:col-span-3 py-6 text-center text-neutral-500 italic bg-neutral-900/25 border border-dashed border-neutral-850 rounded-xl text-xs">
                暂无联系方式，管理员登录后可添加
              </div>
            ) : (
              contacts.map((item) => {
                const isEditing = editingId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`bg-neutral-950/80 p-4 rounded-xl border transition-all ${
                      isEditing
                        ? 'border-yellow-500/30'
                        : 'border-neutral-800/80 hover:border-neutral-700'
                    } flex flex-col gap-2.5`}
                  >
                    {isEditing ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-1.5">
                          <select
                            value={editType}
                            onChange={(e) => setEditType(e.target.value as any)}
                            className="bg-neutral-950 border border-neutral-800 rounded px-1.5 py-1 text-[11px] text-neutral-200 focus:outline-none focus:border-yellow-500"
                          >
                            <option value="channel">视频号</option>
                            <option value="wechat">微信号</option>
                            <option value="phone">手机号</option>
                          </select>
                          <input
                            type="text"
                            value={editLabel}
                            onChange={(e) => setEditLabel(e.target.value)}
                            placeholder="位置标签"
                            className="flex-1 bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-[11px] text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-yellow-500"
                          />
                        </div>
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          placeholder="具体号码/名称"
                          className="bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-[11px] text-yellow-400 placeholder-neutral-600 font-semibold focus:outline-none focus:border-yellow-500"
                        />
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1 rounded bg-neutral-950 text-neutral-400 border border-neutral-800 hover:bg-neutral-900 cursor-pointer"
                            title="取消"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleSaveEdit(item.id)}
                            className="p-1 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20 cursor-pointer"
                            title="保存"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-850 shrink-0">
                          {item.type === 'channel' && <Video className="w-5 h-5 text-pink-400" />}
                          {item.type === 'wechat' && <MessageSquare className="w-5 h-5 text-emerald-400" />}
                          {item.type === 'phone' && <Phone className="w-5 h-5 text-cyan-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1">
                            {item.type === 'channel' && '📹 关注视频号'}
                            {item.type === 'wechat' && '💬 商务微信号'}
                            {item.type === 'phone' && '📞 地标预约线'}
                            <span className="opacity-60">({item.label})</span>
                          </span>
                          <span className="text-sm text-neutral-200 font-bold tracking-wider select-all block truncate">
                            {item.value}
                          </span>
                        </div>
                        {isLoggedIn && (
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleStartEdit(item)}
                              className="p-1.5 rounded hover:bg-yellow-500/10 text-neutral-400 hover:text-yellow-400 transition-colors cursor-pointer"
                              title="修改"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 rounded hover:bg-red-500/10 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                              title="删除"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {isAdding ? (
            <div className="mt-4 p-3 rounded-xl bg-neutral-900 border border-dashed border-yellow-500/30 flex flex-col gap-2 max-w-xl">
              <div className="flex justify-between items-center pb-1 border-b border-neutral-850">
                <span className="font-semibold text-[10px] text-yellow-400">➕ 添加新联系方式</span>
                <button onClick={() => setIsAdding(false)} className="text-neutral-500 hover:text-neutral-300 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="flex gap-2">
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-[85px] bg-neutral-950 border border-neutral-850 rounded px-1 text-[11px] text-neutral-200 focus:outline-none focus:border-yellow-500"
                >
                  <option value="channel">视频号</option>
                  <option value="wechat">微信号</option>
                  <option value="phone">手机号</option>
                </select>
                <input
                  type="text"
                  placeholder="标签(如:品牌部)"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="flex-1 bg-neutral-950 border border-neutral-850 rounded px-2 py-1 text-[11px] text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-yellow-500"
                />
              </div>
              <input
                type="text"
                placeholder="号码 / 视频号 / 微信号名称"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="bg-neutral-950 border border-neutral-850 rounded px-2 py-1 text-[11px] text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-yellow-500"
              />
              <div className="flex gap-1.5 justify-end mt-1">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-2.5 py-1 rounded bg-neutral-950 hover:bg-neutral-850 text-neutral-400 border border-neutral-800 text-[10px] font-medium cursor-pointer"
                >
                  取消
                </button>
                <button
                  onClick={handleAdd}
                  className="px-2.5 py-1 rounded bg-yellow-500 hover:bg-yellow-400 text-[#120e0b] text-[10px] font-bold cursor-pointer transition-colors"
                >
                  确认保存
                </button>
              </div>
            </div>
          ) : isLoggedIn ? (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setIsAdding(true)}
                className="flex-1 py-1.5 rounded-lg border border-dashed border-neutral-800 hover:border-yellow-500/40 text-neutral-400 hover:text-yellow-400 bg-neutral-900/20 hover:bg-yellow-500/5 transition-all text-[11px] flex items-center justify-center gap-1.5 cursor-pointer font-medium"
              >
                <Plus className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                新增联系渠道
              </button>
              <button
                onClick={handleReset}
                title="恢复默认配置"
                className="px-2.5 py-1.5 rounded-lg border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 bg-neutral-900/10 hover:bg-neutral-850 transition-all text-xs flex items-center justify-center cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 animate-spin-hover" />
              </button>
            </div>
          ) : null}
        </section>

        {/* THREE CORE TASK TABS (时尚美观导航) */}
        <section className="flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-900 pb-4 gap-4">
            
            {/* Real Nav Buttons */}
            <div className="flex bg-neutral-950 p-1.5 rounded-2xl border border-neutral-850 w-full sm:w-auto">
              <button
                id="tab-btn-showcase"
                onClick={() => setActiveTab('showcase')}
                className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'showcase'
                    ? "bg-gradient-to-r from-neutral-900 to-neutral-850 border border-yellow-500/30 text-yellow-400 shadow-md"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                十一大业务展廊
              </button>
            </div>

            {/* Accent helper tip */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
              <Leaf className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>形制合规 · 禅意美学 · 全案营造</span>
            </div>
          </div>

          {/* TAB CONTENTS PANELS WITH TRANSITIONS */}
          <div>
            {activeTab === 'showcase' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ShowcaseGallery />
              </motion.div>
            )}
          </div>
        </section>

        {/* HERO SECTION / 立面故事 */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-neutral-900 pb-10">
          
          <div className="md:col-span-12 flex flex-col gap-4 text-left relative overflow-hidden p-6 lg:p-8 rounded-2xl bg-neutral-950/50 border border-neutral-900/60 min-h-[310px] justify-center group/hero shadow-2xl">
            {/* Ambient Background fireworks effect */}
            <div className="absolute inset-0 z-0">
              <FireworksCanvas />
            </div>

            {/* 莲华曼陀罗淡纹水印 */}
            <svg
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] opacity-[0.05] text-yellow-500 pointer-events-none z-0"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            >
              <circle cx="100" cy="100" r="92" />
              <circle cx="100" cy="100" r="72" />
              <circle cx="100" cy="100" r="52" />
              <circle cx="100" cy="100" r="30" />
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={i} x1="100" y1="8" x2="100" y2="192" transform={`rotate(${i * 30} 100 100)`} />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <ellipse key={i} cx="100" cy="50" rx="13" ry="34" transform={`rotate(${i * 45} 100 100)`} />
              ))}
            </svg>

            {/* 管理员编辑/删除文字按钮（登录后可见，localStorage 自动保存） */}
            {isLoggedIn && (
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={() => setIsHeroEditing(!isHeroEditing)}
                  className="w-8 h-8 rounded-lg bg-neutral-900/80 hover:bg-yellow-500/20 border border-neutral-800 hover:border-yellow-500/40 text-neutral-400 hover:text-yellow-400 transition-all cursor-pointer flex items-center justify-center backdrop-blur-sm"
                  title={isHeroEditing ? '完成文字编辑（自动保存）' : '编辑文字'}
                >
                  {isHeroEditing ? <Check className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    if (heroParagraphs.length > 0 && window.confirm('确定清空 Hero 介绍文字吗？')) {
                      setHeroParagraphs([]);
                    }
                  }}
                  className="w-8 h-8 rounded-lg bg-neutral-900/80 hover:bg-red-500/20 border border-neutral-800 hover:border-red-500/40 text-neutral-400 hover:text-red-400 transition-all cursor-pointer flex items-center justify-center backdrop-blur-sm"
                  title="删除文字"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Content overlay */}
            <div className={`relative z-10 flex flex-col gap-4 ${isHeroEditing ? 'pointer-events-auto' : 'pointer-events-none'}`}>
              {/* 佛教风莲华分割线（替代原七彩 LED 灯带） */}
              <TempleDivider />

              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest text-[#c2452b] uppercase font-semibold">
                  ZENSPACE TEMPLE / 寺院空间 · 禅意营造
                </span>
              </div>

              {isHeroEditing ? (
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="pointer-events-auto w-full bg-neutral-900/80 border border-yellow-500/30 rounded-lg px-3 py-2 text-2xl sm:text-3xl lg:text-[38px] font-black text-neutral-100 focus:outline-none focus:border-yellow-500"
                  placeholder="输入标题"
                />
              ) : (
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight select-none leading-none">
                  <span className="animate-led-flow py-1">
                    {heroTitle}
                  </span>
                </h2>
              )}

              {isHeroEditing ? (
                <textarea
                  value={heroParagraphs.join('\n\n')}
                  onChange={(e) => setHeroParagraphs(e.target.value.split('\n').filter(p => p.trim()))}
                  className="pointer-events-auto w-full bg-neutral-900/80 border border-yellow-500/30 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-yellow-500 min-h-[160px] resize-y leading-relaxed"
                  placeholder="输入介绍文字，段落之间用空行分隔"
                />
              ) : (
                <div className="text-[12px] sm:text-xs lg:text-sm leading-relaxed max-w-2xl space-y-3">
                  {heroParagraphs.map((p, i) => (
                    <Fragment key={i}>{RgbParagraph({ text: p })}</Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>

        </section>

        {/* BOTTOM PHILOSOPHY SECTIONS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-neutral-900 pt-10">
          
          <div className="p-5 bg-neutral-950/40 border border-neutral-900 rounded-2xl flex flex-col gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-yellow-400">01 / 形制法度 (Form & Rite)</span>
            <h4 className="text-base font-semibold text-neutral-100">依制而筑，不逾规矩</h4>
            <p className="text-xs text-neutral-400 leading-relaxed mt-1">
              寺院以中轴对称、院落递进为骨，汉传、藏传、南传各有规制。我们依形制法度落笔，从总体格局到细部比例皆循礼法，杜绝任意发挥。
            </p>
          </div>

          <div className="p-5 bg-neutral-950/40 border border-neutral-900 rounded-2xl flex flex-col gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#c2452b]">02 / 禅意空间 (Zen Space)</span>
            <h4 className="text-base font-semibold text-neutral-100">留白与暖光，见光不见灯</h4>
            <p className="text-xs text-neutral-400 leading-relaxed mt-1">
              以留白、暖色低色温光与天然材质营造静谧，灯具深藏不显，让光成为礼敬而非喧哗，使殿宇在夜色中更显肃穆庄严。
            </p>
          </div>

          <div className="p-5 bg-neutral-950/40 border border-neutral-900 rounded-2xl flex flex-col gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-purple-400">03 / 文脉传承 (Heritage)</span>
            <h4 className="text-base font-semibold text-neutral-100">古建零损伤，法脉永续</h4>
            <p className="text-xs text-neutral-400 leading-relaxed mt-1">
              对古老彩绘与榫卯木作施行非破坏性保护，以张力抱箍零损伤承载设备，让千年法脉在当代营造中安然延续。
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-neutral-900 pt-8 pb-4 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
          <div>
            <p>© 2026 寺庙佛教设计 ZENSPACE DESIGN. All Rights Reserved.</p>
            <p className="mt-1 text-[10px] text-neutral-600">汉传·藏传·南传佛教设计 · 道教宫观设计 · 寺庙建筑·室内·景观·灯光一体化营造</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px]">
            <a href="#ai-smart-consultant" className="hover:text-yellow-400 transition-colors">智能寺庙设计顾问</a>
            {filing && (
              <>
                {filing.image && (
                  <img src={filing.image} alt="ICP备案" className="h-5 w-auto opacity-80" />
                )}
                {filing.icpNumber && (
                  <a
                    href={filing.icpUrl || 'https://beian.miit.gov.cn'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    {filing.icpNumber}
                  </a>
                )}
                {filing.policeNumber && (
                  <a
                    href={filing.policeUrl || 'https://www.beian.gov.cn'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    {filing.policeNumber}
                  </a>
                )}
              </>
            )}
          </div>
        </footer>

      </div>
      </>
      )}

      {/* Login Modal - 全局显示 */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Admin Dashboard - 全局显示 */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
      />

      {/* Header Modals (Art/Interview/Workflow) - 仅首页显示 */}
      {!isTechPage && activeHeaderModal && (
        <HeaderModals 
          type={activeHeaderModal} 
          onClose={() => setActiveHeaderModal(null)} 
        />
      )}
    </div>
  );
}
