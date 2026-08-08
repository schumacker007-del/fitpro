#!/usr/bin/env python3
"""Importa biblioteca GuiFit a partir do CSV + ZIP."""
import csv
import json
import re
import sys
import unicodedata
import zipfile
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(
    sys.argv[1]
    if len(sys.argv) > 1
    else "/Users/luizcarlosschumackerfuck/Downloads/Biblioteca por Grupo Muscular"
)

GROUP_MAP = {
    "Peito": "peito",
    "Costas": "costas",
    "Ombros": "ombros",
    "Bíceps": "biceps",
    "Tríceps": "triceps",
    "Antebraço": "antebraco",
    "Quadríceps": "quadriceps",
    "Glúteos": "gluteos",
    "Posteriores de coxa": "posterior",
    "Panturrilha": "panturrilha",
    "Abdômen": "abdomen",
    "Cardio": "cardio",
    "Alongamento e mobilidade": "mobilidade",
    "Exercícios": "funcional",
}

LIB_GROUP_ID = {
    "peito": "w-lib-peito",
    "costas": "w-lib-costas",
    "ombros": "w-lib-ombros",
    "biceps": "w-lib-biceps",
    "triceps": "w-lib-triceps",
    "antebraco": "w-lib-antebraco",
    "quadriceps": "w-lib-quadriceps",
    "gluteos": "w-lib-posterior-gluteos",
    "posterior": "w-lib-posterior-gluteos",
    "panturrilha": "w-lib-panturrilha",
    "abdomen": "w-lib-abdomen",
    "funcional": "w-lib-funcional",
    "cardio": "w-lib-cardio",
    "mobilidade": "w-lib-mobilidade",
}

GROUP_LABEL = {
    "peito": "Peito",
    "costas": "Costas",
    "ombros": "Ombros",
    "biceps": "Bíceps",
    "triceps": "Tríceps",
    "antebraco": "Antebraço",
    "quadriceps": "Quadríceps",
    "gluteos": "Glúteos",
    "posterior": "Posterior de coxa",
    "panturrilha": "Panturrilha",
    "abdomen": "Abdômen",
    "funcional": "Funcional",
    "cardio": "Cardio",
    "mobilidade": "Mobilidade",
}

PRIMARY_MUSCLES = {
    "peito": ["peito", "triceps"],
    "costas": ["costas", "biceps"],
    "ombros": ["ombros"],
    "biceps": ["biceps"],
    "triceps": ["triceps"],
    "antebraco": ["antebraco"],
    "quadriceps": ["quadriceps", "gluteos"],
    "gluteos": ["gluteos"],
    "posterior": ["isquiotibiais"],
    "panturrilha": ["panturrilha"],
    "abdomen": ["abdomen"],
    "funcional": ["funcional"],
    "cardio": ["cardio"],
    "mobilidade": ["mobilidade"],
}

LIMITS = {
    "peito": 30,
    "costas": 30,
    "ombros": 30,
    "biceps": 30,
    "triceps": 30,
    "quadriceps": 30,
    "gluteos": 30,
    "posterior": 30,
    "antebraco": 20,
    "panturrilha": 15,
    "abdomen": 20,
    "funcional": 20,
    "cardio": 15,
    "mobilidade": 20,
}

LIB_META = {
    "w-lib-peito": ("Biblioteca — Peito", "ganhar_massa", "intermediario", 35),
    "w-lib-costas": ("Biblioteca — Costas", "ganhar_massa", "intermediario", 35),
    "w-lib-ombros": ("Biblioteca — Ombros", "ganhar_massa", "intermediario", 30),
    "w-lib-biceps": ("Biblioteca — Bíceps", "ganhar_massa", "intermediario", 25),
    "w-lib-triceps": ("Biblioteca — Tríceps", "ganhar_massa", "intermediario", 25),
    "w-lib-antebraco": ("Biblioteca — Antebraço", "ganhar_massa", "intermediario", 20),
    "w-lib-quadriceps": ("Biblioteca — Quadríceps", "ganhar_massa", "intermediario", 35),
    "w-lib-posterior-gluteos": ("Biblioteca — Posterior & Glúteos", "ganhar_massa", "intermediario", 35),
    "w-lib-panturrilha": ("Biblioteca — Panturrilha", "ganhar_massa", "intermediario", 20),
    "w-lib-abdomen": ("Biblioteca — Abdômen", "manter_forma", "iniciante", 20),
    "w-lib-funcional": ("Biblioteca — Funcional", "condicionamento_fisico", "intermediario", 25),
    "w-lib-cardio": ("Biblioteca — Cardio", "perder_peso", "iniciante", 20),
    "w-lib-mobilidade": ("Biblioteca — Mobilidade", "manter_forma", "iniciante", 15),
}


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text[:60]


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")


