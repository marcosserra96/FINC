import { useState } from 'react';
import { FormRow, TextInput, TextAreaInput } from '../components/FormControls';
import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/store/AppContext';
import type { AppTexts } from '@/types';
import './section.css';

export function TextsSection() {
  const { state, updateConfig } = useApp();
  const [draft, setDraft] = useState(state.config);
  const [saved, setSaved] = useState(false);

  const setText = (key: keyof AppTexts, value: string) => {
    setDraft((d) => ({ ...d, texts: { ...d.texts, [key]: value } }));
    setSaved(false);
  };

  const save = () => {
    const cleanedCuriosities = draft.attractCuriosities.map((c) => c.trim()).filter(Boolean);
    updateConfig({ ...draft, attractCuriosities: cleanedCuriosities });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h1>Textos e mensagens</h1>
        <p>Tudo que o visitante lê na tela — ajuste sem precisar mexer em código.</p>
      </div>

      <div className="admin-card">
        <h2>Identificação</h2>
        <FormRow label="Nome do evento">
          <TextInput value={draft.eventName} onChange={(v) => { setDraft((d) => ({ ...d, eventName: v })); setSaved(false); }} />
        </FormRow>
      </div>

      <div className="admin-card">
        <h2>Tela de atração</h2>
        <FormRow label="Título" hint="Use quebra de linha para destacar a segunda linha">
          <TextAreaInput value={draft.texts.attractTitle} onChange={(v) => setText('attractTitle', v)} />
        </FormRow>
        <FormRow label="Chamada para tocar">
          <TextInput value={draft.texts.attractSubtitle} onChange={(v) => setText('attractSubtitle', v)} />
        </FormRow>
        <FormRow label="Curiosidades da vitrine" hint="Uma frase por linha — ficam se revezando no banner enquanto ninguém interage">
          <TextAreaInput
            value={draft.attractCuriosities.join('\n')}
            onChange={(v) => { setDraft((d) => ({ ...d, attractCuriosities: v.split('\n') })); setSaved(false); }}
            rows={8}
          />
        </FormRow>
      </div>

      <div className="admin-card">
        <h2>Seleção</h2>
        <FormRow label="Título da seleção de faixa etária">
          <TextInput value={draft.texts.ageSelectTitle} onChange={(v) => setText('ageSelectTitle', v)} />
        </FormRow>
        <FormRow label="Título da seleção de atividade">
          <TextInput value={draft.texts.activitySelectTitle} onChange={(v) => setText('activitySelectTitle', v)} />
        </FormRow>
      </div>

      <div className="admin-card">
        <h2>Tempo esgotado</h2>
        <FormRow label="Título" hint="Mostrado quando o limite de tempo da atividade (configurado em Comportamento) é atingido">
          <TextInput value={draft.texts.timeUpTitle} onChange={(v) => setText('timeUpTitle', v)} />
        </FormRow>
        <FormRow label="Mensagem">
          <TextAreaInput value={draft.texts.timeUpMessage} onChange={(v) => setText('timeUpMessage', v)} />
        </FormRow>
      </div>

      <div className="admin-card">
        <h2>Brindes e encerramento</h2>
        <FormRow label="Mensagem ao ganhar um brinde" hint="Aparece junto com o resultado, com confete — sem código, a equipe entrega na hora">
          <TextAreaInput value={draft.texts.giftWonMessage} onChange={(v) => setText('giftWonMessage', v)} />
        </FormRow>
        <FormRow label="Mensagem de encerramento">
          <TextInput value={draft.texts.closingMessage} onChange={(v) => setText('closingMessage', v)} />
        </FormRow>
      </div>

      <div className="admin-actions">
        <button type="button" className="admin-btn admin-btn--primary" onClick={save}>
          <Icon name="check" size={16} /> Salvar textos
        </button>
        {saved && <span className="admin-confirm">Salvo!</span>}
      </div>
    </div>
  );
}
