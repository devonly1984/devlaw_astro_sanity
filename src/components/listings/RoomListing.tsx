import type { Room } from "@/lib/types";
import { EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
interface RoomListingProps {
  room: Room;
}

const RoomListing = ({ room }: RoomListingProps) => {
  return (
    <div className="mb-8 md:mb-0">
      <div className="group">
        <a
          href={`/room/${room.slug}`}
          className="relative overflow-hidden"
        >
          <EyeIcon
            size={34}
            className="invisible absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-60"></div>
          <img
            src={room.image.src}
            alt={room.name}
            className="rounded-tr-xl rounded-tl-xl"
          />
        </a>
      </div>

      <div className="relative bg-foreground p-4 text-background rounded-br-xl rounded-bl-xl">
        <div className="mb-2">
          <h2 className="mb-4 text-300 font-700">{room.name}</h2>
          <p className="mb-4 line-clamp-3 leading-[1.6]">
            {room.description}
          </p>
        </div>
      </div>
      <Button asChild className="font-600 w-full h-11">
        <a href={`/rooms/${room.slug}`}>Book Now</a>
      </Button>
    </div>
  );
};

export default RoomListing;
