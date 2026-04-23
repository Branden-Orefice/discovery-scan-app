import {useAuth} from "#/context/AuthContext.tsx";
import toast from "react-hot-toast";
import {AppToast} from "#/components/Toasts.tsx";
import {EllipsisVerticalIcon, LogOutIcon} from "lucide-react";
import {useState} from "react";

const DashboardUser = () => {
  const {session, signOut} = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error handling sign-out:", error)
      toast.custom((t) => (
        <AppToast
          t={t}
          variant="error"
          title="Error Signing Out"
          description={`Error in attempt to sign out user: ${session?.user.name}. Please try again.`}
        />
      ))
    }
  }

  const displayEmail = session?.user.email;
  const displayName = session?.user.name;
  const displayImage = session?.user.image;

  return (
    <div className="flex items-center gap-2 w-full">
      <img src={displayImage ?? undefined} alt={displayName} className="size-8 rounded-md shrink-0 border border-border" />
      <div className="flex flex-1 items-center justify-between min-w-0">
        <div className="flex flex-col min-w-0 leading-tight">
          <span className="truncate font-semibold text-foreground text-sm">
            {displayName}
          </span>
          <span className="truncate text-[10px] text-muted-foreground">
            {displayEmail}
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <EllipsisVerticalIcon className="size-3.5" />
          </button>

          {isMenuOpen && (
            <div className="absolute -top-1.5 left-5 z-50 ml-2 w-32 rounded-md border border-border bg-popover p-1 shadow-md animate-in fade-in zoom-in slide-in-from-left-2 duration-100">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOutIcon className="size-3.5" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardUser;