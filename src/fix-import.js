const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// 找到破损的 import 区域并修复
const oldStart = 'import TechColumnPage from "./pages/TechColumnPage";\nimport TechArticlePage from "./pages/TechArticlePage";\nimport { motion } from "motion/react";\n  Layers,';
const newStart = 'import { motion } from "motion/react";\nimport {\n  Layers,';

if (content.includes(oldStart)) {
  content = content.replace(oldStart, newStart);
  console.log('Step 1: Fixed import ordering');
}

// 确保 TechColumnPage 和 TechArticlePage 的导入在 lucide-react 之后
const pagesImport = '\nimport TechColumnPage from "./pages/TechColumnPage";\nimport TechArticlePage from "./pages/TechArticlePage";\n';
const afterLucide = '} from "lucide-react";';

if (!content.includes(pagesImport.trim())) {
  const idx = content.indexOf(afterLucide);
  if (idx !== -1) {
    content = content.slice(0, idx + afterLucide.length) + pagesImport + content.slice(idx + afterLucide.length);
    console.log('Step 2: Added pages import after lucide-react');
  }
}

fs.writeFileSync('App.tsx', content, 'utf8');
console.log('Done!');
