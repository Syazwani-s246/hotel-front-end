import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { BsApple } from "react-icons/bs"; // Apple icon

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg animate-slide-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Sign in
        </CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="input-glow"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary/90 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  className="input-glow"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full btn-gradient" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>

        {/* Divider with wording above */}
        <div className="relative">
          <div className="relative flex justify-center text-xs uppercase mb-2">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <div className="absolute flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>


        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="btn-google w-full flex items-center justify-center gap-2">
            <FcGoogle className="h-5 w-5" />
            Google
          </Button>
          <Button className="btn-apple w-full flex items-center justify-center gap-2">
            <BsApple className="h-5 w-5" />
            Apple
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <div
          className="text-sm text-center text-muted-foreground"
          style={{
            fontWeight: 500,
            letterSpacing: "0.5px",
            paddingTop: "8px",
            paddingBottom: "8px",
            borderTop: "1px solid rgba(0, 0, 0, 0.1)", // subtle divider
          }}
        >
          Don’t have an account?{" "}
          <a
            href="#"
            className="text-primary underline-offset-4 hover:underline"
            style={{
              fontWeight: 600,
              color: "hsl(220, 90%, 55%)", // Brighter primary color
            }}
          >
            Sign up
          </a>
        </div>
      </CardFooter>

    </Card>
  );
}
