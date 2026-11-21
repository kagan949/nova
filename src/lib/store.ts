import { Level } from '@/data/content';
export type RecordEntry = {lessonId:string; correct:boolean; date:string};
export type WordState = {step:number; due:string; favorite:boolean};
export type State = {version:1;level:Level;goal:number;completed:string[];records:RecordEntry[];words:Record<string,WordState>;days:string[];lastLesson:string;theme:'light'|'dark';font:'normal'|'large';testResults:{level:Level;score:number;date:string}[]};
export const initial:State={version:1,level:'A1',goal:30,completed:[],records:[],words:{},days:[],lastLesson:'lesson-1',theme:'light',font:'normal',testResults:[]};
export const today=()=>new Date().toLocaleDateString('en-CA');
export function validState(v:unknown):v is State { if(!v || typeof v!=='object') return false; const x=v as State; return x.version===1 && ['A1','A2','B1','B2','C1'].includes(x.level) && Array.isArray(x.completed) && Array.isArray(x.records) && Array.isArray(x.days) && !!x.words && typeof x.words==='object' && Array.isArray(x.testResults) && [15,30,45,60].includes(x.goal); }
export function streak(days:string[]) {let n=0;const set=new Set(days);const d=new Date();if(!set.has(today()))d.setDate(d.getDate()-1);while(set.has(d.toLocaleDateString('en-CA'))){n++;d.setDate(d.getDate()-1)}return n}
