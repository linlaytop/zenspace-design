import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, 
  Moon, 
  Sun, 
  Zap, 
  Layers, 
  Cpu, 
  Leaf, 
  CheckCircle, 
  Sliders, 
  SlidersHorizontal,
  ChevronRight,
  Info,
  Trash2,
  Plus,
  Film,
  Volume2,
  VolumeX,
  Video,
  RefreshCw,
  Download,
  FileUp,
  Save,
  Cloud,
  Terminal,
  Sparkles,
  Coins,
  QrCode
} from "lucide-react";
import { LIGHTING_CATEGORIES } from "../data";
import { LightingCategory, LightingParam } from "../types";
import { useWechatQrCode } from "../hooks/useWechatQrCode";
import { useAuth } from "../context/AuthContext";
import NewsSection from "./NewsSection";
import DualVideoShowcase from "./DualVideoShowcase";

interface MediaPage {
  mediaUrl: string;
  mediaType: "image" | "video";
  title: string;
  location: string;
  concept: string;
  photographer?: string;
  stats?: { label: string; value: string }[];
}

const CATEGORY_MEDIA_PAGES: Record<string, MediaPage[]> = {
  "cultural-tourism": [
    {
      mediaUrl: "https://player.vimeo.com/external/498902517.sd.mp4?s=d07525ec900350a2ebd901c23f993f773410e309&profile_id=165&oauth2_token_id=57447761",
      mediaType: "video",
      title: "《九歌 · 密林交互》全域雷达交互投影秀",
      location: "中国张家界 · 森林景区主游路线",
      concept: "全场布设体感捕捉雷达，游客迈步可唤醒林间微弱光斑如萤火起舞。高空全彩绿极光擦亮云端斗拱与山岩，重现太古楚辞神韵。"
    },
    {
      mediaUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      mediaType: "image",
      title: "《大理流岁》古城门非对称3D Mapping投影",
      location: "中国大理 · 崇圣古街中轴点",
      concept: "精细对准技术完美贴合中国传统牌坊轮廓，2.4万流明激光渲染让每一处砖脊、斗拱根据二十四自然节气缓慢染色，立体动人。"
    }
  ],
  "lightshow": [
    {
      mediaUrl: "https://player.vimeo.com/external/435649371.sd.mp4?s=d0f074d7efd6da075e7a91a32a688a44b9ffdc6e&profile_id=139&oauth2_token_id=57447761",
      mediaType: "video",
      title: "《幻影折叠》全息互动粒子投影秀",
      location: "中国深圳 · 市民中心外立面",
      concept: "运用超大功率双拼接激光机，集成体感追踪，呈现千平米极细腻的立体数字流动光电叙事秀。"
    },
    {
      mediaUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
      mediaType: "image",
      title: "《星耀共鸣》山体绿激光束阵列",
      location: "中国成都 · 青城高空穹顶",
      concept: "将全彩编组激光束投射入自然雨雾气候，形成横跨数里、清晰可辨、环保微损的太空几何投影。"
    }
  ],
  "water-show": [
    {
      mediaUrl: "https://player.vimeo.com/external/403816155.sd.mp4?s=d0db58679ea12bf1b0213000ccbf25b0fa3bf5da&profile_id=139&oauth2_token_id=57447761",
      mediaType: "video",
      title: "《碧海飞光》大型全息激光喷泉秀",
      location: "中国三亚 · 崖州湾海上大剧院",
      concept: "采用50000流明全色激光投影矩阵，投射在折线形喷淋水幕上，变幻出的全息立体极光形成令人窒息的临场感。"
    },
    {
      mediaUrl: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=1200&q=80",
      mediaType: "image",
      title: "《九龙吐水》历史古桥声光电集群",
      location: "中国绍兴 · 八字古桥水域地标",
      concept: "将冷暖两色高亮窄角光穿透水雾，与古桥水幕形成丰富的退晕质感。声光联控，每当整点便重现江南水乡夜合欢的震撼民曲。"
    }
  ],
  "hotel": [
    {
      mediaUrl: "https://player.vimeo.com/external/371434316.sd.mp4?s=1240c4a4501a1c496d8b6727284f3cc0c1fdcff3&profile_id=139&oauth2_token_id=57447761",
      mediaType: "video",
      title: "《折角之华》奢华度假立面极光",
      location: "中国三亚 · 亚特兰国际湾区",
      concept: "在建筑梁凹槽隐藏柔性LED，偏轴窄透镜消除外散，如极光掠影般在白色大理石面层层微弱渐变。"
    },
    {
      mediaUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      mediaType: "image",
      title: "《流金溢影》奢华酒店水幕中庭",
      location: "中国澳门 · 威尼斯人地标建筑",
      concept: "通过高指双层琥珀温光，把雕像与喷泉完美擦亮，防眩蜂窝网隔绝直射光害，尽享宁静与归属。"
    }
  ],
  "office": [
    {
      mediaUrl: "https://player.vimeo.com/external/340028886.sd.mp4?s=78465cb3335520a2ebd901c23f993f773410e309&profile_id=139&oauth2_token_id=57447761",
      mediaType: "video",
      title: "《流体像素》超高层坚肋线性流光",
      location: "中国北京 · 丽泽金融总部塔",
      concept: "线性防水RGBW全彩像素条深度卡嵌于窗型竖梁型材内，演绎科技企业稳重且流线感的流光夜潮。"
    },
    {
      mediaUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      mediaType: "image",
      title: "《晶格矩阵》双碳感知低耗幕墙",
      location: "中国上海 · 陆家嘴金融中心",
      concept: "云端气象联调亮度自适应，人退光柔，只亮起局部活动层，呈现充满未来呼吸肌理的低耗城市轮廓。"
    }
  ],
  "ancient": [
    {
      mediaUrl: "https://player.vimeo.com/external/517617150.sd.mp4?s=a76dbe6275815616e4544e39bbf870fc19d44321&profile_id=165&oauth2_token_id=57447761",
      mediaType: "video",
      title: "《朱阁霞染》仿唐画梁无痕抱箍投光",
      location: "中国西安 · 大雁塔遗址主殿",
      concept: "完全使用卡箍与重力压载承托，不钻一孔。2200K超低蓝光温护，极大降低画栋彩画紫外损伤。"
    },
    {
      mediaUrl: "https://images.unsplash.com/photo-1547983121-845b7e1588b0?auto=format&fit=crop&w=1200&q=80",
      mediaType: "image",
      title: "《画梁微澜》重檐古刹抱箍抹月",
      location: "中国京都 · 禅元殿鸱尾局部",
      concept: "以1800K超低色温佛焰铜光，温和擦墙烘托重檐古建筑的悬山垂脊，暗空纯净，宛如阴影留白画卷。"
    }
  ],
  "garden": [
    {
      mediaUrl: "https://player.vimeo.com/external/459389137.sd.mp4?s=87ae39ab54b840eec49b161a07e28940de21f661&profile_id=165&oauth2_token_id=57447761",
      mediaType: "video",
      title: "《影月竹浪》生态湿地拟真月光照映",
      location: "中国杭州 · 莫干山生态秘林",
      concept: "12米高杆大视场擦竹下照模拟清亮月晖，结合微弱声感流线，行人在竹林漫步，光点温柔随退。"
    },
    {
      mediaUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      mediaType: "image",
      title: "《水石涟漪》无边界亲水漫射叠光",
      location: "中国苏州 · 沧浪亭环水驳岸",
      concept: "超安全低电压防水灯具由下洗刷垂柳古树，风拂水面形成生动粼粼波光，让古典江南夜里空灵静谧。"
    }
  ],
  "villa": [
    {
      mediaUrl: "https://player.vimeo.com/external/409257697.sd.mp4?s=b61ad3cbda605f6e8506099945f6e80b2a3cd058bbbdaf40149d8&profile_id=165&oauth2_token_id=57447761",
      mediaType: "video",
      title: "《重山幽隐》极致私享清水悬脊探光",
      location: "中国厦门 · 环岛滨海私邸",
      concept: "15度超深遮光杯消除炫光串扰。高定古铜埋地射灯向上刻画清水混料悬壁，在深夜散发贵雅高贵的立体折光。"
    },
    {
      mediaUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      mediaType: "image",
      title: "《白露洗月》悬臂泳池漫射流银",
      location: "中国深圳 · 半山极简雅邸",
      concept: "泳池无边水体集成水下超窄线性洗墙，使夜色水镜具有纯净渐晕，烘托建筑整体低奢纯美的现代线条。"
    }
  ],
  "resort": [
    {
      mediaUrl: "https://player.vimeo.com/external/459389137.sd.mp4?s=87ae39ab54b840eec49b161a07e28940de21f661&profile_id=165&oauth2_token_id=57447761",
      mediaType: "video",
      title: "《篝火星穹》生态树屋旷野低碳暖流",
      location: "南太平洋 · 斐济莫米星宿野奢营",
      concept: "全避光无溢散理念契合暗天空三星认证。走道埋入2000K纸灯，保护林间鸟类，头顶璀璨银河，脚底萤火微芒。"
    },
    {
      mediaUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      mediaType: "image",
      title: "《繁星避难所》温泉汤院寂静微照",
      location: "中国莫干山 · 观星竹林别墅",
      concept: "使用本色漫射树脂竹丝灯具，与周边天然植被互融，光效平缓舒适，彻底隔绝现代反光污染。"
    }
  ],
  "clubhouse": [
    {
      mediaUrl: "https://player.vimeo.com/external/340028886.sd.mp4?s=78465cb3335520a2ebd901c23f993f773410e309&profile_id=139&oauth2_token_id=57447761",
      mediaType: "video",
      title: "《流金流彩》高增益全动态中庭光影秀",
      location: "中国上海 · 滨江高定尊客会所",
      concept: "配合全息RGBW动态激光，将变色彩卷完美投映于弧型天花，重构出超凡前沿的动态派对或轻奢商务格调。"
    },
    {
      mediaUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
      mediaType: "image",
      title: "《星河私域》沉浸式无边下洗微光",
      location: "中国深圳 · 湾区游艇会俱乐部",
      concept: "在超深防眩隐藏铝槽内铺设无微差微光灯带，通过对数微瓦调光形成平缓对流，使夜幕下的泳池与廊架完美消融。"
    }
  ]
};

