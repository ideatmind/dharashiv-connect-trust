import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Phone, MessageCircle, TrendingUp } from "lucide-react";

interface ClickStats {
  provider_id: string;
  provider_name: string;
  call_clicks: number;
  whatsapp_clicks: number;
  total_clicks: number;
}

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState<ClickStats[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const { data: clicks, error } = await supabase
      .from("provider_clicks")
      .select(`
        provider_id,
        click_type,
        service_providers (
          name
        )
      `);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch analytics",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const statsMap = new Map<string, ClickStats>();

    clicks?.forEach((click: any) => {
      const providerId = click.provider_id;
      const providerName = click.service_providers?.name || "Unknown";

      if (!statsMap.has(providerId)) {
        statsMap.set(providerId, {
          provider_id: providerId,
          provider_name: providerName,
          call_clicks: 0,
          whatsapp_clicks: 0,
          total_clicks: 0,
        });
      }

      const stat = statsMap.get(providerId)!;
      if (click.click_type === "call") {
        stat.call_clicks++;
      } else if (click.click_type === "whatsapp") {
        stat.whatsapp_clicks++;
      }
      stat.total_clicks++;
    });

    const statsArray = Array.from(statsMap.values()).sort(
      (a, b) => b.total_clicks - a.total_clicks
    );

    setStats(statsArray);
    setTotalClicks(clicks?.length || 0);
    setLoading(false);
  };

  if (loading) {
    return <p>Loading analytics...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Clicks/Provider</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.length > 0 ? Math.round(totalClicks / stats.length) : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Click Statistics by Provider</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.map((stat) => (
              <div
                key={stat.provider_id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{stat.provider_name}</p>
                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {stat.call_clicks} calls
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {stat.whatsapp_clicks} WhatsApp
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{stat.total_clicks}</p>
                  <p className="text-sm text-muted-foreground">total clicks</p>
                </div>
              </div>
            ))}
            {stats.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No click data yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
