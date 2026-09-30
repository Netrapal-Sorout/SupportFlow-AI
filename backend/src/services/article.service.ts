import { createArticle, deleteArticle, findAllArticles, findArticleById, updateArticle } from '../repositories/article.repository.js';
import type { ArticleInput } from '../schemas/article.schema.js';
export const getArticles = (search?: string, category?: string) => findAllArticles(search, category);
export const getArticle = (id: string) => findArticleById(id);
export const createNewArticle = (data: ArticleInput, authorId: string) => createArticle(data, authorId);
export const updateExistingArticle = (id: string, data: ArticleInput) => updateArticle(id, data);
export const removeArticle = (id: string) => deleteArticle(id);
