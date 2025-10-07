import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


const Auth = () => {
  const [email, setEmail] = useState("admin@serviceprovider.com");
  const [password, setPassword] = useState("Admin@123");
  const [loading, setLoading] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminSetup = async () => {
      // Check if already logged in
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/admin");
        return;
      }

      // Check if admin account exists
      const { data } = await supabase
        .from('user_roles')
        .select('id')
        .eq('role', 'admin')
        .limit(1);
      
      setNeedsSetup(!data || data.length === 0);
      setChecking(false);
    };

    checkAdminSetup();
  }, [navigate]);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Admin account created! Logging you in...",
      });
      // Auto login after signup
      setTimeout(async () => {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (!signInError) {
          navigate("/admin");
        }
      }, 1000);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      navigate("/admin");
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-heading">
            {needsSetup ? "Setup Admin Account" : "Admin Login"}
          </CardTitle>
          <CardDescription>
            {needsSetup 
              ? "Create the admin account to get started" 
              : "Sign in to manage Dharashiv Seva services"}
          </CardDescription>
          <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg space-y-1">
            <p className="font-semibold text-foreground mb-2">Default Admin Credentials:</p>
            <p className="font-mono">Email: admin@serviceprovider.com</p>
            <p className="font-mono">Password: Admin@123</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={needsSetup ? handleSetup : handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={needsSetup}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={needsSetup}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading 
                ? (needsSetup ? "Creating Admin..." : "Signing in...") 
                : (needsSetup ? "Create Admin Account" : "Sign In to Admin Panel")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;