import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Send,
  HelpCircle,
  Cpu,
  CheckCircle,
  AlertTriangle,
  FileText,
  Thermometer,
  EyeOff,
  Clock,
  Wrench,
  Compass,
  Key
} from "lucide-react";
import { ConsultationPlan } from "../types";

const SPACE_OPTIONS = [
  "灯光秀 (Laser & Projection Mapping)",
  "酒店外观 (Luxury Hotel Exterior)",
  "办公楼外立面 (Office Building Facade)",
  "古建筑照明 (Heritage Architecture)",
  "园林景观 (Ecological Garden/Landscape)",
  "别墅私定 (Bespoke Luxury Villa)",
  "度假村全景 (Scenic Starry Resort)"
];

const MATERIAL_OPTIONS = [
  "超白中空玻璃幕墙 (Glass Curtain Wood)",
  "粗砺花岗岩大理石背挂石材 (Rough Marble/Granite Stone)",
  "古木结构及榫卯木质原貌 (Classical Timber Truss)",
  "清水细骨料混凝土面层 (Smooth Architectural Concrete)",
  "林梢植被、竹林与湿地河塘 (Ecological Canopy & Waterpond)",
  "白色氟碳喷涂铝单板 (Coated Aluminum Architectural Panels)"
];

const VIBE_OPTIONS = [
  "尊贵暖金 (Prada 2700K Gold Wash)",
  "神秘月光冷亮 (Serene 4000K Moonlight)",
  "科技前卫脉动 (Cyber RGB Dynamic Pulse)",
  "极简寂静无光 (Zen Quietness - Ultra Low contrast)",
  "古典篝火微黄 (Tradition Campfire Amber 2000K)"
];

