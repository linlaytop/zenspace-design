import { LightingCategory } from "./types";

// Import the generated images
import culturalTourismImg from "./assets/images/cultural_tourism_lighting_1780650907536.png";
import lightshowImg from "./assets/images/lightshow_monument_1779988049122.png";
import waterShowImg from "./assets/images/water_screen_show_1780649456464.png";
import hotelImg from "./assets/images/luxury_hotel_lighting_1779988069459.png";
import officeImg from "./assets/images/office_facade_lighting_1779988089178.png";
import ancientImg from "./assets/images/ancient_pagoda_lighting_1779988109064.png";
import gardenImg from "./assets/images/garden_landscape_lighting_1779988128848.png";
import villaImg from "./assets/images/villa_exterior_lighting_1779988156492.png";
import resortImg from "./assets/images/resort_scenic_lighting_1779988187407.png";
import clubhouseImg from "./assets/images/clubhouse_lighting_1780065901149.png";
import museumImg from "./assets/images/clubhouse_lighting_1780065901149.png";
import exhibitionHallImg from "./assets/images/clubhouse_lighting_1780065901149.png";
import restaurantImg from "./assets/images/luxury_hotel_lighting_1779988069459.png";
import spaImg from "./assets/images/resort_scenic_lighting_1779988187407.png";
import ktvImg from "./assets/images/lightshow_monument_1779988049122.png";
import starPathImg from "./assets/images/garden_landscape_lighting_1779988128848.png";
import artInstallImg from "./assets/images/cultural_tourism_lighting_1780650907536.png";

