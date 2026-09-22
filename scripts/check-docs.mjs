import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
function walk(path) { return readdirSync(path, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(`${path}/${e.name}`) : [`${path}/${e.name}`]); }
const files = ['README.md','AGENTS.md',...walk('DOCS').filter(p=>p.endsWith('.md'))];
const errors=[];
for(const file of files) {
 const text=readFileSync(file,'utf8');
 for(const [,link] of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
  if (/^(https?:|#)/.test(link)) continue;
  if (!existsSync(resolve(dirname(file),link.split('#')[0]))) errors.push(`${file}: missing ${link}`);
 }
}
const source=readFileSync('DOCS/source/prd-verbatim.md','utf8');
const ids=[...source.matchAll(/^### P(\d{4})$/gm)].map(m=>Number(m[1]));
if(ids.length!==638 || ids.some((n,i)=>n!==i+1)) errors.push('Source paragraph coverage changed');
const hash=createHash('sha256').update(readFileSync('DOCS/source/original-prd.docx')).digest('hex');
if(!readFileSync('DOCS/source/provenance.md','utf8').includes(hash)) errors.push('Original source checksum changed');
for(let n=0;n<22;n++) if(!existsSync(`DOCS/features/F${String(n).padStart(2,'0')}.md`)) errors.push(`Missing F${n}`);
if(errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Validated ${files.length} Markdown files, all 638 source paragraphs, source hash and 22 feature packages.`);
