/**
 * Gera páginas HTML estáticas para fitpro.app/privacidade e fitpro.app/termos.
 * Fonte: src/data/legalContent.ts (PT-BR). Re-run após alterar textos legais.
 *
 * Uso: node scripts/generate-legal-web.mjs
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'docs');

const PRIVACY_CONTACT_EMAIL = 'privacidade@fitpro.app';

const privacy = {
  title: 'Política de Privacidade',
  lastUpdated: '26 de julho de 2026',
  sections: [
    {
      title: '1. Introdução',
      paragraphs: [
        'O FitPro ("nós", "nosso" ou "aplicativo") respeita sua privacidade. Esta Política de Privacidade descreve quais dados são tratados quando você usa o aplicativo FitPro, como esses dados são utilizados e quais são seus direitos.',
        'Ao utilizar o FitPro, você concorda com as práticas descritas neste documento. Recomendamos a leitura integral antes de criar uma conta ou fornecer informações pessoais.',
      ],
    },
    {
      title: '2. Dados que coletamos',
      paragraphs: [
        'Dados de perfil: nome, peso, altura, idade, sexo, objetivo de treino, nível de condicionamento, frequência de atividade, lesões declaradas e motivações informadas durante o onboarding.',
        'Dados de autenticação: ao entrar com Google, Apple ou Facebook, recebemos identificador da conta, endereço de e-mail (quando disponibilizado pelo provedor) e nome, conforme autorizado por você no fluxo de login social.',
        'Registros de treino: exercícios realizados, cargas, repetições, esforço percebido (RPE), datas e demais informações registradas no Modo Treino Ativo.',
        'Fotos de evolução: imagens que você captura ou seleciona da galeria para acompanhar sua evolução física.',
        'Documentos de saúde: fotos, vídeos e arquivos PDF de exames, receitas, laudos e demais registros médicos que você optar por anexar.',
        'Conteúdo da comunidade: publicações, legendas, comentários e reações no feed de treinos, quando você utiliza esses recursos.',
        'Mensagens: textos enviados pelo hub de mensagens do aplicativo, armazenados localmente no seu dispositivo.',
        'Dados de gamificação: sequências de treino e dieta, conquistas e atividades diárias registradas no app.',
        'Preferências: idioma selecionado e status de assinatura ou acesso a conteúdos premium.',
      ],
    },
    {
      title: '3. Como utilizamos os dados',
      paragraphs: [
        'Utilizamos seus dados exclusivamente para operar e melhorar o FitPro: personalizar treinos e metas nutricionais, exibir seu progresso, gerar relatórios PDF, viabilizar comunicação com profissionais indicados no app e liberar funcionalidades conforme seu plano.',
        'Não utilizamos seus dados para publicidade comportamental de terceiros nem para perfilamento comercial externo ao serviço.',
      ],
    },
    {
      title: '4. Armazenamento local',
      paragraphs: [
        'Na versão atual do FitPro, a maior parte dos seus dados é armazenada apenas no seu dispositivo (armazenamento local), incluindo perfil, treinos, fotos, documentos médicos e mensagens.',
        'Não mantemos, nesta versão, um servidor centralizado com cópia completa dos seus dados de saúde ou treino. Isso significa que a exclusão do aplicativo ou a exclusão de conta remove os dados do dispositivo, salvo backups que você tenha criado por conta própria (por exemplo, exportação de PDF ou backup do sistema operacional).',
      ],
    },
    {
      title: '5. Compartilhamento e venda de dados',
      paragraphs: [
        'Não vendemos, alugamos nem comercializamos seus dados pessoais.',
        'Podemos compartilhar informações apenas quando você solicitar explicitamente (por exemplo, ao enviar um relatório por WhatsApp ou e-mail) ou quando exigido por lei, ordem judicial ou autoridade competente.',
        'Provedores de login social (Google, Apple, Facebook) processam dados conforme suas próprias políticas de privacidade durante a autenticação.',
      ],
    },
    {
      title: '6. Dados sensíveis de saúde',
      paragraphs: [
        'Documentos médicos, lesões declaradas e informações correlatas podem ser considerados dados sensíveis. Você decide quais informações inserir no aplicativo.',
        'O FitPro não substitui avaliação médica. Conteúdos educativos e sugestões de treino não constituem diagnóstico ou prescrição.',
      ],
    },
    {
      title: '7. Seus direitos',
      paragraphs: [
        'De acordo com a Lei Geral de Proteção de Dados (LGPD), você pode solicitar confirmação de tratamento, acesso, correção, portabilidade, anonimização, eliminação e informações sobre compartilhamento dos seus dados.',
        'No aplicativo, você pode excluir sua conta e todos os dados locais em Perfil → Configurações → "Excluir conta e dados".',
        'Para demais solicitações, entre em contato pelo e-mail indicado ao final desta política.',
      ],
    },
    {
      title: '8. Retenção e exclusão',
      paragraphs: [
        'Mantemos os dados enquanto você utilizar o aplicativo e eles permanecerem armazenados no dispositivo. Após exclusão da conta ou desinstalação, os dados locais são removidos do aparelho.',
        'Cópias em serviços de terceiros que você tenha utilizado para exportar conteúdo (mensageiros, e-mail, nuvem pessoal) permanecem sob sua responsabilidade.',
      ],
    },
    {
      title: '9. Segurança',
      paragraphs: [
        'Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados no dispositivo. Nenhum método de transmissão ou armazenamento é 100% seguro; recomendamos manter seu dispositivo atualizado e protegido por senha ou biometria.',
      ],
    },
    {
      title: '10. Alterações desta política',
      paragraphs: [
        'Podemos atualizar esta Política de Privacidade periodicamente. A data da última atualização será indicada no topo do documento. O uso continuado do aplicativo após alterações constitui aceitação da versão vigente.',
      ],
    },
    {
      title: '11. Contato',
      paragraphs: [
        `Encarregado de privacidade / contato LGPD: ${PRIVACY_CONTACT_EMAIL}`,
        'Responderemos solicitações no prazo legal aplicável.',
      ],
    },
  ],
};

const terms = {
  title: 'Termos de Uso',
  lastUpdated: '26 de julho de 2026',
  sections: [
    {
      title: '1. Aceitação dos termos',
      paragraphs: [
        'Estes Termos de Uso regem o acesso e a utilização do aplicativo FitPro. Ao criar uma conta, concluir o onboarding ou utilizar qualquer funcionalidade, você declara ter lido e aceito estes termos.',
        'Se você não concordar, não utilize o aplicativo.',
      ],
    },
    {
      title: '2. Descrição do serviço',
      paragraphs: [
        'O FitPro oferece conteúdos educativos e ferramentas de acompanhamento de treino, nutrição e evolução física, incluindo biblioteca de exercícios, receitas, relatórios e recursos premium conforme disponibilidade.',
        'O aplicativo é destinado a usuários interessados em condicionamento físico e bem-estar, sob orientação responsável de profissionais quando aplicável.',
      ],
    },
    {
      title: '3. Elegibilidade',
      paragraphs: [
        'Você deve ter capacidade legal para aceitar estes termos. Menores de 18 anos devem utilizar o aplicativo com consentimento e supervisão de responsável legal.',
        'Informações fornecidas devem ser verdadeiras e atualizadas.',
      ],
    },
    {
      title: '4. Conta e segurança',
      paragraphs: [
        'Você é responsável por manter a confidencialidade do acesso ao seu dispositivo e pelas atividades realizadas na sua conta.',
        'Login social é processado pelos respectivos provedores (Google, Apple, Facebook), sujeito aos termos de cada um.',
      ],
    },
    {
      title: '5. Assinaturas e compras',
      paragraphs: [
        'Funcionalidades Pro e conteúdos pagos podem exigir assinatura ou compra dentro do aplicativo, processada pela App Store da Apple ou loja equivalente.',
        'Preços, renovação, cancelamento e reembolsos seguem as regras da loja de aplicativos e informações exibidas no momento da compra.',
      ],
    },
    {
      title: '6. Conteúdo do usuário',
      paragraphs: [
        'Você mantém a titularidade sobre fotos, documentos, publicações e demais conteúdos que enviar ao FitPro.',
        'Ao inserir conteúdo, você declara possuir direitos necessários e que o material não viola direitos de terceiros nem leis aplicáveis.',
        'É proibido publicar conteúdo ilegal, ofensivo, discriminatório ou que incentive práticas perigosas sem supervisão adequada.',
      ],
    },
    {
      title: '7. Isenção de responsabilidade médica',
      paragraphs: [
        'O FitPro não substitui consulta médica, nutricional ou avaliação presencial por educador físico.',
        'Consulte um profissional de saúde antes de iniciar ou alterar rotinas de exercício, especialmente se possuir condições pré-existentes.',
        'Treinos, metas nutricionais e análises são informativos; a prática é de sua responsabilidade.',
      ],
    },
    {
      title: '8. Propriedade intelectual',
      paragraphs: [
        'Marcas, layout, textos, vídeos, ilustrações e software do FitPro são protegidos por direitos de propriedade intelectual. É vedada a reprodução não autorizada.',
      ],
    },
    {
      title: '9. Limitação de responsabilidade',
      paragraphs: [
        'Na extensão permitida pela lei, o FitPro não se responsabiliza por danos indiretos, lucros cessantes ou lesões resultantes do uso inadequado das informações do aplicativo.',
        'O serviço é fornecido "como está", sem garantias de resultados específicos de desempenho ou composição corporal.',
      ],
    },
    {
      title: '10. Encerramento',
      paragraphs: [
        'Você pode encerrar o uso a qualquer momento excluindo sua conta em Perfil → Configurações → "Excluir conta e dados".',
        'Podemos suspender ou encerrar o acesso em caso de violação destes termos ou uso fraudulento.',
      ],
    },
    {
      title: '11. Alterações',
      paragraphs: [
        'Podemos alterar estes Termos de Uso periodicamente. Alterações relevantes serão comunicadas no aplicativo ou na página oficial. O uso continuado após a vigência das mudanças implica aceitação.',
      ],
    },
    {
      title: '12. Contato',
      paragraphs: [`Dúvidas sobre estes termos: ${PRIVACY_CONTACT_EMAIL}`],
    },
  ],
};

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildPage({ title, lastUpdated, sections }, slug) {
  const otherLabel = slug === 'privacidade' ? 'Termos de Uso' : 'Política de Privacidade';
  const otherHref = slug === 'privacidade' ? '/termos/' : '/privacidade/';

  const body = sections
    .map((section) => {
      const paras = section.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n');
      return `<section><h2>${escapeHtml(section.title)}</h2>${paras}</section>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${escapeHtml(title)} — FitPro" />
  <title>${escapeHtml(title)} — FitPro</title>
  <style>
    :root { color-scheme: light dark; --bg: #0f1117; --text: #f8fafc; --muted: #94a3b8; --accent: #22c55e; --card: #1a1f2e; }
    @media (prefers-color-scheme: light) {
      :root { --bg: #f8fafc; --text: #0f172a; --muted: #64748b; --card: #fff; }
    }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
    header { padding: 1.5rem 1.25rem; border-bottom: 1px solid rgba(148,163,184,.2); }
    header a { color: var(--accent); text-decoration: none; font-weight: 700; }
    main { max-width: 720px; margin: 0 auto; padding: 1.5rem 1.25rem 3rem; }
    h1 { font-size: 1.75rem; margin: 0 0 .25rem; }
    .meta { color: var(--muted); font-size: .9rem; margin-bottom: 1.5rem; }
    nav { margin-bottom: 1.5rem; font-size: .9rem; }
    nav a { color: var(--accent); }
    section { margin-bottom: 1.5rem; }
    h2 { font-size: 1.05rem; margin: 0 0 .5rem; color: var(--accent); }
    p { margin: 0 0 .75rem; }
    footer { max-width: 720px; margin: 0 auto; padding: 1rem 1.25rem 2rem; color: var(--muted); font-size: .85rem; border-top: 1px solid rgba(148,163,184,.2); }
  </style>
</head>
<body>
  <header><a href="/">FitPro</a></header>
  <main>
    <h1>${escapeHtml(title)}</h1>
    <p class="meta">Última atualização: ${escapeHtml(lastUpdated)}</p>
    <nav><a href="${otherHref}">${escapeHtml(otherLabel)}</a></nav>
    ${body}
  </main>
  <footer>
    Contato: <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>
  </footer>
</body>
</html>`;
}

const indexHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FitPro</title>
  <style>
    :root { color-scheme: light dark; --bg: #0f1117; --text: #f8fafc; --muted: #94a3b8; --accent: #22c55e; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: var(--bg); color: var(--text); display: flex; min-height: 100vh; align-items: center; justify-content: center; padding: 2rem; }
    .box { max-width: 420px; text-align: center; }
    h1 { font-size: 2rem; margin: 0 0 .5rem; }
    p { color: var(--muted); margin: 0 0 1.5rem; }
    a { display: block; margin: .5rem 0; color: var(--accent); text-decoration: none; font-weight: 600; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="box">
    <h1>FitPro</h1>
    <p>Treino, nutrição e evolução física.</p>
    <a href="/privacidade/">Política de Privacidade</a>
    <a href="/termos/">Termos de Uso</a>
    <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>
  </div>
</body>
</html>`;

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('wrote', path.relative(ROOT, filePath));
}

write(path.join(OUT, 'index.html'), indexHtml);
write(path.join(OUT, 'privacidade', 'index.html'), buildPage(privacy, 'privacidade'));
write(path.join(OUT, 'termos', 'index.html'), buildPage(terms, 'termos'));
write(path.join(OUT, 'CNAME'), 'fitpro.app\n');
write(path.join(OUT, '.nojekyll'), '\n');

console.log('Done. Deploy docs/ via GitHub Pages → custom domain fitpro.app');
