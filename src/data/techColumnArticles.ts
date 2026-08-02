// 技术专栏文章数据结构
export interface TechArticle {
  id: string;
  title: string;
  summary: string;
  coverImage: string; // 封面图URL
  content: ArticleContentBlock[]; // 结构化内容块
  tags: string[];
  readTime: string;
  publishDate: string;
  author: string;
}

// 内容块类型
export interface ArticleContentBlock {
  type: 'text' | 'image' | 'heading' | 'list' | 'quote' | 'code';
  content: string;
  imageUrl?: string;
  imageCaption?: string;
  level?: number; // 用于heading: 1-3
}

export const TECH_COLUMN_ARTICLES: TechArticle[] = [
  {
    id: "ancient-building-lighting-guide",
    title: "古建照明设计完整指南：从勘测到验收",
    summary: "详细介绍古建照明设计的完整流程，包括前期勘测、方案设计、灯具选型、施工安装及验收标准。适合业主和设计师参考。",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=500&fit=crop",
    author: "光影大师技术团队",
    content: [
      {
        type: "heading",
        content: "前言",
        level: 2
      },
      {
        type: "text",
        content: "古建筑是历史的见证，而照明设计则是让这些历史建筑在夜晚&quot;活&quot;起来的魔法。然而，古建照明设计并非简单的&quot;照亮&quot;，它需要在<strong>文物保护</strong>与<strong>夜景效果</strong>之间找到精妙的平衡。"
      },
      {
        type: "text",
        content: "本文将从实战角度出发，为业主和设计师提供一份完整的古建照明设计指南。"
      },
      {
        type: "image",
        content: "古建照明效果图示例",
        imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&h=600&fit=crop",
        imageCaption: "图1：某古建照明项目实景（来源：Unsplash）"
      },
      {
        type: "heading",
        content: "一、前期勘测（最关键的一步）",
        level: 2
      },
      {
        type: "heading",
        content: "1.1 建筑历史价值评估",
        level: 3
      },
      {
        type: "text",
        content: "<strong>为什么要评估？</strong>"
      },
      {
        type: "list",
        content: "确定建筑的文物保护等级（国家级/省级/市级）\n不同保护等级对应不同的照明设计限制\n避免因设计不当造成不可逆的文物损害"
      },
      {
        type: "text",
        content: "<strong>评估内容：</strong>"
      },
      {
        type: "list",
        content: "📋 查阅建筑档案（建造年代、历史背景、保护等级）\n📸 拍摄建筑现状照片（记录破损、老化情况）\n🔍 咨询文物专家意见（确定可干预程度）"
      },
      {
        type: "quote",
        content: "古建照明设计的第一原则：文物保护优先于夜景效果。任何设计都不能以牺牲文物安全为代价。"
      },
      {
        type: "heading",
        content: "二、方案设计核心原则",
        level: 2
      },
      {
        type: "heading",
        content: "2.1 &quot;见光不见灯&quot;原则",
        level: 3
      },
      {
        type: "text",
        content: "<strong>含义：</strong>观众看到的是灯光效果，而不是灯具本身。"
      },
      {
        type: "text",
        content: "<strong>实现方法：</strong>"
      },
      {
        type: "list",
        content: "✅ 使用<strong>隐藏式安装</strong>（灯具嵌入建筑结构、地面、周边景观）\n✅ 利用<strong>间接照明</strong>（洗墙、泛光、反射）\n❌ 避免直接使用<strong>裸露的点光源</strong>（会造成光污染和眩光）"
      }
    ],
    tags: ["古建照明", "设计指南", "文物保护"],
    readTime: "15 分钟",
    publishDate: "2026-06-15"
  },
  {
    id: "resort-lighting-design-trends",
    title: "文旅夜游策划趋势：2026年最值得关注的5个方向",
    summary: "文旅夜游已成为景区引流的核心手段。本文分析2026年文旅夜游策划的5大趋势，帮助景区业主把握未来方向。",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
    author: "光影大师策划团队",
    content: [
      {
        type: "heading",
        content: "引言",
        level: 2
      },
      {
        type: "text",
        content: "随着&quot;夜间经济&quot;的兴起，文旅夜游已成为景区、主题公园、古镇古城引流的<strong>核心手段</strong>。"
      },
      {
        type: "text",
        content: "根据文化和旅游部数据，2025年夜间旅游人次已占总旅游人次的<strong>42%</strong>，夜间旅游收入占比超过<strong>55%</strong>。"
      },
      {
        type: "image",
        content: "文旅夜游灯光秀",
        imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=600&fit=crop",
        imageCaption: "图1：文旅夜游灯光秀实景（来源：Unsplash）"
      },
      {
        type: "heading",
        content: "趋势一：沉浸式叙事体验",
        level: 2
      },
      {
        type: "text",
        content: "传统夜游只有灯光，没有故事。新一代夜游让游客&quot;走入&quot;一个故事，而不是&quot;观看&quot;一场灯展。"
      },
      {
        type: "quote",
        content: "让游客从&quot;旁观者&quot;变成&quot;参与者&quot;，是文旅夜游策划的核心转变。"
      }
    ],
    tags: ["文旅夜游", "行业趋势", "策划指南"],
    readTime: "12 分钟",
    publishDate: "2026-06-10"
  }
];
