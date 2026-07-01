import { useConfig } from '../../context/ConfigContext'
import AdminSection from './AdminSection'
import BigButton from '../common/BigButton'

export default function RankingSettings() {
  const { config, updateConfig, ranking, clearRanking } = useConfig()

  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja apagar todo o ranking? Essa ação não pode ser desfeita.')) {
      clearRanking()
    }
  }

  return (
    <AdminSection
      title="Ranking"
      description="Apenas apelidos e pontuação do quiz são salvos, sem dados pessoais."
    >
      <div className="admin-toggle-row">
        <div>
          <div className="admin-toggle-row__label">Ranking ativado</div>
          <div className="admin-toggle-row__hint">
            {ranking.length} apelido(s) registrado(s) até agora
          </div>
        </div>
        <button
          type="button"
          className={`admin-switch ${config.rankingEnabled ? 'admin-switch--on' : ''}`}
          onClick={() => updateConfig({ rankingEnabled: !config.rankingEnabled })}
          aria-label="Ativar ou desativar ranking"
        />
      </div>

      <BigButton variant="danger" onClick={handleClear} disabled={ranking.length === 0}>
        Limpar ranking
      </BigButton>
    </AdminSection>
  )
}
