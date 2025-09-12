// Este arquivo de declaração é usado para estender o tipo Request do Express.
// Ele adiciona a propriedade 'user', que é anexada pelo nosso 'authMiddleware'.
// Isso torna a propriedade disponível em toda a aplicação sem erros do TypeScript.

declare global {
  namespace Express {
    export interface Request {
      user?: { username: string };
    }
  }
}

export {};