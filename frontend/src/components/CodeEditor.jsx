import { useState, Suspense, lazy } from 'react';
const MonacoEditor = lazy(() => import('@monaco-editor/react'));

const TABS = [
  { key: 'html', label: 'HTML', language: 'html' },
  { key: 'css',  label: 'CSS',  language: 'css' },
  { key: 'js',   label: 'JS',   language: 'javascript' },
];

const MONACO_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 12,
  lineHeight: 20,
  fontFamily: "'Fira Code', 'SF Mono', monospace",
  fontLigatures: true,
  wordWrap: 'on',
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  padding: { top: 12, bottom: 12 },
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: 'on',
  scrollbar: { verticalScrollbarSize: 4, horizontalScrollbarSize: 4 },
};

export default function CodeEditor({ value, onChange, readOnly = false }) {
  const [activeTab, setActiveTab] = useState('html');

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex items-center border-b border-shell-border bg-shell-input flex-shrink-0">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-xs font-medium transition-colors border-b-2 ${
              activeTab === tab.key
                ? 'text-accent-light border-accent'
                : 'text-shell-muted border-transparent hover:text-shell-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
        {readOnly && (
          <span className="ml-auto mr-3 text-2xs text-shell-muted bg-shell-border px-2 py-0.5 rounded">Read-only</span>
        )}
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center text-shell-muted text-xs">
            Loading editor…
          </div>
        }>
          {TABS.map(tab => (
            <div key={tab.key} className={`absolute inset-0 ${activeTab === tab.key ? 'block' : 'hidden'}`}>
              <MonacoEditor
                height="100%"
                language={tab.language}
                value={value[tab.key] || ''}
                onChange={v => !readOnly && onChange({ ...value, [tab.key]: v || '' })}
                theme="vs-dark"
                options={{ ...MONACO_OPTIONS, readOnly }}
                onMount={(editor, monaco) => {
                  // Match app color scheme
                  monaco.editor.defineTheme('prevalent-dark', {
                    base: 'vs-dark',
                    inherit: true,
                    rules: [
                      { token: '', foreground: 'D1D1D1', background: '131313' },
                      { token: 'comment', foreground: '696969', fontStyle: 'italic' },
                      { token: 'keyword', foreground: '8F8DDE' },
                      { token: 'string', foreground: '31A56D' },
                      { token: 'number', foreground: 'D98B1D' },
                    ],
                    colors: {
                      'editor.background': '#131313',
                      'editor.foreground': '#D1D1D1',
                      'editorLineNumber.foreground': '#3B3A3A',
                      'editorLineNumber.activeForeground': '#696969',
                      'editor.selectionBackground': '#6360D820',
                      'editor.lineHighlightBackground': '#1A1A1A',
                      'editorCursor.foreground': '#6360D8',
                      'editorIndentGuide.background': '#272727',
                    },
                  });
                  monaco.editor.setTheme('prevalent-dark');
                }}
              />
            </div>
          ))}
        </Suspense>
      </div>
    </div>
  );
}
