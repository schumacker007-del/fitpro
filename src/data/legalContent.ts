import { AppLocale, getLocaleChain } from '../i18n/types';
import { PRIVACY_CONTACT_EMAIL } from '../config/legal';

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface LegalDocumentContent {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const PRIVACY_PT: LegalDocumentContent = {
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
        'Preferências: idioma selecionado e status de assinatura ou acesso a conteúdos premium demonstrativos.',
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

const PRIVACY_EN: LegalDocumentContent = {
  title: 'Privacy Policy',
  lastUpdated: 'July 26, 2026',
  sections: [
    {
      title: '1. Introduction',
      paragraphs: [
        'FitPro ("we", "our", or "the app") respects your privacy. This Privacy Policy explains what data is processed when you use FitPro, how it is used, and your rights.',
        'By using FitPro, you agree to the practices described here. Please read this document before creating an account or providing personal information.',
      ],
    },
    {
      title: '2. Data we collect',
      paragraphs: [
        'Profile data: name, weight, height, age, gender, training goal, fitness level, activity frequency, declared injuries, and motivations provided during onboarding.',
        'Authentication data: when you sign in with Google, Apple, or Facebook, we receive an account identifier, email address (when provided by the provider), and name, as authorized by you.',
        'Training logs: exercises, loads, reps, perceived exertion (RPE), dates, and other data logged in Active Workout mode.',
        'Progress photos: images you capture or select from the gallery.',
        'Health documents: photos, videos, and PDF files of exams, prescriptions, and medical records you choose to attach.',
        'Community content: posts, captions, comments, and reactions in the training feed.',
        'Messages: texts sent through the in-app messaging hub, stored locally on your device.',
        'Gamification data: workout and diet streaks, badges, and daily activity.',
        'Preferences: selected language and subscription or premium access status.',
      ],
    },
    {
      title: '3. How we use data',
      paragraphs: [
        'We use your data solely to operate and improve FitPro: personalize workouts and nutrition targets, show your progress, generate PDF reports, enable communication with professionals listed in the app, and unlock features according to your plan.',
        'We do not use your data for third-party behavioral advertising or external commercial profiling.',
      ],
    },
    {
      title: '4. Local storage',
      paragraphs: [
        'In the current version of FitPro, most of your data is stored only on your device, including profile, workouts, photos, medical documents, and messages.',
        'We do not maintain a centralized server with a full copy of your health or training data in this version. Deleting the app or your account removes data from the device, except backups you create yourself.',
      ],
    },
    {
      title: '5. Sharing and sale of data',
      paragraphs: [
        'We do not sell, rent, or trade your personal data.',
        'We may share information only when you explicitly request it (for example, when sending a report via WhatsApp or email) or when required by law.',
        'Social login providers (Google, Apple, Facebook) process data under their own privacy policies during authentication.',
      ],
    },
    {
      title: '6. Sensitive health data',
      paragraphs: [
        'Medical documents, declared injuries, and related information may be considered sensitive data. You decide what to enter in the app.',
        'FitPro does not replace medical evaluation. Educational content and training suggestions are not diagnosis or prescription.',
      ],
    },
    {
      title: '7. Your rights',
      paragraphs: [
        'Under applicable data protection laws (including Brazil\'s LGPD), you may request confirmation of processing, access, correction, portability, anonymization, deletion, and information about sharing.',
        'In the app, you can delete your account and all local data under Profile → Settings → "Delete account and data".',
        `For other requests, contact us at ${PRIVACY_CONTACT_EMAIL}.`,
      ],
    },
    {
      title: '8. Retention and deletion',
      paragraphs: [
        'We retain data while you use the app and it remains stored on the device. After account deletion or uninstallation, local data is removed from the device.',
        'Copies in third-party services you used to export content remain your responsibility.',
      ],
    },
    {
      title: '9. Security',
      paragraphs: [
        'We adopt reasonable technical and organizational measures to protect data on the device. No method is 100% secure; keep your device updated and protected with a passcode or biometrics.',
      ],
    },
    {
      title: '10. Changes',
      paragraphs: [
        'We may update this Privacy Policy periodically. The last updated date appears at the top. Continued use after changes constitutes acceptance of the current version.',
      ],
    },
    {
      title: '11. Contact',
      paragraphs: [`Privacy contact: ${PRIVACY_CONTACT_EMAIL}`],
    },
  ],
};

const PRIVACY_ES: LegalDocumentContent = {
  title: 'Política de Privacidad',
  lastUpdated: '26 de julio de 2026',
  sections: PRIVACY_EN.sections.map((section, index) => ({
    title: PRIVACY_PT.sections[index]?.title ?? section.title,
    paragraphs:
      index === 0
        ? [
            'FitPro ("nosotros" o "la aplicación") respeta su privacidad. Esta Política de Privacidad describe qué datos se tratan cuando usa FitPro, cómo se utilizan y cuáles son sus derechos.',
            'Al utilizar FitPro, usted acepta las prácticas descritas en este documento.',
          ]
        : index === 1
          ? [
              'Datos de perfil: nombre, peso, altura, edad, sexo, objetivo de entrenamiento, nivel de condición física, frecuencia de actividad, lesiones declaradas y motivaciones del onboarding.',
              'Datos de autenticación: al iniciar sesión con Google, Apple o Facebook, recibimos identificador de cuenta, correo electrónico (cuando el proveedor lo proporciona) y nombre.',
              'Registros de entrenamiento, fotos de progreso, documentos de salud, contenido de la comunidad, mensajes, gamificación y preferencias de idioma y plan.',
            ]
          : section.paragraphs,
  })),
};

const TERMS_PT: LegalDocumentContent = {
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
        'Funcionalidades Pro e conteúdos pagos podem exigir assinatura ou compra dentro do aplicativo, processada pela App Store da Apple ou loja equivalente, conforme disponibilização futura.',
        'Preços, renovação, cancelamento e reembolsos seguirão as regras da loja de aplicativos e informações exibidas no momento da compra.',
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

const TERMS_EN: LegalDocumentContent = {
  title: 'Terms of Use',
  lastUpdated: 'July 26, 2026',
  sections: [
    {
      title: '1. Acceptance',
      paragraphs: [
        'These Terms of Use govern access to and use of the FitPro app. By creating an account, completing onboarding, or using any feature, you agree to these terms.',
        'If you do not agree, do not use the app.',
      ],
    },
    {
      title: '2. Service description',
      paragraphs: [
        'FitPro provides educational content and tools for training, nutrition, and physical progress tracking, including exercise libraries, recipes, reports, and premium features as available.',
      ],
    },
    {
      title: '3. Eligibility',
      paragraphs: [
        'You must have legal capacity to accept these terms. Users under 18 should use the app with parental consent and supervision.',
        'Information provided must be accurate and kept up to date.',
      ],
    },
    {
      title: '4. Account and security',
      paragraphs: [
        'You are responsible for securing your device and for activity under your account.',
        'Social login is processed by the respective providers (Google, Apple, Facebook) under their own terms.',
      ],
    },
    {
      title: '5. Subscriptions and purchases',
      paragraphs: [
        'Pro features and paid content may require a subscription or in-app purchase processed through the Apple App Store or equivalent store when available.',
        'Pricing, renewal, cancellation, and refunds follow the app store rules and information shown at purchase time.',
      ],
    },
    {
      title: '6. User content',
      paragraphs: [
        'You retain ownership of photos, documents, posts, and other content you submit to FitPro.',
        'By submitting content, you represent that you have the necessary rights and that the material does not violate third-party rights or applicable laws.',
        'Illegal, offensive, discriminatory, or dangerous content without proper supervision is prohibited.',
      ],
    },
    {
      title: '7. Medical disclaimer',
      paragraphs: [
        'FitPro does not replace medical, nutritional, or in-person evaluation by a qualified professional.',
        'Consult a healthcare provider before starting or changing exercise routines, especially with pre-existing conditions.',
      ],
    },
    {
      title: '8. Intellectual property',
      paragraphs: [
        'FitPro trademarks, layout, text, videos, illustrations, and software are protected. Unauthorized reproduction is prohibited.',
      ],
    },
    {
      title: '9. Limitation of liability',
      paragraphs: [
        'To the extent permitted by law, FitPro is not liable for indirect damages, lost profits, or injuries from improper use of app information.',
        'The service is provided "as is" without guarantees of specific performance or body composition results.',
      ],
    },
    {
      title: '10. Termination',
      paragraphs: [
        'You may stop using FitPro at any time by deleting your account under Profile → Settings → "Delete account and data".',
        'We may suspend or terminate access for violations of these terms or fraudulent use.',
      ],
    },
    {
      title: '11. Changes',
      paragraphs: [
        'We may update these Terms periodically. Continued use after changes constitutes acceptance.',
      ],
    },
    {
      title: '12. Contact',
      paragraphs: [`Questions about these terms: ${PRIVACY_CONTACT_EMAIL}`],
    },
  ],
};

const TERMS_ES: LegalDocumentContent = {
  title: 'Términos de Uso',
  lastUpdated: '26 de julio de 2026',
  sections: TERMS_EN.sections.map((section, index) => ({
    title: TERMS_PT.sections[index]?.title ?? section.title,
    paragraphs:
      index === 0
        ? [
            'Estos Términos de Uso regulan el acceso y uso de la aplicación FitPro. Al crear una cuenta o utilizar cualquier función, usted acepta estos términos.',
            'Si no está de acuerdo, no utilice la aplicación.',
          ]
        : section.paragraphs,
  })),
};

const PRIVACY_BY_LOCALE: Record<AppLocale, LegalDocumentContent> = {
  'pt-BR': PRIVACY_PT,
  'pt-PT': PRIVACY_PT,
  en: PRIVACY_EN,
  'en-GB': PRIVACY_EN,
  es: PRIVACY_ES,
  de: PRIVACY_EN,
  fr: PRIVACY_EN,
  it: PRIVACY_EN,
  zh: PRIVACY_EN,
  ja: PRIVACY_EN,
  hi: PRIVACY_EN,
};

const TERMS_BY_LOCALE: Record<AppLocale, LegalDocumentContent> = {
  'pt-BR': TERMS_PT,
  'pt-PT': TERMS_PT,
  en: TERMS_EN,
  'en-GB': TERMS_EN,
  es: TERMS_ES,
  de: TERMS_EN,
  fr: TERMS_EN,
  it: TERMS_EN,
  zh: TERMS_EN,
  ja: TERMS_EN,
  hi: TERMS_EN,
};

function resolveLegalContent(
  map: Record<AppLocale, LegalDocumentContent>,
  locale: AppLocale
): LegalDocumentContent {
  for (const loc of [...getLocaleChain(locale)].reverse()) {
    if (map[loc]) return map[loc];
  }
  return map['pt-BR'];
}

export function getPrivacyPolicyContent(locale: AppLocale): LegalDocumentContent {
  return resolveLegalContent(PRIVACY_BY_LOCALE, locale);
}

export function getTermsOfUseContent(locale: AppLocale): LegalDocumentContent {
  return resolveLegalContent(TERMS_BY_LOCALE, locale);
}
