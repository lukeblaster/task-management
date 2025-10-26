import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const NotFound = () => {
  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-bold">404</h1>
        <p className="text-muted-foreground">Ops, página não encontrada.</p>
        <Link to="/login">
          <Button>Voltar à segurança</Button>
        </Link>
      </div>
    </>
  );
};
