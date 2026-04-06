import React, { useState, useRef, useEffect } from 'react';
import { playSendSound, playReceiveSound } from '../utils/sounds';

const CodePlayground = ({ initialHtml = '', initialCss = '', initialJs = '' }) => {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [activeTab, setActiveTab] = useState(initialJs ? 'js' : (initialCss && !initialHtml ? 'css' : 'html'));

  // AI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: 'assistant', text: "Hi there! I'm Sprout 🌱 Ask me for a hint anytime!" }]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

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
    playSendSound();
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
      playReceiveSound();
      setChatMessages([...newMessages, { role: 'assistant', text: data.response || "Hmm, my brain feels fuzzy! Try asking again? 🤔" }]);
    } catch(e) {
      playReceiveSound();
      setChatMessages([...newMessages, { role: 'assistant', text: "Oops! I can't reach my AI brain right now. Make sure the worker is running! 🔌" }]);
    }
    setIsTyping(false);
  };

  const bubbleStyles = {
    assistant: {
      alignSelf: 'flex-start',
      backgroundColor: '#F0F0F0',
      color: '#1A1A2E',
      borderRadius: '18px 18px 18px 4px',
      padding: '10px 16px',
      maxWidth: '80%',
      fontSize: '0.9rem',
      lineHeight: '1.4',
      boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
    },
    user: {
      alignSelf: 'flex-end',
      background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
      color: '#fff',
      borderRadius: '18px 18px 4px 18px',
      padding: '10px 16px',
      maxWidth: '80%',
      fontSize: '0.9rem',
      lineHeight: '1.4',
      boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
    },
    typing: {
      alignSelf: 'flex-start',
      backgroundColor: '#F0F0F0',
      color: '#888',
      borderRadius: '18px 18px 18px 4px',
      padding: '10px 16px',
      maxWidth: '80%',
      fontSize: '0.9rem',
      fontStyle: 'italic',
      boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
    }
  };

  return (
    <div className="relative flex flex-col gap-4 animate-fade-in w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full" style={{ minHeight: '600px' }}>
        
        {/* Editor Panel */}
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

        {/* Preview Panel */}
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

          {/* ── Messenger-style Chat Overlay ── */}
          {isChatOpen && (
            <div style={{
              position: 'absolute',
              bottom: '70px',
              right: '16px',
              width: '320px',
              height: '420px',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
              border: '1px solid #E2E8F0',
              backgroundColor: '#fff',
              zIndex: 100,
              animation: 'fadeIn 0.25s ease',
            }}>
              {/* Header */}
              <div style={{
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                color: '#fff',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.2rem',
                  }}>🌱</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Sprout</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.85 }}>Your coding buddy</div>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} style={{
                  background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem',
                  cursor: 'pointer', padding: '4px',
                }}>✕</button>
              </div>

              {/* Messages Area */}
              <div style={{
                flexGrow: 1,
                overflowY: 'auto',
                padding: '16px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                backgroundColor: '#FAFAFA',
              }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} style={msg.role === 'user' ? bubbleStyles.user : bubbleStyles.assistant}>
                    {msg.text}
                  </div>
                ))}
                {isTyping && (
                  <div style={bubbleStyles.typing}>
                    <span style={{ letterSpacing: '3px' }}>●●●</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                borderTop: '1px solid #E8E8E8',
                backgroundColor: '#fff',
              }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAskSprout()}
                  placeholder="Ask for a hint..."
                  style={{
                    flex: 1,
                    border: '1px solid #E2E8F0',
                    borderRadius: '999px',
                    padding: '10px 16px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                />
                <button
                  onClick={handleAskSprout}
                  disabled={!chatInput.trim() || isTyping}
                  style={{
                    width: '38px', height: '38px',
                    borderRadius: '50%',
                    border: 'none',
                    background: chatInput.trim() ? 'linear-gradient(135deg, var(--primary), var(--primary-dark))' : '#E2E8F0',
                    color: chatInput.trim() ? '#fff' : '#aaa',
                    fontSize: '1.1rem',
                    cursor: chatInput.trim() ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                >
                  ➤
                </button>
              </div>
            </div>
          )}

          {/* FAB Toggle Button */}
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              border: 'none',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
              color: '#fff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(255,107,107,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              zIndex: 101,
            }}
            onMouseEnter={e => { e.target.style.transform = 'scale(1.1)'; e.target.style.boxShadow = '0 6px 20px rgba(255,107,107,0.5)'; }}
            onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 14px rgba(255,107,107,0.4)'; }}
          >
            {isChatOpen ? '✕' : '🌱'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
