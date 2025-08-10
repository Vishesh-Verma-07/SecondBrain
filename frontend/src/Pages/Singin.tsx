
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/authLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input2";
import { Label } from "../components/ui/label";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useToast } from "../hooks/useToast";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const URL = import.meta.env.VITE_BACKEND_URL;
  if (!URL) {
    console.error("VITE_BACKEND_URL is not defined in .env file");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    console.log("Submitting sign in form with email:", email);
    console.log("Submitting sign in form with password:", password);
    
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${URL}/api/v1/user/signin`, {
        email,
        password
      }, {withCredentials: true});
      console.log("Sign in response:", response);
      
      const data = response.data as { status?: number };
      const status = response.status;


      
      if(!data) {
        throw new Error("No response data");
      }

      console.log("Sign in response:", data);
      if(status === 200) {
        toast({
          title: "Success",
          description: "You have been signed in successfully",
        });
        
        navigate("/dashboard");
      } else {
        throw new Error("Unexpected response status");
      }
      
    } catch (error) {
      console.error("Error during sign in:", error);
      let errorMessage = "Failed to sign in into account";
      
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your SecondBrain account"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/signup"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </AuthLayout>
  );
}
