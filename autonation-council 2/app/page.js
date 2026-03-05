"use client";
import { useState, useRef, useEffect } from "react";

const PERSONAS = [
  {
    id: "council", label: "🏛 Small Council",
    system: "You are the AI Small Council chief advisor for Autonation automotive business. Be strategic, precise, and data-driven. Help with business decisions, sales strategy, customer insights, and operational efficiency. Always respond in the same language the user uses (Thai or English).",
  },
  {
    id: "sales", label: "💰 Sales",
    system: "You are a Sales Strategy advisor for Autonation automotive dealership. Specialize in sales growth, lead conversion, customer acquisition, closing techniques, and revenue optimization. Be direct and action-oriented. Always respond in the same language the user uses (Thai or English).",
  },
  {
    id: "mkt", label: "📢 Marketing",
    system: "You are a Marketing advisor for Autonation automotive. Specialize in digital marketing, brand positioning, social media campaigns, and customer engagement for car dealerships. Always respond in the same language the user uses (Thai or English).",
  },
  {
    id: "ops", label: "⚙️ Operations",
    system: "You are an Operations advisor for Autonation. Specialize in dealership operations, inventory management, service department efficiency, and process optimization. Always respond in the same language the user uses (Thai or English).",
  },
  {
    id: "data", label: "📊 Analytics",
    system: "You are a Data and Analytics advisor for Autonation. Analyze business metrics, customer data, market trends, and provide actionable insights for dealership performance improvement. Always respond in the same language the user uses (Thai or English).",
  },
];

