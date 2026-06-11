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
  Ukraine:"🇺🇦",Spain:"🇪🇸","Cape Verde":"🇨🇻",Belgium:"🇧🇪",Egypt:"🇪🇬",
  "Saudi Arabia":"🇸🇦",Uruguay:"🇺🇾",Iran:"🇮🇷","New Zealand":"🇳🇿",France:"🇫🇷",
  Senegal:"🇸🇳",Norway:"🇳🇴",Iraq:"🇮🇶",Argentina:"🇦🇷",Algeria:"🇩🇿",Austria:"🇦🇹",
  Jordan:"🇯🇴",Portugal:"🇵🇹",Uzbekistan:"🇺🇿",Colombia:"🇨🇴","DR Congo":"🇨🇩",
  Jamaica:"🇯🇲",England:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",Croatia:"🇭🇷",Panama:"🇵🇦",Ghana:"🇬🇭",TBD:"🏳️",
};
const F = t => FLAGS[t] || "🏳️";
function noAccent(s){return s.replace(/[άΆ]/g,"Α").replace(/[έΈ]/g,"Ε").replace(/[ήΉ]/g,"Η").replace(/[ίΊϊΪ]/g,"Ι").replace(/[όΌ]/g,"Ο").replace(/[ύΎϋΫ]/g,"Υ").replace(/[ώΏ]/g,"Ω");}
const caps = s => noAccent(s).toUpperCase();

