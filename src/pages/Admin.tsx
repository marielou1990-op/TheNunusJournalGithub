import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminReviews from "@/components/admin/AdminReviews";
import AdminAnnouncements from "@/components/admin/AdminAnnouncements";
import AdminShipping from "@/components/admin/AdminShipping";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminDiscounts from "@/components/admin/AdminDiscounts";
import AdminSettings from "@/components/admin/AdminSettings";

const Admin = () => {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid grid-cols-3 lg:grid-cols-9 gap-2 h-auto">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="discounts">Discounts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <AdminProducts />
        </TabsContent>

        <TabsContent value="orders">
          <AdminOrders />
        </TabsContent>

        <TabsContent value="reviews">
          <AdminReviews />
        </TabsContent>

        <TabsContent value="announcements">
          <AdminAnnouncements />
        </TabsContent>

        <TabsContent value="shipping">
          <AdminShipping />
        </TabsContent>

        <TabsContent value="analytics">
          <AdminAnalytics />
        </TabsContent>

        <TabsContent value="blog">
          <AdminBlog />
        </TabsContent>

        <TabsContent value="discounts">
          <AdminDiscounts />
        </TabsContent>

        <TabsContent value="settings">
          <AdminSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
