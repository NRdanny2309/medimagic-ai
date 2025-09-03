import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  ShoppingCart, 
  Star, 
  Plus, 
  Minus,
  Filter,
  Pill,
  Shield,
  Truck,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MedicineStore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  // Sample medicine data - in real app, this would come from Supabase
  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "pain-relief",
      price: 12.99,
      originalPrice: 15.99,
      rating: 4.5,
      reviews: 234,
      inStock: true,
      prescription: false,
      description: "Effective pain relief and fever reducer",
      manufacturer: "PharmaCorp",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Ibuprofen 400mg",
      category: "pain-relief",
      price: 18.50,
      rating: 4.3,
      reviews: 189,
      inStock: true,
      prescription: false,
      description: "Anti-inflammatory pain reliever",
      manufacturer: "MediCare Ltd",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Vitamin D3 1000 IU",
      category: "vitamins",
      price: 24.99,
      rating: 4.7,
      reviews: 445,
      inStock: true,
      prescription: false,
      description: "Essential vitamin D supplement",
      manufacturer: "VitaHealth",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Amoxicillin 250mg",
      category: "antibiotics",
      price: 32.00,
      rating: 4.4,
      reviews: 167,
      inStock: true,
      prescription: true,
      description: "Broad-spectrum antibiotic",
      manufacturer: "MediCore",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Multivitamin Complex",
      category: "vitamins",
      price: 29.99,
      originalPrice: 34.99,
      rating: 4.6,
      reviews: 312,
      inStock: true,
      prescription: false,
      description: "Complete daily vitamin supplement",
      manufacturer: "NutriLife",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Cough Syrup",
      category: "cold-flu",
      price: 16.75,
      rating: 4.2,
      reviews: 156,
      inStock: false,
      prescription: false,
      description: "Soothing cough relief syrup",
      manufacturer: "CoughCare",
      image: "/placeholder.svg"
    }
  ];

  const categories = [
    { id: "all", name: "All Medicines", count: medicines.length },
    { id: "pain-relief", name: "Pain Relief", count: 2 },
    { id: "vitamins", name: "Vitamins", count: 2 },
    { id: "antibiotics", name: "Antibiotics", count: 1 },
    { id: "cold-flu", name: "Cold & Flu", count: 1 }
  ];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (medicineId: number) => {
    const medicine = medicines.find(m => m.id === medicineId);
    if (medicine?.prescription) {
      toast({
        title: "Prescription Required",
        description: "This medicine requires a valid prescription. Please consult your doctor.",
        variant: "destructive",
      });
      return;
    }
    
    setCart(prev => ({
      ...prev,
      [medicineId]: (prev[medicineId] || 0) + 1
    }));
    
    toast({
      title: "Added to Cart",
      description: `${medicine?.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (medicineId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[medicineId] > 1) {
        newCart[medicineId]--;
      } else {
        delete newCart[medicineId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [id, count]) => {
      const medicine = medicines.find(m => m.id === parseInt(id));
      return total + (medicine?.price || 0) * count;
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
          <Pill className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Online Medicine Store</h1>
        <p className="text-muted-foreground text-lg">
          Order prescription and over-the-counter medicines with fast delivery
        </p>
      </div>

      {/* Features Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
          <Shield className="h-8 w-8 text-medical-success" />
          <div>
            <p className="font-semibold">100% Authentic</p>
            <p className="text-sm text-muted-foreground">Licensed pharmacy</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
          <Truck className="h-8 w-8 text-medical-primary" />
          <div>
            <p className="font-semibold">Fast Delivery</p>
            <p className="text-sm text-muted-foreground">Same day delivery</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
          <Clock className="h-8 w-8 text-medical-secondary" />
          <div>
            <p className="font-semibold">24/7 Support</p>
            <p className="text-sm text-muted-foreground">Expert consultation</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64 space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search medicines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-muted transition-colors ${
                      selectedCategory === category.id ? "bg-primary text-primary-foreground" : ""
                    }`}
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary">{category.count}</Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cart Summary */}
          {getTotalItems() > 0 && (
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Cart ({getTotalItems()})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {Object.entries(cart).map(([id, count]) => {
                    const medicine = medicines.find(m => m.id === parseInt(id));
                    return medicine ? (
                      <div key={id} className="flex items-center justify-between text-sm">
                        <span className="truncate flex-1 mr-2">{medicine.name}</span>
                        <span>{count}x</span>
                      </div>
                    ) : null;
                  })}
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  Checkout
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {selectedCategory === "all" ? "All Medicines" : categories.find(c => c.id === selectedCategory)?.name}
              <span className="text-muted-foreground ml-2">({filteredMedicines.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMedicines.map(medicine => (
              <Card key={medicine.id} className="group hover:shadow-medium transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{medicine.name}</CardTitle>
                      <CardDescription className="mt-1">{medicine.manufacturer}</CardDescription>
                    </div>
                    {medicine.prescription && (
                      <Badge variant="outline" className="ml-2">Rx</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">{medicine.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({medicine.reviews})</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {medicine.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">${medicine.price}</span>
                      {medicine.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${medicine.originalPrice}
                        </span>
                      )}
                    </div>
                    <Badge variant={medicine.inStock ? "secondary" : "outline"}>
                      {medicine.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    {cart[medicine.id] ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(medicine.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold px-3">{cart[medicine.id]}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addToCart(medicine.id)}
                          disabled={!medicine.inStock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="flex-1"
                        onClick={() => addToCart(medicine.id)}
                        disabled={!medicine.inStock}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMedicines.length === 0 && (
            <div className="text-center py-12">
              <Pill className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No medicines found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineStore;