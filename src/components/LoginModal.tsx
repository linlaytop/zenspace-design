import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, X, Eye, EyeOff, User, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 模拟网络延迟
    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        setUsername("");
        setPassword("");
        setShowReset(false);
        onClose();
      } else {
        setError("用户名或密码错误，请重试。");
        setShowReset(true);
      }
      setLoading(false);
    }, 500);
  };

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md bg-[#1a1310] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 顶部装饰条 */}
            <div className="h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-400" />

            {/* 关闭按钮 */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors z-10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 sm:p-8">
              {/* 图标和标题 */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border border-yellow-500/30 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-7 h-7 text-yellow-400" />
                </div>
                <h2 className="text-xl font-bold text-neutral-100">管理员登录</h2>
                <p className="text-xs text-neutral-500 mt-1 font-mono">
                  ADMIN AUTHENTICATION REQUIRED
                </p>
              </div>

              {/* 登录表单 */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* 用户名 */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-neutral-400 font-mono flex items-center gap-1.5">
                    <User className="w-3 h-3 text-yellow-500" />
                    用户名 / Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="请输入管理员用户名"
                      className="w-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-yellow-500/50 rounded-xl px-4 py-2.5 text-sm text-neutral-100 outline-none placeholder-neutral-700 transition-colors"
                      autoFocus
                    />
                  </div>
                </div>

                {/* 密码 */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-neutral-400 font-mono flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-yellow-500" />
                    密码 / Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="请输入管理员密码"
                      className="w-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-yellow-500/50 rounded-xl px-4 py-2.5 pr-11 text-sm text-neutral-100 outline-none placeholder-neutral-700 transition-colors font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer p-0.5"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* 错误提示 */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/25 text-red-400 rounded-xl px-4 py-2.5 text-xs font-mono flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                      {error}
                    </div>
                    {showReset && (
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.removeItem("lumos_admin_password");
                          setError("");
                          setShowReset(false);
                          alert("密码已重置为默认密码，请使用默认密码登录。");
                        }}
                        className="self-start text-[10px] text-yellow-500 hover:text-yellow-400 underline underline-offset-2 transition-colors cursor-pointer"
                      >
                        忘记密码？点击重置
                      </button>
                    )}
                  </motion.div>
                )}

                {/* 登录按钮 */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    loading
                      ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-neutral-950 shadow-lg shadow-yellow-500/20"
                  }`}
                >
                  {loading ? "验证中..." : "登  录"}
                </button>
              </form>

              {/* 默认账号提示（仅开发环境显示） */}
              <div className="mt-5 p-3 rounded-xl bg-neutral-950/60 border border-dashed border-neutral-800">
                <p className="text-[9px] text-neutral-600 font-mono leading-relaxed">
                  💡 默认管理员账号：<span className="text-neutral-500">admin</span>（密码请咨询管理员获取）
                  <br />
                  登录后可管理视频案例、联系方式等内容。
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
