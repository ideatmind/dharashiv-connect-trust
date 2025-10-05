import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlassNavbar from "./components/GlassNavbar";
import Index from "./pages/Index";
import CategoryListing from "./pages/CategoryListing";
import ProviderProfile from "./pages/ProviderProfile";
import SearchResults from "./pages/SearchResults";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GlassNavbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:category" element={<CategoryListing />} />
          <Route path="/provider/:id" element={<ProviderProfile />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
