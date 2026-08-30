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
    id: "han-buddhist-temple-design",
    name: "汉传佛教设计",
    englishName: "Han Chinese Buddhist Temple Design",
    description: "依伽蓝七堂制与中轴对称布局，遵循宋《营造法式》与清《工程做法则例》推算材分。统筹僧团修行流线与信众礼佛动线，营造可长期使用的当代丛林。",
    imageUrl: culturalTourismImg,
    technicalDetails: {
      basePowerDensity: "大殿主体 约 800-1,500 ㎡",
      typicalK: "1800K-2400K 暖古铜色温",
      controlProtocol: "形制推算 / 斗口模数 / GB 50016 隐蔽消防",
      ecologyLevel: "国家级 / 省级文保合规审查"
    },
    features: [
      "伽蓝七堂中轴秩序与屋顶等级序列",
      "营造法式材分推算与斗拱层数严控",
      "木构、混凝土仿古、钢木组合三方比选"
    ],
    cases: [
      {
        title: "《莲境重光》汉传丛林整体营造",
        location: "中国浙江 · 某山地丛林寺院",
        concept: "依山就势组织七堂秩序，大雄宝殿采用钢木组合结构满足大跨度与抗震，外立面保持传统庑殿形制。",
        photographer: "禅境设计档案",
        stats: [
          { label: "建筑面积", value: "约 12,000 ㎡" },
          { label: "单体数量", value: "9 座殿堂 + 寮房" },
          { label: "营造工期", value: "28 个月" }
        ]
      }
    ]
  },
  {
    id: "taoist-temple-design",
    name: "道教宫观设计",
    englishName: "Taoist Temple & Palace Design",
    description: "因山就势、天人合一，深研道教神阶秩序、斋醮科仪坛场需求与风水格局，融入阴阳五行与洞天福地选址智慧。",
    imageUrl: lightshowImg,
    technicalDetails: {
      basePowerDensity: "宫观主体 约 600-2,000 ㎡",
      typicalK: "2200K 暖铜色温",
      controlProtocol: "风水格局 / 神阶秩序 / GB 50016 山地防火",
      ecologyLevel: "道教协会 + 文保双重审批"
    },
    features: [
      "三清殿、玉皇殿、斋醮坛场神阶秩序",
      "山地宫观边坡支护与材料垂直运输方案",
      "坛场仪轨方位与焚香排烟专项设计"
    ],
    cases: [
      {
        title: "《紫虚洞天》道教宫观山地营造",
        location: "中国湖北 · 武当山余脉",
        concept: "依四象格局选址，三清殿居中、玉皇殿居高、灵官殿守山门，斋醮坛场独立成区可容大型科仪。",
        photographer: "禅境设计档案",
        stats: [
          { label: "占地", value: "约 38,000 ㎡" },
          { label: "建筑高差", value: "126m 台地叠落" },
          { label: "斋醮坛场", value: "3 处独立成区" }
        ]
      }
    ]
  },
  {
    id: "tibetan-buddhist-temple-design",
    name: "藏传佛教设计",
    englishName: "Tibetan Buddhist Monastery Design",
    description: "以曼陀罗图式组织空间，收分墙体与平顶碉房是核心语汇；针对高原气候强化保温、抗风、避雷、抗震构造。",
    imageUrl: ancientImg,
    technicalDetails: {
      basePowerDensity: "大经堂 约 500-900 ㎡",
      typicalK: "2400K-2700K 鎏金色温",
      controlProtocol: "曼陀罗图式 / 收分墙体 / 高原适应性",
      ecologyLevel: "高烈度抗震 + 文保双审"
    },
    features: [
      "曼陀罗中心与四方秩序的空间组织",
      "阿嘎土平顶与柽柳边玛墙传统工艺",
      "金顶法轮结构抗风与防雷强化"
    ],
    cases: [
      {
        title: "《坛城金顶》藏传佛殿高原营造",
        location: "中国西藏 · 海拔 3,580m 山谷",
        concept: "大经堂以曼陀罗九宫格局组织柱网，收分墙厚达 1.2m 兼顾保温与抗风，金顶覆鎏金铜瓦与法轮双鹿。",
        photographer: "禅境设计档案",
        stats: [
          { label: "海拔", value: "3,580m" },
          { label: "墙体收分", value: "1.2m → 0.6m 渐收" },
          { label: "经堂面积", value: "720 ㎡" }
        ]
      }
    ]
  },
  {
    id: "theravada-buddhist-temple-design",
    name: "南传佛教设计",
    englishName: "Theravada Buddhist Temple Design",
    description: "重檐叠落的大屋顶、独立戒堂与干栏式构造，构成轻盈热烈的热带佛寺风貌；针对湿热多雨气候做通风、防潮、耐候专项设计。",
    imageUrl: gardenImg,
    technicalDetails: {
      basePowerDensity: "大殿 约 400-800 ㎡",
      typicalK: "3000K 中性暖白",
      controlProtocol: "干栏架空 / 重檐大屋顶 / 抗紫外耐候",
      ecologyLevel: "湿热气候适配 + IP65 以上防护"
    },
    features: [
      "多重檐陡坡大屋顶与金塔凌空地标",
      "底层架空通风与深远出檐遮阳防雨",
      "傣泰文化母题屋脊与金饰彩绘"
    ],
    cases: [
      {
        title: "《雨林金塔》南传佛寺热带营造",
        location: "中国云南 · 西双版纳傣族自治州",
        concept: "干栏式大殿底层架空 1.8m 防潮防虫，重檐五叠大屋顶覆鎏金瓦，独立戒堂供奉佛像与贝叶经。",
        photographer: "禅境设计档案",
        stats: [
          { label: "气候", value: "热带季风年均 1,200mm 雨量" },
          { label: "重檐叠数", value: "5 叠" },
          { label: "底层架空", value: "1.8m 高通风层" }
        ]
      }
    ]
  },
  {
    id: "temple-architecture-design",
    name: "寺庙建筑设计",
    englishName: "Temple Architecture Design",
    description: "从场地勘察到施工图绘制的全流程寺院建筑设计，统筹木构与现代结构比选、古建修缮可逆做法、消防与设备隐蔽化整合。",
    imageUrl: hotelImg,
    technicalDetails: {
      basePowerDensity: "项目规模 300-20,000 ㎡",
      typicalK: "1800K-3000K 暖色温系列",
      controlProtocol: "营造法式 / GB 50016 / GB 50034",
      ecologyLevel: "建筑 + 结构 + 古建三方协同"
    },
    features: [
      "总体规划、单体建筑、结构方案、构造大样",
      "木构、混凝土仿古、钢木组合三方比选",
      "隐蔽式消防与无障碍礼佛空间整合"
    ],
    cases: [
      {
        title: "《千年宝刹》古建修缮可逆改造",
        location: "中国山西 · 某全国重点文保寺院",
        concept: "对宋金木构大殿进行结构加固与屋面修缮，全部新加构件采用可逆锚固，彩画地仗按传统工艺恢复。",
        photographer: "禅境设计档案",
        stats: [
          { label: "保护等级", value: "全国重点文保单位" },
          { label: "大殿年代", value: "宋金 (约 900 年)" },
          { label: "修缮工期", value: "36 个月" }
        ]
      }
    ]
  },
  {
    id: "temple-interior-design",
    name: "寺庙室内设计",
    englishName: "Temple Interior Design",
    description: "统筹佛殿、禅堂、经堂、客堂、斋堂、僧寮的室内设计，把佛像供奉的仪轨尺度、诵经声学与香火安全管理融为一体。",
    imageUrl: exhibitionHallImg,
    technicalDetails: {
      basePowerDensity: "室内空间 50-1,500 ㎡",
      typicalK: "2200K-3000K 静穆色温",
      controlProtocol: "佛龛仪轨 / 藻井声扩散 / 排烟防火",
      ecologyLevel: "GB 50016 室内防火 + 防熏染材料"
    },
    features: [
      "佛坛高度、拜垫间距、绕佛通道仪轨尺度",
      "藻井造型声扩散控制诵经混响时间",
      "耐香火熏染、易清洁维护的饰面材料"
    ],
    cases: [
      {
        title: "《礼佛净域》大雄宝殿室内营造",
        location: "中国福建 · 某汉传大丛林",
        concept: "佛坛按三佛供奉仪轨定制，藻井三层叠落做声扩散，地面青砖包边供信众礼拜。",
        photographer: "禅境设计档案",
        stats: [
          { label: "大殿净高", value: "12.6m" },
          { label: "藻井层数", value: "3 层叠落" },
          { label: "拜垫容纳", value: "240 位信众" }
        ]
      }
    ]
  },
  {
    id: "temple-furnishing-design",
    name: "寺庙软装设计",
    englishName: "Temple Furnishing Design",
    description: "经幡幢幡、供具法器、帷幔坐具、插花供果的整体陈设，遵循仪轨规范，统筹日常、朔望、佛诞、法会多套节庆场景。",
    imageUrl: restaurantImg,
    technicalDetails: {
      basePowerDensity: "陈设面积 100-3,000 ㎡",
      typicalK: "现场色温依殿宇定",
      controlProtocol: "仪轨优先 / 阻燃织物 / 节庆切换",
      ecologyLevel: "阻燃国标 + 天然材质优先"
    },
    features: [
      "经幡、供具、帷幔的仪轨规范与法度",
      "织物阻燃处理与耐香火熏染选材",
      "日常、朔望、佛诞、法会多套陈设预案"
    ],
    cases: [
      {
        title: "《庄严具足》佛诞节庆整体陈设",
        location: "中国广东 · 某律宗道场",
        concept: "为佛诞日设计专属陈设方案：黄底金纹幢幡三重大殿通挂，供盘七件按七供规制，鲜花用曼陀罗造型。",
        photographer: "禅境设计档案",
        stats: [
          { label: "节庆陈设", value: "4 套（日常/朔望/佛诞/水陆）" },
          { label: "织物总量", value: "约 680 ㎡" },
          { label: "供具规制", value: "七供齐备" }
        ]
      }
    ]
  },
  {
    id: "temple-sculpture-design",
    name: "寺庙造型雕塑设计",
    englishName: "Temple Sculpture & Statuary Design",
    description: "佛像、菩萨、罗汉、护法神将、经幢石雕的造型设计，严格遵循《造像量度经》，从泥塑小样到成品验收全程把控。",
    imageUrl: museumImg,
    technicalDetails: {
      basePowerDensity: "造像高度 0.3-9.8m",
      typicalK: "材质本色（非灯光色温）",
      controlProtocol: "造像量度经 / 仪轨手印 / 泥塑小样",
      ecologyLevel: "木雕榫卯 / 失蜡铸 / 脱胎漆传统工艺"
    },
    features: [
      "造像量度经校核比例手印法器",
      "泥塑 1:10/1:5 小样先行确认",
      "木雕、石雕、铜铸、脱胎漆、贴金工艺选型"
    ],
    cases: [
      {
        title: "《千佛悲智》大雄宝殿三佛造像",
        location: "中国四川 · 某重建汉传丛林",
        concept: "释迦、药师、阿弥陀三佛按《造像量度经》严校比例，泥塑小样经寺方与仪轨双确认后香樟木雕贴金。",
        photographer: "禅境设计档案",
        stats: [
          { label: "三佛高度", value: "主佛 9.8m / 二佛 7.6m" },
          { label: "小样轮次", value: "12 轮 1:5 修改" },
          { label: "贴金用量", value: "约 38kg 金箔" }
        ]
      }
    ]
  },
  {
    id: "temple-landscape-design",
    name: "寺庙景观设计",
    englishName: "Temple Landscape Design",
    description: "寺院园林、放生池水景、庭院植物、香道步道的禅意景观设计，统筹山地排水、无障碍通行与夜景照明的系统营造。",
    imageUrl: gardenImg,
    technicalDetails: {
      basePowerDensity: "景观面积 1,000-50,000 ㎡",
      typicalK: "2200K 户外暖色温",
      controlProtocol: "禅意园林 / 山地排水 / 低维护植物",
      ecologyLevel: "截排水 + 边坡 + 乡土植物"
    },
    features: [
      "以少胜多、借景框景的禅意序列",
      "放生池水景与消防水源功能合一",
      "山地截排水与无障碍香道步道"
    ],
    cases: [
      {
        title: "《空山禅径》寺院山地园林",
        location: "中国江西 · 某山林寺院",
        concept: "依山势设三段礼佛序列：放生池、菩提院、登高香道；银杏松柏配以枯山水石组，营造静观空间。",
        photographer: "禅境设计档案",
        stats: [
          { label: "景观面积", value: "约 18,000 ㎡" },
          { label: "高差处理", value: "约 78m 分级台地" },
          { label: "乡土树种", value: "28 种" }
        ]
      }
    ]
  },
  {
    id: "temple-lighting-design",
    name: "寺庙灯光设计",
    englishName: "Temple Lighting Design",
    description: "寺庙夜景亮化、佛殿照明、佛塔照明与景观照明的整体设计。见光不见灯，1800K-2400K 暖色温，古建零损伤非破坏性安装。",
    imageUrl: starPathImg,
    technicalDetails: {
      basePowerDensity: "照度 15-30Lx 平均",
      typicalK: "1800K-2400K 暖古铜色温",
      controlProtocol: "DMX512 / DALI / 智能分时场景",
      ecologyLevel: "见光不见灯 + 古建零损伤"
    },
    features: [
      "灯具深藏斗拱檐口的见光不见灯",
      "古建非破坏性张力抱箍承载",
      "早晚课、节庆、闭寺智能分时场景"
    ],
    cases: [
      {
        title: "《月照宝殿》古建寺庙整体亮化",
        location: "中国浙江 · 某全国重点文保寺院",
        concept: "大殿屋顶、檐口、斗拱分层投光强化木构层次，佛塔分层打亮塔刹做竖向焦点，全部采用非破坏性抱箍承载。",
        photographer: "禅境设计档案",
        stats: [
          { label: "灯具总数", value: "约 1,280 套" },
          { label: "色温", value: "统一 2200K" },
          { label: "节能效果", value: "智能分时节能 42%" }
        ]
      }
    ]
  },
  {
    id: "ancestral-hall-space-design",
    name: "祠堂空间设计",
    englishName: "Ancestral Hall Space Design",
    description: "依《朱子家礼》三进形制，按昭穆位次组织空间。兼顾祭祀仪轨、族谱陈列、家风讲学、节庆聚会的复合使用需求，适配徽派、客家、潮汕、闽南、巴蜀等地域宗族文化。",
    imageUrl: villaImg,
    technicalDetails: {
      basePowerDensity: "祠堂主体 约 300-1,800 ㎡",
      typicalK: "2200K-2700K 暖色温",
      controlProtocol: "三进二井制 / 昭穆位次 / 匾联堂号",
      ecologyLevel: "传统营造 + 现代规范融合"
    },
    features: [
      "依《朱子家礼》三进形制组织礼仪序列",
      "中轴对称、昭穆位次、左右配享严格布局",
      "传统营造与族谱陈列、家风讲堂复合功能兼容"
    ],
    cases: [
      {
        title: "《敦本堂》徽派宗祠整体营造",
        location: "中国安徽 · 皖南某千年古村",
        concept: "三进二井制中轴对称，正厅享堂高悬「敦本」堂号，两侧厢房改造为族谱陈列室与家风讲堂。",
        photographer: "禅境设计档案",
        stats: [
          { label: "建筑面积", value: "约 1,860 ㎡" },
          { label: "形制", value: "三进二井制" },
          { label: "承载人口", value: "全族约 2,400 人" }
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
      { id: "pagoda-e1", type: "linear", x: 25, y: 41, angle: 30, color: "#d4a441", intensity: 60 },
      { id: "pagoda-e2", type: "linear", x: 65, y: 41, angle: 30, color: "#d4a441", intensity: 60 }
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
      { id: "tower-line-1", type: "linear", x: 50, y: 50, angle: 90, color: "#c2452b", intensity: 85 },
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