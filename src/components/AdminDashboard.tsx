import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  X, LogOut, Video, Phone, Download, Upload, Trash2, ShieldCheck,
  BarChart3, Settings, Eye, EyeOff, Save, RotateCcw, BadgeCheck
} from "lucide-react";
import { useAuth, encodePassword, decodeStoredPassword } from "../context/AuthContext";
import type { VideoSlot } from "./ThreeVideoShowcase";
import IcpFilingManager from "./IcpFilingManager";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const { user, logout } = useAuth();
  const [activePanel, setActivePanel] = useState<"overview" | "videos" | "contacts" | "settings" | "filing">("overview");
  const [videos, setVideos] = useState<VideoSlot[]>([]);
  const [extraVideos, setExtraVideos] = useState<VideoSlot[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 加载数据
  const loadData = () => {
    // 加载主视频槽位
    const saved = localStorage.getItem("lumos_three_video_slots");
    if (saved) {
      try { setVideos(JSON.parse(saved)); } catch {}
    }
    // 加载扩展视频
    const savedExtra = localStorage.getItem("lumos_extra_video_slots");
    if (savedExtra) {
      try { setExtraVideos(JSON.parse(savedExtra)); } catch {}
    }
    // 加载联系方式
    const savedContacts = localStorage.getItem("lumos_contacts_v2");
    if (savedContacts) {
      try { setContacts(JSON.parse(savedContacts)); } catch {}
    }
  };

  useEffect(() => {
    if (isOpen) loadData();
  }, [isOpen]);

  // 删除视频案例
  const handleDeleteVideo = (id: number, isExtra: boolean) => {
    if (!confirm("确定要删除这个视频案例吗？")) return;
    if (isExtra) {
      const updated = extraVideos.filter(v => v.id !== id);
      setExtraVideos(updated);
      localStorage.setItem("lumos_extra_video_slots", JSON.stringify(updated));
    } else {
      const updated = videos.map(v => v.id === id ? {
        ...v, title: "", location: "", notes: "", videoUrl: "", mediaType: "video" as const
      } : v);
      setVideos(updated);
      localStorage.setItem("lumos_three_video_slots", JSON.stringify(updated));
    }
  };

  // 重置为默认数据
  const handleResetData = (type: string) => {
    if (!confirm(`确定要恢复默认的${type}数据吗？这将清除所有自定义内容。`)) return;
    if (type === "视频案例") {
      localStorage.removeItem("lumos_three_video_slots");
      localStorage.removeItem("lumos_extra_video_slots");
      loadData();
    } else if (type === "联系方式") {
      localStorage.removeItem("lumos_contacts_v2");
      loadData();
    }
  };

  // 导出数据
  const handleExportData = () => {
    const data = {
      videos: localStorage.getItem("lumos_three_video_slots"),
      extraVideos: localStorage.getItem("lumos_extra_video_slots"),
      contacts: localStorage.getItem("lumos_contacts_v2"),
      exportTime: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lumos_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 导入数据
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (data.videos) localStorage.setItem("lumos_three_video_slots", data.videos);
        if (data.extraVideos) localStorage.setItem("lumos_extra_video_slots", data.extraVideos);
        if (data.contacts) localStorage.setItem("lumos_contacts_v2", data.contacts);
        loadData();
        alert("数据导入成功！");
      } catch {
        alert("导入失败，文件格式不正确。");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-stretch justify-end p-0"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-2xl bg-[#0a0e14] border-l border-neutral-800 shadow-2xl h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部导航 */}
        <div className="sticky top-0 z-10 bg-[#0a0e14]/95 backdrop-blur-md border-b border-neutral-900 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-neutral-950" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-100">后台管理</h2>
              <p className="text-[10px] text-neutral-500 font-mono">
                管理员：{user?.username} · {new Date(user?.loggedInAt || "").toLocaleString("zh-CN")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              退出登录
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 侧边栏导航 */}
        <div className="flex border-b border-neutral-900">
          {[
            { key: "overview", label: "总览", icon: BarChart3 },
            { key: "videos", label: "视频管理", icon: Video },
            { key: "contacts", label: "联系管理", icon: Phone },
            { key: "filing", label: "备案管理", icon: BadgeCheck },
            { key: "settings", label: "系统设置", icon: Settings },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActivePanel(key as any)}
              className={`flex-1 px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                activePanel === key
                  ? "border-yellow-500 text-yellow-400 bg-yellow-500/5"
                  : "border-transparent text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* 总览面板 */}
          {activePanel === "overview" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <h3 className="text-sm font-bold text-neutral-300">数据总览</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "主视频案例", value: videos.filter(v => v.videoUrl).length, total: 3, color: "yellow" },
                  { label: "扩展视频案例", value: extraVideos.length, total: extraVideos.length, color: "purple" },
                  { label: "联系方式", value: contacts.length, total: contacts.length, color: "cyan" },
                  { label: "登录状态", value: "已登录", total: "", color: "emerald" },
                ].map(({ label, value, total, color }) => (
                  <div key={label} className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900">
                    <p className="text-[10px] text-neutral-500 font-mono mb-1">{label}</p>
                    <p className={`text-lg font-bold text-${color}-400`}>{value} <span className="text-xs text-neutral-600">{total && `/ ${total}`}</span></p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <h4 className="text-xs font-bold text-neutral-400">快速操作</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleExportData}
                    className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 hover:border-emerald-500/30 text-xs text-neutral-300 hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    导出数据备份
                  </button>
                  <label className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 hover:border-cyan-500/30 text-xs text-neutral-300 hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    导入数据备份
                    <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* 视频管理面板 */}
          {activePanel === "videos" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-300">视频案例管理</h3>
                <button
                  onClick={() => handleResetData("视频案例")}
                  className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-red-500/30 text-[10px] text-neutral-500 hover:text-red-400 cursor-pointer transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  恢复默认
                </button>
              </div>

              {/* 主视频槽位 */}
              <div>
                <p className="text-[10px] text-neutral-500 font-mono mb-3">主展示舱（3个）</p>
                <div className="flex flex-col gap-3">
                  {videos.map((v) => (
                    <div key={v.id} className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-900 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-neutral-900 flex items-center justify-center shrink-0">
                        {v.mediaType === "video" ? (
                          <Video className="w-5 h-5 text-yellow-500" />
                        ) : (
                          <Eye className="w-5 h-5 text-cyan-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-neutral-200 font-medium truncate">{v.title || "（空）"}</p>
                        <p className="text-[10px] text-neutral-500 truncate">{v.location || "—"}</p>
                      </div>
                      {v.videoUrl && (
                        <button
                          onClick={() => handleDeleteVideo(v.id, false)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer shrink-0"
                          title="清空此案例"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 扩展视频 */}
              <div>
                <p className="text-[10px] text-neutral-500 font-mono mb-3">扩展案例库（{extraVideos.length} 个）</p>
                <div className="flex flex-col gap-3">
                  {extraVideos.length === 0 ? (
                    <p className="text-xs text-neutral-600 text-center py-6">暂无扩展视频案例</p>
                  ) : (
                    extraVideos.map((v) => (
                      <div key={v.id} className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-900 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-neutral-900 flex items-center justify-center shrink-0">
                          {v.mediaType === "video" ? (
                            <Video className="w-5 h-5 text-purple-500" />
                          ) : (
                            <Eye className="w-5 h-5 text-cyan-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-neutral-200 font-medium truncate">{v.title}</p>
                          <p className="text-[10px] text-neutral-500 truncate">{v.location}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteVideo(v.id, true)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* 联系管理面板 */}
          {activePanel === "contacts" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-300">联系方式管理</h3>
                <button
                  onClick={() => handleResetData("联系方式")}
                  className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-red-500/30 text-[10px] text-neutral-500 hover:text-red-400 cursor-pointer transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  恢复默认
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {contacts.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-900 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center shrink-0">
                      {c.type === "channel" && <Video className="w-4 h-4 text-pink-400" />}
                      {c.type === "wechat" && <Phone className="w-4 h-4 text-emerald-400" />}
                      {c.type === "phone" && <Phone className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-neutral-500">{c.label}</p>
                      <p className="text-xs text-neutral-200 font-medium truncate">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 系统设置面板 */}
          {activePanel === "settings" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <h3 className="text-sm font-bold text-neutral-300">系统设置</h3>

              {/* 修改密码 */}
              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900">
                <h4 className="text-xs font-bold text-neutral-300 mb-3 flex items-center gap-2">
                  <Settings className="w-3.5 h-3.5 text-yellow-500" />
                  修改管理员密码
                </h4>
                <div className="flex flex-col gap-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => { setCurrentPassword(e.target.value); setPasswordMsg(""); }}
                    placeholder="输入当前密码"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 outline-none focus:border-yellow-500/50 placeholder-neutral-700"
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); setPasswordMsg(""); }}
                      placeholder="输入新密码（至少6位，支持中文）"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 outline-none focus:border-yellow-500/50 placeholder-neutral-700 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setPasswordMsg(""); }}
                    placeholder="确认新密码"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 outline-none focus:border-yellow-500/50 placeholder-neutral-700"
                  />
                  {passwordMsg && (
                    <p className={`text-[10px] ${passwordMsg.includes("成功") ? "text-emerald-400" : "text-red-400"}`}>
                      {passwordMsg}
                    </p>
                  )}
                  <button
                    onClick={() => {
                      // 校验当前密码是否正确
                      const stored = localStorage.getItem("lumos_admin_password");
                      const currentValid = stored ? decodeStoredPassword(stored) : "lumos2026";
                      if (currentPassword !== currentValid) {
                        setPasswordMsg("当前密码错误");
                        return;
                      }
                      if (newPassword.length < 6) {
                        setPasswordMsg("密码长度至少6位");
                        return;
                      }
                      if (newPassword !== confirmPassword) {
                        setPasswordMsg("两次密码不一致");
                        return;
                      }
                      // UTF-8 安全编码后存入 localStorage（兼容中文/emoji 密码）
                      localStorage.setItem("lumos_admin_password", encodePassword(newPassword));
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                      setPasswordMsg("密码修改成功！下次登录请使用新密码。");
                    }}
                    className="self-start px-4 py-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    保存新密码
                  </button>
                </div>
              </div>

              {/* 数据管理 */}
              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900">
                <h4 className="text-xs font-bold text-neutral-300 mb-3">数据管理</h4>
                <div className="flex flex-col gap-3">
                  <p className="text-[10px] text-neutral-500 leading-relaxed">
                    所有网站内容数据均存储于浏览器本地（localStorage）。清除浏览器数据会导致内容丢失，建议定期导出备份。
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleExportData}
                      className="px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      导出备份
                    </button>
                    <label className="px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      导入备份
                      <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ICP 备案管理面板 */}
          {activePanel === "filing" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <IcpFilingManager />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
