import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, DollarSign, Package, Users } from 'lucide-react';

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€2,453.50</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€17.28</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>Best performing products this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Coffee Time Sticker Set', sales: 45, revenue: '€562.50' },
              { name: 'Cozy Autumn Collection', sales: 38, revenue: '€475.00' },
              { name: 'Daily ToDo Planner Pack', sales: 32, revenue: '€400.00' },
              { name: 'Field Notes - Nature', sales: 28, revenue: '€350.00' },
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                </div>
                <div className="font-semibold">{product.revenue}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders by Country</CardTitle>
          <CardDescription>Geographic distribution of sales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { country: 'Cyprus', orders: 52, percentage: 36.6 },
              { country: 'Greece', orders: 34, percentage: 23.9 },
              { country: 'United Kingdom', orders: 28, percentage: 19.7 },
              { country: 'Germany', orders: 18, percentage: 12.7 },
              { country: 'Other', orders: 10, percentage: 7.1 },
            ].map((data, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{data.country}</span>
                  <span className="text-muted-foreground">{data.orders} orders ({data.percentage}%)</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
