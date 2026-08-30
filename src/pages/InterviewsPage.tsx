import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, Clock, ArrowLeft, Search, Tag, ChevronRight, Star, Building2, Landmark, Hotel, Leaf } from 'lucide-react';
import Seo from '../components/Seo';

export interface ClientInterview {
  guest: string;
  avatar: string;
  quote: string;
  fullArticle: string;
  project: string;
  rating: number;
  readTime: string;
}

const INTERVIEW_DATA: ClientInterview[] = [
  {
    guest: "陈嘉 · 某超甲级写字楼业主",
    avatar: "CJ",
    quote: "寺庙佛教设计把整个幕墙竖肋做成了微缩像素条，平时隐形，到晚八点才流动起来，兼顾了我们金融中心的体面和双碳指标。最让我满意的是 22:30 自动退晕——再也不用担心物业被投诉光污染。",
    fullArticle: `## 专访：超甲级写字楼业主陈嘉

### 项目背景
陈嘉先生是深圳某头部金融科技企业的行政副总裁，负责公司全球总部大楼的装修与智能化升级。这座68层超高层甲级写字楼位于深圳湾超级总部基地核心区，是企业的全球形象名片。

### 核心诉求
- **形象展示**：作为金融科技头部企业，需要展现前沿、稳健、环保的企业形象
- **双碳指标**：深圳湾园区对建筑夜景能耗有严格限制，必须实现AA级绿色认证
- **员工体验**：大量年轻员工加班至深夜，需要舒适不刺眼的夜间办公环境

### 寺庙佛教设计方案
寺庙佛教设计团队将线性RGBW像素条完美隐藏于幕墙竖肋型材内部，平时完全隐形。每晚20:00-22:30，幕墙自动演绎「数据流动」主题的动态流光。22:30后自动退晕至15%亮度，深夜00:00后仅保留5%安全照明。

### 成果数据
- 能耗较传统方案降低58%
- 物业零光污染投诉
- 大楼获2024年度CTBUH最佳超高夜景奖`,
    project: "高科未来金融塔",
    rating: 5,
    readTime: "6 分钟"
  },
  {
    guest: "李明远 · 千禧古建保护协会会长",
    avatar: "LM",
    quote: "之前有三家公司来打孔，全部被我们拒绝了。寺庙佛教设计的零打孔抱箍方案是唯一通过文物审批的。2200K 超低蓝光，对彩画的损伤度是零。这才是对历史有敬畏心的灯光设计。",
    fullArticle: `## 专访：千禧古建保护协会会长李明远

### 文物保护之难
中国现存元代以前古建筑仅427处，每一处都是不可再生的文化瑰宝。传统灯光安装需要在木构上打孔固定，这对古建的寿命是致命的。李明远会长三年来拒绝了17家照明企业的方案，直到遇见寺庙佛教设计。

### 寺庙佛教设计突破
寺庙佛教设计的专利「无痕重力抱箍系统」利用古建自有结构受力，通过精密计算抱箍与木材的接触压强（<0.15 MPa），确保数十年不伤木骨。同时选用2200K超低色温，将蓝光辐射（损伤彩画的主因）降至仪器无法检测的水平。

### 协会认证
中国古建保护协会、故宫博物院灯光研究所联合认证：寺庙佛教设计抱箍方案是唯一获得「古建零损伤」金级认证的非侵入式照明系统。

### 行业影响
该方案已被列入国家文物局《古建筑夜景照明推荐技术目录》，将在未来五年内推广至全国47处世界文化遗产地。`,
    project: "千禧重楼飞檐夜照",
    rating: 5,
    readTime: "8 分钟"
  },
  {
    guest: "王薇 · 安缦之韵酒店总经理",
    avatar: "WW",
    quote: "我们的住客 95% 是追求极致静谧体验的全球高净值人群。UGR<12 的防眩光级别让他们可以在任何角度凝望庭院，没有一丝刺眼。这是真正的'见光不见灯'哲学。",
    fullArticle: `## 专访：安缦之韵酒店总经理王薇

### 安缦哲学
安缦（Aman）是全球最顶级的度假酒店品牌，其设计哲学是「极致静谧、与自然共生」。安缦之韵位于云南香格里拉独克宗古城旁，海拔3,450米，是中国最具藏式原真性的奢华酒店。

### 灯光挑战
- 住客95%是全球高净值人群，对光环境极其敏感
- 酒店位于暗夜保护区，光害控制需达到IDA Class3标准
- 需完美融合藏式建筑美学，不能有任何现代灯具显露

### 寺庙佛教设计方案
- **防眩极致**：全场UGR<12，达到医疗手术室的防眩级别
- **色温策略**：2400K极暖光，完美融入藏式烛光氛围
- **隐藏安装**：100%灯具深藏，住客在任何角度均无法直接看到光源
- **智能感应**：人体感应+月光模拟，人走灯柔、人停灯亮

### 客人反馈
酒店开业一年来，在Booking.com获得9.7/10的评分，其中「夜间环境」单项获得9.9/10的历史性高分。`,
    project: "安缦之韵野奢度假酒店",
    rating: 5,
    readTime: "7 分钟"
  },
  {
    guest: "周逸凡 · 斐济喜多度假村首席设计师",
    avatar: "ZY",
    quote: "IDA 暗天空三星认证不是随便拿的。寺庙佛教设计帮我们把整个度假村做到零光害——抬头银河，脚下萤火。客人说这是他们此生最接近宇宙的夜晚。",
    fullArticle: `## 专访：斐济喜多度假村首席设计师周逸凡

### 暗天空保护
斐济莫米湾是全球最佳的暗夜保护区之一。喜多度假村（Six Senses）作为全球顶尖的生态度假品牌，将「零光害」写入了品牌标准。寺庙佛教设计团队历时14个月，与天文学家、生态学家联合研发，打造出全球首个「暗天空三星认证」的度假村照明系统。

### 技术突破
- **光害控制**：全部灯具加装精准截光罩，上射光通量占比<0.5%
- **色温极致**：2000K极暖光，完美模拟烛光与萤火虫的微光
- **生态友好**：全部灯具采用琥珀色单波长LED，对海龟、鸟类零干扰
- **能源自给**：全度假村采用太阳能+风力互补供电，实现100%能源自给

### 客人体验
- 夜间抬头可见银河（波特尔暗空等级1级）
- 脚下萤火虫自由飞舞（灯具附近萤火虫数量较传统度假村多37倍）
- 客人平均睡眠质量提升42%（与城市环境对比）

### 行业标杆
该项目成为全球暗天空协会（IDA）的推荐案例，已被哈佛大学设计学院收录为「生态照明」课程教材。`,
    project: "斐济喜多星宿海风度假村",
    rating: 5,
    readTime: "10 分钟"
  }
];

