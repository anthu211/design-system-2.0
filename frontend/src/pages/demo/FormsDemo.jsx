import { DropdownDemo } from '../../components/ui/Dropdown';
import { RadioGroupDemo } from '../../components/ui/RadioGroup';
import { CheckboxDemo } from '../../components/ui/Checkbox';
import { InputDemo } from '../../components/ui/Input';
import { TextareaDemo } from '../../components/ui/Textarea';

function Section({ title, description, children }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#282828', margin: 0 }}>{title}</h2>
        {description && <p style={{ fontSize: '13px', color: '#9f9f9f', marginTop: 4, marginBottom: 0 }}>{description}</p>}
      </div>
      <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: 24 }}>
        {children}
      </div>
    </section>
  );
}

export default function FormsDemo() {
  return (
    <div style={{ padding: '32px', fontFamily: 'Inter, sans-serif', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#282828', margin: 0 }}>Form Controls</h1>
          <p style={{ fontSize: '14px', color: '#9f9f9f', marginTop: 6 }}>
            All form inputs and controls from the Prevalent AI design system.
          </p>
        </div>

        <Section title="Input" description="Text, email, password, search, with prefix/suffix and character count.">
          <InputDemo />
        </Section>

        <Section title="Textarea" description="Multi-line input with auto-resize and character count.">
          <TextareaDemo />
        </Section>

        <Section title="Dropdown" description="Single select, searchable, and multi-select variants.">
          <DropdownDemo />
        </Section>

        <Section title="RadioGroup" description="Vertical and horizontal layouts, sm/md sizes.">
          <RadioGroupDemo />
        </Section>

        <Section title="Checkbox" description="Checked, unchecked, indeterminate states, sm/md sizes.">
          <CheckboxDemo />
        </Section>
      </div>
    </div>
  );
}
