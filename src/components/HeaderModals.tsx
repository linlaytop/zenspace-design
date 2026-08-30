import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Users,
  GitMerge,
  X,
  MapPin,
  Star,
  ArrowRight,
  MessageCircle,
  ClipboardCheck,
  Wrench,
  CheckCircle,
  Clock,
  ArrowLeft,
  BookOpen,
  Video,
} from "lucide-react";
interface HeaderModalsProps {
  type: "art" | "interview" | "workflow";
  onClose: () => void;
}

export const GLOBAL_ART_LANDMARKS = [
  {
    name: "悉尼歌剧院灯光节",
    location: "澳大利亚 · 悉尼",
    desc: "全彩动态投影将帆形穹顶化为流动画布，配合环绕声学交响沉浸叙事。每年五月举行的灯光节中，创意团队利用 120 台 40,000 流明激光投影机，将歌剧院的独特风帆造型映射成波光粼粼的海洋生物与土著梦世纪画。色温精准控制在 4200K-5600K 之间，完美还原南太平洋的梦幻极光。",
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
    desc: "每整点五分钟黄金闪烁，6500K 冷白光点如繁星瀑布顺铁骨倾泻而下。这座百年地标运用全球最精密的 LED 像素点阵控制系统，将 20,000 颗独立可编程暖白光 LED 完美嵌入铁塔钢结构缝隙，在整点时分演绎出令人窒息的星光瀑布。",
    fullArticle: `## 埃菲尔铁塔星光闪烁

### 项目背景
埃菲尔铁塔作为巴黎永久性地标，自 1985 年起每年冬季都会点亮闪烁灯光。禅境设计设计团队于 2023 年受邀对闪烁系统进行升级，使其更加节能环保且视觉效果更为震撼。

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
    desc: "Art-Deco 古典立面以暖金 2700K 退晕擦墙，将百年砖石重新赋予夜色尊贵。禅境设计团队历时 18 个月，为外滩 12 栋国家级历史保护建筑量身定制了「见光不见灯」的极致洗墙方案，完美呈现海派文化与万国建筑的美学交融。",
    fullArticle: `## 外滩万国建筑灯光群

### 项目意义
外滩万国建筑博览群是上海最具标志性的历史文化遗产。2023 年，禅境设计设计团队受上海市黄浦区政府邀请，为外滩 12 栋核心建筑进行夜景照明升级改造。

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
    desc: "激光、水舞与摩天楼灯光三位一体实时音画同步，打造城市级数字媒体节日。滨海湾灯光秀是新加坡年度标志性盛事，禅境设计团队负责整体中控系统设计与激光阵列编排。",
    fullArticle: `## 新加坡滨海湾灯光秀

### 项目规模
新加坡滨海湾灯光秀（i Light Singapore）是亚洲最具影响力的数字灯光艺术节。禅境设计设计团队负责核心区域——滨海湾金沙酒店外立面及漂浮舞台的整体灯光设计方案。

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
谢赫扎耶德大清真寺是伊斯兰世界最具影响力的宗教建筑之一。禅境设计设计团队在方案设计之初，便深入研习伊斯兰建筑美学原则，确保每一束光都符合宗教场所的神圣氛围。

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
    desc: "3900K 月光冷色系精准反射于金箔与水面，极简克制地营造出禅宗宁静。禅境设计团队与京都市政府合作，为这座国宝级世界文化遗产量身定制了「雪月花」三景照明方案。",
    fullArticle: `## 京都金阁寺雪景投光

### 遗产保护
金阁寺（鹿苑寺）是日式禅宗美学的巅峰之作，寺身通体贴有纯金箔。禅境设计设计团队历时 2 年，进行了 17 轮 1:1 实体模型光效测试，最终确定「不触碰一片金箔」的极致非侵入式安装方案。

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
  },
];

