import { useState, useCallback, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ════════════════════════════════════════════════════════════════════
//  ⚙️  ΡΥΘΜΙΣΕΙΣ — ΒΑΛΕ ΕΔΩ ΤΑ ΚΛΕΙΔΙΑ ΑΠΟ ΤΟ SUPABASE
// ════════════════════════════════════════════════════════════════════
const SUPABASE_URL = "https://zxjaexgaiddidampbtnp.supabase.co";
const SUPABASE_KEY = "sb_publishable_kjCJGLbm6X2naEiZJjiZnw_T1FDDeot";
// ════════════════════════════════════════════════════════════════════

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const FLAGS = {
  Mexico:"🇲🇽","South Africa":"🇿🇦","South Korea":"🇰🇷",Canada:"🇨🇦",USA:"🇺🇸",
  Paraguay:"🇵🇾","Türkiye":"🇹🇷",Qatar:"🇶🇦",Switzerland:"🇨🇭",
  "Bosnia-Herzegovina":"🇧🇦",Brazil:"🇧🇷",Morocco:"🇲🇦",Scotland:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",Haiti:"🇭🇹",
  Australia:"🇦🇺","Czech Republic":"🇨🇿",Germany:"🇩🇪",Curacao:"🇨🇼",
  Netherlands:"🇳🇱",Japan:"🇯🇵","Ivory Coast":"🇨🇮",Ecuador:"🇪🇨",Tunisia:"🇹🇳",
  Ukraine:"🇺🇦",Sweden:"🇸🇪",Spain:"🇪🇸","Cape Verde":"🇨🇻",Belgium:"🇧🇪",Egypt:"🇪🇬",
  "Saudi Arabia":"🇸🇦",Uruguay:"🇺🇾",Iran:"🇮🇷","New Zealand":"🇳🇿",France:"🇫🇷",
  Senegal:"🇸🇳",Norway:"🇳🇴",Iraq:"🇮🇶",Argentina:"🇦🇷",Algeria:"🇩🇿",Austria:"🇦🇹",
  Jordan:"🇯🇴",Portugal:"🇵🇹",Uzbekistan:"🇺🇿",Colombia:"🇨🇴","DR Congo":"🇨🇩",
  Jamaica:"🇯🇲",England:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",Croatia:"🇭🇷",Panama:"🇵🇦",Ghana:"🇬🇭",TBD:"🏳️",
};
const F = t => FLAGS[t] || "🏳️";
function noAccent(s){return s.replace(/[άΆ]/g,"Α").replace(/[έΈ]/g,"Ε").replace(/[ήΉ]/g,"Η").replace(/[ίΊϊΪ]/g,"Ι").replace(/[όΌ]/g,"Ο").replace(/[ύΎϋΫ]/g,"Υ").replace(/[ώΏ]/g,"Ω");}
const caps = s => noAccent(s).toUpperCase();

const SCHEDULE = [
  {id:"m001",date:"2026-06-11",gtime:"22:00",home:"Mexico",            away:"South Africa",        group:"A",phase:"group"},
  {id:"m002",date:"2026-06-11",gtime:"05:00",home:"South Korea",       away:"Czech Republic",      group:"A",phase:"group"},
  {id:"m003",date:"2026-06-12",gtime:"22:00",home:"Canada",            away:"Bosnia-Herzegovina",  group:"B",phase:"group"},
  {id:"m004",date:"2026-06-12",gtime:"04:00",home:"USA",               away:"Paraguay",            group:"D",phase:"group"},
  {id:"m005",date:"2026-06-13",gtime:"22:00",home:"Qatar",             away:"Switzerland",         group:"B",phase:"group"},
  {id:"m006",date:"2026-06-13",gtime:"01:00",home:"Brazil",            away:"Morocco",             group:"C",phase:"group"},
  {id:"m007",date:"2026-06-13",gtime:"04:00",home:"Haiti",             away:"Scotland",            group:"C",phase:"group"},
  {id:"m008",date:"2026-06-13",gtime:"07:00",home:"Australia",         away:"Türkiye",             group:"D",phase:"group"},
  {id:"m009",date:"2026-06-14",gtime:"20:00",home:"Germany",           away:"Curacao",             group:"E",phase:"group"},
  {id:"m010",date:"2026-06-14",gtime:"23:00",home:"Netherlands",       away:"Japan",               group:"F",phase:"group"},
  {id:"m011",date:"2026-06-14",gtime:"02:00",home:"Ivory Coast",       away:"Ecuador",             group:"E",phase:"group"},
  {id:"m012",date:"2026-06-14",gtime:"05:00",home:"Sweden",            away:"Tunisia",             group:"F",phase:"group"},
  {id:"m013",date:"2026-06-15",gtime:"19:00",home:"Spain",             away:"Cape Verde",          group:"H",phase:"group"},
  {id:"m014",date:"2026-06-15",gtime:"22:00",home:"Belgium",           away:"Egypt",               group:"G",phase:"group"},
  {id:"m015",date:"2026-06-15",gtime:"01:00",home:"Saudi Arabia",      away:"Uruguay",             group:"H",phase:"group"},
  {id:"m016",date:"2026-06-15",gtime:"04:00",home:"Iran",              away:"New Zealand",         group:"G",phase:"group"},
  {id:"m017",date:"2026-06-16",gtime:"22:00",home:"France",            away:"Senegal",             group:"I",phase:"group"},
  {id:"m018",date:"2026-06-16",gtime:"01:00",home:"Iraq",              away:"Norway",              group:"I",phase:"group"},
  {id:"m019",date:"2026-06-16",gtime:"04:00",home:"Argentina",         away:"Algeria",             group:"J",phase:"group"},
  {id:"m020",date:"2026-06-16",gtime:"07:00",home:"Austria",           away:"Jordan",              group:"J",phase:"group"},
  {id:"m021",date:"2026-06-17",gtime:"20:00",home:"Portugal",          away:"DR Congo",            group:"K",phase:"group"},
  {id:"m022",date:"2026-06-17",gtime:"23:00",home:"England",           away:"Croatia",             group:"L",phase:"group"},
  {id:"m023",date:"2026-06-17",gtime:"02:00",home:"Ghana",             away:"Panama",              group:"L",phase:"group"},
  {id:"m024",date:"2026-06-17",gtime:"05:00",home:"Uzbekistan",        away:"Colombia",            group:"K",phase:"group"},
  {id:"m025",date:"2026-06-18",gtime:"19:00",home:"Czech Republic",    away:"South Africa",        group:"A",phase:"group"},
  {id:"m026",date:"2026-06-18",gtime:"22:00",home:"Switzerland",       away:"Bosnia-Herzegovina",  group:"B",phase:"group"},
  {id:"m027",date:"2026-06-18",gtime:"01:00",home:"Canada",            away:"Qatar",               group:"B",phase:"group"},
  {id:"m028",date:"2026-06-18",gtime:"04:00",home:"Mexico",            away:"South Korea",         group:"A",phase:"group"},
  {id:"m029",date:"2026-06-19",gtime:"22:00",home:"USA",               away:"Australia",           group:"D",phase:"group"},
  {id:"m030",date:"2026-06-19",gtime:"01:00",home:"Scotland",          away:"Morocco",             group:"C",phase:"group"},
  {id:"m031",date:"2026-06-19",gtime:"03:30",home:"Brazil",            away:"Haiti",               group:"C",phase:"group"},
  {id:"m032",date:"2026-06-19",gtime:"06:00",home:"Türkiye",           away:"Paraguay",            group:"D",phase:"group"},
  {id:"m033",date:"2026-06-20",gtime:"20:00",home:"Netherlands",       away:"Sweden",              group:"F",phase:"group"},
  {id:"m034",date:"2026-06-20",gtime:"23:00",home:"Germany",           away:"Ivory Coast",         group:"E",phase:"group"},
  {id:"m035",date:"2026-06-20",gtime:"06:00",home:"Ecuador",           away:"Curacao",             group:"E",phase:"group"},
  {id:"m036",date:"2026-06-20",gtime:"07:00",home:"Tunisia",           away:"Japan",               group:"F",phase:"group"},
  {id:"m037",date:"2026-06-21",gtime:"19:00",home:"Spain",             away:"Saudi Arabia",        group:"H",phase:"group"},
  {id:"m038",date:"2026-06-21",gtime:"22:00",home:"Belgium",           away:"Iran",                group:"G",phase:"group"},
  {id:"m039",date:"2026-06-21",gtime:"01:00",home:"Uruguay",           away:"Cape Verde",          group:"H",phase:"group"},
  {id:"m040",date:"2026-06-21",gtime:"04:00",home:"New Zealand",       away:"Egypt",               group:"G",phase:"group"},
  {id:"m041",date:"2026-06-22",gtime:"20:00",home:"Argentina",         away:"Austria",             group:"J",phase:"group"},
  {id:"m042",date:"2026-06-22",gtime:"00:00",home:"France",            away:"Iraq",                group:"I",phase:"group"},
  {id:"m043",date:"2026-06-22",gtime:"03:00",home:"Norway",            away:"Senegal",             group:"I",phase:"group"},
  {id:"m044",date:"2026-06-22",gtime:"06:00",home:"Jordan",            away:"Algeria",             group:"J",phase:"group"},
  {id:"m045",date:"2026-06-23",gtime:"20:00",home:"Portugal",          away:"Uzbekistan",          group:"K",phase:"group"},
  {id:"m046",date:"2026-06-23",gtime:"23:00",home:"England",           away:"Ghana",               group:"L",phase:"group"},
  {id:"m047",date:"2026-06-23",gtime:"02:00",home:"Panama",            away:"Croatia",             group:"L",phase:"group"},
  {id:"m048",date:"2026-06-23",gtime:"05:00",home:"Colombia",          away:"DR Congo",            group:"K",phase:"group"},
  {id:"m049",date:"2026-06-24",gtime:"22:00",home:"Switzerland",       away:"Canada",              group:"B",phase:"group"},
  {id:"m050",date:"2026-06-24",gtime:"22:00",home:"Bosnia-Herzegovina", away:"Qatar",               group:"B",phase:"group"},
  {id:"m051",date:"2026-06-24",gtime:"01:00",home:"Scotland",          away:"Brazil",              group:"C",phase:"group"},
  {id:"m052",date:"2026-06-24",gtime:"01:00",home:"Morocco",           away:"Haiti",               group:"C",phase:"group"},
  {id:"m053",date:"2026-06-24",gtime:"04:00",home:"Czech Republic",    away:"Mexico",              group:"A",phase:"group"},
  {id:"m054",date:"2026-06-24",gtime:"04:00",home:"South Africa",      away:"South Korea",         group:"A",phase:"group"},
  {id:"m055",date:"2026-06-25",gtime:"23:00",home:"Ecuador",           away:"Germany",             group:"E",phase:"group"},
  {id:"m056",date:"2026-06-25",gtime:"23:00",home:"Curacao",           away:"Ivory Coast",         group:"E",phase:"group"},
  {id:"m057",date:"2026-06-25",gtime:"02:00",home:"Japan",             away:"Sweden",              group:"F",phase:"group"},
  {id:"m058",date:"2026-06-25",gtime:"02:00",home:"Tunisia",           away:"Netherlands",         group:"F",phase:"group"},
  {id:"m059",date:"2026-06-25",gtime:"05:00",home:"Türkiye",           away:"USA",                 group:"D",phase:"group"},
  {id:"m060",date:"2026-06-25",gtime:"05:00",home:"Paraguay",          away:"Australia",           group:"D",phase:"group"},
  {id:"m061",date:"2026-06-26",gtime:"22:00",home:"Norway",            away:"France",              group:"I",phase:"group"},
  {id:"m062",date:"2026-06-26",gtime:"22:00",home:"Senegal",           away:"Iraq",                group:"I",phase:"group"},
  {id:"m063",date:"2026-06-26",gtime:"03:00",home:"Cape Verde",        away:"Saudi Arabia",        group:"H",phase:"group"},
  {id:"m064",date:"2026-06-26",gtime:"03:00",home:"Uruguay",           away:"Spain",               group:"H",phase:"group"},
  {id:"m065",date:"2026-06-26",gtime:"06:00",home:"Egypt",             away:"Iran",                group:"G",phase:"group"},
  {id:"m066",date:"2026-06-26",gtime:"06:00",home:"New Zealand",       away:"Belgium",             group:"G",phase:"group"},
  {id:"m067",date:"2026-06-27",gtime:"00:00",home:"Panama",            away:"England",             group:"L",phase:"group"},
  {id:"m068",date:"2026-06-27",gtime:"00:00",home:"Croatia",           away:"Ghana",               group:"L",phase:"group"},
  {id:"m069",date:"2026-06-27",gtime:"02:30",home:"Colombia",          away:"Portugal",            group:"K",phase:"group"},
  {id:"m070",date:"2026-06-27",gtime:"02:30",home:"DR Congo",          away:"Uzbekistan",          group:"K",phase:"group"},
  {id:"m071",date:"2026-06-27",gtime:"05:00",home:"Algeria",           away:"Austria",             group:"J",phase:"group"},
  {id:"m072",date:"2026-06-27",gtime:"05:00",home:"Jordan",            away:"Argentina",           group:"J",phase:"group"},
  {id:"r32_01",date:"2026-06-28",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M1"},
  {id:"r32_02",date:"2026-06-29",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M2"},
  {id:"r32_03",date:"2026-06-29",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M3"},
  {id:"r32_04",date:"2026-06-29",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M4"},
  {id:"r32_05",date:"2026-06-30",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M5"},
  {id:"r32_06",date:"2026-06-30",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M6"},
  {id:"r32_07",date:"2026-06-30",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M7"},
  {id:"r32_08",date:"2026-07-01",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M8"},
  {id:"r32_09",date:"2026-07-01",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M9"},
  {id:"r32_10",date:"2026-07-01",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M10"},
  {id:"r32_11",date:"2026-07-02",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M11"},
  {id:"r32_12",date:"2026-07-02",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M12"},
  {id:"r32_13",date:"2026-07-02",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M13"},
  {id:"r32_14",date:"2026-07-03",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M14"},
  {id:"r32_15",date:"2026-07-03",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M15"},
  {id:"r32_16",date:"2026-07-03",home:"TBD",away:"TBD",phase:"round32",label:"R32 — M16"},
  {id:"r16_1",date:"2026-07-04",home:"TBD",away:"TBD",phase:"round16",label:"R16 — M1"},
  {id:"r16_2",date:"2026-07-04",home:"TBD",away:"TBD",phase:"round16",label:"R16 — M2"},
  {id:"r16_3",date:"2026-07-05",home:"TBD",away:"TBD",phase:"round16",label:"R16 — M3"},
  {id:"r16_4",date:"2026-07-05",home:"TBD",away:"TBD",phase:"round16",label:"R16 — M4"},
  {id:"r16_5",date:"2026-07-06",home:"TBD",away:"TBD",phase:"round16",label:"R16 — M5"},
  {id:"r16_6",date:"2026-07-06",home:"TBD",away:"TBD",phase:"round16",label:"R16 — M6"},
  {id:"r16_7",date:"2026-07-07",home:"TBD",away:"TBD",phase:"round16",label:"R16 — M7"},
  {id:"r16_8",date:"2026-07-07",home:"TBD",away:"TBD",phase:"round16",label:"R16 — M8"},
  {id:"qf_1",date:"2026-07-09",home:"TBD",away:"TBD",phase:"quarter",label:"Quarter Final 1"},
  {id:"qf_2",date:"2026-07-10",home:"TBD",away:"TBD",phase:"quarter",label:"Quarter Final 2"},
  {id:"qf_3",date:"2026-07-11",home:"TBD",away:"TBD",phase:"quarter",label:"Quarter Final 3"},
  {id:"qf_4",date:"2026-07-11",home:"TBD",away:"TBD",phase:"quarter",label:"Quarter Final 4"},
  {id:"sf_1",date:"2026-07-14",home:"TBD",away:"TBD",phase:"semi",label:"Semi Final 1"},
  {id:"sf_2",date:"2026-07-15",home:"TBD",away:"TBD",phase:"semi",label:"Semi Final 2"},
  {id:"bronze",date:"2026-07-18",home:"TBD",away:"TBD",phase:"bronze",label:"3η Θεση"},
  {id:"final", date:"2026-07-19",home:"TBD",away:"TBD",phase:"final", label:"ΤΕΛΙΚΟΣ"},
];

const BY_DATE = SCHEDULE.reduce((a,m)=>{ (a[m.date]??=[]).push(m); return a; },{});
const SCHED_BY_ID = SCHEDULE.reduce((a,m)=>{ a[m.id]=m; return a; },{});
const addDays=(dateStr,n)=>{const d=new Date(dateStr+"T12:00:00");d.setDate(d.getDate()+n);return d.toISOString().slice(0,10);};
const ALL_DATES = Object.keys(BY_DATE).sort();
const PHASE_LABEL = {group:"Ομιλοι",round32:"Round of 32",round16:"Round of 16",quarter:"Quarter Final",semi:"Semi Final",bronze:"3η Θεση",final:"Τελικος"};

// Find a user's pick for a match, regardless of which "vote day" it was stored under.
// (after-midnight matches are stored under the previous day's matchday-night)
function findPick(up, matchId){
  if(!up) return undefined;
  for(const d in up){ if(up[d] && up[d][matchId]!=null) return up[d][matchId]; }
  return undefined;
}

// Points for matches whose CALENDAR date is `date`. Looks up the pick anywhere
// (so after-midnight matches still score even if voted on the previous night).
const calcDayPts=(date,up,res)=>(BY_DATE[date]||[]).reduce((s,m)=>{const r=res[m.id],p=findPick(up,m.id);return s+(r&&p&&p===r?1:0);},0);
const calcTotal=(up,res)=>ALL_DATES.reduce((s,d)=>s+calcDayPts(d,up,res),0);
function playerStats(up,res){let correct=0,wrong=0,total=0;ALL_DATES.forEach(d=>{(BY_DATE[d]||[]).forEach(m=>{const p=findPick(up,m.id),r=res[m.id];if(p){total++;if(r){if(p===r)correct++;else wrong++;}}});});const dec=correct+wrong;return{correct,wrong,total,pct:dec?Math.round(correct/dec*100):0};}

// Crowd vote distribution for a match: how many voted 1 / X / 2 (any vote-day)
function crowdVotes(matchId, matchDate, predictions){
  let c1=0,cX=0,c2=0;
  Object.values(predictions).forEach(byDate=>{
    const p=findPick(byDate,matchId);
    if(p==="1")c1++; else if(p==="X")cX++; else if(p==="2")c2++;
  });
  const total=c1+cX+c2;
  const pct=n=>total?Math.round(n/total*100):0;
  return {c1,cX,c2,total,p1:pct(c1),pX:pct(cX),p2:pct(c2)};
}

// Streak: consecutive match-days (most recent backwards) where the user voted at least once
function voteStreak(userPreds){
  const daysWithMatches=ALL_DATES.filter(d=>(BY_DATE[d]||[]).length>0);
  const todayStr=new Date().toISOString().slice(0,10);
  // only count days up to today
  const past=daysWithMatches.filter(d=>d<=todayStr);
  let streak=0;
  for(let i=past.length-1;i>=0;i--){
    const d=past[i];
    const voted=Object.keys(userPreds?.[d]||{}).length>0;
    if(voted) streak++; else break;
  }
  return streak;
}

// Longest run of consecutive CORRECT predictions (across all matches in date order)
function longestCorrectRun(userPreds,results){
  let best=0,cur=0;
  ALL_DATES.forEach(d=>{(BY_DATE[d]||[]).forEach(m=>{
    const p=userPreds?.[d]?.[m.id],r=results[m.id];
    if(p&&r){ if(p===r){cur++;best=Math.max(best,cur);} else cur=0; }
  });});
  return best;
}

// Compute badges for a user. isLeader = true if rank #1 with >0 pts.
function computeBadges(userPreds,results,isLeader){
  const st=playerStats(userPreds,results);
  const streak=voteStreak(userPreds);
  const run=longestCorrectRun(userPreds,results);
  const badges=[];
  if(isLeader) badges.push({icon:"👑",name:"Κορυφη",desc:"Νο1 στην καταταξη"});
  if(run>=5) badges.push({icon:"🔮",name:"Προφητης",desc:"5+ σωστα στη σειρα"});
  if(st.pct>=75 && (st.correct+st.wrong)>=8) badges.push({icon:"🎯",name:"Σκοπευτης",desc:"75%+ ευστοχια"});
  if(streak>=5) badges.push({icon:"🔥",name:"Σταθερος",desc:"5+ μερες σερι"});
  if(st.correct>=20) badges.push({icon:"⭐",name:"Βετερανος",desc:"20+ σωστες προβλεψεις"});
  if(st.total>=1 && st.total<5) badges.push({icon:"🌱",name:"Νεοφερμενος",desc:"Μολις ξεκινησες"});
  return badges;
}

// ── Δωρεαν API (openfootball) — ΧΩΡΙΣ κλειδι ──
// Τραβαει το worldcup.json απο το GitHub (CORS-friendly, χωρις auth).
// Δομη: { matches:[ { date, team1, team2, score:{ft:[h,a]}, group, round } ] }
function normTeam(s){
  return (s||"").toLowerCase()
    .replace(/[^a-zα-ω ]/gi,"")          // κρατα μονο γραμματα/κενα
    .replace(/\b(ir|rep|republic of)\b/g,"")
    .trim();
}
function teamsMatch(a,b){
  const x=normTeam(a),y=normTeam(b);
  if(!x||!y)return false;
  return x===y || x.includes(y) || y.includes(x);
}
async function fetchFromAPI(){
  // πολλαπλα mirrors για σιγουρια
  const urls=[
    "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json",
    "https://cdn.jsdelivr.net/gh/openfootball/worldcup.json@master/2026/worldcup.json",
  ];
  let data=null,lastErr=null;
  for(const u of urls){
    try{
      const res=await fetch(u,{cache:"no-store"});
      if(!res.ok){lastErr=`HTTP ${res.status}`;continue;}
      data=await res.json();
      if(data)break;
    }catch(e){lastErr=e.message;}
  }
  if(!data)throw new Error(lastErr||"Δεν φορτωσαν τα δεδομενα");

  const matches=data.matches||[];
  const newTeams={},newResults={};

  function findSched(m){
    const d=(m.date||"").slice(0,10);
    const t1=m.team1?.name||m.team1, t2=m.team2?.name||m.team2;
    // ταιριασμα με ημερομηνια + ομαδες, αλλιως μονο ομαδες
    return SCHEDULE.find(s=>s.date===d && teamsMatch(s.home,t1) && teamsMatch(s.away,t2))
        || SCHEDULE.find(s=>teamsMatch(s.home,t1) && teamsMatch(s.away,t2));
  }
  function getScore(m){
    // openfootball: score.ft = [home, away]  ή  score1/score2
    if(m.score?.ft && m.score.ft.length===2) return [m.score.ft[0],m.score.ft[1]];
    if(m.score1!=null && m.score2!=null)     return [m.score1,m.score2];
    return null;
  }

  matches.forEach(m=>{
    const f=findSched(m);
    if(!f)return;
    const t1=m.team1?.name||m.team1, t2=m.team2?.name||m.team2;
    // knockout teams (οχι TBD)
    if(f.phase!=="group" && t1 && t2 && !/winner|loser|tbd|\?/i.test(t1+t2)){
      newTeams[f.id]={home:t1,away:t2};
    }
    // αποτελεσμα
    const sc=getScore(m);
    if(sc){
      const [hg,ag]=sc;
      if(hg!=null && ag!=null) newResults[f.id]=hg>ag?"1":hg<ag?"2":"X";
    }
  });
  return{newTeams,newResults};
}

const fmtShort=s=>!s?"":new Date(s+"T12:00:00").toLocaleDateString("el-GR",{day:"numeric",month:"short"});
const fmtLong=s=>!s?"":new Date(s+"T12:00:00").toLocaleDateString("el-GR",{weekday:"long",day:"numeric",month:"long"});

const LS_SESSION = "wc2026_session";

function LoginScreen({mode,setMode,lf,setLf,rf,setRf,lerr,rerr,onLogin,onReg,busy}){
  const isReg=mode==="register";
  return(
    <div className="login-fs">
      <div className="lf-grid"/><div className="lf-glow"/><div className="lf-scan"/>
      <div className="lf-orb lf-orb1"/><div className="lf-orb lf-orb2"/>
      <div className="login-box">
        <div className="login-topbar"/>
        <div className="login-head">
          <div className="login-icon"><span>⚽</span></div>
          <div className="login-title">{isReg?"ΕΓΓΡΑΦΗ":"WC 2026"}</div>
          <div className="login-sub">{isReg?"ΔΗΜΙΟΥΡΓΙΑ ΛΟΓΑΡΙΑΣΜΟΥ":"FIFA · PREDICTION LEAGUE"}</div>
        </div>
        <div className="login-body">
          {isReg?(<>
            {rerr&&<div className="lerr">{rerr}</div>}
            <div className="lfield"><label>Username</label>
              <input value={rf.u} onChange={e=>setRf(p=>({...p,u:e.target.value}))} placeholder="Επιλεξε username"/></div>
            <div className="lfield"><label>Password</label>
              <input type="password" value={rf.p} onChange={e=>setRf(p=>({...p,p:e.target.value}))} placeholder="Τουλαχιστον 4 χαρακτηρες"/></div>
            <div className="lfield"><label>Επιβεβαιωση</label>
              <input type="password" value={rf.c} onChange={e=>setRf(p=>({...p,c:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&onReg()} placeholder="Ξανα το password"/></div>
            <button className="login-submit" onClick={onReg} disabled={busy}><span>{busy?"...":"ΕΓΓΡΑΦΗ"}</span></button>
            <div className="lsw">Εχεις λογαριασμο; <button onClick={()=>setMode("login")}>Συνδεση</button></div>
          </>):(<>
            {lerr&&<div className="lerr">{lerr}</div>}
            <div className="lfield"><label>Username</label>
              <input value={lf.u} onChange={e=>setLf(p=>({...p,u:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&onLogin()} placeholder="Το username σου"/></div>
            <div className="lfield"><label>Password</label>
              <input type="password" value={lf.p} onChange={e=>setLf(p=>({...p,p:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&onLogin()} placeholder="••••••••"/></div>
            <button className="login-submit" onClick={onLogin} disabled={busy}><span>{busy?"...":"ΕΙΣΟΔΟΣ"}</span></button>
            <div className="lsw">Δεν εχεις λογαριασμο; <button onClick={()=>setMode("register")}>Εγγραφη</button></div>
            <div className="lhint">Admin: admin / admin123</div>
          </>)}
        </div>
      </div>
    </div>
  );
}

// Lightweight confetti — gold/green pieces falling, pure CSS animation
function Confetti(){
  const pieces=Array.from({length:60},(_,i)=>i);
  const colors=["#f0c54a","#ffd866","#3ddc84","#ff8c28","#eceae3"];
  return(
    <div className="confetti-layer">
      {pieces.map(i=>{
        const left=Math.random()*100;
        const delay=Math.random()*0.6;
        const dur=1.8+Math.random()*1.2;
        const size=6+Math.random()*8;
        const col=colors[i%colors.length];
        const rot=Math.random()*360;
        return <span key={i} className="confetti-pc" style={{
          left:`${left}%`, width:size, height:size*1.4, background:col,
          animationDelay:`${delay}s`, animationDuration:`${dur}s`, transform:`rotate(${rot}deg)`
        }}/>;
      })}
    </div>
  );
}

export default function App(){
  const [booting,setBooting]=useState(true);
  const [me,setMe]=useState(null);
  const [view,setView]=useState("login");
  const [lf,setLf]=useState({u:"",p:""});
  const [rf,setRf]=useState({u:"",p:"",c:""});
  const [lerr,setLerr]=useState("");const [rerr,setRerr]=useState("");
  const [busy,setBusy]=useState(false);
  const [toast,setToast]=useState(null);
  const [adminTab,setAdminTab]=useState("results");
  const [adminDate,setAdminDate]=useState(ALL_DATES[0]||"");
  const [fetching,setFetching]=useState(false);
  const [apiInput,setApiInput]=useState("");
  const [adminPrev,setAdminPrev]=useState(null);
  const [bracketPhase,setBracketPhase]=useState("round32");
  const [adminTimeDate,setAdminTimeDate]=useState(ALL_DATES[0]||"");
  const [timeDraft,setTimeDraft]=useState({}); // local edits before save
  const [pwEdit,setPwEdit]=useState({}); // (unused, kept for compat)
  const [clearDaySel,setClearDaySel]=useState({}); // userId -> selected day for clearing votes
  const [confetti,setConfetti]=useState(false);
  const [sharing,setSharing]=useState(false);
  const prevWinsRef=useRef(null); // track wins to trigger confetti

  // ── shared data from Supabase ──
  const [users,setUsers]=useState([]);
  const [predictions,setPredictions]=useState({}); // userId -> date -> matchId -> pick
  const [results,setResults]=useState({});         // matchId -> "1"|"X"|"2"
  const [apiTeams,setApiTeams]=useState({});       // matchId -> {home,away}
  const [matchTimes,setMatchTimes]=useState({});   // matchId -> "HH:MM" (Greek time)
  const [adjustments,setAdjustments]=useState({}); // userId -> manual points (+/-)
  const [apiKey,setApiKey]=useState("");
  const [lastFetch,setLastFetch]=useState(null);
  const [nowTick,setNowTick]=useState(Date.now()); // updates every 30s for lock checks

  // ── ΩΡΑ & ΑΓΩΝΙΣΤΙΚΗ ΒΡΑΔΙΑ (ωρα Ελλαδας) ──
  // Ενα "ματς-βραδι" τρεχει απο τις 08:00 μιας μερας μεχρι τις 08:00 της επομενης.
  // Ολα τα ματς που παιζονται 22:00→08:00 ανηκουν στη βραδια που ξεκινησε το προηγουμενο βραδυ.
  const greekNow=new Date(new Date(nowTick).toLocaleString("en-US",{timeZone:"Europe/Athens"}));
  const greekHour=greekNow.getHours();
  const pad2=n=>String(n).padStart(2,"0");
  const greekDateStr=`${greekNow.getFullYear()}-${pad2(greekNow.getMonth()+1)}-${pad2(greekNow.getDate())}`;
  // Η τρεχουσα "βραδια": αν ειναι πριν τις 08:00 → ανηκει στη χθεσινη βραδια, αλλιως στη σημερινη
  const currentNight = greekHour<8 ? addDays(greekDateStr,-1) : greekDateStr;
  const today=currentNight; // ο,τι λεγαμε "σημερα" = η τρεχουσα αγωνιστικη βραδια
  const showToast=(msg,type="ok")=>{setToast({msg,type});setTimeout(()=>setToast(null),2600);};

  // clock tick for auto-lock + auto-advance (every 30s)
  useEffect(()=>{ const t=setInterval(()=>setNowTick(Date.now()),30000); return ()=>clearInterval(t); },[]);

  // ── LOCK LOGIC: ενα ματς κλειδωνει 15' πριν την εναρξη του (ωρα Ελλαδας) ──
  // Ωρα: matchTimes[id] (χειροκινητη υπερισχυει) αλλιως το προ-συμπληρωμενο gtime.
  // Πρωινες ωρες (<12:00) σημαινει ξημερωματα → η εναρξη ειναι την ΕΠΟΜΕΝΗ μερα απο τη βραδια.
  function kickoffTime(matchId){ return matchTimes[matchId] || SCHED_BY_ID[matchId]?.gtime || ""; }
  function isLocked(matchId, nightDate){
    const hhmm=kickoffTime(matchId);
    if(!hhmm) return false; // χωρις ωρα → μενει ανοιχτο
    const [h,m]=hhmm.split(":").map(Number);
    if(isNaN(h)||isNaN(m)) return false;
    const kdate = h<12 ? addDays(nightDate,1) : nightDate; // ξημερωματα → επομενη μερα
    const nowAthens=new Date(new Date(nowTick).toLocaleString("en-US",{timeZone:"Europe/Athens"}));
    const kickoff=new Date(`${kdate}T${pad2(h)}:${pad2(m)}:00`);
    const lockAt=new Date(kickoff.getTime()-15*60*1000);
    return nowAthens.getTime() >= lockAt.getTime();
  }

  // ── LOAD ALL DATA ──
  const loadAll = useCallback(async()=>{
    try{
      // Φορτωνουμε ΟΛΕΣ τις ψηφους με σελιδοποιηση (το Supabase επιστρεφει max 1000/φορα).
      async function fetchAllPredictions(){
        const all=[]; const size=1000; let from=0;
        for(let i=0;i<50;i++){ // ασφαλεια: μεχρι 50.000 ψηφους
          const {data,error}=await supabase.from("predictions").select("*").range(from,from+size-1);
          if(error){ console.error("preds page error",error); break; }
          if(!data||data.length===0) break;
          all.push(...data);
          if(data.length<size) break;
          from+=size;
        }
        return all;
      }
      const [{data:us},preds,{data:gd}] = await Promise.all([
        supabase.from("users").select("*"),
        fetchAllPredictions(),
        supabase.from("game_data").select("*"),
      ]);
      setUsers(us||[]);
      // build predictions map
      const pmap={};
      (preds||[]).forEach(p=>{
        pmap[p.user_id]??={};
        pmap[p.user_id][p.match_date]??={};
        pmap[p.user_id][p.match_date][p.match_id]=p.pick;
      });
      setPredictions(pmap);
      // game_data rows
      (gd||[]).forEach(row=>{
        if(row.key==="results") setResults(row.value||{});
        if(row.key==="apiTeams") setApiTeams(row.value||{});
        if(row.key==="matchTimes") setMatchTimes(row.value||{});
        if(row.key==="adjustments") setAdjustments(row.value||{});
        if(row.key==="meta"){ setApiKey(row.value?.apiKey||""); setLastFetch(row.value?.lastFetch||null); }
      });
    }catch(e){ console.error("loadAll error",e); }
  },[]);

  // ── BOOT: restore session + load + realtime ──
  useEffect(()=>{
    (async()=>{
      await loadAll();
      // restore session
      try{
        const saved=localStorage.getItem(LS_SESSION);
        if(saved){
          const {id}=JSON.parse(saved);
          const {data}=await supabase.from("users").select("*").eq("id",id).maybeSingle();
          if(data){ setMe(data); setView(data.is_admin?"admin":"predict"); }
        }
      }catch{}
      setBooting(false);
    })();

    // realtime: reload on any change
    const ch=supabase.channel("wc2026-changes")
      .on("postgres_changes",{event:"*",schema:"public",table:"predictions"},loadAll)
      .on("postgres_changes",{event:"*",schema:"public",table:"users"},loadAll)
      .on("postgres_changes",{event:"*",schema:"public",table:"game_data"},loadAll)
      .subscribe();
    // gentle polling fallback every 25s
    const poll=setInterval(loadAll,25000);
    return ()=>{ supabase.removeChannel(ch); clearInterval(poll); };
  },[loadAll]);

  function resolve(m){const ov=apiTeams[m.id]||{};return{...m,home:ov.home||m.home,away:ov.away||m.away,result:results[m.id]||null};}

  // ── AUTH ──
  async function login(){
    setBusy(true);setLerr("");
    try{
      const {data}=await supabase.from("users").select("*").eq("username",lf.u).eq("password",lf.p).maybeSingle();
      if(!data){ setLerr("Λαθος στοιχεια"); setBusy(false); return; }
      localStorage.setItem(LS_SESSION,JSON.stringify({id:data.id}));
      setMe(data); setView(data.is_admin?"admin":"predict");
      await loadAll();
    }catch(e){ setLerr("Σφαλμα συνδεσης"); }
    setBusy(false);
  }
  async function reg(){
    setRerr("");
    if(!rf.u.trim()){setRerr("Βαλε username");return;}
    if(rf.p.length<4){setRerr("Password τουλαχιστον 4 χαρακτηρες");return;}
    if(rf.p!==rf.c){setRerr("Τα password δεν ταιριαζουν");return;}
    setBusy(true);
    try{
      const {data:exists}=await supabase.from("users").select("id").eq("username",rf.u).maybeSingle();
      if(exists){ setRerr("Υπαρχει ηδη αυτο το username"); setBusy(false); return; }
      const nu={id:`u${Date.now()}`,username:rf.u,password:rf.p,is_admin:false};
      const {error}=await supabase.from("users").insert(nu);
      if(error){ setRerr("Σφαλμα εγγραφης"); setBusy(false); return; }
      localStorage.setItem(LS_SESSION,JSON.stringify({id:nu.id}));
      setMe(nu); setView("predict");
      await loadAll();
    }catch(e){ setRerr("Σφαλμα συνδεσης"); }
    setBusy(false);
  }
  function logout(){ localStorage.removeItem(LS_SESSION); setMe(null);setView("login");setLf({u:"",p:""}); }

  // ── VOTE (locked after submit OR after kickoff-15min) ──
  async function vote(matchId,pick,voteDate,matchDate){
    const vd=voteDate||today;
    const md=matchDate||today;
    // Εχει ηδη ψηφισει αυτο το ματς (σε οποιαδηποτε ημερομηνια); μην ξαναψηφισεις.
    if(findPick(predictions[me.id],matchId)) return;
    if(isLocked(matchId,md)){ showToast("Η ψηφοφορια εκλεισε","err"); return; }
    // optimistic
    setPredictions(prev=>{const n={...prev};n[me.id]??={};n[me.id][vd]??={};n[me.id][vd]={...n[me.id][vd],[matchId]:pick};return n;});
    showToast("Ψηφος κλειδωθηκε");
    const {error}=await supabase.from("predictions").insert({user_id:me.id,match_id:matchId,match_date:vd,pick});
    if(error){
      if(error.code==="23505"||String(error.message||"").includes("409")||String(error.code)==="409"){
        // ηδη υπαρχει ψηφος γι' αυτο το ματς — απλα φορτωσε ξανα, χωρις σφαλμα
        await loadAll();
      }else{
        showToast("Σφαλμα — δοκιμασε ξανα","err"); loadAll();
      }
    }
  }

  // ── ADMIN: results ──
  async function setRes(mid,r){
    const cur=results[mid];
    const next={...results};
    if(cur===r) delete next[mid]; else next[mid]=r;
    setResults(next);
    await supabase.from("game_data").upsert({key:"results",value:next,updated_at:new Date().toISOString()});
  }
  async function delUser(uid){
    setUsers(u=>u.filter(x=>x.id!==uid));
    await supabase.from("users").delete().eq("id",uid);
    await loadAll();
    showToast("Διαγραφηκε","err");
  }
  // ── ADMIN: clear a player's votes for a specific day (so they can re-vote) ──
  async function clearVotes(uid, date){
    // optimistic local update
    setPredictions(prev=>{
      const n={...prev};
      if(n[uid]){ n[uid]={...n[uid]}; delete n[uid][date]; }
      return n;
    });
    await supabase.from("predictions").delete().eq("user_id",uid).eq("match_date",date);
    await loadAll();
    showToast("Οι ψηφοι καθαριστηκαν");
  }
  // ── ADMIN: add/remove manual points to a player ──
  async function adjustPoints(uid, delta){
    const merged={...adjustments, [uid]:(adjustments[uid]||0)+delta};
    if(merged[uid]===0) delete merged[uid];
    setAdjustments(merged);
    await supabase.from("game_data").upsert({key:"adjustments",value:merged,updated_at:new Date().toISOString()});
    showToast(delta>0?`+${delta} ποντος/οι`:`${delta} ποντος/οι`);
  }

  // ── SHARE LEADERBOARD as image ──
  async function shareLeaderboard(){
    setSharing(true);
    try{
      const top=board.slice(0,15);
      const W=1080, rowH=78, headH=300, footH=90;
      const H=headH+top.length*rowH+footH;
      const c=document.createElement("canvas"); c.width=W; c.height=H;
      const ctx=c.getContext("2d");
      // bg
      const g=ctx.createLinearGradient(0,0,0,H);
      g.addColorStop(0,"#0d1117"); g.addColorStop(1,"#070809");
      ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
      // gold glow top
      const gg=ctx.createRadialGradient(W/2,0,0,W/2,0,W*0.7);
      gg.addColorStop(0,"rgba(244,203,85,0.18)"); gg.addColorStop(1,"transparent");
      ctx.fillStyle=gg; ctx.fillRect(0,0,W,headH);
      // title
      ctx.textAlign="center";
      ctx.fillStyle="#f0c54a";
      ctx.font="800 76px Georgia, serif";
      ctx.fillText("WC 2026", W/2, 130);
      ctx.fillStyle="#b4b1a7";
      ctx.font="600 34px Georgia, serif";
      ctx.fillText("ΚΑΤΑΤΑΞΗ ΠΑΡΕΑΣ", W/2, 185);
      ctx.fillStyle="#6a6960";
      ctx.font="400 26px Georgia, serif";
      const dstr=new Date().toLocaleDateString("el-GR",{day:"numeric",month:"long",year:"numeric"});
      ctx.fillText(dstr, W/2, 230);
      // header line
      ctx.strokeStyle="rgba(244,203,85,0.3)"; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(80,headH-25); ctx.lineTo(W-80,headH-25); ctx.stroke();
      // rows
      top.forEach((u,i)=>{
        const y=headH+i*rowH;
        const medal=i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}`;
        if(u.id===me?.id){ ctx.fillStyle="rgba(244,203,85,0.08)"; ctx.fillRect(40,y,W-80,rowH-8); }
        ctx.textAlign="left";
        ctx.fillStyle=i<3?"#f0c54a":"#8a8980";
        ctx.font="700 40px Georgia, serif";
        ctx.fillText(medal, 70, y+50);
        ctx.fillStyle="#eceae3";
        ctx.font="600 38px Georgia, serif";
        let nm=u.username; if(nm.length>22)nm=nm.slice(0,21)+"…";
        ctx.fillText(nm, 190, y+50);
        ctx.textAlign="right";
        ctx.fillStyle="#f0c54a";
        ctx.font="800 44px Georgia, serif";
        ctx.fillText(String(u.total), W-70, y+50);
      });
      // footer
      ctx.textAlign="center";
      ctx.fillStyle="#6a6960";
      ctx.font="400 24px Georgia, serif";
      ctx.fillText("⚽ FIFA World Cup 2026 · Prediction League", W/2, H-40);

      const blob=await new Promise(r=>c.toBlob(r,"image/png"));
      const file=new File([blob],"wc2026-leaderboard.png",{type:"image/png"});
      // try native share (mobile)
      if(navigator.canShare && navigator.canShare({files:[file]})){
        await navigator.share({files:[file],title:"WC 2026 Καταταξη"});
      }else{
        // fallback: download
        const url=URL.createObjectURL(blob);
        const a=document.createElement("a"); a.href=url; a.download="wc2026-leaderboard.png"; a.click();
        URL.revokeObjectURL(url);
        showToast("Η εικονα κατεβηκε");
      }
    }catch(e){ if(e.name!=="AbortError") showToast("Σφαλμα μοιρασιας","err"); }
    setSharing(false);
  }
  // ── ADMIN: save kickoff times (Greek time) ──
  async function saveMatchTimes(){
    const merged={...matchTimes};
    Object.entries(timeDraft).forEach(([id,val])=>{
      const v=(val||"").trim();
      if(v==="") delete merged[id]; else merged[id]=v;
    });
    setMatchTimes(merged); setTimeDraft({});
    await supabase.from("game_data").upsert({key:"matchTimes",value:merged,updated_at:new Date().toISOString()});
    showToast("Ωρες αποθηκευτηκαν");
  }
  async function doFetch(){
    setFetching(true);
    try{
      const{newTeams,newResults}=await fetchFromAPI();
      const mergedRes={...results,...newResults};
      const mergedTeams={...apiTeams,...newTeams};
      const now=new Date().toISOString();
      setResults(mergedRes); setApiTeams(mergedTeams); setLastFetch(now);
      await Promise.all([
        supabase.from("game_data").upsert({key:"results",value:mergedRes,updated_at:now}),
        supabase.from("game_data").upsert({key:"apiTeams",value:mergedTeams,updated_at:now}),
        supabase.from("game_data").upsert({key:"meta",value:{lastFetch:now},updated_at:now}),
      ]);
      const rc=Object.keys(newResults).length, tc=Object.keys(newTeams).length;
      if(rc===0 && tc===0) showToast("Δεν βρεθηκαν νεα αποτελεσματα ακομα");
      else showToast(`${rc} αποτελεσματα · ${tc} ομαδες`);
    }catch(e){ showToast(`Σφαλμα: ${e.message}`,"err"); }
    setFetching(false);
  }

  // ── DERIVED ──
  const myPreds=me?(predictions[me.id]||{}):{};
  const myDayPts=calcDayPts(today,myPreds,results);
  const myStats=me?playerStats(myPreds,results):null;
  const daysWithRes=ALL_DATES.filter(d=>(BY_DATE[d]||[]).some(m=>results[m.id]));
  const board=users.map(u=>{const p=predictions[u.id]||{};const rows=ALL_DATES.map(d=>({date:d,pts:calcDayPts(d,p,results)}));const adj=adjustments[u.id]||0;return{...u,isAdmin:u.is_admin,rows,adj,base:rows.reduce((s,r)=>s+r.pts,0),total:rows.reduce((s,r)=>s+r.pts,0)+adj};}).sort((a,b)=>b.total-a.total);
  const myBoard=board.find(u=>u.id===me?.id);
  // ── ΑΓΩΝΙΣΤΙΚΗ ΒΡΑΔΙΑ ──
  // Αφου το date καθε ματς ΕΙΝΑΙ η βραδια στην οποια ανηκει, τα "σημερινα" ματς
  // ειναι απλα οσα εχουν date === τρεχουσα βραδια. Τα ξημερωματιστικα (gtime<12:00)
  // σημαδευονται ωστε να φαινεται "🌙 Ξημερωματα" στην καρτα.
  const todayMatches=(BY_DATE[today]||[]).map(m=>{
    const t=kickoffTime(m.id);
    const isEarly = t && Number(t.split(":")[0])<12;
    return {...resolve(m), voteDate:today, isNextDayEarly:isEarly};
  });

  // Confetti when my number of correct predictions increases
  useEffect(()=>{
    if(!me||!myStats) return;
    const wins=myStats.correct;
    if(prevWinsRef.current===null){ prevWinsRef.current=wins; return; } // init, no confetti on first load
    if(wins>prevWinsRef.current){
      setConfetti(true);
      setTimeout(()=>setConfetti(false),2600);
    }
    prevWinsRef.current=wins;
  },[myStats?.correct,me]);

  const css=STYLES;

  // ─── RENDER FUNCTIONS (same UI as before) ───
  function renderPredict(){
    const dp=myPreds[today]||{};
    const resCount=todayMatches.filter(m=>m.result).length;
    const votedCount=todayMatches.filter(m=>findPick(myPreds,m.id)).length;
    const grouped={};todayMatches.forEach(m=>{ (grouped[m.phase]??=[]).push(m); });
    if(!todayMatches.length) return(<div className="no-m"><div className="ico">🏟️</div><h3>ΚΑΝΕΝΑ ΜΑΤΣ ΣΗΜΕΡΑ</h3><p>Τα ματς ξεκινουν 11 Ιουνιου 2026.<br/>Δες την καταταξη ή το bracket στο μεταξυ!</p></div>);
    return(<>
      <div className="scorepanel"><div className="sp-row">
        <div className="sp-l"><h3>{caps(fmtLong(today))}</h3><p>{todayMatches.length} ματς · {votedCount} ψηφισεις · {resCount} αποτελεσματα</p></div>
        <div className="sp-r"><div className="sp-num">{myDayPts}</div><div className="sp-lbl">ΠΟΝΤΟΙ</div></div>
      </div></div>
      <div className="lockbar">🔒 Η ψηφοφορια κλειδωνει 15' πριν το ματς · μετα φανερωνονται οι ψηφοι ολων</div>
      {Object.entries(grouped).map(([phase,ms])=>(
        <div key={phase}>
          <div className="psep"><span className="plabel">{caps(PHASE_LABEL[phase])}{ms[0]?.group?` · ΟΜ. ${ms[0].group}`:""}</span></div>
          {ms.map(m=>{
            const mDate=m.date; // η βραδια στην οποια ανηκει το ματς
            const pick=findPick(myPreds,m.id),res=m.result;
            const won=pick&&res&&pick===res,lost=pick&&res&&pick!==res;
            const timeLocked=isLocked(m.id,mDate);
            const locked=!!pick||timeLocked; // can't vote if already voted OR time passed
            const kickoff=kickoffTime(m.id);
            const crowd=timeLocked?crowdVotes(m.id,today,predictions):null;
            const revealed=timeLocked;
            return(<div key={m.id} className={`mc${won?" won":lost?" lost":pick?" voted":""}`}>
              <div className="mc-head">
                <div className="mc-side"><span className="mc-bigflag">{F(m.home)}</span><span className="mc-team">{m.home}</span></div>
                <div className="mc-mid">
                  <span className="mc-vs">VS</span>
                  {kickoff&&<span className="mc-time">{timeLocked?"🔒 ":"⏰ "}{kickoff}</span>}
                  {res?<span className={`mc-result-pill ${won?"win":"loss"}`}>{won?"✓ +1":`Ληξη ${res}`}</span>:pick?<span className="mc-result-pill pend">⏳</span>:null}
                </div>
                <div className="mc-side"><span className="mc-bigflag">{F(m.away)}</span><span className="mc-team">{m.away}</span></div>
              </div>
              {m.isNextDayEarly&&<div className="mc-nextday">🌙 Ξημερωματα {fmtShort(addDays(mDate,1))}</div>}
              <div className="mc-votes">
                {["1","X","2"].map(v=>(<button key={v} className={`bigv${pick===v?` s${v}`:""}${locked?" lk":""}`} onClick={()=>!locked&&vote(m.id,v,today,mDate)}>
                  {pick===v&&<span className="bigv-lock">🔒</span>}
                  <span className="bigv-k">{v}</span>
                  <span className="bigv-sub">{v==="X"?"ΙΣΟΠΑΛΙΑ":v==="1"?"ΓΗΠΕΔΟΥΧΟΣ":"ΦΙΛΟΞΕΝ."}</span>
                  {crowd&&crowd.total>0&&<span className="bigv-pct">{v==="1"?crowd.p1:v==="X"?crowd.pX:crowd.p2}%</span>}
                </button>))}
              </div>
              {timeLocked&&!pick&&<div className="mc-missed">Δεν ψηφισες αυτο το ματς</div>}
              {revealed&&<MatchReveal matchId={m.id} matchDate={today} />}
            </div>);
          })}
        </div>
      ))}
    </>);
  }

  // Shows everyone's vote for a match (after it locks)
  function MatchReveal({matchId,matchDate}){
    const rows=board.map(u=>({name:u.username,pick:findPick(predictions[u.id],matchId)})).filter(r=>r.pick);
    if(rows.length===0) return null;
    return(
      <div className="reveal">
        <div className="reveal-h">👥 Τι ψηφισαν ({rows.length})</div>
        <div className="reveal-list">
          {rows.map((r,i)=>(
            <span key={i} className={`reveal-chip rv${r.pick}`}>{r.name}: <b>{r.pick}</b></span>
          ))}
        </div>
      </div>
    );
  }

  function renderHistory(){
    const pastDays=ALL_DATES.filter(d=>d<=today && Object.keys(myPreds[d]||{}).length>0).reverse();
    const streak=voteStreak(myPreds);
    if(pastDays.length===0) return(
      <>
        <div className="ptop"><div className="ptitle"><em>ΤΟ ΙΣΤΟΡΙΚΟ ΜΟΥ</em></div><div className="psub">Οι ψηφοι σου ανα ημερα</div></div>
        <div className="no-m"><div className="ico">📋</div><h3>ΑΚΟΜΑ ΤΙΠΟΤΑ</h3><p>Μολις ψηφισεις, οι επιλογες σου θα εμφανιζονται εδω.</p></div>
      </>
    );
    return(<>
      <div className="ptop"><div className="ptitle"><em>ΤΟ ΙΣΤΟΡΙΚΟ ΜΟΥ</em></div><div className="psub">Οι ψηφοι σου ανα ημερα</div></div>
      <div className="streak-card">
        <div className="streak-flame">🔥</div>
        <div><div className="streak-num">{streak}</div><div className="streak-lbl">{streak===1?"μερα σερι":"μερες σερι"}</div></div>
        <div className="streak-side">Συνεχομενες μερες με ψηφο</div>
      </div>
      {pastDays.map(d=>{
        const dayPreds=myPreds[d]||{};
        const ms=(BY_DATE[d]||[]).map(resolve);
        const dayPts=calcDayPts(d,myPreds,results);
        return(
          <div key={d} className="hist-day">
            <div className="hist-head"><span className="hist-date">{caps(fmtLong(d))}</span><span className="hist-pts">+{dayPts}</span></div>
            {ms.filter(m=>dayPreds[m.id]).map(m=>{
              const pick=dayPreds[m.id],r=m.result;
              const won=r&&pick===r,lost=r&&pick!==r;
              return(
                <div key={m.id} className="hist-row">
                  <span className="hist-match">{F(m.home)} {m.home.slice(0,3).toUpperCase()} - {m.away.slice(0,3).toUpperCase()} {F(m.away)}</span>
                  <span className={`hist-pick ${won?"hw":lost?"hl":"hp"}`}>{pick}{won?" ✓":lost?" ✗":""}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </>);
  }

  function renderLeaderboard(){
    const myBadges=me?computeBadges(myPreds,results,board[0]?.id===me.id&&(myBoard?.total||0)>0):[];
    return(<>
      <div className="ptop" style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:".5rem"}}>
        <div><div className="ptitle"><em>ΚΑΤΑΤΑΞΗ</em></div><div className="psub">{users.length} παικτες · {daysWithRes.length} ημερες</div></div>
        <button className="share-btn" onClick={shareLeaderboard} disabled={sharing}>{sharing?"...":"📤 Μοιρασου"}</button>
      </div>
      {myBadges.length>0&&(
        <div className="mybadges">
          <div className="mybadges-h">Τα παρασημα μου</div>
          <div className="mybadges-row">
            {myBadges.map((b,i)=>(<span key={i} className="badge" title={b.desc}>{b.icon} {b.name}</span>))}
          </div>
        </div>
      )}
      {daysWithRes.length===0&&<div className="lb-empty">Κανενα αποτελεσμα ακομα. Η καταταξη εμφανιζεται με τα πρωτα αποτελεσματα.</div>}
      <div className="lb-card"><div className="lb-scroll"><table className="lb-tbl">
        <thead><tr><th>#</th><th>Παικτης</th><th>Συν.</th>{daysWithRes.map(d=><th key={d}>{fmtShort(d)}</th>)}</tr></thead>
        <tbody>{board.map((u,i)=>{const rc=i===0?"g":i===1?"s":i===2?"b":"";const medal=i===0?"🥇":i===1?"🥈":i===2?"🥉":null;
          const ubadges=computeBadges(predictions[u.id]||{},results,i===0&&u.total>0);
          return(<tr key={u.id} className={`lb-row${u.id===me?.id?" me-row":""}`}>
            <td><span className={`rnk ${rc}`}>{medal||i+1}</span></td>
            <td><span className="ucell">{u.username}{u.id===me?.id&&<span className="me-badge">ΕΣΥ</span>}{u.isAdmin&&<span style={{fontSize:".58rem",color:"var(--muted)",marginLeft:4}}>⚙</span>}</span>
              {ubadges.length>0&&<span className="row-badges">{ubadges.slice(0,3).map((b,bi)=><span key={bi} className="row-badge" title={b.name+" · "+b.desc}>{b.icon}</span>)}</span>}
            </td>
            <td><span className="tcell">{u.total}</span></td>
            {daysWithRes.map(d=>{const pts=u.rows.find(r=>r.date===d)?.pts||0;return<td key={d}><span className={`dc ${pts>0?"pos":"zero"}`}>{pts>0?`+${pts}`:"—"}</span></td>;})}
          </tr>);
        })}</tbody>
      </table></div></div>
    </>);
  }

  function renderBracket(){
    const phases=[["round32","R32"],["round16","R16"],["quarter","QF"],["semi","SF"],["final","ΤΕΛΙΚΟΣ"]];
    const phaseMatches=SCHEDULE.filter(m=>m.phase===bracketPhase).map(resolve);
    const finalMatch=bracketPhase==="final"?phaseMatches[0]:null;
    const champion=finalMatch&&finalMatch.result?(finalMatch.result==="1"?finalMatch.home:finalMatch.result==="2"?finalMatch.away:null):null;
    return(<>
      <div className="ptop"><div className="ptitle">🏆 <em>BRACKET</em></div><div className="psub">Το δεντρο της νοκ-αουτ φασης</div></div>
      <div className="br-phases">{phases.map(([k,l])=>(<button key={k} className={`br-ph${bracketPhase===k?" on":""}`} onClick={()=>setBracketPhase(k)}>{l}</button>))}</div>
      {bracketPhase==="final"&&champion&&(<div className="br-match final-match"><div className="br-trophy-final">
        <div className="champ-label">🏆 ΠΑΓΚΟΣΜΙΟΣ ΠΡΩΤΑΘΛΗΤΗΣ</div><div className="champ-flag">{F(champion)}</div><div className="champ-name">{caps(champion)}</div>
      </div></div>)}
      {phaseMatches.map(m=>{const win=m.result==="1"?m.home:m.result==="2"?m.away:null;const isFinal=m.phase==="final";
        return(<div key={m.id} className={`br-match${isFinal?" final-match":""}`}>
          <div className="br-match-label">{m.label} · {fmtShort(m.date)}</div>
          <div className={`br-team${win===m.home?" winner":win?" dim":""}`}><span className="br-team-flag">{F(m.home)}</span><span className="br-team-name">{m.home}</span>{win===m.home&&<span className="br-crown">👑</span>}</div>
          <div className={`br-team${win===m.away?" winner":win?" dim":""}`}><span className="br-team-flag">{F(m.away)}</span><span className="br-team-name">{m.away}</span>{win===m.away&&<span className="br-crown">👑</span>}</div>
        </div>);
      })}
      <div className="info-bar" style={{marginTop:".5rem"}}>Οι ομαδες & τα αποτελεσματα ενημερωνονται αυτοματα απο το API καθως προχωραει το τουρνουα.</div>
    </>);
  }

  function renderAdmin(){
    const prevDate=adminPrev||today;
    const dateMs=(BY_DATE[adminDate]||[]).map(resolve);
    const prevMs=(BY_DATE[prevDate]||[]).map(resolve);
    return(<>
      <div className="ptop"><div className="ptitle"><em>ADMIN</em></div><div className="psub">Διαχειριση αποτελεσματων & παικτων</div></div>
      <div className="atabs">{[["results","Αποτελεσματα"],["times","Ωρες"],["auto","API"],["preview","Preview"],["users","Χρηστες"]].map(([k,l])=>(<button key={k} className={`atab${adminTab===k?" on":""}`} onClick={()=>setAdminTab(k)}>{l}</button>))}</div>
      {adminTab==="results"&&(<>
        <div className="info-bar">1 = νικη γηπεδουχου · X = ισοπαλια · 2 = νικη φιλοξενουμενου — Πατα ξανα για αφαιρεση.</div>
        <div className="dstrip">{ALL_DATES.map(d=><button key={d} className={`dtab${d===adminDate?" on":""}`} onClick={()=>setAdminDate(d)}>{fmtShort(d)}</button>)}</div>
        <div className="asec"><div className="asec-h">{fmtLong(adminDate)}</div>
          {dateMs.length===0&&<div style={{color:"var(--muted)",fontSize:".8rem"}}>Δεν υπαρχουν ματς.</div>}
          {dateMs.map(m=>(<div key={m.id} className="am">
            <div className="am-l"><div className="am-team">{F(m.home)} {m.home} vs {m.away} {F(m.away)}</div><div className="am-sub">{m.label||`Ομ. ${m.group}`} · {PHASE_LABEL[m.phase]}{apiTeams[m.id]?" 🤖":""}</div></div>
            {["1","X","2"].map(v=><button key={v} className={`rbtn${m.result===v?` r${v}on`:""}`} onClick={()=>setRes(m.id,v)}>{v}</button>)}
            {m.result&&<span style={{fontSize:".7rem",color:"var(--green)"}}>✓</span>}
          </div>))}
        </div>
      </>)}
      {adminTab==="times"&&(()=>{
        const tMs=(BY_DATE[adminTimeDate]||[]).map(resolve);
        const nextDayLabel=(()=>{const d=new Date(adminTimeDate+"T12:00:00");d.setDate(d.getDate()+1);return d.toLocaleDateString("el-GR",{day:"numeric",month:"short"});})();
        return(<>
          <div className="info-bar">Οι ωρες ειναι <b>ηδη συμπληρωμενες</b> απο το επισημο προγραμμα (ωρα Ελλαδας). Αλλαξε καποια μονο αν χρειαστει. Η ψηφοφορια κλειδωνει αυτοματα <b>15' πριν</b>.<br/><br/>🌙 Ωρες πριν τις 12:00 = ξημερωματα της επομενης μερας ({nextDayLabel}).</div>
          <div className="dstrip">{ALL_DATES.map(d=><button key={d} className={`dtab${d===adminTimeDate?" on":""}`} onClick={()=>setAdminTimeDate(d)}>{fmtShort(d)}</button>)}</div>
          <div className="asec"><div className="asec-h">{fmtLong(adminTimeDate)}</div>
            {tMs.length===0&&<div style={{color:"var(--muted)",fontSize:".8rem"}}>Δεν υπαρχουν ματς.</div>}
            {tMs.map(m=>{
              const cur = (m.id in timeDraft) ? timeDraft[m.id] : (matchTimes[m.id]||m.gtime||"");
              const curH = cur ? cur.split(":")[0] : "";
              const curM = cur ? cur.split(":")[1] : "";
              const isNextDay = cur && Number(curH)<12;
              const setHM=(h,mm)=>{ if(h===""&&mm===""){ setTimeDraft(d=>({...d,[m.id]:""})); return; } const H=(h===""?(curH||"00"):h).padStart(2,"0"); const M=(mm===""?(curM||"00"):mm).padStart(2,"0"); setTimeDraft(d=>({...d,[m.id]:`${H}:${M}`})); };
              return(<div key={m.id} className="am">
                <div className="am-l"><div className="am-team">{F(m.home)} {m.home} vs {m.away} {F(m.away)}</div><div className="am-sub">{m.label||`Ομ. ${m.group}`}{isNextDay&&<span style={{color:"var(--gold3)"}}> · ξημερωματα {nextDayLabel}</span>}</div></div>
                <div className="time-pick">
                  <select className="time-sel" value={curH} onChange={e=>setHM(e.target.value,curM||"00")}>
                    <option value="">--</option>
                    {Array.from({length:24},(_,i)=>String(i).padStart(2,"0")).map(h=><option key={h} value={h}>{h}</option>)}
                  </select>
                  <span className="time-colon">:</span>
                  <select className="time-sel" value={curM} onChange={e=>setHM(curH||"00",e.target.value)}>
                    <option value="">--</option>
                    {["00","15","30","45"].map(mm=><option key={mm} value={mm}>{mm}</option>)}
                  </select>
                  {cur&&<button className="time-clear" onClick={()=>setTimeDraft(d=>({...d,[m.id]:""}))} title="Καθαρισμος">✕</button>}
                </div>
              </div>);
            })}
            {tMs.length>0&&<button className="bsm b-gold" style={{marginTop:".8rem",width:"100%"}} onClick={saveMatchTimes}>💾 Αποθηκευση ωρων</button>}
          </div>
        </>);
      })()}
      {adminTab==="auto"&&(<div className="fetch-card">
        <div className="fetch-title">Αυτοματη Ανακτηση Αποτελεσματων</div>
        <div className="fetch-desc">Τραβαει αυτοματα τα αποτελεσματα + ομαδες knockout απο δωρεαν δημοσια βαση (openfootball). Δεν χρειαζεται κλειδι.<br/><br/>Πατα <b>Ανακτηση</b> μετα το τελος των ματς — οι ποντοι μοιραζονται αυτοματα σε οσους ψηφισαν σωστα, για ολους.</div>
        <div className="fetch-row">
          <button className="bsm b-gold" onClick={doFetch} disabled={fetching} style={{flex:1,minWidth:140}}>{fetching?"Φορτωση...":"🔄 Ανακτηση τωρα"}</button>
        </div>
        {lastFetch&&<div className="last-f">Τελευταια ανακτηση: {new Date(lastFetch).toLocaleString("el-GR")}</div>}
        <div className="last-f" style={{marginTop:".4rem",opacity:.8}}>Σημ: τα δεδομενα ενημερωνονται ~1 φορα/ημερα στην πηγη. Αν δεν εμφανιστει αποτελεσμα αμεσως μετα το ματς, ξαναδοκιμασε αργοτερα ή βαλε το χειροκινητα στην καρτελα «Αποτελεσματα».</div>
      </div>)}
      {adminTab==="preview"&&(<>
        <div className="dstrip">{ALL_DATES.map(d=><button key={d} className={`dtab${d===prevDate?" on":""}`} onClick={()=>setAdminPrev(d)}>{fmtShort(d)}</button>)}</div>
        <div className="asec"><div className="asec-h">{fmtLong(prevDate)}</div>
          {board.map(u=>{const dp2=predictions[u.id]?.[prevDate]||{};const pts=calcDayPts(prevDate,predictions[u.id]||{},results);
            return(<div key={u.id} className="pp"><div className="pp-h"><span className="pp-n">{u.username}{u.isAdmin?" ⚙":""}</span><span className="pp-p">{pts} pts</span></div>
              <div className="pp-v">{prevMs.map(m=>{const pick=dp2[m.id],res=m.result;const won=pick&&res&&pick===res,lost=pick&&res&&pick!==res;const cls=!pick?"pn":won?"pw":lost?"pl":"pp2";
                return<span key={m.id} className={`pv ${cls}`}>{m.home.slice(0,3).toUpperCase()} {pick||"—"} {m.away.slice(0,3).toUpperCase()}{res&&pick?(won?" ✓":" ✗"):""}</span>;})}
                {prevMs.length===0&&<span style={{fontSize:".72rem",color:"var(--muted)"}}>Δεν υπαρχουν ματς</span>}</div>
            </div>);
          })}
        </div>
      </>)}
      {adminTab==="users"&&(<div className="asec"><div className="asec-h">Μελη ({users.length})</div>
        <div className="info-bar" style={{marginBottom:".8rem"}}>🗑️ <b>Καθαρισμος ψηφων:</b> διαλεξε μερα και πατα «Καθαρισμα» για να ξαναψηφισει ο παικτης.<br/>➕➖ <b>Ποντοι:</b> προσθεσε/αφαιρεσε χειροκινητα ποντους (πχ μπονους ή διορθωση). <b>Μονο ο admin.</b></div>
        {users.map(u=>{const base=calcTotal(predictions[u.id]||{},results);const adj=adjustments[u.id]||0;const total=base+adj;const vs=ALL_DATES.reduce((s,d)=>s+Object.keys((predictions[u.id]||{})[d]||{}).length,0);
          const userDays=ALL_DATES.filter(d=>Object.keys((predictions[u.id]||{})[d]||{}).length>0);
          const selDay=clearDaySel[u.id]||userDays[userDays.length-1]||"";
          return(<div key={u.id} className="ur" style={{flexWrap:"wrap"}}>
            <span style={{flex:1,minWidth:100,fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:".95rem"}}>{u.username}{u.is_admin?" 👑":""}</span>
            <span style={{color:"var(--muted)",fontSize:".75rem"}}>{vs} ψηφ.</span>
            <span style={{color:"var(--gold2)",fontWeight:700,fontFamily:"'Orbitron',sans-serif",fontSize:".85rem"}} title={adj!==0?`${base} + ${adj} bonus`:""}>{total}{adj!==0&&<span style={{fontSize:".62rem",color:adj>0?"var(--green)":"var(--red)",marginLeft:3}}>({adj>0?"+":""}{adj})</span>}</span>
            {!u.is_admin&&<button className="del" onClick={()=>delUser(u.id)}>✕</button>}
            <div style={{display:"flex",gap:".3rem",width:"100%",marginTop:".4rem",alignItems:"center"}}>
              <span className="pts-adj-lbl">Ποντοι:</span>
              <button className="pts-adj minus" onClick={()=>adjustPoints(u.id,-1)}>−1</button>
              <button className="pts-adj plus" onClick={()=>adjustPoints(u.id,+1)}>+1</button>
              {userDays.length>0&&<>
                <select className="day-select" value={selDay} onChange={e=>setClearDaySel(p=>({...p,[u.id]:e.target.value}))} style={{flex:1,marginLeft:".3rem"}}>
                  {userDays.map(d=><option key={d} value={d}>{fmtLong(d)} ({Object.keys((predictions[u.id]||{})[d]||{}).length} ψηφ.)</option>)}
                </select>
                <button className="bsm b-dark" onClick={()=>clearVotes(u.id,selDay)} style={{whiteSpace:"nowrap"}}>🗑️</button>
              </>}
            </div>
          </div>);
        })}
      </div>)}
    </>);
  }

  if(booting){
    return(<><style>{css}</style><div className="app"><div className="boot"><div className="boot-ball">⚽</div><div className="boot-text">ΦΟΡΤΩΣΗ...</div></div></div></>);
  }

  return(<>
    <style>{css}</style>
    <div className="app">
      {(view==="login"||view==="register")&&(
        <LoginScreen mode={view} setMode={setView} lf={lf} setLf={setLf} rf={rf} setRf={setRf} lerr={lerr} rerr={rerr} onLogin={login} onReg={reg} busy={busy}/>
      )}
      {me&&(
        <header className="hdr">
          <div className="logo"><div className="logo-dot"/>WC 26</div>
          <nav className="nav">
            {[{k:"predict",l:"Ψηφισεις"},{k:"bracket",l:"Bracket"},{k:"leaderboard",l:"Καταταξη"},{k:"history",l:"Ιστορικο"},...(me.is_admin?[{k:"admin",l:"Admin"}]:[])].map(n=>(
              <button key={n.k} className={`nb${view===n.k?" on":""}`} onClick={()=>setView(n.k)}>{n.l}</button>
            ))}
          </nav>
          <div className="hdr-r"><div className="pts-chip">🏅 {myBoard?.total||0}</div><button className="lbtn" onClick={logout}>Εξοδος</button></div>
        </header>
      )}
      {me&&(
        <main className="main">
          {view==="predict"&&(<>
            <div className="ptop"><div className="ptitle">ΨΗΦΙΣΕΙΣ <em>ΣΗΜΕΡΑ</em></div><div className="psub">{fmtLong(today)}</div></div>
            {myStats&&myStats.total>0&&(
              <div className="stats-strip">
                <div className="stat-box"><div className="stat-num gold">{myBoard?.total||0}</div><div className="stat-lbl">Πόντοι</div></div>
                <div className="stat-box"><div className="stat-num g">{myStats.correct}</div><div className="stat-lbl">Σωστά</div></div>
                <div className="stat-box"><div className="stat-num r">{myStats.wrong}</div><div className="stat-lbl">Λάθος</div></div>
                <div className="stat-box"><div className="stat-num">{myStats.pct}%</div><div className="stat-lbl">Ευστοχία</div></div>
              </div>
            )}
            {renderPredict()}
          </>)}
          {view==="bracket"&&renderBracket()}
          {view==="history"&&renderHistory()}
          {view==="leaderboard"&&renderLeaderboard()}
          {view==="admin"&&me.is_admin&&renderAdmin()}
        </main>
      )}
      {confetti&&<Confetti/>}
      {toast&&<div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  </>);
}

// ─── STYLES (same futuristic stadium theme) ───
const STYLES=`
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{--bg:#06070a;--surface:#0e1014;--card:#171a21;--card2:#1e222b;--gold:#f4cb55;--gold2:#ffd97a;--gold3:#d4a82e;--golddim:rgba(244,203,85,0.13);--goldbord:rgba(244,203,85,0.32);--text:#f0eee7;--text2:#bdbab0;--muted:#78766c;--green:#43e08c;--red:#ff6464;--r:12px;--r2:18px;}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;font-size:16px;-webkit-font-smoothing:antialiased;}
.app{min-height:100vh;display:flex;flex-direction:column;background:radial-gradient(ellipse 100% 40% at 50% 0%,rgba(244,203,85,0.10) 0%,transparent 62%),radial-gradient(ellipse 80% 50% at 50% 100%,rgba(67,224,140,0.03) 0%,transparent 55%),var(--bg);}
.boot{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;min-height:100vh;}
.boot-ball{font-size:3rem;animation:bootspin 1.2s ease-in-out infinite;}
@keyframes bootspin{0%,100%{transform:translateY(0) rotate(0);}50%{transform:translateY(-12px) rotate(180deg);}}
.boot-text{font-family:'Orbitron',sans-serif;font-size:.9rem;font-weight:700;letter-spacing:3px;color:var(--gold3);}
.login-fs{position:fixed;inset:0;z-index:500;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:1.5rem;background:#070809;}
.lf-grid{position:absolute;left:50%;bottom:-10%;width:200%;height:70%;transform:translateX(-50%) perspective(380px) rotateX(62deg);background-image:linear-gradient(rgba(244,203,85,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(244,203,85,0.22) 1px,transparent 1px);background-size:38px 38px;animation:gridmove 3s linear infinite;mask-image:radial-gradient(ellipse 60% 80% at 50% 100%,#000 10%,transparent 75%);-webkit-mask-image:radial-gradient(ellipse 60% 80% at 50% 100%,#000 10%,transparent 75%);opacity:.6;}
@keyframes gridmove{from{background-position:0 0;}to{background-position:0 38px;}}
.lf-glow{position:absolute;top:-30%;left:50%;transform:translateX(-50%);width:120%;height:60%;background:radial-gradient(ellipse 50% 60% at 50% 50%,rgba(244,203,85,0.18) 0%,transparent 70%);animation:glowpulse 4s ease-in-out infinite;}
@keyframes glowpulse{0%,100%{opacity:.7;}50%{opacity:1;}}
.lf-scan{position:absolute;left:0;right:0;height:140px;background:linear-gradient(180deg,transparent,rgba(244,203,85,0.06),transparent);animation:scandown 5s linear infinite;}
@keyframes scandown{from{top:-140px;}to{top:100%;}}
.lf-orb{position:absolute;border-radius:50%;filter:blur(50px);opacity:.4;}
.lf-orb1{width:200px;height:200px;background:rgba(244,203,85,0.25);top:15%;left:10%;animation:float1 8s ease-in-out infinite;}
.lf-orb2{width:160px;height:160px;background:rgba(244,203,85,0.18);bottom:18%;right:12%;animation:float2 10s ease-in-out infinite;}
@keyframes float1{0%,100%{transform:translate(0,0);}50%{transform:translate(30px,-25px);}}
@keyframes float2{0%,100%{transform:translate(0,0);}50%{transform:translate(-25px,20px);}}
.login-box{position:relative;z-index:2;width:100%;max-width:370px;background:rgba(16,18,22,0.72);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid var(--goldbord);border-radius:18px;overflow:hidden;box-shadow:0 0 0 1px rgba(244,203,85,0.06) inset,0 30px 70px rgba(0,0,0,0.75),0 0 80px rgba(244,203,85,0.12);animation:boxin .6s cubic-bezier(.2,.8,.2,1) both;}
@keyframes boxin{from{opacity:0;transform:translateY(24px) scale(.97);}to{opacity:1;transform:translateY(0) scale(1);}}
.login-topbar{height:3px;background:linear-gradient(90deg,transparent,var(--gold3),var(--gold2),var(--gold3),transparent);background-size:200% 100%;animation:barslide 3s ease-in-out infinite;}
@keyframes barslide{0%,100%{background-position:0% 0;}50%{background-position:100% 0;}}
.login-head{padding:1.9rem 1.8rem 1.3rem;text-align:center;border-bottom:1px solid rgba(255,255,255,0.05);}
.login-icon{width:64px;height:64px;margin:0 auto .85rem;border-radius:50%;background:radial-gradient(circle,rgba(244,203,85,0.22) 0%,rgba(244,203,85,0.04) 70%);border:1px solid var(--goldbord);display:flex;align-items:center;justify-content:center;box-shadow:0 0 35px rgba(244,203,85,0.25);position:relative;}
.login-icon span{font-size:1.9rem;animation:iconfloat 3s ease-in-out infinite;}
@keyframes iconfloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-4px);}}
.login-icon::after{content:'';position:absolute;inset:-1px;border-radius:50%;border:1px solid transparent;border-top-color:var(--gold);animation:spin 3s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.login-title{font-family:'Orbitron',sans-serif;font-size:1.6rem;font-weight:800;letter-spacing:3px;color:var(--gold2);text-shadow:0 0 24px rgba(244,203,85,0.5);}
.login-sub{font-family:'Rajdhani',sans-serif;color:var(--muted);font-size:.72rem;letter-spacing:3px;margin-top:.35rem;font-weight:600;}
.login-body{padding:1.5rem 1.8rem 1.8rem;}
.lerr{background:rgba(255,100,100,0.1);border:1px solid rgba(255,100,100,0.28);border-radius:8px;padding:.5rem .8rem;margin-bottom:.85rem;color:var(--red);font-size:.8rem;text-align:center;}
.lfield{margin-bottom:.9rem;}
.lfield label{display:block;font-family:'Rajdhani',sans-serif;font-size:.72rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:.4rem;}
.lfield input{width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:9px;color:var(--text);font-family:'Inter',sans-serif;font-size:.92rem;padding:.7rem .95rem;outline:none;transition:all .2s;}
.lfield input:focus{border-color:var(--gold3);background:rgba(244,203,85,0.05);box-shadow:0 0 0 3px rgba(244,203,85,0.1);}
.lfield input::placeholder{color:var(--muted);}
.login-submit{width:100%;margin-top:.3rem;position:relative;overflow:hidden;background:linear-gradient(135deg,var(--gold3),var(--gold2));border:none;border-radius:9px;font-family:'Orbitron',sans-serif;font-weight:700;font-size:.92rem;letter-spacing:3px;color:#070809;padding:.8rem;cursor:pointer;transition:all .2s;box-shadow:0 4px 22px rgba(244,203,85,0.28);}
.login-submit:disabled{opacity:.6;cursor:wait;}
.login-submit span{position:relative;z-index:1;}
.login-submit::before{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent);animation:shine 3s ease-in-out infinite;}
@keyframes shine{0%{left:-100%;}60%,100%{left:160%;}}
.login-submit:hover{filter:brightness(1.1);box-shadow:0 6px 28px rgba(244,203,85,0.42);transform:translateY(-1px);}
.lsw{text-align:center;margin-top:.95rem;color:var(--muted);font-size:.82rem;}
.lsw button{background:none;border:none;color:var(--gold);font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;font-size:.82rem;text-decoration:underline;text-underline-offset:3px;}
.lhint{text-align:center;margin-top:.7rem;color:var(--muted);font-size:.68rem;letter-spacing:.5px;}
.hdr{position:sticky;top:0;z-index:200;height:56px;padding:0 1rem;display:flex;align-items:center;justify-content:space-between;gap:.5rem;background:rgba(7,8,9,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--goldbord);box-shadow:0 8px 30px rgba(0,0,0,0.6);}
.logo{font-family:'Orbitron',sans-serif;font-weight:800;font-size:1.05rem;letter-spacing:2px;color:var(--gold2);text-shadow:0 0 16px rgba(244,203,85,0.4);display:flex;align-items:center;gap:.45rem;white-space:nowrap;}
.logo-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);box-shadow:0 0 10px var(--gold);animation:pulse 1.8s infinite;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.65);}}
.nav{display:flex;gap:1px;}
.nb{background:none;border:none;font-family:'Rajdhani',sans-serif;font-size:.9rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--muted);cursor:pointer;padding:.35rem .6rem;border-radius:7px;transition:all .15s;}
.nb:hover{color:var(--text2);}
.nb.on{color:var(--gold);background:var(--golddim);}
.hdr-r{display:flex;align-items:center;gap:.45rem;flex-shrink:0;}
.pts-chip{display:flex;align-items:center;gap:.3rem;background:var(--golddim);border:1px solid var(--goldbord);border-radius:20px;padding:.25rem .7rem;font-family:'Orbitron',sans-serif;font-weight:700;font-size:.8rem;color:var(--gold2);white-space:nowrap;}
.lbtn{background:none;border:1px solid rgba(255,255,255,0.1);color:var(--muted);font-family:'Rajdhani',sans-serif;font-size:.78rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:.25rem .5rem;border-radius:6px;cursor:pointer;transition:all .15s;}
.lbtn:hover{border-color:var(--red);color:var(--red);}
.main{flex:1;padding:1rem;max-width:560px;margin:0 auto;width:100%;}
.ptop{margin-bottom:1rem;}
.ptitle{font-family:'Orbitron',sans-serif;font-size:1.4rem;font-weight:700;letter-spacing:1px;color:var(--text);}
.ptitle em{color:var(--gold);font-style:normal;}
.psub{font-family:'Rajdhani',sans-serif;color:var(--muted);font-size:.8rem;margin-top:.2rem;letter-spacing:.5px;}
.scorepanel{position:relative;overflow:hidden;background:linear-gradient(135deg,var(--card2),var(--card));border:1px solid var(--goldbord);border-radius:var(--r2);padding:1.1rem 1.2rem;margin-bottom:.7rem;box-shadow:0 8px 30px rgba(0,0,0,0.5),0 0 0 1px rgba(244,203,85,0.05) inset;}
.scorepanel::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);}
.sp-row{display:flex;align-items:center;justify-content:space-between;gap:1rem;}
.sp-l h3{font-family:'Rajdhani',sans-serif;font-size:1.05rem;font-weight:700;letter-spacing:1px;color:var(--text);}
.sp-l p{font-family:'Rajdhani',sans-serif;color:var(--text2);font-size:.78rem;margin-top:.25rem;letter-spacing:.3px;}
.sp-r{text-align:center;flex-shrink:0;}
.sp-num{font-family:'Orbitron',sans-serif;font-size:3rem;font-weight:800;color:var(--gold2);line-height:1;text-shadow:0 0 28px rgba(244,203,85,0.6);}
.sp-lbl{font-family:'Rajdhani',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-top:.15rem;}
.stats-strip{display:flex;gap:.5rem;margin-bottom:.85rem;}
.stat-box{flex:1;background:var(--card);border:1px solid rgba(255,255,255,0.06);border-radius:var(--r);padding:.6rem;text-align:center;}
.stat-num{font-family:'Orbitron',sans-serif;font-size:1.3rem;font-weight:700;line-height:1;}
.stat-num.g{color:var(--green);}.stat-num.r{color:var(--red);}.stat-num.gold{color:var(--gold2);}
.stat-lbl{font-family:'Rajdhani',sans-serif;font-size:.62rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-top:.25rem;}
.lockbar{display:flex;align-items:center;gap:.45rem;font-size:.72rem;color:var(--gold3);background:var(--golddim);border:1px solid rgba(244,203,85,0.15);border-radius:7px;padding:.4rem .8rem;margin-bottom:.9rem;letter-spacing:.3px;}
.psep{display:flex;align-items:center;gap:.6rem;margin:1.2rem 0 .6rem;}
.psep::before,.psep::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(244,203,85,0.15),transparent);}
.plabel{font-family:'Rajdhani',sans-serif;font-size:.72rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold3);white-space:nowrap;}
.mc{position:relative;background:linear-gradient(150deg,#232831 0%,#1a1e26 45%,#15181e 100%);border:1px solid rgba(255,255,255,0.09);border-radius:var(--r2);margin-bottom:.85rem;overflow:hidden;transition:transform .15s,box-shadow .15s,border-color .15s;box-shadow:0 1px 3px rgba(0,0,0,0.5),0 10px 24px rgba(0,0,0,0.38),inset 0 1px 0 rgba(255,255,255,0.08),inset 0 -2px 4px rgba(0,0,0,0.4);}
.mc.won{border-color:rgba(67,224,140,0.5);box-shadow:0 1px 3px rgba(0,0,0,0.5),0 10px 24px rgba(0,0,0,0.38),0 0 32px rgba(67,224,140,0.18),inset 0 1px 0 rgba(255,255,255,0.08);}
.mc.lost{border-color:rgba(255,100,100,0.3);}
.mc.voted{border-color:rgba(244,203,85,0.35);box-shadow:0 1px 3px rgba(0,0,0,0.5),0 10px 24px rgba(0,0,0,0.38),0 0 24px rgba(244,203,85,0.12),inset 0 1px 0 rgba(255,255,255,0.08);}
.mc::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);}
.mc-head{display:flex;align-items:center;justify-content:center;gap:.8rem;padding:1rem 1rem .7rem;}
.mc-side{flex:1;display:flex;flex-direction:column;align-items:center;gap:.4rem;min-width:0;}
.mc-bigflag{font-size:2.6rem;line-height:1;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.5));}
.mc-team{font-family:'Rajdhani',sans-serif;font-size:1.12rem;font-weight:700;letter-spacing:.3px;color:var(--text);text-align:center;line-height:1.1;}
.mc-mid{display:flex;flex-direction:column;align-items:center;gap:.2rem;flex-shrink:0;}
.mc-vs{font-family:'Orbitron',sans-serif;font-size:.95rem;font-weight:700;letter-spacing:1px;color:var(--gold3);}
.mc-result-pill{font-family:'Rajdhani',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.5px;padding:.15rem .5rem;border-radius:5px;white-space:nowrap;}
.mc-result-pill.win{background:rgba(67,224,140,0.15);color:var(--green);border:1px solid rgba(67,224,140,0.3);}
.mc-result-pill.loss{background:rgba(255,100,100,0.12);color:var(--red);border:1px solid rgba(255,100,100,0.25);}
.mc-result-pill.pend{background:var(--golddim);color:var(--gold3);}
.mc-votes{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.4rem;padding:0 .7rem .7rem;}
.bigv{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.2rem;min-height:70px;background:rgba(255,255,255,0.045);border:2px solid rgba(255,255,255,0.11);border-radius:14px;cursor:pointer;transition:all .14s;box-shadow:0 3px 8px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.07);}
.bigv-k{font-family:'Orbitron',sans-serif;font-size:1.6rem;font-weight:800;color:var(--text2);transition:color .14s;line-height:1;}
.bigv-sub{font-family:'Rajdhani',sans-serif;font-size:.64rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);transition:color .14s;}
.bigv:hover:not(.lk){background:rgba(244,203,85,0.1);border-color:rgba(244,203,85,0.4);transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,0.35),0 0 18px rgba(244,203,85,0.14),inset 0 1px 0 rgba(255,255,255,0.08);}
.bigv:hover:not(.lk) .bigv-k{color:var(--gold2);}
.bigv:hover:not(.lk) .bigv-sub{color:var(--gold3);}
.bigv:active:not(.lk){transform:translateY(0) scale(.97);}
.bigv.s1{background:linear-gradient(160deg,rgba(67,224,140,0.22),rgba(67,224,140,0.1));border-color:var(--green);box-shadow:0 3px 12px rgba(0,0,0,0.35),0 0 22px rgba(67,224,140,0.2),inset 0 1px 0 rgba(255,255,255,0.1);}
.bigv.s1 .bigv-k,.bigv.s1 .bigv-sub{color:var(--green);}
.bigv.sX{background:linear-gradient(160deg,rgba(244,203,85,0.22),rgba(244,203,85,0.1));border-color:var(--gold);box-shadow:0 3px 12px rgba(0,0,0,0.35),0 0 22px rgba(244,203,85,0.22),inset 0 1px 0 rgba(255,255,255,0.1);}
.bigv.sX .bigv-k,.bigv.sX .bigv-sub{color:var(--gold2);}
.bigv.s2{background:linear-gradient(160deg,rgba(255,100,100,0.22),rgba(255,100,100,0.1));border-color:var(--red);box-shadow:0 3px 12px rgba(0,0,0,0.35),0 0 22px rgba(255,100,100,0.18),inset 0 1px 0 rgba(255,255,255,0.1);}
.bigv.s2 .bigv-k,.bigv.s2 .bigv-sub{color:var(--red);}
.bigv.lk{cursor:default;}
.bigv.lk:not(.s1):not(.sX):not(.s2){opacity:.3;}
.bigv-lock{position:absolute;top:5px;right:7px;font-size:.62rem;}
.no-m{background:var(--card);border:1px solid rgba(255,255,255,0.06);border-radius:var(--r2);padding:2.5rem 1.5rem;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,0.4);}
.no-m .ico{font-size:2.8rem;margin-bottom:.6rem;}
.no-m h3{font-family:'Orbitron',sans-serif;font-size:1.05rem;font-weight:700;letter-spacing:1px;color:var(--gold);margin-bottom:.5rem;}
.no-m p{font-family:'Rajdhani',sans-serif;color:var(--text2);font-size:.85rem;line-height:1.5;}
.lb-card{background:var(--card);border:1px solid rgba(255,255,255,0.06);border-radius:var(--r2);overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.4);}
.lb-scroll{overflow-x:auto;}
.lb-tbl{width:100%;border-collapse:collapse;min-width:380px;}
.lb-tbl th{font-family:'Rajdhani',sans-serif;font-size:.68rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);padding:.62rem .85rem;border-bottom:1px solid rgba(255,255,255,0.06);text-align:left;white-space:nowrap;background:rgba(0,0,0,0.25);}
.lb-row{border-bottom:1px solid rgba(255,255,255,0.03);transition:background .12s;}
.lb-row:last-child{border-bottom:none;}
.lb-row:hover{background:rgba(244,203,85,0.03);}
.lb-row.me-row{background:rgba(244,203,85,0.05);}
.lb-row td{padding:.74rem .85rem;vertical-align:middle;}
.rnk{font-family:'Orbitron',sans-serif;font-size:1rem;font-weight:700;color:var(--muted);}
.rnk.g{color:#FFD700;text-shadow:0 0 12px rgba(255,215,0,0.5);}.rnk.s{color:#C0C0C0;}.rnk.b{color:#CD7F32;}
.ucell{font-family:'Rajdhani',sans-serif;font-size:.95rem;font-weight:600;letter-spacing:.3px;color:var(--text);}
.me-badge{font-size:.56rem;background:var(--golddim);color:var(--gold);border:1px solid var(--goldbord);padding:.1rem .35rem;border-radius:4px;margin-left:.4rem;letter-spacing:1px;font-family:'Rajdhani',sans-serif;font-weight:700;}
.dc{font-family:'Rajdhani',sans-serif;font-size:.82rem;font-weight:700;}
.dc.pos{color:var(--green);}.dc.zero{color:var(--muted);}
.tcell{font-family:'Orbitron',sans-serif;font-size:1.1rem;font-weight:700;color:var(--gold2);text-shadow:0 0 12px rgba(244,203,85,0.3);}
.lb-empty{font-family:'Rajdhani',sans-serif;color:var(--text2);font-size:.85rem;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:var(--r);padding:1.5rem;text-align:center;margin-bottom:.8rem;}
.br-phases{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px;margin-bottom:1rem;}
.br-phases::-webkit-scrollbar{display:none;}
.br-ph{flex-shrink:0;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);color:var(--muted);font-family:'Rajdhani',sans-serif;font-size:.78rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:.4rem .85rem;border-radius:7px;cursor:pointer;transition:all .15s;white-space:nowrap;}
.br-ph.on{background:var(--golddim);border-color:var(--goldbord);color:var(--gold2);}
.br-match{position:relative;background:linear-gradient(150deg,#21252b,#16191e);border:1px solid rgba(255,255,255,0.08);border-radius:var(--r);margin-bottom:.6rem;overflow:hidden;box-shadow:0 4px 14px rgba(0,0,0,0.35);}
.br-match.final-match{border-color:var(--goldbord);box-shadow:0 4px 20px rgba(0,0,0,0.4),0 0 24px rgba(244,203,85,0.1);}
.br-match-label{font-family:'Rajdhani',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold3);padding:.45rem .8rem .2rem;}
.br-team{display:flex;align-items:center;gap:.6rem;padding:.55rem .8rem;transition:background .12s;}
.br-team+.br-team{border-top:1px solid rgba(255,255,255,0.05);}
.br-team.winner{background:rgba(67,224,140,0.08);}
.br-team-flag{font-size:1.3rem;flex-shrink:0;}
.br-team-name{font-family:'Rajdhani',sans-serif;font-size:.98rem;font-weight:600;color:var(--text);flex:1;}
.br-team.winner .br-team-name{color:var(--green);font-weight:700;}
.br-team.dim .br-team-name{color:var(--muted);}
.br-crown{font-size:.9rem;}
.br-trophy-final{text-align:center;padding:1.2rem;}
.br-trophy-final .champ-label{font-family:'Rajdhani',sans-serif;font-size:.7rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold3);margin-bottom:.5rem;}
.br-trophy-final .champ-flag{font-size:3rem;}
.br-trophy-final .champ-name{font-family:'Orbitron',sans-serif;font-size:1.3rem;font-weight:800;color:var(--gold2);text-shadow:0 0 24px rgba(244,203,85,0.5);margin-top:.4rem;}
.atabs{display:flex;gap:3px;margin-bottom:1rem;overflow-x:auto;scrollbar-width:none;}
.atabs::-webkit-scrollbar{display:none;}
.atab{flex-shrink:0;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);color:var(--muted);font-family:'Rajdhani',sans-serif;font-size:.8rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:.35rem .8rem;border-radius:7px;cursor:pointer;transition:all .15s;}
.atab.on{background:var(--golddim);border-color:var(--goldbord);color:var(--gold2);}
.asec{background:var(--card);border:1px solid rgba(255,255,255,0.06);border-radius:var(--r2);padding:1rem;margin-bottom:.75rem;box-shadow:0 4px 16px rgba(0,0,0,0.3);}
.asec-h{font-family:'Rajdhani',sans-serif;font-size:.88rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold3);margin-bottom:.75rem;}
.dstrip{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;padding-bottom:3px;margin-bottom:.75rem;}
.dstrip::-webkit-scrollbar{display:none;}
.dtab{flex-shrink:0;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);color:var(--muted);font-family:'Rajdhani',sans-serif;font-size:.72rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:.28rem .62rem;border-radius:5px;cursor:pointer;transition:all .15s;white-space:nowrap;}
.dtab.on{background:var(--golddim);border-color:var(--goldbord);color:var(--gold2);}
.am{display:flex;align-items:center;gap:.5rem;padding:.55rem 0;border-bottom:1px solid rgba(255,255,255,0.04);flex-wrap:wrap;}
.am:last-child{border-bottom:none;}
.am-l{flex:1;min-width:120px;}
.am-team{font-family:'Rajdhani',sans-serif;font-size:.88rem;font-weight:600;color:var(--text2);}
.am-sub{font-size:.65rem;color:var(--muted);margin-top:2px;letter-spacing:.3px;}
.rbtn{font-family:'Orbitron',sans-serif;font-weight:700;font-size:.78rem;padding:.34rem .6rem;border-radius:6px;border:1px solid rgba(255,255,255,0.08);cursor:pointer;transition:all .12s;background:rgba(255,255,255,0.03);color:var(--muted);}
.rbtn:hover{border-color:var(--goldbord);color:var(--gold2);}
.rbtn.r1on{background:rgba(67,224,140,0.14);border-color:rgba(67,224,140,0.4);color:var(--green);}
.rbtn.rXon{background:rgba(244,203,85,0.14);border-color:rgba(244,203,85,0.4);color:var(--gold2);}
.rbtn.r2on{background:rgba(255,100,100,0.14);border-color:rgba(255,100,100,0.35);color:var(--red);}
.fetch-card{background:var(--golddim);border:1px solid rgba(244,203,85,0.18);border-radius:var(--r2);padding:1rem;margin-bottom:.75rem;}
.fetch-title{font-family:'Rajdhani',sans-serif;font-size:.92rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold2);margin-bottom:.35rem;}
.fetch-desc{font-family:'Rajdhani',sans-serif;color:var(--text2);font-size:.8rem;line-height:1.5;margin-bottom:.8rem;}
.fetch-row{display:flex;gap:.45rem;flex-wrap:wrap;align-items:center;}
.inp-key{flex:1;min-width:150px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:var(--text);font-family:'Inter',sans-serif;font-size:.8rem;padding:.45rem .72rem;border-radius:7px;outline:none;transition:all .15s;}
.inp-key:focus{border-color:var(--gold3);}
.inp-key::placeholder{color:var(--muted);}
.bsm{font-family:'Rajdhani',sans-serif;font-weight:700;font-size:.78rem;letter-spacing:1.5px;text-transform:uppercase;padding:.45rem .85rem;border-radius:7px;border:none;cursor:pointer;transition:all .15s;white-space:nowrap;}
.b-dark{background:rgba(255,255,255,0.06);color:var(--text2);border:1px solid rgba(255,255,255,0.1);}
.b-dark:hover{border-color:var(--goldbord);}
.b-gold{background:linear-gradient(135deg,var(--gold3),var(--gold2));color:#070809;}
.b-gold:hover{filter:brightness(1.1);}
.b-gold:disabled{opacity:.45;cursor:not-allowed;}
.last-f{font-family:'Rajdhani',sans-serif;color:var(--muted);font-size:.7rem;margin-top:.45rem;letter-spacing:.3px;}
.info-bar{font-family:'Rajdhani',sans-serif;background:rgba(67,224,140,0.05);border:1px solid rgba(67,224,140,0.15);border-radius:7px;padding:.55rem .8rem;margin-bottom:.75rem;color:var(--text2);font-size:.82rem;line-height:1.5;}
.ur{display:flex;align-items:center;gap:.7rem;padding:.58rem 0;border-bottom:1px solid rgba(255,255,255,0.04);}
.ur:last-child{border-bottom:none;}
.del{background:rgba(255,100,100,0.08);border:1px solid rgba(255,100,100,0.2);color:var(--red);font-family:'Rajdhani',sans-serif;font-size:.75rem;font-weight:700;letter-spacing:1px;padding:.25rem .6rem;border-radius:5px;cursor:pointer;transition:all .12s;}
.del:hover{background:rgba(255,100,100,0.15);}
.pp{background:rgba(255,255,255,0.02);border-radius:8px;padding:.65rem;margin-bottom:.45rem;}
.pp-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:.35rem;}
.pp-n{font-family:'Rajdhani',sans-serif;font-size:.9rem;font-weight:700;color:var(--text);}
.pp-p{font-family:'Orbitron',sans-serif;font-size:.85rem;font-weight:700;color:var(--gold2);}
.pp-v{display:flex;gap:.3rem;flex-wrap:wrap;}
.pv{font-family:'Rajdhani',sans-serif;font-size:.66rem;font-weight:600;padding:.15rem .42rem;border-radius:4px;letter-spacing:.5px;}
.pv.pw{background:rgba(67,224,140,0.12);color:var(--green);border:1px solid rgba(67,224,140,0.2);}
.pv.pl{background:rgba(255,100,100,0.1);color:var(--red);border:1px solid rgba(255,100,100,0.15);}
.pv.pp2{background:var(--golddim);color:var(--gold3);border:1px solid rgba(244,203,85,0.12);}
.pv.pn{background:rgba(255,255,255,0.03);color:var(--muted);border:1px solid rgba(255,255,255,0.05);}
.toast{position:fixed;bottom:1.2rem;left:50%;transform:translateX(-50%);font-family:'Rajdhani',sans-serif;font-weight:700;font-size:.85rem;letter-spacing:1.5px;text-transform:uppercase;padding:.5rem 1.2rem;border-radius:8px;z-index:9999;white-space:nowrap;pointer-events:none;animation:tup .2s ease;}
.toast.ok{background:rgba(67,224,140,0.15);border:1px solid rgba(67,224,140,0.35);color:var(--green);box-shadow:0 4px 20px rgba(0,0,0,0.5),0 0 20px rgba(67,224,140,0.12);}
.toast.err{background:rgba(255,100,100,0.12);border:1px solid rgba(255,100,100,0.3);color:var(--red);box-shadow:0 4px 20px rgba(0,0,0,0.5);}
@keyframes tup{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
.mc-time{font-family:'Rajdhani',sans-serif;font-size:.72rem;font-weight:700;letter-spacing:.5px;color:var(--gold3);background:var(--golddim);border:1px solid rgba(244,203,85,0.18);padding:.1rem .45rem;border-radius:5px;white-space:nowrap;}
.bigv-pct{font-family:'Rajdhani',sans-serif;font-size:.62rem;font-weight:700;color:var(--muted);margin-top:.15rem;letter-spacing:.5px;}
.bigv.s1 .bigv-pct,.bigv.sX .bigv-pct,.bigv.s2 .bigv-pct{color:inherit;opacity:.85;}
.mc-missed{font-family:'Rajdhani',sans-serif;font-size:.7rem;font-weight:600;color:var(--red);text-align:center;padding:0 .7rem .5rem;letter-spacing:.3px;}
.mc-nextday{font-family:'Rajdhani',sans-serif;font-size:.72rem;font-weight:700;color:var(--gold3);text-align:center;padding:0 .7rem .55rem;letter-spacing:.3px;background:linear-gradient(180deg,rgba(244,203,85,0.06),transparent);}
.reveal{border-top:1px solid rgba(255,255,255,0.06);margin:0 .7rem;padding:.6rem 0 .7rem;}
.reveal-h{font-family:'Rajdhani',sans-serif;font-size:.7rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:.45rem;}
.reveal-list{display:flex;flex-wrap:wrap;gap:.3rem;}
.reveal-chip{font-family:'Rajdhani',sans-serif;font-size:.7rem;font-weight:600;padding:.18rem .5rem;border-radius:5px;letter-spacing:.2px;border:1px solid transparent;}
.reveal-chip b{font-family:'Orbitron',sans-serif;font-size:.68rem;}
.reveal-chip.rv1{background:rgba(67,224,140,0.12);color:var(--green);border-color:rgba(67,224,140,0.25);}
.reveal-chip.rvX{background:rgba(244,203,85,0.12);color:var(--gold2);border-color:rgba(244,203,85,0.25);}
.reveal-chip.rv2{background:rgba(255,100,100,0.1);color:var(--red);border-color:rgba(255,100,100,0.2);}
.time-inp{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.14);border-radius:8px;color:var(--text);font-family:'Orbitron',sans-serif;font-size:.85rem;font-weight:600;padding:.35rem .5rem;outline:none;transition:all .15s;color-scheme:dark;}
.time-inp:focus{border-color:var(--gold3);box-shadow:0 0 0 3px rgba(244,203,85,0.1);}
.time-pick{display:flex;align-items:center;gap:.2rem;flex-shrink:0;}
.time-sel{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.14);border-radius:8px;color:var(--text);font-family:'Orbitron',sans-serif;font-size:.95rem;font-weight:700;padding:.4rem .35rem;outline:none;transition:all .15s;color-scheme:dark;cursor:pointer;text-align:center;}
.time-sel:focus{border-color:var(--gold3);box-shadow:0 0 0 3px rgba(244,203,85,0.1);}
.time-colon{font-family:'Orbitron',sans-serif;font-weight:800;color:var(--gold2);font-size:1rem;}
.time-clear{background:rgba(255,100,100,0.1);border:1px solid rgba(255,100,100,0.2);color:var(--red);border-radius:6px;width:26px;height:26px;cursor:pointer;font-size:.7rem;margin-left:.2rem;transition:all .12s;}
.time-clear:hover{background:rgba(255,100,100,0.2);}
.day-select{flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.14);border-radius:8px;color:var(--text);font-family:'Rajdhani',sans-serif;font-size:.82rem;font-weight:600;padding:.4rem .5rem;outline:none;transition:all .15s;color-scheme:dark;cursor:pointer;}
.day-select:focus{border-color:var(--gold3);}
.pts-adj-lbl{font-family:'Rajdhani',sans-serif;font-size:.75rem;font-weight:700;color:var(--muted);letter-spacing:.5px;}
.pts-adj{font-family:'Orbitron',sans-serif;font-weight:700;font-size:.8rem;width:38px;height:30px;border-radius:7px;cursor:pointer;transition:all .12s;border:1px solid;}
.pts-adj.plus{background:rgba(67,224,140,0.12);border-color:rgba(67,224,140,0.3);color:var(--green);}
.pts-adj.plus:hover{background:rgba(67,224,140,0.22);}
.pts-adj.minus{background:rgba(255,100,100,0.1);border-color:rgba(255,100,100,0.25);color:var(--red);}
.pts-adj.minus:hover{background:rgba(255,100,100,0.2);}
.streak-card{display:flex;align-items:center;gap:.9rem;background:linear-gradient(135deg,rgba(255,140,40,0.12),rgba(244,203,85,0.08));border:1px solid rgba(255,140,40,0.25);border-radius:var(--r2);padding:1rem 1.2rem;margin-bottom:1rem;box-shadow:0 8px 24px rgba(0,0,0,0.4);}
.streak-flame{font-size:2.2rem;filter:drop-shadow(0 0 10px rgba(255,140,40,0.4));animation:flicker 2s ease-in-out infinite;}
@keyframes flicker{0%,100%{transform:scale(1) rotate(-2deg);}50%{transform:scale(1.08) rotate(2deg);}}
.streak-num{font-family:'Orbitron',sans-serif;font-size:2rem;font-weight:800;color:#ff8c28;line-height:1;text-shadow:0 0 18px rgba(255,140,40,0.4);}
.streak-lbl{font-family:'Rajdhani',sans-serif;font-size:.7rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);}
.streak-side{margin-left:auto;font-family:'Rajdhani',sans-serif;font-size:.75rem;color:var(--text2);max-width:120px;text-align:right;line-height:1.3;}
.hist-day{background:var(--card);border:1px solid rgba(255,255,255,0.06);border-radius:var(--r2);padding:.9rem 1rem;margin-bottom:.7rem;box-shadow:0 4px 16px rgba(0,0,0,0.3);}
.hist-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:.6rem;padding-bottom:.5rem;border-bottom:1px solid rgba(255,255,255,0.06);}
.hist-date{font-family:'Rajdhani',sans-serif;font-size:.85rem;font-weight:700;letter-spacing:.5px;color:var(--text);}
.hist-pts{font-family:'Orbitron',sans-serif;font-size:.9rem;font-weight:700;color:var(--gold2);}
.hist-row{display:flex;align-items:center;justify-content:space-between;padding:.32rem 0;}
.hist-match{font-family:'Rajdhani',sans-serif;font-size:.85rem;font-weight:600;color:var(--text2);}
.hist-pick{font-family:'Orbitron',sans-serif;font-size:.78rem;font-weight:700;padding:.15rem .5rem;border-radius:5px;}
.hist-pick.hw{background:rgba(67,224,140,0.14);color:var(--green);}
.hist-pick.hl{background:rgba(255,100,100,0.12);color:var(--red);}
.hist-pick.hp{background:var(--golddim);color:var(--gold3);}
.confetti-layer{position:fixed;inset:0;z-index:9998;pointer-events:none;overflow:hidden;}
.confetti-pc{position:absolute;top:-20px;border-radius:2px;opacity:.9;animation-name:confetti-fall;animation-timing-function:cubic-bezier(.4,.2,.6,1);animation-fill-mode:forwards;}
@keyframes confetti-fall{0%{top:-20px;opacity:0;}10%{opacity:1;}100%{top:105%;opacity:.6;}}
.share-btn{flex-shrink:0;background:linear-gradient(135deg,var(--gold3),var(--gold2));border:none;border-radius:9px;color:#070809;font-family:'Rajdhani',sans-serif;font-weight:700;font-size:.82rem;letter-spacing:1px;text-transform:uppercase;padding:.5rem .85rem;cursor:pointer;transition:all .15s;box-shadow:0 4px 16px rgba(244,203,85,0.25);}
.share-btn:hover{filter:brightness(1.08);transform:translateY(-1px);}
.share-btn:disabled{opacity:.5;cursor:wait;}
.mybadges{background:var(--card);border:1px solid rgba(244,203,85,0.18);border-radius:var(--r2);padding:.85rem 1rem;margin-bottom:.9rem;box-shadow:0 4px 16px rgba(0,0,0,0.3);}
.mybadges-h{font-family:'Rajdhani',sans-serif;font-size:.7rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:.5rem;}
.mybadges-row{display:flex;flex-wrap:wrap;gap:.4rem;}
.badge{font-family:'Rajdhani',sans-serif;font-size:.8rem;font-weight:700;letter-spacing:.3px;color:var(--gold2);background:var(--golddim);border:1px solid var(--goldbord);border-radius:20px;padding:.28rem .7rem;white-space:nowrap;}
.row-badges{display:inline-flex;gap:.1rem;margin-left:.4rem;}
.row-badge{font-size:.78rem;cursor:default;}
`;
