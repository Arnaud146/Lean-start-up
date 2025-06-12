import { Request, Response, NextFunction } from 'express';

export function validateMiddleware(req: Request, res: Response, next: NextFunction) {
  // TODO: Ajouter la validation avec Zod
  next();
} 