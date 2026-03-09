import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ComponentCard from '../components/ComponentCard';
import { useComponents } from '../hooks/useComponents';
import { usePermissions } from '../hooks/usePermissions';
import * as api from '../utils/api';
import toast from 'react-hot-toast';

export default function Dashboard({ sidebarCollapsed }) {
  const navigate = useNavigate();
  const { can } = usePermissions();
  const [filters, setFilters] = useState({ search: '', category: '', tag: '', sort: 'updated_at', order: 'desc' });
  const [deletingComp, setDeletingComp] = useState(null);
  const { components, loading, error, refetch } = useComponents(
    Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
  );

  async function handleNewComponent() {
    try {
      const comp = await api.createComponent({ name: 'Untitled Component', category: 'General', html: '<div class="component">New Component</div>', css: '.component { padding: 16px; }', js: '' });
      toast.success('Component created');
      navigate(`/components/${comp.id}/edit`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create component');
    }
  }

  async function handleDelete(comp) {
    if (deletingComp?.id !== comp.id) { setDeletingComp(comp); return; }
    try {
      await api.deleteComponent(comp.id);
      toast.success(`"${comp.name}" deleted`);
      setDeletingComp(null);
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Delete failed');
      setDeletingComp(null);
    }
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        collapsed={sidebarCollapsed}
        filters={filters}
        onFiltersChange={setFilters}
        onNewComponent={handleNewComponent}
      />

      <main className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-shell-text">Components</h1>
            <p className="text-xs text-shell-muted mt-1">
              {loading ? '…' : `${components.length} component${components.length !== 1 ? 's' : ''}`}
              {filters.category && ` in ${filters.category}`}
              {filters.search && ` matching "${filters.search}"`}
            </p>
          </div>
          {can('create') && (
            <button onClick={handleNewComponent} className="btn-primary">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 2v12M2 8h12"/>
              </svg>
              New Component
            </button>
          )}
        </div>

        {/* Delete confirm banner */}
        {deletingComp && (
          <div className="mb-4 p-3 bg-status-red/10 border border-status-red/30 rounded-lg flex items-center justify-between">
            <span className="text-sm text-status-red">Delete <strong>"{deletingComp.name}"</strong>? This cannot be undone.</span>
            <div className="flex gap-2">
              <button onClick={() => handleDelete(deletingComp)} className="btn-danger btn-sm">Confirm Delete</button>
              <button onClick={() => setDeletingComp(null)} className="btn btn-ghost btn-sm">Cancel</button>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="p-4 bg-status-red/10 border border-status-red/30 rounded-lg text-sm text-status-red">{error}</div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="card overflow-hidden">
                <div className="skeleton h-36" />
                <div className="p-4 space-y-2">
                  <div className="skeleton h-4 w-2/3 rounded" />
                  <div className="skeleton h-3 w-full rounded" />
                  <div className="skeleton h-3 w-3/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && components.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-shell-input flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none" stroke="#696969" strokeWidth="1.2">
                <rect x="2" y="4" width="12" height="8" rx="2"/><path d="M6 4V3a2 2 0 014 0v1"/>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-shell-text mb-1">No components found</h3>
            <p className="text-xs text-shell-muted mb-4">
              {filters.search || filters.category || filters.tag
                ? 'Try adjusting your filters'
                : 'Create your first component to get started'}
            </p>
            {can('create') && !filters.search && !filters.category && (
              <button onClick={handleNewComponent} className="btn-primary btn-sm">New Component</button>
            )}
          </div>
        )}

        {/* Grid */}
        {!loading && components.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {components.map(comp => (
              <ComponentCard key={comp.id} component={comp} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
