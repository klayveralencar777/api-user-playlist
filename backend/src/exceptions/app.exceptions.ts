

export class AppException extends Error {
  constructor(
    public readonly statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "AppException";
  }
}


export class EntityNotFoundException extends AppException {
    constructor(message: string) {
        super(404, message);
    }
}

export class EmailAlreadyExists extends AppException {
    constructor(message: string) {
        super(409, message);
    }
}

export class UnauthorizedError extends AppException {
    constructor(message: string) {
        super(401, message);
    }
}

export class BusinessRuleExcetpion extends AppException {
    constructor(message: string) {
        super(422, message);
        
        }
}

