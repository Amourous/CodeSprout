import React, { useState } from 'react';

const CodePlayground = ({ initialHtml = '', initialCss = '', initialJs = '' }) => {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [activeTab, setActiveTab] = useState(initialJs ? 'js' : (initialCss && !initialHtml ? 'css' : 'html'));

  // AI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: 'assistant', text: "Hi! I'm Sprout 🌱. Need a hint on what to write?" }]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const srcDoc = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>
          try {
            ${js}
          } catch (e) {
            console.error(e);
          }
        </script>
      </body>
    </html>
  `;

  const handleAskSprout = async () => {
    if (!chatInput.trim() || isTyping) return;
    const newMessages = [...chatMessages, { role: 'user', text: chatInput }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsTyping(true);

    const contextCode = `HTML:\n${html}\nCSS:\n${css}\nJS:\n${js}`;
    const tutorUrl = import.meta.env.VITE_TUTOR_URL || 'http://127.0.0.1:8787';

    try {
      const res = await fetch(tutorUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput, code: contextCode })
      });
      const data = await res.json();
      setChatMessages([...newMessages, { role: 'assistant', text: data.response || "Hmm, my brain feels fuzzy! Can you try asking again?" }]);
    } catch(e) {
      setChatMessages([...newMessages, { role: 'assistant', text: "Oops, I can't connect to my AI brain right now! Make sure the worker is running." }]);
    }
    setIsTyping(false);
  };

  return (
    <div className="relative flex flex-col gap-4 animate-fade-in w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full" style={{ minHeight: '600px' }}>
        
        <div className="card flex flex-col" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="flex" style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
            <button 
              onClick={() => setActiveTab('html')} 
              style={{ flex: 1, padding: '1rem', borderBottom: activeTab === 'html' ? '3px solid var(--primary)' : '3px solid transparent', fontWeight: 'bold', color: activeTab === 'html' ? 'var(--primary)' : 'var(--text-muted)', backgroundColor: activeTab === 'html' ? '#fff' : 'transparent', transition: 'all 0.2s' }}
            >
              HTML
            </button>
            <button 
              onClick={() => setActiveTab('css')} 
              style={{ flex: 1, padding: '1rem', borderBottom: activeTab === 'css' ? '3px solid var(--secondary)' : '3px solid transparent', fontWeight: 'bold', color: activeTab === 'css' ? 'var(--secondary)' : 'var(--text-muted)', backgroundColor: activeTab === 'css' ? '#fff' : 'transparent', transition: 'all 0.2s' }}
            >
              CSS
            </button>
            <button 
              onClick={() => setActiveTab('js')} 
              style={{ flex: 1, padding: '1rem', borderBottom: activeTab === 'js' ? '3px solid var(--accent-dark)' : '3px solid transparent', fontWeight: 'bold', color: activeTab === 'js' ? 'var(--accent-dark)' : 'var(--text-muted)', backgroundColor: activeTab === 'js' ? '#fff' : 'transparent', transition: 'all 0.2s' }}
            >
              JS
            </button>
          </div>
          
          <div style={{ flexGrow: 1, padding: '1rem', backgroundColor: '#fff' }}>
            {activeTab === 'html' && (
              <textarea 
                className="input-field h-full w-full" 
                style={{ height: '100%', minHeight: '300px', fontFamily: 'monospace', resize: 'none', border: 'none', outline: 'none', boxShadow: 'none', backgroundColor: '#fff', padding: 0 }}
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder="<!-- Write HTML here -->"
              />
            )}
            {activeTab === 'css' && (
              <textarea 
                className="input-field h-full w-full" 
                style={{ height: '100%', minHeight: '300px', fontFamily: 'monospace', resize: 'none', border: 'none', outline: 'none', boxShadow: 'none', backgroundColor: '#fff', padding: 0 }}
                value={css}
                onChange={(e) => setCss(e.target.value)}
                placeholder="/* Write CSS here */"
              />
            )}
            {activeTab === 'js' && (
              <textarea 
                className="input-field h-full w-full" 
                style={{ height: '100%', minHeight: '300px', fontFamily: 'monospace', resize: 'none', border: 'none', outline: 'none', boxShadow: 'none', backgroundColor: '#fff', padding: 0 }}
                value={js}
                onChange={(e) => setJs(e.target.value)}
                placeholder="// Write JavaScript here"
              />
            )}
          </div>
        </div>

        <div className="card flex flex-col" style={{ padding: '0', overflow: 'hidden', border: '4px solid var(--secondary)', position: 'relative' }}>
          <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
            <h3 className="text-xl text-accent" style={{ color: 'var(--accent-dark)', fontWeight: 'bold' }}>Preview 👀</h3>
          </div>
          <iframe 
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts allow-modals"
            style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#fff', minHeight: '300px' }}
          />

          {/* AI Chatbot Overlay */}
          {isChatOpen && (
            <div className="absolute bottom-20 right-4 bg-white z-50 flex flex-col shadow-2xl" style={{ width: '300px', height: '380px', borderRadius: '16px', border: '2px solid var(--primary)', overflow: 'hidden', padding: 0 }}>
              <div className="p-3 font-bold flex justify-between" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                <span>🌱 Sprout Tutor</span>
                <button onClick={() => setIsChatOpen(false)} style={{ color: 'white', fontWeight: 'bold' }}>✖</button>
              </div>
              <div className="flex-grow p-4 flex flex-col gap-3" style={{ overflowY: 'auto', backgroundColor: '#F8FAFC' }}>
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`p-2 rounded-lg ${msg.role === 'assistant' ? 'bg-white shadow' : 'bg-blue-100 self-end'}`} style={{ maxWidth: '85%' }}>
                      <p style={{ fontSize: '0.9rem', margin: 0 }}>{msg.text}</p>
                    </div>
                  ))}
                  {isTyping && <div className="p-2 rounded-lg bg-white shadow" style={{ maxWidth: '85%' }}><p style={{ fontSize: '0.9rem', margin: 0 }}>Thinking...</p></div>}
              </div>
              <div className="p-2 flex gap-2" style={{ backgroundColor: '#fff', borderTop: '1px solid #E2E8F0' }}>
                <input 
                  type="text" 
                  className="input-field flex-grow" 
                  style={{ padding: '0.5rem', margin: 0 }} 
                  value={chatInput} 
                  onChange={e => setChatInput(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && handleAskSprout()}
                  placeholder="Ask for a hint!"
                />
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={handleAskSprout}>Ask</button>
              </div>
            </div>
          )}

          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="absolute bottom-4 right-4 shadow-xl font-bold"
            style={{ borderRadius: '999px', padding: '0.75rem 1.5rem', backgroundColor: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            {isChatOpen ? 'Close 🌱' : 'Ask Sprout 🌱'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CodePlayground;
