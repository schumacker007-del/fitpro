# FitPro 💪

App de academia completo — versão gratuita (free) + plano pago (Pro), feito em React Native + Expo,
para rodar no seu iPhone via Expo Go (e futuramente publicar na App Store).

## Funcionalidades

- **Onboarding do aluno**: peso, altura, idade e objetivo (perder peso, ganhar massa ou manter a forma).
- **Cálculo automático de IMC** a partir dos dados informados.
- **Treinos com animação demonstrativa** de como executar cada exercício (ilustração vetorial animada,
  sem depender de vídeos externos), com séries, repetições e tempo de descanso.
- **Mapa muscular (BodyMap)**: busca de exercícios por grupo muscular, com silhueta do corpo destacando
  a região trabalhada.
- **Checklist de postura e execução guiada (Pro)**: pontos-chave de postura/respiração/alinhamento e
  erros comuns a evitar em cada exercício.
- **Modo Treino Ativo (Pro)**: fluxo guiado por todo o treino, com timer de descanso (vibração + haptics
  ao final), contagem de séries e coleta de RPE (esforço percebido 1-10) ao final de cada exercício.
- **Progressão inteligente de carga (Pro)**: histórico de RPE com gráfico de evolução e sugestões
  automáticas ("aumente a carga" / "descanse mais") no Perfil e na tela de cada exercício.
- **Dietas por objetivo**: versão gratuita com orientação geral e versão Pro com plano semanal detalhado.
- **Responsável técnico**: seção com o educador físico responsável, credencial (CREF) — exibida também
  na ficha de cada treino — e disclaimer de que o app não substitui avaliação médica/profissional individual.
- **Biblioteca completa de exercícios (55 exercícios / 9 grupos musculares)**: peito, costas, ombros,
  bíceps, tríceps, quadríceps, posterior de coxa/glúteos, panturrilha e abdômen/core, com instruções,
  postura e erros comuns em cada um.
- **Montador de treino no app (Pro)**: o aluno (sozinho ou com o próprio professor da academia, sentado junto)
  monta o treino do jeito que quiser — escolhe exercícios da biblioteca completa por grupo muscular, define
  séries/repetições/descanso de cada um, nomeia, edita e exclui quando quiser. Quem preferir continua podendo
  usar os treinos prontos sugeridos automaticamente pelo app.
- **Treino sob medida via professor do FitPro (Pro)**: alternativa para quem não tem professor próprio — o
  aluno solicita uma ficha semanal ou mensal (objetivo, dias disponíveis, equipamentos e restrições/lesões),
  enviada direto pelo WhatsApp para o professor responsável do FitPro montar manualmente.
- **Plano Free x Pro (paywall)**: tela comparando os dois planos, com assinatura mensal/anual
  (atualmente **simulada** — ver seção "Pagamentos" abaixo).

> Fora do escopo (por decisão de produto): gravação/armazenamento de vídeo do usuário, para evitar alto
> consumo de armazenamento, complexidade de permissões de câmera e riscos jurídicos de dados sensíveis.

## Como rodar no seu iPhone

Este app é **somente para celular** (iOS/Android). **Não use navegador** — o FitPro não funciona na web.

1. Instale o app **Expo Go** na App Store do seu iPhone.
2. No computador, dentro da pasta do projeto:
   ```bash
   npm install
   npm start
   ```
3. No terminal aparece um **QR code** — escaneie com a câmera do iPhone ou com o Expo Go.
4. O app abre **dentro do Expo Go** no celular.

**Não clique** em links `http://localhost:...` no navegador e **ignore** a linha `w │ open web` no terminal (ela fica desativada de propósito).

Também funciona no simulador iOS (`npm run ios`, requer Xcode instalado).

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
