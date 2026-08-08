# URLs legais — fitpro.app/privacidade e /termos

O app aponta para:

| URL | Uso |
|-----|-----|
| `https://fitpro.app/privacidade` | Política de Privacidade (App Store, app) |
| `https://fitpro.app/termos` | Termos de Uso |
| `privacidade@fitpro.app` | Contato LGPD |

Conteúdo espelha `src/data/legalContent.ts` (PT-BR).

## 1. Gerar páginas HTML

```bash
node scripts/generate-legal-web.mjs
```

Cria em `docs/`:

- `index.html` — landing com links
- `privacidade/index.html`
- `termos/index.html`
- `CNAME` → `fitpro.app`
- `.nojekyll` — evita Jekyll no GitHub Pages

## 2. Publicar com GitHub Pages

1. Commit e push da pasta `docs/` (só páginas legais + `.nojekyll` + `CNAME`; **não** subir secrets).
2. GitHub → repositório **fitpro** → **Settings** → **Pages**.
3. **Build and deployment** → Source: **Deploy from a branch**.
4. Branch: **main**, Folder: **/docs**.
5. **Custom domain**: `fitpro.app` (GitHub mostra instruções DNS).
6. Marque **Enforce HTTPS** quando disponível.

### DNS (registrador do domínio fitpro.app)

| Tipo | Nome | Valor |
|------|------|--------|
| **A** | `@` | `185.199.108.153` |
| **A** | `@` | `185.199.109.153` |
| **A** | `@` | `185.199.110.153` |
| **A** | `@` | `185.199.111.153` |
| **CNAME** | `www` | `schumacker007-del.github.io` |

(O GitHub pode mostrar valores atualizados na página Pages — use os que aparecem ali.)

Propagação DNS: até 24–48 h (geralmente minutos).

## 3. Testar

```bash
curl -I https://fitpro.app/privacidade/
curl -I https://fitpro.app/termos/
```

Abra no navegador — deve mostrar texto legal, não página de parking.

## 4. App Store Connect

Em **App Information**:

- **Privacy Policy URL**: `https://fitpro.app/privacidade`
- **Support URL**: `https://fitpro.app` ou e-mail de suporte

## 5. Manter sincronizado

Ao alterar textos em `src/data/legalContent.ts`:

1. Atualize também `scripts/generate-legal-web.mjs` (seções PT) **ou** estenda o script para ler o TS.
2. `node scripts/generate-legal-web.mjs`
3. Commit `docs/` e push.

## Alternativa sem GitHub Pages

Hospede o conteúdo de `docs/` em qualquer host (Netlify, Cloudflare Pages, cPanel) com domínio `fitpro.app` e paths `/privacidade/` e `/termos/`.
