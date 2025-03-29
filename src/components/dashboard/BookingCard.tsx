
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Users, DoorOpen, Clock, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export type BookingStatus = "confirmed" | "checked-in" | "checked-out" | "canceled";

interface BookingCardProps {
  id: string;
  guestName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  guestCount: number;
  className?: string;
}

export function BookingCard({
  id,
  guestName,
  roomNumber,
  checkIn,
  checkOut,
  status,
  guestCount,
  className,
}: BookingCardProps) {
  const [currentStatus, setCurrentStatus] = useState<BookingStatus>(status);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric"
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const statusColors: Record<BookingStatus, { bgColor: string; textColor: string }> = {
    "confirmed": { bgColor: "bg-blue-100 dark:bg-blue-900/30", textColor: "text-blue-600 dark:text-blue-400" },
    "checked-in": { bgColor: "bg-green-100 dark:bg-green-900/30", textColor: "text-green-600 dark:text-green-400" },
    "checked-out": { bgColor: "bg-purple-100 dark:bg-purple-900/30", textColor: "text-purple-600 dark:text-purple-400" },
    "canceled": { bgColor: "bg-red-100 dark:bg-red-900/30", textColor: "text-red-600 dark:text-red-400" }
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-lg", className)}>
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg tracking-tight">{guestName}</h3>
          <p className="text-sm text-muted-foreground">Booking #{id.slice(0, 8)}</p>
        </div>
        <div className="flex items-center">
          <Badge
            variant="outline"
            className={cn(
              "font-medium capitalize",
              statusColors[currentStatus].bgColor,
              statusColors[currentStatus].textColor
            )}
          >
            {currentStatus.replace("-", " ")}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-1 h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setCurrentStatus("confirmed")}>
                Mark as Confirmed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentStatus("checked-in")}>
                Check In
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentStatus("checked-out")}>
                Check Out
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentStatus("canceled")}>
                Cancel Booking
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex items-center text-sm">
            <DoorOpen className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Room {roomNumber}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{guestCount} Guest{guestCount > 1 ? "s" : ""}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Check-in: {formatDate(checkIn)}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Check-out: {formatDate(checkOut)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-muted gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            View Details
          </Button>

          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            Manage
          </Button>
        </div>

      </CardContent>
    </Card>

  );
}
