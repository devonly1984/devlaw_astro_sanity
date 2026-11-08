import type { Room } from "@/lib/types";
import { cn, formatPrice, getNumberofDays } from "@/lib/utils";
import { useState, type ChangeEvent } from "react";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
interface ReservationProps {
  room: Room;
}
interface BookingData {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  roomCategory: string;
  noOfRooms: number;
  adults: number;
  children: number;
}
const Reservation = ({ room }: ReservationProps) => {
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: undefined,
    checkOut: undefined,
    roomCategory: room.category,
    noOfRooms: 1,
    adults: 1,
    children: 0,
  });
  const handleCheckOutChange = (date: Date | undefined) => {
    if (!date) {
      setBookingData((prev) => ({
        ...prev,
        checkOut: undefined,
      }));
      return;
    }
    //normalize date to UTC
    const UTCDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0,
      ),
    );
    setBookingData((prev) => ({
      ...prev,
      checkOut: UTCDate,
    }));
  };
  const handleCheckInChange = (date: Date | undefined) => {
    if (!date) {
      setBookingData((prev) => ({
        ...prev,
        checkIn: undefined,
      }));
      return;
    }
    //normalize date to UTC
    const UTCDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0,
      ),
    );
    setBookingData((prev) => ({
      ...prev,
      checkIn: UTCDate,
    }));
  };
  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: parseInt(value, 10),
    }));
  };
  const numberOfDays = getNumberofDays(
    bookingData.checkIn,
    bookingData.checkOut,
  );

  const totalPrice =
    room.price * bookingData.noOfRooms * (numberOfDays ?? 0);
  const discountPrice = totalPrice * (room.discount / 100);
  const totalPriceWithDiscount = totalPrice - discountPrice;
  return (
    <section className="mt-10 md:mt-0">
      <form
        onSubmit={() => {}}
        className="bg-card-foreground text-background rounded-lg px-6 pt-8 pb-6"
      >
        <div className="relative mb-4 flex items-center justify-between after:bg-primary after:absolute after:bottom-0.5 after:h-0.75 after:w-full after:content-[' ']">
          <h5 className="font-500 text-300">Reserve:</h5>
          <p className="text-300 font-600">{formatPrice(room.price)}</p>
        </div>
        <p className="mb-6">
          The check-in time is at 12:00PM, and the checkout time is at
          11:59AM. If you happen to forget your belongings, kindly get in
          touch with the receptionist.
        </p>
        <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          <div className="">
            <Label className="mb-2">Check In</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start overflow-hidden text-left font-normal",
                    !bookingData.checkIn && "text-background",
                  )}
                >
                  <CalendarIcon />
                  {bookingData.checkIn ? (
                    format(bookingData.checkIn, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={bookingData.checkIn}
                  onSelect={handleCheckInChange}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="">
            <Label className="mb-2">Check Out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start overflow-hidden text-left font-normal",
                    !bookingData.checkOut && "text-background",
                  )}
                >
                  <CalendarIcon />
                  {bookingData.checkOut ? (
                    format(bookingData.checkOut, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={bookingData.checkOut}
                  onSelect={handleCheckOutChange}
                  disabled={(date) => {
                    return (
                      date < new Date() ||
                      (bookingData.checkIn
                        ? date <= bookingData.checkIn
                        : false)
                    );
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Rooms</Label>
            <Select>
              <SelectTrigger className="data-placeholder:text-background w-full dark:bg-transparent dark:hover:bg-transparent">
                <SelectValue
                  className="capitalize"
                  placeholder={room.category}
                />
                <SelectContent>
                  <SelectItem value={room.category}>
                    {room.category}
                  </SelectItem>
                </SelectContent>
              </SelectTrigger>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>No of Rooms</Label>
            <Input
              type="number"
              name="noOfRooms"
              className="dark:bg-transparent dark:hover:bg-transparent"
              max={4}
              min={1}
              value={bookingData.noOfRooms}
              onChange={handleNumberChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Adults</Label>
            <Input
              type="number"
              name="adult"
              className="dark:bg-transparent dark:hover:bg-transparent"
              max={4}
              min={1}
              value={bookingData.adults}
              onChange={handleNumberChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Children</Label>
            <Input
              type="number"
              name="children"
              className="dark:bg-transparent dark:hover:bg-transparent"
              max={4}
              min={0}
              value={bookingData.children}
              onChange={handleNumberChange}
            />
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2 ">
            {room.discount > 0 && totalPrice > 0 ? (
              <>
                <p className="font-600 line-through text-200">
                  {formatPrice(totalPrice)}
                </p>
                <p className="font-600 text-200">
                  {formatPrice(totalPriceWithDiscount)}
                </p>
              </>
            ) : (
              <>
                <p className="font-600 text-200">
                  {formatPrice(totalPriceWithDiscount)}
                </p>
              </>
            )}
          </div>
          <p className="text-200 font-600">
            Applied {room.discount}% discount
          </p>
        </div>
        <Button className="mt-8 w-full" type="submit">
          Book Now
        </Button>
      </form>
    </section>
  );
};

export default Reservation;
