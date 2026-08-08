import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { MEDICAL_RECORD_CATEGORIES } from '../data/medicalRecordCategories';
import { RESPONSIBLE_PROFESSIONAL } from '../data/professional';
import {
  DietPlan,
  Goal,
  MedicalRecord,
  PlanTier,
  ProgressPhoto,
  TrainingLogEntry,
  UserProfile,
} from '../types';
import { GamificationSnapshot } from '../types/gamification';
import { AppLocale, DEFAULT_LOCALE } from '../i18n/types';
import { badgeDescriptionKey, badgeTitleKey } from '../i18n/muscleGroupLabel';
import { translate } from '../i18n/translations';
import { formatLocaleDate } from './formatLocaleDate';

export interface ReportSections {
  profile: boolean;
  consistency: boolean;
  training: boolean;
  diet: boolean;
  medical: boolean;
  photos: boolean;
  badges: boolean;
}

export const DEFAULT_REPORT_SECTIONS: ReportSections = {
  profile: true,
  consistency: true,
  training: true,
  diet: true,
  medical: true,
  photos: true,
  badges: true,
};

export interface ProgressReportInput {
  profile: UserProfile;
  bmi: number | null;
  planTier: PlanTier;
  goalLabel: string;
  gamification: GamificationSnapshot;
  trainingLogs: TrainingLogEntry[];
  diet: DietPlan | null;
  medicalRecords: MedicalRecord[];
  progressPhotos: ProgressPhoto[];
  customPlanStatus?: string;
  locale?: AppLocale;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

let reportLocale: AppLocale = DEFAULT_LOCALE;

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return formatLocaleDate(reportLocale, date, { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDateTime(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return formatLocaleDate(reportLocale, date, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function genderLabel(gender: UserProfile['gender']) {
  if (gender === 'masculino') return 'Masculino';
  if (gender === 'feminino') return 'Feminino';
  return 'Outro';
}

function medicalCategoryLabel(category: MedicalRecord['category']) {
  return MEDICAL_RECORD_CATEGORIES.find((c) => c.id === category)?.label ?? category;
}

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return 'Abaixo do peso';
  if (bmi < 25) return 'Peso normal';
  if (bmi < 30) return 'Sobrepeso';
  return 'Obesidade';
}

function section(title: string, body: string) {
  return `
    <section class="section">
      <h2>${escapeHtml(title)}</h2>
      ${body}
    </section>
  `;
}

function buildProfileSection(input: ProgressReportInput) {
  const { profile, bmi, goalLabel, planTier } = input;
  const location = [profile.city, profile.state].filter(Boolean).join(' / ');

  return section(
    'Dados do atleta',
    `
      <table class="kv">
        <tr><th>Nome</th><td>${escapeHtml(profile.name)}</td></tr>
        <tr><th>Objetivo</th><td>${escapeHtml(goalLabel)}</td></tr>
        <tr><th>Plano</th><td>${planTier === 'pro' ? 'FitPro Pro' : 'FitPro Free'}</td></tr>
        <tr><th>Sexo</th><td>${genderLabel(profile.gender)}</td></tr>
        <tr><th>Idade</th><td>${profile.age} anos</td></tr>
        <tr><th>Peso</th><td>${profile.weightKg.toFixed(1)} kg</td></tr>
        <tr><th>Altura</th><td>${profile.heightCm} cm</td></tr>
        <tr><th>IMC</th><td>${bmi ? `${bmi.toFixed(1)} (${bmiCategory(bmi)})` : '—'}</td></tr>
        ${location ? `<tr><th>Local</th><td>${escapeHtml(location)}</td></tr>` : ''}
        ${profile.gym ? `<tr><th>Academia</th><td>${escapeHtml(profile.gym)}</td></tr>` : ''}
        ${input.customPlanStatus ? `<tr><th>Ficha personalizada</th><td>${escapeHtml(input.customPlanStatus)}</td></tr>` : ''}
      </table>
    `
  );
}

function buildConsistencySection(snapshot: GamificationSnapshot) {
  return section(
    'Consistência',
    `
      <div class="stats-grid">
        <div class="stat"><span class="stat-value">${snapshot.workoutStreak}</span><span class="stat-label">dias seguidos de treino</span></div>
        <div class="stat"><span class="stat-value">${snapshot.dietStreak}</span><span class="stat-label">dias seguidos de dieta</span></div>
        <div class="stat"><span class="stat-value">${snapshot.comboStreak}</span><span class="stat-label">dias com treino + dieta</span></div>
        <div class="stat"><span class="stat-value">${snapshot.totalWorkoutDays}</span><span class="stat-label">dias de treino registrados</span></div>
        <div class="stat"><span class="stat-value">${snapshot.totalDietDays}</span><span class="stat-label">dias de dieta registrados</span></div>
        <div class="stat"><span class="stat-value">${snapshot.bestWorkoutStreak}</span><span class="stat-label">melhor sequência de treino</span></div>
      </div>
    `
  );
}

function buildTrainingSection(logs: TrainingLogEntry[]) {
  const sorted = [...logs].sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()).slice(0, 25);

  if (sorted.length === 0) {
    return section('Treinos e esforço (RPE)', '<p class="muted">Nenhum registro de treino com RPE ainda.</p>');
  }

  const rows = sorted
    .map(
      (log) => `
        <tr>
          <td>${formatDateTime(log.dateISO)}</td>
          <td>${escapeHtml(log.exerciseName)}</td>
          <td class="center"><strong>${log.rpe}</strong>/10</td>
        </tr>
      `
    )
    .join('');

  return section(
    'Treinos e esforço (RPE)',
    `
      <p class="muted">Escala RPE: 1 = muito fácil · 10 = esforço máximo. Registros mais recentes primeiro.</p>
      <table class="data">
        <thead>
          <tr><th>Data</th><th>Exercício</th><th>RPE</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `
  );
}

function buildDietSection(diet: DietPlan | null) {
  if (!diet) {
    return section('Plano alimentar', '<p class="muted">Nenhum plano alimentar associado ao objetivo atual.</p>');
  }

  const meals = diet.meals
    .map(
      (meal) => `
        <div class="meal">
          <h3>${escapeHtml(meal.name)}${meal.kcal ? ` · ~${meal.kcal} kcal` : ''}</h3>
          <ul>${meal.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </div>
      `
    )
    .join('');

  const tips = diet.tips?.length
    ? `<div class="tips"><h3>Orientações</h3><ul>${diet.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('')}</ul></div>`
    : '';

  return section(
    'Plano alimentar',
    `
      <p><strong>${escapeHtml(diet.title)}</strong></p>
      <p class="muted">${escapeHtml(diet.dailyKcalTarget)}</p>
      ${meals}
      ${tips}
    `
  );
}

function buildMedicalSection(records: MedicalRecord[]) {
  if (records.length === 0) {
    return section(
      'Documentos de saúde',
      '<p class="muted">Nenhum exame, prescrição ou avaliação registrado no app.</p>'
    );
  }

  const sorted = [...records].sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
  const rows = sorted
    .map(
      (record) => `
        <tr>
          <td>${formatDate(record.dateISO)}</td>
          <td>${escapeHtml(medicalCategoryLabel(record.category))}</td>
          <td>${escapeHtml(record.title)}</td>
          <td>${record.mediaType.toUpperCase()}</td>
        </tr>
      `
    )
    .join('');

  return section(
    'Documentos de saúde',
    `
      <p class="muted">Resumo dos documentos salvos no app (sem anexar arquivos). Total: ${records.length}.</p>
      <table class="data">
        <thead>
          <tr><th>Data</th><th>Categoria</th><th>Título</th><th>Tipo</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `
  );
}

function buildPhotosSection(photos: ProgressPhoto[]) {
  if (photos.length === 0) {
    return section('Fotos de evolução', '<p class="muted">Nenhuma foto de evolução registrada.</p>');
  }

  const sorted = [...photos].sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
  const rows = sorted
    .map(
      (photo) => `
        <tr>
          <td>${formatDate(photo.dateISO)}</td>
          <td>${photo.weightKg ? `${photo.weightKg.toFixed(1)} kg` : '—'}</td>
          <td>${photo.note ? escapeHtml(photo.note) : '—'}</td>
        </tr>
      `
    )
    .join('');

  return section(
    'Fotos de evolução',
    `
      <p class="muted">Registro de ${photos.length} foto(s). As imagens ficam no app; aqui consta apenas o histórico.</p>
      <table class="data">
        <thead>
          <tr><th>Data</th><th>Peso</th><th>Observação</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `
  );
}

function buildBadgesSection(snapshot: GamificationSnapshot) {
  if (snapshot.unlockedBadges.length === 0) {
    return section('Conquistas', '<p class="muted">Nenhuma conquista desbloqueada ainda.</p>');
  }

  const items = snapshot.unlockedBadges
    .map((id) => {
      const title = translate(reportLocale, badgeTitleKey(id));
      const description = translate(reportLocale, badgeDescriptionKey(id));
      return `<li><strong>${escapeHtml(title)}</strong> — ${escapeHtml(description)}</li>`;
    })
    .join('');

  return section('Conquistas', `<ul class="badges">${items}</ul>`);
}

export function buildProgressReportHtml(input: ProgressReportInput, sections: ReportSections) {
  reportLocale = input.locale ?? DEFAULT_LOCALE;
  const generatedAt = formatDateTime(new Date().toISOString());
  const parts: string[] = [];

  if (sections.profile) parts.push(buildProfileSection(input));
  if (sections.consistency) parts.push(buildConsistencySection(input.gamification));
  if (sections.training) parts.push(buildTrainingSection(input.trainingLogs));
  if (sections.diet) parts.push(buildDietSection(input.diet));
  if (sections.medical) parts.push(buildMedicalSection(input.medicalRecords));
  if (sections.photos) parts.push(buildPhotosSection(input.progressPhotos));
  if (sections.badges) parts.push(buildBadgesSection(input.gamification));

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <title>Relatório FitPro — ${escapeHtml(input.profile.name)}</title>
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #1a1d24;
            margin: 0;
            padding: 32px;
            font-size: 12px;
            line-height: 1.5;
          }
          .header {
            border-bottom: 3px solid #0F9D69;
            padding-bottom: 16px;
            margin-bottom: 24px;
          }
          .brand { color: #0F9D69; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
          h1 { margin: 6px 0 4px; font-size: 24px; }
          .meta { color: #5c6470; font-size: 11px; }
          .section { margin-bottom: 22px; page-break-inside: avoid; }
          h2 {
            font-size: 14px;
            color: #0F9D69;
            border-bottom: 1px solid #e4e8ee;
            padding-bottom: 6px;
            margin: 0 0 10px;
          }
          h3 { font-size: 12px; margin: 10px 0 4px; }
          .muted { color: #5c6470; }
          table { width: 100%; border-collapse: collapse; margin-top: 8px; }
          th, td { border: 1px solid #e4e8ee; padding: 7px 8px; text-align: left; vertical-align: top; }
          th { background: #f4f7fa; font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em; color: #5c6470; }
          .kv th { width: 34%; }
          .center { text-align: center; }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          .stat {
            border: 1px solid #e4e8ee;
            border-radius: 8px;
            padding: 10px;
            text-align: center;
            background: #f9fbfd;
          }
          .stat-value { display: block; font-size: 20px; font-weight: 800; color: #0F9D69; }
          .stat-label { display: block; font-size: 10px; color: #5c6470; margin-top: 2px; }
          .meal { margin-bottom: 10px; }
          .meal ul, .tips ul, .badges { margin: 4px 0 0; padding-left: 18px; }
          .footer {
            margin-top: 28px;
            padding-top: 14px;
            border-top: 1px solid #e4e8ee;
            font-size: 10px;
            color: #5c6470;
          }
          .footer strong { color: #1a1d24; }
        </style>
      </head>
      <body>
        <header class="header">
          <div class="brand">FitPro</div>
          <h1>Relatório de progresso</h1>
          <div class="meta">Atleta: ${escapeHtml(input.profile.name)} · Gerado em ${generatedAt}</div>
        </header>
        ${parts.join('')}
        <footer class="footer">
          <p><strong>${escapeHtml(RESPONSIBLE_PROFESSIONAL.name)}</strong> · ${escapeHtml(RESPONSIBLE_PROFESSIONAL.role)} · ${escapeHtml(RESPONSIBLE_PROFESSIONAL.credential)}</p>
          <p>${escapeHtml(RESPONSIBLE_PROFESSIONAL.disclaimer)}</p>
          <p>Este relatório resume dados registrados no aplicativo FitPro e não constitui laudo médico, nutricional ou avaliação física formal. Compartilhe com profissionais de saúde apenas como referência complementar.</p>
        </footer>
      </body>
    </html>
  `;
}

export async function generateProgressReportPdf(input: ProgressReportInput, sections: ReportSections) {
  const html = buildProgressReportHtml(input, sections);
  const { uri } = await Print.printToFileAsync({ html });
  return uri;
}

export async function shareProgressReportPdf(uri: string) {
  const available = await Sharing.isAvailableAsync();
  if (!available) {
    throw new Error('Compartilhamento não disponível neste dispositivo.');
  }

  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: 'Compartilhar relatório FitPro',
    UTI: 'com.adobe.pdf',
  });
}

export function goalLabelFromGoal(goal: Goal | undefined) {
  if (goal === 'perder_peso') return 'Emagrecimento';
  if (goal === 'ganhar_massa') return 'Ganho de massa';
  if (goal === 'condicionamento_fisico') return 'Condicionamento físico';
  if (goal === 'manter_forma') return 'Manter forma';
  return 'Não definido';
}
