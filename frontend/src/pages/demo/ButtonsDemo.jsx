import { ButtonDemo } from '../../components/ui/Button';
import { DualToggleDemo } from '../../components/ui/DualToggle';
import { ToggleDemo } from '../../components/ui/Toggle';

export default function ButtonsDemo() {
  return (
    <div style={{ padding: '32px', fontFamily: 'Inter, sans-serif', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#282828', margin: 0 }}>Buttons & Toggles</h1>
          <p style={{ fontSize: '14px', color: '#9f9f9f', marginTop: 6 }}>
            All button types, sizes, and interaction states from the Prevalent AI design system.
          </p>
        </div>

        {/* Buttons grid */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#282828', marginBottom: 16 }}>Button (CTA)</h2>
          <ButtonDemo />
        </section>

        {/* Toggle */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#282828', marginBottom: 16 }}>Toggle Switch</h2>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: 24 }}>
            <ToggleDemo />
          </div>
        </section>

        {/* Dual Toggle */}
        <section>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#282828', marginBottom: 16 }}>Dual Toggle</h2>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: 24 }}>
            <DualToggleDemo />
          </div>
        </section>
      </div>
    </div>
  );
}
