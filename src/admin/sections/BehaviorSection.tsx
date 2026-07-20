import { FormRow, Toggle, NumberInput, SelectInput } from '../components/FormControls';
import { useApp } from '@/store/AppContext';
import type { ActivitySelectionMode } from '@/types';
import './section.css';

const MODE_OPTIONS: { value: ActivitySelectionMode; label: string }[] = [
  { value: 'visitorChoice', label: 'Visitante escolhe' },
  { value: 'random', label: 'Sorteio aleatório' },
  { value: 'fixedOrder', label: 'Ordem fixa' }
];

export function BehaviorSection() {
  const { state, updateConfig } = useApp();
  const config = state.config;

  const patch = (changes: Partial<typeof config>) => updateConfig({ ...config, ...changes });

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h1>Comportamento</h1>
        <p>Como o totem se comporta durante o uso.</p>
      </div>

      <div className="admin-card">
        <h2>Fluxo</h2>
        <FormRow label="Como escolher a atividade">
          <SelectInput value={config.activitySelectionMode} onChange={(v) => patch({ activitySelectionMode: v })} options={MODE_OPTIONS} />
        </FormRow>
        <FormRow label="Perguntas no Quiz Relâmpago" hint="Sorteadas de um banco de 10 — quanto menor, mais variação entre rodadas">
          <NumberInput value={config.quizQuestionCount} min={2} max={10} onChange={(v) => patch({ quizQuestionCount: v })} />
        </FormRow>
        <FormRow label="Situações na Casa Eficiente" hint="Sorteadas de um banco de 10 — quanto menor, mais variação entre rodadas">
          <NumberInput value={config.scenarioCaseCount} min={2} max={10} onChange={(v) => patch({ scenarioCaseCount: v })} />
        </FormRow>
      </div>

      <div className="admin-card">
        <h2>Inatividade</h2>
        <FormRow label="Voltar para a tela inicial após" hint="Tempo sem toques até reiniciar a sessão">
          <NumberInput value={config.idleTimeoutSeconds} min={15} max={180} step={5} suffix="segundos" onChange={(v) => patch({ idleTimeoutSeconds: v })} />
        </FormRow>
      </div>

      <div className="admin-card">
        <h2>Tempo por atividade</h2>
        <FormRow label="Limite de tempo, em múltiplos do tempo estimado" hint="Gestão de fila do evento — cada atividade tem seu próprio tempo estimado (ex: ~1min, ~3min), e o limite real é esse valor multiplicado. Passado o limite, a tela avisa e volta pro início; um anel de contagem regressiva no canto fica cada vez mais chamativo conforme o tempo acaba">
          <NumberInput value={config.activityTimeLimitMultiplier} min={1.5} max={4} step={0.5} suffix="x o tempo estimado" onChange={(v) => patch({ activityTimeLimitMultiplier: v })} />
        </FormRow>
      </div>

      <div className="admin-card">
        <h2>Sons e animações</h2>
        <FormRow label="Sons de interface">
          <Toggle checked={config.soundEnabled} onChange={(v) => patch({ soundEnabled: v })} />
        </FormRow>
        <FormRow label="Animações mais intensas" hint="Confete, brilho e pulsos de destaque">
          <Toggle checked={config.intenseAnimationsEnabled} onChange={(v) => patch({ intenseAnimationsEnabled: v })} />
        </FormRow>
        <FormRow label="Movimento reduzido" hint="Recomendado para acessibilidade sensível a movimento">
          <Toggle checked={config.reducedMotion} onChange={(v) => patch({ reducedMotion: v })} />
        </FormRow>
      </div>
    </div>
  );
}
