import { Avatar, AvatarFallback } from "./avatar";
import { Card, CardContent, CardFooter } from "./card";

export const MessageCard = () => (
  <>
    <div className="flex gap-1 items-top">
      <Avatar className="h-8">
        <AvatarFallback>LS</AvatarFallback>
      </Avatar>
      <div>
        <span className="text-sm font-semibold">Lucas Soares</span>
        <Card className="flex flex-col gap-0 bg-card py-1 px-0 *:px-4! *:py-1! w-fit">
          <CardContent className="px-1">
            <p className="text-sm">
              Eu acho que precisamos rever alguns pontos
            </p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            24/10/2025 - 12:43
          </CardFooter>
        </Card>
      </div>
    </div>
  </>
);
