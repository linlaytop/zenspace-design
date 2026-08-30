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
    id: "temple-architecture-design-guide",
    title: "寺庙建筑设计完整指南：从形制法度到落地施工",
    summary: "系统梳理寺庙建筑设计的完整流程：形制选择、营造法式推算、结构体系比选、消防与现代规范融合、施工配合与验收。适合寺院筹建方与设计从业者参考。",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=500&fit=crop",
    author: "禅境设计技术团队",
    content: [
      {
        type: "heading",
        content: "前言",
        level: 2
      },
      {
        type: "text",
        content: "寺庙建筑设计是宗教空间营造的主体工程。它既不是单纯的仿古建筑复原，也不是自由创作的现代建筑，而是要在<strong>传统形制法度</strong>与<strong>当代功能规范</strong>之间取得精妙平衡。"
      },
      {
        type: "text",
        content: "本文从实战角度出发，为寺院筹建方和设计师梳理一份完整的寺庙建筑设计指南。"
      },
      {
        type: "heading",
        content: "一、形制先行：确定建筑的法度依据",
        level: 2
      },
      {
        type: "text",
        content: "设计的第一步不是画图，而是确定形制依据。不同宗派、不同地域的寺院形制差异极大，必须先行确认。"
      },
      {
        type: "list",
        content: "汉传佛教：以伽蓝七堂制与中轴对称布局为核心，屋顶等级序列不可颠倒"
      },
      {
        type: "list",
        content: "道教宫观：重因山就势与风水格局，建筑等级须与所奉神阶匹配"
      },
      {
        type: "list",
        content: "藏传佛教：以曼陀罗图式组织空间，收分墙体与平顶碉房是核心语汇"
      },
      {
        type: "list",
        content: "南传佛教：陡峭的重檐大屋顶、独立戒堂与干栏式构造"
      },
      {
        type: "quote",
        content: "形制一旦定错，后续所有设计都是徒劳。这是寺庙建筑设计最不能妥协的第一步。"
      },
      {
        type: "heading",
        content: "二、营造法式推算：让比例有据可依",
        level: 2
      },
      {
        type: "text",
        content: "传统建筑的比例不是凭感觉来的，而是有严格的推算体系。我们主要依据两部典籍："
      },
      {
        type: "list",
        content: "宋《营造法式》：以「材分制」推算，材分八等，建筑等级决定用材等级"
      },
      {
        type: "list",
        content: "清《工程做法则例》：以「斗口制」推算，檐柱高、开间、进深均由斗口模数导出"
      },
      {
        type: "text",
        content: "需要重点控制的比例关系包括：开间进深比、柱高与开间比、举折曲线（屋面坡度）、翼角起翘角度、斗拱层数与出跳数。这些参数直接决定建筑「像不像」。"
      },
      {
        type: "heading",
        content: "三、结构体系比选：木构、混凝土仿古还是钢木组合",
        level: 2
      },
      {
        type: "text",
        content: "这是每个项目都要面对的现实抉择，三种体系各有优劣："
      },
      {
        type: "list",
        content: "传统木构：形制最纯正、可修缮性强、文化价值高；但造价高，防火与防腐要求严格"
      },
      {
        type: "list",
        content: "混凝土仿古：耐久性好、造价可控、易满足消防与抗震规范；外观可做仿木饰面，但细节质感逊于木构"
      },
      {
        type: "list",
        content: "钢木组合：主体用钢结构满足大跨度，外露部分用木构保证观感；适合大经堂等大空间"
      },
      {
        type: "text",
        content: "我们的建议是：<strong>涉及文物保护单位的部分严格按传统工艺，新建部分可在外观保持形制的前提下采用现代结构</strong>。这是目前多数寺院的务实选择。"
      },
      {
        type: "heading",
        content: "四、现代规范的融合：消防、无障碍与设备",
        level: 2
      },
      {
        type: "text",
        content: "寺庙建筑必须满足现行国家规范，重点是以下几项："
      },
      {
        type: "list",
        content: "GB 50016《建筑设计防火规范》：木构建筑的防火分区、消防车道、喷淋与报警系统"
      },
      {
        type: "list",
        content: "GB 50763《无障碍设计规范》：坡道、扶手、无障碍卫生间与礼佛空间平接"
      },
      {
        type: "list",
        content: "GB 50011《建筑抗震设计规范》：木构与砌体结构的抗震构造措施"
      },
      {
        type: "text",
        content: "难点在于这些设施会破坏传统风貌。解决办法是<strong>隐蔽化设计</strong>：喷淋管道藏于吊顶与墙体、消防车道结合景观铺装、利用院落自然形成防火分区、设备管线沿墙内暗敷。"
      },
      {
        type: "heading",
        content: "五、施工配合与验收",
        level: 2
      },
      {
        type: "text",
        content: "寺庙建筑的施工质量差异极大，关键在于两点：一是关键构造必须出大样图（斗拱、举折、翼角、瓦作、彩画地仗），二是重要工艺必须打样确认后再大面积施工。"
      },
      {
        type: "list",
        content: "木作：榫卯节点、木材含水率与防腐防虫处理"
      },
      {
        type: "list",
        content: "瓦作：屋面瓦的选型、铺设方式与脊饰做法"
      },
      {
        type: "list",
        content: "彩画：地仗层做法、矿物颜料选用与绘制工艺"
      },
      {
        type: "list",
        content: "石作：须弥座、栏杆、柱础的形制与雕工"
      },
      {
        type: "quote",
        content: "一座好的寺庙建筑，应该在使用百年之后仍然站得住、修得起、看得下去。"
      }
    ],
    tags: ["寺庙建筑设计", "营造法式", "古建营造", "宗教建筑"],
    readTime: "12分钟",
    publishDate: "2026-08-30"
  },
  {
    id: "temple-lighting-design-guide",
    title: "寺庙灯光设计指南：见光不见灯的克制美学",
    summary: "寺庙照明与商业亮化有本质区别。本文详解寺庙灯光设计的四大原则、分区域照明策略、色温与照度控制，以及古建零损伤安装技术要点。",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=500&fit=crop",
    author: "禅境设计技术团队",
    content: [
      {
        type: "heading",
        content: "寺庙灯光，为什么不能用商业亮化的思路",
        level: 2
      },
      {
        type: "text",
        content: "商业亮化追求夺目、动感、色彩变化，目的是吸引注意力。而寺庙照明恰恰相反——它的目的是<strong>烘托庄严与静穆</strong>，让殿宇在夜色中更显深沉，而不是更显喧闹。"
      },
      {
        type: "text",
        content: "用错方法的寺庙亮化，常见问题是：彩色动态光效破坏清净感、裸露灯具破坏建筑风貌、过高照度让夜间如同白昼、溢散光影响周边居民与生态。"
      },
      {
        type: "heading",
        content: "原则一：见光不见灯",
        level: 2
      },
      {
        type: "text",
        content: "灯具必须深藏于斗拱、檐口、栏杆、景观之中，采用间接照明与隐藏式安装，让观者看到被照亮的效果，却看不到光源本身。这是寺庙照明最重要的一条原则。"
      },
      {
        type: "heading",
        content: "原则二：克制用光",
        level: 2
      },
      {
        type: "text",
        content: "不做彩色动态光效，不使用声光秀，以烘托氛围为主。建筑立面的平均照度建议控制在 <strong>15-30Lx</strong>，这个区间足以呈现建筑层次，又不至于过亮。"
      },
      {
        type: "heading",
        content: "原则三：统一暖色温",
        level: 2
      },
      {
        type: "text",
        content: "推荐 <strong>1800K-2400K</strong> 暖古铜色温。这个区间最接近传统烛火与油灯的色感，能凸显木构与彩画的温润质感。冷白光会严重破坏历史感与宗教空间的静穆氛围，应坚决避免。"
      },
      {
        type: "heading",
        content: "原则四：文物保护优先",
        level: 2
      },
      {
        type: "text",
        content: "古建部分的照明必须做到零损伤："
      },
      {
        type: "list",
        content: "采用非破坏性张力抱箍承载，杜绝在古木、砖石上打孔"
      },
      {
        type: "list",
        content: "选用无紫外、蓝光波谱窄幅的LED，保护彩画与木作"
      },
      {
        type: "list",
        content: "控制系统采用免布线的无线方案，减少对建筑的扰动"
      },
      {
        type: "list",
        content: "全过程可逆安装，拆除后不留痕迹"
      },
      {
        type: "heading",
        content: "分区域照明策略",
        level: 2
      },
      {
        type: "list",
        content: "建筑立面：按屋顶、檐口、斗拱、柱身分层布光，强化木构层次与屋顶轮廓"
      },
      {
        type: "list",
        content: "佛塔：按塔身层数分层投光，塔刹做重点照明，形成竖向视觉焦点"
      },
      {
        type: "list",
        content: "佛殿室内：佛坛重点照明，礼佛空间用低照度环境光，兼顾礼拜功能与庄严氛围"
      },
      {
        type: "list",
        content: "景观步道：低位照明与埋地灯保证夜间通行安全，水景与植物做点缀照明"
      },
      {
        type: "heading",
        content: "智能分时控制",
        level: 2
      },
      {
        type: "text",
        content: "按早晚课、节庆法会、日常闭寺设定不同场景，深夜自动降至安全照度。这样既能满足不同时段的使用需求，又能实现 <strong>30%-50% 的节能</strong>，同时减少对周边居民的光干扰。"
      },
      {
        type: "quote",
        content: "最好的寺庙照明，是让人感觉不到灯的存在，只记得殿宇在夜色中的庄严。"
      }
    ],
    tags: ["寺庙灯光设计", "古建照明", "见光不见灯", "文物保护"],
    readTime: "9分钟",
    publishDate: "2026-08-30"
  },
  {
    id: "temple-design-approval-guide",
    title: "寺庙设计审批与规范指南：从立项到开工",
    summary: "寺庙建设涉及宗教、文物、规划、消防等多部门审批。本文梳理完整的审批流程、必备材料、常见卡点与应对建议，帮筹建方少走弯路。",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=500&fit=crop",
    author: "禅境设计技术团队",
    content: [
      {
        type: "heading",
        content: "为什么寺庙项目审批特别复杂",
        level: 2
      },
      {
        type: "text",
        content: "普通建设项目走规划、消防、施工许可即可。而寺庙项目多了一层<strong>宗教事务审批</strong>，若涉及文物保护单位，还要叠加<strong>文物部门审批</strong>。两个系统并行，材料要求与审查重点各不相同。"
      },
      {
        type: "heading",
        content: "一、宗教事务部门审批",
        level: 2
      },
      {
        type: "text",
        content: "依据《宗教事务条例》，宗教活动场所的新建、改建、扩建须经宗教团体同意后，报所在地县级以上人民政府宗教事务部门审批。"
      },
      {
        type: "list",
        content: "筹备设立宗教活动场所的申请"
      },
      {
        type: "list",
        content: "宗教团体的书面同意意见"
      },
      {
        type: "list",
        content: "拟建场所的可行性说明与资金来源证明"
      },
      {
        type: "list",
        content: "建设方案与设计文件"
      },
      {
        type: "heading",
        content: "二、文物部门审批（仅文物保护单位）",
        level: 2
      },
      {
        type: "text",
        content: "若寺院属于各级文物保护单位，所有修缮与建设工程均须报文物部门批准，并遵循<strong>不改变文物原状</strong>与<strong>最低限度干预</strong>原则。"
      },
      {
        type: "list",
        content: "现状勘察与残损评估报告（须由有资质的单位出具）"
      },
      {
        type: "list",
        content: "修缮设计方案与文物保护措施说明"
      },
      {
        type: "list",
        content: "可逆性做法的技术论证"
      },
      {
        type: "heading",
        content: "三、常规建设审批",
        level: 2
      },
      {
        type: "text",
        content: "与普通建设项目一致，需依次办理："
      },
      {
        type: "list",
        content: "用地与规划许可（选址意见书、建设用地规划许可证、建设工程规划许可证）"
      },
      {
        type: "list",
        content: "消防设计审查（GB 50016，木构建筑为重点审查对象）"
      },
      {
        type: "list",
        content: "施工图审查"
      },
      {
        type: "list",
        content: "建筑工程施工许可证"
      },
      {
        type: "heading",
        content: "四、常见卡点与应对建议",
        level: 2
      },
      {
        type: "text",
        content: "实践中我们最常遇到的三个卡点："
      },
      {
        type: "quote",
        content: "卡点一：消防规范与古建风貌冲突 —— 通过隐蔽式消防设计解决，需提前与消防审查部门沟通方案。"
      },
      {
        type: "quote",
        content: "卡点二：文物修缮工艺无定额 —— 传统工艺常无对应工程定额，需单独编制工艺说明与预算，提前报审。"
      },
      {
        type: "quote",
        content: "卡点三：山地项目的基础与边坡 —— 需先完成地勘与边坡稳定性评估，否则施工图审查难以通过。"
      },
      {
        type: "heading",
        content: "五、关键执行标准",
        level: 2
      },
      {
        type: "list",
        content: "GB 50016《建筑设计防火规范》"
      },
      {
        type: "list",
        content: "GB 50034《建筑照明设计标准》"
      },
      {
        type: "list",
        content: "JGJ/T 163《城市夜景照明设计规范》"
      },
      {
        type: "list",
        content: "GB 50763《无障碍设计规范》"
      },
      {
        type: "list",
        content: "GB 50165《古建筑木结构维护与加固技术规范》"
      },
      {
        type: "text",
        content: "禅境设计可协助筹建方准备全套设计文件与技术说明，并配合各部门的技术审查沟通。"
      }
    ],
    tags: ["寺庙审批", "宗教事务条例", "文物保护", "设计规范"],
    readTime: "10分钟",
    publishDate: "2026-08-30"
  }
];