export const INTERVIEW_DATA = [
  {
    guest: "陈嘉 · 某超甲级写字楼业主",
    avatar: "CJ",
    quote: "禅境设计把整个幕墙竖肋做成了微缩像素条，平时隐形，到晚八点才流动起来，兼顾了我们金融中心的体面和双碳指标。最让我满意的是 22:30 自动退晕——再也不用担心物业被投诉光污染。",
    fullArticle: `## 专访：超甲级写字楼业主陈嘉

### 项目背景
陈嘉先生是深圳某头部金融科技企业的行政副总裁，负责公司全球总部大楼的装修与智能化升级。这座 68 层超高层甲级写字楼位于深圳湾超级总部基地核心区，是企业的全球形象名片。

### 核心诉求
- **形象展示**：作为金融科技头部企业，需要展现前沿、稳健、环保的企业形象
- **双碳指标**：深圳湾园区对建筑夜景能耗有严格限制，必须实现 AA 级绿色认证
- **员工体验**：大量年轻员工加班至深夜，需要舒适不刺眼的夜间办公环境

### 禅境设计方案
禅境设计团队将线性 RGBW 像素条完美隐藏于幕墙竖肋型材内部，平时完全隐形。每晚 20:00-22:30，幕墙自动演绎「数据流动」主题的动态流光。22:30 后自动退晕至 15% 亮度，深夜 00:00 后仅保留 5% 安全照明。

### 成果数据
- 能耗较传统方案降低 58%
- 物业零光污染投诉
- 大楼获 2024 年度 CTBUH 最佳超高夜景奖`,
    project: "高科未来金融塔",
    rating: 5,
    readTime: "6 分钟"
  },
  {
    guest: "李明远 · 千禧古建保护协会会长",
    avatar: "LM",
    quote: "之前有三家公司来打孔，全部被我们拒绝了。禅境设计的零打孔抱箍方案是唯一通过文物审批的。2200K 超低蓝光，对彩画的损伤度是零。这才是对历史有敬畏心的灯光设计。",
    fullArticle: `## 专访：千禧古建保护协会会长李明远

### 文物保护之难
中国现存元代以前古建筑仅 427 处，每一处都是不可再生的文化瑰宝。传统灯光安装需要在木构上打孔固定，这对古建的寿命是致命的。李明远会长三年来拒绝了 17 家照明企业的方案，直到遇见禅境设计。

### 禅境设计突破
禅境设计的专利「无痕重力抱箍系统」利用古建自有结构受力，通过精密计算抱箍与木材的接触压强（<0.15 MPa），确保数十年不伤木骨。同时选用 2200K 超低色温，将蓝光辐射（损伤彩画的主因）降至仪器无法检测的水平。

### 协会认证
中国古建保护协会、故宫博物院灯光研究所联合认证：禅境设计抱箍方案是唯一获得「古建零损伤」金级认证的非侵入式照明系统。

### 行业影响
该方案已被列入国家文物局《古建筑夜景照明推荐技术目录》，将在未来五年内推广至全国 47 处世界文化遗产地。`,
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
安缦（Aman）是全球最顶级的度假酒店品牌，其设计哲学是「极致静谧、与自然共生」。安缦之韵位于云南香格里拉独克宗古城旁，海拔 3,450 米，是中国最具藏式原真性的奢华酒店。

### 灯光挑战
- 住客 95% 是全球高净值人群，对光环境极其敏感
- 酒店位于暗夜保护区，光害控制需达到 IDA Class 3 标准
- 需完美融合藏式建筑美学，不能有任何现代灯具显露

### 禅境设计方案
- **防眩极致**：全场 UGR<12，达到医疗手术室的防眩级别
- **色温策略**：2400K 极暖光，完美融入藏式烛光氛围
- **隐藏安装**：100% 灯具深藏，住客在任何角度均无法直接看到光源
- **智能感应**：人体感应 + 月光模拟，人走灯柔、人停灯亮

### 客人反馈
酒店开业一年来，在 Booking.com 获得 9.7/10 的评分，其中「夜间环境」单项获得 9.9/10 的历史性高分。`,
    project: "安缦之韵野奢度假酒店",
    rating: 5,
    readTime: "7 分钟"
  },
  {
    guest: "周逸凡 · 斐济喜多度假村首席设计师",
    avatar: "ZY",
    quote: "IDA 暗天空三星认证不是随便拿的。禅境设计帮我们把整个度假村做到零光害——抬头银河，脚下萤火。客人说这是他们此生最接近宇宙的夜晚。",
    fullArticle: `## 专访：斐济喜多度假村首席设计师周逸凡

### 暗天空保护
斐济莫米湾是全球最佳的暗夜保护区之一。喜多度假村（Six Senses）作为全球顶尖的生态度假品牌，将「零光害」写入了品牌标准。禅境设计团队历时 14 个月，与天文学家、生态学家联合研发，打造出全球首个「暗天空三星认证」的度假村照明系统。

### 技术突破
- **光害控制**：全部灯具加装精准截光罩，上射光通量占比 <0.5%
- **色温极致**：2000K 极暖光，完美模拟烛光与萤火虫的微光
- **生态友好**：全部灯具采用琥珀色单波长 LED，对海龟、鸟类零干扰
- **能源自给**：全度假村采用太阳能 + 风力互补供电，实现 100% 能源自给

### 客人体验
- 夜间抬头可见银河（波特尔暗空等级 1 级）
- 脚下萤火虫自由飞舞（灯具附近萤火虫数量较传统度假村多 37 倍）
- 客人平均睡眠质量提升 42%（与城市环境对比）

### 行业标杆
该项目成为全球暗天空协会（IDA）的推荐案例，已被哈佛大学设计学院收录为「生态照明」课程教材。`,
    project: "斐济喜多星宿海风度假村",
    rating: 5,
    readTime: "10 分钟"
  },
];

// 服务流程分类（供 WorkflowPage 使用）
export const WORKFLOW_CATEGORIES = [
  { id: "all", name: "全部步骤", icon: "📋", count: 6 },
  { id: "design", name: "设计阶段", icon: "✏️", count: 3 },
  { id: "build", name: "施工运维", icon: "🔧", count: 3 },
];

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: "需求沟通与场地勘察",
    desc: "深入了解建筑载体、环境生态、业主审美偏好和预算范围。禅境设计勘察团队携带 Dialux 现场采点设备、光谱分析仪、暗天空合规检测仪，进行为期 1-3 天的全方位现场勘察。",
    fullArticle: `## 第一步：需求沟通与场地勘察

### 勘察内容
- **建筑载体分析**：结构形式、材料属性、风貌特色、保护等级
- **环境生态评估**：周边光环境、暗天空等级、鸟类/昆虫活动规律
- **业主需求深挖**：审美偏好、功能需求、预算范围、时间节点
- **法规合规检查**：文物审批要求、物业光污染限值、节能指标

### 设备清单
- Dialux 现场采点设备（照度/亮度/色温三维扫描）
- 光谱分析仪（分析现有光源的光谱成分）
- 暗天空合规检测仪（测量上射光通量占比）
- 高清全景扫描仪（生成 1:1 数字孪生模型）

### 交付成果
《场地勘察报告》——包含 30+ 项参数指标、120+ 张现场照片、5 年期光照变化模拟动画。`,
    icon: <MessageCircle className="w-5 h-5 text-yellow-400" />,
    readTime: "3 分钟"
  },
  {
    step: 2,
    title: "概念方案与 Dialux 模拟",
    desc: "基于现场数据生成照度模拟、色温规划和效果预览渲染。禅境设计创意团队运用 Dialux 4.0 和 Relux 专业级光模拟软件，生成 1:1 真实施工级照度模拟图。",
    fullArticle: `## 第二步：概念方案与 Dialux 模拟

### 模拟精度
- **照度模拟误差**：<8%（行业平均 25%）
- **色温预览**：支持 2000K-6500K 连续无级调节实时预览
- **能耗计算**：精确至每盏灯的功率、每日耗电、年度总和
- **暗天空预检**：自动计算 IDA 认证等级，提前预警合规风险

### 方案内容
- 3 套概念方案（每套含 8-12 张高清效果图）
- 1:1 照度模拟图（False Color 伪色图 + ISO 照度曲线）
- 灯具选型表（含型号、功率、色温、光束角、安装方式）
- 工程概算书（精度 ±15%）

### 汇报演示
禅境设计独创「沉浸式方案汇报系统」——在会议室搭建 1:1 实景光环境模拟空间，让业主提前「走进」完工后的夜景效果。`,
    icon: <Video className="w-5 h-5 text-cyan-400" />,
    readTime: "4 分钟"
  },
  {
    step: 3,
    title: "深化设计与灯具选型",
    desc: "精确到每颗灯的型号、角度、色温与安装方式的工程级图纸。禅境设计深化设计团队由 12 位平均从业 14 年的资深照明工程师组成，确保每一张施工图都可直接指导现场安装。",
    fullArticle: `## 第三步：深化设计与灯具选型

### 图纸深度
- **灯具定位图**：精确到 50mm 的安装坐标定位
- **电气回路图**：每盏灯的控制地址、调光曲线、场景编号
- **节点大样图**：异形建筑部位 1:1 节点大样，确保极致隐藏效果
- **效果验证图**：施工中途效果校验标准，确保与设计效果 95% 匹配

### 灯具定制
禅境设计拥有自主灯具定制工坊，可根据项目需求定制：
- 非标色温（如 2470K 奢金、3980K 月光银）
- 异形外壳（与建筑同色、同纹理）
- 超小体积（最小灯具仅 12mm 直径）

### 品质承诺
- 深化设计误差 <3%
- 灯具定制交期：15-25 天
- 施工配合：全程驻场工程师`,
    icon: <ClipboardCheck className="w-5 h-5 text-emerald-400" />,
    readTime: "4 分钟"
  },
  {
    step: 4,
    title: "非侵入式施工安装",
    desc: "采用专利抱箍与压载工艺，对古建零损伤，对幕墙零破坏。禅境设计自有施工团队均持有「古建筑照明施工资质证书」，平均从业 9 年，是中国最资深的照明施工力量。",
    fullArticle: `## 第四步：非侵入式施工安装

### 安装工艺
- **古建**：专利无痕重力抱箍，确保数十年不伤木骨
- **幕墙**：真空负压吸附夹具，零打孔、零胶粘接
- **园林**：土壤防压入式地埋，不伤植物根系
- **水景**：水下机器人辅助安装，人员不下水

### 施工标准
- 安装精度：灯具位置误差 <20mm
- 隐蔽效果：95% 灯具在平视 15° 范围内不可见
- 施工周期：较行业平均缩短 30%
- 安全记录：连续 8 年零安全事故

### 现场配合
- 全程驻场工程师（最少 2 名）
- 每日施工进度 4K 延时摄影记录
- 业主手机 APP 实时查看施工进度`,
    icon: <Wrench className="w-5 h-5 text-purple-400" />,
    readTime: "4 分钟"
  },
  {
    step: 5,
    title: "调光与 DMX 中控编程",
    desc: "16-Bit 对数调光曲线编写、多时段场景编排与暗天空合规验证。禅境设计中控编程团队由 8 位 DMX 国际认证工程师组成，累计编程通道数超过 120 万。",
    fullArticle: `## 第五步：调光与 DMX 中控编程

### 编程内容
- **16-Bit 对数调光曲线**：在 1%-100% 范围内实现无感顺滑调光
- **多时段场景编排**：平日/节日/深夜/凌晨 四时段自动切换
- **音画同步编程**：音乐节奏与灯光动态精准同步（误差 <12ms）
- **气象联动**：光照度传感器、风速仪实时数据接入，自动调节灯光输出

### 控制系统
- **核心协议**：DMX512 / Art-Net / sACN
- **控制设备**：MA Lighting grandMA3 / Avolites Tiger Touch II
- **备份机制**：双机热备 + 4G 远程应急控制
- **扩展能力**：最大支持 200 万 DMX 通道

### 调试验收
- 全场照度均匀度验收（偏差 <15%）
- 色温一致性验收（同区域偏差 <150K）
- 暗天空合规验收（上射光通量占比 <1.5%）`,
    icon: <CheckCircle className="w-5 h-5 text-amber-400" />,
    readTime: "5 分钟"
  },
  {
    step: 6,
    title: "验收交付与长期运维",
    desc: "IDA 暗天空合规认证、操作培训、远程运维及年度光衰校准。禅境设计提供「5+5」双五年的全周期运维承诺，确保灯光系统在 10 年内始终保持设计效果。",
    fullArticle: `## 第六步：验收交付与长期运维

### 交付文档
- 《禅境设计照明系统操作手册》（含 iPad 一键控制指南）
- 《灯具清单与质保卡》（每台灯具的独立「身份证」）
- 《IDA 暗天空合规认证报告》
- 《竣工图与系统图》（CAD + BIM 双格式）

### 培训内容
- 物业管理人员：基础开关、场景切换、应急模式（4 课时）
- 工程维护人员：灯具更换、系统诊断、远程运维（16 课时）
- 业主决策层：效果验收标准、节能数据分析（2 课时）

### 运维承诺
- **5+5 双五年质保**：前 5 年全额质保，后 5 年光衰校准免费
- **远程运维**：7×24 小时远程监控，故障 2 小时内响应
- **年度校准**：每年一次全场光效校准，确保色温、照度、均匀度始终如初
- **升级服务**：控制系统每 3 年免费升级一次，确保始终使用最新技术

### 客户满意度
禅境设计交付项目客户满意度：99. 7%（2020-2025 年均）`,
    icon: <CheckCircle className="w-5 h-5 text-green-400" />,
    readTime: "5 分钟"
  },
];

interface ArticleDetailModalProps {
  type: "art" | "interview" | "workflow";
  index: number;
  onClose: () => void;
}

export function ArticleDetailModal({ type, index, onClose }: ArticleDetailModalProps) {
  const content = type === "art" 
    ? GLOBAL_ART_LANDMARKS[index]
    : type === "interview"
    ? INTERVIEW_DATA[index]
    : WORKFLOW_STEPS[index];

  const colorScheme = type === "art" 
    ? { accent: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" }
    : type === "interview"
    ? { accent: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" }
    : { accent: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3 }}
        className={`relative bg-[#0a0e14] border ${colorScheme.border} rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-neutral-800/60">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-neutral-800/60 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className={`text-[10px] font-mono ${colorScheme.accent} tracking-widest uppercase`}>
                {type === "art" ? "GLOBAL ARTICLE" : type === "interview" ? "CLIENT STORY" : "WORKFLOW DETAIL"}
              </span>
              {content.readTime && (
                <span className="text-[10px] text-neutral-500 ml-3">
                  ⏱️ {content.readTime}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-neutral-800/60 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-8 overflow-y-auto max-h-[calc(90vh-80px)] text-left">
          {type === "art" && (() => {
            const item = GLOBAL_ART_LANDMARKS[index];
            return (
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className={`w-4 h-4 ${colorScheme.accent} shrink-0`} />
                  <span className="text-[11px] font-mono text-neutral-400">{item.location}</span>
                  <span className={`text-[9px] ${colorScheme.bg} ${colorScheme.accent} px-2 py-0.5 rounded font-mono border ${colorScheme.border}`}>
                    {item.tag}
                  </span>
                </div>
                <h2 className={`text-2xl font-black ${colorScheme.accent} mb-4`}>
                  {item.name}
                </h2>
              </div>
              <div className="prose prose-invert prose-sm max-w-none">
                {item.fullArticle.split('\n').map((line: string, i: number) => {
                  if (line.startsWith('## ')) {
                    return <h3 key={i} className={`text-lg font-bold ${colorScheme.accent} mt-6 mb-3`}>{line.replace('## ', '')}</h3>;
                  } else if (line.startsWith('### ')) {
                    return <h4 key={i} className="text-base font-semibold text-neutral-200 mt-4 mb-2">{line.replace('### ', '')}</h4>;
                  } else if (line.startsWith('- ')) {
                    return <p key={i} className="text-sm text-neutral-300 ml-4 mb-1">• {line.replace('- ', '')}</p>;
                  } else if (line.trim() === '') {
                    return <br key={i} />;
                  } else {
                    return <p key={i} className="text-sm text-neutral-300 leading-relaxed mb-3">{line}</p>;
                  }
                })}
              </div>
            </div>
            );
          })()}

          {type === "interview" && (
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-full ${colorScheme.bg} border ${colorScheme.border} flex items-center justify-center ${colorScheme.accent} font-bold text-xl shrink-0`}>
                  {(content as any).avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-neutral-100 mb-1">{(content as any).guest}</h2>
                  <span className={`text-[11px] font-mono ${colorScheme.accent}`}>{(content as any).project}</span>
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: (content as any).rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <div className={`${colorScheme.bg} border ${colorScheme.border} rounded-2xl p-6`}>
                <p className="text-sm text-neutral-200 leading-relaxed italic">
                  &ldquo;{(content as any).quote}&rdquo;
                </p>
              </div>
              <div className="prose prose-invert prose-sm max-w-none">
                {(content as any).fullArticle.split('\n').map((line: string, i: number) => {
                  if (line.startsWith('## ')) {
                    return <h3 key={i} className={`text-lg font-bold ${colorScheme.accent} mt-6 mb-3`}>{line.replace('## ', '')}</h3>;
                  } else if (line.startsWith('### ')) {
                    return <h4 key={i} className="text-base font-semibold text-neutral-200 mt-4 mb-2">{line.replace('### ', '')}</h4>;
                  } else if (line.startsWith('- ')) {
                    return <p key={i} className="text-sm text-neutral-300 ml-4 mb-1">• {line.replace('- ', '')}</p>;
                  } else if (line.trim() === '') {
                    return <br key={i} />;
                  } else {
                    return <p key={i} className="text-sm text-neutral-300 leading-relaxed mb-3">{line}</p>;
                  }
                })}
              </div>
            </div>
          )}

          {type === "workflow" && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${colorScheme.bg} border ${colorScheme.border} flex items-center justify-center`}>
                  {(content as any).icon}
                </div>
                <div>
                  <span className={`text-[10px] font-mono ${colorScheme.accent} tracking-widest`}>
                    STEP {(content as any).step.toString().padStart(2, '0')}
                  </span>
                  <h2 className="text-xl font-bold text-neutral-100 mt-1">{(content as any).title}</h2>
                </div>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">{(content as any).desc}</p>
              <div className="prose prose-invert prose-sm max-w-none">
                {(content as any).fullArticle.split('\n').map((line: string, i: number) => {
                  if (line.startsWith('## ')) {
                    return <h3 key={i} className={`text-lg font-bold ${colorScheme.accent} mt-6 mb-3`}>{line.replace('## ', '')}</h3>;
                  } else if (line.startsWith('### ')) {
                    return <h4 key={i} className="text-base font-semibold text-neutral-200 mt-4 mb-2">{line.replace('### ', '')}</h4>;
                  } else if (line.startsWith('- ')) {
                    return <p key={i} className="text-sm text-neutral-300 ml-4 mb-1">• {line.replace('- ', '')}</p>;
                  } else if (line.trim() === '') {
                    return <br key={i} />;
                  } else {
                    return <p key={i} className="text-sm text-neutral-300 leading-relaxed mb-3">{line}</p>;
                  }
                })}
              </div>
            </div>
          )}

          {/* 技术专栏文章渲染 - 支持图文混排 */}
        </div>
      </motion.div>
    </div>
  );
}

export default function HeaderModals({ type, onClose }: HeaderModalsProps) {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedArticle !== null) {
          setSelectedArticle(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, selectedArticle]);

  const modalConfig = {
    art: {
      title: "环球艺术创造力",
      subtitle: "GLOBAL ARTISTIC LANDMARKS",
      color: "yellow",
      icon: <Globe className="w-6 h-6 text-yellow-400" />,
    },
    interview: {
      title: "业主采访",
      subtitle: "VIP CLIENT TESTIMONIALS",
      color: "emerald",
      icon: <Users className="w-6 h-6 text-emerald-400" />,
    },
    workflow: {
      title: "服务流程",
      subtitle: "ZERO-DAMAGE SERVICE WORKFLOW",
      color: "cyan",
      icon: <GitMerge className="w-6 h-6 text-cyan-400" />,
    },
  };

  const config = modalConfig[type];

  const borderColor =
    type === "art"
      ? "border-yellow-500/30"
      : type === "interview"
      ? "border-emerald-500/30"
      : "border-cyan-500/30";

  const accentColor =
    type === "art"
      ? "text-yellow-400"
      : type === "interview"
      ? "text-emerald-400"
      : "text-cyan-400";

  // If an article is selected, show the detail modal
  if (selectedArticle !== null) {
    return (
      <ArticleDetailModal
        type={type}
        index={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className={`relative bg-[#0a0e14] border ${borderColor} rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-neutral-800/60">
          <div className="flex items-center gap-3">
            {config.icon}
            <div>
              <h2 className={`text-lg font-bold ${accentColor}`}>
                {config.title}
              </h2>
              <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase">
                {config.subtitle}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-neutral-800/60 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
          {type === "art" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GLOBAL_ART_LANDMARKS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-900/50 border border-neutral-800/60 rounded-2xl p-4 hover:border-yellow-500/40 transition-all group cursor-pointer"
                  onClick={() => setSelectedArticle(idx)}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                      <span className="text-[10px] font-mono text-neutral-400">
                        {item.location}
                      </span>
                    </div>
                    <span className="text-[8px] bg-yellow-500/10 text-yellow-400 px-1.5 py-0.5 rounded font-mono border border-yellow-500/20">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-100 mb-1.5 group-hover:text-yellow-400 transition-colors flex items-center justify-between">
                    {item.name}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                  <span className="text-[9px] text-neutral-500 mt-2 block">📖 {item.readTime}</span>
                </div>
              ))}
            </div>
          )}

          {type === "interview" && (
            <div className="flex flex-col gap-4">
              {INTERVIEW_DATA.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-900/40 border border-neutral-800/60 rounded-2xl p-5 hover:border-emerald-500/40 transition-all cursor-pointer group"
                  onClick={() => setSelectedArticle(idx)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0">
                      {item.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-sm font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors">
                          {item.guest}
                        </h4>
                        <div className="flex items-center gap-0.5 shrink-0">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 mb-2 block">
                        {item.project}
                      </span>
                      <p className="text-xs text-neutral-300 leading-relaxed italic line-clamp-2">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <span className="text-[9px] text-neutral-500 mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">📖 点击阅读全文 · {item.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {type === "workflow" && (
            <div className="flex flex-col gap-0 relative">
              {/* Vertical connector line */}
              <div className="absolute left-[19px] top-6 bottom-6 w-px bg-gradient-to-b from-cyan-500/40 via-purple-500/30 to-emerald-500/20" />

              {WORKFLOW_STEPS.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 group relative cursor-pointer" onClick={() => setSelectedArticle(idx)}>
                  {/* Step circle */}
                  <div className="relative z-10 w-10 h-10 rounded-full bg-[#0a0e14] border border-neutral-800 flex items-center justify-center shrink-0 group-hover:border-cyan-500/40 transition-colors">
                    {item.icon}
                  </div>

                  <div className="flex-1 pb-5 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-mono text-cyan-400 tracking-widest">
                        STEP {item.step.toString().padStart(2, "0")}
                      </span>
                      <ArrowRight className="w-3 h-3 text-neutral-600 group-hover:text-cyan-400 transition-colors" />
                      <span className="text-[9px] text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">📖 {item.readTime}</span>
                    </div>
                    <h4 className="text-sm font-bold text-neutral-100 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* Bottom CTA */}
              <div className="mt-3 p-4 bg-cyan-950/10 border border-cyan-500/15 rounded-xl flex items-center gap-3">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <p className="text-xs text-neutral-300 leading-relaxed">
                  从初勘到验收，禅境设计标准交付周期为 <b className="text-cyan-400">4-8 周</b>。
                  古建筑零损伤保护全程覆盖，IDA 暗天空合规承诺书随项目同步交付。
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
