# Exam Analysis — Medical Copy Compliance

Apple Guidelines **1.4** and **2.5.13** require educational framing only — not medical diagnosis.

## Current implementation

The app uses a **native text-based educational guide** (`src/data/examAnalysisEducation.ts` + `ExamAnalysisReportScreen`). The previous 40 JPG slide deck in `assets/exam-analysis/` is **no longer shown in the app** (files may remain on disk but are unused).

- WhatsApp CTA = professional consultation, not automated diagnosis
- Guide topics: intro, hormonal, renal, lipid, hepatic, glycemic, hematology, summary
- All copy in PT / EN / ES via `premium.examAnalysis.guide.*` keys

## Cleanup (done)

- `assets/exam-analysis/` — removed (~4.6 MB, slides no longer used)
- `assets/expo-qr-*.png` — removed (dev QR screenshots, not used in app)
- `assets/reference/` — removed (empty folder)

## App Store listing

If you mention exam analysis in the store description, use educational language only (no "diagnosis", "clinical report", etc.).
