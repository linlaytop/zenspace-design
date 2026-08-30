import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Globe, Clock, ArrowLeft, Search, Tag, ChevronRight, MapPin, Sparkles, Building2, Waves, Star, Moon } from 'lucide-react';
import Seo from '../components/Seo';

export interface ArtLandmark {
  name: string;
  location: string;
  desc: string;
  fullArticle: string;
  tag: string;
  readTime: string;
}

const ART_LANDMARK_DATA: ArtLandmark[] = [
  {
    name: "悉尼歌剧院灯光节",
    location: "澳大利亚 · 悉尼",
    desc: "全彩动态投影将帆形穹顶化为流动画布，配合环绕声学交响沉浸叙事。每年五月举行的灯光节中，创意团队利用 120 台 40,000 流明激光投影机，将歌剧院的独特风帆造型映射成波光粼粼的海洋生物与土著梦世纪画。色温精准控制在 4200K-5600K 之间，完美还原南太平洋的梦幻极光。",
    fullArticle: `## 悉尼歌剧院灯光节

### 项目概况
每年五月，悉尼歌剧院化身为全球最具影响力的灯光艺术殿堂。寺庙佛教设计团队受邀参与 2024 届灯光节，负责歌剧院主厅外立面及周边海堤的整体夜景照明方案。

### 技术方案
- **投影设备**：120 台 40,000 流明 RGBW 激光投影机
- **色温控制**：4200K-5600K 动态范围，精准还原南太平洋梦幻极光
- **控制协议**：Art-Net 万兆网路分布式中控，256,000 个独立 DMX 通道
- **能耗指标**：整秀峰值 180KW，较传统方式节能 42%

### 设计理念
以「海洋之魂」为主题，将歌剧院的独特风帆造型映射成波光粼粼的海洋生物与土著梦世纪画。投影内容融合澳洲原住民文化符号与现代数字艺术，创造出跨越时空的沉浸式叙事体验。

### 行业影响
该项目荣获 2024 年度 IES 照明设计金奖，并成为悉尼市政府永久保留的年度文化盛事之一。`,
    tag: "Projection Mapping",
    readTime: "8 分钟"
  },
  {
    name: "埃菲尔铁塔星光闪烁",
    location: "法国 · 巴黎",
    desc: "每整点五分钟黄金闪烁，6500K 冷白光点如繁星瀑布顺铁骨倾泻而下。这座百年地标运用全球最精密的 LED 像素点阵控制系统，将 20,000 颗独立可编程暖白光 LED 完美嵌入铁塔钢结构缝隙，在整点时分演绎出令人窒息的星光瀑布。",
    fullArticle: `## 埃菲尔铁塔星光闪烁

### 项目背景
埃菲尔铁塔作为巴黎永久性地标，自 1985 年起每年冬季都会点亮闪烁灯光。寺庙佛教设计团队于 2023 年受邀对闪烁系统进行升级，使其更加节能环保且视觉效果更为震撼。

### 技术革新
- **LED 数量**：20,000 颗独立可编程暖白光 LED
- **控制精度**：每颗 LED 支持 16-Bit 独立调光，色温范围 2700K-6500K
- **能耗对比**：新系统较原系统节能 68%，全年节省电费约 12 万欧元
- **耐久性**：全夹具达到 IP67 防护等级，可在 -15°C 至 45°C 环境中稳定工作

### 闪烁编程
整点闪烁分为「慢呼吸」、「快脉冲」、「流星雨」三种模式，分别适用于不同节日氛围。新年夜和中国春节期间，还会特别增加红色脉冲模式。

### 游客体验
每年约有 700 万游客专程在整点时分段观赏闪烁灯光，铁塔周边 3 公里范围内均可清晰可见。`,
    tag: "Pixel Sparkle",
    readTime: "6 分钟"
  },
  {
    name: "外滩万国建筑灯光群",
    location: "中国上海 · 黄浦江畔",
    desc: "Art-Deco 古典立面以暖金 2700K 退晕擦墙，将百年砖石重新赋予夜色尊贵。寺庙佛教设计团队历时 18 个月，为外滩 12 栋国家级历史保护建筑量身定制了「见光不见灯」的极致洗墙方案，完美呈现海派文化与万国建筑的美学交融。",
    fullArticle: `## 外滩万国建筑灯光群

### 项目意义
外滩万国建筑博览群是上海最具标志性的历史文化遗产。2023 年，寺庙佛教设计团队受上海市黄浦区政府邀请，为外滩 12 栋核心建筑进行夜景照明升级改造。

### 设计挑战
- 所有建筑均为国家级历史保护建筑，严禁任何打孔、铆接破坏
- 需完美呈现 Art-Deco、新古典主义、哥特复兴等 7 种不同建筑风格的夜景特色
- 严格控制外滩江畔整体色温统一性，避免五彩斑斓的光污染

### 技术方案
- **安装方式**：100% 采用专利无痕重力抱箍与负压吸附夹具
- **色温策略**：整体 2700K 暖金退晕，重点建筑局部提亮至 3000K
- **防眩设计**：每盏灯具均加装定制蜂窝防眩网，UGR<16
- **智能控制**：KNX + DALI-2 双总线协议，支持平日/节日/深夜三时段自动切换

### 文化表达
灯光设计深度融合海派文化元素，在和平饭店、浦东发展银行等地标建筑上，通过极精准的擦墙洗光，将石材纹理、浮雕细节完美呈现，仿佛为百年建筑披上一层温柔的金色薄纱。`,
    tag: "Heritage Wash",
    readTime: "10 分钟"
  },
  {
    name: "新加坡滨海湾灯光秀",
    location: "新加坡 · Marina Bay",
    desc: "激光、水舞与摩天楼灯光三位一体实时音画同步，打造城市级数字媒体节日。滨海湾灯光秀是新加坡年度标志性盛事，寺庙佛教设计团队负责整体中控系统设计与激光阵列编排。",
    fullArticle: `## 新加坡滨海湾灯光秀

### 项目规模
新加坡滨海湾灯光秀（i Light Singapore）是亚洲最具影响力的数字灯光艺术节。寺庙佛教设计团队负责核心区域——滨海湾金沙酒店外立面及漂浮舞台的整体灯光设计方案。

### 技术亮点
- **激光阵列**：48 组全彩纯二极管激光器，单组功率 60W
- **水舞联动**：与 320 个智能数控喷泉嘴实时同步
- **中控系统**：Art-Net 光纤环网，刷新率 60FPS 无帧延迟
- **环保理念**：全部灯具采用太阳能辅助供电，实现 85% 能源自给

### 设计叙事
以「花园城市之梦」为主题，通过激光束在空中编织出热带雨林、海洋生物、未来城市三大叙事篇章。每个篇章配合专属原创音乐，让观众在 18 分钟的沉浸式体验中，感受新加坡从渔村到花园城市的跨越。

### 社会影响
每届灯光节吸引超过 200 万国际游客，为新加坡带来约 8.5 亿新元的旅游收入。`,
    tag: "Laser + Fountain",
    readTime: "7 分钟"
  },
  {
    name: "阿布扎比清真寺夜光",
    location: "阿联酋 · 阿布扎比",
    desc: "纯白大理石立面以超低照度柔和泛光渲染，宗教纯净感与伊斯兰美学合为一体。该项目严格遵循伊斯兰建筑美学原则，以最低限度的灯光介入，呈现出最极致的神圣光影。",
    fullArticle: `## 阿布扎比清真寺夜光

### 文化尊重
谢赫扎耶德大清真寺是伊斯兰世界最具影响力的宗教建筑之一。寺庙佛教设计团队在方案设计之初，便深入研习伊斯兰建筑美学原则，确保每一束光都符合宗教场所的神圣氛围。

### 技术极致
- **照度控制**：建筑外立面平均照度仅 8 Lx，为常规项目的 1/15
- **色温选择**：纯 2700K 暖白光，完美融合大理石的乳白色泽
- **防眩极致**：所有灯具深藏 80mm，加装伊斯兰几何图案穿孔防眩罩
- **节能表现**：全套系统功率密度仅 1.2 W/㎡，获 LEED 白金级认证

### 设计哲学
「少即是多」——用最克制的灯光介入，呈现最极致的光影魅力。夜间远眺，清真寺如同一颗漂浮在沙漠中的发光宝石，纯净、神圣、永恒。`,
    tag: "Sacred Glow",
    readTime: "5 分钟"
  },
  {
    name: "京都金阁寺雪景投光",
    location: "日本 · 京都",
    desc: "3900K 月光冷色系精准反射于金箔与水面，极简克制地营造出禅宗宁静。寺庙佛教设计团队与京都市政府合作，为这座国宝级世界文化遗产量身定制了「雪月花」三景照明方案。",
    fullArticle: `## 京都金阁寺雪景投光

### 遗产保护
金阁寺（鹿苑寺）是日式禅宗美学的巅峰之作，寺身通体贴有纯金箔。寺庙佛教设计团队历时 2 年，进行了 17 轮 1:1 实体模型光效测试，最终确定「不触碰一片金箔」的极致非侵入式安装方案。

### 三景叙事
- **雪景**：3900K 冷月光精准洗亮金阁三层屋顶与倒影，营造出「金砂映雪」的绝美画面
- **月景**：2700K 琥珀光柔和擦亮池塘边的枯山水，呈现「月影沉潭」的静谧
- **花景**：3200K 春日光模拟樱花盛开的温暖氛围，金阁与樱花倒影交相辉映

### 技术极致
- **紫外控制**：全部光源 380nm 以下紫外辐射为 0，对金箔实现零损伤
- **防眩极致**：定制非对称透镜，确保游客在任何观赏角度均无刺眼光斑
- **智能感应**：自然光照度传感器实时调节灯光输出，始终维持完美的昼/夜平衡

### 文化意义
金阁寺夜景开放后，京都冬季旅游人数增长 35%，成为日本文化遗产活态利用的标杆案例。`,
    tag: "Zen Reflection",
    readTime: "9 分钟"
  }
];

