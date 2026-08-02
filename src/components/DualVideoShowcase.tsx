import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Film,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Edit2,
  Trash2,
  Video,
  Image,
  X,
  Upload,
  Link,
  AlertCircle,
  Save
} from "lucide-react";

export interface DualVideoSlot {
  id: number;
  title: string;
  location: string;
  notes: string;
  mediaUrl: string;
  mediaType: "video" | "image";
  fileName?: string;
}

const DEFAULT_SLOTS: DualVideoSlot[] = [
  {
    id: 1,
    title: "《文旅光影》沉浸式夜游演艺实录",
    location: "中国张家界 · 森林景区主游路线",
    notes: "雷达交互 + 绿极光投影 + 林间雾森系统，构建全域文旅光影创新美学体系。",
    mediaUrl: "https://player.vimeo.com/external/498902517.sd.mp4?s=d07525ec900350a2ebd901c23f993f773410e309&profile_id=165&oauth2_token_id=57447761",
    mediaType: "video"
  },
  {
    id: 2,
    title: "《绿色双碳》智能控制灯光实测",
    location: "光影大师实验室 · 暗天空标准测试场",
    notes: "基于 DMX512 / Art-Net 协议，实现多时段亮度微调与低碳功率密度控制。",
    mediaUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=231175ed7494f1dd37397b9195d852cc563c6253&profile_id=139&oauth2_token_id=57447761",
    mediaType: "video"
  }
];

const STORAGE_KEY = "lumos_dual_video_showcase";

