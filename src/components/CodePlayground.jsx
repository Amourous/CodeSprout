import React, { useState } from 'react';

const CodePlayground = ({ initialHtml = '', initialCss = '', initialJs = '' }) => {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [activeTab, setActiveTab] = useState(initialJs ? 'js' : (initialCss && !initialHtml ? 'css' : 'html'));

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

  return (
    <div className="flex flex-col gap-4 animate-fade-in w-full h-full">
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

        <div className="card flex flex-col" style={{ padding: '0', overflow: 'hidden', border: '4px solid var(--secondary)' }}>
          <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
            <h3 className="text-xl text-accent" style={{ color: 'var(--accent-dark)', fontWeight: 'bold' }}>Preview 👀</h3>
          </div>
          <iframe 
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts allow-modals"
            style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#fff', minHeight: '300px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