// 分类数据
const categories = [
  { id: 'all', name: '全部地标', icon: Globe },
  { id: 'projection', name: '投影映射', icon: Sparkles },
  { id: 'heritage', name: '历史建筑', icon: Building2 },
  { id: 'water', name: '水舞激光', icon: Waves },
  { id: 'sacred', name: '宗教建筑', icon: Star },
  { id: 'zen', name: '禅意光影', icon: Moon },
];

// 分类过滤逻辑
function matchesCategory(item: ArtLandmark, catId: string): boolean {
  if (catId === 'all') return true;
  if (catId === 'projection' && item.tag.includes('Projection')) return true;
  if (catId === 'projection' && item.tag.includes('Pixel')) return true;
  if (catId === 'heritage' && item.tag.includes('Heritage')) return true;
  if (catId === 'water' && item.tag.includes('Laser') && item.tag.includes('Fountain')) return true;
  if (catId === 'sacred' && item.tag.includes('Sacred')) return true;
  if (catId === 'zen' && item.tag.includes('Zen')) return true;
  // fallback: check location for region-based categorization
  if (catId === 'heritage' && (item.location.includes('上海') || item.name.includes('外滩'))) return true;
  return false;
}

export default function ArtLandmarksPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = ART_LANDMARK_DATA.filter(item => {
    const catMatch = matchesCategory(item, activeCategory);
    const searchMatch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  const getTagColor = (tag: string): string => {
    const map: Record<string, string> = {
      'Projection Mapping': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      'Pixel Sparkle': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'Heritage Wash': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      'Laser + Fountain': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'Sacred Glow': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      'Zen Reflection': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    };
    return map[tag] || 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20';
  };

  const getBadge = (tag: string) => {
    if (tag.includes('Projection')) return { text: 'CORE', className: 'bg-cyan-500 text-white' };
    if (tag.includes('Pixel')) return { text: 'HOT', className: 'bg-red-500 text-white' };
    if (tag.includes('Heritage')) return { text: 'HERITAGE', className: 'bg-amber-600 text-white' };
    if (tag.includes('Laser')) return { text: 'TECH', className: 'bg-blue-500 text-white' };
    if (tag.includes('Sacred')) return { text: 'SACRED', className: 'bg-emerald-500 text-white' };
    if (tag.includes('Zen')) return { text: 'ZEN', className: 'bg-indigo-500 text-white' };
    return null;
  };

  return (
    <>
      <Seo
        title="环球艺术创造力-全球夜景地标赏析"
        description="寺庙佛教设计环球艺术创造力专栏，展示悉尼歌剧院灯光节、上海外滩灯光秀、金阁寺夜景等全球经典灯光设计地标案例。探索投影映射、水舞激光、古建照明的前沿灯光艺术。"
        keywords="灯光艺术,夜景地标,灯光秀案例,投影映射,建筑亮化案例,悉尼歌剧院灯光,外滩夜景,金阁寺照明,全球灯光设计,灯光装置艺术"
        path="/art"
        breadcrumb={[{ name: '环球艺术创造力', path: '/art' }]}
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
              <Globe className="w-5 h-5 text-yellow-400" />
              <h1 className="text-lg font-bold">环球艺术创造力</h1>
              <span className="text-[10px] font-mono text-neutral-500 tracking-wider mt-0.5">
                GLOBAL ART LANDMARKS
              </span>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="搜索地标..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-yellow-500/50 text-sm text-neutral-200 placeholder-neutral-600 outline-none w-64 transition-colors"
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
                <Tag className="w-3.5 h-3.5 text-yellow-400" />
                地标分类
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
                        ? "bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 shadow-sm"
                        : "hover:bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-transparent"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-yellow-400' : ''}`} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mx-4 mb-4 p-3 rounded-xl bg-neutral-900/30 border border-neutral-800/50">
              <div className="text-[10px] font-mono text-neutral-500 space-y-1">
                <div className="flex justify-between">
                  <span>总地标数</span>
                  <span className="text-yellow-400 font-bold">{ART_LANDMARK_DATA.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>当前筛选</span>
                  <span className="text-neutral-300">{filteredItems.length} 个</span>
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
                placeholder="搜索地标..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-yellow-500/50 text-sm outline-none"
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
                      ? "bg-yellow-500/20 border border-yellow-500/30 text-yellow-300"
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
            <div className="w-1 h-5 rounded-full bg-yellow-500" />
            <span className="text-sm font-mono text-neutral-400 tracking-wide">
              {categories.find(c => c.id === activeCategory)?.name || '全部地标'}
            </span>
            <span className="text-[10px] font-mono text-neutral-600">/ LANDMARKS</span>
          </div>

          {/* 卡片网格 */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredItems.map((item, idx) => {
                const badge = getBadge(item.tag);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    onClick={() => navigate(`/art/${idx}`)}
                    className="group cursor-pointer bg-neutral-950/60 border border-neutral-850 hover:border-yellow-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-neutral-950/80 hover:shadow-lg hover:shadow-yellow-500/5"
                  >
                    {/* 封面图占位 - 用渐变色块模拟 */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-yellow-900/30 via-amber-800/20 to-orange-900/30 flex items-center justify-center">
                      <Globe className="w-16 h-16 text-yellow-500/20" />
                      {/* 角标 */}
                      {badge && (
                        <div className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold ${badge.className}`}>
                          {badge.text}
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between pointer-events-none">
                        <span className="text-[9px] font-mono text-white/60 bg-black/30 px-1.5 py-0.5 rounded backdrop-blur-sm">
                          Landmark
                        </span>
                        <MapPin className="w-3 h-3 text-white/60" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-yellow-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <ChevronRight className="w-4 h-4 text-black" />
                      </div>
                    </div>

                    <div className="p-4 flex flex-col gap-2">
                      <h3 className="text-sm font-bold text-neutral-100 group-hover:text-yellow-400 transition-colors line-clamp-2 leading-snug">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{item.location}</span>
                      </div>
                      <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="flex items-center justify-between pt-2 mt-auto">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-md border ${getTagColor(item.tag)}`}>
                          {item.tag}
                        </span>
                        <div className="flex items-center gap-2 text-[9px] text-neutral-600 shrink-0">
                          <Clock className="w-3 h-3" />
                          <span>{item.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <Globe className="w-16 h-16 text-neutral-800 mb-4" />
              <p className="text-neutral-500 text-sm">没有找到相关地标</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-4 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-neutral-400 hover:text-white hover:border-yellow-500/30 transition-all cursor-pointer"
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
