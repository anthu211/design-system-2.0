import { exportComponentAsZip } from '../utils/exportUtils';
import toast from 'react-hot-toast';

export default function ExportModal({ component, onClose }) {
  async function handleExport() {
    try {
      await exportComponentAsZip(component);
      toast.success('ZIP downloaded');
      onClose();
    } catch {
      toast.error('Export failed');
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="card w-full max-w-md shadow-modal">
        <div className="flex items-center justify-between p-5 border-b border-shell-border">
          <h2 className="text-md font-semibold text-shell-text">Export Component</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-shell-hover text-shell-muted">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 2l12 12M14 2L2 14"/>
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-sm text-shell-muted">
            Export <strong className="text-shell-text">{component.name}</strong> as a ZIP archive containing:
          </p>
          <ul className="space-y-1.5">
            {[
              ['index.html', 'Standalone page with embedded CSS & JS'],
              ['style.css',  'Component stylesheet'],
              ['script.js',  'Component JavaScript'],
              ['README.md',  'Usage documentation'],
            ].map(([file, desc]) => (
              <li key={file} className="flex items-start gap-2">
                <span className="font-mono text-xs text-accent-light bg-accent-muted px-1.5 py-0.5 rounded flex-shrink-0">{file}</span>
                <span className="text-xs text-shell-muted">{desc}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end gap-2 p-5 border-t border-shell-border">
          <button onClick={onClose} className="btn btn-ghost">Cancel</button>
          <button onClick={handleExport} className="btn-primary">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 2v8M5 8l3 3 3-3M2 13h12"/>
            </svg>
            Download ZIP
          </button>
        </div>
      </div>
    </div>
  );
}
