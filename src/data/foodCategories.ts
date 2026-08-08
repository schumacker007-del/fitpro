import { FoodCategoryId } from '../types';

export interface FoodCategoryInfo {
  id: FoodCategoryId;
  label: string;
  /** Descrição detalhada da categoria — será enriquecida com conteúdo do usuário. */
  description: string;
  image: number;
  searchTerms: string[];
}

export const FOOD_CATEGORIES: FoodCategoryInfo[] = [
  {
    id: 'dairy',
    label: 'Leite e produtos lácteos, iogurte, queijo cottage',
    description:
      'Esta categoria inclui leite, iogurtes, queijos frescos e derivados lácteos. A composição nutricional varia conforme o teor de gordura e processamento. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/dairy.jpg'),
    searchTerms: ['leite', 'laticínios', 'iogurte', 'cottage', 'queijo'],
  },
  {
    id: 'cereals',
    label: 'Cereais, mingau, flocos, batatas fritas',
    description:
      'Cereais, mingaus, flocos e preparações à base de grãos. Inclui opções integrais e refinadas. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/cereals.jpg'),
    searchTerms: ['cereais', 'mingau', 'flocos', 'aveia', 'batata frita'],
  },
  {
    id: 'eggs_cheese',
    label: 'Ovos, queijos, queijo processado',
    description:
      'Ovos e variedades de queijos, incluindo processados. Fonte de proteínas e gorduras. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/eggs_cheese.jpg'),
    searchTerms: ['ovos', 'queijo', 'processado', 'mussarela'],
  },
  {
    id: 'poultry',
    label: 'Frango, outras aves, carne moída e derivados',
    description:
      'Carnes de aves e preparações derivadas, incluindo carne moída de frango. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/poultry.jpg'),
    searchTerms: ['frango', 'ave', 'peru', 'codorna', 'carne moída'],
  },
  {
    id: 'vegetables',
    label: 'Legumes, verduras, azeitonas',
    description:
      'Vegetais frescos, folhosos, legumes e azeitonas. Rica em fibras, vitaminas e minerais. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/vegetables.jpg'),
    searchTerms: ['legumes', 'verduras', 'vegetais', 'azeitona', 'salada'],
  },
  {
    id: 'seafood',
    label: 'Peixe, frutos do mar, peixe enlatado',
    description:
      'Peixes, crustáceos, moluscos e conservas marinhas. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/seafood.jpg'),
    searchTerms: ['peixe', 'frutos do mar', 'camarão', 'atum', 'salmão'],
  },
  {
    id: 'fruits',
    label: 'Frutas, bagas, frutas secas, compotas, geleia',
    description:
      'Frutas frescas, secas, bagas e preparações doces como compotas e geleias. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/fruits.jpg'),
    searchTerms: ['frutas', 'bagas', 'frutas secas', 'compota', 'geleia'],
  },
  {
    id: 'nuts_seeds',
    label: 'Castanhas, sementes',
    description:
      'Oleaginosas e sementes comestíveis. Fontes de gorduras boas, proteínas e micronutrientes. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/nuts_seeds.jpg'),
    searchTerms: ['castanha', 'amendoim', 'sementes', 'nozes', 'chia'],
  },
  {
    id: 'hot_beverages',
    label: 'Chá, café, chocolate quente e outras bebidas',
    description:
      'Bebidas quentes como chás, cafés e chocolate quente. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/hot_beverages.jpg'),
    searchTerms: ['chá', 'café', 'chocolate quente', 'bebida quente'],
  },
  {
    id: 'seed_oils',
    label: 'Óleo de sementes',
    description:
      'Óleos vegetais extraídos de sementes e oleaginosas. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/seed_oils.jpg'),
    searchTerms: ['óleo', 'azeite', 'sementes', 'girassol', 'canola'],
  },
  {
    id: 'solid_fats',
    label: 'Manteiga, banha de porco, margarina',
    description:
      'Gorduras sólidas para culinária e preparo de alimentos. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/solid_fats.jpg'),
    searchTerms: ['manteiga', 'banha', 'margarina', 'gordura'],
  },
  {
    id: 'legumes',
    label: 'Ervilhas, feijões, frigole, soja, tofu, cogumelos',
    description:
      'Leguminosas, soja, tofu e cogumelos. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/legumes.jpg'),
    searchTerms: ['feijão', 'ervilha', 'soja', 'tofu', 'cogumelo', 'lentilha'],
  },
  {
    id: 'beef',
    label: 'Carne, carne moída, derivados',
    description:
      'Carnes bovinas e derivados, incluindo cortes magros, moídos e preparações culinárias à base de carne.',
    image: require('../../assets/food-categories/beef.jpg'),
    searchTerms: ['carne', 'bovina', 'boi', 'carne moída', 'bife'],
  },
  {
    id: 'flour_pasta',
    label: 'Farinha, farinha de trigo, massa, bolinhos de carne',
    description:
      'Farinhas, massas e preparações à base de trigo. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/flour_pasta.jpg'),
    searchTerms: ['farinha', 'trigo', 'massa', 'macarrão', 'bolinho'],
  },
  {
    id: 'juices',
    label: 'Sucos, água e outras bebidas não alcoólicas',
    description:
      'Sucos naturais, industrializados, água e bebidas não alcoólicas. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/juices.jpg'),
    searchTerms: ['suco', 'água', 'refrigerante', 'bebida'],
  },
  {
    id: 'seasonings',
    label: 'Temperos, especiarias, molhos, sal, vinagre',
    description:
      'Temperos, especiarias, molhos, sal e vinagres. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/seasonings.jpg'),
    searchTerms: ['tempero', 'especiaria', 'molho', 'sal', 'vinagre'],
  },
  {
    id: 'sweets',
    label: 'Doces, chocolate, sorvete, pudins, gomas de mascar',
    description:
      'Doces, chocolates, sorvetes, pudins e gomas de mascar. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/sweets.jpg'),
    searchTerms: ['doce', 'chocolate', 'sorvete', 'pudim', 'goma'],
  },
  {
    id: 'pork',
    label: 'Carne de porco, carne de porco moída',
    description:
      'Carnes suínas e preparações derivadas. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/pork.jpg'),
    searchTerms: ['porco', 'suína', 'lombo', 'bacon'],
  },
  {
    id: 'veal_other_meat',
    label: 'Vitela, carne de outros animais, derivados',
    description:
      'Carnes de vitela e de outros animais, além de derivados. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/veal_other_meat.jpg'),
    searchTerms: ['vitela', 'cordeiro', 'caça', 'derivados'],
  },
  {
    id: 'canned_meat',
    label: 'Carne enlatada',
    description:
      'Carnes em conserva e enlatadas. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/canned_meat.jpg'),
    searchTerms: ['enlatada', 'conserva', 'atum', 'sardinha'],
  },
  {
    id: 'cold_cuts',
    label: 'Linguiça, presunto, produtos defumados, embutidos',
    description:
      'Embutidos, defumados, linguiças e presuntos. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/cold_cuts.jpg'),
    searchTerms: ['linguiça', 'presunto', 'defumado', 'embutido', 'salame'],
  },
  {
    id: 'lamb',
    label: 'Cordeiro, carne moída, derivados',
    description:
      'Carnes de cordeiro e derivados. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/lamb.jpg'),
    searchTerms: ['cordeiro', 'carneiro', 'carne moída'],
  },
  {
    id: 'baby_food',
    label: 'Comida de bebê',
    description:
      'Alimentos preparados para bebês e crianças pequenas. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/baby_food.jpg'),
    searchTerms: ['bebê', 'infantil', 'papinha', 'purê'],
  },
  {
    id: 'fast_food',
    label: 'Fast food',
    description:
      'Refeições rápidas e industrializadas. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/fast_food.jpg'),
    searchTerms: ['fast food', 'hambúrguer', 'pizza', 'fritura'],
  },
  {
    id: 'alcohol',
    label: 'Álcool, vinho, cerveja, coquetéis',
    description:
      'Bebidas alcoólicas como vinhos, cervejas e coquetéis. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/alcohol.jpg'),
    searchTerms: ['álcool', 'vinho', 'cerveja', 'coquetel', 'bebida alcoólica'],
  },
  {
    id: 'other_foods',
    label: 'Outros alimentos',
    description:
      'Alimentos que não se encaixam nas demais categorias. Descrição detalhada em breve.',
    image: require('../../assets/food-categories/other_foods.jpg'),
    searchTerms: ['outros', 'diversos', 'barra', 'suplemento'],
  },
];

export function getFoodCategory(id: FoodCategoryId): FoodCategoryInfo {
  const found = FOOD_CATEGORIES.find((c) => c.id === id);
  if (!found) throw new Error(`Categoria alimentar desconhecida: ${id}`);
  return found;
}

export function searchFoodCategories(query: string): FoodCategoryInfo[] {
  const q = query.trim().toLowerCase();
  if (!q) return FOOD_CATEGORIES;
  return FOOD_CATEGORIES.filter(
    (c) =>
      c.label.toLowerCase().includes(q) ||
      c.searchTerms.some((t) => t.toLowerCase().includes(q))
  );
}
