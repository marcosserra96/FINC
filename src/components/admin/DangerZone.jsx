import { useConfig } from '../../context/ConfigContext'
import AdminSection from './AdminSection'
import BigButton from '../common/BigButton'

export default function DangerZone() {
  const { resetConfigAndQuiz } = useConfig()

  const handleReset = () => {
    if (
      window.confirm(
        'Restaurar as configurações e as perguntas do quiz para o padrão de fábrica? O ranking não será apagado.'
      )
    ) {
      resetConfigAndQuiz()
    }
  }

  return (
    <AdminSection
      title="Restaurar padrões"
      description="Restaura mensagem inicial, tempo de inatividade, PIN, atividades e perguntas do quiz para os valores originais."
    >
      <BigButton variant="danger" onClick={handleReset}>
        Resetar configurações para o padrão
      </BigButton>
    </AdminSection>
  )
}