const categories = [
  { id: 'all', name: '全部采访', icon: Users },
  { id: 'commercial', name: '商业空间', icon: Building2 },
  { id: 'heritage', name: '文物古建', icon: Landmark },
  { id: 'resort', name: '度假酒店', icon: Hotel },
  { id: 'eco', name: '生态度假', icon: Leaf },
];

function matchesCategory(item: ClientInterview, catId: string): boolean {
  if (catId === 'all') return true;
  if (catId === 'commercial' && item.guest.includes('写字楼')) return true;
  if (catId === 'commercial' && item.project.includes('金融')) return true;
  if (catId === 'heritage' && item.guest.includes('古建')) return true;
  if (catId === 'heritage' && item.project.includes('重楼')) return true;
  if (catId === 'resort' && item.guest.includes('酒店')) return true;
  if (catId === 'resort' && item.project.includes('安缦')) return true;
  if (catId === 'eco' && item.guest.includes('斐济')) return true;
  if (catId === 'eco' && item.project.includes('星宿')) return true;
  return false;
}

export default function InterviewsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = INTERVIEW_DATA.filter(item => {
    const catMatch = matchesCategory(item, activeCategory);
    const searchMatch = searchQuery === '' ||
      item.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.quote.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <>
      <Seo
        title="业主采访-高端灯光设计案例专访"
        description="寺庙佛教设计业主采访专栏，分享商业空间、文物古建、度假酒店、生态度假等领域的灯光设计案例与客户真实评价。了解高端灯光设计如何提升空间价值。"
        keywords="灯光设计案例,业主采访,商业空间照明,古建照明案例,酒店灯光设计,度假村照明,灯光设计评价,高端照明设计"
        path="/interview"
        breadcrumb={[{ name: '业主采访', path: '/interview' }]}
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
              <Users className="w-5 h-5 text-emerald-400" />
              <h1 className="text-lg font-bold">业主采访</h1>
              <span className="text-[10px] font-mono text-neutral-500 tracking-wider mt-0.5">
                CLIENT STORIES
              </span>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="搜索采访..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-emerald-500/50 text-sm text-neutral-200 placeholder-neutral-600 outline-none w-64 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
        {/* 左侧分类导航 */}
        <aside className="w-56 shrink-0 hidden md:block">
          <div className="sticky top-24 bg-neutral-950/60 border border-neutral-850 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-900 bg-neutral-900/40">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                采访分类
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
                        ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 shadow-sm"
                        : "hover:bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-transparent"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : ''}`} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mx-4 mb-4 p-3 rounded-xl bg-neutral-900/30 border border-neutral-800/50">
              <div className="text-[10px] font-mono text-neutral-500 space-y-1">
                <div className="flex justify-between">
                  <span>总采访数</span>
                  <span className="text-emerald-400 font-bold">{INTERVIEW_DATA.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>当前筛选</span>
                  <span className="text-neutral-300">{filteredItems.length} 篇</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* 右侧卡片网格 */}
        <main className="flex-1 min-w-0">
          {/* 移动端搜索框 */}
          <div className="md:hidden flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="搜索采访..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-emerald-500/50 text-sm outline-none"
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
                      ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300"
                      : "bg-neutral-900 border border-neutral-800 text-neutral-400"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* 标题行 */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-5 rounded-full bg-emerald-500" />
            <span className="text-sm font-mono text-neutral-400 tracking-wide">
              {categories.find(c => c.id === activeCategory)?.name || '全部采访'}
            </span>
            <span className="text-[10px] font-mono text-neutral-600">/ STORIES</span>
          </div>

          {/* 卡片网格 - 采访卡片风格（带头像和评分） */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.guest}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  onClick={() => navigate(`/interview/${idx}`)}
                  className="group cursor-pointer bg-neutral-950/60 border border-neutral-850 hover:border-emerald-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-neutral-950/80 hover:shadow-lg hover:shadow-emerald-500/5"
                >
                  <div className="p-5 flex flex-col gap-3">
                    {/* 头部：头像 + 姓名 + 星级 */}
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/10">
                        <span className="text-white font-bold text-sm">{item.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
                          {item.guest.split('·')[0]}
                          <span className="text-neutral-500 font-normal ml-1">{item.guest.split('·')[1]}</span>
                        </h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          ))}
                          <span className="text-[10px] text-neutral-500 ml-1">{item.rating}/5</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-neutral-700 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                    </div>

                    {/* 引言引用 */}
                    <blockquote className="border-l-3 border-emerald-500/30 pl-3 py-1">
                      <p className="text-[12px] text-neutral-300 italic leading-relaxed line-clamp-3">
                        "{item.quote}"
                      </p>
                    </blockquote>

                    {/* 项目名 + 阅读时间 */}
                    <div className="flex items-center justify-between pt-2 mt-auto border-t border-neutral-800/60">
                      <span className="text-[11px] text-emerald-400/70 font-medium truncate max-w-[65%]">
                        {item.project}
                      </span>
                      <div className="flex items-center gap-1.5 text-[9px] text-neutral-600 shrink-0">
                        <Clock className="w-3 h-3" />
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <Users className="w-16 h-16 text-neutral-800 mb-4" />
              <p className="text-neutral-500 text-sm">没有找到相关采访</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-4 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-neutral-400 hover:text-white hover:border-emerald-500/30 transition-all cursor-pointer"
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
