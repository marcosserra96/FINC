import { FormRow, Toggle } from '../components/FormControls';
import { useApp } from '@/store/AppContext';
import './section.css';

export function GiftsSection() {
  const { state, updateConfig } = useApp();
  const { giftConfig } = state.config;

  const patchGift = (changes: Partial<typeof giftConfig>) =>
    updateConfig({ ...state.config, giftConfig: { ...giftConfig, ...changes } });

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h1>Brindes</h1>
        <p>Sem código nem estoque digital — a equipe acompanha o jogo ao vivo e entrega o brinde na hora, direto na tela de resultado.</p>
      </div>

      <div className="admin-card">
        <FormRow label="Brindes habilitados" hint="Vale para Quiz Relâmpago, Organize os Hábitos e Casa Eficiente (não a Memória da Energia), acertando pelo menos a porcentagem mínima configurada em Atividades">
          <Toggle checked={giftConfig.enabled} onChange={(v) => patchGift({ enabled: v })} />
        </FormRow>
      </div>
    </div>
  );
}
