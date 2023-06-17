import { NextFunction, Request, Response } from 'express';
import {AnyZodObject} from 'zod'

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body, params, query } = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    req = Object.assign({
		body,
		params,
		query
	}, req);
    next();
  } catch (err) {
    return res.status(400).send(err);
  }
};