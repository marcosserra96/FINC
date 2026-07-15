import type { ReactNode } from 'react';
import './FormControls.css';

export function FormRow({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="form-row">
      <div className="form-row__label">
        <span>{label}</span>
        {hint && <span className="form-row__hint">{hint}</span>}
      </div>
      <div className="form-row__control">{children}</div>
    </label>
  );
}

export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      className={`toggle${checked ? ' toggle--on' : ''}`}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span className="toggle__thumb" />
    </button>
  );
}

export function NumberInput({ value, onChange, min, max, step = 1, suffix }: { value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; suffix?: string }) {
  return (
    <div className="number-input">
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {suffix && <span className="number-input__suffix">{suffix}</span>}
    </div>
  );
}

export function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input className="text-input" type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />;
}

export function TextAreaInput({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return <textarea className="text-input" rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />;
}

export function SelectInput<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <select className="select-input" value={value} onChange={(e) => onChange(e.target.value as T)}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
