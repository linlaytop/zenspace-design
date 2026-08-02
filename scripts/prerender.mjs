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
const BASE_URL = 'https://lumos-design.cn';

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
    title: '光影大师-户外灯光设计|文旅光影创新|酒店外观灯光|展厅灯光设计',
    description: '光影大师专注高端户外灯光设计与夜景照明，提供文旅光影创新、水幕灯光秀、酒店外观灯光、展厅灯光设计、办公楼灯光设计、园林景观灯光、别墅私定灯光、度假村灯光设计、会所灯光设计、博物馆灯光、餐饮灯光、水疗光影、KTV灯光设计、发光路面、灯光装置艺术等专业方案。定制化专业灯光设计服务，服务中国与马来西亚市场。',
    keywords: '户外灯光设计,夜景照明设计,文旅光影创新,文旅光影设计,文旅夜游策划,古建照明设计,水幕灯光秀,酒店外观灯光,展厅设计,展厅灯光设计,办公楼灯光设计,园林景观灯光,别墅私定灯光,度假村灯光设计,会所灯光设计,博物馆灯光,餐饮灯光,水疗光影,KTV灯光设计,发光路面,灯光装置艺术,灯光秀设计,景区亮化工程,建筑夜景照明,LED户外照明,灯光设计公司,亮化工程设计',
    type: 'website',
    staticContent: `
      <header>
        <h1>光影大师 | LUMOS DESIGN — 高端户外灯光设计公司</h1>
        <p>户外灯光设计 · 夜景照明设计 · 文旅光影创新 · 文旅光影设计 · 古建照明专家 · 酒店外观灯光 · 展厅灯光设计</p>
      </header>
      <main>
        <section>
          <h2>灯光设计 5.0 体系</h2>
          <p>我们以客户需求为导向，以灯光创新为源泉，以光影赋能商业流量、激活区域经济为核心，迭代推出灯光设计 5.0 体系，彻底摒弃仅满足基础照明的落后设计思维。</p>
          <p>灯光设计迭代划分：1.0 基础照明，仅实现空间可视；2.0 装饰亮化，侧重外观美化；3.0 氛围营造，塑造空间情绪；4.0 演艺光影，打造沉浸式视觉展演；5.0 流量型光影生态，融合文化叙事、交互体验与商业价值，让光影成为驱动产业发展的核心载体。</p>
          <p>我们深耕全域光影创意研发，在文旅光影创新、水幕灯光秀、酒店外观灯光、展厅灯光设计、办公楼灯光设计、园林景观灯光、别墅私定灯光、度假村灯光设计、会所灯光设计、博物馆灯光、餐饮灯光、水疗光影、KTV灯光设计、发光路面、灯光装置艺术等领域提供系统化解决方案。</p>
        </section>
        <section>
          <h2>核心灯光设计业务</h2>
          <ul>
            <li><strong>文旅光影创新</strong> - 文旅光影设计、景区夜游方案、沉浸式交互光影体验、水幕灯光秀、灯光装置艺术</li>
            <li><strong>古建照明设计</strong> - 历史建筑保护性亮化、古塔寺庙灯光方案、零损伤安装</li>
            <li><strong>酒店外观灯光</strong> - 酒店外墙照明、酒店夜景照明、建筑立面照明</li>
            <li><strong>展厅灯光设计</strong> - 展厅设计、展馆照明、博物馆灯光、展览空间灯光</li>
            <li><strong>办公楼灯光设计</strong> - 商业建筑亮化、写字楼外墙灯光、办公楼立面照明</li>
            <li><strong>园林景观灯光</strong> - 度假村灯光设计、民宿照明方案、会所灯光设计</li>
            <li><strong>别墅私定灯光</strong> - 高端别墅灯光、私宅灯光设计、豪宅夜景照明</li>
            <li><strong>餐饮灯光与水疗光影</strong> - 餐饮空间灯光、餐厅灯光设计、水疗灯光、SPA照明</li>
            <li><strong>KTV灯光设计</strong> - 娱乐场所灯光、派对房灯光、KTV智能照明</li>
            <li><strong>发光路面与灯光装置艺术</strong> - 荧光步道、星光跑道、互动灯光装置、灯光雕塑</li>
          </ul>
        </section>
        <section>
          <h2>国际及国内灯光标准</h2>
          <p>光影大师严格遵循国际及国内灯光标准，包括 IEC 60598-2-5 户外灯具安全、CIE 150 眩光控制、GB 50034《建筑照明设计标准》、JGJ/T 163《城市夜景照明设计规范》、GB 7000.1 灯具一般安全要求等。在文旅光影创新、酒店外观灯光、展厅灯光设计、办公楼灯光设计、园林景观灯光、别墅私定灯光、度假村灯光设计、会所灯光设计、博物馆灯光、餐饮灯光、水疗光影、KTV灯光设计、发光路面、灯光装置艺术等项目中，从设计到落地全流程对标标准，确保合规、安全与节能。</p>
        </section>
        <section>
          <h2>灯光设计服务流程</h2>
          <ol>
            <li>需求沟通 - 了解项目需求、场地条件和设计风格</li>
            <li>概念方案 - 提供灯光设计概念图和效果图</li>
            <li>深化设计 - 灯位布置图、控制系统方案、灯具选型</li>
            <li>施工配合 - 施工图交底、现场调试指导</li>
            <li>竣工验收 - 灯光效果验收、运维方案交付</li>
          </ol>
        </section>
        <section>
          <h2>为什么选择光影大师</h2>
          <p>光影大师（LUMOS DESIGN）拥有丰富的户外灯光设计经验，服务范围覆盖中国和马来西亚。我们注重原创设计，在文旅光影创新、酒店外观灯光、展厅灯光设计、办公楼灯光设计、园林景观灯光、别墅私定灯光、度假村灯光设计、会所灯光设计、博物馆灯光、餐饮灯光、水疗光影、KTV灯光设计、发光路面、灯光装置艺术等领域提供量身定制方案。每个项目都结合DMX512智能控制系统和LED节能技术，严格遵循国际及国内灯光标准，打造既美观又节能的夜景照明效果。</p>
        </section>
        <section>
          <h2>服务区域</h2>
          <p>光影大师服务覆盖：上海户外灯光设计、北京夜景照明、深圳灯光设计公司、广州亮化工程、成都别墅私定灯光设计、杭州园林景观灯光、三亚度假村灯光设计、西安古建照明、张家界文旅光影创新、南京博物馆灯光、酒店外观灯光、展厅灯光设计、办公楼灯光设计、会所灯光设计、餐饮灯光、水疗光影、KTV灯光设计、发光路面、灯光装置艺术等城市与专业领域。同时服务马来西亚吉隆坡、槟城等东南亚市场。</p>
        </section>
        <section>
          <h2>常见问题</h2>
          <h3>灯光设计收费标准是什么？</h3>
          <p>光影大师提供专业灯光设计效果图服务，项目报价根据规模、难度与灯具选型综合评估。覆盖文旅光影创新、酒店外观灯光、展厅灯光设计、办公楼灯光设计、园林景观灯光、别墅私定灯光、度假村灯光设计、会所灯光设计、博物馆灯光、餐饮灯光、水疗光影、KTV灯光设计、发光路面、灯光装置艺术等专业领域。</p>
          <h3>古建照明会不会损伤文物？</h3>
          <p>我们采用专利非破坏性张力抱箍进行承载，选择不含紫外、蓝光波谱窄幅高饱色温LED，确保对古建彩绘和榫卯木作零损伤，严格遵循国际及国内灯光标准。</p>
          <h3>文旅夜游策划需要多长时间？</h3>
          <p>一般文旅光影创新、文旅光影设计、水幕灯光秀等夜游项目从概念方案到落地实施需要2-6个月，具体视项目规模和复杂度而定。</p>
        </section>
      </main>`,
    faq: [
      { q: '灯光设计收费标准是什么？', a: '光影大师提供专业灯光设计效果图服务，项目报价根据规模、难度与灯具选型综合评估。覆盖文旅光影创新、酒店外观灯光、展厅灯光设计、办公楼灯光设计、园林景观灯光、别墅私定灯光、度假村灯光设计、会所灯光设计、博物馆灯光、餐饮灯光、水疗光影、KTV灯光设计、发光路面、灯光装置艺术等专业领域。' },
      { q: '古建照明会不会损伤文物？', a: '我们采用专利非破坏性张力抱箍进行承载，选择不含紫外、蓝光波谱窄幅高饱色温LED，确保对古建彩绘和榫卯木作零损伤，严格遵循国际及国内灯光标准。' },
      { q: '文旅夜游策划需要多长时间？', a: '一般文旅光影创新、文旅光影设计、水幕灯光秀等夜游项目从概念方案到落地实施需要2-6个月，具体视项目规模和复杂度而定。' },
      { q: '服务范围覆盖哪些城市？', a: '覆盖上海、北京、深圳、广州、成都、杭州、三亚、西安等全国城市，同时服务马来西亚吉隆坡、槟城等东南亚市场。' }
    ]
  },
  {
    path: '/tech',
    title: '技术专栏-户外灯光设计技术指南|光影大师',
    description: '光影大师技术专栏，分享户外灯光设计专业技术知识：古建照明指南、文旅夜游趋势、DMX512协议解析、LED灯具选型、Dialux照度计算等实用技术文章。',
    keywords: '灯光设计技术,古建照明指南,文旅夜游趋势,DMX512协议,LED灯具选型,Dialux照度计算,亮化工程技术,照明设计规范,灯光控制系统,户外照明标准',
    type: 'website',
    staticContent: `
      <header><h1>技术专栏 - 户外灯光设计技术指南</h1></header>
      <main>
        <section>
          <h2>灯光设计专业技术文章</h2>
          <p>光影大师技术专栏汇聚户外灯光设计领域的专业知识和实战经验，涵盖古建照明、文旅夜游、DMX512控制协议、LED灯具选型、Dialux照度计算等核心技术话题。</p>
        </section>
        <section>
          <h2>热门技术文章</h2>
          <ul>
            <li><strong>古建照明设计完整指南：从勘测到验收</strong> - 详细介绍古建照明设计的完整流程，包括前期勘测、方案设计、灯具选型、施工安装及验收标准。</li>
            <li><strong>文旅夜游策划趋势：2026年最值得关注的5个方向</strong> - 分析文旅夜游策划的5大趋势，帮助景区业主把握未来方向。</li>
            <li><strong>DMX512协议完全指南</strong> - 从基础概念到实际接线、编程调试，全面解析灯光控制核心技术。</li>
          </ul>
        </section>
        <section>
          <h2>技术专题</h2>
          <h3>古建照明技术</h3>
          <p>古建照明设计需要在文物保护与夜景效果之间找到精妙平衡。核心原则包括"见光不见灯"、零损伤安装、超低蓝光辐射等。</p>
          <h3>文旅夜游技术</h3>
          <p>沉浸式叙事体验、雷达红外交互、3D激光投影、林间薄雾绕光系统等新一代夜游技术解析。</p>
          <h3>灯光控制协议</h3>
          <p>DMX512、Art-Net、KNX、DALI等主流灯光控制协议的技术对比和选型指南。</p>
        </section>
      </main>`,
  },
  {
    path: '/tech/ancient-building-lighting-guide',
    title: '古建照明设计完整指南：从勘测到验收|光影大师',
    description: '详细介绍古建照明设计的完整流程，包括前期勘测、方案设计、灯具选型、施工安装及验收标准。涵盖文物保护原则、见光不见灯技术、零损伤安装方案。',
    keywords: '古建照明设计,古建筑灯光,文物保护照明,古建亮化,见光不见灯,古塔照明,寺庙灯光设计,历史建筑照明,古建灯具选型,零损伤安装',
    type: 'article',
    staticContent: `
      <header><h1>古建照明设计完整指南：从勘测到验收</h1></header>
      <main>
        <section>
          <h2>前言</h2>
          <p>古建筑是历史的见证，而照明设计则是让这些历史建筑在夜晚"活"起来的魔法。然而，古建照明设计并非简单的"照亮"，它需要在文物保护与夜景效果之间找到精妙的平衡。</p>
          <p>本文将从实战角度出发，为业主和设计师提供一份完整的古建照明设计指南。</p>
        </section>
        <section>
          <h2>一、前期勘测（最关键的一步）</h2>
          <h3>1.1 建筑历史价值评估</h3>
          <p>确定建筑的文物保护等级（国家级/省级/市级），不同保护等级对应不同的照明设计限制，避免因设计不当造成不可逆的文物损害。</p>
          <p>评估内容包括：查阅建筑档案、拍摄建筑现状照片、咨询文物专家意见。</p>
          <blockquote>古建照明设计的第一原则：文物保护优先于夜景效果。任何设计都不能以牺牲文物安全为代价。</blockquote>
        </section>
        <section>
          <h2>二、方案设计核心原则</h2>
          <h3>2.1 "见光不见灯"原则</h3>
          <p>使用隐藏式安装（灯具嵌入建筑结构、地面、周边景观），利用间接照明（洗墙、泛光、反射），避免直接使用裸露的点光源。</p>
          <h3>2.2 色温选择</h3>
          <p>古建照明推荐使用1800K-2400K暖古铜色温，营造庄严、古朴的夜间氛围。避免使用高色温冷白光，会破坏古建的历史感。</p>
          <h3>2.3 零损伤安装技术</h3>
          <p>采用专利防腐无痕重力抱箍，杜绝古木打孔破坏。2200K超低蓝光辐射，保障漆面、彩画不受紫外损伤。</p>
        </section>
        <section>
          <h2>三、灯具选型要点</h2>
          <ul>
            <li>选择无UV/IR辐射的LED光源</li>
            <li>显色指数Ra≥95，还原建筑本色</li>
            <li>防水等级IP65以上</li>
            <li>微棱镜透镜防眩设计</li>
            <li>DALI/Zigbee无线控制，免布线扰动</li>
          </ul>
        </section>
        <section>
          <h2>四、施工安装与验收</h2>
          <p>施工阶段需严格按照设计方案执行，所有灯具安装不得对古建结构造成任何损伤。验收标准包括：照度均匀度、色温一致性、防眩光效果、控制系统稳定性等。</p>
        </section>
      </main>`,
  },
  {
    path: '/tech/resort-lighting-design-trends',
    title: '文旅夜游策划趋势2026-最值得关注的5个方向|光影大师',
    description: '文旅夜游已成为景区引流核心手段。本文分析2026年文旅夜游策划5大趋势：沉浸式叙事、雷达交互、3D投影、生态暗天空、智能物联，帮助景区业主把握方向。',
    keywords: '文旅夜游策划,夜游趋势,沉浸式光影,景区灯光设计,夜游经济,主题公园照明,古镇夜游,灯光秀策划,文旅照明设计,夜间旅游',
    type: 'article',
    staticContent: `
      <header><h1>文旅夜游策划趋势：2026年最值得关注的5个方向</h1></header>
      <main>
        <section>
          <h2>引言</h2>
          <p>随着"夜间经济"的兴起，文旅夜游已成为景区、主题公园、古镇古城引流的核心手段。根据文化和旅游部数据，2025年夜间旅游人次已占总旅游人次的42%，夜间旅游收入占比超过55%。</p>
        </section>
        <section>
          <h2>趋势一：沉浸式叙事体验</h2>
          <p>传统夜游只有灯光，没有故事。新一代夜游让游客"走入"一个故事，而不是"观看"一场灯展。让游客从"旁观者"变成"参与者"，是文旅夜游策划的核心转变。</p>
        </section>
        <section>
          <h2>趋势二：雷达红外交互技术</h2>
          <p>雷达红外体感捕捉技术支持人行轨迹光效毫秒响应，当游客踏入林中，斑斓光斑如林中蝴蝶振翅，打造沉浸式交互光影体验。</p>
        </section>
        <section>
          <h2>趋势三：3D投影mapping</h2>
          <p>高精准多机融合3D投影校正技术，以城市地标、山体湖泊、建筑外立面为画布，融合高功率激光呈现时空叙事感的多维度数字媒体光电艺术秀场。</p>
        </section>
        <section>
          <h2>趋势四：暗天空生态保护</h2>
          <p>DarkSky暗天空保护标准日益受到重视。全场采用下照式灯具，杜绝天空漫射，保护夜间生态环境，实现旅游开发与自然保护双赢。</p>
        </section>
        <section>
          <h2>趋势五：智能物联控制</h2>
          <p>NB-IoT/Lora广域自组网物联网控制技术，实现大规模灯光设备的智能调度、节能管理和远程运维，大幅降低运营成本。</p>
        </section>
      </main>`,
  },
  {
    path: '/tech/dmx512-protocol-guide',
    title: 'DMX512协议完全指南-灯光控制技术详解|光影大师',
    description: 'DMX512灯光控制协议全面解析：基础概念、接线方式、地址设置、编程调试、Art-Net扩展。适合灯光工程师和设计技术人员学习参考。',
    keywords: 'DMX512协议,灯光控制,Art-Net,灯光编程,舞台灯光控制,建筑照明控制,DMX接线,灯光总线,智能照明,控制系统调试',
    type: 'article',
    staticContent: `
      <header><h1>DMX512协议完全指南：灯光控制核心技术详解</h1></header>
      <main>
        <section>
          <h2>什么是DMX512协议</h2>
          <p>DMX512（Digital MultipleX 512）是灯光控制领域的国际标准协议，最初为舞台灯光设计，现已广泛应用于建筑照明、户外亮化、文旅夜游等项目。</p>
        </section>
        <section>
          <h2>DMX512基础概念</h2>
          <p>一个DMX512信号链路最多可控制512个通道。每个通道可设置0-255共256个亮度等级。一盏RGB灯具通常占用3个通道（红、绿、蓝），RGBW灯具占用4个通道。</p>
        </section>
        <section>
          <h2>接线方式</h2>
          <p>DMX512使用RS-485差分信号传输，采用3针或5针XLR接口。布线需采用菊花链拓扑结构，终端需安装120欧姆终端电阻。最大传输距离1200米。</p>
        </section>
        <section>
          <h2>地址设置</h2>
          <p>每盏灯具需要设置唯一的DMX起始地址。例如第一盏RGB灯地址设为1（占用1-3通道），第二盏设为4（占用4-6通道），以此类推。</p>
        </section>
        <section>
          <h2>Art-Net扩展</h2>
          <p>Art-Net是基于以太网的DMX传输协议，突破512通道限制，支持多universe控制，适合大型灯光秀和建筑媒体立面项目。</p>
        </section>
        <section>
          <h2>实际应用场景</h2>
          <ul>
            <li>建筑外墙灯光动态控制</li>
            <li>文旅夜游灯光秀编程</li>
            <li>水幕灯光秀同步控制</li>
            <li>KTV/会所氛围灯光</li>
            <li>灯光装置艺术互动</li>
          </ul>
        </section>
      </main>`,
  },
  {
    path: '/art',
    title: '环球艺术创造力-全球夜景地标赏析|光影大师',
    description: '光影大师环球艺术创造力栏目，精选全球高端夜景地标案例：上海黄浦江灯光秀、三亚水幕秀、张家界沉浸式夜游、西安古建照明等，展示世界级灯光设计艺术。',
    keywords: '夜景地标,灯光艺术案例,全球灯光设计,夜景赏析,灯光秀案例,建筑照明案例,文旅灯光,亮化工程案例,灯光设计作品,户外照明案例',
    type: 'website',
    staticContent: `
      <header><h1>环球艺术创造力 - 全球夜景地标赏析</h1></header>
      <main>
        <section>
          <h2>世界级灯光设计案例库</h2>
          <p>光影大师精选全球高端夜景地标案例，涵盖文旅夜游、灯光秀、水幕秀、酒店照明、古建亮化、园林景观、别墅灯光等多个领域，为业主和设计师提供灵感参考。</p>
        </section>
        <section>
          <h2>精选案例</h2>
          <ul>
            <li><strong>《九歌·密林寻踪》大型沉浸式野奢夜游</strong> - 中国张家界森林核心体验区，雷达红外体感捕捉+全彩激光+地面体感LED灯带群控。</li>
            <li><strong>《光影新纪元》地标水幕灯光秀</strong> - 中国上海黄浦江地标高空，320,000流明+36组全彩激光+12,280 DMX通道。</li>
            <li><strong>《海湾交响》梦幻水幕激光秀</strong> - 中国三亚海棠湾国际度假区，120米宽40米高多级扇形水幕+30,000流明工程激光器。</li>
            <li><strong>安缦之韵野奢度假酒店</strong> - 中国云南香格里拉，全屋微型擦墙透镜+定制柔韧地表埋地灯，UGR<12极致防眩。</li>
            <li><strong>千禧重楼飞檐景观夜照</strong> - 中国西安历史文化轴心，142套全抱箍零损伤安装，平均照度15Lx极其克制。</li>
            <li><strong>《银河归途》顶级私宅千米步道</strong> - 中国杭州西湖畔，1,200颗超微型埋地灯+光纤碎石灯，PIR智能感应78%节能。</li>
          </ul>
        </section>
      </main>`,
  },
  {
    path: '/interview',
    title: '业主采访-高端灯光设计案例专访|光影大师',
    description: '光影大师业主采访栏目，分享高端灯光设计项目的真实业主反馈和使用体验。别墅、酒店、度假村、文旅景区业主专访，了解灯光设计带来的实际价值。',
    keywords: '业主采访,灯光设计案例,客户反馈,别墅灯光体验,酒店照明评价,度假村灯光,文旅夜游反馈,灯光设计价值,高端照明案例,业主专访',
    type: 'website',
    staticContent: `
      <header><h1>业主采访 - 高端灯光设计案例专访</h1></header>
      <main>
        <section>
          <h2>真实业主声音</h2>
          <p>光影大师深入采访多位高端灯光设计项目的业主，分享他们从设计沟通到项目落地的完整体验，以及灯光设计为物业带来的实际价值提升。</p>
        </section>
        <section>
          <h2>采访案例</h2>
          <ul>
            <li><strong>三亚悬崖别墅业主专访</strong> - 分享现代悬崖观海庄园的灯光设计历程，12组尊享一键智控场景如何改变生活方式。</li>
            <li><strong>香格里拉度假酒店业主访谈</strong> - 讲述安缦之韵野奢度假酒店如何通过灯光设计实现38%节能与极致静谧氛围。</li>
            <li><strong>杭州私宅业主采访</strong> - 千米星光步道如何让夜归之路变成一场银河漫步的浪漫体验。</li>
            <li><strong>上海滨江会所业主专访</strong> - 《流夜星海》极奢会所中庭光环境如何提升社交体验和物业价值。</li>
          </ul>
        </section>
      </main>`,
  },
  {
    path: '/workflow',
    title: '服务流程-专业灯光设计实施步骤|光影大师',
    description: '光影大师灯光设计服务流程详解：需求沟通→概念方案→深化设计→施工配合→竣工验收。五步标准化流程确保每个项目高品质交付，专业灯光设计效果图。',
    keywords: '灯光设计流程,照明设计步骤,灯光设计服务,亮化工程流程,设计实施方案,灯光效果图,施工图设计,验收标准,设计沟通,项目管理',
    type: 'website',
    staticContent: `
      <header><h1>服务流程 - 专业灯光设计实施步骤</h1></header>
      <main>
        <section>
          <h2>五步标准化设计流程</h2>
          <p>光影大师采用五步标准化灯光设计服务流程，从需求沟通到竣工验收，确保每个项目高品质交付。</p>
        </section>
        <section>
          <h2>第一步：需求沟通</h2>
          <p>了解项目需求、场地条件和设计风格偏好。收集建筑图纸、现场照片，明确预算范围和工期要求。</p>
        </section>
        <section>
          <h2>第二步：概念方案</h2>
          <p>提供灯光设计概念图和效果图，包含整体照明策略、色温规划、灯具布局示意和夜景效果预览。</p>
        </section>
        <section>
          <h2>第三步：深化设计</h2>
          <p>输出灯位布置图、控制系统方案、灯具选型清单和Dialux照度计算报告。明确DMX512/KNX/DALI控制架构。</p>
        </section>
        <section>
          <h2>第四步：施工配合</h2>
          <p>施工图交底、现场调试指导。确保灯具安装位置、角度和亮度符合设计方案要求。</p>
        </section>
        <section>
          <h2>第五步：竣工验收</h2>
          <p>灯光效果验收、运维方案交付。提供完整的灯光控制编程文件和维护手册。</p>
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
    name: '光影大师',
    alternateName: 'LUMOS DESIGN',
    description: '高端户外灯光设计公司，专注文旅光影创新、文旅光影设计、水幕灯光秀、酒店外观灯光、展厅灯光设计、办公楼灯光设计、园林景观灯光、别墅私定灯光、度假村灯光设计、会所灯光设计、博物馆灯光、餐饮灯光、水疗光影、KTV灯光设计、发光路面、灯光装置艺术',
    url: BASE_URL,
    areaServed: [
      { '@type': 'Country', name: '中国' },
      { '@type': 'Country', name: '马来西亚' }
    ],
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '户外灯光设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '夜景照明设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '文旅光影创新' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '文旅光影设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '水幕灯光秀' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '酒店外观灯光' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '展厅灯光设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '办公楼灯光设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '园林景观灯光' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '别墅私定灯光' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '度假村灯光设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '会所灯光设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '博物馆灯光' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '餐饮灯光' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '水疗光影' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'KTV灯光设计' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '发光路面' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '灯光装置艺术' } }
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
      name: '光影大师',
      alternateName: 'LUMOS DESIGN'
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
    name: '光影大师 LUMOS DESIGN',
    description: '高端户外灯光设计公司，专注文旅光影创新、酒店外观灯光、展厅灯光设计、水幕灯光秀、园林景观灯光、别墅私定灯光、度假村灯光设计、会所灯光设计、博物馆灯光、餐饮灯光、水疗光影、KTV灯光设计、发光路面、灯光装置艺术',
    url: BASE_URL,
    areaServed: '中国及马来西亚',
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
