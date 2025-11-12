import { useAuth } from "@/lib/auth-context";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Star, User } from "lucide-react";

const Account = () => {
  const { user, isLoading, signOut } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Account</h1>
        <Button variant="outline" onClick={signOut}>Sign Out</Button>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList>
          <TabsTrigger value="orders">
            <Package className="w-4 h-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="reviews">
            <Star className="w-4 h-4 mr-2" />
            Reviews
          </TabsTrigger>
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View and track your orders</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No orders yet. Start shopping!</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>My Reviews</CardTitle>
              <CardDescription>Reviews you've written for purchased products</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">You haven't written any reviews yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-muted-foreground">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Role</p>
                <p className="text-muted-foreground capitalize">{user.role}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
