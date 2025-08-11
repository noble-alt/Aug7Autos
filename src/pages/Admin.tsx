import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Wrench, FileText, Users, LogOut, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  description?: string;
  status: string;
  image_url?: string;
  specifications?: any;
}

interface MobilOil {
  id: string;
  name: string;
  type: string;
  viscosity: string;
  volume: string;
  description?: string;
  image_url?: string;
  benefits?: string[];
  in_stock: boolean;
  category: string;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  published: boolean;
  image_url?: string;
  tags?: string[];
  slug: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Data states
  const [cars, setCars] = useState<Car[]>([]);
  const [mobilOils, setMobilOils] = useState<MobilOil[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  
  // Dialog states
  const [isCarDialogOpen, setIsCarDialogOpen] = useState(false);
  const [isOilDialogOpen, setIsOilDialogOpen] = useState(false);
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    // Check if admin is already authenticated (using localStorage for session)
    const isLoggedIn = localStorage.getItem('aug7_admin_authenticated') === 'true';
    setIsAuthenticated(isLoggedIn);
    setLoading(false);
    
    if (isLoggedIn) {
      fetchData();
    }
  };

  const fetchData = async () => {
    try {
      const [carsResponse, oilsResponse, blogsResponse] = await Promise.all([
        supabase.from('cars').select('*').order('created_at', { ascending: false }),
        supabase.from('mobil_oils').select('*').order('created_at', { ascending: false }),
        supabase.from('blogs').select('*').order('created_at', { ascending: false })
      ]);

      if (carsResponse.data) setCars(carsResponse.data);
      if (oilsResponse.data) setMobilOils(oilsResponse.data);
      if (blogsResponse.data) setBlogs(blogsResponse.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch data"
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simple credential check for Aug7Autos admin
      if (username === 'Aug7-autos' && password === 'Aug7autos') {
        localStorage.setItem('aug7_admin_authenticated', 'true');
        setIsAuthenticated(true);
        toast({
          title: "Success",
          description: "Logged in successfully"
        });
        fetchData();
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid credentials"
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during login"
      });
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('aug7_admin_authenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleDelete = async (table: 'cars' | 'mobil_oils' | 'blogs', id: string) => {
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Item deleted successfully"
      });
      
      fetchData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete item"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-electric-red"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-electric-red to-electric-red-dark rounded-full flex items-center justify-center mb-4">
              <Car className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Aug7Autos Admin</CardTitle>
            <CardDescription>Sign in to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
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
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-electric-red" />
              <h1 className="text-xl font-bold">Aug7Autos Admin</h1>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="text-white hover:text-electric-red">
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="cars" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cars" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Cars
            </TabsTrigger>
            <TabsTrigger value="oils" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Mobil Oils
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Blogs
            </TabsTrigger>
          </TabsList>

          {/* Cars Tab */}
          <TabsContent value="cars">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Cars</h2>
                <Dialog open={isCarDialogOpen} onOpenChange={setIsCarDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingItem(null)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Car
                    </Button>
                  </DialogTrigger>
                  <CarDialog 
                    car={editingItem} 
                    onClose={() => {
                      setIsCarDialogOpen(false);
                      setEditingItem(null);
                      fetchData();
                    }} 
                  />
                </Dialog>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cars.map((car) => (
                  <Card key={car.id}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span>{car.name}</span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingItem(car);
                              setIsCarDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete('cars', car.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardTitle>
                      <CardDescription>{car.brand} {car.model} ({car.year})</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {car.image_url && (
                        <img src={car.image_url} alt={car.name} className="w-full h-32 object-cover rounded mb-3" />
                      )}
                      <p className="text-sm text-muted-foreground mb-2">{car.description}</p>
                      <p className="text-sm font-medium">Status: {car.status}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Similar structure for oils and blogs tabs */}
          <TabsContent value="oils">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Mobil Oils</h2>
                <Dialog open={isOilDialogOpen} onOpenChange={setIsOilDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingItem(null)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Oil
                    </Button>
                  </DialogTrigger>
                  <OilDialog 
                    oil={editingItem} 
                    onClose={() => {
                      setIsOilDialogOpen(false);
                      setEditingItem(null);
                      fetchData();
                    }} 
                  />
                </Dialog>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mobilOils.map((oil) => (
                  <Card key={oil.id}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span>{oil.name}</span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingItem(oil);
                              setIsOilDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete('mobil_oils', oil.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardTitle>
                      <CardDescription>{oil.type} - {oil.viscosity}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {oil.image_url && (
                        <img src={oil.image_url} alt={oil.name} className="w-full h-32 object-cover rounded mb-3" />
                      )}
                      <p className="text-sm text-muted-foreground mb-2">{oil.description}</p>
                      <p className="text-sm font-medium">Volume: {oil.volume}</p>
                      <p className="text-sm font-medium">In Stock: {oil.in_stock ? 'Yes' : 'No'}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="blogs">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Blogs</h2>
                <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingItem(null)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Blog
                    </Button>
                  </DialogTrigger>
                  <BlogDialog 
                    blog={editingItem} 
                    onClose={() => {
                      setIsBlogDialogOpen(false);
                      setEditingItem(null);
                      fetchData();
                    }} 
                  />
                </Dialog>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                  <Card key={blog.id}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span className="text-sm">{blog.title}</span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingItem(blog);
                              setIsBlogDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete('blogs', blog.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardTitle>
                      <CardDescription>By {blog.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {blog.image_url && (
                        <img src={blog.image_url} alt={blog.title} className="w-full h-32 object-cover rounded mb-3" />
                      )}
                      <p className="text-sm text-muted-foreground mb-2">{blog.excerpt}</p>
                      <p className="text-sm font-medium">Published: {blog.published ? 'Yes' : 'No'}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Dialog Components
const CarDialog = ({ car, onClose }: { car?: Car; onClose: () => void }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: car?.name || '',
    brand: car?.brand || '',
    model: car?.model || '',
    year: car?.year || new Date().getFullYear(),
    description: car?.description || '',
    status: car?.status || 'available',
    image_url: car?.image_url || '',
    price: 0 // Default price since it's required but not shown
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (car) {
        const { error } = await supabase
          .from('cars')
          .update(formData)
          .eq('id', car.id);
        if (error) throw error;
        toast({ title: "Success", description: "Car updated successfully" });
      } else {
        const { error } = await supabase
          .from('cars')
          .insert([formData]);
        if (error) throw error;
        toast({ title: "Success", description: "Car created successfully" });
      }
      onClose();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save car" });
    }
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>{car ? 'Edit Car' : 'Add New Car'}</DialogTitle>
        <DialogDescription>
          {car ? 'Update car information' : 'Add a new car to the inventory'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>
        <DialogFooter>
          <Button type="submit">{car ? 'Update' : 'Create'}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

const OilDialog = ({ oil, onClose }: { oil?: MobilOil; onClose: () => void }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: oil?.name || '',
    type: oil?.type || '',
    viscosity: oil?.viscosity || '',
    volume: oil?.volume || '',
    description: oil?.description || '',
    image_url: oil?.image_url || '',
    in_stock: oil?.in_stock ?? true,
    category: oil?.category || 'engine oil',
    price: 0 // Default price since it's required but not shown
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (oil) {
        const { error } = await supabase
          .from('mobil_oils')
          .update(formData)
          .eq('id', oil.id);
        if (error) throw error;
        toast({ title: "Success", description: "Oil updated successfully" });
      } else {
        const { error } = await supabase
          .from('mobil_oils')
          .insert([formData]);
        if (error) throw error;
        toast({ title: "Success", description: "Oil created successfully" });
      }
      onClose();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save oil" });
    }
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>{oil ? 'Edit Oil' : 'Add New Oil'}</DialogTitle>
        <DialogDescription>
          {oil ? 'Update oil information' : 'Add a new oil to the inventory'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engine oil">Engine Oil</SelectItem>
              <SelectItem value="brake oil">Brake Oil</SelectItem>
              <SelectItem value="coolant">Coolant</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="viscosity">Viscosity</Label>
            <Input
              id="viscosity"
              value={formData.viscosity}
              onChange={(e) => setFormData({ ...formData, viscosity: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="volume">Volume</Label>
          <Input
            id="volume"
            value={formData.volume}
            onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="in_stock"
            checked={formData.in_stock}
            onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
            className="rounded"
          />
          <Label htmlFor="in_stock">In Stock</Label>
        </div>
        <DialogFooter>
          <Button type="submit">{oil ? 'Update' : 'Create'}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

const BlogDialog = ({ blog, onClose }: { blog?: Blog; onClose: () => void }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    content: blog?.content || '',
    excerpt: blog?.excerpt || '',
    author: blog?.author || '',
    slug: blog?.slug || '',
    image_url: blog?.image_url || '',
    published: blog?.published ?? false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      };

      if (blog) {
        const { error } = await supabase
          .from('blogs')
          .update(submitData)
          .eq('id', blog.id);
        if (error) throw error;
        toast({ title: "Success", description: "Blog updated successfully" });
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([submitData]);
        if (error) throw error;
        toast({ title: "Success", description: "Blog created successfully" });
      }
      onClose();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save blog" });
    }
  };

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{blog ? 'Edit Blog' : 'Add New Blog'}</DialogTitle>
        <DialogDescription>
          {blog ? 'Update blog post' : 'Create a new blog post'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="Auto-generated if empty"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={6}
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="rounded"
          />
          <Label htmlFor="published">Published</Label>
        </div>
        <DialogFooter>
          <Button type="submit">{blog ? 'Update' : 'Create'}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default Admin;