// backend/src/middleware/exception.middleware.ts
import { Request, Response, NextFunction } from "express";
import { AppException } from "../exceptions/app.exceptions.js";

export function exceptionMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
    
  if (err instanceof AppException) {
    return res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode
    });
  }

  
  if (err && typeof err === "object" && "code" in err) {
    const prismaError = err as { code: string; meta?: any };
    
    if (prismaError.code === "P2002") {
      return res.status(409).json({
        error: "Já existe um registro com esses dados",
        statusCode: 409
      });
    }
  }


  console.error("Erro não tratado:", err);
  
  return res.status(500).json({
    error: "Erro interno do servidor",
    statusCode: 500
  });
}