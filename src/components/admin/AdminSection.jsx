import './AdminSection.css'

export default function AdminSection({ title, description, children }) {
  return (
    <section className="admin-section">
      <header className="admin-section__header">
        <h2 className="admin-section__title">{title}</h2>
        {description && <p className="admin-section__description">{description}</p>}
      </header>
      <div className="admin-section__body">{children}</div>
    </section>
  )
}
