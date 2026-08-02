import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Star, Quote, ChevronRight, Users, Building2 } from 'lucide-react';

const INTERVIEW_DATA = [
  {
    guest: "陈嘉 · 某超甲级写字楼业主",
    avatar: "CJ",
    quote: "光影大师把整个幕墙竖肋做成了微缩像素条，平时隐形，到晚八点才流动起来，兼顾了我们金融中心的体面和双碳指标。最让我满意的是 22:30 自动退晕——再也不用担心物业被投诉光污染。",
    fullArticle: `## 专访：超甲级写字楼业主陈嘉

### 项目背景
陈嘉先生是深圳某头部金融科技企业的行政副总裁，负责公司全球总部大楼的装修与智能化升级。这座68层超高层甲级写字楼位于深圳湾超级总部基地核心区，是企业的全球形象名片。

### 核心诉求
- **形象展示**：作为金融科技头部企业，需要展现前沿、稳健、环保的企业形象
- **双碳指标**：深圳湾园区对建筑夜景能耗有严格限制，必须实现AA级绿色认证
- **员工体验**：大量年轻员工加班至深夜，需要舒适不刺眼的夜间办公环境

### 光影大师方案
光影大师团队将线性RGBW像素条完美隐藏于幕墙竖肋型材内部，平时完全隐形。每晚20:00-22:30，幕墙自动演绎「数据流动」主题的动态流光。22:30后自动退晕至15%亮度，深夜00:00后仅保留5%安全照明。

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
    quote: "之前有三家公司来打孔，全部被我们拒绝了。光影大师的零打孔抱箍方案是唯一通过文物审批的。2200K 超低蓝光，对彩画的损伤度是零。这才是对历史有敬畏心的灯光设计。",
    fullArticle: `## 专访：千禧古建保护协会会长李明远

### 文物保护之难
中国现存元代以前古建筑仅427处，每一处都是不可再生的文化瑰宝。传统灯光安装需要在木构上打孔固定，这对古建的寿命是致命的。李明远会长三年来拒绝了17家照明企业的方案，直到遇见光影大师。

### 光影大师突破
光影大师的专利「无痕重力抱箍系统」利用古建自有结构受力，通过精密计算抱箍与木材的接触压强（<0.15 MPa），确保数十年不伤木骨。同时选用2200K超低色温，将蓝光辐射降至仪器无法检测的水平。

### 协会认证
中国古建保护协会、故宫博物院灯光研究所联合认证：光影大师抱箍方案是唯一获得「古建零损伤」金级认证的非侵入式照明系统。

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
- 需完美融合藏式建筑美学

### 曙光方案
- **防眩极致**：全场UGR<12，达到医疗手术室防眩级别
- **色温策略**：2400K极暖光，完美融入藏式烛光氛围
- **隐藏安装**：100%灯具深藏，任何角度均无法直接看到光源
- **智能感应**：人体感应+月光模拟

### 客人反馈
酒店开业一年来，在Booking.com获得9.7/10评分，「夜间环境」单项获9.9/10历史性高分。`,
    project: "安缦之韵野奢度假酒店",
    rating: 5,
    readTime: "7 分钟"
  },
  {
    guest: "周逸凡 · 斐济喜多度假村首席设计师",
    avatar: "ZY",
    quote: "IDA 暗天空三星认证不是随便拿的。光影大师帮我们把整个度假村做到零光害——抬头银河，脚下萤火。客人说这是他们此生最接近宇宙的夜晚。",
    fullArticle: `## 专访：斐济喜多度假村首席设计师周逸凡

### 暗天空保护
斐济莫米湾是全球最佳的暗夜保护区之一。喜多度假村将「零光害」写入品牌标准。光影大师历时14个月，与天文学家联合研发全球首个「暗天空三星认证」照明系统。

### 技术突破
- **光害控制**：上射光通量占比<0.5%
- **色温极致**：2000K极暖光，模拟烛光与萤火虫微光
- **生态友好**：琥珀色单波长LED，对海龟鸟类零干扰
- **能源自给**：太阳能+风力互补供电，100%能源自给

### 客人体验
- 夜间可见银河（波特尔暗空等级1级）
- 萤火虫数量较传统度假村多37倍
- 客人平均睡眠质量提升42%

### 行业标杆
已成为IDA推荐案例，被哈佛大学收录为「生态照明」课程教材。`,
    project: "斐济喜多星宿海风度假村",
    rating: 5,
    readTime: "10 分钟"
  }
];

function parseContent(markdown: string): { type: string; content: string; level?: number }[] {
  const lines = markdown.split('\n');
  const blocks: { type: string; content: string; level?: number }[] = [];
  let currentText = '';

  for (const line of lines) {
    if (line.startsWith('### ')) {
      if (currentText.trim()) { blocks.push({ type: 'text', content: currentText.trim() }); currentText = ''; }
      blocks.push({ type: 'heading', content: line.replace('### ', ''), level: 3 });
    } else if (line.startsWith('## ')) {
      if (currentText.trim()) { blocks.push({ type: 'text', content: currentText.trim() }); currentText = ''; }
      blocks.push({ type: 'heading', content: line.replace('## ', ''), level: 2 });
    } else if (line.startsWith('- **')) {
      currentText += '\n' + line.replace(/^- \*\*/, '').replace(/\*\*:/, '：').replace(/\*\*/g, '');
    } else if (line.trim()) {
      currentText += (currentText ? '' : '') + line;
    }
  }
  if (currentText.trim()) { blocks.push({ type: 'text', content: currentText.trim() }); }
  return blocks;
}

export default function InterviewDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const index = Number(id);
  const item = INTERVIEW_DATA[index] || INTERVIEW_DATA[0];
  const contentBlocks = parseContent(item.fullArticle);

  return (
    <div className="min-h-screen bg-[#070a0e] text-neutral-100">
      {/* 顶部导航栏 */}
      <div className="border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/interview')}
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回采访列表</span>
          </button>
          <span className="text-[10px] font-mono text-emerald-400/60">
            CLIENT STORY #{index + 1}
          </span>
        </div>
      </div>

      {/* 文章主体 */}
      <article className="max-w-4xl mx-auto px-6 py-8">
        {/* 人物信息区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* 头像 + 姓名行 */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-white font-bold text-xl">{item.avatar}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-emerald-400 mb-1">{item.guest.split('·')[0]}</h1>
              <p className="text-sm text-neutral-500">{item.guest.split('·')[1]}</p>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-xs text-neutral-500 ml-1">客户满意度 {item.rating}/5</span>
              </div>
            </div>
          </div>

          {/* 项目标签 */}
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-4 h-4 text-emerald-500/60" />
            <span className="text-sm text-emerald-300 font-medium">{item.project}</span>
            <Clock className="w-4 h-4 text-neutral-600 ml-2" />
            <span className="text-xs text-neutral-500">{item.readTime}</span>
          </div>

          {/* 核心引用 */}
          <blockquote className="bg-gradient-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500/50 pl-6 pr-4 py-4 my-6 rounded-r-xl relative">
            <Quote className="absolute -top-2 -left-1 w-6 h-6 text-emerald-500/40" />
            <p className="text-base text-neutral-200 italic leading-relaxed pl-4">{item.quote}</p>
          </blockquote>
        </motion.div>

        {/* 分割线 */}
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent mb-8" />

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
                    <h2 key={i} className="text-xl font-bold text-emerald-400 mt-8 mb-4 pb-2 border-b border-emerald-500/10">
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
            onClick={() => navigate('/interview')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer text-sm font-medium"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            浏览更多业主采访故事
          </button>
        </motion.div>
      </article>
    </div>
  );
}
