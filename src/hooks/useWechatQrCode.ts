import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "lumos_wechat_qrcode";
const MAX_DIMENSION = 512; // 二维码无需原图尺寸，压缩到 512px 足够扫描
const JPEG_QUALITY = 0.9;

type Listener = (value: string | null) => void;

// 模块级共享存储：保证 App.tsx 与 ShowcaseGallery.tsx 两处二维码状态始终一致
let current: string | null = (() => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
})();

const listeners = new Set<Listener>();

function emit(value: string | null) {
  current = value;
  listeners.forEach((l) => {
    try {
      l(value);
    } catch {
      /* 忽略单个监听器异常 */
    }
  });
}

/** 将图片压缩为较小的 base64，避免超出 localStorage 配额导致保存失败 */
function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("读取文件失败"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("图片解析失败"));
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          const scale = MAX_DIMENSION / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("浏览器不支持画布"));
          return;
        }
        // 白底，避免透明背景在 JPEG 下变黑
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function useWechatQrCode() {
  const [qr, setQr] = useState<string | null>(current);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const listener: Listener = (v) => setQr(v);
    listeners.add(listener);
    setQr(current); // 同步最新值
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const uploadQr = useCallback(async (file?: File | null) => {
    setError(null);
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      const msg = "二维码图片不能超过 5MB，请压缩后再上传";
      setError(msg);
      alert(msg);
      return;
    }
    try {
      const dataUrl = await compressImage(file);
      // 安全写入：捕获配额超限等异常，避免静默保存失败
      localStorage.setItem(STORAGE_KEY, dataUrl);
      emit(dataUrl);
    } catch (e) {
      const msg = "二维码保存失败，请重试或更换图片";
      setError(msg);
      alert(msg + (e instanceof Error ? "：" + e.message : ""));
    }
  }, []);

  const deleteQr = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* 忽略 */
    }
    emit(null);
    setError(null);
  }, []);

  return { qr, uploadQr, deleteQr, error };
}
