import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ulpingo.app';

  // Static pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/review`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Category pages (flashcards and quiz)
  const categories = [
    { id: 1, slug: 'saudacoes', name: 'Saudações' },
    { id: 2, slug: 'familia', name: 'Família' },
    { id: 3, slug: 'comida', name: 'Comida' },
    { id: 4, slug: 'cores', name: 'Cores' },
    { id: 5, slug: 'numeros', name: 'Números' },
    { id: 6, slug: 'tempo', name: 'Tempo' },
  ];

  const categoryRoutes = categories.flatMap((cat) => [
    {
      url: `${baseUrl}/flashcards/${cat.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quiz/${cat.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]);

  return [...routes, ...categoryRoutes];
}
