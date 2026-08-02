import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
  username: string;
  role: "admin" | "user";
  loggedInAt: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isLoggedIn: false,
  login: () => false,
  logout: () => {},
});

// 预设管理员账号
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "lumos2026";

// 简单的 token 生成（静态网站用，仅做前端校验）
function generateToken(username: string): string {
  return btoa(`${username}:${Date.now()}:lumos_secret`);
}

// UTF-8 安全的 base64 编解码（支持中文/emoji 密码，避免 btoa/atob 抛出 InvalidCharacterError）
export function encodePassword(pwd: string): string {
  const bytes = new TextEncoder().encode(pwd);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

export function decodeStoredPassword(encoded: string): string {
  try {
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    // 兼容极旧的纯 ASCII 编码数据
    try {
      return atob(encoded);
    } catch {
      return "";
    }
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 初始化时从 localStorage 恢复登录状态
  useEffect(() => {
    const saved = localStorage.getItem("lumos_auth_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as User;
        setUser(parsed);
      } catch {
        localStorage.removeItem("lumos_auth_user");
      }
    }
  }, []);

  const login = useCallback((username: string, password: string): boolean => {
    // Check if there's a custom password stored in localStorage
    let validPassword = ADMIN_PASSWORD;
    const customPwdEncoded = localStorage.getItem("lumos_admin_password");
    if (customPwdEncoded) {
      const decoded = decodeStoredPassword(customPwdEncoded);
      if (decoded) validPassword = decoded;
    }
    
    if (username === ADMIN_USERNAME && password === validPassword) {
      const newUser: User = {
        username,
        role: "admin",
        loggedInAt: new Date().toISOString(),
      };
      setUser(newUser);
      localStorage.setItem("lumos_auth_user", JSON.stringify(newUser));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("lumos_auth_user");
  }, []);

  const value: AuthContextType = {
    user,
    isAdmin: user?.role === "admin",
    isLoggedIn: user !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export { ADMIN_USERNAME, ADMIN_PASSWORD };