export default function Page() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "สวัสดีครับ! ผม AI Small Council ของ Autonation 👋\n\nพร้อมช่วยด้านกลยุทธ์ธุรกิจรถยนต์:\n• 💰 กลยุทธ์การขาย & Lead conversion\n• 📢 Marketing & Campaign\n• ⚙️ Operations & Inventory\n• 📊 Data & Business Insights\n\nถามได้เลยครับ!" },
  ]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState(PERSONAS[0]);
  const chatRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  const switchPersona = (p) => {
    setPersona(p);
    setHistory([]);
    setMessages([{ role: "assistant", content: `เปลี่ยนเป็น ${p.label} mode แล้วครับ 🔄\nบทสนทนาเริ่มใหม่` }]);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "48px";

    const newHistory = [...history, { role: "user", content: text }];
    setHistory(newHistory);
    setMessages(m => [...m, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory, system: persona.system }),
      });
      const data = await res.json();

      if (data.error) {
        setMessages(m => [...m, { role: "assistant", content: "❌ " + data.error }]);
      } else {
        setHistory(h => [...h, { role: "assistant", content: data.content }]);
        setMessages(m => [...m, { role: "assistant", content: data.content }]);
      }
    } catch (e) {
      setMessages(m => [...m, { role: "assistant", content: "❌ " + e.message }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "48px";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0f; }
        @keyframes bounce { 0%,60%,100%{transform:translateY(0);opacity:0.35} 30%{transform:translateY(-7px);opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #252535; }
        textarea::placeholder { color: #555570; }
        .tab-btn { transition: all 0.15s; }
        .tab-btn:hover { border-color: #e8c547 !important; color: #e8c547 !important; }
        .send-btn:hover:not(:disabled) { background: #f5d44a !important; }
        .message { animation: fadeUp 0.2s ease-out; }
      `}</style>

      <div style={{ display:"flex", flexDirection:"column", height:"100vh", background:"#0a0a0f", color:"#e8e8f0", fontFamily:"'Noto Sans Thai', -apple-system, sans-serif" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 20px", borderBottom:"1px solid #1a1a2a", background:"#0d0d15", flexShrink:0 }}>
          <div style={{ width:38, height:38, background:"#e8c547", clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:13, color:"#000", flexShrink:0 }}>
            AI
          </div>
          <div>
            <div style={{ fontWeight:800, fontSize:15, letterSpacing:"0.08em", textTransform:"uppercase", color:"#e8c547", fontFamily:"system-ui, sans-serif" }}>
              Autonation Council
            </div>
            <div style={{ fontSize:10, color:"#555570", letterSpacing:"0.04em" }}>AI Small Council · Powered by Claude</div>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:5, fontSize:10, color: loading ? "#e8c547" : "#4fe0a0" }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background: loading ? "#e8c547" : "#4fe0a0", animation: "blink 2s infinite" }} />
            {loading ? "THINKING..." : "READY"}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:3, padding:"7px 16px", background:"#0f0f1a", borderBottom:"1px solid #1a1a2a", overflowX:"auto", flexShrink:0 }}>
          {PERSONAS.map(p => (
            <button key={p.id} className="tab-btn" onClick={() => switchPersona(p)} style={{
              padding:"4px 12px", border:"1px solid", cursor:"pointer", fontSize:11, whiteSpace:"nowrap", fontFamily:"inherit",
              borderColor: persona.id === p.id ? "#e8c547" : "#252535",
              background: persona.id === p.id ? "#e8c547" : "transparent",
              color: persona.id === p.id ? "#000" : "#666680",
              fontWeight: persona.id === p.id ? 700 : 400,
            }}>{p.label}</button>
          ))}
        </div>

        {/* Chat */}
        <div ref={chatRef} style={{ flex:1, overflowY:"auto", padding:"20px 16px", display:"flex", flexDirection:"column", gap:14 }}>
          {messages.map((msg, i) => (
            <div key={i} className="message" style={{ maxWidth:"82%", alignSelf: msg.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ fontSize:9, letterSpacing:"0.12em", textTransform:"uppercase", color:"#454560", marginBottom:4, textAlign: msg.role === "user" ? "right" : "left" }}>
                {msg.role === "user" ? "◆ YOU" : "⬡ COUNCIL"}
              </div>
              <div style={{
                padding:"11px 15px", lineHeight:1.8, fontSize:14, whiteSpace:"pre-wrap", wordBreak:"break-word",
                background: msg.role === "user" ? "#14142a" : "#0b1a10",
                border: msg.role === "user" ? "1px solid #222248" : "1px solid #122018",
                borderLeft: msg.role === "assistant" ? "3px solid #4fe0a0" : undefined,
                borderRadius: msg.role === "user" ? "3px 3px 0 3px" : "0 3px 3px 3px",
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ alignSelf:"flex-start", display:"flex", gap:5, padding:"12px 15px", background:"#0b1a10", border:"1px solid #122018", borderLeft:"3px solid #4fe0a0", borderRadius:"0 3px 3px 3px" }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:"#4fe0a0", animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding:"12px 16px", borderTop:"1px solid #1a1a2a", background:"#0d0d15", flexShrink:0 }}>
          <div style={{ display:"flex", gap:8 }}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKey}
              placeholder="ถามเรื่องธุรกิจ Autonation..."
              rows={1}
              style={{
                flex:1, background:"#0f0f1a", border:`1px solid ${input ? "#e8c547" : "#1a1a2a"}`,
                color:"#e8e8f0", padding:"12px 14px", fontSize:14, outline:"none", resize:"none",
                fontFamily:"inherit", lineHeight:1.5, height:"48px", transition:"border-color 0.15s", borderRadius:2,
              }}
            />
            <button className="send-btn" onClick={send} disabled={loading || !input.trim()} style={{
              padding:"12px 20px", border:"none", fontWeight:800, fontSize:16, borderRadius:2,
              cursor: !loading && input.trim() ? "pointer" : "not-allowed",
              background: !loading && input.trim() ? "#e8c547" : "#1e1e15",
              color: !loading && input.trim() ? "#000" : "#444430",
              transition:"all 0.15s", flexShrink:0,
            }}>▶</button>
          </div>
        </div>

      </div>
    </>
  );
}
