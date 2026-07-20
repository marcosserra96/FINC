# Imagens do jogo da memória

Coloque aqui os arquivos das ilustrações que devem aparecer nas cartas do
"Memória da Energia" no lugar dos ícones simples. Basta soltar os arquivos
com **exatamente estes nomes** — o app já está configurado pra usá-los
automaticamente, sem precisar mexer em código:

| Arquivo | Hábito |
|---|---|
| `bulb.png` | Lâmpada LED |
| `shower.png` | Chuveiro |
| `fan.png` | Ventilador |
| `fridge.png` | Geladeira |
| `tv.png` | Televisão |
| `window.png` | Luz natural |

## Recomendações

- **Formato:** PNG ou JPG.
- **Proporção:** retrato, próxima de 3:4 (ex: 900×1200px) — é a mesma
  proporção da carta. A imagem preenche o card inteiro (`object-fit: cover`),
  então partes muito próximas da borda podem ser cortadas.
- **Peso:** ideal manter cada arquivo abaixo de ~300KB (o totem carrega tudo
  localmente, sem depender de internet no evento — arquivos menores deixam
  o carregamento inicial mais rápido).
- **Estilo:** qualquer estilo funciona, mas fica mais coeso repetindo o
  mesmo estilo de ilustração nas 6 imagens (o mesmo artista/gerador, cores
  parecidas etc.).

## Como funciona

- Se um arquivo não existir ainda, aquela carta simplesmente continua
  mostrando o ícone colorido normal — nada quebra.
- Assim que você adicionar um arquivo com o nome certo aqui, ele passa a
  aparecer automaticamente na próxima vez que o app carregar (nenhuma
  mudança de código necessária).
- Pode adicionar só algumas imagens por enquanto — as demais continuam no
  ícone até você completar o conjunto.