export default function SmartConsultant() {
  const [spaceType, setSpaceType] = useState(SPACE_OPTIONS[0]);
  const [materials, setMaterials] = useState(MATERIAL_OPTIONS[0]);
  const [heights, setHeights] = useState("");
  const [style, setStyle] = useState(VIBE_OPTIONS[0]);
  const [customReqs, setCustomReqs] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<ConsultationPlan | null>(null);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("lumos_gemini_api_key") || "");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const loadingMessages = [
    "正在建模测算载体折复折射系数...",
    "规划DMX-512多重信号抗衰中控节律...",
    "精算墙面洗光掠射投光角防止大面积溢光...",
    "优化光通量亮度对比，配制高级智能灯具单...",
    "调优IDA暗河暗夜保协会双碳环保生态等级..."
  ];

  // Persist API key to localStorage
  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    localStorage.setItem("lumos_gemini_api_key", key);
  };

  // Client-side Gemini API call for static deployment
  const callGeminiDirectly = async (payload: {
    spaceType: string;
    materials: string;
    heights: string;
    style: string;
    customRequirements: string;
  }): Promise<ConsultationPlan> => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `你是一位资深户外灯光设计顾问。根据以下参数，生成一份专业照明设计方案。

载体类型：${payload.spaceType}
核心建材：${payload.materials}
建筑高度/规模：${payload.heights}
风格调性：${payload.style}
特殊诉求：${payload.customRequirements}

请以JSON格式返回方案，包含以下字段：
{
  "title": "方案名称",
  "concept": "创意理念描述(200字以内)",
  "colorTemperature": "色温体系描述",
  "illuminanceRating": "照度等级",
  "fixtures": [
    {"name":"灯具名称","purpose":"用途","power":"功率","qty":"数量"}
  ],
  "controlSystem": "中控系统描述",
  "ecologyProtection": "生态保护说明"
}

仅返回JSON，不要添加markdown代码块标记。`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: "application/json"
          }
        })
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `接口调用失败 (${response.status})`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("返回内容为空");

    return JSON.parse(text) as ConsultationPlan;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPlan(null);

    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
    }, 1800);

    try {
      const payload = {
        spaceType,
        materials,
        heights: heights || "常规高端规模",
        style,
        customRequirements: customReqs
      };

      let result: ConsultationPlan;

      if (apiKey) {
        // Static deployment: call Gemini API directly from client
        result = await callGeminiDirectly(payload);
      } else {
        // Server deployment: call backend API
        const res = await fetch("/api/consult", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "获取智控方案故障，请确认。");
        }
        result = data.plan;
      }

      setPlan(result);
    } catch (err: any) {
      console.error(err);
      const msg = err.message || "服务器网络节点繁忙，智能咨询功能暂时不可达。";
      setError(msg.includes("Failed to fetch") || msg.includes("NetworkError")
        ? "智能顾问暂不可用。请点击左上角「API 密钥」按钮输入您的 API Key 以启用智能咨询功能。"
        : msg
      );
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div id="ai-smart-consultant" className="bg-neutral-900/40 border border-neutral-800/60 rounded-3xl p-6 lg:p-8 text-neutral-100">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT CHAT FORM (5/12) */}
        <form onSubmit={handleSubmit} className="lg:col-span-5 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">SMART LIGHTING CONSULTANT / 智能创意顾问</span>
          </div>

          {/* API Key Configuration */}
          <div className="bg-neutral-950/60 border border-neutral-800/50 rounded-xl p-3">
            <button
              type="button"
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="w-full flex items-center justify-between text-xs text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-yellow-500" />
                {apiKey ? "API Key 已配置 ✓" : "配置 API Key 以启用智能顾问"}
              </span>
              <span className="text-[9px] text-neutral-600">点击{showApiKeyInput ? "收起" : "展开"}</span>
            </button>
            {showApiKeyInput && (
              <div className="mt-2 flex flex-col gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  placeholder="输入您的 API Key"
                  className="w-full bg-neutral-950 border border-neutral-800 p-2 rounded-lg text-xs text-neutral-200 outline-none focus:border-yellow-500/50 placeholder-neutral-600 font-mono"
                />
                <p className="text-[9px] text-neutral-600 leading-relaxed">
                  密钥仅存储于您的浏览器本地，不会上传至任何服务器。获取 API Key 请访问
                  <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline ml-1">Google API 平台</a>
                </p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-neutral-100 tracking-tight">智能照明顾问平台</h2>
            <p className="text-xs text-neutral-400 leading-relaxed mt-2">
              基于先进的 <b>智能认知引擎</b>，输入您的空间诉求与材质背景，系统能一键生成包含照度、色温、灯具列表及中控周期的全套深化照明大纲。
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            
            {/* Space type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-300">载体类型 (Space Type)</label>
              <select
                value={spaceType}
                onChange={(e) => setSpaceType(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-xl text-xs text-neutral-300 outline-none focus:border-yellow-500/50 cursor-pointer"
              >
                {SPACE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Facade materials */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-300">核心表皮建材 (Facade Materials)</label>
              <select
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-xl text-xs text-neutral-300 outline-none focus:border-yellow-500/50 cursor-pointer"
              >
                {MATERIAL_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Vibe and theme style */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-300">期望光合调性 (Expectant Tone & Vibe)</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-xl text-xs text-neutral-300 outline-none focus:border-yellow-500/50 cursor-pointer"
              >
                {VIBE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Scale input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-300">建筑层数 / 高度 / 景观占地层级</label>
              <input
                type="text"
                placeholder="例如：120米玻璃大厦 / 3层坡屋面别墅"
                value={heights}
                onChange={(e) => setHeights(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-xl text-xs text-neutral-300 outline-none focus:border-yellow-500/50 placeholder-neutral-600"
              />
            </div>

            {/* Custom specification box */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-300">个性化特别诉求 (Bespoke Requirements)</label>
              <textarea
                rows={3}
                placeholder="例如：强调湖面投影暗淡，防止惊扰河中白鹭；入口迎客松需要被单独勾勒；要求超薄型材见光不见灯。"
                value={customReqs}
                onChange={(e) => setCustomReqs(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-xl text-xs text-neutral-300 outline-none focus:border-yellow-500/50 placeholder-neutral-600 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 h-11 bg-yellow-500 hover:bg-yellow-400 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer`}
            >
              <Send className="w-4 h-4" />
              {loading ? "正在由高级算法深度解析中..." : "极速生成定制级户外照明大纲策划案"}
            </button>
          </div>
        </form>

        {/* RIGHT DISPLAY WINDOW (7/12) */}
        <div className="lg:col-span-7 h-full flex flex-col min-h-[450px] justify-center bg-neutral-950/40 border border-neutral-850 rounded-2xl p-6 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            
            {/* LOADING SCENE */}
            {loading && (
              <motion.div
                key="loading-panel"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#070a0d] z-10 flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="relative mb-6">
                  {/* Glowing neon spinner ring */}
                  <div className="w-16 h-16 rounded-full border-2 border-neutral-800/80 border-t-yellow-400 animate-spin" />
                  <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
                
                <h4 className="text-sm font-semibold text-neutral-100 font-mono tracking-widest uppercase">Dialux & Luminosity Computing</h4>
                <p className="text-xs text-yellow-400 font-mono italic mt-2 animate-pulse">
                  {loadingMessages[loadingStep]}
                </p>
                <div className="text-[10px] text-neutral-500 max-w-xs mt-6 leading-relaxed">
                  系统正根据《国际暗夜天空保护协议》和中国居住区无眩光亮度控制算法，进行色温阶梯与DALI中控链路自动演算分配...
                </div>
              </motion.div>
            )}

            {/* ERROR DISPLAY */}
            {error && (
              <motion.div
                key="error-panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4 text-center py-10"
              >
                <AlertTriangle className="w-12 h-12 text-red-500" />
                <div>
                  <h3 className="text-base font-bold text-neutral-100">智能创意顾问连接异常</h3>
                  <p className="text-xs text-neutral-400 mt-2 max-w-sm leading-relaxed mx-auto">
                    {error}
                  </p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="px-4 py-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-850 text-neutral-300 text-xs rounded-lg transition-all"
                >
                  重试提报
                </button>
              </motion.div>
            )}

            {/* DEFAULT GUIDE CARD */}
            {!loading && !error && !plan && (
              <motion.div
                key="empty-panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center gap-4 text-center py-12"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 text-yellow-400">
                  <Compass className="w-6 h-6 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-200">静待提报项目细节</h3>
                  <p className="text-xs text-neutral-500 mt-2 max-w-sm leading-relaxed">
                    在左侧面板设置您的目标承载立面、地埋基建要求、色温预期与高级材质，智能创意总监将根据经典东方光影美学为您提送高定级方案。
                  </p>
                </div>
                
                <div className="text-[10px] text-neutral-600 font-mono border border-neutral-850 p-2.5 rounded-xl max-w-xs mt-2">
                  提示：系统会全自动评估该项目所需的蜂窝深度防眩灯配置量并提供中控定时闭暗曲线。
                </div>
              </motion.div>
            )}

            {/* PLAN RESULT */}
            {!loading && !error && plan && (
              <motion.div
                key="result-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="flex flex-col gap-5 h-full overflow-y-auto pr-1"
              >
                <div className="flex justify-between items-center pb-3 border-b border-neutral-900">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-yellow-500" />
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">DESIGN MEMORANDUM / 独家照明方案书</span>
                  </div>
                  <span className="bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 text-[9px] px-2.5 py-1 rounded-full font-mono">
                    IDA Class-A 批准
                  </span>
                </div>

                {/* Conceptual and title */}
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-[#c2452b]">创意策划方案主题</span>
                  <h3 className="text-xl font-bold text-yellow-400 mt-1">{plan.title}</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed mt-2.5 bg-neutral-900 p-3 rounded-xl border border-neutral-850 italic">
                    “ {plan.concept} ”
                  </p>
                </div>

                {/* Specs rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-neutral-950/80 border border-neutral-900 rounded-xl flex gap-2">
                    <Thermometer className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-neutral-500 font-mono block">拟定色温体系</span>
                      <p className="text-xs text-neutral-200 mt-1 leading-relaxed">{plan.colorTemperature}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-neutral-950/80 border border-neutral-900 rounded-xl flex gap-2">
                    <Clock className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-neutral-500 font-mono block">中控闭环能耗曲线</span>
                      <p className="text-xs text-neutral-200 mt-1 leading-relaxed">{plan.controlSystem}</p>
                    </div>
                  </div>
                </div>

                {/* Fixtures checklist */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] tracking-widest text-[#c2452b] flex items-center gap-1">
                    <Wrench className="w-3 h-3" /> 高定灯具选型清单及安装预算密度 (Equipment Matrix)
                  </span>
                  
                  <div className="border border-neutral-850 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-neutral-900 border-b border-neutral-850 text-neutral-400 font-mono text-[10px]">
                          <th className="p-2 pl-3">建议灯具型号</th>
                          <th className="p-2">功率标引</th>
                          <th className="p-2">建议密度比/套数</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plan.fixtures.map((f, i) => (
                          <tr key={i} className="border-b border-neutral-900 hover:bg-neutral-950/40 text-neutral-300">
                            <td className="p-2 pl-3">
                              <div className="font-medium text-neutral-200">{f.name}</div>
                              <div className="text-[10px] text-neutral-500 mt-0.5">{f.purpose}</div>
                            </td>
                            <td className="p-2 font-mono text-neutral-400">{f.power}</td>
                            <td className="p-2 font-mono text-yellow-500 font-medium">{f.qty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Ecology protection */}
                <div className="p-3 bg-emerald-950/10 border border-emerald-500/20 rounded-xl flex gap-2 text-xs">
                  <EyeOff className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] text-emerald-400 block font-semibold">暗天空防眩光工程及野生生态保护说明</span>
                    <p className="text-neutral-300 mt-1 leading-relaxed leading-relaxed">{plan.ecologyProtection}</p>
                  </div>
                </div>

                {/* Small print */}
                <div className="text-[9px] text-neutral-600 font-mono text-right mt-2">
                  此报告策划书由 全球数字光强数据库计算得出 · 可直接下载或导入 CAD 深化设计中
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>

    </div>
  );
}
