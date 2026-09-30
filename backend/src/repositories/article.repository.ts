import { prisma } from '../config/database.js';
import type { ArticleInput } from '../schemas/article.schema.js';

export function findAllArticles(
  search?: string,
  category?: string,
) {
  return prisma.knowledgeArticle.findMany({
    where: {
      ...(category && category !== 'ALL'
        ? {
            category: category as ArticleInput['category'],
          }
        : {}),

      ...(search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                summary: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                content: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {}),
    },

    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      updatedAt: 'desc',
    },
  });
}

export function findArticleById(id: string) {
  return prisma.knowledgeArticle.findUnique({
    where: {
      id,
    },

    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export function createArticle(
  data: ArticleInput,
  authorId: string,
) {
  return prisma.knowledgeArticle.create({
    data: {
      title: data.title,
      slug: data.slug,
      category: data.category,
      status: data.status,
      summary: data.summary,
      content: data.content,
      authorId,
    },

    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export function updateArticle(
  id: string,
  data: ArticleInput,
) {
  return prisma.knowledgeArticle.update({
    where: {
      id,
    },

    data: {
      title: data.title,
      slug: data.slug,
      category: data.category,
      status: data.status,
      summary: data.summary,
      content: data.content,
    },

    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export function deleteArticle(id: string) {
  return prisma.knowledgeArticle.delete({
    where: {
      id,
    },
  });
}