function formatTime(seconds: number) {
  if (isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function CustomVideoPlayer({ url }: { url: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsMuted(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.pause();
    }
  }, [url]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isHovered) {
      video.muted = isMuted;
      video.play().then(() => setIsPlaying(true)).catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isHovered, isMuted]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video?.requestFullscreen) return;
    video.requestFullscreen();
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="relative w-full aspect-video overflow-hidden bg-neutral-950 group/player"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={url}
        loop
        muted={isMuted}
        playsInline
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onClick={(e) => togglePlay(e)}
        className="w-full h-full object-cover cursor-pointer"
      />

      {isHovered && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-neutral-950/90 backdrop-blur border border-yellow-500/30 text-yellow-400 px-2.5 py-1 rounded-lg font-mono text-[9px] pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
          <span>悬停极速智能预演</span>
        </div>
      )}

      <div
        onClick={(e) => togglePlay(e)}
        className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 cursor-pointer ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-neutral-900/95 border border-yellow-500/25 text-yellow-400 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
        </div>
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950 via-neutral-950/95 to-transparent p-3 pt-6 pb-2.5 transition-all duration-300 flex flex-col gap-2 ${
          isHovered || !isPlaying ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={(e) => {
            const video = videoRef.current;
            if (!video) return;
            const t = Number(e.target.value);
            video.currentTime = t;
            setCurrentTime(t);
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-full accent-yellow-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${progressPercent}%, #262626 ${progressPercent}%, #262626 100%)`
          }}
        />
        <div className="flex items-center justify-between text-xs text-neutral-300 font-mono">
          <div className="flex items-center gap-3">
            <button onClick={(e) => togglePlay(e)} type="button" className="hover:text-yellow-400 transition-colors">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <span className="text-[10px] text-neutral-400">
              {formatTime(currentTime)} <span className="text-neutral-600">/</span> {formatTime(duration)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={(e) => toggleMute(e)} type="button" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
              {isMuted ? (
                <><VolumeX className="w-3.5 h-3.5 text-neutral-500" /><span className="text-[9px] text-neutral-500">Muted</span></>
              ) : (
                <><Volume2 className="w-3.5 h-3.5 text-cyan-400" /><span className="text-[9px] text-cyan-400 font-bold">Live</span></>
              )}
            </button>
            <button onClick={(e) => handleFullscreen(e)} type="button" className="hover:text-yellow-400 transition-colors" title="全屏播映">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomImagePlayer({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full aspect-video overflow-hidden bg-neutral-950 flex items-center justify-center group/img">
      <img
        src={url}
        alt="案例图片"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 hover:scale-105 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      />
      <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur border border-neutral-800 px-2 py-0.5 rounded-full select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">高阶完工大图</span>
      </div>
    </div>
  );
}

export default function DualVideoShowcase() {
  const { isLoggedIn } = useAuth();
  const [slots, setSlots] = useState<DualVideoSlot[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 2) {
          return parsed.map((item: any) => ({ ...item, mediaType: item.mediaType || "video" }));
        }
      }
    } catch (e) {
      console.error("加载双视频展示失败", e);
    }
    return DEFAULT_SLOTS;
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formMediaType, setFormMediaType] = useState<"video" | "image">("video");
  const [formError, setFormError] = useState("");
  const [formFileName, setFormFileName] = useState("");

  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
    } catch (e) {
      console.error("保存双视频展示失败", e);
    }
  }, [slots]);

  const openEdit = (slot: DualVideoSlot) => {
    setEditingId(slot.id);
    setFormTitle(slot.title);
    setFormLocation(slot.location);
    setFormNotes(slot.notes);
    setFormUrl(slot.mediaUrl);
    setFormMediaType(slot.mediaType || "video");
    setFormFileName(slot.fileName || "");
    setFormError("");
  };

  const clearForm = () => {
    setEditingId(null);
    setFormTitle("");
    setFormLocation("");
    setFormNotes("");
    setFormUrl("");
    setFormMediaType("video");
    setFormFileName("");
    setFormError("");
  };

  const handleSave = () => {
    if (!formUrl.trim()) {
      setFormError("请上传视频/图片，或填写在线素材地址。");
      return;
    }
    if (!formTitle.trim()) {
      setFormError("请输入案例标题。");
      return;
    }

    setSlots(prev => prev.map(s =>
      s.id === editingId
        ? {
            ...s,
            title: formTitle.trim(),
            location: formLocation.trim() || "项目地标",
            notes: formNotes.trim() || "光影大师高定灯光设计案例。",
            mediaUrl: formUrl.trim(),
            mediaType: formMediaType,
            fileName: formFileName || undefined
          }
        : s
    ));
    clearForm();
  };

  const handleDelete = (slot: DualVideoSlot, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`确定清空「${slot.title || "未命名案例"}」的内容吗？`)) return;
    setSlots(prev => prev.map(s =>
      s.id === slot.id
        ? { id: s.id, title: "", location: "", notes: "", mediaUrl: "", mediaType: "video" }
        : s
    ));
    if (editingId === slot.id) clearForm();
  };

  const handleReset = () => {
    if (!confirm("确定恢复 2 个系统默认案例吗？当前上传的内容将被覆盖。")) return;
    setSlots(DEFAULT_SLOTS);
    clearForm();
  };

  const handleFileSelect = (file: File, type: "video" | "image") => {
    const maxSize = type === "video" ? 150 * 1024 * 1024 : 30 * 1024 * 1024;
    if (file.size > maxSize) {
      setFormError(type === "video" ? "视频文件不能超过 150MB。" : "图片文件不能超过 30MB。");
      return;
    }
    try {
      const objUrl = URL.createObjectURL(file);
      setFormUrl(objUrl);
      setFormMediaType(type);
      setFormFileName(file.name);
      if (!formTitle) {
        const name = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
        setFormTitle(type === "video" ? `《${name}》完工实录` : `《${name}》设计效果`);
      }
      if (!formLocation) setFormLocation("项目落座地标");
      setFormError("");
    } catch (err) {
      setFormError("文件加载失败，请重试。");
    }
  };

  const renderSlot = (slot: DualVideoSlot) => {
    const isEmpty = !slot.mediaUrl && !slot.title;
    const isEditing = editingId === slot.id;

    return (
      <div key={slot.id} className="bg-neutral-900/60 border border-neutral-800/40 rounded-2xl overflow-hidden flex flex-col">
        {/* Media area */}
        <div className="relative">
          {slot.mediaUrl ? (
            slot.mediaType === "video" ? <CustomVideoPlayer url={slot.mediaUrl} /> : <CustomImagePlayer url={slot.mediaUrl} />
          ) : (
            <div className="w-full aspect-video bg-neutral-950 flex flex-col items-center justify-center gap-3 text-neutral-500">
              <Film className="w-10 h-10 opacity-40" />
              <span className="text-xs font-mono">暂无视频/图片，点击编辑上传</span>
            </div>
          )}

          {/* Admin edit/delete overlay */}
          {isLoggedIn && !isEditing && (
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => openEdit(slot)}
                className="p-2 rounded-lg bg-neutral-950/90 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 transition-colors"
                title="编辑"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => handleDelete(slot, e)}
                className="p-2 rounded-lg bg-neutral-950/90 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                title="删除"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Info area */}
        {!isEditing && (
          <div className="p-5 flex flex-col gap-2 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest text-yellow-400 uppercase">
                {slot.id === 1 ? "SELECTED CASE VIDEO / 精选案例影像" : "ENGINEERING VIDEO / 工程实测影像"}
              </span>
            </div>
            <h4 className="text-lg font-medium text-neutral-100">
              {slot.title || <span className="text-neutral-500 italic">未命名案例</span>}
            </h4>
            <p className="text-xs text-neutral-400 font-mono">{slot.location || "—"}</p>
            <p className="text-xs text-neutral-300 leading-relaxed mt-1 flex-1">
              {slot.notes || "暂无描述。"}
            </p>
          </div>
        )}

        {/* Edit form */}
        {isEditing && (
          <div className="p-5 flex flex-col gap-3 border-t border-neutral-800/60">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase">EDIT VIDEO / 编辑案例影像</span>
              <button onClick={clearForm} className="text-neutral-500 hover:text-neutral-300"><X className="w-4 h-4" /></button>
            </div>

            {formError && (
              <div className="flex items-center gap-2 text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-yellow-500/30 text-xs text-neutral-300 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" /> 上传视频
              </button>
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-yellow-500/30 text-xs text-neutral-300 transition-colors"
              >
                <Image className="w-3.5 h-3.5" /> 上传图片
              </button>
            </div>

            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file, "video");
                e.target.value = "";
              }}
            />
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file, "image");
                e.target.value = "";
              }}
            />

            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Link className="w-3.5 h-3.5" />
              <span>或填写在线地址</span>
            </div>
            <input
              type="text"
              value={formUrl}
              onChange={(e) => setFormUrl(e.target.value)}
              placeholder="https://... 视频或图片 URL"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 outline-none focus:border-yellow-500/50"
            />

            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="案例标题"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 outline-none focus:border-yellow-500/50"
            />
            <input
              type="text"
              value={formLocation}
              onChange={(e) => setFormLocation(e.target.value)}
              placeholder="项目地点"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 outline-none focus:border-yellow-500/50"
            />
            <textarea
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
              placeholder="案例描述"
              rows={2}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 outline-none focus:border-yellow-500/50 resize-none"
            />

            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-xs font-semibold hover:bg-yellow-500/30 transition-colors"
              >
                <Save className="w-3.5 h-3.5" /> 保存
              </button>
              <button
                type="button"
                onClick={clearForm}
                className="px-4 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400 text-xs hover:bg-neutral-900 transition-colors"
              >
                取消
              </button>
            </div>

            {formFileName && (
              <p className="text-[10px] text-neutral-500 font-mono">已选文件：{formFileName}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-yellow-400 uppercase">CASE STUDY MEDIA / 案例影像双屏</span>
          <h3 className="text-xl font-bold text-neutral-100 mt-1 flex items-center gap-2">
            <Video className="w-5 h-5 text-yellow-400" />
            双视频实景展示
          </h3>
        </div>
        {isLoggedIn && (
          <button
            onClick={handleReset}
            className="text-[10px] text-neutral-500 hover:text-yellow-400 font-mono flex items-center gap-1 transition-colors"
          >
            恢复默认
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slots.map(renderSlot)}
      </div>
    </div>
  );
}
