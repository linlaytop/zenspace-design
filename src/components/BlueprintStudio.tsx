import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Cpu, 
  Sliders, 
  Flame, 
  Droplets, 
  Zap, 
  BookOpen 
} from "lucide-react";

// High fidelity specifications database for showcase
const PRODUCTS_DATA = [
  {
    id: "spot",
    name: "LumiFocus™ 极窄角精密投光灯",
    englishName: "LumiFocus Extreme Spotlight",
    icon: "🎯",
    tag: "立面精控",
    specs: {
      power: "120W",
      chip: "OSRAM RGBW 多合一高光效芯片",
      beamAngle: "3° / 5° / 8° / 15° 偏振调焦",
      luminousFlux: "12,000 lm",
      waterproof: "IP67 双密腔防暴设计",
      material: "高压铸铝 ADC12 + 耐高压防爆钢化玻璃"
    },
    description: "针对超高层、立柱、狭长面等阳角线条设计的极窄投光。聚焦度极高，确保数十米高空的光斑边缘无散乱虚影，完美避免散光夜空溢散。",
    applications: ["古建筑翘角飞檐", "高耸建筑外立柱及斜面", "阳角线条立体拉直拉长"]
  },
  {
    id: "wash",
    name: "LumiWash™ 擦墙洗墙/掠射光斑灯",
    englishName: "LumiWash Tech Wall Washer",
    icon: "📐",
    tag: "肌理渲染",
    specs: {
      power: "72W / 96W 高定配置",
      chip: "CREE XP-G3 专业级户外高功率阵列",
      beamAngle: "15° x 45° 非对称流线透镜",
      luminousFlux: "6,800 lm",
      waterproof: "IP67 防水，双腔物理散热槽",
      material: "优质加厚经硬阳极氧化挤压铝型材"
    },
    description: "专为高奢立面精心裁制。通过非对称光学透镜，让光线紧贴石墙、微雕或凹凸扣板，使材质独有的阴影与起伏肌理完美展现，刻画纯粹建筑感。",
    applications: ["花岗岩透光板干挂立面", "高端星级酒店底座入口裙楼", "雕塑浮雕或多缝材质背景擦光"]
  },
  {
    id: "flood",
    name: "LumiFlood™ 全真变焦广角泛光灯",
    englishName: "LumiFlood Environment Floodlight",
    icon: "📢",
    tag: "环境大色块",
    specs: {
      power: "180W 旗舰大功率",
      chip: "Philips Lumileds 高显指混光芯片",
      beamAngle: "65° ~ 120° 连续无阶自动变焦",
      luminousFlux: "18,000 lm",
      waterproof: "IP67 多层阻水网防雷 Class I",
      material: "冷锻铝高散鳍片结构，抗12级强风"
    },
    description: "大面积、大画幅亮化首选。支持远距离由暗夜背景面漫洗至强漫染色，也极其适用于度假村绿化茂密乔木、海湾沙滩的环境大氛围洗光，染色极度自然。",
    applications: ["大型公建地标背景底色漫洗", "园林景观林冠高空温和显色", "台基斜坡大视野远距离染色"]
  },
  {
    id: "linear",
    name: "LumiLine™ 柔性像素星空轮廓灯",
    englishName: "LumiLine Smart Pixel Line Light",
    icon: "➖",
    tag: "像素律动",
    specs: {
      power: "15W 每米 (DC24V 安全真多级)",
      chip: "Nichia 白光高纯系列 / 双路DMX512可调",
      beamAngle: "120° 平滑乳白透光偏振弧面",
      luminousFlux: "1,200 lm / m",
      waterproof: "IP68 超真空全灌胶防侵水封密",
      material: "抗黄变耐低温工程硅胶双层挤出"
    },
    description: "连绵不间断的无缝弧面线条灯。卡槽串接配合，可在外幕墙钢网架构、人行拱桥抛物线上，形成连绵闪烁光瀑。在极低照度下依然支持丝滑呼吸流转。",
    applications: ["地标巨幕写字楼外网格屏", "钢索拉跨桥身流水动态虚抛线", "窗槛天花吊顶流畅防眩暗糟"]
  },
  {
    id: "temple-shrine-light",
    name: "古建抱箍式斗拱擦亮射灯（零损伤）",
    englishName: "Heritage Shrink-Fit Eave Spotlight",
    icon: "🏯",
    tag: "古建寺庙亮化",
    specs: {
      power: "9W (LED COB 暖古铜)",
      chip: "微棱镜防眩透镜 + 张力抱箍承载",
      beamAngle: "12° ~ 24° 窄角精准擦亮",
      luminousFlux: "380 lm",
      waterproof: "IP65 户外防潮阻燃",
      material: "黄铜本色外壳 + 古铜色烤漆"
    },
    description: "专为古建寺庙殿宇设计的零损伤擦亮射灯。采用非破坏性张力抱箍承载，无需在古木砖石上打孔；1800K-2400K 暖古铜光突出木构彩画层次；微棱镜防眩，灯具深藏于斗拱、檐口凹槽内，符合见光不见灯原则。",
    applications: ["全国重点文保寺院大殿檐口", "佛塔塔刹与斗拱分层擦亮", "藏式碉房收分墙与金顶法轮照明"]
  }
];

