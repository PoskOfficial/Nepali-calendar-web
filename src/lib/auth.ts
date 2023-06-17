import { NextFunction, Request, Response } from "express";
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // User is authenticated, proceed to the next middleware
    return next();
  }

  // User is not authenticated, redirect to login page
  res.redirect("/api/auth/google");
};

export default isAuthenticated;
