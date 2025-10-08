import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type  { Request, Response, NextFunction } from 'express';

export const validateDto = (DtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(DtoClass, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      const msgs = errors.flatMap(e => Object.values(e.constraints ?? {}));
      return res.status(400).json({ errors: msgs });
    }
    req.body = dto;
    next();
  };
};