def score_row(r: dict) -> int:
    s = 0
    if "Alta" in r["confianca_visual"]:
        s += 10
    elif "Média" in r["confianca_visual"]:
        s += 5
    name = r["exercicio_identificado"].lower()
    if "circuito" in name:
        s -= 8
    if "varia" in name:
        s -= 4
    if "treino abdominal" in name:
        s -= 3
    return s


def map_animation(name: str, group: str) -> str:
    n = name.lower()
    rules = [
        (r"supino reto", "chest_press"),
        (r"supino inclinado.*halter", "chest_press_incline_db"),
        (r"supino inclinado", "chest_press_incline"),
        (r"supino declinado", "chest_press_decline"),
        (r"crucifixo|crossover|voador|peck", "chest_fly"),
        (r"flex[aã]o de bra[cç]o|flex[aã]o de peito", "pushup"),
        (r"mergulho|paralela", "dip_chest"),
        (r"pullover", "pullover"),
        (r"puxada|pulldown|barra fixa", "pulldown"),
        (r"remada curvada", "row"),
        (r"remada|pulley", "seated_row"),
        (r"levantamento terra", "hip_hinge"),
        (r"extens[aã]o lombar", "hip_hinge"),
        (r"desenvolvimento|press.*ombro", "shoulder_press"),
        (r"eleva[cç][aã]o lateral", "lateral_raise"),
        (r"eleva[cç][aã]o frontal", "front_raise"),
        (r"crucifixo inverso|deltoide posterior", "rear_delt_fly"),
        (r"encolhimento", "shrug"),
        (r"rosca scott", "curl_scott"),
        (r"rosca concentr", "curl_concentrated"),
        (r"rosca martelo", "curl_hammer"),
        (r"rosca", "curl"),
        (r"tr[ií]ceps.*testa", "triceps_skullcrusher"),
        (r"tr[ií]ceps.*cabe[cç]a|franc[eê]s", "triceps_overhead"),
        (r"coice|kickback", "triceps_kickback"),
        (r"tr[ií]ceps", "triceps_extension"),
        (r"agachamento|squat|smith", "squat"),
        (r"leg press", "leg_press"),
        (r"cadeira extensora|extensora", "leg_extension"),
        (r"stiff|terra romeno", "hip_hinge"),
        (r"mesa flexora|flexora", "leg_curl_seated"),
        (r"hip thrust|ponte de gl[uú]teo", "hip_thrust"),
        (r"abdutora|abdu[cç][aã]o|coice de gl[uú]teo", "hip_abduction"),
        (r"panturrilha|g[eê]meos", "calf_raise"),
        (r"prancha", "plank"),
        (r"abdominal|crunch|bicicleta", "crunch"),
        (r"eleva[cç][aã]o de pernas", "leg_raise"),
        (r"punho|antebrac", "wrist_curl"),
        (r"mountain climber|escalador", "mountain_climber"),
        (r"burpee", "burpee"),
        (r"alongamento|mobilidade", "stretch"),
        (r"afundo|lunge", "lunge"),
    ]
    for pattern, kind in rules:
        if re.search(pattern, n):
            return kind
    fallback = {
        "peito": "chest_press",
        "costas": "row",
        "ombros": "shoulder_press",
        "biceps": "curl",
        "triceps": "triceps_extension",
        "quadriceps": "squat",
        "gluteos": "hip_thrust",
        "posterior": "hip_hinge",
        "panturrilha": "calf_raise",
        "abdomen": "crunch",
        "funcional": "squat",
        "cardio": "mountain_climber",
        "mobilidade": "stretch",
        "antebraco": "wrist_curl",
    }
    return fallback.get(group, "stretch")


