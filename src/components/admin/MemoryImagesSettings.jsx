import { useConfig } from '../../context/ConfigContext'
import Icon from '../common/Icon'
import AdminSection from './AdminSection'
import { MEMORY_PAIRS } from '../../data/memoryCardsData'

const IMAGE_ACCEPT = '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp'
const IMAGE_MAX_BYTES = 1.5 * 1024 * 1024

export default function MemoryImagesSettings() {
  const { config, updateConfig } = useConfig()
  const images = config.memoryCardImages || {}

  const handleUpload = (icon, file) => {
    if (!file) return
    if (!/\.(jpe?g|png|webp)$/i.test(file.name) && !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      window.alert('Envie uma imagem JPG, PNG ou WEBP.')
      return
    }
    if (file.size > IMAGE_MAX_BYTES) {
      window.alert('Imagem muito grande. Envie uma foto de até 1,5MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => updateConfig({ memoryCardImages: { ...images, [icon]: reader.result } })
    reader.readAsDataURL(file)
  }

  const handleRemove = (icon) => {
    const next = { ...images }
    delete next[icon]
    updateConfig({ memoryCardImages: next })
  }

  return (
    <AdminSection
      title="Fotos do Jogo da Memória"
      description="Envie uma foto real para cada carta (JPG, PNG ou WEBP). Sem foto, a carta usa o ícone padrão."
    >
      <div className="admin-memory-grid">
        {MEMORY_PAIRS.map((pair) => (
          <div key={pair.icon} className="admin-memory-item">
            <div className="admin-memory-item__preview">
              {images[pair.icon] ? (
                <img src={images[pair.icon]} alt={pair.label} />
              ) : (
                <Icon name={pair.icon} size={28} />
              )}
            </div>
            <div className="admin-memory-item__info">
              <span className="admin-memory-item__label">{pair.label}</span>
              <div className="admin-memory-item__actions">
                <label className="admin-memory-item__upload">
                  Enviar foto
                  <input
                    type="file"
                    accept={IMAGE_ACCEPT}
                    hidden
                    onChange={(e) => {
                      handleUpload(pair.icon, e.target.files?.[0])
                      e.target.value = ''
                    }}
                  />
                </label>
                {images[pair.icon] && (
                  <button type="button" className="admin-memory-item__remove" onClick={() => handleRemove(pair.icon)}>
                    Remover
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminSection>
  )
}