export const LIGHTING_CATEGORIES: LightingCategory[] = [
  {
    id: "cultural-tourism",
    name: "文旅光影创新",
    englishName: "Cultural Tourism Light & Magic",
    description: "以‘夜间文旅夜经济’为核心，在景区、地标古镇、山水林泽间定制数字沉浸式交互光影游路线。利用雷达红外交互、3D激光、林间薄雾绕光系统，让夜间风景更具在地文化叙事张力与魔幻空间质感。",
    imageUrl: culturalTourismImg,
    technicalDetails: {
      basePowerDensity: "3.8 W/㎡ (低能低碳均值)",
      typicalK: "2200K 暖古铜 - 5000K 梦幻蓝紫",
      controlProtocol: "Art-Net / DMX512 / 传感器体感联动MIDI总线",
      ecologyLevel: "IDA 暗天空特级绿色环保无干扰认证"
    },
    features: [
      "雷达红外体感捕捉，支持人行轨迹光效毫秒响应",
      "基于流体力学及风偏的主动避光激光保护防御机制",
      "全隐蔽环保式非破坏性夹具吊装，贴合自然生长植物",
      "多维水、陆、空介质智能声学声光集群集中一键调度"
    ],
    cases: [
      {
        title: "《九歌 · 密林寻踪》大型沉浸式野奢夜游",
        location: "中国张家界 · 森林核心体验区",
        concept: "以‘上古神奇密境’为主题，将高流明水幕投影、全彩激光和地面体感LED灯带进行群控。当游客踏入林中，斑斓光斑如林中蝴蝶振翅，远方雾霭中浮现神兽身影，美轮美奂。",
        photographer: "Marc Riboud",
        stats: [
          { label: "体感感应点", value: "85 个点位" },
          { label: "激光覆盖", value: "1.2 万平米" },
          { label: "综合能效", value: "暗夜一级绿色" }
        ]
      }
    ]
  },
  {
    id: "lightshow",
    name: "时尚灯光秀",
    englishName: "Laser & Projection Mapping",
    description: "以城市地标、山体湖泊、建筑外立面为画布，融合高功率激光、3D投影拼接与声学系统，呈现具有时空叙事感和超级震撼震撼度的多维度数字媒体光电艺术秀场。",
    imageUrl: lightshowImg,
    technicalDetails: {
      basePowerDensity: "12.5 W/㎡ (峰值)",
      typicalK: "RGB全彩 / 16.7M 自定义色彩",
      controlProtocol: "Art-Net / RDM / sACN 核心集群控制",
      ecologyLevel: "Eco-Peak Class 环保微损控制"
    },
    features: [
      "高精准多机融合3D投影校正技术",
      "首创音视频DMX512一键帧同步算法",
      "柔性安全激光防御传感器安全防护",
      "水幕/山体全自适应光学折射计算"
    ],
    cases: [
      {
        title: "《光影新纪元》地标水幕灯光秀",
        location: "中国上海 · 黄浦江地标高空",
        concept: "融合国粹水墨美学与未来主义数字几何，以极高亮度水幕和高空绿激光交织出数字长江流域的恢宏生机。",
        photographer: "Marc Riboud",
        stats: [
          { label: "流明总计", value: "320,000 LM" },
          { label: "激光头数", value: "36 组全彩" },
          { label: "DMX通道", value: "12,280 Ch" }
        ]
      }
    ]
  },
  {
    id: "water-show",
    name: "水幕灯光秀",
    englishName: "Water Screen Laser Show",
    description: "利用超大功率水幕发生器在水面上喷射出巨型扇形水膜，作为投影与激光的反射介质，结合艺术电脑灯与高保真音响，呈现悬浮在空中的全息流光与震撼的3D叙事光电史诗。",
    imageUrl: waterShowImg,
    technicalDetails: {
      basePowerDensity: "15.0 W/㎡ (峰值)",
      typicalK: "RGBW 全彩 / 高饱和激光波段",
      controlProtocol: "DMX512 / Art-Net / 喷泉水泵同步控制",
      ecologyLevel: "Eco-Water Class 水质完全无害物理环流"
    },
    features: [
      "超高抗风阻扇形多级水幕发生系统",
      "三维立体折射高保真激光渲染算法",
      "水力发电回流循环低碳环保系统",
      "DMX与变频水泵微秒级一体化联动"
    ],
    cases: [
      {
        title: "《海湾交响》梦幻水幕激光秀",
        location: "中国三亚 · 海棠湾国际度假区",
        concept: "以‘海洋之魂’为蓝本，在120米宽、40米高的多级扇形高压水幕上，通过30,000流明工程激光器立体投影出神话中的鲲鹏与白鲸，与海浪及绚丽激光交响共舞。",
        photographer: "Iwan Baan",
        stats: [
          { label: "水幕高度", value: "40 米超高" },
          { label: "激光功率", value: "60W x 12 组" },
          { label: "控制节点", value: "5,120 个" }
        ]
      }
    ]
  },
  {
    id: "hotel",
    name: "酒店外观灯光",
    englishName: "Luxury Hotel Lighting Design",
    description: "针对奢华酒店、五星级地标，着重强调灯光的一体化与建筑立面融合度，通过深藏防眩光器具、渐变照度以及精准退晕，传达尊贵、慵懒舒适、宁静洗脑的夜间归属感。",
    imageUrl: hotelImg,
    technicalDetails: {
      basePowerDensity: "4.8 W/㎡",
      typicalK: "2700K 琥珀金 - 3200K 暖白光",
      controlProtocol: "KNX / DALI-2 精准数字调光",
      ecologyLevel: "LEED Gold / Eco-Friendly A+"
    },
    features: [
      "全定制蜂窝防眩网，灯具深藏超40mm",
      "微瓦级超平滑自然对数调光算法",
      "立面多层亮度退晕，防止大面积刺穿夜空",
      "色温自适应昼夜节律调节系统"
    ],
    cases: [
      {
        title: "安缦之韵野奢度假酒店",
        location: "中国云南 · 香格里拉极境",
        concept: "以‘藏式晚篝’为灵感，摒弃任何直射光源，全屋运用微型擦墙透镜与定制柔韧地表埋地灯，创造静谧野性暖意。",
        photographer: "Iwan Baan",
        stats: [
          { label: "核心色温", value: "2400K 极暖" },
          { label: "防眩光级", value: "UGR < 12 极致级" },
          { label: "节能率", value: "38% 创纪录" }
        ]
      }
    ]
  },
  {
    id: "exhibition-hall",
    name: "展厅设计",
    englishName: "Exhibition Hall & Showroom Lighting",
    description: "为博物馆、美术馆、企业展厅及商业展馆提供精准控光、高显指、文物保护级的展陈照明设计。通过重点照明与氛围光的层次组合，让展品在最佳视觉条件下呈现，同时延长珍贵文物的展示寿命。",
    imageUrl: exhibitionHallImg,
    technicalDetails: {
      basePowerDensity: "2.5 W/㎡ (受控低照度)",
      typicalK: "3000K 暖白 - 4000K 中性白",
      controlProtocol: "DALI-2 / 0-10V 调光 / 分回路场景控制",
      ecologyLevel: "博物馆级低紫外 / 无频闪 / 低红外"
    },
    features: [
      "CRI≥95高显色指数，真实还原器物与画作色彩",
      "博物馆级低紫外、低红外光源，保护敏感展品",
      "可调焦切光射灯，精准控制光束边界与防眩",
      "多场景一键切换：常设展 / 特展 / 清洁 / 闭馆"
    ],
    cases: [
      {
        title: "秘境典藏 · 当代东方艺术展",
        location: "中国上海 · 当代艺术博物馆",
        concept: "以轨道式可调焦射灯配合低位洗墙灯，精准照亮每一幅画作与雕塑，同时保持空间沉浸感，让观众在静谧光场中自由游走。",
        photographer: "Hélène Binet",
        stats: [
          { label: "显色指数", value: "CRI 97" },
          { label: "年曝光量", value: "≤50 klx·h" },
          { label: "防眩等级", value: "UGR < 13" }
        ]
      }
    ]
  },
  {
    id: "office",
    name: "办公楼外观灯光",
    englishName: "Corporate Office Media Facade",
    description: "现代地标甲级办公大楼、超高层玻璃建筑照明，采用隐藏于幕墙竖肋中的精密线性像素条，以极简的冷暖中性色调、流体流动动画，彰显科技企业、金融中心的稳健与前沿感。",
    imageUrl: officeImg,
    technicalDetails: {
      basePowerDensity: "6.2 W/㎡",
      typicalK: "3500K 珍珠白 - 5000K 冷银白",
      controlProtocol: "DMX512 / Ethernet 立面分布式中控",
      ecologyLevel: "SG-Green Mact / LEED Platinum"
    },
    features: [
      "精密集成于型材压条内的卡槽隐藏式安装",
      "防自反射遮光罩设计，确保室内无眩光串光",
      "云端智能微气象级亮度自适应调节",
      "微秒级分布式数据链路容错备份"
    ],
    cases: [
      {
        title: "高科未来金融塔外立面",
        location: "中国深圳 · 湾区总部中心",
        concept: "‘未来芯片’流动像素条。立面钢结构竖向凹槽内嵌微缩变色彩虹条，仅在夜间20:00-22:00流动，兼顾商务品位与双碳环保指标。",
        photographer: "Hufton + Crow",
        stats: [
          { label: "像素总长", value: "8,500 米" },
          { label: "单灯功率", value: "12W / 米" },
          { label: "动态帧率", value: "60 FPS 极速" }
        ]
      }
    ]
  },
  {
    id: "ancient",
    name: "古建筑灯光设计",
    englishName: "Heritage & Ancient Architecture",
    description: "秉持‘见光不见灯’与历史原真性保护原则，以对木质和石材零损伤的非破坏性夹具、极低照度的暖古铜色温，局部擦亮垂脊、斗拱、飞檐、重檐，点题古典中国风华。",
    imageUrl: ancientImg,
    technicalDetails: {
      basePowerDensity: "3.2 W/㎡",
      typicalK: "1800K 佛光金 - 2400K 暖古铜",
      controlProtocol: "DALI / Zigbee 3.0 无线免扰排线",
      ecologyLevel: "文物安全顶级 A-Class 免打孔"
    },
    features: [
      "专利防腐无痕重力抱箍，杜绝古木打孔破坏",
      "2200K超低蓝光辐射，保障漆面、彩画不受紫外损伤",
      "微棱镜透镜防眩，隐藏于鸱尾及飞檐凹槽内",
      "基于唐宋古代营造法式的立面视点光彩级差"
    ],
    cases: [
      {
        title: "千禧重楼飞檐景观夜照",
        location: "中国西安 · 历史文化轴心",
        concept: "‘流金汉唐’。完全利用抱箍与压载结构。精准投光聚焦于繁复的木质斗拱结构，产生极高贵、古典的阴影浮雕效果。",
        photographer: "Akiyama Ryoji",
        stats: [
          { label: "彩画损伤度", value: "0.0% 零紫外" },
          { label: "无痕夹具", value: "142 套全抱箍" },
          { label: "平均照度", value: "15 Lx 极其克制" }
        ]
      }
    ]
  },
  {
    id: "garden",
    name: "园林景观灯光",
    englishName: "Garden & Environmental Ecology",
    description: "以‘月光重塑’和温和环保照亮为纲。运用隐藏于地底、树梢上的窄角投光灯，将叶脉投影、林中薄雾穿透、水石斑驳融合，打造出步移景异、极度自然而空灵的森系夜游步道。",
    imageUrl: gardenImg,
    technicalDetails: {
      basePowerDensity: "2.1 W/㎡",
      typicalK: "2200K 黄光 - 4000K 月光绿",
      controlProtocol: "LORA / Zigbee 智能分布式无线节点",
      ecologyLevel: "DarkSky 暗夜保护协会高标准认证"
    },
    features: [
      "‘Moonlighting’月光拟真投光，光源12米高空自然斜洒",
      "土壤防霉抗压高防护等級埋地地埋射灯",
      "智能感应流线，人走灯退，鸟类栖息区完全避光",
      "水底微安级超低压漏电防护LED池壁射灯"
    ],
    cases: [
      {
        title: "‘影月森呼吸’沉浸式生态步道",
        location: "中国杭州 · 莫干山竹海秘境",
        concept: "大面积4000K‘冷月光’从竹梢微风穿透斜洒，地面辅以低照度3000K防雨草坪防眩灯，竹风摇曳，光斑起舞。",
        photographer: "Kengo Kuma Studio",
        stats: [
          { label: "鸟类干扰指数", value: "接近于零" },
          { label: "防水等级", value: "IP68 重重防守" },
          { label: "节能率", value: "52% (感应暗化)" }
        ]
      }
    ]
  },
  {
    id: "villa",
    name: "别墅私定灯光",
    englishName: "Bespoke Private Villa Façade",
    description: "私人豪宅高端定制。围绕个性审美与私密高品，多重漫反射局部擦亮建筑露台、无边界泳池，并用灯光描绘入口玄关、迎客松等节点立面，营造静穆、内敛、绝不张扬的贵雅家声。",
    imageUrl: villaImg,
    technicalDetails: {
      basePowerDensity: "3.5 W/㎡",
      typicalK: "2700K 琥珀温光 - 3000K 晨曦光",
      controlProtocol: "Savant / Control4 全屋智控联调",
      ecologyLevel: "Res-Luxury Standard"
    },
    features: [
      "全隐蔽射孔防眩，人眼视线15°内无刺眼眩光",
      "多节点灯光调参，满足迎宾、舒缓、深夜派对场景一键切换",
      "水景/叠水幕墙微弱高折射光亮流动",
      "定制黄铜雕刻草坪地埋系列，与原生土壤完美咬合"
    ],
    cases: [
      {
        title: "‘重山叠墅’现代悬崖观海庄园",
        location: "中国海南 · 三亚崖州悬崖",
        concept: "运用超窄角度5°探射点光源照亮白色清水混凝土挑梁，折面光阴分明，犹如一座夜幕下的发光地雕艺术品。",
        photographer: "Julius Shulman",
        stats: [
          { label: "智控场景", value: "12 组尊享一键" },
          { label: "隐蔽比例", value: "95% 见光不见灯" },
          { label: "灯具选型", value: "奢华定制黄铜外壳" }
        ]
      }
    ]
  },
  {
    id: "resort",
    name: "度假村灯光设计",
    englishName: "Starry Sanctuary Resort Lighting",
    description: "针对温泉小镇、生态小岛、海滨度假集群的整体环境规划。提炼本地质朴美学，运用漫射纸灯笼、软灯带、防眩树影灯、水面悬浮水晶灯，重织一个温暖治愈、满天繁星尽收眼底的无光害庇护所。",
    imageUrl: resortImg,
    technicalDetails: {
      basePowerDensity: "1.8 W/㎡",
      typicalK: "2000K 极暖光 - 2700K 篝火黄",
      controlProtocol: "NB-IoT / Lora 广域自组网物联网控制",
      ecologyLevel: "IDA 暗天空三星最高环保勋章"
    },
    features: [
      "全场采用下照式灯具（Fully Shielded），杜绝天空漫射",
      "利用仿生树脂手工灯罩，光线穿透极度自然柔美",
      "湖滨、水池防潮雾气漫射光斑设计",
      "慢节奏无感知自适应休眠节能中控系统"
    ],
    cases: [
      {
        title: "斐济喜多星宿海风度假村",
        location: "南太平洋 · 斐济莫米湾",
        concept: "‘萤火森林与繁星交汇’。低矮防滑步道埋地灯完全采用2000K光束，沙滩区则纯由微风萤火光点构成，仰头即是银河，脚下亦是星辰。",
        photographer: "Steve McCurry",
        stats: [
          { label: "光害污染值", value: "0 mCd/㎡ 零光害" },
          { label: "太阳能自给", value: "85% 超高循环" },
          { label: "总覆盖面积", value: "12,000 ㎡" }
        ]
      }
    ]
  },
  {
    id: "clubhouse",
    name: "会所灯光创新",
    englishName: "Clubhouse Lighting Innovation",
    description: "针对顶级私人会所、高品质社交俱乐部，着重演绎灯光的科技感与艺术张力。采用新型RGBW/RGBA全彩激光、超高亮DMX动态光斑，搭配无极感应擦墙与超窄焦束，带来沉浸式、高定新潮的流彩光效与社交奢境。",
    imageUrl: clubhouseImg,
    technicalDetails: {
      basePowerDensity: "5.5 W/㎡",
      typicalK: "2700K 奢金 - 4000K 珍珠清白",
      controlProtocol: "DMX512 / Art-Net / iPad 极简智控",
      ecologyLevel: "Eco-Design Energy Star"
    },
    features: [
      "独创会所全动态音乐节奏感应渲染算法",
      "全隐蔽超窄角光影洗墙与多层退晕流光",
      "冷暖智能感应昼夜场景一键奢调",
      "智能客流与微气候动态气流呼吸灯效"
    ],
    cases: [
      {
        title: "《流夜星海》极奢会所中庭光环境",
        location: "中国上海 · 私享滨江公馆会所",
        concept: "以‘高定星辰流彩’为灵感，利用微型无边射灯与多维度像素轮廓灯带配合，结合3000K-4000K极致退晕，构建出波澜壮阔的动态宴会或沉浸社交光场。",
        photographer: "Iwan Baan",
        stats: [
          { label: "中控区域", value: "18 组全息交互" },
          { label: "呼吸频率", value: "0.05 Hz-0.5 Hz" },
          { label: "灯光覆盖", value: "3,500 ㎡ 满载" }
        ]
      }
    ]
  },
  {
    id: "museum",
    name: "博物馆光效",
    englishName: "Museum Curation Lighting",
    description: "针对博物馆、美术馆、展览馆等文化空间的专业照明设计。以'见光不见展品之本真'为核心理念，采用无紫外线、无红外辐射的博物馆级LED光源，配合精密的光束角控制与防反射眩光技术，让每一件文物、画作在最纯粹的光环境中呈现其历史厚度与艺术张力。",
    imageUrl: museumImg,
    technicalDetails: {
      basePowerDensity: "4.2 W/㎡",
      typicalK: "3000K 暖白 - 4500K 自然光模拟",
      controlProtocol: "DALI-2 / Bluetooth Mesh 精密调光",
      ecologyLevel: "IEC 62493 博物馆级光生物安全认证"
    },
    features: [
      "无UV/IR辐射博物馆级光源，零损伤保护珍贵文物",
      "精密光学透镜控制，光束角可调范围1°-45°",
      "显色指数Ra≥98，R9≥90还原色彩本真",
      "智能恒照度感应系统，自动补偿环境光变化"
    ],
    cases: [
      {
        title: "《时光之匣》省级博物院常设展厅",
        location: "中国南京 · 江苏省博物院新馆",
        concept: "以'让文物自己讲述光阴故事'为核心叙事，采用分层重点照明与漫反射环境光的黄金配比1:3，每件展品拥有独立可调光轨道射灯，参观者走近时灯光柔缓渐亮，离去后自动退晕至休眠态。",
        photographer: "Herzog & de Meuron Lighting Dept",
        stats: [
          { label: "光源安全等级", value: "IEC 62493 RG0 零风险" },
          { label: "显色指数", value: "Ra=98 R9=95" },
          { label: "展品覆盖", value: "2,800+ 件独立控光" }
        ]
      }
    ]
  },
  {
    id: "restaurant",
    name: "餐饮光影",
    englishName: "Restaurant & Dining Ambiance",
    description: "高端餐饮空间的光影氛围营造。从米其林餐厅到精品咖啡馆，从日式割烹到中式私房菜，以'光影调味'为设计哲学，运用色温渐变、层次洗墙、桌面定点聚光与烛光拟真技术，为每道菜品编织专属的视觉味觉前奏，让食客在落座瞬间进入沉浸式美食仪式感。",
    imageUrl: restaurantImg,
    technicalDetails: {
      basePowerDensity: "6.8 W/㎡",
      typicalK: "1800K 烛光暖 - 2700K 琥珀金",
      controlProtocol: "KNX / RNet 场景一键调度",
      ecologyLevel: "HACCP 食品安全光照合规"
    },
    features: [
      "烛光拟真闪烁算法（频率2-5Hz可调），温暖而不刺眼",
      "餐桌中心CRi≥96高显色聚光，食材本色完美呈现",
      "多时段场景预设：午餐明亮、晚餐浪漫、深夜微醺",
      "酒柜/展示架独立RGBW窄光带，酒标清晰可辨"
    ],
    cases: [
      {
        title: "《焰境》黑珍珠法式料理主厅",
        location: "中国上海 · 外滩金融中心53层",
        concept: "以'火焰与星光共舞'为主题，主吊灯采用120颗独立可控暖光点光源组成动态星座阵列，每桌配备独立色温调节能力——前菜2700K清新、主菜2200K浓郁、甜点时切换至1800K烛光模式，整场用餐如同一部光之交响。",
        photographer: "Dimore Studio Lighting",
        stats: [
          { label: "场景预设", value: "8 组餐段联动" },
          { label: "桌面照度", value: "150 Lx 恰到好处" },
          { label: "灯具数量", value: "360+ 颗独立编组" }
        ]
      }
    ]
  },
  {
    id: "spa",
    name: "水疗光影",
    englishName: "Spa & Wellness Light Therapy",
    description: "奢华水疗与康养空间的治愈系光环境设计。融合光疗法（Light Therapy）专业理论，运用全光谱可调系统、生物节律同步技术、水下光纤星河与香氛联动的多层次氛围照明，打造五感合一的深度放松体验。光线本身即是疗愈的第一剂药方。",
    imageUrl: spaImg,
    technicalDetails: {
      basePowerDensity: "3.0 W/㎡",
      typicalK: "1700K 篝火余烬 - 6500K 日光全谱",
      controlProtocol: "Casambi / BLE Mesh 生物节律同步",
      ecologyLevel: "WELL Building Standard V2 光疗认证"
    },
    features: [
      "全光谱生物节律照明，支持昼夜节律Circadian自动调谐",
      "水池底部光纤星空顶，IP68防水等级安全无忧",
      "色光疗法模式：琥珀镇静、蔚蓝舒缓、玫瑰焕活",
      "与精油香氛系统智能联动，光香一体沉浸"
    ],
    cases: [
      {
        title: "《浮光静域》七星级城市隐逸水疗中心",
        location: "中国成都 · 春熙路地标塔楼68-72层",
        concept: "以'云端光之浴'为理念，整体空间采用无缝色温渐变系统——接待区4000K清醒→更衣室3000K过渡→理疗室2500K深 relax→水疗池区2000K极致放松。泳池底铺设2,400根光纤模拟银河倒影，人在水中如沐浴星光。",
        photographer: "Kelly Hoppen Lighting Design",
        stats: [
          { label: "节律同步精度", value: "±15min 太阳追踪" },
          { label: "光纤数量", value: "2,400 根 IP68" },
          { label: "疗愈场景", value: "12 组光香联动" }
        ]
      }
    ]
  },
  {
    id: "ktv-360",
    name: "KTV360度光效",
    englishName: "KTV 360° Immersive Lighting",
    description: "新一代KTV及娱乐空间的全域沉浸式光影系统。突破传统单面墙 lighting 局限，以360°全景环幕光场为核心，结合激光矩阵、地面互动投影、节奏同步脉冲灯阵与3D空间音频联动，打造身临其境的视听盛宴。每位顾客都是舞台中央的主角。",
    imageUrl: ktvImg,
    technicalDetails: {
      basePowerDensity: "12.5 W/㎡",
      typicalK: "RGBW全彩 + 2700K-8000K 色温域",
      controlProtocol: "DMX512 / Art-Net 8 universe / 音频分析实时联动",
      ecologyLevel: "IEC 61547 频闪安全认证"
    },
    features: [
      "360°环形LED像素幕墙，分辨率≥P4全彩显示",
      "音频节拍实时追踪，毫秒级灯光响应同步",
      "地面互动压力感应投影，脚步绽放光花效果",
      "多歌风预设：抒情温柔、摇滚狂野、电音派对一键切换"
    ],
    cases: [
      {
        title: "《光环虫洞》旗舰KTV包厢群",
        location: "中国长沙 · 国金中心娱乐层",
        concept: "以'穿越时空光隧道'为主题，每个包厢采用12面体360°环绕LED柔性屏+顶部镜面无限延伸视觉。当音乐响起，整间房的墙面化作流动光河——慢歌时极光缓缓流转，嗨曲时激光矩阵与地屏脉冲形成完整光之漩涡。",
        photographer: "Moment Factory Collaboration",
        stats: [
          { label: "环绕屏分辨率", value: "P4 柔性 360°" },
          { label: "音频延迟", value: "<8ms 实时同步" },
          { label: "光效预设", value: "200+ 歌风模板" }
        ]
      }
    ]
  },
  {
    id: "star-path",
    name: "星光路道",
    englishName: "Starlight Pathway & Garden Trail",
    description: "针对别墅私院、园林步道、屋顶花园、滨水栈道等户外行人通路的微光照明系统。以'脚踏星辰'为设计意象，运用超微型埋地灯、智能感应踏板灯、光纤碎石嵌灯与雾森激光投影，在地面编织出一条条如银河般蜿蜒流动的光之路。行人踏入的瞬间，光随步生，人过光隐，既安全引导又极致浪漫。",
    imageUrl: starPathImg,
    technicalDetails: {
      basePowerDensity: "1.2 W/㎡",
      typicalK: "2200K 暖星黄 - 4000K 月光银",
      controlProtocol: "PIR人体感应 + LORA 无线组网",
      ecologyLevel: "DarkSky 暗天空最低干扰认证"
    },
    features: [
      "超微型埋地灯直径≤25mm，与铺装石材完美齐平",
      "PIR人体感应+微波双鉴，行人踏入3米范围自动渐亮",
      "光纤碎石灯散落步道两侧，如星辰洒落人间",
      "雾森激光投影在步道表面形成流动光河效果"
    ],
    cases: [
      {
        title: "《银河归途》顶级私宅千米步道",
        location: "中国杭州 · 西湖畔半山别墅区",
        concept: "整条上山步道采用1,200颗超微型埋地灯（间距0.8m）配合两侧光纤碎石灯，形成宽1.5m的完整星光带。业主夜归时，灯光如迎接般从山脚一路渐亮至门前，宛如银河引导归途。",
        photographer: "Tadao Ando Light Lab",
        stats: [
          { label: "埋地灯数量", value: "1,200 颗 IP68" },
          { label: "感应精度", value: "3m 提前唤醒" },
          { label: "节能率", value: "78% PIR智能休眠" }
        ]
      }
    ]
  },
  {
    id: "art-installation",
    name: "灯光装置艺术",
    englishName: "Lighting Art Installation",
    description: "将灯光作为独立艺术媒介，为城市广场、商业综合体、高端私宅花园定制大型光影艺术装置。融合动态编程、互动感应与自然材质（雾森、水幕、镜面不锈钢），打造具有强烈视觉冲击力的地标级光影艺术品，让光线本身成为空间的主角。",
    imageUrl: artInstallImg,
    technicalDetails: {
      basePowerDensity: "8.5 W/㎡",
      typicalK: "RGBW全彩 + 1800K-6500K 动态域",
      controlProtocol: "Art-Net / sACN 多universe / 实时渲染引擎联动",
      ecologyLevel: "IEC 60598 户外重型装置安全认证"
    },
    features: [
      "大型互动光影装置，支持人体感应、声音触发、手机AR互动",
      "雾森+激光+投影多介质融合，创造梦幻沉浸式艺术空间",
      "定制镜面不锈钢+亚克力光导结构，白天亦是艺术品",
      "实时渲染引擎联动，装置光影随音乐/环境数据动态演变"
    ],
    cases: [
      {
        title: "《光之森·呼吸》城市广场巨型互动装置",
        location: "中国深圳 · 南山科技园中央广场",
        concept: "由128根高3-8米不等的光导亚克力柱组成'光之森林'，每根柱子内置PIR+麦克风阵列，能感知行人靠近和周围声音。当人群聚集时，柱子渐次'呼吸'发光，颜色随环境音量动态演变，成为城市最动人的公共艺术地标。",
        photographer: "TeamLab Collaboration",
        stats: [
          { label: "装置柱数量", value: "128 根 3-8m" },
          { label: "感应范围", value: "半径 15m 360°" },
          { label: "互动延迟", value: "<50ms 实时响应" }
        ]
      }
    ]
  }
];

