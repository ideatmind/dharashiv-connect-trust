import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";

interface Service {
  id: string;
  name: string;
}

interface Provider {
  id: string;
  name: string;
  photo_url: string;
  location: string;
  profession: string;
  experience_years: number;
  visiting_charge: number;
  phone: string;
  whatsapp: string | null;
  service_id: string;
}

const ProvidersManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProvider, setNewProvider] = useState({
    name: "",
    photo_url: "",
    location: "",
    profession: "",
    experience_years: 0,
    visiting_charge: 0,
    phone: "",
    whatsapp: "",
    service_id: "",
    keywords: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [servicesRes, providersRes] = await Promise.all([
      supabase.from("services").select("id, name"),
      supabase.from("service_providers").select("*").order("created_at", { ascending: false }),
    ]);

    if (servicesRes.error) {
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      });
    } else {
      setServices(servicesRes.data || []);
    }

    if (providersRes.error) {
      toast({
        title: "Error",
        description: "Failed to fetch providers",
        variant: "destructive",
      });
    } else {
      setProviders(providersRes.data || []);
    }

    setLoading(false);
  };

  const handleAddProvider = async (e: React.FormEvent) => {
    e.preventDefault();

    const keywordsArray = newProvider.keywords.split(",").map((k) => k.trim()).filter(Boolean);

    const { error } = await supabase.from("service_providers").insert([
      {
        ...newProvider,
        keywords: keywordsArray,
        whatsapp: newProvider.whatsapp || null,
      },
    ]);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Provider added successfully",
      });
      setNewProvider({
        name: "",
        photo_url: "",
        location: "",
        profession: "",
        experience_years: 0,
        visiting_charge: 0,
        phone: "",
        whatsapp: "",
        service_id: "",
        keywords: "",
      });
      fetchData();
    }
  };

  const handleDeleteProvider = async (id: string) => {
    const { error } = await supabase.from("service_providers").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Provider deleted successfully",
      });
      fetchData();
    }
  };

  if (loading) {
    return <p>Loading providers...</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Provider</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddProvider} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="provider-name">Name</Label>
                <Input
                  id="provider-name"
                  value={newProvider.name}
                  onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  value={newProvider.profession}
                  onChange={(e) => setNewProvider({ ...newProvider, profession: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service Category</Label>
                <Select
                  value={newProvider.service_id}
                  onValueChange={(value) => setNewProvider({ ...newProvider, service_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newProvider.location}
                  onChange={(e) => setNewProvider({ ...newProvider, location: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience (Years)</Label>
                <Input
                  id="experience"
                  type="number"
                  value={newProvider.experience_years}
                  onChange={(e) =>
                    setNewProvider({ ...newProvider, experience_years: parseInt(e.target.value) })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="charge">Visiting Charge (₹)</Label>
                <Input
                  id="charge"
                  type="number"
                  value={newProvider.visiting_charge}
                  onChange={(e) =>
                    setNewProvider({ ...newProvider, visiting_charge: parseInt(e.target.value) })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newProvider.phone}
                  onChange={(e) => setNewProvider({ ...newProvider, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp (Optional)</Label>
                <Input
                  id="whatsapp"
                  value={newProvider.whatsapp}
                  onChange={(e) => setNewProvider({ ...newProvider, whatsapp: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="photo">Photo URL</Label>
                <Input
                  id="photo"
                  value={newProvider.photo_url}
                  onChange={(e) => setNewProvider({ ...newProvider, photo_url: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input
                  id="keywords"
                  value={newProvider.keywords}
                  onChange={(e) => setNewProvider({ ...newProvider, keywords: e.target.value })}
                  placeholder="e.g., electrician, wiring, electrical"
                />
              </div>
            </div>
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              Add Provider
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Providers ({providers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={provider.photo_url}
                    alt={provider.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{provider.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {provider.profession} • {provider.experience_years} years • {provider.location}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ₹{provider.visiting_charge} • {provider.phone}
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteProvider(provider.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProvidersManager;
