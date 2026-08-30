import React, { useState, useEffect } from "react";
import {
  Upload, Trash2, Save, Image as ImageIcon, ShieldCheck,
  ExternalLink, RotateCcw, AlertTriangle, BadgeCheck
} from "lucide-react";

export interface IcpFiling {
  image: string;        // base64 备案图标 / 证书图片
  icpNumber: string;    // 工信部 ICP 备案号
  icpUrl: string;       // 工信部备案查询链接
  policeNumber: string; // 公安备案号（网安备）
  policeUrl: string;    // 公安备案链接
}

export const ICP_STORAGE_KEY = "lumos_icp_filing";

const DEFAULT_FILING: IcpFiling = {
  image: "",
  icpNumber: "",
  icpUrl: "https://beian.miit.gov.cn",
  policeNumber: "",
  policeUrl: "https://www.beian.gov.cn/portal/registerSystemInfo?recordcode="
};

/**
 * 后台 ICP 备案管理面板
 * - 上传备案图标 / 证书图片（公安备案盾牌图标、工信部备案证书截图等）
 * - 填写 ICP 备案号、公安备案号及对应查询链接
 * - 实时预览前台（footer）展示效果
 * - 保存后通过 window 事件通知首页 footer 同步刷新
 */
export default function IcpFilingManager() {
  const [filing, setFiling] = useState<IcpFiling>(DEFAULT_FILING);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [msg, setMsg] = useState("");
  const [warn, setWarn] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(ICP_STORAGE_KEY);
    if (saved) {
      try {
        const p = JSON.parse(saved);
        setFiling({ ...DEFAULT_FILING, ...p });
        setImagePreview(p.image || "");
      } catch { /* ignore */ }
    }
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setWarn("请上传图片文件（PNG / JPG / SVG）");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setWarn("图片超过 2MB，建议压缩后再上传（公安备案盾牌图标通常 < 5KB）");
    } else {
      setWarn("");
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setFiling(prev => ({ ...prev, image: dataUrl }));
      setImagePreview(dataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const update = (key: keyof IcpFiling, val: string) =>
    setFiling(prev => ({ ...prev, [key]: val }));

  const handleSave = () => {
    localStorage.setItem(ICP_STORAGE_KEY, JSON.stringify(filing));
    window.dispatchEvent(new Event("zenspace:filing-changed"));
    setMsg("ICP 备案信息已保存，前台底部已同步展示！");
    setTimeout(() => setMsg(""), 2800);
  };

  const handleReset = () => {
    if (!confirm("确定清空 ICP 备案信息吗？清空后前台将不再显示备案号。")) return;
    localStorage.removeItem(ICP_STORAGE_KEY);
    setFiling(DEFAULT_FILING);
    setImagePreview("");
    window.dispatchEvent(new Event("zenspace:filing-changed"));
    setMsg("已清空备案信息");
    setTimeout(() => setMsg(""), 2800);
  };

  const isConfigured = !!(filing.icpNumber || filing.policeNumber || filing.image);

  return (
    <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-300 flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-yellow-400" />
            ICP 备案管理
          </h3>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-red-500/30 text-[10px] text-neutral-500 hover:text-red-400 cursor-pointer transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            清空备案
          </button>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900 flex flex-col gap-4">
          {/* 备案图片上传 */}
          <div>
            <p className="text-[10px] text-neutral-500 font-mono mb-2">备案图标 / 证书图片</p>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl border border-dashed border-neutral-800 bg-neutral-900 flex items-center justify-center overflow-hidden shrink-0">
                {imagePreview ? (
                  <img src={imagePreview} alt="备案图片" className="w-full h-full object-contain" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-neutral-600" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="px-3 py-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-medium cursor-pointer flex items-center gap-1.5 w-fit">
                  <Upload className="w-3.5 h-3.5" />
                  上传备案图片
                  <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                </label>
                {imagePreview && (
                  <button
                    onClick={() => { update("image", ""); setImagePreview(""); }}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-[10px] cursor-pointer flex items-center gap-1 w-fit"
                  >
                    <Trash2 className="w-3 h-3" />
                    移除图片
                  </button>
                )}
              </div>
            </div>
            {warn && (
              <p className="text-[10px] text-amber-400 mt-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {warn}
              </p>
            )}
          </div>

          {/* ICP 备案号 */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-neutral-500 font-mono">ICP 备案号（工信部）</label>
            <input
              value={filing.icpNumber}
              onChange={(e) => update("icpNumber", e.target.value)}
              placeholder="如：京ICP备2026000000号-1"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 outline-none focus:border-yellow-500/50 placeholder-neutral-700"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-neutral-500 font-mono">工信部备案查询链接</label>
            <input
              value={filing.icpUrl}
              onChange={(e) => update("icpUrl", e.target.value)}
              placeholder="https://beian.miit.gov.cn"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 outline-none focus:border-yellow-500/50 placeholder-neutral-700"
            />
          </div>

          {/* 公安备案号 */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-neutral-500 font-mono">公安备案号（网安备）</label>
            <input
              value={filing.policeNumber}
              onChange={(e) => update("policeNumber", e.target.value)}
              placeholder="如：京公网安备11000000000000号"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 outline-none focus:border-yellow-500/50 placeholder-neutral-700"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-neutral-500 font-mono">公安备案链接</label>
            <input
              value={filing.policeUrl}
              onChange={(e) => update("policeUrl", e.target.value)}
              placeholder="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode="
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 outline-none focus:border-yellow-500/50 placeholder-neutral-700"
            />
          </div>

          <button
            onClick={handleSave}
            className="self-start px-4 py-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            保存备案信息
          </button>
          {msg && <p className="text-[10px] text-emerald-400">{msg}</p>}
        </div>

        {/* 前台展示预览（footer 同款） */}
        <div className="p-4 rounded-xl bg-neutral-950/40 border border-neutral-800">
          <p className="text-[10px] text-neutral-500 font-mono mb-3">前台展示预览（网站底部 footer）</p>
          {isConfigured ? (
            <div className="flex flex-wrap items-center gap-3 text-[10px] text-neutral-500">
              {imagePreview && <img src={imagePreview} alt="备案" className="h-5 w-auto" />}
              {filing.icpNumber && (
                <a href={filing.icpUrl} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" />
                  {filing.icpNumber}
                </a>
              )}
              {filing.policeNumber && (
                <a href={filing.policeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {filing.policeNumber}
                </a>
              )}
            </div>
          ) : (
            <p className="text-xs text-neutral-600 text-center py-4">尚未配置备案信息，前台不显示备案号</p>
          )}
        </div>
      </div>
  );
}
