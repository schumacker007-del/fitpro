# Vídeos GuiFit — importação gradual

Substituímos vídeos **um a um** (ou por grupo). Os antigos com nome errado ficam até você mandar o correto.

## Convenção de arquivo (novo padrão)

Nome do arquivo = **ID do exercício** na biblioteca:

```
assets/videos/guifit/e-lib-peito-supino-reto-com-barra.mp4
```

O ID aparece no app em `exerciseLibrary` / ao abrir o exercício (ex.: `e-lib-peito-...`).

## Como mandar para o assistente

Exemplo de mensagem:

```
Peito — substituir:
- e-lib-peito-supino-reto-com-barra → arquivo em assets/staging/peito/supino.mp4
- e-lib-peito-flexao-de-bracos → ...
```

Ou coloque os `.mp4` numa pasta no projeto (ex. `assets/staging/peito/`) e indique o ID de cada um.

## Comandos (local)

```bash
# Um vídeo
npm run guifit:add -- e-lib-peito-supino-reto-com-barra ./meu-video.mp4

# Só regenerar mapa após copiar arquivos manualmente
npm run guifit:sync
```

## Ao substituir um vídeo errado

1. Adicionar o novo com nome `e-lib-....mp4`
2. **Apagar** o `.mp4` numérico antigo (ex. `278.mp4`) se existir
3. `npm run guifit:sync`

O mapa ignora arquivos que não existem mais.

## Sem vídeo para um exercício

O app usa **pose animada** (JPEG leve) — não quebra.

## Próximo build

Depois de trocar vídeos, novo IPA só quando quiser:

```bash
npm run eas:build:ios:prod
npx eas-cli submit --platform ios --latest
```
