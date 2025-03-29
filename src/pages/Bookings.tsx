
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { BookingCard, BookingStatus } from "@/components/dashboard/BookingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Plus } from "lucide-react";
import bookingsData from "@/data/bookings.json" ;




interface Booking {
  id: string;
  guestName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  guestCount: number;
}

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate API fetch with delay
    const timer = setTimeout(() => {
      setBookings(
        bookingsData.map((booking) => ({
          ...booking,
          status: booking.status as BookingStatus, // ✅ Convert `status` to `BookingStatus`
        }))
      );
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    // Filter by search query
    const matchesSearch = booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         booking.roomNumber.includes(searchQuery) ||
                         booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tab
    const matchesTab = activeTab === "all" || booking.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h1 className="text-3xl font-bold tracking-tight mb-4 sm:mb-0">Bookings</h1>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Button>
            </div>
            
            <div className="bg-card rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                <div className="w-full max-w-md relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search bookings..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  <TabsTrigger value="checked-in">Checked In</TabsTrigger>
                  <TabsTrigger value="checked-out">Checked Out</TabsTrigger>
                  <TabsTrigger value="canceled">Canceled</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="mt-0">
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="h-[250px] animate-pulse bg-muted/50 rounded-lg"></div>
                      ))}
                    </div>
                  ) : filteredBookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredBookings.map((booking) => (
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
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-muted-foreground">No bookings found matching your criteria</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Bookings;
