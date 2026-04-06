import { useState, useEffect, useRef } from "react";

const EMAILJS_SERVICE_ID  = "service_pd1c8mo";
const EMAILJS_TEMPLATE_ID = "template_08ong0l";
const EMAILJS_PUBLIC_KEY  = "_hBrxqLirjtHnckir";
const GOOGLE_SHEET_URL    = "https://script.google.com/macros/s/AKfycbw_gFEo_yT6HWiyHUoYD_JH8gGEd0fnEUPATeU-KwcdBuX7MJqc4KD6tUatmMtRhZGR/exec";

const TONES     = ["Energetic 🔥","Funny 😂","Motivational 💪","Educational 🧠","Emotional 😢","Trendy ✨"];
const DURATIONS = ["15 sec","30 sec","60 sec"];
const LANGUAGES = ["English","Hinglish","Hindi"];
const USE_CASES = [
  "YouTube Shorts Creator 🎬","Instagram Reels Creator 📸",
  "Marketing / Brand 📢","Student / Learning 🎓",
  "Freelancer / Agency 💼","Just Exploring 👀",
];

const cardStyle = {background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"20px",padding:"28px",backdropFilter:"blur(20px)"};
const labelStyle = {display:"block",fontSize:"11px",letterSpacing:"2px",color:"#555",marginBottom:"8px",textTransform:"uppercase"};
const primaryBtn = (disabled) => ({width:"100%",padding:"15px",background:disabled?"rgba(255,255,255,0.05)":"linear-gradient(135deg,#00ff64 0%,#00ccff 100%)",border:"none",borderRadius:"14px",color:disabled?"#444":"#000",fontSize:"14px",fontWeight:"900",letterSpacing:"2px",textTransform:"uppercase",cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",transition:"all 0.3s"});
const chipBtn = (active,color) => ({padding:"5px 11px",borderRadius:"100px",fontSize:"11px",border:active?`1px solid ${color}`:"1px solid rgba(255,255,255,0.08)",background:active?`${color}22`:"transparent",color:active?color:"#555",cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s"});

function ErrBox({msg}){return msg?<div style={{background:"rgba(255,50,50,0.08)",border:"1px solid rgba(255,50,50,0.2)",borderRadius:"10px",padding:"10px 14px",color:"#ff8080",fontSize:"13px",marginBottom:"14px"}}>{msg}</div>:null;}

function BgDecor(){return(<><div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:`linear-gradient(rgba(0,255,100,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,100,0.03) 1px,transparent 1px)`,backgroundSize:"40px 40px"}}/><div style={{position:"fixed",top:"-120px",right:"-120px",width:"420px",height:"420px",borderRadius:"50%",background:"radial-gradient(circle,rgba(0,255,100,0.08) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/><div style={{position:"fixed",bottom:"-120px",left:"-120px",width:"360px",height:"360px",borderRadius:"50%",background:"radial-gradient(circle,rgba(100,0,255,0.06) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/></>);}

function EmailScreen({onOtpSent}){
  const [email,setEmail]=useState("");const [useCase,setUseCase]=useState("");const [loading,setLoading]=useState(false);const [error,setError]=useState("");const [focused,setFocused]=useState(false);
  const sendOtp=async()=>{
    const t=email.trim();
    if(!t||!t.includes("@")||!t.includes("."))return setError("Please enter a valid email address! 📧");
    if(!useCase)return setError("Please select what you do! 🙏");
    setError("");setLoading(true);
    const otp=Math.floor(100000+Math.random()*900000).toString();
    try{
      const res=await fetch("https://api.emailjs.com/api/v1.0/email/send",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({service_id:EMAILJS_SERVICE_ID,template_id:EMAILJS_TEMPLATE_ID,user_id:EMAILJS_PUBLIC_KEY,template_params:{to_email:t,otp,name:t,email:t}})});
      if(res.status===200){onOtpSent({email:t,useCase,otp,sentAt:Date.now()});}
      else{setError(`Email failed (${res.status}). Try again! 🔌`);}
    }catch(err){setError("Network error. Check your connection! 🔌");console.error(err);}
    setLoading(false);
  };
  return(
    <div style={{maxWidth:"460px",margin:"0 auto",padding:"48px 20px"}}>
      <div style={{textAlign:"center",marginBottom:"32px"}}>
        <div style={{display:"inline-block",background:"linear-gradient(90deg,#00ff64,#00ccff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontSize:"11px",letterSpacing:"4px",fontWeight:"bold",marginBottom:"12px"}}>◆ FREE ACCESS ◆</div>
        <h1 style={{fontSize:"clamp(24px,6vw,40px)",fontWeight:"900",margin:"0 0 8px",lineHeight:1.1,letterSpacing:"-1px",background:"linear-gradient(135deg,#fff,#999)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>SHORTS SCRIPT<br/><span style={{background:"linear-gradient(90deg,#00ff64,#00ccff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>GENERATOR</span></h1>
        <p style={{color:"#444",fontSize:"13px",margin:0}}>Enter your email → Get OTP → Unlock the tool! 🔐</p>
      </div>
      <div style={cardStyle}>
        <div style={{marginBottom:"18px"}}><label style={labelStyle}>📧 Email Address</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendOtp()} placeholder="your@email.com" style={{width:"100%",boxSizing:"border-box",background:"rgba(255,255,255,0.04)",border:`1px solid ${focused?"rgba(0,255,100,0.4)":"rgba(255,255,255,0.1)"}`,borderRadius:"12px",padding:"13px 16px",color:"#fff",fontSize:"15px",outline:"none",fontFamily:"inherit",transition:"border 0.2s"}} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}/></div>
        <div style={{marginBottom:"22px"}}><label style={labelStyle}>🎯 What do you do?</label><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>{USE_CASES.map(uc=><button key={uc} onClick={()=>setUseCase(uc)} style={{padding:"9px 10px",borderRadius:"10px",fontSize:"12px",border:useCase===uc?"1px solid #00ff64":"1px solid rgba(255,255,255,0.08)",background:useCase===uc?"rgba(0,255,100,0.1)":"rgba(255,255,255,0.02)",color:useCase===uc?"#00ff64":"#555",cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"all 0.2s"}}>{uc}</button>)}</div></div>
        <ErrBox msg={error}/>
        <button onClick={sendOtp} disabled={loading} style={primaryBtn(loading)}>{loading?"📨 SENDING OTP...":"📨 SEND OTP TO MY EMAIL"}</button>
        <p style={{textAlign:"center",color:"#2a2a2a",fontSize:"11px",marginTop:"12px",marginBottom:0}}>3 free scripts • No spam • OTP valid for 10 mins</p>
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:"20px",marginTop:"18px"}}>{["✓ 100% Free","✓ No Spam","✓ Instant Access"].map(t=><span key={t} style={{color:"#2a2a2a",fontSize:"11px"}}>{t}</span>)}</div>
    </div>
  );
}

function OtpScreen({data,onVerified,onBack}){
  const [otp,setOtp]=useState(["","","","","",""]);const [error,setError]=useState("");const [loading,setLoading]=useState(false);const [resendCD,setResendCD]=useState(30);const [success,setSuccess]=useState(false);
  const r0=useRef();const r1=useRef();const r2=useRef();const r3=useRef();const r4=useRef();const r5=useRef();
  const refs=[r0,r1,r2,r3,r4,r5];
  useEffect(()=>{refs[0].current?.focus();},[]);
  useEffect(()=>{if(resendCD<=0)return;const t=setTimeout(()=>setResendCD(r=>r-1),1000);return()=>clearTimeout(t);},[resendCD]);
  const handleChange=(i,val)=>{if(!/^\d?$/.test(val))return;const next=[...otp];next[i]=val;setOtp(next);if(val&&i<5)refs[i+1].current?.focus();if(val&&i===5){const full=[...otp];full[5]=val;if(full.every(d=>d!==""))verifyOtp(full.join(""));}};
  const handleKey=(i,e)=>{if(e.key==="Backspace"&&!otp[i]&&i>0)refs[i-1].current?.focus();};
  const verifyOtp=async(entered)=>{
    const code=entered||otp.join("");
    if(code.length<6)return setError("Please enter the complete 6-digit OTP 🔢");
    if(Date.now()-data.sentAt>10*60*1000)return setError("OTP expired! Please request a new one ⏰");
    if(code!==data.otp)return setError("Wrong OTP! Please check your email ❌");
    setError("");setLoading(true);setSuccess(true);
    try{await fetch(GOOGLE_SHEET_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:data.email,useCase:data.useCase})});}catch{}
    setTimeout(()=>{setLoading(false);onVerified(data.email);},800);
  };
  return(
    <div style={{maxWidth:"400px",margin:"0 auto",padding:"48px 20px"}}>
      <div style={{textAlign:"center",marginBottom:"28px"}}>
        <div style={{fontSize:"48px",marginBottom:"12px"}}>{success?"✅":"📬"}</div>
        <h2 style={{fontSize:"22px",fontWeight:"900",margin:"0 0 8px",color:"#fff",letterSpacing:"-0.5px"}}>{success?"Verified!":"Check Your Email"}</h2>
        <p style={{color:"#444",fontSize:"13px",margin:0}}>We sent a 6-digit code to:<br/><span style={{color:"#00ff64",fontWeight:"bold"}}>{data.email}</span></p>
        <p style={{color:"#333",fontSize:"11px",marginTop:"6px"}}>Also check your spam folder! 📁</p>
      </div>
      <div style={cardStyle}>
        <div style={{display:"flex",gap:"8px",justifyContent:"center",marginBottom:"20px"}}>
          {otp.map((digit,i)=><input key={i} ref={refs[i]} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={e=>handleChange(i,e.target.value)} onKeyDown={e=>handleKey(i,e)} onPaste={e=>{e.preventDefault();const p=e.clipboardData.getData("text").replace(/\D/g,"").slice(0,6);if(p.length===6){setOtp(p.split(""));verifyOtp(p);}}} style={{width:"44px",height:"54px",textAlign:"center",fontSize:"22px",fontWeight:"900",background:success?"rgba(0,255,100,0.1)":"rgba(255,255,255,0.05)",border:`1px solid ${digit?(success?"rgba(0,255,100,0.6)":"rgba(0,255,100,0.5)"):"rgba(255,255,255,0.1)"}`,borderRadius:"12px",color:"#fff",outline:"none",fontFamily:"inherit",transition:"all 0.2s"}}/>)}
        </div>
        <ErrBox msg={error}/>
        <button onClick={()=>verifyOtp()} disabled={loading} style={primaryBtn(loading)}>{loading?"✅ VERIFYING...":"✅ VERIFY OTP"}</button>
        <div style={{textAlign:"center",marginTop:"16px"}}>{resendCD>0?<span style={{color:"#333",fontSize:"12px"}}>Resend in {resendCD}s</span>:<button onClick={onBack} style={{background:"none",border:"none",color:"#00ccff",fontSize:"12px",cursor:"pointer",fontFamily:"inherit",textDecoration:"underline"}}>Resend OTP</button>}</div>
        <button onClick={onBack} style={{width:"100%",marginTop:"10px",padding:"10px",background:"transparent",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"10px",color:"#444",fontSize:"12px",cursor:"pointer",fontFamily:"inherit"}}>← Change Email</button>
      </div>
    </div>
  );
}

function ScriptTool({userEmail}){
  const [topic,setTopic]=useState("");const [tone,setTone]=useState("Energetic 🔥");const [dur,setDur]=useState("30 sec");const [lang,setLang]=useState("Hinglish");const [hook,setHook]=useState("");const [script,setScript]=useState("");const [loading,setLoading]=useState(false);const [copied,setCopied]=useState(false);const [credits,setCredits]=useState(3);const [error,setError]=useState("");const [focused,setFocused]=useState(false);
  const generate=async()=>{
    if(!topic.trim())return setError("Please enter a video topic! 🙏");
    if(credits<=0)return setError("No credits left! Please upgrade 👑");
    setError("");setLoading(true);setHook("");setScript("");
    const langInstructions={"English":"Write entirely in English.","Hinglish":"Write in Hinglish — natural Hindi+English mix like Indian creators speak. Example: 'Bhai, yeh 5 habits ne meri life totally change kar di!'","Hindi":"Write entirely in Hindi using Devanagari script."};
    const prompt=`You are a viral YouTube Shorts scriptwriter.\nTopic: ${topic}\nTone: ${tone.replace(/[^\w\s]/g,"")}\nLanguage: ${langInstructions[lang]}\nDuration: ${dur}\nReturn ONLY raw JSON, no markdown:\n{"hook":"Attention-grabbing first 3 seconds line","script":"Full script with [PAUSE] markers and emojis. Strong CTA at end."}`;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data=await res.json();const txt=data.content?.map(i=>i.text||"").join("")||"";const p=JSON.parse(txt.replace(/```json|```/g,"").trim());
      setHook(p.hook||"");setScript(p.script||"");setCredits(c=>c-1);
    }catch(err){setError("Something went wrong! Please try again 🔄");console.error(err);}
    setLoading(false);
  };
  const copy=()=>{navigator.clipboard.writeText(`🎣 HOOK:\n${hook}\n\n📜 SCRIPT:\n${script}`);setCopied(true);setTimeout(()=>setCopied(false),2000);};
  return(
    <div style={{maxWidth:"740px",margin:"0 auto",padding:"32px 20px"}}>
      <div style={{textAlign:"center",marginBottom:"28px"}}>
        <div style={{fontSize:"11px",letterSpacing:"3px",color:"#3a3a3a",marginBottom:"8px"}}>✅ VERIFIED — <span style={{color:"#00ff64"}}>{userEmail}</span></div>
        <h1 style={{fontSize:"clamp(22px,5vw,38px)",fontWeight:"900",margin:"0 0 6px",lineHeight:1.1,letterSpacing:"-1px",background:"linear-gradient(135deg,#fff,#888)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>SHORTS SCRIPT <span style={{background:"linear-gradient(90deg,#00ff64,#00ccff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>GENERATOR</span></h1>
        <div style={{display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"10px",padding:"5px 14px",border:`1px solid ${credits>0?"rgba(0,255,100,0.2)":"rgba(255,50,50,0.25)"}`,borderRadius:"100px",background:credits>0?"rgba(0,255,100,0.05)":"rgba(255,50,50,0.05)",fontSize:"12px"}}><span style={{color:credits>0?"#00ff64":"#ff5050"}}>●</span><span style={{color:"#555"}}>{credits} scripts remaining</span>{credits===0&&<span style={{background:"linear-gradient(90deg,#ff6600,#ff0066)",color:"#fff",fontSize:"10px",padding:"2px 8px",borderRadius:"100px",fontWeight:"bold"}}>UPGRADE →</span>}</div>
      </div>
      <div style={{...cardStyle,marginBottom:"18px"}}>
        <div style={{marginBottom:"20px"}}><label style={labelStyle}>📌 Video Topic</label><input value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>e.key==="Enter"&&generate()} placeholder="e.g. 5 habits that changed my life..." style={{width:"100%",boxSizing:"border-box",background:"rgba(255,255,255,0.04)",border:`1px solid ${focused?"rgba(0,255,100,0.4)":"rgba(255,255,255,0.1)"}`,borderRadius:"12px",padding:"13px 16px",color:"#fff",fontSize:"15px",outline:"none",fontFamily:"inherit",transition:"border 0.2s"}} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}/></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"18px",marginBottom:"20px"}}>
          <div><label style={labelStyle}>🎭 Tone</label><div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>{TONES.map(t=><button key={t} onClick={()=>setTone(t)} style={chipBtn(tone===t,"#00ff64")}>{t}</button>)}</div></div>
          <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
            <div><label style={labelStyle}>⏱ Duration</label><div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>{DURATIONS.map(d=><button key={d} onClick={()=>setDur(d)} style={chipBtn(dur===d,"#00ccff")}>{d}</button>)}</div></div>
            <div><label style={labelStyle}>🌐 Script Language</label><div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>{LANGUAGES.map(l=><button key={l} onClick={()=>setLang(l)} style={chipBtn(lang===l,"#ff66cc")}>{l}</button>)}</div></div>
          </div>
        </div>
        <ErrBox msg={error}/>
        <button onClick={generate} disabled={loading||credits===0} style={primaryBtn(loading||credits===0)}>{loading?"⚡ GENERATING...":credits===0?"🔒 UPGRADE FOR MORE":"⚡ GENERATE SCRIPT"}</button>
      </div>
      {(hook||script||loading)&&(
        <div style={{...cardStyle,border:"1px solid rgba(0,255,100,0.15)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"18px"}}>
            <div style={{fontSize:"11px",letterSpacing:"3px",color:"#00ff64",fontWeight:"bold"}}>✦ GENERATED SCRIPT</div>
            {script&&<button onClick={copy} style={{padding:"5px 12px",borderRadius:"8px",background:copied?"rgba(0,255,100,0.2)":"rgba(255,255,255,0.04)",border:`1px solid ${copied?"rgba(0,255,100,0.4)":"rgba(255,255,255,0.1)"}`,color:copied?"#00ff64":"#555",fontSize:"11px",cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s"}}>{copied?"✓ COPIED!":"COPY ALL"}</button>}
          </div>
          {loading?<div style={{textAlign:"center",padding:"36px"}}><div style={{fontSize:"30px",marginBottom:"8px"}}>⚡</div><div style={{fontSize:"11px",letterSpacing:"2px",color:"#2a2a2a"}}>AI IS WRITING YOUR SCRIPT...</div></div>:<>{hook&&<div style={{background:"rgba(0,255,100,0.05)",border:"1px solid rgba(0,255,100,0.15)",borderRadius:"12px",padding:"14px",marginBottom:"12px"}}><div style={{fontSize:"10px",letterSpacing:"2px",color:"#00ff64",marginBottom:"6px"}}>🎣 HOOK — FIRST 3 SECONDS</div><div style={{color:"#fff",fontSize:"15px",lineHeight:1.6,fontWeight:"bold"}}>{hook}</div></div>}{script&&<div style={{background:"rgba(255,255,255,0.02)",borderRadius:"12px",padding:"14px"}}><div style={{fontSize:"10px",letterSpacing:"2px",color:"#555",marginBottom:"6px"}}>📜 FULL SCRIPT</div><div style={{color:"#ccc",fontSize:"14px",lineHeight:1.85,whiteSpace:"pre-wrap"}}>{script}</div></div>}</>}
        </div>
      )}
      <div style={{textAlign:"center",marginTop:"24px",color:"#1a1a1a",fontSize:"10px",letterSpacing:"2px"}}>BUILT WITH CLAUDE AI • CUTOREEL</div>
    </div>
  );
}

export default function App(){
  const [screen,setScreen]=useState("email");const [otpData,setOtpData]=useState(null);const [user,setUser]=useState(null);
  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0a0a0f 0%,#0d0d1a 50%,#0a0f0a 100%)",fontFamily:"'Courier New',monospace",color:"#e0e0e0",position:"relative",overflow:"hidden"}}>
      <BgDecor/>
      <div style={{position:"relative",zIndex:1}}>
        {screen==="email"&&<EmailScreen onOtpSent={d=>{setOtpData(d);setScreen("otp");}}/>}
        {screen==="otp"&&<OtpScreen data={otpData} onVerified={email=>{setUser(email);setScreen("tool");}} onBack={()=>setScreen("email")}/>}
        {screen==="tool"&&<ScriptTool userEmail={user}/>}
      </div>
    </div>
  );
}