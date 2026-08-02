import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Lazy-initialized Gemini client instance
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured in the Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API endpoint for smart lighting architectural consultant
app.post("/api/consult", async (req, res) => {
  try {
    const { spaceType, materials, heights, style, customRequirements } = req.body;

    if (!spaceType) {
      return res.status(400).json({ error: "spaceType is required." });
    }

    const ai = getAiClient();

    const prompt = `你是一位享誉国际的资深高级户外建筑灯光设计大师。请根据以下项目细节，设计一套令人叹为观止的时尚、现代、高端的户外灯光策划方案。
目标空间类型: ${spaceType}
主要表面材质: ${materials || "未指定（默认使用高雅建材）"}
建筑或空间规模/高度: ${heights || "常规高定规模"}
整体期望风格或光影格调: ${style || "奢华而克制，现代极简"}
其他特色要求: ${customRequirements || "无特定。必须强调整体时尚度，突出建筑形体与夜间阴影的艺术对比。"}

请发挥灯光艺术理论（明暗比、色温微差对比、光影虚实、洗墙与掠射、月光效果重塑等），设计一个定制化、具有强烈视觉表现力和可落地的灯光大纲方案。`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "你是一个专业的户外灯光设计专家。你的回答需要严格遵守给定的JSON schema格式，严禁带有杂乱的说明文字，必须是纯粹合规的JSON数据。",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "设计方案名称/创意主题（例如：'璀璨流光'、'竹风竹韵'）" },
            concept: { type: Type.STRING, description: "设计思想核心阐述。用充满艺术张力的文字描述（2-3句话，体现明暗变化和美学）" },
            colorTemperature: { type: Type.STRING, description: "推荐采用的色温组合体系，例如 '2700K 琥珀黄为主调，搭配4000K月光白进行点缀立体化'" },
            illuminanceRating: { type: Type.STRING, description: "推荐的照度层级、主次照明对比度规划，防光污染规划说明" },
            fixtures: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "建议采用的高级灯具类型名称（如：高防眩埋地投光灯、线型精密洗墙灯、超窄角激光投射灯）" },
                  purpose: { type: Type.STRING, description: "该灯具的布灯位置和实现的目的效果描述" },
                  power: { type: Type.STRING, description: "典型功率方案（如 12W, 24W, 36W等）" },
                  qty: { type: Type.STRING, description: "建议配比描述或预估密度（如 每2米1套，或 核心立面节点16套）" }
                }
              }
            },
            controlSystem: { type: Type.STRING, description: "智能控制系统时间节律设置（包含平日模式、节日模式、深夜深夜节能暗化模式）" },
            ecologyProtection: { type: Type.STRING, description: "生态友好与野生鸟类、动植物保护措施，防眩光（Glare-Control）工程学设计描述" }
          },
          required: ["title", "concept", "colorTemperature", "fixtures", "controlSystem", "ecologyProtection"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("模型未返回任何响应内容");
    }

    // Attempt to parse to double check
    const designPlan = JSON.parse(resultText);
    res.json({ success: true, plan: designPlan });

  } catch (error: any) {
    console.error("Gemini 咨询报错:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message || "由于配置缺失或内部错误导致分析失败。"
    });
  }
});



// Server-side permanent storage path for hosted project blueprints
import fs from "fs";
const SAVE_PATH = path.join(process.cwd(), "project_save.json");

// Endpoint to save current project blueprint on the hosted server
app.post("/api/save-project", (req, res) => {
  try {
    const payload = req.body;
    if (!payload) {
      return res.status(400).json({ success: false, error: "Empty project payload" });
    }

    fs.writeFileSync(SAVE_PATH, JSON.stringify(payload, null, 2), "utf-8");
    console.log(`[Storage] Project blueprint stored successfully at ${SAVE_PATH}`);
    res.json({ success: true, message: "方案已成功托管并发布至宿主服务器！" });
  } catch (err: any) {
    console.error("Error saving project blueprint:", err);
    res.status(500).json({ success: false, error: err.message || "保存至服务器端失败" });
  }
});

// Endpoint to query and retrieve hosted project blueprint
app.get("/api/load-project", (req, res) => {
  try {
    if (fs.existsSync(SAVE_PATH)) {
      const dataStr = fs.readFileSync(SAVE_PATH, "utf-8");
      const data = JSON.parse(dataStr);
      return res.json({ success: true, data });
    }
    // Return null if no blueprint is saved yet
    res.json({ success: true, data: null });
  } catch (err: any) {
    console.error("Error reading project blueprint:", err);
    res.status(500).json({ success: false, error: err.message || "加载服务器端方案失败" });
  }
});

// Configure Vite integration
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Live lighting dashboard running at http://localhost:${PORT}`);
  });
};

startServer();
