import { LIGHTING_CATEGORIES } from "../data";

interface SelectedCaseStudyProps {
  selectedCatId?: string;
}

export default function SelectedCaseStudy({ selectedCatId = "cultural-tourism" }: SelectedCaseStudyProps) {
  const selectedCategory = LIGHTING_CATEGORIES.find(c => c.id === selectedCatId) || LIGHTING_CATEGORIES[0];
  const caseItem = selectedCategory?.cases?.[0];
  if (!caseItem) return null;

  return (
    <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-2xl">
      <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
        AWARD CASE STUDIES / 金奖灯光实践案
      </span>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 pb-4 border-b border-neutral-850">
        <div>
          <h4 className="text-lg font-bold text-yellow-400">{caseItem.title}</h4>
          <p className="text-xs text-neutral-400 font-mono mt-1">项目落位：{caseItem.location}</p>
        </div>
        <div className="text-sm text-neutral-400 italic md:mt-0 mt-2">
          摄影师/记录者：{caseItem.photographer}
        </div>
      </div>
      <p className="text-xs text-neutral-300 leading-relaxed py-4">
        <strong className="text-neutral-100">创意概念解读：</strong>
        {caseItem.concept}
      </p>
      <div className="grid grid-cols-3 gap-3">
        {caseItem.stats && caseItem.stats.map((stat: any, i: number) => (
          <div key={i} className="bg-neutral-900 border border-neutral-850 p-3 rounded-xl text-center">
            <span className="text-[10px] text-neutral-500 font-mono block">{stat.label}</span>
            <span className="text-sm font-semibold text-neutral-100 mt-1 block">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
