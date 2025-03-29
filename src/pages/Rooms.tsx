
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

const Rooms = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Rooms</h1>
            
            <div className="bg-card rounded-lg shadow p-6">
              <p className="text-center py-10 text-muted-foreground">Room management coming soon</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Rooms;
