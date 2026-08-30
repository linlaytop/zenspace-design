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
    author: "寺庙佛教设计技术团队",
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
    author: "寺庙佛教设计技术团队",
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
    author: "寺庙佛教设计技术团队",
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
        content: "寺庙佛教设计可协助筹建方准备全套设计文件与技术说明，并配合各部门的技术审查沟通。"
      }
    ],
    tags: ["寺庙审批", "宗教事务条例", "文物保护", "设计规范"],
    readTime: "10分钟",
    publishDate: "2026-08-30"
  },
  {
    id: "han-buddhist-temple-design-guide",
    title: "汉传佛教寺庙设计指南：伽蓝七堂与中轴对称布局",
    summary: "详解汉传佛教寺院设计的核心法度：伽蓝七堂制、中轴对称院落序列、木构大殿等级秩序、屋顶与斗拱规制。适合汉传寺院筹建方与设计师参考。",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=500&fit=crop",
    author: "寺庙佛教设计技术团队",
    content: [
      { type: "heading", content: "汉传寺院：最成熟的本土宗教建筑体系", level: 2 },
      { type: "text", content: "汉传佛教寺院是中国分布最广、形制最成熟的宗教建筑体系，其设计核心不是自由创作，而是<strong>在仪轨法度之内把品质做到极致</strong>。一座寺院从总体规划到细部雕饰，都有严谨的礼制依据。" },
      { type: "heading", content: "一、伽蓝七堂制：寺院的功能中枢", level: 2 },
      { type: "text", content: "伽蓝七堂是汉传寺院基本的功能配置，不同宗派略有差异，通常指佛殿、法堂、僧堂、库房、山门、西净、浴室七类核心建筑。设计的第一步是确认本寺的宗派归属与法脉，再据此确定七堂的配置与规模。" },
      { type: "list", content: "佛殿（大雄宝殿）：供奉主尊，是全寺礼佛中心与体量最大者" },
      { type: "list", content: "法堂：演说佛法、举行法会之处，等级仅次于佛殿" },
      { type: "list", content: "僧堂（禅堂）：僧众修行的核心空间，强调静穆与声学" },
      { type: "list", content: "山门：三门并立，象征三解脱门，是寺院礼制入口" },
      { type: "heading", content: "二、中轴对称：院落序列的礼制", level: 2 },
      { type: "text", content: "<strong>中轴对称</strong>是汉传寺院最鲜明的空间特征。主轴自南向北依次为：山门→天王殿→大雄宝殿→法堂→藏经楼，东西配殿对称布置。这种序列既符合礼佛动线，也强化了宗教空间的秩序感。" },
      { type: "quote", content: "形制一旦定错，后续所有设计都是徒劳。汉传寺院设计最不能妥协的，是先确认伽蓝七堂的配置与中轴序列。" },
      { type: "heading", content: "三、木构大殿的等级秩序", level: 2 },
      { type: "list", content: "屋顶等级：庑殿顶 > 歇山顶 > 悬山顶 > 硬山顶，佛殿可用歇山或庑殿" },
      { type: "list", content: "开间等级：最高九开间（仅特殊敕建），常规大殿多为五至七开间" },
      { type: "list", content: "斗拱出跳：出跳数越多等级越高，直接决定建筑'像不像'" },
      { type: "list", content: "举折曲线与翼角起翘：屋面坡度与翼角由营造法式材分推算" },
      { type: "text", content: "这些参数不是凭感觉，而是依据宋《营造法式》材分制与清《工程做法则例》斗口制推算。需要专业团队把关，可参考我们的 <a href='/service/han-buddhist-temple-design' class='text-yellow-400 underline'>汉传佛教设计</a> 与 <a href='/service/temple-architecture-design' class='text-yellow-400 underline'>寺庙建筑设计</a> 服务。" },
      { type: "heading", content: "四、现代规范与古建的融合", level: 2 },
      { type: "text", content: "汉传寺院必须满足 GB 50016 防火、GB 50763 无障碍等现行规范。难点在于消防与古建风貌冲突，解决办法是隐蔽式设计：喷淋藏于吊顶墙体、消防车道结合景观铺装、利用院落形成防火分区。" }
    ],
    tags: ["汉传佛教设计", "寺庙建筑设计", "伽蓝七堂", "寺庙规划设计", "中轴对称"],
    readTime: "11分钟",
    publishDate: "2026-08-30"
  },
  {
    id: "taoist-temple-design-guide",
    title: "道教宫观设计指南：因山就势与风水格局",
    summary: "道教宫观设计重因山就势、天人合一。本文讲风水格局、神阶秩序、斋醮坛场与山地台地处理，以及道观建筑与自然的融合之道。",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=500&fit=crop",
    author: "寺庙佛教设计技术团队",
    content: [
      { type: "heading", content: "道观设计：建筑应顺应山水", level: 2 },
      { type: "text", content: "与汉传寺院强调中轴对称不同，道教宫观更重<strong>因山就势、天人合一</strong>。好的道观不是强行改变地形，而是让建筑长在山水之间，与风水格局融为一体。" },
      { type: "heading", content: "一、风水格局：背山面水与朝案", level: 2 },
      { type: "list", content: "背倚主山（来龙），左右砂山环抱，前方案山朝山呼应" },
      { type: "list", content: "面水（溪流或明堂水），藏风聚气，忌风口直冲" },
      { type: "list", content: "建筑轴线随山势转折，不强求笔直，重在气脉连贯" },
      { type: "heading", content: "二、神阶秩序：建筑等级与所奉神阶匹配", level: 2 },
      { type: "text", content: "道教宫观按所奉神阶确定建筑等级与方位。三清、玉皇、四御等主神殿宇等级最高，配殿按职能布置。斋醮科仪坛场需预留足够的法事空间与朝拜动线。" },
      { type: "quote", content: "道观之美，在于'虽由人作，宛自天开'。设计的功夫，是把仪轨藏进山的脉络里。" },
      { type: "heading", content: "三、山地台地处理", level: 2 },
      { type: "list", content: "依等高线分层筑台，减少大挖大填，保护山体稳定" },
      { type: "list", content: "台基、挡墙采用本地石材，与山势肌理一致" },
      { type: "list", content: "边坡支护与排水系统须先完成地勘与稳定性评估" },
      { type: "text", content: "山地道观的选址与布局可结合我们的 <a href='/service/taoist-temple-design' class='text-yellow-400 underline'>道教宫观设计</a> 与 <a href='/service/temple-landscape-design' class='text-yellow-400 underline'>寺庙景观设计</a> 服务统筹考虑。" },
      { type: "heading", content: "四、材料与色彩：素朴为上", level: 2 },
      { type: "text", content: "道观常用青瓦、素墙、赭石与木质原色，色彩较佛寺更为素朴内敛，体现清静无为的意趣。木构件多做生漆或桐油处理，少用繁复彩画。" }
    ],
    tags: ["道教宫观设计", "道观设计", "风水布局", "寺庙建筑设计", "山地建筑"],
    readTime: "10分钟",
    publishDate: "2026-08-30"
  },
  {
    id: "tibetan-buddhist-temple-design-guide",
    title: "藏传佛教寺庙设计指南：曼陀罗图式与收分墙",
    summary: "藏传寺院以曼陀罗图式组织空间，收分墙体与平顶碉房适应高原。本文讲空间图式、大经堂、佛塔与高原环境的适应性设计要点。",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=500&fit=crop",
    author: "寺庙佛教设计技术团队",
    content: [
      { type: "heading", content: "藏传寺院：图式先于形式", level: 2 },
      { type: "text", content: "藏传佛教寺院的空间组织核心不是轴线，而是<strong>曼陀罗（坛城）图式</strong>——以主殿为中心，向四方展开，象征宇宙秩序。理解这一点，才能把握藏传寺院设计的根本逻辑。" },
      { type: "heading", content: "一、曼陀罗空间组织", level: 2 },
      { type: "list", content: "主殿（大经堂或扎仓）居于构图中心，体量最大" },
      { type: "list", content: "附属殿堂、僧舍环绕中心布置，形成聚合式院落" },
      { type: "list", content: "转经道（嘛尼廓）沿建筑外围或山体设置，形成礼佛环线" },
      { type: "heading", content: "二、收分墙体与平顶碉房", level: 2 },
      { type: "text", content: "高原强风、强紫外与昼夜温差大，催生了藏式建筑的典型语汇：<strong>下宽上窄的收分墙体</strong>增强稳定，平顶碉房减少风荷，厚墙小窗保温隔热。这些不是装饰，而是环境适应的结果。" },
      { type: "quote", content: "藏传寺院的壮美，来自对高原的臣服而非对抗。收分墙与平顶，是高原写给建筑的语法。" },
      { type: "heading", content: "三、大经堂的声学与采光", level: 2 },
      { type: "list", content: "大经堂容纳数百僧众诵经，需控制混响时间与语言清晰度" },
      { type: "list", content: "高侧窗与天窗解决进深大的天然采光，避免眩光" },
      { type: "list", content: "柱网密、跨度大，常采用钢木组合结构满足承载" },
      { type: "text", content: "造像与浮雕是藏传寺院的视觉焦点，可结合 <a href='/service/tibetan-buddhist-temple-design' class='text-yellow-400 underline'>藏传佛教设计</a> 与 <a href='/service/temple-sculpture-design' class='text-yellow-400 underline'>寺庙造型雕塑设计</a> 服务整体把控。" },
      { type: "heading", content: "四、佛塔（覆钵式塔）", level: 2 },
      { type: "text", content: "覆钵式塔是藏传寺院的标志性构筑物，由塔基、塔身（覆钵）、塔刹（相轮）组成。其比例与象征意义需严格遵循仪轨，照明常做竖向分层投光，塔刹为视觉焦点。" }
    ],
    tags: ["藏传佛教设计", "寺庙建筑设计", "曼陀罗", "收分墙", "平顶碉房"],
    readTime: "11分钟",
    publishDate: "2026-08-30"
  },
  {
    id: "theravada-buddhist-temple-design-guide",
    title: "南传佛教寺庙设计指南：重檐大屋顶与干栏构造",
    summary: "南传佛寺以陡峭重檐大屋顶、独立戒堂与干栏式构造为特征，针对湿热气候。本文讲形制要点与热带适应性设计。",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=500&fit=crop",
    author: "寺庙佛教设计技术团队",
    content: [
      { type: "heading", content: "南传佛寺：热带的轻盈语汇", level: 2 },
      { type: "text", content: "南传佛教（上座部）主要流行于云南及东南亚，其寺院建筑与汉传、藏传迥异，核心特征是<strong>陡峭的重檐大屋顶与干栏式构造</strong>，一切为应对湿热气候而生。" },
      { type: "heading", content: "一、重檐大屋顶", level: 2 },
      { type: "list", content: "高坡度屋顶利于暴雨快速排流，出檐深远遮挡烈日" },
      { type: "list", content: "多层重檐形成丰富的檐下阴影空间，降低体感温度" },
      { type: "list", content: "屋脊与檐口常饰以繁复的金饰与火焰纹，色彩鲜明" },
      { type: "heading", content: "二、独立戒堂（波松）", level: 2 },
      { type: "text", content: "戒堂是南传佛寺的核心礼制空间，用于比丘受戒与重要法事，通常独立设置、体量精致，四周开窗保证通风，地面抬高以显尊崇。" },
      { type: "quote", content: "南传佛寺的轻盈，是湿热气候逼出来的智慧：把墙让给风，把仪式留给阴影。" },
      { type: "heading", content: "三、干栏式构造", level: 2 },
      { type: "list", content: "底层架空，防潮、通风、防虫蛇，常用于僧舍与附属建筑" },
      { type: "list", content: "主殿亦常做抬高基座，减少地面湿气对木构的侵蚀" },
      { type: "list", content: "材料多用本地硬木与竹，注重防腐防虫处理" },
      { type: "text", content: "完整的南传寺院营造可参考我们的 <a href='/service/theravada-buddhist-temple-design' class='text-yellow-400 underline'>南传佛教设计</a> 服务，统筹建筑、室内与景观。" },
      { type: "heading", content: "四、色彩与装饰", level: 2 },
      { type: "text", content: "南传佛寺善用金、红、白对比，墙面多白色或暖黄，屋顶金饰璀璨，与热带植被形成强烈而和谐的色彩关系。" }
    ],
    tags: ["南传佛教设计", "寺庙建筑设计", "重檐屋顶", "戒堂", "干栏式"],
    readTime: "9分钟",
    publishDate: "2026-08-30"
  },
  {
    id: "temple-interior-design-guide",
    title: "寺庙室内设计指南：佛殿禅堂经堂的仪轨与陈设",
    summary: "寺庙室内设计统筹佛殿、禅堂、经堂、客堂斋堂的仪轨尺度与声学光环境。本文讲空间序列、材质选择、礼佛动线与功能分区。",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=500&fit=crop",
    author: "寺庙佛教设计技术团队",
    content: [
      { type: "heading", content: "室内：仪轨转化为空间语言", level: 2 },
      { type: "text", content: "寺庙室内设计不是普通公装，它要在<strong>仪轨尺度、声学、光环境</strong>三重约束下，把宗教信仰转译为可体验的空间。佛殿的庄严、禅堂的静穆、经堂的肃整，各有不同的设计逻辑。" },
      { type: "heading", content: "一、佛殿室内：以佛坛为中心", level: 2 },
      { type: "list", content: "佛坛为绝对视觉中心，背景墙（海漫/背光）强化尊像层次" },
      { type: "list", content: "礼佛空间地面平整、照度低而均匀，避免眩光" },
      { type: "list", content: "柱网与开间需避让主尊礼佛视线，保证中轴对位" },
      { type: "heading", content: "二、禅堂：静穆与声学", level: 2 },
      { type: "text", content: "禅堂强调静穆，材料以素木、麻、石的哑光质感为主，地面常铺榻榻米或地革。声学上控制混响，避免空旷回响破坏禅修氛围。" },
      { type: "quote", content: "好的寺庙室内，是让人一脚踏进去，心就慢下来的空间。" },
      { type: "heading", content: "三、经堂与客堂斋堂", level: 2 },
      { type: "list", content: "经堂：经柜布置、诵经席位的整齐与采光" },
      { type: "list", content: "客堂：接待与法务办公，需兼顾庄重与实用" },
      { type: "list", content: "斋堂：过堂用斋的行列秩序与便捷的供餐动线" },
      { type: "text", content: "室内与陈设是一体两面，建议结合 <a href='/service/temple-interior-design' class='text-yellow-400 underline'>寺庙室内设计</a> 与 <a href='/service/temple-furnishing-design' class='text-yellow-400 underline'>寺庙软装设计</a> 同步深化。" }
    ],
    tags: ["寺庙室内设计", "佛殿设计", "禅堂设计", "经堂设计", "寺庙陈设"],
    readTime: "10分钟",
    publishDate: "2026-08-30"
  },
  {
    id: "temple-furnishing-design-guide",
    title: "寺庙软装设计指南：经幡供具与整体陈设规制",
    summary: "寺庙软装涵盖经幡幢幡、供具法器、帷幔坐具、插花供果与节庆陈设。本文讲陈设规制、色彩材质选择与仪轨依据。",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=500&fit=crop",
    author: "寺庙佛教设计技术团队",
    content: [
      { type: "heading", content: "软装：让空间'活'起来的陈设", level: 2 },
      { type: "text", content: "寺庙软装（陈设）是建筑的'第二层皮肤'。它包含经幡幢幡、供具法器、帷幔坐具、插花供果与节庆场景，既要<strong>符合仪轨规制</strong>，又要与整体空间调性统一。" },
      { type: "heading", content: "一、经幡与幢幡", level: 2 },
      { type: "list", content: "经幡（风马旗）依五色方位悬挂，传递经文与祈愿" },
      { type: "list", content: "幢幡为殿堂庄严之具，材质、纹样与悬挂位次有定式" },
      { type: "list", content: "汉传多悬幢盖、宝盖；藏传多悬经幡、胜幢" },
      { type: "heading", content: "二、供具与法器", level: 2 },
      { type: "text", content: "供桌、香炉、烛台、供杯、木鱼、引磬等供具法器，其形制、材质（铜、木、瓷）与摆放位次均依仪轨。供台高度、供品陈列为设计重点。" },
      { type: "quote", content: "软装的最高境界，是让信众不觉得'被布置过'，只觉得'本该如此'。" },
      { type: "heading", content: "三、帷幔坐具与节庆陈设", level: 2 },
      { type: "list", content: "佛坛帷幔、柱披以织锦为主，色彩与殿堂等级对应" },
      { type: "list", content: "禅垫、拜垫的形制与编排，兼顾礼佛与坐禅" },
      { type: "list", content: "节庆（佛诞、盂兰盆等）场景陈设需可快速搭建与撤除" },
      { type: "text", content: "造像与陈设需彼此呼应，可结合 <a href='/service/temple-furnishing-design' class='text-yellow-400 underline'>寺庙软装设计</a> 与 <a href='/service/temple-sculpture-design' class='text-yellow-400 underline'>寺庙造型雕塑设计</a> 整体把控比例与材质。" }
    ],
    tags: ["寺庙软装设计", "寺庙陈设", "经幡", "供具", "佛像陈设"],
    readTime: "9分钟",
    publishDate: "2026-08-30"
  },
  {
    id: "temple-landscape-design-guide",
    title: "寺庙景观设计指南：庭院放生池与香道步道",
    summary: "寺庙景观营造寺院园林、放生池水景、庭院植物与香道步道。本文讲禅意造景、植物选择原则与礼佛动线的景观组织。",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=500&fit=crop",
    author: "寺庙佛教设计技术团队",
    content: [
      { type: "heading", content: "寺院园林：禅意在自然中", level: 2 },
      { type: "text", content: "寺庙景观不是普通园林，它服务于<strong>礼佛动线与修行心境</strong>。一池一石、一径一木，都应是静心与仪轨的延伸。好的寺院景观，让人步行其间自然收摄身心。" },
      { type: "heading", content: "一、庭院与放生池", level: 2 },
      { type: "list", content: "放生池多居前庭或中庭，水面倒映殿宇，增强静穆" },
      { type: "list", content: "池岸以自然石驳岸为主，忌生硬混凝土直壁" },
      { type: "list", content: "叠石、置石取法自然，忌堆砌对称呆板" },
      { type: "heading", content: "二、香道与步道", level: 2 },
      { type: "text", content: "香道是信众礼佛的主路径，铺装宜平整防滑、尺度宜人，两侧以乔木形成林荫与仪式感。夜间低位照明保证安全，避免强光破坏夜景庄严。" },
      { type: "quote", content: "寺院的景，不在多看，而在一步一景里让人慢下来。" },
      { type: "heading", content: "三、植物选择原则", level: 2 },
      { type: "list", content: "多用松、柏、银杏、香樟等具文化内涵与常青寓意的树种" },
      { type: "list", content: "避免易落果、招虫、带刺植物临近礼佛动线" },
      { type: "list", content: "季相搭配：春花秋叶，维持全年景观层次" },
      { type: "text", content: "景观与建筑、灯光需一体设计，可参考 <a href='/service/temple-landscape-design' class='text-yellow-400 underline'>寺庙景观设计</a> 与 <a href='/service/temple-lighting-design' class='text-yellow-400 underline'>寺庙灯光设计</a> 服务。" }
    ],
    tags: ["寺庙景观设计", "寺院园林", "放生池", "香道", "禅意景观"],
    readTime: "9分钟",
    publishDate: "2026-08-30"
  },
  {
    id: "temple-ancestral-hall-design-guide",
    title: "祠堂宗祠空间设计指南：三进二井与昭穆位次",
    summary: "祠堂是祭祀先祖、议事家风的复合空间。本文讲中轴对称、三进二井制、昭穆位次、神主牌位与宗祠功能分区设计要点。",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=500&fit=crop",
    author: "寺庙佛教设计技术团队",
    content: [
      { type: "heading", content: "祠堂：祭祀与家风的复合空间", level: 2 },
      { type: "text", content: "祠堂（宗祠、家祠）是祭祀先祖、议决族事、宣教家风的复合空间，其设计核心是<strong>礼制秩序与复合功能</strong>。它既不同于佛寺，也不同于普通民居，神主牌位供奉的是先祖而非神佛。" },
      { type: "heading", content: "一、中轴对称与三进二井", level: 2 },
      { type: "list", content: "中轴对称：门屋—享堂—寝堂（藏主）三进序列" },
      { type: "list", content: "二井（天井）分隔前后进，解决采光通风并形成仪式节奏" },
      { type: "list", content: "享堂为祭祖行礼主体，空间高敞、用材隆重" },
      { type: "heading", content: "二、昭穆位次：牌位的秩序", level: 2 },
      { type: "text", content: "神主牌位按<strong>昭穆之制</strong>排列：始祖居中，左昭右穆、父昭子穆，世代递迁。牌位龛（神龛）的形制、高度与开启方式需严格遵循族规与礼制。" },
      { type: "quote", content: "祠堂之重，不在华丽，而在位次分明、进退有度，让后人知其所来。" },
      { type: "heading", content: "三、复合功能分区", level: 2 },
      { type: "list", content: "祭祀区：享堂与寝堂，庄严肃穆，材质沉稳" },
      { type: "list", content: "议事区：厢房或偏厅，用于族事商议与教化" },
      { type: "list", content: "展示区：匾额、楹联、族谱陈列，传承家风" },
      { type: "text", content: "祠堂设计可结合我们的 <a href='/service/ancestral-hall-space-design' class='text-yellow-400 underline'>祠堂空间设计</a> 服务，统筹建筑、室内与陈设。" }
    ],
    tags: ["祠堂设计", "宗祠设计", "家祠设计", "三进二井", "昭穆"],
    readTime: "10分钟",
    publishDate: "2026-08-30"
  },
  {
    id: "temple-site-selection-guide",
    title: "寺庙选址与风水布局指南：形胜与朝案",
    summary: "寺庙选址讲究形胜、背山面水、左青龙右白虎与朝案呼应。本文讲传统选址要诀、风水格局与现代场地条件的平衡之道。",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=500&fit=crop",
    author: "寺庙佛教设计技术团队",
    content: [
      { type: "heading", content: "选址：寺院成败的一半", level: 2 },
      { type: "text", content: "寺庙选址决定后续所有设计的边界。传统讲究<strong>形胜</strong>——背山面水、藏风聚气；当代还要叠加地质、交通、审批与信众可达性。选址是传统智慧与现代条件的平衡。" },
      { type: "heading", content: "一、传统风水要诀", level: 2 },
      { type: "list", content: "背倚主山（来龙），左右砂山环抱，前方案山朝山呼应" },
      { type: "list", content: "面水（明堂水），忌直冲风口与反弓水" },
      { type: "list", content: "左青龙、右白虎，地势宜东高西缓、北高南低" },
      { type: "heading", content: "二、现代场地条件校验", level: 2 },
      { type: "text", content: "风水格局需落到工程现实：地勘确认地基承载力与边坡稳定，水文确认排水与防洪，交通确认施工便道与信众动线。" },
      { type: "quote", content: "好风水，是拿到地勘报告后仍站得住的那套格局。" },
      { type: "heading", content: "三、山地项目的特殊考量", level: 2 },
      { type: "list", content: "先做边坡稳定性评估，再定台地与建筑落位" },
      { type: "list", content: "台地筑坝与挡墙需与景观一体化设计" },
      { type: "list", content: "防洪标高须高于历史水位，预留泄洪通道" },
      { type: "text", content: "选址与总图可结合 <a href='/service/temple-architecture-design' class='text-yellow-400 underline'>寺庙建筑设计</a> 与 <a href='/service/taoist-temple-design' class='text-yellow-400 underline'>道教宫观设计</a> 服务在早期介入，避免后期返工。" }
    ],
    tags: ["寺庙选址", "风水", "寺庙规划", "形胜", "朝案"],
    readTime: "9分钟",
    publishDate: "2026-08-30"
  },
  {
    id: "temple-design-budget-guide",
    title: "寺庙设计造价与预算指南：从效果图到施工",
    summary: "寺庙项目造价受结构体系、材料工艺、地形与规模影响巨大。本文讲造价构成、预算编制要点与降本增效的务实策略。",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=500&fit=crop",
    author: "寺庙佛教设计技术团队",
    content: [
      { type: "heading", content: "造价：被形制与工艺决定的数字", level: 2 },
      { type: "text", content: "寺庙造价没有统一单价，它由<strong>结构体系、材料工艺、地形条件与规模等级</strong>共同决定。同样一座大殿，木构与混凝土仿古的造价可能相差数倍。理清构成，才能合理编制预算。" },
      { type: "heading", content: "一、造价的主要构成", level: 2 },
      { type: "list", content: "结构主体：木构 > 钢木组合 > 混凝土仿古" },
      { type: "list", content: "传统工艺：木作、瓦作、彩画、石作，人工占比高" },
      { type: "list", content: "设备与消防：隐蔽式消防、无障碍、智能化" },
      { type: "list", content: "景观与灯光：庭院、水景、夜景亮化" },
      { type: "heading", content: "二、预算编制要点", level: 2 },
      { type: "text", content: "传统工艺常无对应工程定额，需单独编制工艺说明与单价分析。建议在设计阶段即同步出物料清单与概算，避免施工阶段大幅超支。" },
      { type: "quote", content: "省钱的钥匙在设计阶段：把工艺定清楚，比施工时砍价管用得多。" },
      { type: "heading", content: "三、降本增效的务实策略", level: 2 },
      { type: "list", content: "新建部分外观保形制、结构用现代材料，降低造价" },
      { type: "list", content: "文物部分严格传统工艺，范围从严控制" },
      { type: "list", content: "关键工艺先打样，避免大面积返工" },
      { type: "list", content: "分批建设，优先完成礼佛核心区" },
      { type: "text", content: "如需专业寺庙设计效果图与概算，可联系 <a href='/service/temple-architecture-design' class='text-yellow-400 underline'>寺庙建筑设计</a> 团队，提供从概念到施工图的完整服务。" }
    ],
    tags: ["寺庙造价", "寺庙预算", "寺庙设计费用", "宗教建筑造价", "寺庙设计报价"],
    readTime: "10分钟",
    publishDate: "2026-08-30"
  }
];
