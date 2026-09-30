import type {
  NextFunction,
  Request,
  Response,
} from 'express';

import { articleSchema } from '../schemas/article.schema.js';

import {
  createNewArticle,
  getArticle,
  getArticles,
  removeArticle,
  updateExistingArticle,
} from '../services/article.service.js';

export async function listArticlesController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const search =
      typeof req.query.search === 'string'
        ? req.query.search
        : undefined;

    const category =
      typeof req.query.category === 'string'
        ? req.query.category
        : undefined;

    const articles = await getArticles(
      search,
      category,
    );

    res.json({
      success: true,
      data: articles,
    });
  } catch (error) {
    next(error);
  }
}

export async function getArticleController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const article = await getArticle(
      String(req.params.id),
    );

    if (!article) {
      res.status(404).json({
        success: false,
        message: 'Article not found',
      });
      return;
    }

    res.json({
      success: true,
      data: article,
    });
  } catch (error) {
    next(error);
  }
}

export async function createArticleController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed = articleSchema.safeParse(
      req.body,
    );

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid article data',
        errors:
          parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const article = await createNewArticle(
      parsed.data,
      req.user!.id,
    );

    res.status(201).json({
      success: true,
      data: article,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateArticleController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed = articleSchema.safeParse(
      req.body,
    );

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid article data',
        errors:
          parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const article =
      await updateExistingArticle(
        String(req.params.id),
        parsed.data,
      );

    res.json({
      success: true,
      data: article,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteArticleController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await removeArticle(
      String(req.params.id),
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