// Core technology specifications database
const TECHNOLOGIES_DATA = [
  {
    title: "Art-Net / DMX512 控制总线",
    sub: "Smart Digital Control Bus System",
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    desc: "将所有物理端点的硬件灯具全面数字化，支持16位精细无损编组及微秒级数据包解包。高频刷新的传输机制能够完美杜绝动态呼吸、流光变色、水力喷泉动作中的任何视觉抖动或卡顿，保证场景切换浑然天成。"
  },
  {
    title: "16-Bit 对数无级微调光曲线",
    sub: "Logarithmic Smooth Dimming Engine",
    icon: <Sliders className="w-5 h-5 text-yellow-500" />,
    desc: "摒弃传统的线性调光阻滞，基于人眼视觉嗜对比对数物理规律校对调光通道。在1%至15%的极低照度弱光段内实现连绵不断、无感过渡的多阶顺滑衰减，为暗夜环境注入呼吸般的灵动生命力。"
  },
  {
    title: "IDA 暗天空遮蔽抗溢光透镜",
    sub: "IDA Compliant Anti-stray Light Optics",
    icon: <Flame className="w-5 h-5 text-emerald-500" />,
    desc: "极致落实暗天空保护原则。独家设计物理防眩光蜂窝遮光护盖以及不偏光切断，杜绝仰斜照空引发的大气颗粒反射光污染。严格控制灯具束光面在仰角90°及以上散逸通量的外溢阈测，让璀璨的繁星自然重返地平线。"
  },
  {
    title: "水力、变频泵一体化毫秒控制",
    sub: "Integrated Multi-Pump Synchronizer",
    icon: <Droplets className="w-5 h-5 text-blue-500" />,
    desc: "完美同步喷泉水阀和激光发生模块。系统在毫秒级别实时探测水流质点弹射速度与高度，智能计算风偏补偿参数，从而根据音画节拍动态补偿激光的高速光偏偏折偏转。每一滴飞扬的水珠均在完美的透光点上与激光交响交锋。"
  }
];

