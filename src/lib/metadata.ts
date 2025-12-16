// Metadata generation for flashcards pages
export const categories = [
  { id: 1, name: 'Saudações', slug: 'saudacoes', wordCount: 10 },
  { id: 2, name: 'Família', slug: 'familia', wordCount: 10 },
  { id: 3, name: 'Comida', slug: 'comida', wordCount: 10 },
  { id: 4, name: 'Cores', slug: 'cores', wordCount: 10 },
  { id: 5, name: 'Números', slug: 'numeros', wordCount: 10 },
  { id: 6, name: 'Tempo', slug: 'tempo', wordCount: 10 },
];

export function generateFlashcardMetadata(categoryId: string) {
  const category = categories.find((c) => c.id === parseInt(categoryId));

  if (!category) {
    return {
      title: 'Flashcards - Ulpingo',
      description: 'Aprenda hebraico com flashcards interativos',
    };
  }

  return {
    title: `Aprenda ${category.name} em Hebraico | Flashcards com Áudio`,
    description: `Domine ${
      category.wordCount
    } palavras de ${category.name.toLowerCase()} em hebraico com flashcards interativos, áudio nativo e repetição espaçada. Aprenda de forma eficaz!`,
    keywords: [
      `${category.name.toLowerCase()} em hebraico`,
      `aprender ${category.name.toLowerCase()} hebraico`,
      `vocabulário hebraico ${category.name.toLowerCase()}`,
      'flashcards hebraico',
      'hebraico com audio',
    ],
    openGraph: {
      title: `Aprenda ${category.name} em Hebraico - Flashcards`,
      description: `${
        category.wordCount
      } palavras de ${category.name.toLowerCase()} com áudio nativo e repetição espaçada`,
      url: `https://ulpingo.app/flashcards/${categoryId}`,
    },
    alternates: {
      canonical: `https://ulpingo.app/flashcards/${categoryId}`,
    },
  };
}

export function generateQuizMetadata(categoryId: string) {
  const category = categories.find((c) => c.id === parseInt(categoryId));

  if (!category) {
    return {
      title: 'Quiz - Ulpingo',
      description: 'Teste seu conhecimento de hebraico',
    };
  }

  return {
    title: `Quiz de ${category.name} em Hebraico | Teste Seu Conhecimento`,
    description: `Teste seu conhecimento de ${
      category.wordCount
    } palavras de ${category.name.toLowerCase()} em hebraico. Quiz interativo com feedback imediato. Descubra seu nível!`,
    keywords: [
      `quiz hebraico ${category.name.toLowerCase()}`,
      `teste hebraico ${category.name.toLowerCase()}`,
      `exercícios hebraico ${category.name.toLowerCase()}`,
      'quiz hebraico online',
      'testar conhecimento hebraico',
    ],
    openGraph: {
      title: `Quiz de ${category.name} em Hebraico`,
      description: `Teste seus conhecimentos de ${category.name.toLowerCase()} com este quiz interativo`,
      url: `https://ulpingo.app/quiz/${categoryId}`,
    },
    alternates: {
      canonical: `https://ulpingo.app/quiz/${categoryId}`,
    },
  };
}
