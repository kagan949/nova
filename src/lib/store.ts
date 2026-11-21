import { Level } from '@/data/content';
export type RecordEntry = {lessonId:string; correct:boolean; date:string};
export type WordState = {step:number; due:string; favorite:boolean};
export type State = {version:1;level:Level;goal:number;completed:string[];records:RecordEntry[];words:Record<string,WordState>;days:string[];lastLesson:string;theme:'light'|'dark';font:'normal'|'large';testResults:{level:Level;score:number;date:string}[]};
export const initial:State={version:1,level:'A1',goal:30,completed:[],records:[],words:{},days:[],lastLesson:'lesson-1',theme:'light',font:'normal',testResults:[]};
export const today=()=>new Date().toLocaleDateString('en-CA');
export function validState(v:unknown):v is State {
 if(!v || typeof v!=='object') return false;
 const x=v as State; const isLevel=(l:unknown)=>typeof l==='string'&&['A1','A2','B1','B2','C1'].includes(l); const isDate=(d:unknown)=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d);
 return x.version===1 && isLevel(x.level) && [15,30,45,60].includes(x.goal) && typeof x.lastLesson==='string' && ['light','dark'].includes(x.theme) && ['normal','large'].includes(x.font)
 && Array.isArray(x.completed) && x.completed.every(y=>typeof y==='string') && Array.isArray(x.days) && x.days.every(isDate)
 && Array.isArray(x.records) && x.records.every(r=>r&&typeof r.lessonId==='string'&&typeof r.correct==='boolean'&&isDate(r.date))
 && !!x.words && typeof x.words==='object' && !Array.isArray(x.words) && Object.values(x.words).every(w=>w&&Number.isInteger(w.step)&&w.step>=0&&w.step<=4&&isDate(w.due)&&typeof w.favorite==='boolean')
 && Array.isArray(x.testResults) && x.testResults.every(r=>r&&isLevel(r.level)&&typeof r.score==='number'&&r.score>=0&&r.score<=100&&isDate(r.date));
}
export function streak(days:string[]) {let n=0;const set=new Set(days);const d=new Date();if(!set.has(today()))d.setDate(d.getDate()-1);while(set.has(d.toLocaleDateString('en-CA'))){n++;d.setDate(d.getDate()-1)}return n}
