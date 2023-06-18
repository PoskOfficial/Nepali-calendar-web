import { NextFunction, Request, Response } from "express";
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // User is authenticated, proceed to the next middleware
    return next();
  }

  res.status(401).json({ message: "Unauthenticated" });
};

export default isAuthenticated;
