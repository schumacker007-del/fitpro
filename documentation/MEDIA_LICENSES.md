# Licenças de mídia (FitPro)

Registro interno de **imagens, GIFs, vídeos e áudios** usados no app.  
Objetivo: em caso de dúvida (lojas, vendedor, parceiro), você consegue provar **compra + permissão de uso**.

> Isto não substitui assessoria jurídica. Use como checklist operacional.

---

## O que guardar em cada compra

| Item | Obrigatório | Onde salvar |
|------|-------------|-------------|
| Comprovante de pagamento (invoice, e-mail Wiapy, Pix) | Sim | `documentation/licenses/<pacote>/` |
| Termos de licença do produto (PDF ou print da página) | Sim | mesma pasta |
| Confirmação por escrito de **uso comercial em app** | Recomendado | e-mail exportado ou PDF |
| Lista de arquivos usados no FitPro | Sim | tabela abaixo + pasta do pack |
| Atribuição/crédito exigido pelo licenciante | Se houver | `documentation/MEDIA_LICENSES.md` + tela Sobre (se necessário) |

### Licença mínima aceitável para o FitPro

O documento deve permitir (ou o vendedor confirmar por escrito):

- [ ] Uso **comercial**
- [ ] Uso em **aplicativo móvel** (iOS / Android)
- [ ] **Redistribuição** do arquivo dentro do app (bundle do app)
- [ ] **Modificação** (cortar, converter GIF ↔ MP4, redimensionar) — se você for editar
- [ ] Sem limite absurdo de visualizações (ou saber qual é o limite)

Se faltar “app” ou “comercial”, **não publique em massa** até ter confirmação do vendedor.

---

## Pacotes cadastrados

### 1. Wiapy — 1.000 GIFs de Exercícios

| Campo | Valor |
|-------|--------|
| **Fornecedor** | Wiapy (intermediadora) |
| **Vendedor / contato** | luiscarlosferreiraoficial@gmail.com |
| **Produto** | 1.000 GIFs de Exercícios |
| **Valor** | R$ 47,00 |
| **Pagamento** | Pix |
| **ID pagamento** | `6a688b8e269f40d709fe8f95` |
| **Data compra** | 2026-07-28 (comprovante Wiapy) |
| **Comprovante** | [comprovante-wiapy-2026-07-28.png](licenses/wiapy-1000-gifs-exercicios/comprovante-wiapy-2026-07-28.png) |
| **Termos de licença** | ⏳ Pendente — baixar da página do produto / pedir ao vendedor |
| **Uso comercial em app** | ⏳ Pendente — confirmar por e-mail |
| **Atribuição obrigatória** | ⏳ Verificar nos termos |
| **Pasta local do pack** | (ZIP original após download) |

**Mensagem sugerida ao vendedor:**

> Comprei "1.000 GIFs de Exercícios" (pagamento `6a688b8e269f40d709fe8f95`).  
> Confirmem por favor: posso usar os GIFs no app **FitPro** (iOS/Android), comercial, com assinatura Pro, incluindo redistribuição no bundle do app e conversão para MP4 se necessário? Há obrigação de crédito?

---

## Arquivos do pack já usados no app

Atualize esta tabela sempre que importar um GIF/MP4 do pack para `assets/`.

| Arquivo no projeto | Origem (pack) | Uso no app | Data |
|--------------------|---------------|------------|------|
| `assets/videos/feed/treino-preview-2026-07-28.mp4` | Wiapy — 1.000 GIFs (teste / preview) | Feed de vídeos — destaque (`trainingVideoFeed.ts`, id `treino-preview-2026-07-28`) | 2026-07-28 |

---

## Template — novo pacote

Copie e preencha ao comprar outro pack:

```markdown
### N. [Nome do fornecedor] — [Nome do produto]

| Campo | Valor |
|-------|--------|
| **Fornecedor** | |
| **Vendedor / contato** | |
| **Produto** | |
| **Valor** | |
| **ID pedido / pagamento** | |
| **Data compra** | |
| **Comprovante** | licenses/.../arquivo.pdf |
| **Termos de licença** | |
| **Uso comercial em app** | Sim / Não / Pendente |
| **Atribuição obrigatória** | |
```

---

## Estrutura de pastas sugerida

```
documentation/
  MEDIA_LICENSES.md          ← este arquivo (índice)
  licenses/
    wiapy-1000-gifs-exercicios/
      comprovante-wiapy-2026-07-28.png
      termos-licenca.pdf       ← adicionar quando tiver
      email-confirmacao-app.pdf
```

**Não commitar** ZIPs enormes no git se não quiser — pode manter o pack no Drive/iCloud e só referenciar o caminho aqui.

---

## Mídia **não** vinda de pack licenciado

| Tipo | Regra |
|------|--------|
| Fotos de receitas / ingredientes enviadas por você | OK — conteúdo próprio |
| Vídeos de peito em `assets/videos/chest/` | Verificar origem de cada um |
| Splash / powerlifting | Verificar origem de cada um |

---

## Revisão periódica

- [ ] Antes de cada release na loja: todos os itens da tabela “Arquivos usados” têm licença ✅  
- [ ] Termos Wiapy preenchidos e arquivados  
- [ ] Créditos no app (se exigido)
