import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { BookingCard, BookingStatus } from "@/components/dashboard/BookingCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarClock, Bed, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import bookingsData from "@/data/bookings.json";

// ✅ Define `Booking` interface using `BookingStatus`
interface Booking {
  id: string;
  guestName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  guestCount: number;
}

// ✅ Dashboard Stats
const statsData = [
  {
    title: "Total Bookings",
    value: 128,
    change: "+12.5%",
    icon: CalendarClock,
    positive: true,
  },
  {
    title: "Available Rooms",
    value: 42,
    change: "-5.2%",
    icon: Bed,
    positive: false,
  },
  {
    title: "Current Guests",
    value: 86,
    change: "+8.3%",
    icon: Users,
    positive: true,
  },
  {
    title: "Revenue",
    value: "$24,680",
    change: "+16.7%",
    icon: TrendingUp,
    positive: true,
  },
];

const Dashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Simulate API fetch with a delay
    const timer = setTimeout(() => {
      setBookings(
        bookingsData.map((booking) => ({
          ...booking,
          status: booking.status as BookingStatus, // ✅ Convert string to `BookingStatus`
        }))
      );
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-6 text-primary">
              Dashboard
            </h1>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsData.map((stat, index) => (
                <Card
                  key={index}
                  className="glass shadow-lg transition-transform hover:scale-105"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-semibold text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <p
                      className={`text-xs ${
                        stat.positive
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      } flex items-center mt-1`}
                    >
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Recent Bookings
            </h2>

            {/* Loading Skeleton Effect */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <Card
                    key={item}
                    className="w-full h-[200px] animate-pulse bg-muted/50 rounded-lg shadow-md"
                  >
                    <div className="h-full bg-muted/50"></div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    id={booking.id}
                    guestName={booking.guestName}
                    roomNumber={booking.roomNumber}
                    checkIn={booking.checkIn}
                    checkOut={booking.checkOut}
                    status={booking.status}
                    guestCount={booking.guestCount}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
