import React, { useState, useEffect, useRef } from "react";
import { 
  Film, 
  Trash2, 
  Plus, 
  Video, 
  Edit2, 
  Check, 
  Globe, 
  Award, 
  Tv, 
  CloudLightning,
  CornerDownRight,
  Info,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Image
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export interface VideoSlot {
  id: number; // 1, 2, 3
  title: string;
  location: string;
  notes: string;
  videoUrl: string; // object URL or online URL (shares name for mediaUrl representation)
  fileName?: string;
  mediaType?: "video" | "image";
}

const DEFAULT_SLOTS: VideoSlot[] = [
  {
    id: 1,
    title: "《九曜星辰》高定智屏媒体立面演艺",
    location: "寺庙佛教设计湾商务金融大厦 · 像素点控",
    notes: "集成式幕墙卡槽高密度像素灯具。数控粒子流自下而上如萤跃动，擦亮竖挺立面。",
    videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=231175ed7494f1dd37397b9195d852cc563c6253&profile_id=139&oauth2_token_id=57447761",
    mediaType: "video"
  },
  {
    id: 2,
    title: "《汉唐重阁》文保级无损防眩夜观灯效",
    location: "西京大雁塔核心景区 · 古物夜景",
    notes: "专利无痕免打孔张力抱箍抱柱灯组。单色2200K琥珀温光擦亮额枋飞檐，不伤古建筑一砖一瓦。",
    videoUrl: "https://player.vimeo.com/external/459389137.sd.mp4?s=99453d611c001cf4bda7b1a791a56b6070fa8959&profile_id=139&oauth2_token_id=57447761",
    mediaType: "video"
  },
  {
    id: 3,
    title: "《大鱼沉沙》生态全息水幕漫反射演艺",
    location: "山水画景度假地 · 浮岛水上演光",
    notes: "50000流明全色激光投影矩阵。画面直接映射于散雾喷淋水帘，变幻出宛如极光的沉浸式时空光圈。",
    videoUrl: "https://player.vimeo.com/external/403816155.sd.mp4?s=d0db58679ea12bf1b0213000ccbf25b0fa3bf5da&profile_id=139&oauth2_token_id=57447761",
    mediaType: "video"
  }
];

const DEFAULT_EXTRA_SLOTS: VideoSlot[] = [
  {
    id: 101,
    title: "《海市蜃楼》流光雕刻数字橱窗案例",
    location: "杭州创意产业集聚区 · 折光多屏",
    notes: "运用超薄纳米全息发光橱窗。动态夜间粒子如同流水滑过，与室内奢华展品形成数字时空呼应，提升商业质感。",
    videoUrl: "https://player.vimeo.com/external/435649371.sd.mp4?s=d0f074d7efd6da075e7a91a32a688a44b9ffdc6e&profile_id=139&oauth2_token_id=57447761",
    mediaType: "video"
  },
  {
    id: 102,
    title: "《极光极境》裸眼3D折角立体像素墙",
    location: "深圳湾超级总部区 · 数字化地标",
    notes: "定制高刷P2.5户外高亮折角屏。动态深海数字景观与折光动画营造无缝空间错觉，展示暗天空设计美学。",
    videoUrl: "https://player.vimeo.com/external/371434316.sd.mp4?s=1240c4a4501a1c496d8b6727284f3cc0c1fdcff3&profile_id=139&oauth2_token_id=57447761",
    mediaType: "video"
  }
];

interface CustomVideoPlayerProps {
  videoUrl: string;
  slotId: number;
}

function CustomVideoPlayer({ videoUrl, slotId }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Reset state on URL change
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsMuted(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.pause();
    }
  }, [videoUrl]);

  // Autoplay/Preview trigger on hover state
  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        // Fallback if browser blocks unmuted playback initially
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(e => console.log("Auto-preview play failed:", e));
        }
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isHovered, isMuted]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Play interrupted:", err));
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime = Number(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className="relative w-full h-full group/player overflow-hidden bg-neutral-950"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        loop
        muted={isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={(e) => togglePlay(e)}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* GLOWING HOVER AUTO-PREVIEW PILLED BADGE */}
      {isHovered && (
        <div className="absolute top-3 left-3 bg-neutral-950/90 backdrop-blur-md border border-yellow-500/35 text-yellow-400 font-mono text-[9px] px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-lg shadow-black/80 pointer-events-none z-10 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
          <span>⚡ 悬停极速智能预演 (Preview active)</span>
        </div>
      )}

      {/* BIG MIDDLE PLAY/PAUSE OVERLAY INDICATION */}
      <div 
        onClick={(e) => togglePlay(e)}
        className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 cursor-pointer ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 transform transition-all duration-300 group-hover/player:scale-105">
          <div className="w-12 h-12 rounded-full bg-neutral-900/95 border border-yellow-500/25 text-yellow-400 flex items-center justify-center transform transition-transform hover:scale-110 active:scale-95 shadow-lg shadow-black/60">
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current translate-x-0.5" />
            )}
          </div>
          <span className="text-[9px] font-mono tracking-wider text-neutral-300 bg-neutral-950/90 border border-neutral-800 px-2 py-0.5 rounded-md shadow uppercase">
            {isPlaying ? "点击暂停演播" : "点击继续演播"}
          </span>
        </div>
      </div>

      {/* CONTROLS OVERLAY - slides from bottom on hover or stays visible when paused */}
      <div 
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950 via-neutral-950/95 to-transparent p-3 pt-6 pb-2.5 transition-all duration-300 flex flex-col gap-2 select-none pointer-events-auto ${
          isHovered || !isPlaying ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        {/* CUSTOM INTERACTIVE PROGRESS BAR */}
        <div className="flex items-center gap-2 group/slider w-full">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            onClick={(e) => e.stopPropagation()}
            className="w-full accent-yellow-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer hover:h-1.5 transition-all outline-none"
            style={{
              background: `linear-gradient(to right, #d4a441 0%, #d4a441 ${progressPercent}%, #262626 ${progressPercent}%, #262626 100%)`
            }}
          />
        </div>

        {/* BOTTOM BUTTON BAR (PLAY, TIME, MUTE, FULLSCREEN) */}
        <div className="flex items-center justify-between text-xs text-neutral-300 font-mono">
          <div className="flex items-center gap-3">
            {/* Small Play/Pause Trigger */}
            <button 
              onClick={(e) => togglePlay(e)}
              type="button"
              className="hover:text-yellow-400 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Time Indicator */}
            <span className="text-[10px] text-neutral-400">
              {formatTime(currentTime)} <span className="text-neutral-600">/</span> {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Volume controller */}
            <button 
              onClick={(e) => toggleMute(e)}
              type="button"
              className="hover:text-yellow-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="text-[9px] text-neutral-500">Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[9px] text-cyan-400 font-bold">Live</span>
                </>
              )}
            </button>

            {/* Maximize screen */}
            <button 
              onClick={(e) => handleFullscreen(e)}
              type="button"
              className="hover:text-yellow-400 transition-colors cursor-pointer p-0.5"
              title="全屏播映"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomImagePlayer({ imageUrl }: { imageUrl: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  return (
    <div className="relative w-full h-full overflow-hidden bg-neutral-950 flex items-center justify-center group/img-container">
      <img
        src={imageUrl}
        alt="Portfolio Case Image Preview"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        style={{
          filter: `brightness(${brightness}%) contrast(${contrast}%)`
        }}
        className={`w-full h-full object-cover transition-all duration-700 ease-out hover:scale-105 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      />
      
      {/* Light filter tuning badges overlay when hovered */}
      <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-md border border-neutral-800/80 px-2 py-0.5 rounded-full z-10 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wide">
          🖼️ 高阶完工大图
        </span>
      </div>

      {/* Nice interactive control bar for lighting tuning */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent p-2.5 pt-6 opacity-0 group-hover/img-container:opacity-100 transition-opacity duration-300 flex items-center justify-between text-[10.5px] text-neutral-300 font-mono">
        <div className="flex items-center gap-2">
          <span>🔆 画面亮度:</span>
          <input
            type="range"
            min="50"
            max="150"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-16 accent-yellow-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-2">
          <span>🌗 对比度:</span>
          <input
            type="range"
            min="50"
            max="150"
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
            className="w-16 accent-yellow-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default function ThreeVideoShowcase() {
  const { isLoggedIn } = useAuth();
  const [slots, setSlots] = useState<VideoSlot[]>(() => {
    const saved = localStorage.getItem("lumos_three_video_slots");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((item: any) => ({
          ...item,
          mediaType: item.mediaType || "video"
        }));
      } catch (e) {
        console.error("Failed to parse stored slots", e);
      }
    }
    return DEFAULT_SLOTS;
  });

  // State for toggling expanded "More project videos" view
  const [showMoreVideos, setShowMoreVideos] = useState<boolean>(false);

  // Expanded/interactive extra project video items
  const [extraSlots, setExtraSlots] = useState<VideoSlot[]>(() => {
    const saved = localStorage.getItem("lumos_extra_video_slots");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((item: any) => ({
          ...item,
          mediaType: item.mediaType || "video"
        }));
      } catch (e) {
        console.error("Failed to parse stored extra slots", e);
      }
    }
    return DEFAULT_EXTRA_SLOTS;
  });

  // State for active slot being configured/added
  const [editingSlotId, setEditingSlotId] = useState<number | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formMediaType, setFormMediaType] = useState<"video" | "image">("video");
  const [formError, setFormError] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");

  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const imageFileInputRef = useRef<HTMLInputElement>(null);

  // Persist slots to local storage
  useEffect(() => {
    localStorage.setItem("lumos_three_video_slots", JSON.stringify(slots));
  }, [slots]);

  // Persist extra slots to local storage
  useEffect(() => {
    localStorage.setItem("lumos_extra_video_slots", JSON.stringify(extraSlots));
  }, [extraSlots]);

  // Dynamic Case Publishing Dashboard states
  const [showPublishForm, setShowPublishForm] = useState<boolean>(false);
  const [pubTitle, setPubTitle] = useState<string>("");
  const [pubLocation, setPubLocation] = useState<string>("");
  const [pubNotes, setPubNotes] = useState<string>("");
  const [pubUrl, setPubUrl] = useState<string>("");
  const [pubMediaType, setPubMediaType] = useState<"video" | "image">("video");
  const [pubFileName, setPubFileName] = useState<string>("");
  const [publishError, setPublishError] = useState<string>("");

  // Handle local video selection
  const handleVideoFileChange = (slotId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 150 * 1024 * 1024) {
        setFormError("本地案例视频文件过大，请选择 150MB 以内的视频。");
        return;
      }
      try {
        const fileObjUrl = URL.createObjectURL(file);
        setFormUrl(fileObjUrl);
        setUploadedFileName(file.name);
        setFormMediaType("video");
        if (!formTitle) {
          const strippedName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
          setFormTitle(`《${strippedName}》完工实录`);
        }
        if (!formLocation) {
          setFormLocation("现场实地调试位置");
        }
        setFormError("");
      } catch (error) {
        setFormError("加载本地文件失败，请重试");
      }
    }
  };

  // Handle local image selection
  const handleImageFileChange = (slotId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 30 * 1024 * 1024) {
        setFormError("本地案例图片文件过大，请选择 30MB 以内的图片。");
        return;
      }
      try {
        const fileObjUrl = URL.createObjectURL(file);
        setFormUrl(fileObjUrl);
        setUploadedFileName(file.name);
        setFormMediaType("image");
        if (!formTitle) {
          const strippedName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
          setFormTitle(`《${strippedName}》设计创意方案`);
        }
        if (!formLocation) {
          setFormLocation("项目落座地标");
        }
        setFormError("");
      } catch (error) {
        setFormError("加载本地文件失败，请重试");
      }
    }
  };

  const handleOpenEdit = (slot: VideoSlot) => {
    setEditingSlotId(slot.id);
    setFormTitle(slot.title);
    setFormLocation(slot.location);
    setFormNotes(slot.notes);
    setFormUrl(slot.videoUrl);
    setUploadedFileName(slot.fileName || "");
    setFormMediaType(slot.mediaType || "video");
    setFormError("");
  };

  const handleSaveSlot = (slotId: number) => {
    if (!formUrl.trim()) {
      setFormError("请上传本地视频或图片，或者在下方填发在线素材地址。");
      return;
    }
    if (!formTitle.trim()) {
      setFormError("请输入项目的展现名称。");
      return;
    }

    setSlots(prev => prev.map(s => {
      if (s.id === slotId) {
        return {
          id: slotId,
          title: formTitle.trim(),
          location: formLocation.trim() || "实测地标项目",
          notes: formNotes.trim() || "自主亮化与防眩方案实镜，已按暗天空100%覆盖标准交付。",
          videoUrl: formUrl.trim(),
          fileName: uploadedFileName,
          mediaType: formMediaType
        };
      }
      return s;
    }));

    // Reset editing
    setEditingSlotId(null);
    clearForm();
  };

  const clearForm = () => {
    setFormTitle("");
    setFormLocation("");
    setFormNotes("");
    setFormUrl("");
    setUploadedFileName("");
    setFormMediaType("video");
    setFormError("");
  };

  const handleDeleteSlot = (slotId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (confirm(`确定要清空第 ${slotId} 号案例展示仓的内容吗？`)) {
      setSlots(prev => prev.map(s => {
        if (s.id === slotId) {
          return {
            id: slotId,
            title: "",
            location: "",
            notes: "",
            videoUrl: "",
            mediaType: "video"
          };
        }
        return s;
      }));
      // If editing this slot, close form
      if (editingSlotId === slotId) {
        setEditingSlotId(null);
        clearForm();
      }
    }
  };

  const handleResetToDefaults = () => {
    if (confirm("确定要恢复 3 个系统预装的高端金奖实景完工视频案例吗？这将覆盖您当前所有槽位设定。")) {
      setSlots(DEFAULT_SLOTS);
      setEditingSlotId(null);
      clearForm();
    }
  };

  // Handler for publishing dynamic extra video cases
  const handlePubVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 150 * 1024 * 1024) {
        setPublishError("本地发布视频文件过大，请选择 150MB 以内的视频。");
        return;
      }
      try {
        const fileObjUrl = URL.createObjectURL(file);
        setPubUrl(fileObjUrl);
        setPubFileName(file.name);
        setPubMediaType("video");
        if (!pubTitle) {
          const stripped = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
          setPubTitle(`《${stripped}》流光实景演艺`);
        }
        if (!pubLocation) {
          setPubLocation("实地亮化落成地");
        }
        setPublishError("");
      } catch (err) {
        setPublishError("本地文件解析失败，请重试");
      }
    }
  };

  const handlePubImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 30 * 1024 * 1024) {
        setPublishError("本地发布图纸过大，请选择 30MB 以内的图像。");
        return;
      }
      try {
        const fileObjUrl = URL.createObjectURL(file);
        setPubUrl(fileObjUrl);
        setPubFileName(file.name);
        setPubMediaType("image");
        if (!pubTitle) {
          const stripped = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
          setPubTitle(`《${stripped}》真实效果概念`);
        }
        if (!pubLocation) {
          setPubLocation("地标位置");
        }
        setPublishError("");
      } catch (err) {
        setPublishError("本地文件解析失败，请重试");
      }
    }
  };

  const handlePublishCase = () => {
    if (!pubUrl.trim()) {
      setPublishError("请选择本地视频/图片或填入在线加速素材直链直达上架。");
      return;
    }
    if (!pubTitle.trim()) {
      setPublishError("请输入我们要展示的项目名称/标题");
      return;
    }

    const newSlot: VideoSlot = {
      id: Date.now(),
      title: pubTitle.trim(),
      location: pubLocation.trim() || "高定工程案例",
      notes: pubNotes.trim() || "自主亮化与防眩方案实镜，已按高密度点控、节能黑天空环境标准交付。",
      videoUrl: pubUrl.trim(),
      fileName: pubFileName,
      mediaType: pubMediaType
    };

    setExtraSlots(prev => [newSlot, ...prev]);
    setShowPublishForm(false);
    clearPubForm();
  };

  const clearPubForm = () => {
    setPubTitle("");
    setPubLocation("");
    setPubNotes("");
    setPubUrl("");
    setPubFileName("");
    setPubMediaType("video");
    setPublishError("");
  };

  const handleDeleteExtraSlot = (id: number) => {
    if (confirm("确定要下架删除这一条扩充的项目展示案例吗？")) {
      setExtraSlots(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div id="three-video-showcase-container" className="flex flex-col gap-6 text-left pt-8 sm:pt-12">
      
      {/* Title Header area for the video row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-900 pb-4 gap-4">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#e3a857]">SELECTED CASES / 寺庙佛教设计精选案例</span>
          <h3 className="text-xl font-bold text-neutral-100 mt-1 flex items-center gap-2">
            <Tv className="w-5.5 h-5.5 text-yellow-400 shrink-0" />
            寺庙佛教设计精选案例
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            每个展示位支持<b>上传视频</b>或<b>高清完工图</b>，动态实景与高精静态兼载，呈现多元化亮化案例。
          </p>
        </div>

        {/* Restore control button - only visible when logged in */}
        {isLoggedIn && (
          <button
            onClick={handleResetToDefaults}
            className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-850 hover:border-neutral-700 hover:text-yellow-400 text-neutral-400 text-xs font-mono transition-all cursor-pointer whitespace-nowrap"
          >
            🔄 重新装载金奖系统默认案
          </button>
        )}
      </div>

      {/* Grid of 3 Players */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {slots.map((slot) => {
          const hasContent = !!slot.videoUrl;
          const isCurrentConfiguring = editingSlotId === slot.id;
          const isVideo = (slot.mediaType || "video") === "video";

          return (
            <div 
              key={slot.id} 
              className={`rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 relative ${
                hasContent 
                  ? "bg-neutral-950/80 border-neutral-850 hover:border-neutral-700/80" 
                  : "bg-neutral-950/40 border-dashed border-neutral-800 hover:border-neutral-700/60"
              }`}
            >
              
              {/* Header Badge */}
              <div className="px-4 py-2 bg-neutral-900/40 border-b border-neutral-900 flex justify-between items-center text-[10px] font-mono text-neutral-400">
                <span className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${isVideo ? "bg-yellow-400" : "bg-cyan-400"} animate-pulse`} />
                  CASE DECK #0{slot.id} {isVideo ? "🎥" : "🖼️"}
                </span>
                
                {hasContent && isLoggedIn && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(slot)}
                      className="text-neutral-500 hover:text-cyan-400 transition-colors cursor-pointer"
                      title="编辑文本属性与上传源"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteSlot(slot.id, e)}
                      className="text-red-500 hover:text-red-400 transition-colors cursor-pointer ml-1"
                      title="清空此插座展示"
                    >
                      <Trash2 className="w-3" />
                    </button>
                  </div>
                )}
                {hasContent && !isLoggedIn && (
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-neutral-600">登录后可见</span>
                  </div>
                )}
              </div>

              {/* VIDEO OR IMAGE DISPLAY WINDOW */}
              <div className="aspect-video w-full bg-[#080b0f] relative overflow-hidden flex items-center justify-center border-b border-neutral-900">
                {hasContent ? (
                  isVideo ? (
                    <CustomVideoPlayer videoUrl={slot.videoUrl} slotId={slot.id} />
                  ) : (
                    <CustomImagePlayer imageUrl={slot.videoUrl} />
                  )
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center gap-2">
                    <span className="text-[9px] font-mono text-neutral-600 tracking-wider">AWAITING PORTFOLIO</span>
                    <h4 className="text-xs font-bold text-neutral-450 mt-1">0{slot.id} 号展示舱空置</h4>
                    <p className="text-[10px] text-neutral-500 max-w-xs px-2 leading-snug">
                      支持在下方直接快速上传完工演示视频或高清大图。
                    </p>
                    
                    <div className="flex gap-2.5 mt-2.5">
                      {isLoggedIn ? (
                        <>
                          <button
                            onClick={() => {
                              setEditingSlotId(slot.id);
                              setFormMediaType("video");
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-[10px] font-bold text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer flex items-center gap-1"
                          >
                            🎥 注入视频
                          </button>
                          <button
                            onClick={() => {
                              setEditingSlotId(slot.id);
                              setFormMediaType("image");
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-[10px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1"
                          >
                            🖼️ 注入图片
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] text-neutral-600">请先登录管理员账号</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* META INFO AT FOOT OF CARD */}
              {hasContent ? (
                <div className="p-4 flex flex-col justify-between flex-1 gap-2.5 text-left">
                  <div>
                    <h4 className="text-sm font-bold text-neutral-200 line-clamp-1">{slot.title}</h4>
                    <p className="text-xs text-yellow-400/90 font-mono mt-1 flex items-center gap-1">
                      <Globe className="w-3 h-3 shrink-0" />
                      {slot.location}
                    </p>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-sans mt-2 line-clamp-2">
                      {slot.notes}
                    </p>
                  </div>
                  <div className="border-t border-neutral-900/60 pt-2 flex justify-between items-center text-[9px] font-mono text-neutral-600">
                    <span>{isVideo ? "1080P COMPLETED VIDEO" : "HIGH-RES PORTFOLIO IMG"}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] border uppercase ${isVideo ? "bg-yellow-950/20 border-yellow-800/20 text-yellow-500" : "bg-cyan-950/20 border-cyan-800/20 text-cyan-500"}`}>
                      {isVideo ? "DMX-Locked" : "SRGB-True"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-4 flex flex-col justify-center items-center flex-1 py-6 bg-neutral-950/20">
                  <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                    AWAITING DEVELOPER VIDEO
                  </span>
                </div>
              )}

              {/* EXPANDABLE CONFIG PANEL INSIDE THE SPECIFIC DECK CARD SPLIT */}
              {isCurrentConfiguring && (
                <div className="absolute inset-x-0 bottom-0 top-7 bg-[#0b0f14] z-20 p-4 border-t border-neutral-800 flex flex-col justify-between overflow-y-auto">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-yellow-400 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" /> 注入第 0{slot.id} 舱参数
                      </span>
                      <button 
                        onClick={() => {
                          setEditingSlotId(null);
                          clearForm();
                        }}
                        className="text-[10px] text-neutral-500 hover:text-neutral-300 font-mono"
                      >
                        [关闭 ×]
                      </button>
                    </div>

                    {/* SELECT MEDIA TYPE INTERACTIVELY */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-500 font-mono">1. 选择媒体种类</label>
                      <div className="grid grid-cols-2 gap-2 mt-0.5">
                        <button
                          type="button"
                          onClick={() => setFormMediaType("video")}
                          className={`py-1 rounded text-[10px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            formMediaType === "video" 
                              ? "bg-yellow-950/20 border-yellow-500/50 text-yellow-400" 
                              : "bg-neutral-900 border-neutral-850 text-neutral-400 hover:text-neutral-300"
                          }`}
                        >
                          🎥 动态视频模式
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormMediaType("image")}
                          className={`py-1 rounded text-[10px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            formMediaType === "image" 
                              ? "bg-cyan-950/20 border-cyan-500/50 text-cyan-400" 
                              : "bg-neutral-900 border-neutral-850 text-neutral-400 hover:text-neutral-300"
                          }`}
                        >
                          🖼️ 静态完工图模式
                        </button>
                      </div>
                    </div>

                    {/* Choose Source Input Options */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-neutral-500 font-mono font-medium">2. 双端单独上传渠道 (Upload File)</label>
                      <div className="grid grid-cols-2 gap-2 mt-0.5">
                        
                        {/* Native Video Upload Button */}
                        <label className="relative overflow-hidden flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-yellow-500/30 text-[10px] text-neutral-300 font-semibold cursor-pointer text-center group transition-colors">
                          <Video className="w-3.5 h-3.5 text-neutral-500 group-hover:text-yellow-400 transition-colors" />
                          <span>📁 本地视频</span>
                          <span className="text-[8px] text-neutral-600 font-mono">150M内</span>
                          <input 
                            type="file" 
                            accept="video/*"
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                            onChange={(e) => handleVideoFileChange(slot.id, e)}
                          />
                        </label>

                        {/* Native Image Upload Button */}
                        <label className="relative overflow-hidden flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-cyan-500/30 text-[10px] text-neutral-300 font-semibold cursor-pointer text-center group transition-colors">
                          <Image className="w-3.5 h-3.5 text-neutral-500 group-hover:text-cyan-400 transition-colors" />
                          <span>📁 本地图片</span>
                          <span className="text-[8px] text-neutral-600 font-mono">30M内</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                            onChange={(e) => handleImageFileChange(slot.id, e)}
                          />
                        </label>
                      </div>

                      <div className="flex flex-col gap-1 mt-1">
                        <span className="text-[9px] text-neutral-500">或在下栏贴入在线素材直链：</span>
                        <input 
                          type="url" 
                          placeholder={formMediaType === "video" ? "填入在线 MP4 / WebM 视频直链" : "填入在线图片 JPG / PNG 直链"}
                          value={formUrl}
                          onChange={(e) => {
                            setFormUrl(e.target.value);
                            setFormError("");
                          }}
                          className="bg-neutral-950 border border-neutral-850 hover:border-neutral-700/80 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-mono focus:border-cyan-500/50 outline-none"
                        />
                      </div>
                      
                      {uploadedFileName && (
                        <p className="text-[9px] text-emerald-400 font-mono truncate">
                          已选择: {uploadedFileName}
                        </p>
                      )}
                    </div>

                    {/* Metadata edit fields */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-neutral-500 font-mono">3. 展现名称 (Title)</label>
                      <input 
                        type="text" 
                        placeholder="例：《大鱼海棠》水上演光秀"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 hover:border-neutral-700/80 rounded-lg px-2.5 py-1.5 text-xs text-neutral-100 focus:border-yellow-500/50 outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-neutral-500 font-mono">4. 拍摄地标及项目位置</label>
                      <input 
                        type="text" 
                        placeholder="例：中国西安 · 核心文化圈"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 hover:border-neutral-700/80 rounded-lg px-2.5 py-1.5 text-xs text-neutral-100 focus:border-yellow-500/50 outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-neutral-500 font-mono">5. 创意细节简述 (可选)</label>
                      <textarea 
                        rows={2}
                        placeholder="选填，案例的灯光手法、节律降额或其他技术说明。"
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 hover:border-neutral-700/80 rounded-lg px-2.5 py-1.5 text-[11px] text-neutral-100 focus:border-yellow-500/50 outline-none resize-none"
                      />
                    </div>

                    {formError && (
                      <p className="text-[10px] text-red-400 font-mono leading-tight">
                        ⚠️ {formError}
                      </p>
                    )}
                  </div>

                  {/* Actions to persist changes */}
                  <div className="flex items-center justify-end gap-2.5 border-t border-neutral-900 pt-3 mt-3">
                    <button
                      onClick={() => {
                        setEditingSlotId(null);
                        clearForm();
                      }}
                      className="px-3 py-1.5 bg-neutral-950 text-neutral-400 hover:text-neutral-300 rounded-lg text-xs font-semibold cursor-pointer border border-neutral-850"
                    >
                      取消
                    </button>
                    <button
                      onClick={() => handleSaveSlot(slot.id)}
                      className={`px-3.5 py-1.5 bg-gradient-to-r ${formMediaType === "video" ? "from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500" : "from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500"} text-neutral-950 rounded-lg text-xs font-bold shadow-md cursor-pointer transition-all`}
                    >
                      💾 保存{formMediaType === "video" ? "视频" : "图片"}案例
                    </button>
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Tip footer with 'More Project Videos' button inside the right wireframe zone */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-neutral-950/20 border border-neutral-900 rounded-xl p-4 text-[11px] text-neutral-500">
        <div className="flex items-start gap-2 flex-1 text-left">
          <Info className="w-4.5 h-4.5 text-cyan-500 shrink-0 mt-0.5 animate-pulse" />
          <div className="leading-relaxed">
            <span className="text-neutral-450 font-semibold block mb-0.5">案例上传说明：</span>
            <span>点击空展示位的"🎥 注入视频"或"🖼️ 注入图片"即可上传本地媒体文件，保存后自动缓存在浏览器中。如需展示更多案例，点击右侧 <b>"🔮 更多项目视频"</b> 展开扩展库，发布任意数量的新案例。</span>
          </div>
        </div>

        {/* Purple Wireframe Highlight button right next to explanation */}
        <div id="more-projects-expanded-btn-container" className="shrink-0 flex items-center justify-center lg:justify-end">
          <button
            type="button"
            onClick={() => {
              setShowMoreVideos(prev => !prev);
              if (!showMoreVideos) {
                setShowPublishForm(true); // Auto-open publishing desk when opening the bay for immediate delight
              }
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#090b0f] hover:bg-neutral-950 border-2 border-dashed border-purple-500 hover:border-purple-300 text-xs font-mono font-bold text-purple-300 hover:text-purple-200 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-950/30"
          >
            <Film className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
            <span>{showMoreVideos ? "收起扩展项目库 ⌃" : "🔮 更多项目视频 展开 ⌄"}</span>
            <span className="bg-purple-900/40 text-purple-200 border border-purple-500/25 rounded-full px-1.5 py-0.2 text-[9px] font-bold">
              {extraSlots.length}
            </span>
          </button>
        </div>
      </div>

      {/* Infinite expansion container */}
      {showMoreVideos && (
        <div className="border border-purple-500/20 bg-[#07090d]/80 backdrop-blur-md rounded-3xl p-6 relative transition-all duration-300 animate-fade-in text-left">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-neutral-900/85">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-purple-400">Dynamic Portfolio / 寺庙佛教设计全案媒体展映库</span>
              <h4 className="text-base font-bold text-neutral-100 mt-1 flex items-center gap-2">
                <Film className="w-5 h-5 text-purple-400 shrink-0" />
                寺庙佛教设计扩展项目视频库 ({extraSlots.length} 个案例)
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                此库支持上架任意数量的现场案例、外立面试光展示等，不受展示位数量限制。
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isLoggedIn && (
                <button
                  type="button"
                  onClick={() => {
                    setShowPublishForm(current => {
                      const nextVal = !current;
                      if (nextVal) {
                        setPublishError("");
                      }
                      return nextVal;
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-950/20 hover:bg-purple-900/30 border border-purple-500/30 text-purple-300 hover:text-white text-xs font-semibold cursor-pointer transition-colors shadow-md flex items-center gap-1.5"
                >
                  {showPublishForm ? "📂 收起发布控制台" : "➕ 发布新项目案例(视频/图)"}
                </button>
              )}
              {!isLoggedIn && (
                <span className="text-[10px] text-neutral-600 font-mono">登录后可发布新案例</span>
              )}
            </div>
          </div>

          {/* DYNAMIC CASE PUBLISHING DASHBOARD — only visible to logged-in admin */}
          {isLoggedIn && showPublishForm && (
            <div className="bg-[#0b0d12]/95 border border-purple-500/25 rounded-2xl p-5 mb-6 text-left shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-center border-b border-neutral-850 pb-3 mb-4">
                <span className="text-xs font-bold text-purple-400 font-mono flex items-center gap-1.5 animate-pulse">
                  <CloudLightning className="w-4 h-4 text-purple-400" />
                  寺庙佛教设计 ✦ 灵动新案例发布控制台
                </span>
                <button 
                  type="button"
                  onClick={() => setShowPublishForm(false)}
                  className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors font-mono cursor-pointer"
                >
                  [收起面板 ×]
                </button>
              </div>

              {/* Error warning display */}
              {publishError && (
                <div className="bg-red-500/15 border border-red-500/25 text-red-400 rounded-xl px-4 py-2.5 text-xs font-mono mb-4">
                  ⚠️ 错误: {publishError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                
                {/* Left side: upload controls */}
                <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-3">
                  <span className="text-xs font-bold text-neutral-400 font-mono">1. 选择媒体种类及注入源</span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPubMediaType("video")}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        pubMediaType === "video" 
                          ? "bg-purple-950/20 border-purple-500 text-purple-300" 
                          : "bg-neutral-950 border-neutral-850 text-neutral-400 hover:text-neutral-300"
                      }`}
                    >
                      🎥 实景流光视频
                    </button>
                    <button
                      type="button"
                      onClick={() => setPubMediaType("image")}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        pubMediaType === "image" 
                          ? "bg-cyan-950/20 border-cyan-500 text-cyan-300" 
                          : "bg-neutral-950 border-neutral-850 text-neutral-400 hover:text-neutral-300"
                      }`}
                    >
                      🖼️ 高清实际效果图
                    </button>
                  </div>

                  {/* Input uploader fields */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <label className="relative overflow-hidden flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-neutral-950 border border-neutral-850 hover:border-purple-500/40 text-[11px] text-neutral-300 font-semibold cursor-pointer text-center transition-colors">
                      <Video className="w-4 h-4 text-neutral-400 group-hover:text-purple-400" />
                      <span>📁 选择本地视频</span>
                      <span className="text-[8px] text-neutral-600 font-mono">150MB内</span>
                      <input 
                        type="file" 
                        accept="video/*"
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                        onChange={handlePubVideoChange}
                      />
                    </label>

                    <label className="relative overflow-hidden flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-neutral-950 border border-neutral-850 hover:border-cyan-500/40 text-[11px] text-neutral-300 font-semibold cursor-pointer text-center transition-colors">
                      <Image className="w-4 h-4 text-neutral-400 group-hover:text-cyan-400" />
                      <span>📁 选择本地图片</span>
                      <span className="text-[8px] text-neutral-600 font-mono">30MB内</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                        onChange={handlePubImageChange}
                      />
                    </label>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] text-neutral-500 font-mono">或填入案例在线播放/展示链接：</span>
                    <input
                      type="url"
                      placeholder={pubMediaType === "video" ? "填入在线 MP4 / WebM 直链地址" : "填入在线图像直链地址"}
                      value={pubUrl}
                      onChange={(e) => {
                        setPubUrl(e.target.value);
                        setPublishError("");
                      }}
                      className="bg-neutral-950 border border-neutral-850 rounded-xl px-3 py-2 text-xs text-neutral-200 outline-none focus:border-purple-500/50 font-mono placeholder-neutral-700"
                    />
                  </div>

                  {pubFileName && (
                    <p className="text-[10px] text-emerald-400 font-mono bg-emerald-500/5 px-2.5 py-1 rounded border border-emerald-500/10 truncate">
                      📎 已关联本地文件: {pubFileName}
                    </p>
                  )}
                </div>

                {/* Right side: details input */}
                <div className="md:col-span-12 lg:col-span-7 flex flex-col gap-3">
                  <span className="text-xs font-bold text-neutral-400 font-mono">2. 填入案例展示参数与物理数据</span>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-neutral-500 font-mono">展现标题 (Case Title)</span>
                      <input
                        type="text"
                        placeholder="例：《流光溢彩》新媒体立面"
                        value={pubTitle}
                        onChange={(e) => setPubTitle(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 rounded-xl px-3 py-2 text-xs text-neutral-100 outline-none focus:border-purple-500/50 placeholder-neutral-700"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-neutral-500 font-mono">落座地标空间 (Location)</span>
                      <input
                        type="text"
                        placeholder="例：中国广州 · 滨区智汇谷"
                        value={pubLocation}
                        onChange={(e) => setPubLocation(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 rounded-xl px-3 py-2 text-xs text-neutral-100 outline-none focus:border-purple-500/50 placeholder-neutral-700"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-neutral-500 font-mono">创意技术描述、亮化手段说明 (Project Notes)</span>
                    <textarea
                      rows={2.5}
                      placeholder="描述本段视频亮化、控光手法，提供专业工程、照度控制理念等。"
                      value={pubNotes}
                      onChange={(e) => setPubNotes(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 rounded-xl px-3 py-2 text-xs text-neutral-100 outline-none focus:border-purple-500/50 resize-none placeholder-neutral-700"
                    />
                  </div>

                  {/* Actions submit buttons inside publishers */}
                  <div className="flex items-center justify-end gap-3 mt-1.5 pt-3 border-t border-neutral-850">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPublishForm(false);
                        clearPubForm();
                      }}
                      className="px-4 py-2 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-300 rounded-xl text-xs font-semibold cursor-pointer border border-neutral-850 transition-all font-sans"
                    >
                      取消
                    </button>
                    <button
                      type="button"
                      onClick={handlePublishCase}
                      className="px-5 py-2 bg-gradient-to-r from-purple-650 to-indigo-600 hover:from-purple-550 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-900/15 cursor-pointer transition-all flex items-center gap-1.5 font-sans"
                    >
                      🚀 发布及上架扩展视频
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* List display shelf */}
          {extraSlots.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center border border-dashed border-neutral-800 rounded-2xl p-6 text-center gap-3 bg-neutral-950/20">
              <Film className="w-8 h-8 text-neutral-705 animate-pulse" />
              <div className="text-xs font-medium text-neutral-550 font-mono">
                当前扩充项目视频库暂无内容。请点按上方 “发布新项目案例” 控制台瞬间上架专属案例！
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {extraSlots.map((slot) => {
                const isVideo = (slot.mediaType || "video") === "video";
                return (
                  <div 
                    key={slot.id}
                    className="rounded-2xl border border-neutral-850 bg-[#0c0d12]/90 hover:border-purple-500/35 transition-all duration-300 flex flex-col overflow-hidden relative shadow-md hover:shadow-purple-950/5 text-left animate-fade-in"
                  >
                    {/* Badge */}
                    <div className="px-4 py-2 bg-neutral-900/30 border-b border-neutral-900 flex justify-between items-center text-[10px] font-mono text-neutral-450">
                      <span className="flex items-center gap-1 text-neutral-400">
                        <span className={`w-1.5 h-1.5 rounded-full ${isVideo ? "bg-purple-400" : "bg-cyan-400"} animate-pulse`} />
                        EXT CASE #{slot.id.toString().slice(-4)} {isVideo ? "🎥" : "🖼️"}
                      </span>
                      {isLoggedIn && (
                        <button
                          type="button"
                          onClick={() => handleDeleteExtraSlot(slot.id)}
                          className="text-neutral-550 hover:text-red-400 transition-colors cursor-pointer"
                          title="下架删除该案例"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Media Window */}
                    <div className="aspect-video w-full bg-[#080b0f] relative overflow-hidden flex items-center justify-center border-b border-neutral-900">
                      {isVideo ? (
                        <CustomVideoPlayer videoUrl={slot.videoUrl} slotId={slot.id} />
                      ) : (
                        <CustomImagePlayer imageUrl={slot.videoUrl} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col justify-between flex-1 gap-2.5 text-left">
                      <div>
                        <h4 className="text-sm font-bold text-neutral-200 line-clamp-1">{slot.title}</h4>
                        <p className="text-xs text-purple-400/90 font-mono mt-1 flex items-center gap-1">
                          <Globe className="w-3 h-3 shrink-0 text-purple-400" />
                          {slot.location}
                        </p>
                        <p className="text-[11px] text-neutral-500 leading-relaxed font-sans mt-2 line-clamp-2">
                          {slot.notes}
                        </p>
                      </div>

                      <div className="border-t border-neutral-900/60 pt-2 flex justify-between items-center text-[9px] font-mono text-neutral-600">
                        <span>{isVideo ? "1080P COMPLETED FLOW" : "EXTENDED HIGH-RES PLOT"}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] border uppercase ${isVideo ? "bg-purple-950/30 border-purple-800/30 text-purple-400" : "bg-cyan-950/30 border-cyan-800/30 text-cyan-400"}`}>
                          {isVideo ? "EXT-Live" : "EXT-True"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