def guess_equipment(name: str):
    n = name.lower()
    if "barra" in n:
        return "Barra"
    if "halter" in n:
        return "Halteres"
    if "polia" in n or "cabo" in n:
        return "Cabo / polia"
    if "máquina" in n or "maquina" in n:
        return "Máquina"
    if "smith" in n:
        return "Smith"
    if "flexão" in n or "flexao" in n:
        return "Peso do corpo"
    return None


def generic_copy(name: str) -> dict:
    return {
        "instructions": [
            f"Posicione-se corretamente para {name}.",
            "Execute o movimento de forma controlada, sem usar impulso.",
            "Mantenha a respiração coordenada com a fase concêntrica e excêntrica.",
        ],
        "postureTips": [
            "Mantenha o core ativado durante toda a série.",
            "Use amplitude completa sem comprometer a articulação.",
        ],
        "commonMistakes": [
            "Usar carga excessiva e perder a técnica.",
            "Executar o movimento muito rápido, sem controle.",
        ],
    }


def group_from_row(r: dict):
    folder = r["caminho_no_pacote"].split("/")[0]
    if folder in GROUP_MAP:
        return GROUP_MAP[folder]
    return GROUP_MAP.get(r["grupo_muscular_principal"])


def select_exercises(rows: list[dict]) -> list[dict]:
    by_key: dict[str, dict] = {}
    for r in rows:
        g = group_from_row(r)
        if not g:
            continue
        key = f"{g}::{r['exercicio_identificado'].strip().lower()}"
        prev = by_key.get(key)
        if not prev or score_row(r) > score_row(prev):
            by_key[key] = r

    by_group: dict[str, list[dict]] = defaultdict(list)
    for r in by_key.values():
        by_group[group_from_row(r)].append(r)

    selected: list[dict] = []
    for g, items in by_group.items():
        items.sort(
            key=lambda r: (-score_row(r), r["exercicio_identificado"].lower()),
        )
        selected.extend(items[: LIMITS.get(g, 30)])
    selected.sort(key=lambda r: int(r["numero_original"]))
    return selected


def find_zip_path(zf: zipfile.ZipFile, csv_path: str, numero: str):
    target_suffix = csv_path.split("/")[-1]
    for name in zf.namelist():
        if name.endswith(target_suffix):
            return name
    # fallback: match by leading number (encoding differences in zip)
    prefix = f"{numero} -"
    for name in zf.namelist():
        base = name.split("/")[-1]
        if base.startswith(prefix):
            return name
    return None


def emit_ts_array(items: list[str]) -> str:
    return "[" + ", ".join(f"'{esc(x)}'" for x in items) + "]"


