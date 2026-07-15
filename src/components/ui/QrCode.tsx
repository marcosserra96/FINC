import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QrCodeProps {
  value: string;
  size?: number;
}

export function QrCode({ value, size = 180 }: QrCodeProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(value, {
      width: size,
      margin: 1,
      color: { dark: '#005061', light: '#ffffff' }
    })
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch(() => setDataUrl(null));
    return () => {
      cancelled = true;
    };
  }, [value, size]);

  if (!dataUrl) {
    return <div style={{ width: size, height: size, background: '#fff', borderRadius: 12 }} />;
  }

  return <img src={dataUrl} alt={`QR Code de conclusão: ${value}`} width={size} height={size} style={{ borderRadius: 12 }} />;
}
