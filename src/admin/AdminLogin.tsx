import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { authenticate } from '@/services/adminAuth';
import './AdminLogin.css';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'ok'];

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleKey = (key: string) => {
    setError(false);
    if (key === 'clear') {
      setPin('');
      return;
    }
    if (key === 'ok') {
      if (authenticate(pin)) {
        onSuccess();
      } else {
        setError(true);
        setPin('');
      }
      return;
    }
    if (pin.length < 6) setPin((p) => p + key);
  };

  return (
    <div className="admin-login" data-allow-selection="true">
      <button type="button" className="admin-login__back" onClick={() => navigate('/')}>
        <Icon name="chevronLeft" size={18} /> Voltar ao painel público
      </button>

      <div className="admin-login__card">
        <Icon name="shield" size={36} />
        <h1>Acesso da equipe</h1>
        <p>Digite o PIN administrativo</p>

        <div className={`admin-login__dots${error ? ' admin-login__dots--error' : ''}`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={i < pin.length ? 'admin-login__dot admin-login__dot--filled' : 'admin-login__dot'} />
          ))}
        </div>
        {error && <p className="admin-login__error">PIN incorreto, tente novamente.</p>}

        <div className="admin-login__keypad">
          {KEYS.map((key) => (
            <button
              key={key}
              type="button"
              className="admin-login__key"
              onClick={() => handleKey(key)}
            >
              {key === 'clear' ? <Icon name="close" size={20} /> : key === 'ok' ? <Icon name="check" size={20} /> : key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
