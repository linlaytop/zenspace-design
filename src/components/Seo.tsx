import { Helmet } from 'react-helmet-async';

interface FaqItem {
  q: string;
  a: string;
}

interface SeoProps {
  title: string;
  description: string;
  keywords: string;
  path?: string;
  type?: 'website' | 'article';
  image?: string;
  breadcrumb?: { name: string; path: string }[];
  faq?: FaqItem[];
}

const BASE_URL = 'https://lumos-design.cn'; // 部署后替换为实际域名

/**
 * 百度SEO优化组件（增强版）
 * 为每个页面提供独立的 title、description、keywords
 * 包含结构化数据（JSON-LD）：Organization、WebPage/Article、BreadcrumbList、FAQPage、LocalBusiness
 */
export default function Seo({
  title,
  description,
  keywords,
  path = '',
  type = 'website',
  image,
  breadcrumb = [],
  faq,
}: SeoProps) {
  const fullUrl = `${BASE_URL}${path}`;
  const fullTitle = title.length > 30 ? title : `${title} | 光影大师灯光设计`;

  // 面包屑结构化数据
  const breadcrumbItems = [
    { name: '首页', path: '/' },
    ...breadcrumb,
  ];

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };

  // 网页结构化数据
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebPage',
    name: title,
    description,
    url: fullUrl,
    ...(image && { image }),
    publisher: {
      '@type': 'Organization',
      name: '光影大师',
      alternateName: 'LUMOS DESIGN',
    },
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
        text: item.a,
      },
    })),
  } : null;

  return (
    <Helmet>
      {/* 核心Meta标签 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:locale" content="zh_CN" />
      <meta property="og:site_name" content="光影大师 LUMOS DESIGN" />
      {image && <meta property="og:image" content={image} />}

      {/* 百度移动适配 */}
      <meta name="applicable-device" content="pc,mobile" />

      {/* 结构化数据 */}
      <script type="application/ld+json">{JSON.stringify(webPageLd)}</script>
      {breadcrumb.length > 0 && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      )}
      {faqLd && (
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      )}
    </Helmet>
  );
}
