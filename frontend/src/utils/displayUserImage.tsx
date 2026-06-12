import * as React from "react";
import {CircleUserRound} from "lucide-react";
import {useAuth} from "#/context/AuthContext.tsx";

 const displayUserImage = (): React.ReactNode => {
  const {session} = useAuth()
  const source = session?.user.image ?? null;
  if (source) {
    return (
      <img
        alt="user"
    src={source}
    className="size-full rounded-lg object-cover border border-border"
      />
  );
  }
  return (
    <div className="size-full rounded-lg bg-muted flex items-center justify-center border border-border">
    <CircleUserRound className="size-1/2 text-muted-foreground" />
      </div>
  );
}

export default displayUserImage;