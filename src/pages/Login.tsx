
import { LoginForm } from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";

const Login = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background animate-fade-in">
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute top-4 right-4"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
      
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Hotel</h1>
          <p className="text-muted-foreground mt-2">Management Portal</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