def main() -> None:
    print("Reading", SOURCE)
    video_dir = ROOT / "assets/videos/guifit"
    video_dir.mkdir(parents=True, exist_ok=True)

    if SOURCE.is_dir():
        csv_path = SOURCE / "Catalogo - Biblioteca por Grupo Muscular.csv"
        rows = list(csv.DictReader(csv_path.open(encoding="utf-8-sig")))
        selected = select_exercises(rows)
        print(f"Selected {len(selected)} exercises")

        exercises = []
        video_requires = []

        for r in selected:
            group = group_from_row(r)
            name = r["exercicio_identificado"].strip()
            ex_id = f"e-lib-{group}-{slugify(name)}"
            copy = generic_copy(name)
            ex = {
                "id": ex_id,
                "name": name,
                "muscleGroup": GROUP_LABEL[group],
                "primaryMuscles": PRIMARY_MUSCLES[group],
                "sets": 3 if group in ("cardio", "mobilidade") else 4,
                "reps": "30-45s" if group == "cardio" else ("30s" if group == "mobilidade" else "8-12"),
                "restSeconds": 30 if group in ("cardio", "mobilidade") else 60,
                "animation": map_animation(name, group),
                "equipment": guess_equipment(name),
                "tier": "pro",
                **copy,
            }
            src_video = SOURCE / r["caminho_no_pacote"]
            if not src_video.exists():
                print("WARN missing:", src_video)
                continue
            dest = video_dir / f"{r['numero_original']}.mp4"
            dest.write_bytes(src_video.read_bytes())
            video_requires.append((ex_id, dest.name))
            exercises.append(ex)
    else:
        with zipfile.ZipFile(SOURCE) as zf:
            csv_name = next(n for n in zf.namelist() if "Catalogo" in n and n.endswith(".csv"))
            rows = list(csv.DictReader(zf.open(csv_name).read().decode("utf-8-sig").splitlines()))
            selected = select_exercises(rows)
            print(f"Selected {len(selected)} exercises")

            exercises = []
            video_requires = []

            for r in selected:
                group = group_from_row(r)
                name = r["exercicio_identificado"].strip()
                ex_id = f"e-lib-{group}-{slugify(name)}"
                copy = generic_copy(name)
                ex = {
                    "id": ex_id,
                    "name": name,
                    "muscleGroup": GROUP_LABEL[group],
                    "primaryMuscles": PRIMARY_MUSCLES[group],
                    "sets": 3 if group in ("cardio", "mobilidade") else 4,
                    "reps": "30-45s" if group == "cardio" else ("30s" if group == "mobilidade" else "8-12"),
                    "restSeconds": 30 if group in ("cardio", "mobilidade") else 60,
                    "animation": map_animation(name, group),
                    "equipment": guess_equipment(name),
                    "tier": "pro",
                    **copy,
                }
                zip_path = find_zip_path(zf, r["caminho_no_pacote"], r["numero_original"])
                if not zip_path:
                    print("WARN missing:", r["caminho_no_pacote"])
                    continue
                dest = video_dir / f"{r['numero_original']}.mp4"
                dest.write_bytes(zf.read(zip_path))
                video_requires.append((ex_id, dest.name))
                exercises.append(ex)

    by_lib: dict[str, list[dict]] = defaultdict(list)
    for ex in exercises:
        group = ex["id"].split("-")[2]
        by_lib[LIB_GROUP_ID[group]].append(ex)

    lib_lines = [
        "import { WorkoutPlan } from '../types';",
        "",
        "/**",
        f" * Biblioteca GuiFit — {len(exercises)} exercícios com vídeo premium.",
        " * Gerado por scripts/import-guifit-library.py",
        " */",
        "export const LIBRARY_WORKOUTS: WorkoutPlan[] = [",
    ]

    for lib_id in LIB_META:
        title, goal, level, duration = LIB_META[lib_id]
        exs = by_lib.get(lib_id, [])
        lib_lines += [
            "  {",
            f"    id: '{lib_id}',",
            f"    title: '{title}',",
            f"    goal: '{goal}',",
            f"    level: '{level}',",
            f"    durationMinutes: {duration},",
            "    tier: 'free',",
            "    hidden: true,",
            "    exercises: [",
        ]
        for ex in exs:
            lines = [
                f"id: '{ex['id']}'",
                f"name: '{esc(ex['name'])}'",
                f"muscleGroup: '{esc(ex['muscleGroup'])}'",
                f"primaryMuscles: {emit_ts_array(ex['primaryMuscles'])}",
                f"sets: {ex['sets']}",
                f"reps: '{ex['reps']}'",
                f"restSeconds: {ex['restSeconds']}",
                f"animation: '{ex['animation']}'",
            ]
            if ex["equipment"]:
                lines.append(f"equipment: '{esc(ex['equipment'])}'")
            lines += [
                f"tier: '{ex['tier']}'",
                f"instructions: {emit_ts_array(ex['instructions'])}",
                f"postureTips: {emit_ts_array(ex['postureTips'])}",
                f"commonMistakes: {emit_ts_array(ex['commonMistakes'])}",
            ]
            lib_lines.append("      {")
            lib_lines.append("        " + ",\n        ".join(lines) + ",")
            lib_lines.append("      },")
        lib_lines += ["    ],", "  },"]
    lib_lines.append("];")
    lib_lines.append("")

    video_lines = [
        "/** Vídeos GuiFit por ID de exercício (gerado automaticamente). */",
        "export const GUIFIT_VIDEO_SOURCES: Record<string, number> = {",
    ]
    for ex_id, fname in video_requires:
        video_lines.append(f"  '{ex_id}': require('../../assets/videos/guifit/{fname}'),")
    video_lines += ["};", ""]

    (ROOT / "src/data/exerciseLibrary.ts").write_text("\n".join(lib_lines), encoding="utf-8")
    (ROOT / "src/data/guifitVideoSources.ts").write_text("\n".join(video_lines), encoding="utf-8")

    counts = defaultdict(int)
    for ex in exercises:
        counts[ex["id"].split("-")[2]] += 1
    print("Per group:", dict(sorted(counts.items())))
    print("Videos:", len(video_requires))


if __name__ == "__main__":
    main()
