# Preços por região (FitPro)

Os valores **cobrados** vêm da App Store / Google Play (via RevenueCat). Os preços abaixo são a referência para configurar as lojas e os fallbacks do app (demo / sem loja).

## Tabela sugerida

| Produto | ID na loja | Brasil | EUA | Europa (EUR) |
|---------|------------|--------|-----|--------------|
| FitPro Pro — mensal | `fitpro_pro_monthly` | R$ 49,90 | US$ 9,99 | € 9,99 |
| FitPro Pro — anual | `fitpro_pro_yearly` | R$ 399,90 | US$ 79,99 | € 79,99 |
| Powerlifting Avançado (3 meses) | `fitpro_powerlifting_advanced` | R$ 99,90 | US$ 19,99 | € 19,99 |

### Economia do plano anual (referência BR)

- 12 × R$ 49,90 = R$ 598,80  
- Anual R$ 399,90 → **~33% de economia** (o app calcula isso automaticamente no badge)

## Como configurar nas lojas

### App Store Connect

1. Assinaturas / IAP → selecione o produto.
2. **Preços** → defina o preço base no Brasil.
3. Use **Preços equivalentes** para gerar sugestões nos EUA e Europa, ou ajuste país a país.
4. Revise antes de publicar — a Apple arredonda para tiers fixos (ex.: US$ 9,99, não US$ 9,47).

### Google Play Console

1. Monetização → produto/assinatura.
2. **Preços** → país base Brasil.
3. Ative **Conversão automática** ou edite manualmente EUA / zona euro.

### RevenueCat

Não define preço — apenas lê o que a loja retorna. Garanta que os product IDs batem com `src/config/iap.ts`.

## O que o app mostra

| Tela | Comportamento |
|------|----------------|
| Paywall Pro | `priceString` da loja + sufixo localizado (`/mês`, `/mo`, …) |
| Cards Premium | Mesma fonte (RevenueCat) |
| Powerlifting paywall | `priceString` da loja; duração em texto separado |
| Demo / sem API key | Fallback por idioma do app (BR → reais, EN → dólares, DE/FR/IT/ES/PT-PT → euros) |

Arquivos relevantes:

- `src/config/pricing.ts` — fallbacks por região
- `src/hooks/useStoreProductPrices.ts` — busca preços na loja
- `src/screens/PaywallScreen.tsx` — planos Pro
- `src/screens/PremiumWorkoutsScreen.tsx` — cards Premium

## Observações

- **Treino sob medida** e **Entenda seus exames** continuam como “Sob consulta” (não são IAP).
- Preços em R$ no código **não** são enviados para usuários fora do Brasil quando a loja está ativa — a loja localiza moeda e valor.
- Após mudar preços nas lojas, não é necessário novo build; o app já lê os valores atualizados.

Ver também: [IAP_SETUP.md](./IAP_SETUP.md)
