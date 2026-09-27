const fs = require('fs');
let content = fs.readFileSync('src/components/ChecklistStageView.tsx', 'utf8');

const targetStr = `                             return (
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                                 {/* Card 1: Tingkat Risiko */}
                                 <div className={\`p-2.5 rounded-lg border \${risk.bgColor} flex flex-col justify-between\`}>
                                   <div>
                                     <div className="flex items-center space-x-1.5 mb-1">
                                       {risk.icon}
                                       <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Tingkat Risiko Dampak:</span>
                                     </div>
                                     <h5 className={\`text-xs font-bold \${risk.textColor} mb-0.5\`}>
                                       {risk.label}
                                     </h5>
                                     <p className="text-[10px] text-slate-600 leading-snug">
                                       {risk.desc}
                                     </p>
                                   </div>
                                 </div>

                                 {/* Card 2: Scope / Unit */}
                                 <div className={\`p-2.5 rounded-lg border \${scope.bgColor} flex flex-col justify-between\`}>
                                   <div>
                                     <div className="flex items-center space-x-1.5 mb-1">
                                       {scope.icon}
                                       <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Cakupan / Unit Kerja:</span>
                                     </div>
                                     <h5 className={\`text-xs font-bold \${scope.textColor} mb-0.5\`}>
                                       {scope.label}
                                     </h5>
                                     <p className="text-[10px] text-slate-600 leading-snug">
                                       {scope.desc}
                                     </p>
                                   </div>
                                 </div>
                               </div>
                             );`;

const replacementStr = `                             return (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                                {/* Card 1: Tingkat Risiko */}
                                <div className={\`relative p-2.5 rounded-lg border transition-all \${risk.bgColor} flex flex-col justify-between group cursor-pointer hover:shadow-xs\`}>
                                  <div>
                                    <div className="flex items-center justify-between mb-1">
                                      <div className="flex items-center space-x-1.5">
                                        {risk.icon}
                                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Tingkat Risiko Dampak:</span>
                                      </div>
                                      <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition" />
                                    </div>
                                    <h5 className={\`text-xs font-bold \${risk.textColor} mb-0.5\`}>
                                      {risk.label}
                                    </h5>
                                    <p className="text-[10px] text-slate-600 leading-snug">
                                      {risk.desc}
                                    </p>
                                  </div>
                                  <select
                                    value={item.riskLevel}
                                    onChange={(e) => {
                                      const newRisk = e.target.value;
                                      onUpdateItemDetails(
                                        item.id,
                                        item.notes,
                                        item.evidenceText,
                                        item.attachments,
                                        newRisk,
                                        item.auditSteps,
                                        item.verificationCriteria,
                                        item.criterionEvaluations,
                                        undefined,
                                        item.operationalScope
                                      );
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    title="Ubah Tingkat Risiko Dampak"
                                  >
                                    <option value="CRITICAL">Kritis (Critical / Fatal)</option>
                                    <option value="HIGH">Tinggi (High / Major)</option>
                                    <option value="MEDIUM">Sedang (Medium / Minor)</option>
                                    <option value="LOW">Rendah (Low / Observation)</option>
                                  </select>
                                </div>

                                {/* Card 2: Scope / Unit */}
                                <div className={\`relative p-2.5 rounded-lg border transition-all \${scope.bgColor} flex flex-col justify-between group cursor-pointer hover:shadow-xs\`}>
                                  <div>
                                    <div className="flex items-center justify-between mb-1">
                                      <div className="flex items-center space-x-1.5">
                                        {scope.icon}
                                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Cakupan / Unit Kerja:</span>
                                      </div>
                                      <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition" />
                                    </div>
                                    <h5 className={\`text-xs font-bold \${scope.textColor} mb-0.5\`}>
                                      {scope.label}
                                    </h5>
                                    <p className="text-[10px] text-slate-600 leading-snug">
                                      {scope.desc}
                                    </p>
                                  </div>
                                  <select
                                    value={item.operationalScope || 'ALL'}
                                    onChange={(e) => {
                                      const newScope = e.target.value;
                                      onUpdateItemDetails(
                                        item.id,
                                        item.notes,
                                        item.evidenceText,
                                        item.attachments,
                                        item.riskLevel,
                                        item.auditSteps,
                                        item.verificationCriteria,
                                        item.criterionEvaluations,
                                        undefined,
                                        newScope
                                      );
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    title="Ubah Cakupan / Unit Kerja"
                                  >
                                    <option value="ALL">Semua Lini Operasional</option>
                                    <option value="TRANSPORTER">Transporter Sabang-Merauke</option>
                                    <option value="KARAWANG_PLANT">Plant Karawang (Pengumpul & Pusat)</option>
                                    <option value="SUKABUMI_PLANT">Plant Sukabumi (Pemanfaat & De-watering)</option>
                                  </select>
                                </div>
                              </div>
                            );`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/ChecklistStageView.tsx', content, 'utf8');
  console.log('SUCCESS: Directly replaced interactive cards!');
} else {
  // Let's replace by stripping newlines to tolerate any format
  const cleanContent = content.replace(/\s+/g, ' ');
  const cleanTarget = targetStr.replace(/\s+/g, ' ');
  if (cleanContent.includes(cleanTarget)) {
    // We can do a regex-based replacement
    const regexSafeTarget = targetStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(regexSafeTarget), replacementStr);
    fs.writeFileSync('src/components/ChecklistStageView.tsx', content, 'utf8');
    console.log('SUCCESS: Regex replaced interactive cards!');
  } else {
    console.error('ERROR: Could not locate target string even after whitespace stripping.');
    // Let's print cleanContent substring to debug
    console.log('Sample content from file around column grid:');
    const index = content.indexOf('Cakupan / Unit Kerja');
    if (index !== -1) {
      console.log(content.substring(index - 200, index + 400));
    }
  }
}