const SCHEDULE = [
  {id:"m001",date:"2026-06-11",home:"Mexico",      away:"South Africa",      group:"A",phase:"group"},
  {id:"m002",date:"2026-06-11",home:"South Korea", away:"Czech Republic",    group:"A",phase:"group"},
  {id:"m003",date:"2026-06-12",home:"Canada",      away:"Bosnia-Herzegovina",group:"B",phase:"group"},
  {id:"m004",date:"2026-06-12",home:"USA",         away:"Paraguay",          group:"D",phase:"group"},
  {id:"m005",date:"2026-06-13",home:"Qatar",       away:"Switzerland",       group:"B",phase:"group"},
  {id:"m006",date:"2026-06-13",home:"Brazil",      away:"Morocco",           group:"C",phase:"group"},
  {id:"m007",date:"2026-06-13",home:"Haiti",       away:"Scotland",          group:"C",phase:"group"},
  {id:"m008",date:"2026-06-13",home:"Australia",   away:"Türkiye",           group:"D",phase:"group"},
  {id:"m009",date:"2026-06-14",home:"Germany",     away:"Curacao",           group:"E",phase:"group"},
  {id:"m010",date:"2026-06-14",home:"Netherlands", away:"Japan",             group:"F",phase:"group"},
  {id:"m011",date:"2026-06-14",home:"Ivory Coast", away:"Ecuador",           group:"E",phase:"group"},
  {id:"m012",date:"2026-06-14",home:"Ukraine",     away:"Tunisia",           group:"F",phase:"group"},
  {id:"m013",date:"2026-06-15",home:"Spain",       away:"Cape Verde",        group:"H",phase:"group"},
  {id:"m014",date:"2026-06-15",home:"Belgium",     away:"Egypt",             group:"G",phase:"group"},
  {id:"m015",date:"2026-06-15",home:"Saudi Arabia",away:"Uruguay",           group:"H",phase:"group"},
  {id:"m016",date:"2026-06-15",home:"Iran",        away:"New Zealand",       group:"G",phase:"group"},
  {id:"m017",date:"2026-06-16",home:"France",      away:"Senegal",           group:"I",phase:"group"},
  {id:"m018",date:"2026-06-16",home:"Iraq",        away:"Norway",            group:"I",phase:"group"},
  {id:"m019",date:"2026-06-16",home:"Argentina",   away:"Algeria",           group:"J",phase:"group"},
  {id:"m020",date:"2026-06-16",home:"Austria",     away:"Jordan",            group:"J",phase:"group"},
  {id:"m021",date:"2026-06-17",home:"Portugal",    away:"DR Congo",          group:"K",phase:"group"},
  {id:"m022",date:"2026-06-17",home:"England",     away:"Croatia",           group:"L",phase:"group"},
  {id:"m023",date:"2026-06-17",home:"Ghana",       away:"Panama",            group:"L",phase:"group"},
  {id:"m024",date:"2026-06-17",home:"Uzbekistan",  away:"Colombia",          group:"K",phase:"group"},
  {id:"m025",date:"2026-06-18",home:"Czech Republic",away:"South Africa",    group:"A",phase:"group"},
  {id:"m026",date:"2026-06-18",home:"Switzerland", away:"Bosnia-Herzegovina",group:"B",phase:"group"},
  {id:"m027",date:"2026-06-18",home:"Canada",      away:"Qatar",             group:"B",phase:"group"},
  {id:"m028",date:"2026-06-18",home:"Mexico",      away:"South Korea",       group:"A",phase:"group"},
  {id:"m029",date:"2026-06-19",home:"Scotland",    away:"Morocco",           group:"C",phase:"group"},
  {id:"m030",date:"2026-06-19",home:"USA",         away:"Australia",         group:"D",phase:"group"},
  {id:"m031",date:"2026-06-19",home:"Brazil",      away:"Haiti",             group:"C",phase:"group"},
  {id:"m032",date:"2026-06-19",home:"Türkiye",     away:"Paraguay",          group:"D",phase:"group"},
  {id:"m033",date:"2026-06-20",home:"Netherlands", away:"Ukraine",           group:"F",phase:"group"},
  {id:"m034",date:"2026-06-20",home:"Germany",     away:"Ivory Coast",       group:"E",phase:"group"},
  {id:"m035",date:"2026-06-20",home:"Ecuador",     away:"Curacao",           group:"E",phase:"group"},
  {id:"m036",date:"2026-06-20",home:"Tunisia",     away:"Japan",             group:"F",phase:"group"},
  {id:"m037",date:"2026-06-21",home:"Spain",       away:"Saudi Arabia",      group:"H",phase:"group"},
  {id:"m038",date:"2026-06-21",home:"Belgium",     away:"Iran",              group:"G",phase:"group"},
  {id:"m039",date:"2026-06-21",home:"Uruguay",     away:"Cape Verde",        group:"H",phase:"group"},
  {id:"m040",date:"2026-06-21",home:"New Zealand", away:"Egypt",             group:"G",phase:"group"},
  {id:"m041",date:"2026-06-22",home:"Argentina",   away:"Austria",           group:"J",phase:"group"},
  {id:"m042",date:"2026-06-22",home:"France",      away:"Iraq",              group:"I",phase:"group"},
  {id:"m043",date:"2026-06-22",home:"Norway",      away:"Senegal",           group:"I",phase:"group"},
  {id:"m044",date:"2026-06-22",home:"Jordan",      away:"Algeria",           group:"J",phase:"group"},
  {id:"m045",date:"2026-06-23",home:"Portugal",    away:"Uzbekistan",        group:"K",phase:"group"},
  {id:"m046",date:"2026-06-23",home:"England",     away:"Ghana",             group:"L",phase:"group"},
  {id:"m047",date:"2026-06-23",home:"Panama",      away:"Croatia",           group:"L",phase:"group"},
  {id:"m048",date:"2026-06-23",home:"Colombia",    away:"DR Congo",          group:"K",phase:"group"},
  {id:"m049",date:"2026-06-24",home:"Switzerland", away:"Canada",            group:"B",phase:"group"},
  {id:"m050",date:"2026-06-24",home:"Bosnia-Herzegovina",away:"Qatar",       group:"B",phase:"group"},
  {id:"m051",date:"2026-06-24",home:"Scotland",    away:"Brazil",            group:"C",phase:"group"},
  {id:"m052",date:"2026-06-24",home:"Morocco",     away:"Haiti",             group:"C",phase:"group"},
  {id:"m053",date:"2026-06-24",home:"Czech Republic",away:"Mexico",          group:"A",phase:"group"},
  {id:"m054",date:"2026-06-24",home:"South Africa",away:"South Korea",       group:"A",phase:"group"},
  {id:"m055",date:"2026-06-25",home:"Ecuador",     away:"Germany",           group:"E",phase:"group"},
  {id:"m056",date:"2026-06-25",home:"Curacao",     away:"Ivory Coast",       group:"E",phase:"group"},
  {id:"m057",date:"2026-06-25",home:"Japan",       away:"Ukraine",           group:"F",phase:"group"},
  {id:"m058",date:"2026-06-25",home:"Tunisia",     away:"Netherlands",       group:"F",phase:"group"},
  {id:"m059",date:"2026-06-25",home:"Türkiye",     away:"USA",               group:"D",phase:"group"},
  {id:"m060",date:"2026-06-25",home:"Paraguay",    away:"Australia",         group:"D",phase:"group"},
  {id:"m061",date:"2026-06-26",home:"Norway",      away:"France",            group:"I",phase:"group"},
  {id:"m062",date:"2026-06-26",home:"Senegal",     away:"Iraq",              group:"I",phase:"group"},
  {id:"m063",date:"2026-06-26",home:"Cape Verde",  away:"Saudi Arabia",      group:"H",phase:"group"},
  {id:"m064",date:"2026-06-26",home:"Uruguay",     away:"Spain",             group:"H",phase:"group"},
  {id:"m065",date:"2026-06-26",home:"Egypt",       away:"Iran",              group:"G",phase:"group"},
  {id:"m066",date:"2026-06-26",home:"New Zealand", away:"Belgium",           group:"G",phase:"group"},
  {id:"m067",date:"2026-06-27",home:"Panama",      away:"England",           group:"L",phase:"group"},
  {id:"m068",date:"2026-06-27",home:"Croatia",     away:"Ghana",             group:"L",phase:"group"},
  {id:"m069",date:"2026-06-27",home:"Colombia",    away:"Portugal",          group:"K",phase:"group"},
  {id:"m070",date:"2026-06-27",home:"DR Congo",    away:"Uzbekistan",        group:"K",phase:"group"},
  {id:"m071",date:"2026-06-27",home:"Algeria",     away:"Austria",           group:"J",phase:"group"},
  {id:"m072",date:"2026-06-27",home:"Jordan",      away:"Argentina",         group:"J",phase:"group"},
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
const ALL_DATES = Object.keys(BY_DATE).sort();
const PHASE_LABEL = {group:"Ομιλοι",round32:"Round of 32",round16:"Round of 16",quarter:"Quarter Final",semi:"Semi Final",bronze:"3η Θεση",final:"Τελικος"};

const calcDayPts=(date,up,res)=>(BY_DATE[date]||[]).reduce((s,m)=>{const r=res[m.id],p=up?.[date]?.[m.id];return s+(r&&p&&p===r?1:0);},0);
const calcTotal=(up,res)=>ALL_DATES.reduce((s,d)=>s+calcDayPts(d,up,res),0);
function playerStats(up,res){let correct=0,wrong=0,total=0;ALL_DATES.forEach(d=>{(BY_DATE[d]||[]).forEach(m=>{const p=up?.[d]?.[m.id],r=res[m.id];if(p){total++;if(r){if(p===r)correct++;else wrong++;}}});});const dec=correct+wrong;return{correct,wrong,total,pct:dec?Math.round(correct/dec*100):0};}

async function fetchFromAPI(apiKey){
  const h={Authorization:`Bearer ${apiKey}`};
  const [allRes,finRes]=await Promise.all([fetch("https://api.wc2026api.com/matches",{headers:h}),fetch("https://api.wc2026api.com/matches?status=finished",{headers:h})]);
  if(!allRes.ok)throw new Error(`API error ${allRes.status}`);
  const allData=await allRes.json();const finData=finRes.ok?await finRes.json():[];
  const allM=allData.matches||allData||[];const finM=finData.matches||finData||[];
  const newTeams={},newResults={};
  function find(m){const d=(m.kickoff_utc||m.date||"").slice(0,10);const h2=(m.home_team||m.home||"").toLowerCase();const a=(m.away_team||m.away||"").toLowerCase();
    return SCHEDULE.find(s=>s.date===d&&(s.home.toLowerCase().includes(h2)||h2.includes(s.home.toLowerCase()))&&(s.away.toLowerCase().includes(a)||a.includes(s.away.toLowerCase())))||
      SCHEDULE.find(s=>(s.home.toLowerCase().includes(h2)||h2.includes(s.home.toLowerCase()))&&(s.away.toLowerCase().includes(a)||a.includes(s.away.toLowerCase())));}
  allM.forEach(m=>{const h2=m.home_team||m.home,a=m.away_team||m.away;if(!h2||!a||h2==="TBD"||a==="TBD")return;const f=find(m);if(f&&f.phase!=="group")newTeams[f.id]={home:h2,away:a};});
  finM.forEach(m=>{const hg=m.home_score??m.home_goals??m.score?.home;const ag=m.away_score??m.away_goals??m.score?.away;if(hg==null||ag==null)return;const f=find(m);if(f)newResults[f.id]=hg>ag?"1":hg<ag?"2":"X";});
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

  // ── shared data from Supabase ──
  const [users,setUsers]=useState([]);
  const [predictions,setPredictions]=useState({}); // userId -> date -> matchId -> pick
  const [results,setResults]=useState({});         // matchId -> "1"|"X"|"2"
  const [apiTeams,setApiTeams]=useState({});       // matchId -> {home,away}
  const [apiKey,setApiKey]=useState("");
  const [lastFetch,setLastFetch]=useState(null);

  const today=new Date().toISOString().slice(0,10);
  const showToast=(msg,type="ok")=>{setToast({msg,type});setTimeout(()=>setToast(null),2600);};

  // ── LOAD ALL DATA ──
  const loadAll = useCallback(async()=>{
    try{
      const [{data:us},{data:preds},{data:gd}] = await Promise.all([
        supabase.from("users").select("*"),
        supabase.from("predictions").select("*"),
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

  // ── VOTE (locked) ──
  async function vote(matchId,pick){
    if(predictions[me.id]?.[today]?.[matchId])return;
    // optimistic
    setPredictions(prev=>{const n={...prev};n[me.id]??={};n[me.id][today]??={};n[me.id][today]={...n[me.id][today],[matchId]:pick};return n;});
    showToast("Ψηφος κλειδωθηκε");
    const {error}=await supabase.from("predictions").insert({user_id:me.id,match_id:matchId,match_date:today,pick});
    if(error){ showToast("Σφαλμα — δοκιμασε ξανα","err"); loadAll(); }
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
  async function saveApiKey(k){
    setApiKey(k);
    await supabase.from("game_data").upsert({key:"meta",value:{apiKey:k,lastFetch},updated_at:new Date().toISOString()});
    showToast("Key αποθηκευτηκε");
  }
  async function doFetch(){
    const k=(apiInput.trim()||apiKey).trim();if(!k){showToast("Βαλε API key","err");return;}
    setFetching(true);
    try{
      const{newTeams,newResults}=await fetchFromAPI(k);
      const mergedRes={...results,...newResults};
      const mergedTeams={...apiTeams,...newTeams};
      const now=new Date().toISOString();
      setResults(mergedRes); setApiTeams(mergedTeams); setApiKey(k); setLastFetch(now);
      await Promise.all([
        supabase.from("game_data").upsert({key:"results",value:mergedRes,updated_at:now}),
        supabase.from("game_data").upsert({key:"apiTeams",value:mergedTeams,updated_at:now}),
        supabase.from("game_data").upsert({key:"meta",value:{apiKey:k,lastFetch:now},updated_at:now}),
      ]);
      showToast(`${Object.keys(newResults).length} αποτελεσματα · ${Object.keys(newTeams).length} ομαδες`);
    }catch(e){ showToast(`Σφαλμα: ${e.message}`,"err"); }
    setFetching(false);
  }

  // ── DERIVED ──
  const myPreds=me?(predictions[me.id]||{}):{};
  const myDayPts=calcDayPts(today,myPreds,results);
  const myStats=me?playerStats(myPreds,results):null;
  const daysWithRes=ALL_DATES.filter(d=>(BY_DATE[d]||[]).some(m=>results[m.id]));
  const board=users.map(u=>{const p=predictions[u.id]||{};const rows=ALL_DATES.map(d=>({date:d,pts:calcDayPts(d,p,results)}));return{...u,isAdmin:u.is_admin,rows,total:rows.reduce((s,r)=>s+r.pts,0)};}).sort((a,b)=>b.total-a.total);
  const myBoard=board.find(u=>u.id===me?.id);
  const todayMatches=(BY_DATE[today]||[]).map(resolve);

  const css=STYLES;

  // ─── RENDER FUNCTIONS (same UI as before) ───
  function renderPredict(){
    const dp=myPreds[today]||{};
    const resCount=todayMatches.filter(m=>m.result).length;
    const grouped={};todayMatches.forEach(m=>{ (grouped[m.phase]??=[]).push(m); });
    if(!todayMatches.length) return(<div className="no-m"><div className="ico">🏟️</div><h3>ΚΑΝΕΝΑ ΜΑΤΣ ΣΗΜΕΡΑ</h3><p>Τα ματς ξεκινουν 11 Ιουνιου 2026.<br/>Δες την καταταξη ή το bracket στο μεταξυ!</p></div>);
    return(<>
      <div className="scorepanel"><div className="sp-row">
        <div className="sp-l"><h3>{caps(fmtLong(today))}</h3><p>{todayMatches.length} ματς · {Object.keys(dp).length} ψηφισεις · {resCount} αποτελεσματα</p></div>
        <div className="sp-r"><div className="sp-num">{myDayPts}</div><div className="sp-lbl">ΠΟΝΤΟΙ</div></div>
      </div></div>
      <div className="lockbar">🔒 Διαλεξε νικητη — μολις πατησεις κλειδωνει οριστικα</div>
      {Object.entries(grouped).map(([phase,ms])=>(
        <div key={phase}>
          <div className="psep"><span className="plabel">{caps(PHASE_LABEL[phase])}{ms[0]?.group?` · ΟΜ. ${ms[0].group}`:""}</span></div>
          {ms.map(m=>{const pick=dp[m.id],res=m.result;const won=pick&&res&&pick===res,lost=pick&&res&&pick!==res,locked=!!pick;
            return(<div key={m.id} className={`mc${won?" won":lost?" lost":pick?" voted":""}`}>
              <div className="mc-head">
                <div className="mc-side"><span className="mc-bigflag">{F(m.home)}</span><span className="mc-team">{m.home}</span></div>
                <div className="mc-mid"><span className="mc-vs">VS</span>{res?<span className={`mc-result-pill ${won?"win":"loss"}`}>{won?"✓ +1":`Ληξη ${res}`}</span>:pick?<span className="mc-result-pill pend">⏳</span>:null}</div>
                <div className="mc-side"><span className="mc-bigflag">{F(m.away)}</span><span className="mc-team">{m.away}</span></div>
              </div>
              <div className="mc-votes">
                {["1","X","2"].map(v=>(<button key={v} className={`bigv${pick===v?` s${v}`:""}${locked?" lk":""}`} onClick={()=>!locked&&vote(m.id,v)}>
                  {pick===v&&<span className="bigv-lock">🔒</span>}
                  <span className="bigv-k">{v}</span>
                  <span className="bigv-sub">{v==="X"?"ΙΣΟΠΑΛΙΑ":v==="1"?"ΓΗΠΕΔΟΥΧΟΣ":"ΦΙΛΟΞΕΝ."}</span>
                </button>))}
              </div>
            </div>);
          })}
        </div>
      ))}
    </>);
  }

  function renderLeaderboard(){
    return(<>
      <div className="ptop"><div className="ptitle"><em>ΚΑΤΑΤΑΞΗ</em></div><div className="psub">{users.length} παικτες · {daysWithRes.length} ημερες</div></div>
      {daysWithRes.length===0&&<div className="lb-empty">Κανενα αποτελεσμα ακομα. Η καταταξη εμφανιζεται με τα πρωτα αποτελεσματα.</div>}
      <div className="lb-card"><div className="lb-scroll"><table className="lb-tbl">
        <thead><tr><th>#</th><th>Παικτης</th>{daysWithRes.map(d=><th key={d}>{fmtShort(d)}</th>)}<th>Συν.</th></tr></thead>
        <tbody>{board.map((u,i)=>{const rc=i===0?"g":i===1?"s":i===2?"b":"";const medal=i===0?"🥇":i===1?"🥈":i===2?"🥉":null;
          return(<tr key={u.id} className={`lb-row${u.id===me?.id?" me-row":""}`}>
            <td><span className={`rnk ${rc}`}>{medal||i+1}</span></td>
            <td><span className="ucell">{u.username}{u.id===me?.id&&<span className="me-badge">ΕΣΥ</span>}{u.isAdmin&&<span style={{fontSize:".58rem",color:"var(--muted)",marginLeft:4}}>⚙</span>}</span></td>
            {daysWithRes.map(d=>{const pts=u.rows.find(r=>r.date===d)?.pts||0;return<td key={d}><span className={`dc ${pts>0?"pos":"zero"}`}>{pts>0?`+${pts}`:"—"}</span></td>;})}
            <td><span className="tcell">{u.total}</span></td>
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
      <div className="atabs">{[["results","Αποτελεσματα"],["auto","API"],["preview","Preview"],["users","Χρηστες"]].map(([k,l])=>(<button key={k} className={`atab${adminTab===k?" on":""}`} onClick={()=>setAdminTab(k)}>{l}</button>))}</div>
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
      {adminTab==="auto"&&(<div className="fetch-card">
        <div className="fetch-title">Αυτοματη Ανακτηση API</div>
        <div className="fetch-desc">Τραβαει αποτελεσματα + ομαδες knockout απο <a href="https://www.wc2026api.com" target="_blank" rel="noreferrer" style={{color:"var(--gold3)"}}>wc2026api.com</a>.<br/>Δωρεαν key: επισκεψου το site → "Get API Key".</div>
        <div className="fetch-row">
          <input className="inp-key" type="text" placeholder={apiKey?"Key αποθηκευμενο ✓":"wc2026_your_key_here"} value={apiInput} onChange={e=>setApiInput(e.target.value)}/>
          <button className="bsm b-dark" onClick={()=>{const k=apiInput.trim();if(k)saveApiKey(k);}}>Αποθηκευση</button>
          <button className="bsm b-gold" onClick={doFetch} disabled={fetching}>{fetching?"Φορτωση...":"Ανακτηση"}</button>
        </div>
        {lastFetch&&<div className="last-f">Τελευταια: {new Date(lastFetch).toLocaleString("el-GR")}</div>}
        {apiKey&&!apiInput&&<div className="last-f">✓ Key: {apiKey.slice(0,16)}…</div>}
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
        {users.map(u=>{const total=calcTotal(predictions[u.id]||{},results);const vs=ALL_DATES.reduce((s,d)=>s+Object.keys((predictions[u.id]||{})[d]||{}).length,0);
          return(<div key={u.id} className="ur"><span style={{flex:1,fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:".95rem"}}>{u.username}{u.is_admin?" 👑":""}</span>
            <span style={{color:"var(--muted)",fontSize:".75rem"}}>{vs} ψηφ.</span>
            <span style={{color:"var(--gold2)",fontWeight:700,fontFamily:"'Orbitron',sans-serif",fontSize:".85rem"}}>{total}</span>
            {!u.is_admin&&<button className="del" onClick={()=>delUser(u.id)}>✕</button>}</div>);
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
            {[{k:"predict",l:"Ψηφισεις"},{k:"bracket",l:"Bracket"},{k:"leaderboard",l:"Καταταξη"},...(me.is_admin?[{k:"admin",l:"Admin"}]:[])].map(n=>(
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
          {view==="leaderboard"&&renderLeaderboard()}
          {view==="admin"&&me.is_admin&&renderAdmin()}
        </main>
      )}
      {toast&&<div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  </>);
}

// ─── STYLES (same futuristic stadium theme) ───
const STYLES=`
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{--bg:#070809;--surface:#101216;--card:#16191e;--card2:#1c2025;--gold:#f0c54a;--gold2:#ffd866;--gold3:#caa028;--golddim:rgba(240,197,74,0.12);--goldbord:rgba(240,197,74,0.28);--text:#eceae3;--text2:#b4b1a7;--muted:#6a6960;--green:#3ddc84;--red:#ff5c5c;--r:11px;--r2:16px;}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;font-size:15px;-webkit-font-smoothing:antialiased;}
.app{min-height:100vh;display:flex;flex-direction:column;background:radial-gradient(ellipse 90% 35% at 50% 0%,rgba(240,197,74,0.08) 0%,transparent 60%),var(--bg);}
.boot{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;min-height:100vh;}
.boot-ball{font-size:3rem;animation:bootspin 1.2s ease-in-out infinite;}
@keyframes bootspin{0%,100%{transform:translateY(0) rotate(0);}50%{transform:translateY(-12px) rotate(180deg);}}
.boot-text{font-family:'Orbitron',sans-serif;font-size:.9rem;font-weight:700;letter-spacing:3px;color:var(--gold3);}
.login-fs{position:fixed;inset:0;z-index:500;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:1.5rem;background:#070809;}
.lf-grid{position:absolute;left:50%;bottom:-10%;width:200%;height:70%;transform:translateX(-50%) perspective(380px) rotateX(62deg);background-image:linear-gradient(rgba(240,197,74,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(240,197,74,0.22) 1px,transparent 1px);background-size:38px 38px;animation:gridmove 3s linear infinite;mask-image:radial-gradient(ellipse 60% 80% at 50% 100%,#000 10%,transparent 75%);-webkit-mask-image:radial-gradient(ellipse 60% 80% at 50% 100%,#000 10%,transparent 75%);opacity:.6;}
@keyframes gridmove{from{background-position:0 0;}to{background-position:0 38px;}}
.lf-glow{position:absolute;top:-30%;left:50%;transform:translateX(-50%);width:120%;height:60%;background:radial-gradient(ellipse 50% 60% at 50% 50%,rgba(240,197,74,0.18) 0%,transparent 70%);animation:glowpulse 4s ease-in-out infinite;}
@keyframes glowpulse{0%,100%{opacity:.7;}50%{opacity:1;}}
.lf-scan{position:absolute;left:0;right:0;height:140px;background:linear-gradient(180deg,transparent,rgba(240,197,74,0.06),transparent);animation:scandown 5s linear infinite;}
@keyframes scandown{from{top:-140px;}to{top:100%;}}
.lf-orb{position:absolute;border-radius:50%;filter:blur(50px);opacity:.4;}
.lf-orb1{width:200px;height:200px;background:rgba(240,197,74,0.25);top:15%;left:10%;animation:float1 8s ease-in-out infinite;}
.lf-orb2{width:160px;height:160px;background:rgba(240,197,74,0.18);bottom:18%;right:12%;animation:float2 10s ease-in-out infinite;}
@keyframes float1{0%,100%{transform:translate(0,0);}50%{transform:translate(30px,-25px);}}
@keyframes float2{0%,100%{transform:translate(0,0);}50%{transform:translate(-25px,20px);}}
.login-box{position:relative;z-index:2;width:100%;max-width:370px;background:rgba(16,18,22,0.72);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid var(--goldbord);border-radius:18px;overflow:hidden;box-shadow:0 0 0 1px rgba(240,197,74,0.06) inset,0 30px 70px rgba(0,0,0,0.75),0 0 80px rgba(240,197,74,0.12);animation:boxin .6s cubic-bezier(.2,.8,.2,1) both;}
@keyframes boxin{from{opacity:0;transform:translateY(24px) scale(.97);}to{opacity:1;transform:translateY(0) scale(1);}}
.login-topbar{height:3px;background:linear-gradient(90deg,transparent,var(--gold3),var(--gold2),var(--gold3),transparent);background-size:200% 100%;animation:barslide 3s ease-in-out infinite;}
@keyframes barslide{0%,100%{background-position:0% 0;}50%{background-position:100% 0;}}
.login-head{padding:1.9rem 1.8rem 1.3rem;text-align:center;border-bottom:1px solid rgba(255,255,255,0.05);}
.login-icon{width:64px;height:64px;margin:0 auto .85rem;border-radius:50%;background:radial-gradient(circle,rgba(240,197,74,0.22) 0%,rgba(240,197,74,0.04) 70%);border:1px solid var(--goldbord);display:flex;align-items:center;justify-content:center;box-shadow:0 0 35px rgba(240,197,74,0.25);position:relative;}
.login-icon span{font-size:1.9rem;animation:iconfloat 3s ease-in-out infinite;}
@keyframes iconfloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-4px);}}
.login-icon::after{content:'';position:absolute;inset:-1px;border-radius:50%;border:1px solid transparent;border-top-color:var(--gold);animation:spin 3s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.login-title{font-family:'Orbitron',sans-serif;font-size:1.6rem;font-weight:800;letter-spacing:3px;color:var(--gold2);text-shadow:0 0 24px rgba(240,197,74,0.5);}
.login-sub{font-family:'Rajdhani',sans-serif;color:var(--muted);font-size:.72rem;letter-spacing:3px;margin-top:.35rem;font-weight:600;}
.login-body{padding:1.5rem 1.8rem 1.8rem;}
.lerr{background:rgba(255,92,92,0.1);border:1px solid rgba(255,92,92,0.28);border-radius:8px;padding:.5rem .8rem;margin-bottom:.85rem;color:var(--red);font-size:.8rem;text-align:center;}
.lfield{margin-bottom:.9rem;}
.lfield label{display:block;font-family:'Rajdhani',sans-serif;font-size:.72rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:.4rem;}
.lfield input{width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:9px;color:var(--text);font-family:'Inter',sans-serif;font-size:.92rem;padding:.7rem .95rem;outline:none;transition:all .2s;}
.lfield input:focus{border-color:var(--gold3);background:rgba(240,197,74,0.05);box-shadow:0 0 0 3px rgba(240,197,74,0.1);}
.lfield input::placeholder{color:var(--muted);}
.login-submit{width:100%;margin-top:.3rem;position:relative;overflow:hidden;background:linear-gradient(135deg,var(--gold3),var(--gold2));border:none;border-radius:9px;font-family:'Orbitron',sans-serif;font-weight:700;font-size:.92rem;letter-spacing:3px;color:#070809;padding:.8rem;cursor:pointer;transition:all .2s;box-shadow:0 4px 22px rgba(240,197,74,0.28);}
.login-submit:disabled{opacity:.6;cursor:wait;}
.login-submit span{position:relative;z-index:1;}
.login-submit::before{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent);animation:shine 3s ease-in-out infinite;}
@keyframes shine{0%{left:-100%;}60%,100%{left:160%;}}
.login-submit:hover{filter:brightness(1.1);box-shadow:0 6px 28px rgba(240,197,74,0.42);transform:translateY(-1px);}
.lsw{text-align:center;margin-top:.95rem;color:var(--muted);font-size:.82rem;}
.lsw button{background:none;border:none;color:var(--gold);font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;font-size:.82rem;text-decoration:underline;text-underline-offset:3px;}
.lhint{text-align:center;margin-top:.7rem;color:var(--muted);font-size:.68rem;letter-spacing:.5px;}
.hdr{position:sticky;top:0;z-index:200;height:56px;padding:0 1rem;display:flex;align-items:center;justify-content:space-between;gap:.5rem;background:rgba(7,8,9,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--goldbord);box-shadow:0 8px 30px rgba(0,0,0,0.6);}
.logo{font-family:'Orbitron',sans-serif;font-weight:800;font-size:1.05rem;letter-spacing:2px;color:var(--gold2);text-shadow:0 0 16px rgba(240,197,74,0.4);display:flex;align-items:center;gap:.45rem;white-space:nowrap;}
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
.ptitle{font-family:'Orbitron',sans-serif;font-size:1.2rem;font-weight:700;letter-spacing:1px;color:var(--text);}
.ptitle em{color:var(--gold);font-style:normal;}
.psub{font-family:'Rajdhani',sans-serif;color:var(--muted);font-size:.8rem;margin-top:.2rem;letter-spacing:.5px;}
.scorepanel{position:relative;overflow:hidden;background:linear-gradient(135deg,var(--card2),var(--card));border:1px solid var(--goldbord);border-radius:var(--r2);padding:1.1rem 1.2rem;margin-bottom:.7rem;box-shadow:0 8px 30px rgba(0,0,0,0.5),0 0 0 1px rgba(240,197,74,0.05) inset;}
.scorepanel::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);}
.sp-row{display:flex;align-items:center;justify-content:space-between;gap:1rem;}
.sp-l h3{font-family:'Rajdhani',sans-serif;font-size:1.05rem;font-weight:700;letter-spacing:1px;color:var(--text);}
.sp-l p{font-family:'Rajdhani',sans-serif;color:var(--text2);font-size:.78rem;margin-top:.25rem;letter-spacing:.3px;}
.sp-r{text-align:center;flex-shrink:0;}
.sp-num{font-family:'Orbitron',sans-serif;font-size:2.6rem;font-weight:800;color:var(--gold2);line-height:1;text-shadow:0 0 26px rgba(240,197,74,0.55);}
.sp-lbl{font-family:'Rajdhani',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-top:.15rem;}
.stats-strip{display:flex;gap:.5rem;margin-bottom:.85rem;}
.stat-box{flex:1;background:var(--card);border:1px solid rgba(255,255,255,0.06);border-radius:var(--r);padding:.6rem;text-align:center;}
.stat-num{font-family:'Orbitron',sans-serif;font-size:1.3rem;font-weight:700;line-height:1;}
.stat-num.g{color:var(--green);}.stat-num.r{color:var(--red);}.stat-num.gold{color:var(--gold2);}
.stat-lbl{font-family:'Rajdhani',sans-serif;font-size:.62rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-top:.25rem;}
.lockbar{display:flex;align-items:center;gap:.45rem;font-size:.72rem;color:var(--gold3);background:var(--golddim);border:1px solid rgba(240,197,74,0.15);border-radius:7px;padding:.4rem .8rem;margin-bottom:.9rem;letter-spacing:.3px;}
.psep{display:flex;align-items:center;gap:.6rem;margin:1.2rem 0 .6rem;}
.psep::before,.psep::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(240,197,74,0.15),transparent);}
.plabel{font-family:'Rajdhani',sans-serif;font-size:.72rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold3);white-space:nowrap;}
.mc{position:relative;background:linear-gradient(150deg,#21252b 0%,#191c21 45%,#141619 100%);border:1px solid rgba(255,255,255,0.08);border-radius:var(--r2);margin-bottom:.8rem;overflow:hidden;transition:transform .15s,box-shadow .15s,border-color .15s;box-shadow:0 1px 3px rgba(0,0,0,0.5),0 8px 20px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.07),inset 0 -2px 4px rgba(0,0,0,0.4);}
.mc.won{border-color:rgba(61,220,132,0.4);box-shadow:0 1px 3px rgba(0,0,0,0.5),0 8px 20px rgba(0,0,0,0.35),0 0 26px rgba(61,220,132,0.12),inset 0 1px 0 rgba(255,255,255,0.07);}
.mc.lost{border-color:rgba(255,92,92,0.25);}
.mc.voted{border-color:rgba(240,197,74,0.25);}
.mc::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);}
.mc-head{display:flex;align-items:center;justify-content:center;gap:.8rem;padding:1rem 1rem .7rem;}
.mc-side{flex:1;display:flex;flex-direction:column;align-items:center;gap:.4rem;min-width:0;}
.mc-bigflag{font-size:2.2rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.4));}
.mc-team{font-family:'Rajdhani',sans-serif;font-size:.95rem;font-weight:700;letter-spacing:.3px;color:var(--text);text-align:center;line-height:1.1;}
.mc-mid{display:flex;flex-direction:column;align-items:center;gap:.2rem;flex-shrink:0;}
.mc-vs{font-family:'Orbitron',sans-serif;font-size:.85rem;font-weight:700;letter-spacing:1px;color:var(--gold3);}
.mc-result-pill{font-family:'Rajdhani',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.5px;padding:.15rem .5rem;border-radius:5px;white-space:nowrap;}
.mc-result-pill.win{background:rgba(61,220,132,0.15);color:var(--green);border:1px solid rgba(61,220,132,0.3);}
.mc-result-pill.loss{background:rgba(255,92,92,0.12);color:var(--red);border:1px solid rgba(255,92,92,0.25);}
.mc-result-pill.pend{background:var(--golddim);color:var(--gold3);}
.mc-votes{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.4rem;padding:0 .7rem .7rem;}
.bigv{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.15rem;min-height:58px;background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.1);border-radius:12px;cursor:pointer;transition:all .14s;box-shadow:0 2px 6px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.06);}
.bigv-k{font-family:'Orbitron',sans-serif;font-size:1.35rem;font-weight:800;color:var(--text2);transition:color .14s;line-height:1;}
.bigv-sub{font-family:'Rajdhani',sans-serif;font-size:.58rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);transition:color .14s;}
.bigv:hover:not(.lk){background:rgba(240,197,74,0.1);border-color:rgba(240,197,74,0.4);transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,0.35),0 0 18px rgba(240,197,74,0.14),inset 0 1px 0 rgba(255,255,255,0.08);}
.bigv:hover:not(.lk) .bigv-k{color:var(--gold2);}
.bigv:hover:not(.lk) .bigv-sub{color:var(--gold3);}
.bigv:active:not(.lk){transform:translateY(0) scale(.97);}
.bigv.s1{background:linear-gradient(160deg,rgba(61,220,132,0.22),rgba(61,220,132,0.1));border-color:var(--green);box-shadow:0 3px 12px rgba(0,0,0,0.35),0 0 22px rgba(61,220,132,0.2),inset 0 1px 0 rgba(255,255,255,0.1);}
.bigv.s1 .bigv-k,.bigv.s1 .bigv-sub{color:var(--green);}
.bigv.sX{background:linear-gradient(160deg,rgba(240,197,74,0.22),rgba(240,197,74,0.1));border-color:var(--gold);box-shadow:0 3px 12px rgba(0,0,0,0.35),0 0 22px rgba(240,197,74,0.22),inset 0 1px 0 rgba(255,255,255,0.1);}
.bigv.sX .bigv-k,.bigv.sX .bigv-sub{color:var(--gold2);}
.bigv.s2{background:linear-gradient(160deg,rgba(255,92,92,0.22),rgba(255,92,92,0.1));border-color:var(--red);box-shadow:0 3px 12px rgba(0,0,0,0.35),0 0 22px rgba(255,92,92,0.18),inset 0 1px 0 rgba(255,255,255,0.1);}
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
.lb-row:hover{background:rgba(240,197,74,0.03);}
.lb-row.me-row{background:rgba(240,197,74,0.05);}
.lb-row td{padding:.74rem .85rem;vertical-align:middle;}
.rnk{font-family:'Orbitron',sans-serif;font-size:1rem;font-weight:700;color:var(--muted);}
.rnk.g{color:#FFD700;text-shadow:0 0 12px rgba(255,215,0,0.5);}.rnk.s{color:#C0C0C0;}.rnk.b{color:#CD7F32;}
.ucell{font-family:'Rajdhani',sans-serif;font-size:.95rem;font-weight:600;letter-spacing:.3px;color:var(--text);}
.me-badge{font-size:.56rem;background:var(--golddim);color:var(--gold);border:1px solid var(--goldbord);padding:.1rem .35rem;border-radius:4px;margin-left:.4rem;letter-spacing:1px;font-family:'Rajdhani',sans-serif;font-weight:700;}
.dc{font-family:'Rajdhani',sans-serif;font-size:.82rem;font-weight:700;}
.dc.pos{color:var(--green);}.dc.zero{color:var(--muted);}
.tcell{font-family:'Orbitron',sans-serif;font-size:1.1rem;font-weight:700;color:var(--gold2);text-shadow:0 0 12px rgba(240,197,74,0.3);}
.lb-empty{font-family:'Rajdhani',sans-serif;color:var(--text2);font-size:.85rem;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:var(--r);padding:1.5rem;text-align:center;margin-bottom:.8rem;}
.br-phases{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px;margin-bottom:1rem;}
.br-phases::-webkit-scrollbar{display:none;}
.br-ph{flex-shrink:0;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);color:var(--muted);font-family:'Rajdhani',sans-serif;font-size:.78rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:.4rem .85rem;border-radius:7px;cursor:pointer;transition:all .15s;white-space:nowrap;}
.br-ph.on{background:var(--golddim);border-color:var(--goldbord);color:var(--gold2);}
.br-match{position:relative;background:linear-gradient(150deg,#21252b,#16191e);border:1px solid rgba(255,255,255,0.08);border-radius:var(--r);margin-bottom:.6rem;overflow:hidden;box-shadow:0 4px 14px rgba(0,0,0,0.35);}
.br-match.final-match{border-color:var(--goldbord);box-shadow:0 4px 20px rgba(0,0,0,0.4),0 0 24px rgba(240,197,74,0.1);}
.br-match-label{font-family:'Rajdhani',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold3);padding:.45rem .8rem .2rem;}
.br-team{display:flex;align-items:center;gap:.6rem;padding:.55rem .8rem;transition:background .12s;}
.br-team+.br-team{border-top:1px solid rgba(255,255,255,0.05);}
.br-team.winner{background:rgba(61,220,132,0.08);}
.br-team-flag{font-size:1.3rem;flex-shrink:0;}
.br-team-name{font-family:'Rajdhani',sans-serif;font-size:.98rem;font-weight:600;color:var(--text);flex:1;}
.br-team.winner .br-team-name{color:var(--green);font-weight:700;}
.br-team.dim .br-team-name{color:var(--muted);}
.br-crown{font-size:.9rem;}
.br-trophy-final{text-align:center;padding:1.2rem;}
.br-trophy-final .champ-label{font-family:'Rajdhani',sans-serif;font-size:.7rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold3);margin-bottom:.5rem;}
.br-trophy-final .champ-flag{font-size:3rem;}
.br-trophy-final .champ-name{font-family:'Orbitron',sans-serif;font-size:1.3rem;font-weight:800;color:var(--gold2);text-shadow:0 0 24px rgba(240,197,74,0.5);margin-top:.4rem;}
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
.rbtn.r1on{background:rgba(61,220,132,0.14);border-color:rgba(61,220,132,0.4);color:var(--green);}
.rbtn.rXon{background:rgba(240,197,74,0.14);border-color:rgba(240,197,74,0.4);color:var(--gold2);}
.rbtn.r2on{background:rgba(255,92,92,0.14);border-color:rgba(255,92,92,0.35);color:var(--red);}
.fetch-card{background:var(--golddim);border:1px solid rgba(240,197,74,0.18);border-radius:var(--r2);padding:1rem;margin-bottom:.75rem;}
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
.info-bar{font-family:'Rajdhani',sans-serif;background:rgba(61,220,132,0.05);border:1px solid rgba(61,220,132,0.15);border-radius:7px;padding:.55rem .8rem;margin-bottom:.75rem;color:var(--text2);font-size:.82rem;line-height:1.5;}
.ur{display:flex;align-items:center;gap:.7rem;padding:.58rem 0;border-bottom:1px solid rgba(255,255,255,0.04);}
.ur:last-child{border-bottom:none;}
.del{background:rgba(255,92,92,0.08);border:1px solid rgba(255,92,92,0.2);color:var(--red);font-family:'Rajdhani',sans-serif;font-size:.75rem;font-weight:700;letter-spacing:1px;padding:.25rem .6rem;border-radius:5px;cursor:pointer;transition:all .12s;}
.del:hover{background:rgba(255,92,92,0.15);}
.pp{background:rgba(255,255,255,0.02);border-radius:8px;padding:.65rem;margin-bottom:.45rem;}
.pp-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:.35rem;}
.pp-n{font-family:'Rajdhani',sans-serif;font-size:.9rem;font-weight:700;color:var(--text);}
.pp-p{font-family:'Orbitron',sans-serif;font-size:.85rem;font-weight:700;color:var(--gold2);}
.pp-v{display:flex;gap:.3rem;flex-wrap:wrap;}
.pv{font-family:'Rajdhani',sans-serif;font-size:.66rem;font-weight:600;padding:.15rem .42rem;border-radius:4px;letter-spacing:.5px;}
.pv.pw{background:rgba(61,220,132,0.12);color:var(--green);border:1px solid rgba(61,220,132,0.2);}
.pv.pl{background:rgba(255,92,92,0.1);color:var(--red);border:1px solid rgba(255,92,92,0.15);}
.pv.pp2{background:var(--golddim);color:var(--gold3);border:1px solid rgba(240,197,74,0.12);}
.pv.pn{background:rgba(255,255,255,0.03);color:var(--muted);border:1px solid rgba(255,255,255,0.05);}
.toast{position:fixed;bottom:1.2rem;left:50%;transform:translateX(-50%);font-family:'Rajdhani',sans-serif;font-weight:700;font-size:.85rem;letter-spacing:1.5px;text-transform:uppercase;padding:.5rem 1.2rem;border-radius:8px;z-index:9999;white-space:nowrap;pointer-events:none;animation:tup .2s ease;}
.toast.ok{background:rgba(61,220,132,0.15);border:1px solid rgba(61,220,132,0.35);color:var(--green);box-shadow:0 4px 20px rgba(0,0,0,0.5),0 0 20px rgba(61,220,132,0.12);}
.toast.err{background:rgba(255,92,92,0.12);border:1px solid rgba(255,92,92,0.3);color:var(--red);box-shadow:0 4px 20px rgba(0,0,0,0.5);}
@keyframes tup{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
`;
