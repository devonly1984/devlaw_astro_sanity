import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useStore } from "@nanostores/react";
import { $userStore } from "@clerk/astro/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SignOutButton } from "@clerk/astro/react";
const Dashboard = () => {
    const user = useStore($userStore);
    if (!user) return null;
    const getUserInitials = ()=>{
      if (user.firstName && user.lastName) {
        return `${user.firstName[0]}${user.lastName[0]}.toUpperCase()`;
      } else if (user.firstName) {
        return `${user.firstName[0].toUpperCase()}`;
      } else if (user.username) {
        return `${user.username[0].toUpperCase()}`;
      }
      return;
    }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-8 translate-y-1 md:translate-y-0">
            <AvatarImage src={user.imageUrl} className="cursor-pointer" />
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-4 w-42.5" align="center">
          <DropdownMenuItem className="block w-fullcursor-pointer focus:bg-primary">
            <a href="account" className="w-full">
              Account
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem className="block w-full cursor-pointer focus:bg-primary">
            <a href="bookings" className="w-full">
              Bookings
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem className="block w-fullcursor-pointer focus:bg-primary">
            <SignOutButton
              redirectUrl={window.location.href}
              children="Logout"
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
export default Dashboard