// Cache to keep track of base64 -> blob URL conversions, preventing memory leaks and multiple object URL allocations.
const base64BlobUrlCache: Record<string, string> = {};

export function getSafeBlobUrl(url: string): string {
  if (!url) return "";
  if (!url.startsWith("data:video/")) return url;
  
  if (base64BlobUrlCache[url]) {
    return base64BlobUrlCache[url];
  }
  
  try {
    const parts = url.split(";base64,");
    if (parts.length !== 2) return url;
    
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    const blob = new Blob([uInt8Array], { type: contentType });
    const blobUrl = URL.createObjectURL(blob);
    base64BlobUrlCache[url] = blobUrl;
    return blobUrl;
  } catch (e) {
    console.warn("Failed to convert base64 video data to local blob URL", e);
    return url;
  }
}

export default function ShowcaseGallery() {
  const { isLoggedIn } = useAuth();
  const [selectedCatId, setSelectedCatId] = useState<string>("han-buddhist-temple-design"); // Default to first temple category
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("lumos_custom_images_by_cat");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [customMediaTypes, setCustomMediaTypes] = useState<Record<string, "image" | "video">>(() => {
    try {
      const saved = localStorage.getItem("lumos_custom_media_types_by_cat");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [isNightMode, setIsNightMode] = useState<boolean>(true);
  const [isUploadedVideoMuted, setIsUploadedVideoMuted] = useState<boolean>(true);
  const [mediaPageIndex, setMediaPageIndex] = useState<number>(0);

  // 微信二维码：使用共享 Hook，保证与 App.tsx 两处状态一致、自动保存、实时同步
  const { qr: wechatQrCode, uploadQr: handleQrUpload, deleteQr: handleQrDelete } = useWechatQrCode();
  const qrFileInputRef = useRef<HTMLInputElement>(null);

  // Retired/Dummy placeholders to satisfy compile-time type-safety in deactivated blocks
  const isCliLoading = false;
  const cliOutput = "";
  const handleJimengAction = (action: string, sub?: string) => {};
  const customCliCmd = "";
  const setCustomCliCmd = (val: string | ((prev: string) => string)) => {};
  const isAiGenerating = false;

  // Compute storage key representing the current page of the selected category for custom media uploads
  const currentMediaKey = mediaPageIndex === 0
    ? selectedCatId
    : `${selectedCatId}-page-${mediaPageIndex}`;

  // Reset page when category changes
  useEffect(() => {
    setMediaPageIndex(0);
  }, [selectedCatId]);

  // Sync customImages & customMediaTypes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("lumos_custom_images_by_cat", JSON.stringify(customImages));
    } catch (e) {
      console.warn("Storage quota exceeded for custom media", e);
    }
  }, [customImages]);

  useEffect(() => {
    try {
      localStorage.setItem("lumos_custom_media_types_by_cat", JSON.stringify(customMediaTypes));
    } catch (e) {
      console.warn("Storage quota exceeded for media types", e);
    }
  }, [customMediaTypes]);
  
  // Project Archiver Lifecycle State
  const [backupNotification, setBackupNotification] = useState<string>("");

  // Save Project state of Zenspace to network-side hosted server for online publishing
  const saveZenspaceProjectToServer = async () => {
    try {
      setBackupNotification("⏳ 正在检查服务器连接...");
      
      // First check if server is available
      const healthCheck = await fetch("/api/save-project", { 
        method: "HEAD",
        signal: AbortSignal.timeout(3000)
      }).catch(() => null);
      
      if (!healthCheck || !healthCheck.ok) {
        setBackupNotification("⚠️ 服务器功能不可用：当前为静态部署模式，无法连接到后端服务器。请使用「导出备份」功能将方案保存至本地。");
        setTimeout(() => setBackupNotification(""), 6000);
        return;
      }
      
      setBackupNotification("⏳ 正在发布方案并托管至在线云端服务器...");
      let videoOmitted = false;
      let imgOmittedOrDownscaled = false;

      // Initialize uploadImages from current state for server sync
      let uploadImages = { ...customImages };

      // Ensure each dataURL fits snugly inside safe proxy limits (total body under 950KB)
      for (const [key, val] of Object.entries(uploadImages)) {
        if (typeof val !== "string") continue;
        const valStr = val as string;

        if (valStr.startsWith("data:video/")) {
          // Videos are typically multi-megabytes; omit them from server sync but keep in local disk storage
          if (valStr.length > 250000) {
            delete uploadImages[key];
            videoOmitted = true;
          }
        } else if (valStr.startsWith("data:image/")) {
          // If legacy images are somehow still huge (> 300KB), let's clear them from the server sync or warn
          if (valStr.length > 350000) {
            delete uploadImages[key];
            imgOmittedOrDownscaled = true;
          }
        }
      }

      const backupEnvelope = {
        version: "lumos-design-v1",
        timestamp: new Date().toISOString(),
        selectedCatId,
        customImages: uploadImages,
        customMediaTypes,
        params,
        isNightMode
      };

      let serialized = JSON.stringify(backupEnvelope);

      // Defensively check final size; if it still exceeds 950KB, strip remaining custom images starting with largest
      if (serialized.length > 950000) {
        const sortedEntries = Object.entries(uploadImages).sort((a, b) => {
          const strA = (a[1] as string) || "";
          const strB = (b[1] as string) || "";
          return strB.length - strA.length;
        });
        for (const [key] of sortedEntries) {
          delete uploadImages[key];
          imgOmittedOrDownscaled = true;
          const tempSerialized = JSON.stringify({
            ...backupEnvelope,
            customImages: uploadImages
          });
          if (tempSerialized.length <= 950000) {
            serialized = tempSerialized;
            break;
          }
        }
      }
      
      const response = await fetch("/api/save-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: serialized
      });
      
      if (!response.ok) throw new Error("托管请求被反向代理或服务器拦截（可能数据体量仍超出限制）");
      const res = await response.json();
      
      if (res.success) {
        let msg = "🌐 发布托管成功！方案已同步部署至云端服务器。";
        if (videoOmitted || imgOmittedOrDownscaled) {
          msg = `🌐 托管成功！(因带宽限制，大体积视频/图片已跳过云端而本地完美保存，数值参数全量同步)。`;
        }
        setBackupNotification(msg);
        setTimeout(() => setBackupNotification(""), 6000);
      } else {
        throw new Error(res.error || "服务器拒绝保存方案");
      }
    } catch (err: any) {
      console.error("Save to network server failed:", err);
      setBackupNotification(`❌ 托管失败: ${err.message || "传输超时或服务器不支持过大文件同步，建议清除大视频后重试"}`);
      setTimeout(() => setBackupNotification(""), 6000);
    }
  };

  // Retrieve project blueprint from host server
  const loadZenspaceProjectFromServer = async (showNotification = true) => {
    try {
      // First check if server is available
      if (showNotification) {
        setBackupNotification("⏳ 正在检查服务器连接...");
      }
      
      const healthCheck = await fetch("/api/load-project", { 
        method: "HEAD",
        signal: AbortSignal.timeout(3000)
      }).catch(() => null);
      
      if (!healthCheck || !healthCheck.ok) {
        if (showNotification) {
          setBackupNotification("⚠️ 服务器功能不可用：当前为静态部署模式，无法连接到后端服务器。所有方案数据已安全保存在本地浏览器存储中。");
          setTimeout(() => setBackupNotification(""), 6000);
        }
        return;
      }
      
      if (showNotification) {
        setBackupNotification("⏳ 正在从云端服务器拉取最新在线方案...");
      }
      const response = await fetch("/api/load-project");
      if (!response.ok) throw new Error("拉取托管方案失败");
      const res = await response.json();
      if (res.success && res.data) {
        const payload = res.data;
        if (payload.selectedCatId) setSelectedCatId(payload.selectedCatId);
        if (payload.customImages) setCustomImages(payload.customImages);
        if (payload.customMediaTypes) setCustomMediaTypes(payload.customMediaTypes);
        if (payload.params) setParams(payload.params);
        if (payload.isNightMode !== undefined) setIsNightMode(payload.isNightMode);
        
        if (showNotification) {
          setBackupNotification("✨ 成功载入已发布的云端托管方案！实景与参数全部同步。");
          setTimeout(() => setBackupNotification(""), 5000);
        }
      } else {
        if (showNotification) {
          setBackupNotification("💡 云端当前无托管方案，已默认恢复至演示套件系统。");
          setTimeout(() => setBackupNotification(""), 5000);
        }
      }
    } catch (err: any) {
      console.error("Load from host server failed:", err);
      if (showNotification) {
        setBackupNotification("⚠️ 从云端获取在线方案失败，已为您加载本地极速离线副本。");
        setTimeout(() => setBackupNotification(""), 5000);
      }
    }
  };

  // Mount triggered automatic loading of hosting state from server
  useEffect(() => {
    loadZenspaceProjectFromServer(false);
  }, []);

  // Alternative Save Project Offline Backup JSON file to disk as high-performance client stream Blob
  const exportZenspaceProject = () => {
    try {
      const backupEnvelope = {
        version: "lumos-design-v1",
        timestamp: new Date().toISOString(),
        selectedCatId,
        customImages,
        customMediaTypes,
        params,
        isNightMode
      };
      
      const serialized = JSON.stringify(backupEnvelope, null, 2);
      const fileBlob = new Blob([serialized], { type: "application/json" });
      const dynamicUrl = URL.createObjectURL(fileBlob);
      
      const anchorNode = document.createElement("a");
      anchorNode.href = dynamicUrl;
      const fmtDate = new Date().toISOString().split("T")[0];
      anchorNode.download = `ZENSPACE_MASTER_BACKUP_${fmtDate}.json`;
      
      document.body.appendChild(anchorNode);
      anchorNode.click();
      document.body.removeChild(anchorNode);
      URL.revokeObjectURL(dynamicUrl);

      setBackupNotification("📊 导出成功！完整材质及参数已打包存盘。");
      setTimeout(() => setBackupNotification(""), 3500);
    } catch (err) {
      console.error("Backup serialization error:", err);
      alert("备份文件打包失败，可能由于本地图像数据体量过大！");
    }
  };

  // Alternative Restore Project Backup JSON file cleanly with verification
  const importZenspaceProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = (evt) => {
      try {
        const payload = JSON.parse(evt.target?.result as string);
        if (payload.version !== "lumos-design-v1") {
          alert("错误：此备份文件不适用于当前 寺庙佛教设计 亮化平台！");
          return;
        }

        // Restore target configurations safely
        if (payload.selectedCatId) setSelectedCatId(payload.selectedCatId);
        if (payload.customImages) setCustomImages(payload.customImages);
        if (payload.customMediaTypes) setCustomMediaTypes(payload.customMediaTypes);
        if (payload.params) setParams(payload.params);
        if (payload.isNightMode !== undefined) setIsNightMode(payload.isNightMode);

        setBackupNotification("✨ 曜空间备份载入成功！全场素材配置已秒级覆写就绪。");
        setTimeout(() => setBackupNotification(""), 4500);
      } catch (err) {
        console.error("Import backup parsing error:", err);
        alert("导入失败：请提供合法未损毁的 JSON 格式寺庙佛教设计项目包！");
      }
    };
    fileReader.readAsText(file);
  };
  
  // Interactive Lighting Controller State
  const [params, setParams] = useState<LightingParam>({
    temperature: 3000,
    intensity: 85,
    color: "#e3a857",
    animationMode: "breath"
  });

  const selectedCategory = (() => {
    const baseCat = LIGHTING_CATEGORIES.find(c => c.id === selectedCatId) || LIGHTING_CATEGORIES[0];
    const customImgUrl = customImages[currentMediaKey];
    
    // Page 0 represents base category (original image or custom file uploaded directly to category index 0)
    if (mediaPageIndex === 0) {
      const imgUrl = customImgUrl || baseCat.imageUrl;
      return {
        ...baseCat,
        imageUrl: imgUrl
      };
    }
    
    // Pages 1 and 2 fetch extra pre-loaded project site materials
    const pages = CATEGORY_MEDIA_PAGES[selectedCatId] || [];
    const pageIndex = Math.min(mediaPageIndex - 1, pages.length - 1);
    const page = pages[pageIndex];
    if (page) {
      const imgUrl = customImgUrl || page.mediaUrl;
      return {
        ...baseCat,
        imageUrl: imgUrl,
        cases: [
          {
            title: customImgUrl 
              ? `《${baseCat.name}》专属自定义实景 (第 ${mediaPageIndex + 1}/3 页)` 
              : page.title,
            location: customImgUrl 
              ? `用户自定 · ${page.location}` 
              : page.location,
            concept: customImgUrl 
              ? "加载了您专属上传的大画特景或极速微光视频。请滑动下方的高级参数来调整色温及亮度表现。" 
              : page.concept,
            photographer: customImgUrl ? "尊贵的用户" : (page.photographer || "Zenspace Premium Shot"),
            stats: page.stats || baseCat.cases[0].stats
          }
        ]
      };
    }
    
    const imgUrlFallback = customImgUrl || baseCat.imageUrl;
    return {
      ...baseCat,
      imageUrl: imgUrlFallback
    };
  })();

  // Map temperature (K) to readable colors & styles
  const getTempDescription = (temp: number) => {
    if (temp < 2500) return { label: "2200K 琥珀微火 (Warm Ember)", color: "text-amber-500", rgb: "rgba(212, 164, 65, 0.4)" };
    if (temp < 3200) return { label: "3000K 奢华暖金 (Prada Gold)", color: "text-yellow-500", rgb: "rgba(227, 186, 95, 0.3)" };
    if (temp < 4500) return { label: "4000K 自然月影 (Luna White)", color: "text-blue-200", rgb: "rgba(244, 196, 184, 0.2)" };
    return { label: "5500K 极地冷银 (Cyber Silver)", color: "text-cyan-400", rgb: "rgba(217, 96, 63, 0.15)" };
  };

  // Sync temperature changes to corresponding highlight colors
  useEffect(() => {
    if (selectedCatId === "lightshow") {
      // Lightshow defaults to custom cool cyber dynamics or warm ember
      return;
    }
    const temp = params.temperature;
    if (temp < 2500) {
      setParams(p => ({ ...p, color: "rgba(212, 164, 65, 0.5)" }));
    } else if (temp < 3200) {
      setParams(p => ({ ...p, color: "rgba(227, 186, 95, 0.4)" }));
    } else if (temp < 4500) {
      setParams(p => ({ ...p, color: "rgba(244, 196, 184, 0.3)" }));
    } else {
      setParams(p => ({ ...p, color: "rgba(217, 96, 63, 0.25)" }));
    }
  }, [params.temperature, selectedCatId]);

  const [isDragging, setIsDragging] = useState(false);

  // Handle Drag Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File, catId: string = selectedCatId) => {
    if (!file || !(file instanceof File)) {
      alert("错误：无效的上传文件对象。");
      return;
    }

    // 1. Format and extension validation (MIME and extension check)
    const fileName = file.name || "";
    const fileExt = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
    const mimeType = file.type || "";

    const allowedImageExts = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".bmp"];
    const allowedVideoExts = [".mp4", ".mov", ".webm", ".ogg"];

    const isImageMime = mimeType.startsWith("image/");
    const isVideoMime = mimeType.startsWith("video/");
    
    const isImageExt = allowedImageExts.some(ext => fileExt === ext);
    const isVideoExt = allowedVideoExts.some(ext => fileExt === ext);

    const isImage = isImageMime || (mimeType === "" && isImageExt);
    const isVideo = isVideoMime || (mimeType === "" && isVideoExt);

    if (!isImage && !isVideo) {
      alert(`上传失败：不支持的文件格式。仅允许上传图片（${allowedImageExts.join("/")}）或视频（${allowedVideoExts.join("/")}）。`);
      return;
    }

    // Safeguard: Block potential malicious or executable extensions
    const bannedExts = [".exe", ".bat", ".sh", ".js", ".ts", ".html", ".htm", ".vbs", ".cmd", ".scr"];
    if (bannedExts.some(ext => fileExt === ext)) {
      alert("安全拦截：禁止上传可执行程序或脚本文件！");
      return;
    }

    // 2. File size validation
    if (isVideo) {
      // Max 150MB size to support high-quality actual videos with browser in-memory playback, local storage save errors are safely caught
      const MAX_VIDEO_SIZE = 150 * 1024 * 1024;
      if (file.size > MAX_VIDEO_SIZE) {
        alert("视频体积超限：所选视频文件超过 150MB，为了确保端侧流畅演播，请选择 150MB 以内的视频片段。");
        return;
      }
    } else if (isImage) {
      // Max 10MB to avoid browser compression lockups
      const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
      if (file.size > MAX_IMAGE_SIZE) {
        alert("图片体积超限：所选图片超过了 10MB，请压缩后再行上传。");
        return;
      }
    }

    // 3. Robust FileReader logic
    const reader = new FileReader();

    reader.onerror = (err) => {
      console.error("FileReader error:", err);
      alert("读取本地文件失败：文件可能已被损坏、或由于系统权限不足而无法读取。");
    };

    reader.onload = (event) => {
      const b64Data = event.target?.result as string;
      if (!b64Data) {
        alert("错误：未能成功生成文件 Base64 编码。");
        return;
      }

      if (isVideo) {
        // Direct Base64 storing for video files
        setCustomImages(prev => ({
          ...prev,
          [catId]: b64Data
        }));
        setCustomMediaTypes(prev => ({
          ...prev,
          [catId]: "video"
        }));
      } else {
        // Safe Canvas Image compression to prevent bulk state storage explosion (keeps local payload ~120KB)
        const img = new Image();
        img.onload = () => {
          try {
            const MAX_WIDTH = 1200;
            const MAX_HEIGHT = 1200;
            let width = img.width;
            let height = img.height;

            if (width > MAX_WIDTH || height > MAX_HEIGHT) {
              if (width > height) {
                height = Math.round((height * MAX_WIDTH) / width);
                width = MAX_WIDTH;
              } else {
                width = Math.round((width * MAX_HEIGHT) / height);
                height = MAX_HEIGHT;
              }
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.75);
              setCustomImages(prev => ({
                ...prev,
                [catId]: compressedDataUrl
              }));
              setCustomMediaTypes(prev => ({
                ...prev,
                [catId]: "image"
              }));
            } else {
              setCustomImages(prev => ({ ...prev, [catId]: b64Data }));
              setCustomMediaTypes(prev => ({ ...prev, [catId]: "image" }));
            }
          } catch (canvasErr) {
            console.warn("Canvas compression failed, fallback to original", canvasErr);
            setCustomImages(prev => ({ ...prev, [catId]: b64Data }));
            setCustomMediaTypes(prev => ({ ...prev, [catId]: "image" }));
          }
        };

        img.onerror = (errEvent) => {
          console.error("Image decode error on image.onload for", fileName, errEvent);
          alert("图片解析失败：上传的文件由于格式损毁或扩展名不相符，无法进行图形解码渲染。");
        };

        img.src = b64Data;
      }
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file, currentMediaKey);
    }
  };

  // Handle Preset Sequence Switches
  const applyPreset = (mode: 'eco' | 'normal' | 'festive' | 'off') => {
    switch (mode) {
      case 'eco':
        setParams({ temperature: 2200, intensity: 30, color: "rgba(212, 164, 65, 0.2)", animationMode: "breath" });
        break;
      case 'normal':
        setParams({ temperature: 3000, intensity: 80, color: "rgba(227, 186, 95, 0.3)", animationMode: "breath" });
        break;
      case 'festive':
        setParams({ temperature: 4000, intensity: 100, color: "rgba(244, 196, 184, 0.4)", animationMode: "pulse" });
        break;
      case 'off':
        setParams({ temperature: 3000, intensity: 0, color: "rgba(0,0,0,0)", animationMode: "static" });
        break;
    }
  };

  const isCustomVideo = (() => {
    const customMedia = customImages[currentMediaKey];
    if (customMedia) {
      if (customMediaTypes[currentMediaKey]) {
        return customMediaTypes[currentMediaKey] === "video";
      }
      return customMedia.startsWith("data:video/") || customMedia.endsWith(".mp4") || customMedia.endsWith(".mov") || customMedia.endsWith(".webm") || customMedia.startsWith("blob:");
    }
    
    if (mediaPageIndex === 0) {
      return false;
    }
    
    const pages = CATEGORY_MEDIA_PAGES[selectedCatId] || [];
    const pageIndex = Math.max(0, Math.min(mediaPageIndex - 1, pages.length - 1));
    const page = pages[pageIndex];
    return page ? page.mediaType === "video" : false;
  })();

  return (
    <div id="showcase-gallery" className="flex flex-col gap-6 text-neutral-100">
      
      {/* 🔴 RED AREA MAPPED AS HIGH-END MINIMALIST UPLOAD CONTROLLER */}
      <div 
        id="red-area-upload-panel"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-2xl border transition-all duration-300 gap-4 ${
          isDragging 
            ? "bg-yellow-500/10 border-yellow-500/80 shadow-lg shadow-yellow-500/10" 
            : "bg-neutral-900/40 border-neutral-800/60 hover:border-neutral-700/80"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-950 flex items-center justify-center border border-neutral-850">
            <Layers className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#e3a857]">DESIGN CATEGORIES / 细分领域的艺术</span>
            <p className="text-xs text-neutral-500 mt-0.5">
              {customImages[currentMediaKey] 
                ? `✨ 您已成功为【${selectedCategory.name}】(第 ${mediaPageIndex + 1}/3 页) 装载建模实影，正在运用微调滑块演算夜景明暗照度` 
                : `已选定【${selectedCategory.name}】(第 ${mediaPageIndex + 1}/3 页)，点击右侧按钮或拖拽文件专属上传实景/视频，支持独立储存`}
            </p>
          </div>
        </div>

        {/* Action Controls aligning to top-right (red area) */}
        <div className="flex items-center gap-3 self-stretch sm:self-auto justify-end">
          {customImages[currentMediaKey] ? (
            <>
              <div className="flex items-center gap-3 bg-neutral-950/80 border border-emerald-500/20 px-3.5 py-2 rounded-xl text-xs w-full sm:w-auto justify-between sm:justify-start">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-6 rounded overflow-hidden border border-neutral-800 shrink-0 bg-black flex items-center justify-center">
                    {isCustomVideo ? (
                      <video src={getSafeBlobUrl(customImages[currentMediaKey])} className="w-full h-full object-cover" muted playsInline />
                    ) : (
                      <img src={customImages[currentMediaKey]} className="w-full h-full object-cover" alt="Custom Preview" />
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[8px] text-emerald-400 tracking-wider">● {isCustomVideo ? `第 ${mediaPageIndex + 1} 页自定视频` : `第 ${mediaPageIndex + 1} 页自定立面`}</span>
                    <span className="text-[11px] text-neutral-300 font-semibold max-w-[125px] truncate">
                      {selectedCategory.name}
                    </span>
                  </div>
                </div>
                <button
                  id="delete-uploaded-image-btn"
                  type="button"
                  onClick={() => {
                    setCustomImages(prev => {
                      const next = { ...prev };
                      delete next[currentMediaKey];
                      return next;
                    });
                    setCustomMediaTypes(prev => {
                      const next = { ...prev };
                      delete next[currentMediaKey];
                      return next;
                    });
                  }}
                  className="ml-2 bg-red-500/10 hover:bg-neutral-850 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 shrink-0 whitespace-nowrap"
                >
                  🗑️ 清除该页
                </button>
              </div>

              {/* Purple wireframe area: Elegant Save/Export Button */}
              <button
                id="save-blueprint-master-btn"
                type="button"
                onClick={saveZenspaceProjectToServer}
                className="bg-[#0c0d12]/90 hover:bg-neutral-950 border-2 border-dashed border-purple-500 hover:border-purple-400 text-purple-300 hover:text-purple-200 px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap shadow-md shadow-purple-950/20 animate-fade-in"
                title="保存立面与亮化参数全量方案并托管至在线云端服务器中"
              >
                <Cloud className="w-4 h-4 text-purple-400 animate-pulse" />
                <span>保存全案</span>
              </button>
            </>
          ) : (
            <label 
              htmlFor="facade-upload-input"
              className="group relative flex items-center justify-center gap-2 bg-[#1a1310]/80 hover:bg-neutral-950 border-2 border-dashed border-purple-500/40 hover:border-purple-500 px-5 py-2.5 rounded-xl text-xs text-neutral-200 font-mono transition-all cursor-pointer shadow-lg w-full sm:w-auto animate-pulse overflow-hidden"
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
              <span className="text-[11px] tracking-wider text-neutral-250">📤 上传「{selectedCategory.name}」第 {mediaPageIndex + 1} 页专属实景/视频</span>
              <input
                id="facade-upload-input"
                type="file"
                accept="image/*,video/*"
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10 font-sans"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    processFile(file, currentMediaKey);
                  }
                  e.target.value = ""; // Clear targeting value to support consecutive triggers
                }}
              />
            </label>
          )}
        </div>
      </div>

      {/* THREE CORE COLUMN SPLITTERS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
        {/* LEFT NAVIGATION COLUMN (4/12 width) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">领域列表 / SECTORS</span>
          </div>

          <div className="flex flex-col gap-2">
            {LIGHTING_CATEGORIES.map((cat) => {
              const isSelected = selectedCatId === cat.id;
              const hasAnyCatCustom = Object.keys(customImages).some(k => k === cat.id || k.startsWith(`${cat.id}-page-`));
              const isAnyCatVideo = Object.keys(customImages).some(k => (k === cat.id || k.startsWith(`${cat.id}-page-`)) && customMediaTypes[k] === "video");
              return (
                <button
                  key={cat.id}
                  id={`cat-btn-${cat.id}`}
                  onClick={() => {
                    setSelectedCatId(cat.id);
                    // 为各寺庙分类设置典型灯光预览参数（暖色温 + 静穆呼吸/静态模式）
                    if (cat.id === "han-buddhist-temple-design") {
                      setParams({ temperature: 2200, intensity: 70, color: "rgba(194, 69, 43, 0.35)", animationMode: "breath" });
                    } else if (cat.id === "taoist-temple-design") {
                      setParams({ temperature: 2000, intensity: 65, color: "rgba(212, 164, 65, 0.35)", animationMode: "breath" });
                    } else if (cat.id === "tibetan-buddhist-temple-design") {
                      setParams({ temperature: 1800, intensity: 60, color: "rgba(120, 82, 32, 0.35)", animationMode: "breath" });
                    } else if (cat.id === "theravada-buddhist-temple-design") {
                      setParams({ temperature: 2400, intensity: 75, color: "rgba(244, 196, 184, 0.3)", animationMode: "breath" });
                    } else if (cat.id === "temple-architecture-design") {
                      setParams({ temperature: 2200, intensity: 70, color: "rgba(212, 164, 65, 0.35)", animationMode: "breath" });
                    } else if (cat.id === "temple-interior-design") {
                      setParams({ temperature: 2200, intensity: 65, color: "rgba(194, 69, 43, 0.35)", animationMode: "static" });
                    } else if (cat.id === "temple-furnishing-design") {
                      setParams({ temperature: 2000, intensity: 60, color: "rgba(212, 164, 65, 0.3)", animationMode: "static" });
                    } else if (cat.id === "temple-sculpture-design") {
                      setParams({ temperature: 2200, intensity: 75, color: "rgba(194, 69, 43, 0.35)", animationMode: "pulse" });
                    } else if (cat.id === "temple-landscape-design") {
                      setParams({ temperature: 2400, intensity: 70, color: "rgba(119, 140, 99, 0.3)", animationMode: "breath" });
                    } else if (cat.id === "temple-lighting-design") {
                      setParams({ temperature: 1800, intensity: 85, color: "rgba(212, 164, 65, 0.4)", animationMode: "breath" });
                    } else if (cat.id === "ancestral-hall-space-design") {
                      setParams({ temperature: 2200, intensity: 65, color: "rgba(155, 122, 81, 0.35)", animationMode: "breath" });
                    } else {
                      setParams({ temperature: 2200, intensity: 70, color: "rgba(212, 164, 65, 0.35)", animationMode: "breath" });
                    }
                  }}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                    isSelected 
                      ? "bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-850 border-yellow-500/50 shadow-lg shadow-yellow-500/5 translate-x-1" 
                      : "bg-neutral-900/40 border-neutral-800/60 hover:bg-neutral-800/40 hover:border-neutral-700/60"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className={`font-medium text-base transition-colors duration-200 ${isSelected ? "text-yellow-400" : "text-neutral-200"} flex items-center gap-1.5`}>
                        {cat.name}
                        {hasAnyCatCustom && (
                          <span className="text-[10px] bg-yellow-400/10 text-yellow-500 px-1.5 py-0.2 rounded font-mono border border-yellow-500/15">
                            {isAnyCatVideo ? "视频" : "专图"}
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-neutral-500 font-mono mt-0.5">{cat.englishName}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {hasAnyCatCustom && (
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                      )}
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isSelected ? "text-yellow-400 translate-x-0.5" : "text-neutral-600"}`} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

        {/* AI & CONTROL HARDWARE PRESETS */}
        <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-2xl p-5 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-300">中控全自适应场景模拟</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed mb-4">
            点击调度分布式一键中控预设方案，测算整组照明能耗曲线及视觉配比：
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => applyPreset('normal')}
              className="px-3 py-2 bg-neutral-900 hover:bg-neutral-850 hover:border-yellow-500/20 text-neutral-200 rounded-lg text-left transition-all border border-neutral-800"
            >
              🌌 平日标准模式
            </button>
            <button
              onClick={() => applyPreset('festive')}
              className="px-3 py-2 bg-neutral-900 hover:bg-neutral-850 hover:border-cyan-500/20 text-neutral-200 rounded-lg text-left transition-all border border-neutral-800"
            >
              ✨ 节日全亮模式
            </button>
            <button
              onClick={() => applyPreset('eco')}
              className="px-3 py-2 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 rounded-lg text-left transition-all"
            >
              🍃 深夜节能模式
            </button>
            <button
              onClick={() => applyPreset('off')}
              className="px-3 py-2 bg-neutral-950 hover:bg-neutral-900 text-neutral-500 rounded-lg text-left transition-all border border-neutral-900"
            >
              🌑 完全休眠关灯
            </button>
          </div>

          {/* WECHAT QR CODE UPLOAD AREA (auto-saved to localStorage) */}
          <div className="mt-5 pt-5 border-t border-neutral-800/60">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs font-semibold tracking-wider text-neutral-300">微信二维码</span>
              </div>
              {isLoggedIn && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => qrFileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono font-semibold text-emerald-300 bg-emerald-950/20 border border-emerald-500/20 rounded-lg hover:bg-emerald-950/40 transition-all"
                  >
                    <FileUp className="w-3 h-3" />
                    {wechatQrCode ? "更换二维码" : "上传二维码"}
                  </button>
                  {wechatQrCode && (
                  <button
                    type="button"
                    onClick={() => { if (window.confirm("确定删除微信二维码？")) handleQrDelete(); }}
                    className="flex items-center gap-1 px-2 py-1.5 text-[10px] font-mono font-semibold text-red-400 bg-red-950/20 border border-red-500/20 rounded-lg hover:bg-red-950/40 transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                    删除
                  </button>
                  )}
                </div>
              )}
            </div>

            <input
              type="file"
              ref={qrFileInputRef}
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={(e) => handleQrUpload(e.target.files?.[0])}
              className="hidden"
            />

            {wechatQrCode ? (
              <div className="flex flex-col gap-2">
                <div className="relative group w-fit">
                  <img
                    src={wechatQrCode}
                    alt="微信二维码"
                    className="w-36 h-36 object-contain rounded-lg border border-neutral-800 bg-neutral-900/50"
                  />
                  <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10px] text-emerald-400/80 font-mono">微信扫码咨询 · 自动保存</span>
              </div>
            ) : (
              <div className="w-36 h-36 rounded-lg border border-dashed border-neutral-700 bg-neutral-900/30 flex flex-col items-center justify-center gap-2 text-neutral-500">
                <QrCode className="w-8 h-8 opacity-40" />
                <span className="text-[10px] text-center px-2">
                  {isLoggedIn ? "点击上方按钮上传" : "暂无微信二维码"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT PREVIEW & INTERACTION COLUMN (8/12 width) */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* INTERACTIVE SCREEN WORKSPACE */}
        <div className="relative rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800/80 shadow-2xl group flex flex-col">
          
          {/* SCREEN INTERFACE TABS */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-5 py-3 bg-neutral-900 border-b border-neutral-800/80 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider text-neutral-300 font-bold uppercase">
                ZENSPACE WORKSPACE / 寺庙佛教设计渲染视槽
              </span>
            </div>
          </div>

          {/* IMAGE OR TERMINAL DISPLAYER CONTAINER */}
          {false ? (
            <div className="w-full aspect-video md:h-[460px] bg-[#0c1015] p-5 font-mono text-xs text-neutral-200 flex flex-col gap-3.5 relative select-text overflow-hidden">
              {/* Terminal Header */}
              <div className="flex justify-between items-center bg-neutral-950/80 px-4 py-2.5 rounded-xl border border-neutral-900 shrink-0 select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="text-[10px] text-neutral-400 font-bold ml-1.5">root@zenspace-node:~</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-500 text-[10px]">
                  {isCliLoading ? (
                    <span className="text-purple-400 animate-pulse flex items-center gap-1.5 font-bold">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
                      <span>SHELL RUNNING</span>
                    </span>
                  ) : (
                    <span className="text-emerald-450 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>ONLINE</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Terminal Logs Window */}
              <div className="flex-1 overflow-y-auto px-4 py-3.5 bg-[#05080c] border border-neutral-900 rounded-xl font-mono text-[11px] leading-relaxed text-cyan-400 flex flex-col gap-1.5 scrollbar-thin shadow-inner">
                <pre className="whitespace-pre-wrap select-all font-mono">{cliOutput}</pre>
              </div>

              {/* Shell Quick Commands Line */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 shrink-0 select-none">
                <button
                  type="button"
                  onClick={() => handleJimengAction('install')}
                  disabled={isCliLoading}
                  className="px-3 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-cyan-500/20 text-[10px] font-extrabold font-mono text-neutral-200 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  title="执行 curl -fsSL https://jimeng.jianying.com/cli | bash 安装最新部署版即梦 CLI"
                >
                  <Plus className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>1. 部署即梦 CLI</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleJimengAction('help')}
                  disabled={isCliLoading}
                  className="px-3 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-yellow-500/20 text-[10px] font-extrabold font-mono text-neutral-200 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  title="运行 dreamina / jimeng -h 查看所有即梦命令行特性"
                >
                  <Info className="w-3.5 h-3.5 text-yellow-400" />
                  <span>2. 功能选项 (-h)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleJimengAction('login')}
                  disabled={isCliLoading}
                  className="px-3 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-emerald-500/20 text-[10px] font-extrabold font-mono text-neutral-200 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  title="运行 dreamina login --debug 安全登录即梦控制台进行授权调试"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>3. 梦境安全登录</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleJimengAction('custom', 'user_credit')}
                  disabled={isCliLoading}
                  className="px-3 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-purple-500/20 text-[10px] font-extrabold font-mono text-neutral-200 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  title="运行 dreamina user_credit / jimeng user_credit 查询即梦积分/积分额度"
                >
                  <Coins className="w-3.5 h-3.5 text-purple-400" />
                  <span>4. 查询积分额度</span>
                </button>
              </div>

              {/* Manual Exec Row */}
              <div className="flex gap-2.5 bg-neutral-900/50 p-1.5 rounded-xl border border-neutral-900 shrink-0 select-text">
                <span className="font-bold text-cyan-400 px-2 flex items-center text-xs font-mono">$ </span>
                <input
                  type="text"
                  placeholder="运行自定义指令 & 脚本 (如: dreamina login --debug 或 jimeng -h)..."
                  value={customCliCmd}
                  onChange={(e) => setCustomCliCmd(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customCliCmd.trim()) {
                      handleJimengAction('custom', customCliCmd);
                      setCustomCliCmd("");
                    }
                  }}
                  className="flex-1 bg-transparent border-none text-xs outline-none text-neutral-100 font-mono tracking-wide"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customCliCmd.trim()) {
                      handleJimengAction('custom', customCliCmd);
                      setCustomCliCmd("");
                    }
                  }}
                  className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  运行
                </button>
              </div>

              {/* Preset Command Guides Row */}
              <div className="flex flex-wrap items-center gap-2 mt-1 select-none">
                <span className="text-[10px] text-neutral-500 font-mono">🌟 快捷命令示范:</span>
                <button
                  type="button"
                  onClick={() => setCustomCliCmd('dreamina text2image --prompt="一只戴墨镜的橘猫" --ratio=1:1 --resolution_type=2k --poll=30')}
                  className="px-2 py-1 bg-neutral-900 hover:border-cyan-500/30 text-neutral-400 hover:text-cyan-400 border border-neutral-850 rounded-lg text-[10px] font-mono transition-colors cursor-pointer"
                  title="预填橘猫绘图指令"
                >
                  🐱 橘猫生图 (orange cat)
                </button>
                <button
                  type="button"
                  onClick={() => setCustomCliCmd('dreamina text2image --prompt="赛博朋克建筑，洗墙流光" --ratio=16:9')}
                  className="px-2 py-1 bg-neutral-900 hover:border-cyan-500/30 text-neutral-400 hover:text-cyan-400 border border-neutral-850 rounded-lg text-[10px] font-mono transition-colors cursor-pointer"
                  title="预填建筑霓虹配光指令"
                >
                  🌆 赛博耀光
                </button>
                <button
                  type="button"
                  onClick={() => setCustomCliCmd('dreamina login --debug')}
                  className="px-2 py-1 bg-neutral-900 hover:border-cyan-500/30 text-neutral-400 hover:text-cyan-400 border border-neutral-850 rounded-lg text-[10px] font-mono transition-colors cursor-pointer"
                  title="一键预填调试登录命令"
                >
                  🔑 调试登录
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="relative w-full aspect-video md:h-[460px] overflow-hidden bg-neutral-950 flex items-center justify-center">
              
              {/* Dynamic Laser Scanning beam overlay on AI Generation */}
              {selectedCatId === "custom-uploaded" && isAiGenerating && (
                <div className="absolute inset-0 z-40 bg-[#120e0b]/95 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs select-none">
                  <div className="w-16 h-16 rounded-full bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 animate-spin">
                    <RefreshCw className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-widest font-mono">即梦渲染引擎</h4>
                  <p className="text-xs text-neutral-400 mt-2 max-w-sm leading-relaxed font-mono">
                    [即梦渲染引擎] 正在抓取白天线条骨架，重塑夜间漫透光晕拓扑。插演 2/20（耗时估算 2.4s）...
                  </p>
                  <div className="relative w-64 h-1.5 bg-neutral-900 rounded-full mt-4 overflow-hidden border border-neutral-800">
                    <motion.div 
                      initial={{ left: "-100%" }}
                      animate={{ left: "100%" }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Live Lighting Rendering Layers */}
              {selectedCategory.imageUrl ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedCategory.id}-p${mediaPageIndex}-${isCustomVideo}-${selectedCategory.imageUrl.substring(0, 80)}-${selectedCategory.imageUrl.length}`}
                    initial={{ opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full animate-relative"
                  >
                    {isCustomVideo ? (
                      <video
                        src={getSafeBlobUrl(selectedCategory.imageUrl)}
                        autoPlay
                        loop
                        muted={isUploadedVideoMuted}
                        playsInline
                        className="w-full h-full object-cover select-none transition-all duration-700"
                        style={{
                          filter: isNightMode 
                            ? `brightness(${(params.intensity * 0.45) + 30}%) contrast(115%) saturate(85%)` 
                            : `brightness(110%) contrast(92%) saturate(105%)`,
                        }}
                      />
                    ) : (
                      <img
                        src={selectedCategory.imageUrl}
                        alt={selectedCategory.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover select-none transition-all duration-700"
                        style={{
                          filter: isNightMode 
                            ? `brightness(${(params.intensity * 0.45) + 30}%) contrast(115%) saturate(85%)` 
                            : `brightness(110%) contrast(92%) saturate(105%)`,
                        }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#1a1310]/85 border border-neutral-900 m-4 rounded-2xl">
                  <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-purple-400 mb-3 animate-pulse">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-widest font-mono">自定义仿真素材未就绪</h4>
                  <p className="text-[11px] text-neutral-500 max-w-sm mt-1.5 leading-relaxed">
                    请在上方外框配置区，或者在下方直接拖入/点击上传您特定的建筑实写大相/动态视频，系统将自动开始计算物理色谱与照度。
                  </p>
                  <label 
                    htmlFor="immediate-inject-upload-input"
                    className="relative overflow-hidden mt-4 px-3.5 py-2 bg-purple-950/20 hover:bg-purple-900/20 text-xs font-mono font-bold text-purple-400 border border-purple-500/30 rounded-lg cursor-pointer transition-colors"
                  >
                    ➕ 立即注入实景/视频
                    <input
                      id="immediate-inject-upload-input"
                      type="file"
                      accept="image/*,video/*"
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10 font-sans"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          processFile(file, currentMediaKey);
                        }
                        e.target.value = ""; // Clear targeting value to support consecutive triggers
                      }}
                    />
                  </label>
                </div>
              )}

            {/* COLOR MIX-BLEND COLOURED GLOW OVERLAY */}
            <div 
              className={`absolute inset-0 pointer-events-none mix-blend-color transition-opacity duration-700 ${
                params.animationMode === 'pulse' ? 'animate-pulse' : ''
              } ${
                params.animationMode === 'breath' || selectedCategory.id === "custom-uploaded" ? 'animate-soft-breath' : ''
              }`}
              style={{
                backgroundColor: params.color,
                opacity: isNightMode ? (params.intensity / 100) * 0.55 : 0.04,
              }}
            />

            {/* CUSTOM REAL-WORLD IMAGE SOFT BREATH DYNAMIC ILLUMINATION OVERLAY */}
            {selectedCategory.id === "custom-uploaded" && isNightMode && (
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-screen transition-all duration-1000 z-10 animate-soft-breath"
                style={{
                  background: `
                    radial-gradient(circle at 50% 90%, ${params.color} 0%, transparent 65%),
                    radial-gradient(circle at 20% 80%, ${params.color} 0%, transparent 45%),
                    radial-gradient(circle at 80% 80%, ${params.color} 0%, transparent 45%)
                  `,
                  opacity: (params.intensity / 100) * 0.6,
                }}
              />
            )}

            {/* LIGHT VIRTUAL BEAM OVERLAY — 已移除：寺庙分类不再需要秀场类光束叠层 */}

            {/* Dynamic Ambient Blur Halo */}
            <div 
              className="absolute pointer-events-none transition-all duration-700 rounded-full blur-[120px] mix-blend-screen -top-1/4 -left-1/4 w-[350px] h-[350px] z-10"
              style={{ 
                backgroundColor: params.color,
                opacity: isNightMode ? 0.22 : 0
              }}
            />

            {/* CORNER BADGES & STAT OVERLAYS */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              <span className="bg-neutral-950/80 backdrop-blur-md text-yellow-400 font-mono text-[11px] px-3 py-1.5 rounded-full border border-yellow-500/20 flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
                Live 实时流光调节
              </span>

              {/* Day/Night Transition Button */}
              <button
                id="day-night-toggle-trigger-btn"
                type="button"
                onClick={() => {
                  const targetNight = !isNightMode;
                  setIsNightMode(targetNight);
                  if (!targetNight) {
                     setParams(p => ({ ...p, intensity: 100 }));
                  } else {
                     setParams(p => ({ ...p, intensity: 80 }));
                  }
                }}
                className={`px-3 py-1.5 rounded-full font-mono text-[11px] font-bold flex items-center gap-2 border cursor-pointer shadow-md transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isNightMode 
                    ? "bg-[#c2452b]/10 hover:bg-[#c2452b]/20 text-[#c2452b] border-[#c2452b]/30" 
                    : "bg-amber-500 hover:bg-amber-400 text-neutral-950 border-amber-600"
                }`}
                title="点击一键在日光白天与专属夜景照明设计中切换"
              >
                {isNightMode ? (
                  <>
                    <span>🌃 曜夜模式</span>
                    <span className="bg-neutral-950/60 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded border border-neutral-800">
                      转白天 🌅
                    </span>
                  </>
                ) : (
                  <>
                    <span>🌅 白天模式</span>
                    <span className="bg-neutral-950/60 text-yellow-400 text-[10px] px-1.5 py-0.5 rounded border border-neutral-800">
                      转夜景 🌃
                    </span>
                  </>
                )}
              </button>

              <span className="bg-neutral-950/80 backdrop-blur-md text-neutral-300 font-mono text-[11px] px-3 py-1.5 rounded-full border border-neutral-800 flex items-center gap-1.5">
                {getTempDescription(params.temperature).label}
              </span>
            </div>

            <div className="absolute top-4 right-4 bg-neutral-950/95 backdrop-blur-md text-neutral-400 font-mono text-[10px] px-3 py-1.5 rounded-lg border border-neutral-800/80 z-10 flex flex-col gap-0.5 text-right">
              <div>亮度评估: <span className="text-yellow-400 font-semibold">{params.intensity}%</span></div>
              <div className="text-[9px] text-neutral-500">时相: {isNightMode ? "🌃 深度夜演" : "🌅 艳阳白昼"}</div>
            </div>

            </div>

            {/* Bottom Info & Navigation Control Panel - moved below the media container to avoid blocking the video */}
            <div className="bg-[#0b0c10]/95 border-b border-neutral-800/80 p-3 px-5 flex flex-col md:flex-row justify-between items-center gap-4 select-none">
              <div className="text-left flex-1 min-w-0">
                <span className="font-mono text-[9px] uppercase text-neutral-500 tracking-wider block">CREATIVE BLUEPRINT CONCEPT</span>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-2 md:line-clamp-1">{selectedCategory.cases[0].title}</p>
              </div>

              {/* Unique Interactive Video Soundtrack Unmute/Mute Feature */}
              {isCustomVideo && (
                <div className="flex items-center gap-2 shrink-0 bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 px-2.5 py-1 rounded-lg transition-all">
                  <button
                    type="button"
                    onClick={() => setIsUploadedVideoMuted(!isUploadedVideoMuted)}
                    className="flex items-center gap-1.5 text-[10px] text-purple-300 hover:text-purple-200 font-mono font-bold cursor-pointer transition-colors"
                    title={isUploadedVideoMuted ? "点击激活视频原声" : "点击静音视频"}
                  >
                    {isUploadedVideoMuted ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-neutral-400 animate-pulse" />
                        <span>视频已静音 (点击原声 🔊)</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
                        <span className="text-purple-300">播放视频音轨 🎵</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="flex flex-wrap md:flex-nowrap items-center gap-4 shrink-0 justify-center">
                {/* Page Indicator Dot List with Prev Page Button */}
                <div className="flex flex-col items-center justify-center font-mono text-[9px] text-neutral-500 gap-1.5 border-r border-neutral-800/80 pr-4">
                  <span className="tracking-widest text-[8px] uppercase font-bold text-neutral-500 leading-none">PROJECT PAGE</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      id="prev-media-page-action-btn"
                      onClick={() => {
                        setMediaPageIndex(prev => (prev - 1 + 3) % 3);
                      }}
                      className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 hover:border-neutral-500 hover:bg-neutral-950 text-neutral-400 hover:text-neutral-200 text-[10px] select-none font-bold cursor-pointer transition-all active:scale-95 flex items-center gap-1"
                      title="返回上一页项目细节"
                    >
                      <span className="text-[10px] text-neutral-500">⇠</span>
                      <span>上一页</span>
                    </button>
                    
                    <div className="flex gap-1.5 items-center">
                      {[0, 1, 2].map((idx) => (
                        <button 
                          id={`media-page-dot-${idx}`}
                          key={idx} 
                          type="button"
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 outline-none cursor-pointer ${
                            mediaPageIndex === idx 
                              ? "bg-yellow-400 scale-125 shadow shadow-yellow-400/50" 
                              : "bg-neutral-800 hover:bg-neutral-600"
                          }`}
                          onClick={() => setMediaPageIndex(idx)}
                          title={`切换到第 ${idx + 1} 页`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tactical Page Step Switch Button inside purple zone */}
                <button
                  type="button"
                  id="prev-media-page-btn"
                  onClick={() => {
                    setMediaPageIndex(prev => (prev + 1) % 3);
                  }}
                  className="bg-neutral-900/90 hover:bg-neutral-950 border-2 border-dashed border-purple-500 hover:border-purple-400 text-purple-300 hover:text-purple-200 px-3.5 py-1.5 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95 text-center shrink-0 min-w-[78px] shadow-lg shadow-purple-950/10"
                  title="点击在当前领域组中翻阅切换至下一页项目细节 (共 3 页可循环)"
                >
                  <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold flex items-center gap-0.5 leading-none">
                    <span>下一页</span>
                    <span className="text-[10px] text-purple-400 animate-pulse">➔</span>
                  </span>
                  <span className="text-[10px] text-yellow-400 font-bold font-mono mt-1">
                    {mediaPageIndex === 0 ? "第 1/3 页" : mediaPageIndex === 1 ? "第 2/3 页" : "第 3/3 页"}
                  </span>
                </button>

                {/* Existing Real Site Location Label */}
                <div className="text-right pl-1 min-w-[124px]">
                  <span className="font-mono text-[9px] uppercase text-neutral-500 font-medium block">REAL SITE ESTIMATE</span>
                  <p className="text-xs text-yellow-400 font-semibold mt-1 line-clamp-1">{selectedCategory.cases[0].location}</p>
                </div>
              </div>
            </div>
            </>
          )}



          {/* QUICK LIGHTING ADJUSTMENT CONSOLE BAR */}
          <div className="bg-neutral-900 border-t border-neutral-800/80 p-5 flex flex-col gap-5">
            
            {/* Top Row: Basic Sliders & Selection */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Color Temp Slider */}
              <div className="md:col-span-5 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400 font-medium flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-400" /> 色温 (Color Temp)
                  </span>
                  <span className="font-mono text-neutral-300 text-[11px]">
                    {params.temperature}K
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="6500"
                  step="100"
                  value={params.temperature}
                  onChange={(e) => setParams(p => ({ ...p, temperature: Number(e.target.value) }))}
                  className="w-full accent-yellow-500 bg-neutral-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>

              {/* Brightness Intensity Slider */}
              <div className="md:col-span-5 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400 font-medium flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-yellow-400" /> 光源照度 (Intensity)
                  </span>
                  <span className="font-mono text-neutral-300 text-[11px]">
                    {params.intensity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={params.intensity}
                  onChange={(e) => setParams(p => ({ ...p, intensity: Number(e.target.value) }))}
                  className="w-full accent-yellow-500 bg-neutral-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>

              {/* Animation Cycle Selector */}
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] text-neutral-500 font-mono tracking-wider">DMX EFFECT ENGINE</label>
                <select
                  value={params.animationMode}
                  onChange={(e) => setParams(p => ({ ...p, animationMode: e.target.value as any }))}
                  className="w-full bg-neutral-950 border border-neutral-800/80 rounded-lg py-1.5 px-2.5 text-xs text-neutral-300 outline-none focus:border-yellow-500/50 cursor-pointer"
                >
                  <option value="static">🌌 静态常亮</option>
                  <option value="breath">🌬️ 柔和呼吸</option>
                  <option value="pulse">⚡ 周期脉冲</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* DUAL VIDEO SHOWCASE — 2 个可上传/编辑/删除的视频展示区域 */}
        <DualVideoShowcase />

        {/* NEWS SECTION - 微信公众号风格图文动态 */}
        <NewsSection />

      </div>
    </div>
      {isLoggedIn && (
        <>
      {/* PROJECT LIFECYCLE SAVE & RESTORE CORE PANEL — moved to page bottom */}
      <div id="project-backup-premium-widget" className="relative bg-[#1a1310]/80 border border-neutral-800/80 p-5 rounded-2xl flex flex-col gap-3 text-left hover:border-purple-500/30 transition-all shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-550/10 border border-purple-500/20 flex items-center justify-center">
              <Cloud className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-purple-400 block font-bold">CLOUD DEPLOYMENT</span>
              <span className="text-[11px] font-semibold text-neutral-200 block mt-0.5">云端高定托管发布中心 (在线同步)</span>
            </div>
          </div>
          <span className="text-[9px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded font-mono border border-purple-500/20">HOSTED ONLINE</span>
        </div>

        <p className="text-[11px] text-neutral-450 leading-relaxed">
          寺庙佛教设计方案现在<b>可以直接发布托管</b>至在线云端服务器。当系统上线或刷新页面时，将自动为您和所有访客加载并应用此托管版本方案。
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-1 w-full">
          <button
            id="save-to-cloud-btn"
            type="button"
            onClick={saveZenspaceProjectToServer}
            className="flex-1 py-2 px-3 rounded-xl text-xs bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 border border-purple-500/30 hover:border-purple-400 transition-all font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <Save className="w-3.5 h-3.5 shrink-0 text-purple-400 animate-pulse" />
            发布全案至云端托管
          </button>

          <button
            id="load-from-cloud-btn"
            type="button"
            onClick={() => loadZenspaceProjectFromServer(true)}
            className="flex-1 py-2 px-3 rounded-xl text-xs bg-[#0c0d12] hover:bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-300 transition-all font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-md text-center"
          >
            <RefreshCw className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
            同步拉取重载方案
          </button>
        </div>

        <div className="border-t border-neutral-900 pt-3 mt-1 flex flex-col gap-2">
          <span className="text-[10px] text-neutral-500 font-mono">📁 离线物理备份与快照冗余（磁盘导入/导出）：</span>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={exportZenspaceProject}
              className="flex-1 py-1.5 px-2.5 rounded-xl text-[10px] bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-400 hover:text-neutral-300 transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3 text-neutral-500" />
              导出离线 JSON 备份
            </button>
            <label className="relative overflow-hidden flex-1 py-1.5 px-2.5 rounded-xl text-[10px] bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-400 hover:text-neutral-300 transition-all flex items-center justify-center gap-1 cursor-pointer text-center">
              <FileUp className="w-3 h-3 text-neutral-500" />
              载入离线 JSON 文件
              <input
                type="file"
                accept=".json"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={importZenspaceProject}
              />
            </label>
          </div>
        </div>

        <div className="h-6 mt-0.5 flex items-center transition-all justify-start">
          {backupNotification ? (
            <div className="text-[11px] text-purple-400 flex items-center gap-1.5 font-medium animate-pulse px-2 py-0.5 rounded bg-purple-500/5 border border-purple-500/10 w-full truncate border-dashed">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 animate-ping" />
              <span>{backupNotification}</span>
            </div>
          ) : (
            <span className="text-[10px] text-neutral-500 font-mono">
              🛡️ 托管安全：明暗、色彩及特定色温组合均一键发布固化，实现高动态服务器多点分发。
            </span>
          )}
        </div>
      </div>
        </>
      )}

  </div>
);
}
