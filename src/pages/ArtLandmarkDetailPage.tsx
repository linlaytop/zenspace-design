import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, MapPin, Tag, Globe, ChevronRight, Quote } from 'lucide-react';

const ART_LANDMARK_DATA = [
  {
    name: "悉尼歌剧院灯光节",
    location: "澳大利亚 · 悉尼",
    desc: "全彩动态投影将帆形穹顶化为流动画布，配合环绕声学交响沉浸叙事。",
    fullArticle: `## 悉尼歌剧院灯光节

### 项目概况
每年五月，悉尼歌剧院化身为全球最具影响力的灯光艺术殿堂。禅境设计设计团队受邀参与 2024 届灯光节，负责歌剧院主厅外立面及周边海堤的整体夜景照明方案。

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
    desc: "每整点五分钟黄金闪烁，6500K 冷白光点如繁星瀑布顺铁骨倾泻而下。",
    fullArticle: `## 埃菲尔铁塔星光闪烁

### 项目背景
埃菲尔铁塔作为巴黎永久性地标，自 1985 年起每年冬季都会点亮闪烁灯光。禅境设计设计团队于 2023 年受邀对闪烁系统进行升级。

### 技术革新
- **LED 数量**：20,000 颗独立可编程暖白光 LED
- **控制精度**：每颗 LED 支持 16-Bit 独立调光，色温范围 2700K-6500K
- **能耗对比**：新系统较原系统节能 68%，全年节省电费约 12 万欧元
- **耐久性**：全夹具达到 IP67 防护等级，可在 -15°C 至 45°C 环境中稳定工作

### 闪烁编程
整点闪烁分为「慢呼吸」、「快脉冲」、「流星雨」三种模式，分别适用于不同节日氛围。

### 游客体验
每年约有 700 万游客专程在整点时分段观赏闪烁灯光，铁塔周边 3 公里范围内均可清晰可见。`,
    tag: "Pixel Sparkle",
    readTime: "6 分钟"
  },
  {
    name: "外滩万国建筑灯光群",
    location: "中国上海 · 黄浦江畔",
    desc: "Art-Deco 古典立面以暖金 2700K 退晕擦墙，将百年砖石重新赋予夜色尊贵。",
    fullArticle: `## 外滩万国建筑灯光群

### 项目意义
外滩万国建筑博览群是上海最具标志性的历史文化遗产。2023年，禅境设计设计团队受上海市黄浦区政府邀请，为外滩12栋核心建筑进行夜景照明升级改造。

### 设计挑战
- 所有建筑均为国家级历史保护建筑，严禁任何打孔、铆接破坏
- 需完美呈现 Art-Deco、新古典主义、哥特复兴等7种不同建筑风格
- 严格控制色温统一性，避免五彩斑斓的光污染

### 技术方案
- **安装方式**：100% 采用专利无痕重力抱箍与负压吸附夹具
- **色温策略**：整体2700K暖金退晕，重点建筑局部提亮至3000K
- **防眩设计**：每盏灯具均加装定制蜂窝防眩网，UGR<16
- **智能控制**：KNX + DALI-2双总线协议，支持三时段自动切换

### 文化表达
灯光深度融合海派文化元素，在和平饭店等地标上通过极精准擦墙洗光，将石材纹理完美呈现，仿佛为百年建筑披上一层金色薄纱。`,
    tag: "Heritage Wash",
    readTime: "10 分钟"
  },
  {
    name: "新加坡滨海湾灯光秀",
    location: "新加坡 · Marina Bay",
    desc: "激光、水舞与摩天楼灯光三位一体实时音画同步，打造城市级数字媒体节日。",
    fullArticle: `## 新加坡滨海湾灯光秀

### 项目规模
新加坡滨海湾灯光秀（i Light Singapore）是亚洲最具影响力的数字灯光艺术节。禅境设计设计团队负责核心区域——滨海湾金沙酒店外立面及漂浮舞台整体灯光设计方案。

### 技术亮点
- **激光阵列**：48组全彩纯二极管激光器，单组功率60W
- **水舞联动**：与320个智能数控喷泉嘴实时同步
- **中控系统**：Art-Net光纤环网，刷新率60FPS无帧延迟
- **环保理念**：全部灯具采用太阳能辅助供电，实现85%能源自给

### 设计叙事
以「花园城市之梦」为主题，通过激光束编织热带雨林、海洋生物、未来城市三大篇章。

### 社会影响
每届吸引超过200万国际游客，为新加坡带来约8.5亿新元旅游收入。`,
    tag: "Laser + Fountain",
    readTime: "7 分钟"
  },
  {
    name: "阿布扎比清真寺夜光",
    location: "阿联酋 · 阿布扎比",
    desc: "纯白大理石立面以超低照度柔和泛光渲染，宗教纯净感与伊斯兰美学合为一体。",
    fullArticle: `## 阿布扎比清真寺夜光

### 文化尊重
谢赫扎耶德大清真寺是伊斯兰世界最具影响力的宗教建筑之一。禅境设计团队深入研习伊斯兰美学原则，确保每一束光符合宗教场所神圣氛围。

### 技术极致
- **照度控制**：平均照度仅8 Lx（常规项目的1/15）
- **色温选择**：纯2700K暖白光，融合大理石乳白色泽
- **防眩极致**：灯具深藏80mm，加装几何图案穿孔防眩罩
- **节能表现**：功率密度仅1.2 W/㎡，获LEED白金级认证

### 设计哲学
「少即是多」——用最克制的灯光介入，呈现最极致的光影魅力。`,
    tag: "Sacred Glow",
    readTime: "5 分钟"
  },
  {
    name: "京都金阁寺雪景投光",
    location: "日本 · 京都",
    desc: "3900K 月光冷色系精准反射于金箔与水面，极简克制地营造出禅宗宁静。",
    fullArticle: `## 京都金阁寺雪景投光

### 遗产保护
金阁寺是日式禅宗美学的巅峰之作，通体贴有纯金箔。历时2年，17轮1:1实体模型测试，确定「不触碰一片金箔」的非侵入式安装方案。

### 三景叙事
- **雪景**：3900K冷月光精准洗亮三层屋顶与倒影
- **月景**：2700K琥珀光柔和擦亮枯山水
- **花景**：3200K春日光模拟樱花温暖氛围

### 技术极致
- 紫外辐射为0，对金箔零损伤
- 定制非对称透镜，任意角度无刺眼光斑
- 自然光照度传感器实时调节输出

### 文化意义
京都冬季旅游人数增长35%，成为日本文化遗产活态利用标杆案例。`,
    tag: "Zen Reflection",
    readTime: "9 分钟"
  }
];

// 解析markdown-like内容为结构化块
function parseContent(markdown: string): { type: string; content: string; level?: number }[] {
  const lines = markdown.split('\n');
  const blocks: { type: string; content: string; level?: number }[] = [];
  let currentText = '';

  for (const line of lines) {
    if (line.startsWith('### ')) {
      if (currentText.trim()) {
        blocks.push({ type: 'text', content: currentText.trim() });
        currentText = '';
      }
      blocks.push({ type: 'heading', content: line.replace('### ', ''), level: 3 });
    } else if (line.startsWith('## ')) {
      if (currentText.trim()) {
        blocks.push({ type: 'text', content: currentText.trim() });
        currentText = '';
      }
      blocks.push({ type: 'heading', content: line.replace('## ', ''), level: 2 });
    } else if (line.startsWith('- **')) {
      // 列表项 - 作为文本的一部分处理
      currentText += '\n' + line.replace(/^- \*\*/, '').replace(/\*\*:/, '：').replace(/\*\*/g, '');
    } else if (line.trim()) {
      currentText += (currentText ? '' : '') + line;
    }
  }
  if (currentText.trim()) {
    blocks.push({ type: 'text', content: currentText.trim() });
  }
  return blocks;
}

export default function ArtLandmarkDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const index = Number(id);
  const item = ART_LANDMARK_DATA[index] || ART_LANDMARK_DATA[0];
  const contentBlocks = parseContent(item.fullArticle);

  const getTagColor = (tag: string) => {
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

  return (
    <div className="min-h-screen bg-[#120e0b] text-neutral-100">
      {/* 顶部导航栏 */}
      <div className="border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/art')}
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回地标列表</span>
          </button>
          <span className={`text-[10px] px-2 py-1 rounded-full border ${getTagColor(item.tag)}`}>
            {item.tag}
          </span>
        </div>
      </div>

      {/* 文章主体 */}
      <article className="max-w-4xl mx-auto px-6 py-8">
        {/* 封面区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="aspect-[2/1] rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-900/40 via-amber-800/20 to-orange-900/40 flex items-center justify-center mb-6">
            <Globe className="w-24 h-24 text-yellow-500/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120e0b] via-transparent to-transparent" />
          </div>

          {/* 标题区 */}
          <h1 className="text-3xl font-black text-yellow-400 mb-3">{item.name}</h1>
          <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-yellow-500/60" />
              {item.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {item.readTime}
            </span>
          </div>

          {/* 引用块 */}
          <blockquote className="border-l-4 border-yellow-500/50 pl-5 py-3 my-6 bg-yellow-500/5 rounded-r-xl">
            <p className="text-base text-neutral-300 italic leading-relaxed">{item.desc}</p>
          </blockquote>
        </motion.div>

        {/* 正文内容 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="space-y-6"
        >
          {contentBlocks.map((block, i) => {
            switch (block.type) {
              case 'heading':
                if (block.level === 2) {
                  return (
                    <h2 key={i} className="text-xl font-bold text-yellow-400 mt-8 mb-4 pb-2 border-b border-yellow-500/10">
                      {block.content}
                    </h2>
                  );
                }
                return (
                  <h3 key={i} className="text-lg font-semibold text-neutral-200 mt-6 mb-3">
                    {block.content}
                  </h3>
                );
              case 'text':
                return (
                  <p key={i} className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                    {block.content}
                  </p>
                );
              default:
                return null;
            }
          })}
        </motion.div>

        {/* 底部操作 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-6 border-t border-neutral-900"
        >
          <button
            onClick={() => navigate('/art')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/40 transition-all cursor-pointer text-sm font-medium"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            浏览更多全球艺术地标
          </button>
        </motion.div>
      </article>
    </div>
  );
}
