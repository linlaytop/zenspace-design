/**
 * 百度SEO预渲染脚本
 *
 * 解决核心问题：Baiduspider 不执行 JavaScript，SPA 页面无法被抓取
 * 方案：构建后为每个路由生成独立的静态 HTML 文件，包含该页面的
 *       title、description、keywords、正文内容，供搜索引擎抓取
 *
 * 使用方法：node scripts/prerender.mjs
 * 在 package.json 中配置为 postbuild 钩子
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SERVICE_CATEGORY_ROUTES } from './serviceCategoryPrerenderRoutes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DIST_DIR = join(__dirname, '..', 'dist');

// 部署后替换为实际域名
const BASE_URL = 'https://zenspace-design.cn';

// 百度站长验证码（部署后替换）
const BAIDU_VERIFICATION = 'codeva-XXXXXXX';

// 读取构建后的 index.html 作为模板
function readTemplate() {
  const templatePath = join(DIST_DIR, 'index.html');
  if (!existsSync(templatePath)) {
    console.error('[prerender] 错误：dist/index.html 不存在，请先运行 npm run build');
    process.exit(1);
  }
  return readFileSync(templatePath, 'utf-8');
}

// 路由配置：每个路由的 SEO 元数据和静态内容
const ROUTES = [
  {
    path: '/',
    title: '寺庙佛教设计-专业寺庙设计|汉传佛教设计|道教宫观设计|寺庙建筑设计',
    description: '禅境设计 ZENSPACE DESIGN 专注专业寺庙设计与佛教建筑设计，提供汉传佛教、道教宫观、藏传佛教、南传佛教寺院，以及寺庙建筑、室内、软装、雕塑、景观、灯光的全流程一体化设计。形制合规、禅意美学、古建零损伤营造。',
    keywords: '寺庙设计,寺院设计,佛教建筑设计,汉传佛教设计,道教宫观设计,藏传佛教设计,南传佛教设计,寺庙建筑设计,寺庙室内设计,寺庙软装设计,寺庙造型雕塑设计,寺庙景观设计,寺庙灯光设计,禅意设计,寺庙效果图,寺院规划设计,宗教建筑设计,寺庙设计院,佛教建筑设计',
    type: 'website',
    staticContent: `
      <header>
        <h1>寺庙佛教设计 | ZENSPACE DESIGN — 专业寺庙设计机构</h1>
        <p>寺庙设计 · 寺院规划设计 · 汉传佛教设计 · 道教宫观设计 · 藏传佛教设计 · 南传佛教设计 · 寺庙建筑 · 寺庙室内 · 寺庙景观 · 寺庙灯光</p>
      </header>
      <main>
        <section>
          <h2>关于寺庙佛教设计</h2>
          <p>寺庙佛教设计（ZENSPACE DESIGN）是专注宗教空间营造的专业寺庙设计机构。我们深研汉传佛教、道教、藏传佛教、南传佛教四大体系的建筑形制与仪轨规范，提供从总体规划、建筑设计、室内陈设、造像雕塑到景观园林、灯光亮化的全流程一体化设计服务。</p>
          <p>我们坚持一个基本立场：宗教空间的设计自由，存在于仪轨法度之内而非之外。造像的量度、殿宇的形制、陈设的规制都有严谨依据，设计的工作是在规范之内把品质做到极致，而不是用个人审美凌驾传统。</p>
        </section>
        <section>
          <h2>四大佛教与道教体系</h2>
          <ul>
            <li><strong>汉传佛教设计</strong> - 依伽蓝七堂制与中轴对称布局，遵循营造法式材分推算，兼顾僧团修行与信众礼佛</li>
            <li><strong>道教宫观设计</strong> - 重因山就势、天人合一，融合风水格局与斋醮科仪坛场需求</li>
            <li><strong>藏传佛教设计</strong> - 以曼陀罗图式组织空间，收分墙体与平顶碉房，兼顾高原环境适应性</li>
            <li><strong>南传佛教设计</strong> - 重檐大屋顶、独立戒堂与干栏式构造，针对湿热气候专项设计</li>
          </ul>
        </section>
        <section>
          <h2>六大专业设计板块</h2>
          <ul>
            <li><strong>寺庙建筑设计</strong> - 总体规划、殿堂单体、木构与仿古建筑、古建修缮改造</li>
            <li><strong>寺庙室内设计</strong> - 佛殿室内、禅堂、经堂、客堂斋堂、僧寮，统筹仪轨尺度与声学光环境</li>
            <li><strong>寺庙软装设计</strong> - 经幡幢幡、供具法器、帷幔坐具、插花供果、节庆场景陈设</li>
            <li><strong>寺庙造型雕塑设计</strong> - 佛像造像、菩萨罗汉、护法神将、经幢石雕、浮雕壁画</li>
            <li><strong>寺庙景观设计</strong> - 寺院园林、放生池水景、庭院植物、香道步道、山门广场</li>
            <li><strong>寺庙灯光设计</strong> - 寺庙夜景亮化、佛殿照明、佛塔照明，见光不见灯的克制美学</li>
          </ul>
        </section>
        <section>
          <h2>设计与规范标准</h2>
          <p>寺庙佛教设计严格遵循国家现行规范，包括 GB 50016《建筑设计防火规范》、GB 50034《建筑照明设计标准》、JGJ/T 163《城市夜景照明设计规范》、GB 50763《无障碍设计规范》、GB 50165《古建筑木结构维护与加固技术规范》。在形制法度上依据宋《营造法式》与清《工程做法则例》进行材分与举折推算，造像依据《造像量度经》校核。</p>
        </section>
        <section>
          <h2>服务流程</h2>
          <ol>
            <li>需求沟通 - 了解宗派、形制依据、场地条件与使用需求</li>
            <li>概念方案 - 总体规划与形制研究，提供效果图</li>
            <li>深化设计 - 施工图、构造大样、材料工艺与预算清单</li>
            <li>施工配合 - 技术交底、关键工艺打样确认、现场指导</li>
            <li>竣工验收 - 效果验收、运维方案与物料清单交付</li>
          </ol>
        </section>
        <section>
          <h2>为什么选择寺庙佛教设计</h2>
          <p>寺庙佛教设计的核心能力在于把宗教仪轨转化为可落地的空间语言。我们既懂伽蓝七堂制、曼陀罗图式、造像量度经，也懂消防规范、结构计算与施工工艺。这种「传统法度 + 当代技术」的双重能力，是寺庙设计最稀缺也最关键的素质。</p>
        </section>
        <section>
          <h2>常见问题</h2>
          <h3>寺庙设计收费标准是什么？</h3>
          <p>寺庙佛教设计提供专业寺庙设计效果图服务，完整项目根据建筑面积、单体数量、设计深度与地形复杂度综合评估报价。</p>
          <h3>寺庙建设需要办理哪些审批？</h3>
          <p>宗教活动场所新建改建须经宗教事务部门审批，涉及文物保护单位的还需报文物部门批准，并履行规划、消防、施工许可等常规建设程序。我们可协助提供全套设计文件与技术说明。</p>
          <h3>寺庙设计周期多长？</h3>
          <p>小型殿堂改造约1-2个月，整座寺院规划设计通常3-6个月，藏传与山地项目可能延长至4-8个月，具体视规模与审批进度而定。</p>
        </section>
      </main>`,
    faq: [
      { q: '寺庙设计收费标准是什么？', a: '寺庙佛教设计提供专业寺庙设计效果图服务，完整项目根据建筑面积、单体数量、设计深度与地形复杂度综合评估报价。' },
      { q: '寺庙建设需要办理哪些审批？', a: '宗教活动场所新建改建须经宗教事务部门审批，涉及文物保护单位的还需报文物部门批准，并履行规划、消防、施工许可等常规建设程序。我们可协助提供全套设计文件与技术说明。' },
      { q: '寺庙设计周期多长？', a: '小型殿堂改造约1-2个月，整座寺院规划设计通常3-6个月，藏传与山地项目可能延长至4-8个月，具体视规模与审批进度而定。' },
      { q: '服务范围覆盖哪些地区？', a: '服务覆盖全国，包括汉传、藏传、南传佛教及道教宫观集中区域，重点服务西南、西北、华东及华南地区寺院项目。' }
    ]
  },
  {
    path: '/tech',
    title: '技术专栏-寺庙设计专业技术指南|营造法式|造像量度|寺庙佛教设计',
    description: '寺庙佛教设计技术专栏，分享寺庙设计专业技术知识：寺庙建筑设计指南、寺庙灯光设计指南、寺庙设计审批与规范指南、营造法式推算、造像量度经等实用内容。',
    keywords: '寺庙设计技术,寺庙建筑设计指南,寺庙灯光设计,营造法式,造像量度经,寺庙审批流程,古建营造技术,宗教建筑设计规范,宗教建筑消防,寺庙设计规范',
    type: 'website',
    staticContent: `
      <header><h1>技术专栏 - 寺庙设计专业技术指南</h1></header>
      <main>
        <section>
          <h2>寺庙设计专业技术文章</h2>
          <p>寺庙佛教设计技术专栏汇聚寺庙设计与宗教空间营造的专业知识和实战经验，涵盖寺庙建筑设计、寺庙灯光设计、审批与规范、营造法式推算、造像量度经等核心技术话题。</p>
        </section>
        <section>
          <h2>热门技术文章</h2>
          <ul>
            <li><strong>寺庙建筑设计完整指南：从形制法度到落地施工</strong> - 系统梳理形制选择、营造法式推算、结构体系比选、消防规范融合与施工验收。</li>
            <li><strong>寺庙灯光设计指南：见光不见灯的克制美学</strong> - 详解寺庙照明四大原则、分区域照明策略、色温与照度控制、古建零损伤安装。</li>
            <li><strong>寺庙设计审批与规范指南：从立项到开工</strong> - 梳理宗教事务、文物、规划、消防多部门审批流程、必备材料与常见卡点。</li>
          </ul>
        </section>
        <section>
          <h2>技术专题</h2>
          <h3>形制与法度</h3>
          <p>伽蓝七堂制、曼陀罗图式、道教神阶秩序、南传戒堂制度，以及宋《营造法式》材分制与清《工程做法则例》斗口制的推算方法。</p>
          <h3>营造与工艺</h3>
          <p>木作榫卯、瓦作铺设、彩画地仗、石作雕工、藏式收分墙体、南传干栏构造等传统工艺的技术要点与验收标准。</p>
          <h3>规范与审批</h3>
          <p>GB 50016 防火、GB 50034 照明、JGJ/T 163 夜景、GB 50165 古建木结构加固，以及宗教事务与文物部门审批实务。</p>
        </section>
      </main>`,
  },
  {
    path: '/tech/temple-architecture-design-guide',
    title: '寺庙建筑设计完整指南：从形制法度到落地施工|寺庙佛教设计',
    description: '系统梳理寺庙建筑设计的完整流程：形制选择、营造法式推算、结构体系比选、消防与现代规范融合、施工配合与验收。适合寺院筹建方与设计从业者参考。',
    keywords: '寺庙建筑设计,寺庙建筑设计指南,营造法式,古建营造,宗教建筑设计,木结构寺庙,寺庙消防设计,斗拱举折,寺院规划,寺庙设计规范',
    type: 'article',
    staticContent: `
      <header><h1>寺庙建筑设计完整指南：从形制法度到落地施工</h1></header>
      <main>
        <section>
          <h2>前言</h2>
          <p>寺庙建筑设计是宗教空间营造的主体工程。它既不是单纯的仿古建筑复原，也不是自由创作的现代建筑，而是要在传统形制法度与当代功能规范之间取得精妙平衡。</p>
          <p>本文从实战角度出发，为寺院筹建方和设计师梳理一份完整的寺庙建筑设计指南。</p>
        </section>
        <section>
          <h2>一、形制先行：确定建筑的法度依据</h2>
          <p>设计的第一步不是画图，而是确定形制依据。不同宗派、不同地域的寺院形制差异极大，必须先行确认。</p>
          <ul>
            <li>汉传佛教：以伽蓝七堂制与中轴对称布局为核心，屋顶等级序列不可颠倒</li>
            <li>道教宫观：重因山就势与风水格局，建筑等级须与所奉神阶匹配</li>
            <li>藏传佛教：以曼陀罗图式组织空间，收分墙体与平顶碉房是核心语汇</li>
            <li>南传佛教：陡峭的重檐大屋顶、独立戒堂与干栏式构造</li>
          </ul>
          <blockquote>形制一旦定错，后续所有设计都是徒劳。这是寺庙建筑设计最不能妥协的第一步。</blockquote>
        </section>
        <section>
          <h2>二、营造法式推算：让比例有据可依</h2>
          <p>传统建筑的比例不是凭感觉来的，而是有严格的推算体系，主要依据两部典籍：</p>
          <ul>
            <li>宋《营造法式》：以「材分制」推算，材分八等，建筑等级决定用材等级</li>
            <li>清《工程做法则例》：以「斗口制」推算，檐柱高、开间、进深均由斗口模数导出</li>
          </ul>
          <p>需要重点控制的比例关系包括：开间进深比、柱高与开间比、举折曲线、翼角起翘角度、斗拱层数与出跳数。这些参数直接决定建筑「像不像」。</p>
        </section>
        <section>
          <h2>三、结构体系比选</h2>
          <ul>
            <li>传统木构：形制最纯正、可修缮性强；但造价高，防火与防腐要求严格</li>
            <li>混凝土仿古：耐久、造价可控、易满足消防与抗震规范；细节质感逊于木构</li>
            <li>钢木组合：主体钢结构满足大跨度，外露部分木构保证观感</li>
          </ul>
          <p>我们的建议是：涉及文物保护单位的部分严格按传统工艺，新建部分可在外观保持形制的前提下采用现代结构。</p>
        </section>
        <section>
          <h2>四、现代规范融合</h2>
          <p>重点依据 GB 50016 防火、GB 50763 无障碍、GB 50011 抗震。难点在于这些设施会破坏传统风貌，解决办法是隐蔽化设计：喷淋管道藏于吊顶与墙体、消防车道结合景观铺装、利用院落形成防火分区、管线沿墙内暗敷。</p>
        </section>
        <section>
          <h2>五、施工配合与验收</h2>
          <p>关键有两点：一是关键构造必须出大样图（斗拱、举折、翼角、瓦作、彩画地仗），二是重要工艺必须打样确认后再大面积施工。</p>
        </section>
      </main>`,
  },
  {
    path: '/tech/temple-lighting-design-guide',
    title: '寺庙灯光设计指南：见光不见灯的克制美学|寺庙佛教设计',
    description: '寺庙照明与商业亮化有本质区别。详解寺庙灯光设计的四大原则、分区域照明策略、色温与照度控制，以及古建零损伤安装技术要点。',
    keywords: '寺庙灯光设计,寺庙照明设计,古建寺庙亮化,见光不见灯,佛殿照明,佛塔照明,寺庙色温,古建筑照明,宗教建筑照明,文物保护照明',
    type: 'article',
    staticContent: `
      <header><h1>寺庙灯光设计指南：见光不见灯的克制美学</h1></header>
      <main>
        <section>
          <h2>寺庙灯光，为什么不能用商业亮化的思路</h2>
          <p>商业亮化追求夺目、动感、色彩变化，目的是吸引注意力。而寺庙照明恰恰相反——它的目的是烘托庄严与静穆，让殿宇在夜色中更显深沉，而不是更显喧闹。</p>
          <p>用错方法的寺庙亮化，常见问题是：彩色动态光效破坏清净感、裸露灯具破坏建筑风貌、过高照度让夜间如同白昼、溢散光影响周边居民与生态。</p>
        </section>
        <section>
          <h2>原则一：见光不见灯</h2>
          <p>灯具必须深藏于斗拱、檐口、栏杆、景观之中，采用间接照明与隐藏式安装，让观者看到被照亮的效果，却看不到光源本身。这是寺庙照明最重要的一条原则。</p>
        </section>
        <section>
          <h2>原则二：克制用光</h2>
          <p>不做彩色动态光效，不使用声光秀，以烘托氛围为主。建筑立面平均照度建议控制在 15-30Lx，这个区间足以呈现建筑层次，又不至于过亮。</p>
        </section>
        <section>
          <h2>原则三：统一暖色温</h2>
          <p>推荐 1800K-2400K 暖古铜色温。这个区间最接近传统烛火与油灯的色感，能凸显木构与彩画的温润质感。冷白光会严重破坏历史感与宗教空间的静穆氛围，应坚决避免。</p>
        </section>
        <section>
          <h2>原则四：文物保护优先</h2>
          <ul>
            <li>采用非破坏性张力抱箍承载，杜绝在古木、砖石上打孔</li>
            <li>选用无紫外、蓝光波谱窄幅的LED，保护彩画与木作</li>
            <li>控制系统采用免布线的无线方案，减少对建筑的扰动</li>
            <li>全过程可逆安装，拆除后不留痕迹</li>
          </ul>
        </section>
        <section>
          <h2>分区域照明策略</h2>
          <ul>
            <li>建筑立面：按屋顶、檐口、斗拱、柱身分层布光，强化木构层次与屋顶轮廓</li>
            <li>佛塔：按塔身层数分层投光，塔刹做重点照明，形成竖向视觉焦点</li>
            <li>佛殿室内：佛坛重点照明，礼佛空间用低照度环境光</li>
            <li>景观步道：低位照明与埋地灯保证夜间通行安全</li>
          </ul>
        </section>
        <section>
          <h2>智能分时控制</h2>
          <p>按早晚课、节庆法会、日常闭寺设定不同场景，深夜自动降至安全照度，既能满足不同时段需求，又能实现 30%-50% 的节能，同时减少对周边居民的光干扰。</p>
        </section>
      </main>`,
  },
  {
    path: '/tech/temple-design-approval-guide',
    title: '寺庙设计审批与规范指南：从立项到开工|寺庙佛教设计',
    description: '寺庙建设涉及宗教、文物、规划、消防等多部门审批。梳理完整审批流程、必备材料、常见卡点与应对建议，帮筹建方少走弯路。',
    keywords: '寺庙审批,寺庙建设审批,宗教事务条例,文物保护审批,寺庙消防审查,宗教活动场所,寺庙设计规范,寺院筹建,寺庙报建流程,寺庙设计资质',
    type: 'article',
    staticContent: `
      <header><h1>寺庙设计审批与规范指南：从立项到开工</h1></header>
      <main>
        <section>
          <h2>为什么寺庙项目审批特别复杂</h2>
          <p>普通建设项目走规划、消防、施工许可即可。而寺庙项目多了一层宗教事务审批，若涉及文物保护单位，还要叠加文物部门审批。两个系统并行，材料要求与审查重点各不相同。</p>
        </section>
        <section>
          <h2>一、宗教事务部门审批</h2>
          <p>依据《宗教事务条例》，宗教活动场所的新建、改建、扩建须经宗教团体同意后，报所在地县级以上人民政府宗教事务部门审批。</p>
          <ul>
            <li>筹备设立宗教活动场所的申请</li>
            <li>宗教团体的书面同意意见</li>
            <li>拟建场所的可行性说明与资金来源证明</li>
            <li>建设方案与设计文件</li>
          </ul>
        </section>
        <section>
          <h2>二、文物部门审批（仅文物保护单位）</h2>
          <p>若寺院属于各级文物保护单位，所有修缮与建设工程均须报文物部门批准，并遵循不改变文物原状与最低限度干预原则。</p>
          <ul>
            <li>现状勘察与残损评估报告（须由有资质的单位出具）</li>
            <li>修缮设计方案与文物保护措施说明</li>
            <li>可逆性做法的技术论证</li>
          </ul>
        </section>
        <section>
          <h2>三、常规建设审批</h2>
          <ul>
            <li>用地与规划许可（选址意见书、建设用地规划许可证、建设工程规划许可证）</li>
            <li>消防设计审查（GB 50016，木构建筑为重点审查对象）</li>
            <li>施工图审查</li>
            <li>建筑工程施工许可证</li>
          </ul>
        </section>
        <section>
          <h2>四、常见卡点与应对建议</h2>
          <p><strong>卡点一：消防规范与古建风貌冲突</strong> —— 通过隐蔽式消防设计解决，需提前与消防审查部门沟通方案。</p>
          <p><strong>卡点二：文物修缮工艺无定额</strong> —— 传统工艺常无对应工程定额，需单独编制工艺说明与预算，提前报审。</p>
          <p><strong>卡点三：山地项目的基础与边坡</strong> —— 需先完成地勘与边坡稳定性评估，否则施工图审查难以通过。</p>
        </section>
        <section>
          <h2>五、关键执行标准</h2>
          <ul>
            <li>GB 50016《建筑设计防火规范》</li>
            <li>GB 50034《建筑照明设计标准》</li>
            <li>JGJ/T 163《城市夜景照明设计规范》</li>
            <li>GB 50763《无障碍设计规范》</li>
            <li>GB 50165《古建筑木结构维护与加固技术规范》</li>
          </ul>
          <p>寺庙佛教设计可协助筹建方准备全套设计文件与技术说明，并配合各部门的技术审查沟通。</p>
        </section>
      </main>`,
  },
  {
    path: '/tech/han-buddhist-temple-design-guide',
    title: '汉传佛教寺庙设计指南：伽蓝七堂与中轴对称布局|寺庙佛教设计',
    description: '详解汉传佛教寺院设计核心法度：伽蓝七堂制、中轴对称院落序列、木构大殿等级、屋顶与斗拱规制。适合汉传寺院筹建方与设计师参考。',
    keywords: '汉传佛教设计,汉传寺院设计,伽蓝七堂,寺庙建筑设计,中轴对称,大雄宝殿,寺庙规划设计,佛殿设计,斗拱举折,汉传佛教寺院',
    type: 'article',
    staticContent: `
      <header><h1>汉传佛教寺庙设计指南：伽蓝七堂与中轴对称布局</h1></header>
      <main>
        <section><h2>汉传寺院：最成熟的本土宗教建筑体系</h2><p>汉传佛教寺院是中国分布最广、形制最成熟的宗教建筑体系，其设计核心不是自由创作，而是在仪轨法度之内把品质做到极致。</p></section>
        <section><h2>一、伽蓝七堂制：寺院的功能中枢</h2><p>伽蓝七堂是汉传寺院基本功能配置，通常指佛殿、法堂、僧堂、库房、山门、西净、浴室。设计第一步是确认宗派归属与法脉，再定七堂配置与规模。</p>
          <ul><li>佛殿（大雄宝殿）：全寺礼佛中心，体量最大</li><li>法堂：演说佛法、举行法会，等级仅次于佛殿</li><li>僧堂（禅堂）：僧众修行核心空间</li><li>山门：三门并立，象征三解脱门</li></ul></section>
        <section><h2>二、中轴对称：院落序列的礼制</h2><p>中轴对称是汉传寺院最鲜明的空间特征。主轴自南向北为山门→天王殿→大雄宝殿→法堂→藏经楼，东西配殿对称布置，强化宗教空间的秩序感。</p></section>
        <section><h2>三、木构大殿的等级秩序</h2><ul><li>屋顶等级：庑殿顶>歇山顶>悬山顶>硬山顶</li><li>开间等级：最高九开间，常规大殿五至七开间</li><li>斗拱出跳：出跳越多等级越高</li><li>举折与翼角由营造法式材分推算</li></ul></section>
        <section><h2>四、现代规范与古建的融合</h2><p>汉传寺院须满足 GB 50016 防火、GB 50763 无障碍等规范。难点在消防与古建风貌冲突，解决办法是隐蔽式设计：喷淋藏于吊顶墙体、消防车道结合景观铺装。</p></section>
        <section><h2>相关寺庙设计服务</h2><p>深入了解：<a href="../../service/han-buddhist-temple-design">汉传佛教设计</a>、<a href="../../service/temple-architecture-design">寺庙建筑设计</a>、<a href="../../service/temple-interior-design">寺庙室内设计</a>。</p></section>
      </main>`,
  },
  {
    path: '/tech/taoist-temple-design-guide',
    title: '道教宫观设计指南：因山就势与风水格局|寺庙佛教设计',
    description: '道教宫观设计重因山就势、天人合一。讲风水格局、神阶秩序、斋醮坛场与山地台地处理，以及道观建筑与自然的融合之道。',
    keywords: '道教宫观设计,道观设计,道教建筑,风水布局,因山就势,寺庙建筑设计,斋醮坛场,道观装修',
    type: 'article',
    staticContent: `
      <header><h1>道教宫观设计指南：因山就势与风水格局</h1></header>
      <main>
        <section><h2>道观设计：建筑应顺应山水</h2><p>与汉传寺院强调中轴对称不同，道教宫观更重因山就势、天人合一，让建筑长在山水之间，与风水格局融为一体。</p></section>
        <section><h2>一、风水格局：背山面水与朝案</h2><ul><li>背倚主山，左右砂山环抱，前方案山朝山呼应</li><li>面水藏风聚气，忌风口直冲</li><li>建筑轴线随山势转折，重在气脉连贯</li></ul></section>
        <section><h2>二、神阶秩序：建筑等级与所奉神阶匹配</h2><p>道教宫观按所奉神阶确定建筑等级与方位。三清、玉皇等主神殿宇等级最高，斋醮科仪坛场需预留法事空间与朝拜动线。</p></section>
        <section><h2>三、山地台地处理</h2><ul><li>依等高线分层筑台，减少大挖大填</li><li>台基挡墙采用本地石材，与山势肌理一致</li><li>边坡支护与排水先完成地勘与稳定性评估</li></ul></section>
        <section><h2>四、材料与色彩：素朴为上</h2><p>道观常用青瓦、素墙、赭石与木质原色，色彩较佛寺更为素朴内敛，木构件多做生漆或桐油处理。</p></section>
        <section><h2>相关寺庙设计服务</h2><p>深入了解：<a href="../../service/taoist-temple-design">道教宫观设计</a>、<a href="../../service/temple-landscape-design">寺庙景观设计</a>、<a href="../../service/temple-architecture-design">寺庙建筑设计</a>。</p></section>
      </main>`,
  },
  {
    path: '/tech/tibetan-buddhist-temple-design-guide',
    title: '藏传佛教寺庙设计指南：曼陀罗图式与收分墙|寺庙佛教设计',
    description: '藏传寺院以曼陀罗组织空间，收分墙体与平顶碉房适应高原。讲空间图式、大经堂、佛塔与高原环境的适应性设计要点。',
    keywords: '藏传佛教设计,藏传寺院设计,曼陀罗,收分墙,平顶碉房,大经堂,佛塔设计,藏传佛教建筑',
    type: 'article',
    staticContent: `
      <header><h1>藏传佛教寺庙设计指南：曼陀罗图式与收分墙</h1></header>
      <main>
        <section><h2>藏传寺院：图式先于形式</h2><p>藏传佛教寺院空间组织核心不是轴线，而是曼陀罗（坛城）图式——以主殿为中心向四方展开，象征宇宙秩序。</p></section>
        <section><h2>一、曼陀罗空间组织</h2><ul><li>主殿（大经堂或扎仓）居构图中心，体量最大</li><li>附属殿堂、僧舍环绕中心，形成聚合式院落</li><li>转经道沿建筑外围或山体设置，形成礼佛环线</li></ul></section>
        <section><h2>二、收分墙体与平顶碉房</h2><p>高原强风、强紫外与温差大，催生藏式典型语汇：下宽上窄的收分墙体增强稳定，平顶碉房减少风荷，厚墙小窗保温隔热。</p></section>
        <section><h2>三、大经堂的声学与采光</h2><ul><li>大经堂需控制混响时间与语言清晰度</li><li>高侧窗与天窗解决天然采光，避免眩光</li><li>柱网密、跨度大，常采用钢木组合结构</li></ul></section>
        <section><h2>四、佛塔（覆钵式塔）</h2><p>覆钵式塔由塔基、塔身（覆钵）、塔刹（相轮）组成，比例与象征意义须严格遵循仪轨，照明常做竖向分层投光。</p></section>
        <section><h2>相关寺庙设计服务</h2><p>深入了解：<a href="../../service/tibetan-buddhist-temple-design">藏传佛教设计</a>、<a href="../../service/temple-sculpture-design">寺庙造型雕塑设计</a>、<a href="../../service/temple-architecture-design">寺庙建筑设计</a>。</p></section>
      </main>`,
  },
  {
    path: '/tech/theravada-buddhist-temple-design-guide',
    title: '南传佛教寺庙设计指南：重檐大屋顶与干栏构造|寺庙佛教设计',
    description: '南传佛寺以陡峭重檐大屋顶、独立戒堂与干栏式构造为特征，针对湿热气候。讲形制要点与热带适应性设计。',
    keywords: '南传佛教设计,南传佛寺,重檐屋顶,戒堂,干栏式,南传佛教建筑,寺庙建筑设计',
    type: 'article',
    staticContent: `
      <header><h1>南传佛教寺庙设计指南：重檐大屋顶与干栏构造</h1></header>
      <main>
        <section><h2>南传佛寺：热带的轻盈语汇</h2><p>南传佛教主要流行于云南及东南亚，核心特征是陡峭的重檐大屋顶与干栏式构造，一切为应对湿热气候而生。</p></section>
        <section><h2>一、重檐大屋顶</h2><ul><li>高坡度屋顶利于暴雨排流，出檐深远遮挡烈日</li><li>多层重檐形成丰富檐下阴影，降低体感温度</li><li>屋脊檐口常饰金饰与火焰纹，色彩鲜明</li></ul></section>
        <section><h2>二、独立戒堂（波松）</h2><p>戒堂是南传佛寺核心礼制空间，用于比丘受戒与重要法事，通常独立设置、体量精致，四周开窗保证通风。</p></section>
        <section><h2>三、干栏式构造</h2><ul><li>底层架空，防潮通风防虫蛇，常用于僧舍</li><li>主殿亦常抬高基座，减少地面湿气侵蚀</li><li>材料多用本地硬木与竹，注重防腐防虫</li></ul></section>
        <section><h2>四、色彩与装饰</h2><p>南传佛寺善用金、红、白对比，墙面多白或暖黄，屋顶金饰璀璨，与热带植被形成强烈而和谐的色彩关系。</p></section>
        <section><h2>相关寺庙设计服务</h2><p>深入了解：<a href="../../service/theravada-buddhist-temple-design">南传佛教设计</a>、<a href="../../service/temple-architecture-design">寺庙建筑设计</a>。</p></section>
      </main>`,
  },
  {
    path: '/tech/temple-interior-design-guide',
    title: '寺庙室内设计指南：佛殿禅堂经堂的仪轨与陈设|寺庙佛教设计',
    description: '寺庙室内设计统筹佛殿、禅堂、经堂、客堂斋堂的仪轨尺度与声学光环境。讲空间序列、材质选择、礼佛动线与功能分区。',
    keywords: '寺庙室内设计,佛殿设计,禅堂设计,经堂设计,寺庙陈设,寺庙装修,宗教空间室内,寺庙效果图',
    type: 'article',
    staticContent: `
      <header><h1>寺庙室内设计指南：佛殿禅堂经堂的仪轨与陈设</h1></header>
      <main>
        <section><h2>室内：仪轨转化为空间语言</h2><p>寺庙室内设计要在仪轨尺度、声学、光环境三重约束下，把宗教信仰转译为可体验的空间。佛殿的庄严、禅堂的静穆、经堂的肃整各有不同逻辑。</p></section>
        <section><h2>一、佛殿室内：以佛坛为中心</h2><ul><li>佛坛为绝对视觉中心，背景墙强化尊像层次</li><li>礼佛空间地面平整、照度低而均匀，避免眩光</li><li>柱网开间避让主尊礼佛视线，保证中轴对位</li></ul></section>
        <section><h2>二、禅堂：静穆与声学</h2><p>禅堂强调静穆，材料以素木、麻、石哑光质感为主，声学上控制混响，避免空旷回响破坏禅修氛围。</p></section>
        <section><h2>三、经堂与客堂斋堂</h2><ul><li>经堂：经柜布置、诵经席位整齐与采光</li><li>客堂：接待与法务办公，兼顾庄重与实用</li><li>斋堂：过堂用斋的行列秩序与便捷供餐动线</li></ul></section>
        <section><h2>相关寺庙设计服务</h2><p>深入了解：<a href="../../service/temple-interior-design">寺庙室内设计</a>、<a href="../../service/temple-furnishing-design">寺庙软装设计</a>。</p></section>
      </main>`,
  },
  {
    path: '/tech/temple-furnishing-design-guide',
    title: '寺庙软装设计指南：经幡供具与整体陈设规制|寺庙佛教设计',
    description: '寺庙软装涵盖经幡幢幡、供具法器、帷幔坐具、插花供果与节庆陈设。讲陈设规制、色彩材质选择与仪轨依据。',
    keywords: '寺庙软装设计,寺庙陈设,经幡,供具,佛像陈设,寺庙装修,宗教陈设,寺庙软装',
    type: 'article',
    staticContent: `
      <header><h1>寺庙软装设计指南：经幡供具与整体陈设规制</h1></header>
      <main>
        <section><h2>软装：让空间活起来的陈设</h2><p>寺庙软装（陈设）是建筑的第二层皮肤，包含经幡幢幡、供具法器、帷幔坐具、插花供果与节庆场景，既要符合仪轨规制，又要与整体空间调性统一。</p></section>
        <section><h2>一、经幡与幢幡</h2><ul><li>经幡依五色方位悬挂，传递经文与祈愿</li><li>幢幡为殿堂庄严之具，材质纹样与悬挂位次有定式</li><li>汉传多悬幢盖宝盖，藏传多悬经幡胜幢</li></ul></section>
        <section><h2>二、供具与法器</h2><p>供桌、香炉、烛台、供杯、木鱼、引磬等供具法器，其形制材质与摆放位次均依仪轨，供台高度与供品陈列为设计重点。</p></section>
        <section><h2>三、帷幔坐具与节庆陈设</h2><ul><li>佛坛帷幔、柱披以织锦为主，色彩与殿堂等级对应</li><li>禅垫拜垫形制与编排兼顾礼佛与坐禅</li><li>节庆场景陈设需可快速搭建与撤除</li></ul></section>
        <section><h2>相关寺庙设计服务</h2><p>深入了解：<a href="../../service/temple-furnishing-design">寺庙软装设计</a>、<a href="../../service/temple-sculpture-design">寺庙造型雕塑设计</a>。</p></section>
      </main>`,
  },
  {
    path: '/tech/temple-landscape-design-guide',
    title: '寺庙景观设计指南：庭院放生池与香道步道|寺庙佛教设计',
    description: '寺庙景观营造寺院园林、放生池水景、庭院植物与香道步道。讲禅意造景、植物选择原则与礼佛动线的景观组织。',
    keywords: '寺庙景观设计,寺院园林,放生池,香道,禅意景观,寺庙庭院,宗教景观,寺庙绿化',
    type: 'article',
    staticContent: `
      <header><h1>寺庙景观设计指南：庭院放生池与香道步道</h1></header>
      <main>
        <section><h2>寺院园林：禅意在自然中</h2><p>寺庙景观服务于礼佛动线与修行心境，一池一石、一径一木都应是静心与仪轨的延伸。</p></section>
        <section><h2>一、庭院与放生池</h2><ul><li>放生池多居前庭或中庭，水面倒映殿宇增强静穆</li><li>池岸以自然石驳岸为主，忌生硬混凝土直壁</li><li>叠石置石取法自然，忌堆砌对称呆板</li></ul></section>
        <section><h2>二、香道与步道</h2><p>香道是信众礼佛主路径，铺装宜平整防滑、尺度宜人，两侧以乔木形成林荫与仪式感，夜间低位照明保证安全。</p></section>
        <section><h2>三、植物选择原则</h2><ul><li>多用松、柏、银杏、香樟等具文化内涵的树种</li><li>避免易落果、招虫、带刺植物临近礼佛动线</li><li>季相搭配维持全年景观层次</li></ul></section>
        <section><h2>相关寺庙设计服务</h2><p>深入了解：<a href="../../service/temple-landscape-design">寺庙景观设计</a>、<a href="../../service/temple-lighting-design">寺庙灯光设计</a>。</p></section>
      </main>`,
  },
  {
    path: '/tech/temple-ancestral-hall-design-guide',
    title: '祠堂宗祠空间设计指南：三进二井与昭穆位次|寺庙佛教设计',
    description: '祠堂是祭祀先祖、议事家风的复合空间。讲中轴对称、三进二井制、昭穆位次、神主牌位与宗祠功能分区设计要点。',
    keywords: '祠堂设计,宗祠设计,家祠设计,三进二井,昭穆,神主牌位,祠堂装修,宗祠建筑',
    type: 'article',
    staticContent: `
      <header><h1>祠堂宗祠空间设计指南：三进二井与昭穆位次</h1></header>
      <main>
        <section><h2>祠堂：祭祀与家风的复合空间</h2><p>祠堂（宗祠、家祠）是祭祀先祖、议决族事、宣教家风的复合空间，神主牌位供奉的是先祖而非神佛，设计核心是礼制秩序与复合功能。</p></section>
        <section><h2>一、中轴对称与三进二井</h2><ul><li>中轴对称：门屋—享堂—寝堂三进序列</li><li>二井（天井）分隔前后进，解决采光通风并形成仪式节奏</li><li>享堂为祭祖行礼主体，空间高敞、用材隆重</li></ul></section>
        <section><h2>二、昭穆位次：牌位的秩序</h2><p>神主牌位按昭穆之制排列：始祖居中，左昭右穆、父昭子穆，世代递迁。神龛形制高度与开启方式须遵循族规与礼制。</p></section>
        <section><h2>三、复合功能分区</h2><ul><li>祭祀区：享堂与寝堂，庄严肃穆</li><li>议事区：厢房偏厅，用于族事商议与教化</li><li>展示区：匾额、楹联、族谱陈列，传承家风</li></ul></section>
        <section><h2>相关寺庙设计服务</h2><p>深入了解：<a href="../../service/ancestral-hall-space-design">祠堂空间设计</a>、<a href="../../service/temple-architecture-design">寺庙建筑设计</a>。</p></section>
      </main>`,
  },
  {
    path: '/tech/temple-site-selection-guide',
    title: '寺庙选址与风水布局指南：形胜与朝案|寺庙佛教设计',
    description: '寺庙选址讲究形胜、背山面水、左青龙右白虎与朝案呼应。讲传统选址要诀、风水格局与现代场地条件的平衡之道。',
    keywords: '寺庙选址,风水,寺庙规划,形胜,朝案,寺庙风水,寺院选址,宗教建筑规划',
    type: 'article',
    staticContent: `
      <header><h1>寺庙选址与风水布局指南：形胜与朝案</h1></header>
      <main>
        <section><h2>选址：寺院成败的一半</h2><p>寺庙选址决定后续所有设计的边界。传统讲究形胜——背山面水、藏风聚气；当代还要叠加地质、交通、审批与信众可达性。</p></section>
        <section><h2>一、传统风水要诀</h2><ul><li>背倚主山，左右砂山环抱，前方案山朝山呼应</li><li>面水（明堂水），忌直冲风口与反弓水</li><li>左青龙右白虎，地势宜东高西缓、北高南低</li></ul></section>
        <section><h2>二、现代场地条件校验</h2><p>风水格局需落到工程现实：地勘确认地基承载力与边坡稳定，水文确认排水与防洪，交通确认施工便道与信众动线。</p></section>
        <section><h2>三、山地项目的特殊考量</h2><ul><li>先做边坡稳定性评估，再定台地与建筑落位</li><li>台地筑坝与挡墙需与景观一体化设计</li><li>防洪标高须高于历史水位，预留泄洪通道</li></ul></section>
        <section><h2>相关寺庙设计服务</h2><p>深入了解：<a href="../../service/temple-architecture-design">寺庙建筑设计</a>、<a href="../../service/taoist-temple-design">道教宫观设计</a>。</p></section>
      </main>`,
  },
  {
    path: '/tech/temple-design-budget-guide',
    title: '寺庙设计造价与预算指南：从效果图到施工|寺庙佛教设计',
    description: '寺庙项目造价受结构体系、材料工艺、地形与规模影响巨大。讲造价构成、预算编制要点与降本增效的务实策略。',
    keywords: '寺庙造价,寺庙预算,寺庙设计费用,宗教建筑造价,寺庙设计报价,寺庙装修预算,寺庙工程概算',
    type: 'article',
    staticContent: `
      <header><h1>寺庙设计造价与预算指南：从效果图到施工</h1></header>
      <main>
        <section><h2>造价：被形制与工艺决定的数字</h2><p>寺庙造价没有统一单价，它由结构体系、材料工艺、地形条件与规模等级共同决定。同样一座大殿，木构与混凝土仿古造价可能相差数倍。</p></section>
        <section><h2>一、造价的主要构成</h2><ul><li>结构主体：木构>钢木组合>混凝土仿古</li><li>传统工艺：木作、瓦作、彩画、石作，人工占比高</li><li>设备与消防：隐蔽式消防、无障碍、智能化</li><li>景观与灯光：庭院、水景、夜景亮化</li></ul></section>
        <section><h2>二、预算编制要点</h2><p>传统工艺常无对应工程定额，需单独编制工艺说明与单价分析。建议设计阶段同步出物料清单与概算，避免施工阶段大幅超支。</p></section>
        <section><h2>三、降本增效的务实策略</h2><ul><li>新建部分外观保形制、结构用现代材料</li><li>文物部分严格传统工艺，范围从严控制</li><li>关键工艺先打样，避免大面积返工</li><li>分批建设，优先完成礼佛核心区</li></ul></section>
        <section><h2>相关寺庙设计服务</h2><p>深入了解：<a href="../../service/temple-architecture-design">寺庙建筑设计</a>、<a href="../../service/temple-interior-design">寺庙室内设计</a>。</p></section>
      </main>`,
  },
  {
    path: '/art',
    title: '营造实录-寺庙设计案例赏析|寺院营造实录|寺庙佛教设计',
    description: '寺庙佛教设计营造实录栏目，精选寺庙设计与寺院营造案例：汉传寺院、道教宫观、藏传佛殿、南传佛寺的建筑、室内、景观与灯光实录，展示宗教空间营造的专业水准。',
    keywords: '寺庙设计案例,寺院营造实录,寺庙建筑案例,宗教建筑赏析,汉传寺院案例,道教宫观案例,藏传佛殿案例,南传佛寺案例,寺庙室内案例,寺庙景观案例',
    type: 'website',
    staticContent: `
      <header><h1>营造实录 - 寺庙设计案例赏析</h1></header>
      <main>
        <section>
          <h2>寺庙设计案例库</h2>
          <p>寺庙佛教设计精选寺庙设计与寺院营造实录，涵盖汉传佛教寺院、道教宫观、藏传佛殿、南传佛寺等多个体系，以及建筑、室内、景观、造像、灯光等专业板块，为筹建方与设计从业者提供专业参考。</p>
        </section>
        <section>
          <h2>精选营造实录</h2>
          <ul>
            <li><strong>汉传寺院整体营造</strong> - 依伽蓝七堂制规划，中轴院落序列与木构大殿营造实录。</li>
            <li><strong>道教宫观山地营造</strong> - 因山就势的台地处理、斋醮坛场与风水格局实践。</li>
            <li><strong>藏传佛殿营造</strong> - 曼陀罗空间组织、收分墙体与大经堂声学处理。</li>
            <li><strong>南传佛寺营造</strong> - 重檐大屋顶、独立戒堂与干栏式僧舍的热带实践。</li>
            <li><strong>寺院夜景照明实录</strong> - 见光不见灯的寺庙亮化，1800K-2400K暖色温与古建零损伤安装。</li>
            <li><strong>造像与陈设实录</strong> - 依造像量度经校核的佛像造像，以及经幡供具的整体陈设。</li>
          </ul>
        </section>
      </main>`,
  },
  {
    path: '/interview',
    title: '筹建方访谈-寺庙设计项目专访|寺院营造经验|寺庙佛教设计',
    description: '寺庙佛教设计筹建方访谈栏目，分享寺庙设计项目的真实反馈与营造经验。汉传寺院、道教宫观、藏传佛殿、南传佛寺筹建方专访，了解寺庙设计的实际价值。',
    keywords: '寺庙设计访谈,寺院筹建经验,寺庙设计案例,客户反馈,寺院营造访谈,宗教建筑设计评价,寺庙设计价值,筹建方专访,寺庙设计评价,寺院建设经验',
    type: 'website',
    staticContent: `
      <header><h1>筹建方访谈 - 寺庙设计项目专访</h1></header>
      <main>
        <section>
          <h2>真实筹建方声音</h2>
          <p>寺庙佛教设计深入采访多位寺庙设计项目的筹建方与寺院管理者，分享他们从形制研究、方案沟通到项目落地的完整体验，以及专业设计为宗教空间带来的实际价值。</p>
        </section>
        <section>
          <h2>访谈实录</h2>
          <ul>
            <li><strong>汉传寺院筹建方专访</strong> - 分享伽蓝七堂制规划与现代消防规范融合的实践历程。</li>
            <li><strong>道教宫观筹建访谈</strong> - 讲述山地宫观如何因山就势，同时解决边坡与施工难题。</li>
            <li><strong>藏传佛殿筹建访谈</strong> - 高原环境下大经堂的保温、抗风与声学处理经验。</li>
            <li><strong>寺院照明改造专访</strong> - 如何通过见光不见灯的照明让夜间的殿宇更显庄严。</li>
          </ul>
        </section>
      </main>`,
  },
  {
    path: '/workflow',
    title: '服务流程-寺庙设计实施步骤|专业寺庙设计流程|寺庙佛教设计',
    description: '寺庙佛教设计寺庙设计服务流程详解：需求沟通→形制研究→概念方案→深化设计→施工配合→竣工验收。六步标准化流程确保每个项目高品质交付。',
    keywords: '寺庙设计流程,寺院设计步骤,寺庙设计服务,宗教建筑设计流程,寺庙设计实施,寺庙效果图,寺庙施工图,寺庙施工配合,寺庙验收标准,寺庙设计沟通',
    type: 'website',
    staticContent: `
      <header><h1>服务流程 - 寺庙设计实施步骤</h1></header>
      <main>
        <section>
          <h2>六步标准化设计流程</h2>
          <p>寺庙佛教设计采用六步标准化寺庙设计服务流程，从需求沟通到竣工验收，确保每个项目高品质交付。相比一般建筑设计，寺庙设计多了「形制研究」这一步，这是保证形制纯正的关键。</p>
        </section>
        <section>
          <h2>第一步：需求沟通</h2>
          <p>了解宗派归属、形制依据、场地条件、使用需求与预算范围。收集地形图、现状照片与相关仪轨要求，明确审批进度与工期安排。</p>
        </section>
        <section>
          <h2>第二步：形制研究</h2>
          <p>确定宗派形制体系与法度依据，进行营造法式材分推算，明确屋顶等级、开间进深、斗拱层数等关键参数，并核对造像量度与陈设仪轨。</p>
        </section>
        <section>
          <h2>第三步：概念方案</h2>
          <p>提供总体规划与单体概念方案，包含总平面布局、礼佛动线、建筑造型与效果图，同步说明消防、无障碍与设备整合策略。</p>
        </section>
        <section>
          <h2>第四步：深化设计</h2>
          <p>输出施工图、构造大样（斗拱、举折、翼角、瓦作、彩画地仗）、材料工艺说明、物料清单与工程预算，明确结构体系与设备方案。</p>
        </section>
        <section>
          <h2>第五步：施工配合</h2>
          <p>施工图交底、关键工艺打样确认、现场技术指导。木作、瓦作、彩画、石作等重要工艺均先打样后施工，确保最终呈现符合设计意图。</p>
        </section>
        <section>
          <h2>第六步：竣工验收</h2>
          <p>效果验收、运维方案与物料清单交付，提供完整的维护手册与陈设更换周期建议。</p>
        </section>
      </main>`,
  },
  ...SERVICE_CATEGORY_ROUTES,
];

// 为每个路由生成 HTML 文件
function generateRouteHTML(template, route) {
  const { path, title, description, keywords, type, staticContent, faq } = route;
  const fullUrl = `${BASE_URL}${path}`;
  const fullTitle = title;

  // 构建结构化数据
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '寺庙佛教设计',
    alternateName: 'ZENSPACE DESIGN',
    description: '专业寺庙设计机构，专注汉传佛教设计、道教宫观设计、藏传佛教设计、南传佛教设计、寺庙建筑设计、寺庙室内设计、寺庙软装设计、寺庙造型雕塑设计、寺庙景观设计、寺庙灯光设计',
    url: BASE_URL,
    areaServed: [
      { '@type': 'Country', name: '中国' }
    ],
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '寺庙设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '汉传佛教设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '道教宫观设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '藏传佛教设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '南传佛教设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '寺庙建筑设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '寺庙室内设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '寺庙软装设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '寺庙造型雕塑设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '寺庙景观设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '寺庙灯光设计' } }
    ]
  };

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebPage',
    name: title,
    description,
    url: fullUrl,
    publisher: {
      '@type': 'Organization',
      name: '寺庙佛教设计',
      alternateName: 'ZENSPACE DESIGN'
    }
  };

  // FAQ 结构化数据
  const faqLd = faq && faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  } : null;

  // LocalBusiness 结构化数据（仅首页）
  const localBusinessLd = path === '/' ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '寺庙佛教设计 ZENSPACE DESIGN',
    description: '专业寺庙设计机构，专注汉传佛教设计、道教宫观设计、藏传佛教设计、南传佛教设计、寺庙建筑设计、寺庙室内设计、寺庙软装设计、寺庙造型雕塑设计、寺庙景观设计、寺庙灯光设计',
    url: BASE_URL,
    areaServed: '中国',
    priceRange: '项目定制报价',
    '@id': BASE_URL
  } : null;

  // 组装所有结构化数据
  const allLd = [orgLd, webPageLd];
  if (faqLd) allLd.push(faqLd);
  if (localBusinessLd) allLd.push(localBusinessLd);

  // 生成完整 HTML
  let html = template;

  // 替换 title
  html = html.replace(/<title>.*?<\/title>/, `<title>${fullTitle}</title>`);

  // 替换 description
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"/, `<meta name="description" content="${description}"`);

  // 替换 keywords
  html = html.replace(/<meta\s+name="keywords"\s+content="[^"]*"/, `<meta name="keywords" content="${keywords}"`);

  // 替换 canonical
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"/, `<link rel="canonical" href="${fullUrl}"`);

  // 替换 mobile-agent
  html = html.replace(/<meta\s+name="mobile-agent"\s+content="[^"]*"/, `<meta name="mobile-agent" content="format=html5;url=${fullUrl}"`);

  // 替换 OG 标签
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"/, `<meta property="og:title" content="${fullTitle}"`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"/, `<meta property="og:description" content="${description}"`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"/, `<meta property="og:url" content="${fullUrl}"`);

  // 替换 JSON-LD 结构化数据（找到第一个 JSON-LD 块并替换为全部）
  const firstLdMatch = html.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/);
  if (firstLdMatch) {
    const allLdHtml = allLd.map(ld => `<script type="application/ld+json">${JSON.stringify(ld)}</script>`).join('\n    ');
    // 替换所有现有的 JSON-LD 块
    html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '');
    // 在 </head> 前插入
    html = html.replace('</head>', `    ${allLdHtml}\n  </head>`);
  }

  // 替换 #root 内的静态内容
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${staticContent}</div>`);

  return html;
}

// 主函数
function main() {
  console.log('[prerender] 开始预渲染...');
  const template = readTemplate();
  let count = 0;

  for (const route of ROUTES) {
    const html = generateRouteHTML(template, route);
    const routeDir = route.path === '/' ? DIST_DIR : join(DIST_DIR, route.path);

    if (!existsSync(routeDir)) {
      mkdirSync(routeDir, { recursive: true });
    }

    const outputPath = join(routeDir, 'index.html');
    writeFileSync(outputPath, html, 'utf-8');
    count++;
    console.log(`[prerender] 已生成: ${route.path} → ${route.path === '/' ? 'index.html' : route.path + '/index.html'}`);
  }

  console.log(`[prerender] 完成！共生成 ${count} 个静态 HTML 页面`);
  console.log('[prerender] 百度Baiduspider现在可以抓取所有页面的完整内容');
}

main();
