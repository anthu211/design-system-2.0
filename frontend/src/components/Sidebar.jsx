import { useEffect, useState } from 'react';
import { usePermissions } from '../hooks/usePermissions';
import * as api from '../utils/api';

export default function Sidebar({ collapsed, filters, onFiltersChange, onNewComponent }) {
  const { can } = usePermissions();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => {});
    api.getTags().then(setTags).catch(() => {});
  }, []);

  if (collapsed) return null;

  function toggleTag(tag) {
    const current = filters.tag === tag ? '' : tag;
    onFiltersChange({ ...filters, tag: current });
  }

  return (
    <aside className="w-[220px] bg-shell-sidebar border-r border-shell-border flex flex-col flex-shrink-0 overflow-y-auto">
      {/* Search */}
      <div className="p-4 border-b border-shell-border">
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-shell-muted" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/>
          </svg>
          <input
            type="text"
            placeholder="Search components…"
            className="input pl-8 py-1.5 text-xs"
            value={filters.search || ''}
            onChange={e => onFiltersChange({ ...filters, search: e.target.value })}
          />
        </div>
      </div>

      {/* New component button */}
      {can('create') && (
        <div className="p-4 border-b border-shell-border">
          <button onClick={onNewComponent} className="btn-primary w-full justify-center text-xs">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 2v12M2 8h12"/>
            </svg>
            New Component
          </button>
        </div>
      )}

      {/* Categories */}
      <div className="p-4">
        <p className="label mb-2">Category</p>
        <button
          onClick={() => onFiltersChange({ ...filters, category: '' })}
          className={`w-full text-left px-2 py-1.5 rounded text-xs mb-0.5 transition-colors ${
            !filters.category ? 'bg-shell-active text-accent-light font-medium' : 'text-shell-muted hover:bg-shell-hover hover:text-shell-text'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onFiltersChange({ ...filters, category: cat })}
            className={`w-full text-left px-2 py-1.5 rounded text-xs mb-0.5 transition-colors ${
              filters.category === cat ? 'bg-shell-active text-accent-light font-medium border-l-2 border-accent' : 'text-shell-muted hover:bg-shell-hover hover:text-shell-text'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="p-4 border-t border-shell-border">
          <p className="label mb-2">Tags</p>
          <div className="flex flex-wrap gap-1">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-2 py-0.5 rounded text-2xs transition-colors ${
                  filters.tag === tag ? 'bg-accent text-white' : 'bg-shell-input text-shell-muted border border-shell-border hover:border-accent/50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sort */}
      <div className="p-4 border-t border-shell-border mt-auto">
        <p className="label mb-2">Sort by</p>
        <select
          className="input text-xs py-1"
          value={`${filters.sort || 'updated_at'}_${filters.order || 'desc'}`}
          onChange={e => {
            const [sort, order] = e.target.value.split('_');
            onFiltersChange({ ...filters, sort, order });
          }}
        >
          <option value="updated_at_desc">Last updated</option>
          <option value="created_at_desc">Newest first</option>
          <option value="name_asc">Name A–Z</option>
          <option value="name_desc">Name Z–A</option>
        </select>
      </div>
    </aside>
  );
}
