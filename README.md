# FitPro 💪

App de academia completo — versão gratuita (free) + plano pago (Pro), feito em React Native + Expo,
para rodar no seu iPhone via Expo Go (e futuramente publicar na App Store).

## Funcionalidades

- **Onboarding do aluno**: peso, altura, idade e objetivo (perder peso, ganhar massa ou manter a forma).
- **Cálculo automático de IMC** a partir dos dados informados.
- **Treinos com animação demonstrativa** de como executar cada exercício (ilustração vetorial animada,
  sem depender de vídeos externos), com séries, repetições e tempo de descanso.
- **Dietas por objetivo**: versão gratuita com orientação geral e versão Pro com plano semanal detalhado.
- **Responsável técnico**: seção com o educador físico responsável, credencial (CREF) e disclaimer de
  que o app não substitui avaliação médica/profissional individual.
- **Plano Free x Pro (paywall)**: tela comparando os dois planos, com assinatura mensal/anual
  (atualmente **simulada** — ver seção "Pagamentos" abaixo).

## Como rodar no seu iPhone

1. Instale o app **Expo Go** na App Store do seu iPhone.
2. No computador, dentro da pasta do projeto:
   ```bash
   npm install
   npx expo start
   ```
3. Um QR code e uma URL `exp://...` vão aparecer no terminal.
4. Certifique-se de que o iPhone está **na mesma rede Wi-Fi** do computador.
5. Abra a câmera do iPhone (ou o app Expo Go) e escaneie o QR code — o app abre direto no seu iPhone.

Também funciona no simulador iOS (`npm run ios`, requer Xcode instalado) ou no navegador (`npm run web`,
requer `npx expo install react-dom react-native-web`).

## Estrutura do projeto

```
src/
  context/UserContext.tsx     # perfil do usuário + plano (free/pro), persistido localmente
  data/                       # treinos, dietas e dados do responsável técnico
  components/                 # UI reutilizável + animação de exercícios
  screens/                    # todas as telas do app
  navigation/                 # tabs + stacks (Treinos, Perfil/Paywall)
  theme/                      # cores, espaçamento, tipografia
```

## Próximos passos sugeridos

- **Pagamentos reais**: integrar `react-native-purchases` (RevenueCat) ou `expo-in-app-purchases`/StoreKit
  para processar a assinatura Pro de verdade na App Store. Hoje o botão "Assinar" apenas simula a compra
  localmente (`UserContext.upgradeToPro`).
- **Conta em nuvem**: hoje os dados ficam só no aparelho (AsyncStorage). Para sincronizar entre dispositivos
  e permitir login, integrar Firebase ou Supabase.
- **Mais treinos/dietas**: os dados ficam em `src/data/workouts.ts` e `src/data/diets.ts` — é só adicionar
  novos itens seguindo o mesmo formato.
- **Publicar na App Store**: usar `eas build` (Expo Application Services) para gerar o build assinado.

## Observação sobre Git

Este ambiente não tem as **Ferramentas de Linha de Comando do Xcode** instaladas, então não foi possível
rodar `git init` automaticamente (o `git` do macOS depende delas). Para versionar o projeto, rode no seu
terminal:

```bash
xcode-select --install   # instala as Command Line Tools (não precisa do Xcode completo)
cd ~/Projects/fitpro
git init && git add -A && git commit -m "Initial commit: FitPro app"
```