export default function BlueprintStudio() {
  const [activeSubTab, setActiveSubTab] = useState<'products' | 'tech'>('products');

  return (
    <div id="blueprint-studio" className="flex flex-col gap-6 text-neutral-100">
      
      {/* 1. TOP CAPABILITY HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 p-6 rounded-3xl border border-neutral-850 shadow-lg select-none">
        <div className="text-left w-full lg:max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 font-extrabold">CORE CENTER / 科技与产品运用中心</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight font-sans text-neutral-100">科技与产品运用</h2>
          <p className="text-xs text-neutral-400 leading-relaxed mt-1 overflow-hidden">
            本中心集中展示 <strong>寺庙佛教设计</strong> 旗下的高端建筑与景观亮化硬件产品、智慧级数字中控联动技术。您可在产品库中了解专业配光指标与智能联动协议。
          </p>
        </div>

        {/* Dynamic sub-tab switcher */}
        <div className="flex bg-neutral-950 p-1 rounded-xl border border-neutral-800/80 shrink-0 w-full lg:w-auto">
          <button
            onClick={() => setActiveSubTab('products')}
            className={`flex-1 lg:flex-initial px-5 py-2.5 rounded-lg text-xs font-bold font-sans flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'products'
                ? "bg-cyan-500 text-neutral-950 shadow-md font-extrabold"
                : "text-neutral-400 hover:text-neutral-255"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            灯光卓越产品库
          </button>
          
          <button
            onClick={() => setActiveSubTab('tech')}
            className={`flex-1 lg:flex-initial px-5 py-2.5 rounded-lg text-xs font-bold font-sans flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'tech'
                ? "bg-cyan-500 text-neutral-950 shadow-md font-extrabold"
                : "text-neutral-400 hover:text-neutral-255"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            前沿智能技术底座
          </button>
        </div>
      </div>

      {/* 2. SUB-TAB ENGINES RENDER MODULES */}
      
      {/* 2A. PREMIUM PRODUCTS CATALOGUE SHEET */}
      {activeSubTab === 'products' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PRODUCTS_DATA.map((prod) => (
            <div 
              key={prod.id}
              className="bg-neutral-900/60 hover:bg-neutral-900/85 border border-neutral-850/80 hover:border-cyan-500/30 rounded-2xl p-5 flex flex-col justify-between tracking-normal transition-all duration-300 shadow shadow-neutral-950 text-left"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl bg-neutral-950/60 p-2 rounded-xl border border-neutral-800 shrink-0 leading-none">{prod.icon}</span>
                    <div className="text-left">
                      <h4 className="font-bold text-neutral-100 text-sm leading-tight">{prod.name}</h4>
                      <p className="text-[10px] text-neutral-450 font-mono tracking-tight font-light mt-0.5">{prod.englishName}</p>
                    </div>
                  </div>
                  <span className="text-[9px] bg-cyan-400/10 text-cyan-400 font-mono font-bold px-2 py-0.5 border border-cyan-500/20 rounded-md shrink-0">
                    {prod.tag}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed text-left pb-4 border-b border-neutral-850/50">
                  {prod.description}
                </p>

                {/* Specs sheets panel */}
                <div className="py-4 flex flex-col gap-2.5 text-xs">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-neutral-500 font-mono uppercase">💡 物理标称功耗</span>
                    <span className="text-neutral-255 font-bold font-mono">{prod.specs.power}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-neutral-500 font-mono uppercase">🧩 核心芯片单元</span>
                    <span className="text-neutral-255 font-medium truncate max-w-[160px]" title={prod.specs.chip}>{prod.specs.chip}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-neutral-500 font-mono uppercase">🎯 光束聚焦折角</span>
                    <span className="text-neutral-255 font-bold font-mono">{prod.specs.beamAngle}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-neutral-500 font-mono uppercase">✨ 额定总光通量</span>
                    <span className="text-cyan-400 font-extrabold font-mono">{prod.specs.luminousFlux}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-neutral-500 font-mono uppercase">⛈️ 户外防尘防水</span>
                    <span className="text-neutral-255 font-mono">{prod.specs.waterproof}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-neutral-500 font-mono uppercase">🧱 壳体材料构成</span>
                    <span className="text-neutral-255 truncate max-w-[170px] text-right" title={prod.specs.material}>{prod.specs.material}</span>
                  </div>
                </div>

                {/* Application suggestions tags */}
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-850/60 text-left mt-1">
                  <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase block mb-1.5">📐 推荐应用场景:</span>
                  <div className="flex flex-wrap gap-1">
                    {prod.applications.map((app, idx) => (
                      <span key={idx} className="text-[10px] text-neutral-300 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                        • {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* 2B. SMART LIGHTING SYSTEM CORE TECHNOLOGIES */}
      {activeSubTab === 'tech' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {TECHNOLOGIES_DATA.map((t, idx) => (
            <div 
              key={idx}
              className="bg-neutral-900/40 border border-neutral-850/80 rounded-2xl p-6 text-left flex gap-4 leading-relaxed hover:border-neutral-750 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-850/60 flex items-center justify-center shrink-0">
                {t.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-neutral-100 text-base flex items-center gap-2">
                  {t.title}
                </h4>
                <p className="text-[10px] text-[#c2452b] font-mono tracking-wider font-bold uppercase mt-0.5">
                  {t.sub}
                </p>
                <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            </div>
          ))}
          
          <div className="md:col-span-2 bg-[#082f49]/15 border border-cyan-800/20 p-6 rounded-2xl text-left flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex gap-3 items-center">
              <Zap className="w-6 h-6 text-cyan-400 animate-pulse shrink-0" />
              <div>
                <h5 className="text-neutral-100 text-sm font-bold">寻求更高强度的定制化控制流？</h5>
                <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                  寺庙佛教设计工程实验室提供定制化智能中控联动。欢迎通过 智能设计顾问询问特定物理阻抗对数调光布灯方案。
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                const aiBtn = document.getElementById("tab-btn-ai");
                if (aiBtn) aiBtn.click();
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-neutral-950 font-black rounded-xl text-xs shrink-0 select-none cursor-pointer"
            >
              咨询 智能中控顾问
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