export interface BlueprintPreset {
  id: string;
  name: string;
  svgPath: string; // Describes the wireframe elements or custom path
  defaultFixtures: {
    id: string;
    type: 'spot' | 'flood' | 'wash' | 'linear';
    x: number;
    y: number;
    angle: number;
    color: string;
    intensity: number;
  }[];
}

export const BLUEPRINT_PRESETS: BlueprintPreset[] = [
  {
    id: "monument-facade",
    name: "古建筑飞檐 (Ancient Pagoda)",
    svgPath: `
      M 10,90 L 90,90
      M 20,90 L 20,40 L 40,40 L 40,15 L 45,10 L 50,15 L 50,40 L 80,40 L 80,90
      M 40,40 L 40,15
      M 10,48 Q 20,40 30,48
      M 70,48 Q 80,40 90,48
      M 32,23 Q 45,10 58,23
    `,
    defaultFixtures: [
      { id: "pagoda-b1", type: "wash", x: 23, y: 88, angle: 60, color: "#e3a857", intensity: 80 },
      { id: "pagoda-b2", type: "wash", x: 77, y: 88, angle: 60, color: "#e3a857", intensity: 80 },
      { id: "pagoda-t1", type: "spot", x: 45, y: 45, angle: 15, color: "#d97706", intensity: 90 },
      { id: "pagoda-e1", type: "linear", x: 25, y: 41, angle: 30, color: "#f59e0b", intensity: 60 },
      { id: "pagoda-e2", type: "linear", x: 65, y: 41, angle: 30, color: "#f59e0b", intensity: 60 }
    ]
  },
  {
    id: "modern-tower",
    name: "现代超高层 (Modern Glass Tower)",
    svgPath: `
      M 10,95 L 90,95
      M 35,95 L 35,10 L 65,10 L 65,95
      M 35,25 L 65,25
      M 35,45 L 65,45
      M 35,65 L 65,65
      M 35,80 L 65,80
      M 42,10 L 42,95
      M 50,10 L 50,95
      M 58,10 L 58,95
    `,
    defaultFixtures: [
      { id: "tower-base-l", type: "flood", x: 20, y: 92, angle: 45, color: "#1e3a8a", intensity: 70 },
      { id: "tower-base-r", type: "flood", x: 80, y: 92, angle: 45, color: "#1e3a8a", intensity: 70 },
      { id: "tower-line-1", type: "linear", x: 50, y: 50, angle: 90, color: "#3b82f6", intensity: 85 },
      { id: "tower-crown", type: "spot", x: 50, y: 8, angle: 120, color: "#f8fafc", intensity: 95 }
    ]
  },
  {
    id: "nature-garden",
    name: "生态园林 (Nature Canopy)",
    svgPath: `
      M 5,90 Q 50,95 95,90
      M 25,90 C 25,70 15,60 30,50 C 45,40 25,20 50,15 C 75,20 55,40 70,50 C 85,60 75,70 75,90
      A 12,12 0 0,0 35,35
      A 16,16 0 0,0 65,33
    `,
    defaultFixtures: [
      { id: "garden-spot", type: "spot", x: 50, y: 92, angle: 25, color: "#22c55e", intensity: 65 },
      { id: "garden-moon", type: "wash", x: 85, y: 20, angle: 80, color: "#a5f3fc", intensity: 50 },
      { id: "garden-path", type: "wash", x: 20, y: 92, angle: 40, color: "#fef08a", intensity: 75 }
    ]
  }
];
