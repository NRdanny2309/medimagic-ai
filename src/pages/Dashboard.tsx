import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  FileText, 
  ShoppingCart, 
  Activity,
  Users,
  TrendingUp,
  ChevronRight
} from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";

const Dashboard = () => {
  const modules = [
    {
      title: "Symptom Checker",
      description: "Get AI-powered insights into your symptoms and potential conditions",
      icon: Stethoscope,
      href: "/symptom-checker",
      color: "bg-medical-primary",
      stats: "85% accuracy"
    },
    {
      title: "Medical Report Analyzer",
      description: "Upload and analyze your medical reports with advanced AI",
      icon: FileText,
      href: "/report-analyzer",
      color: "bg-medical-secondary",
      stats: "OCR enabled"
    },
    {
      title: "Online Medicine Store",
      description: "Browse and order prescription and over-the-counter medicines",
      icon: ShoppingCart,
      href: "/medicine-store",
      color: "bg-medical-success",
      stats: "24/7 delivery"
    }
  ];

  const stats = [
    { label: "Active Users", value: "12,345", icon: Users, change: "+12%" },
    { label: "Reports Analyzed", value: "8,901", icon: FileText, change: "+18%" },
    { label: "Symptom Checks", value: "15,678", icon: Activity, change: "+25%" },
    { label: "Orders Placed", value: "3,456", icon: TrendingUp, change: "+8%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge variant="secondary" className="mb-6">
              AI-Powered Healthcare Platform
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Your Health,{" "}
              <span className="text-white/90">Our Intelligence</span>
            </h1>
            <p className="mt-6 text-xl text-white/80 max-w-2xl">
              Experience the future of healthcare with AI-assisted symptom checking, 
              medical report analysis, and seamless medicine ordering.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button size="lg" variant="secondary" className="shadow-large">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-medical-success">
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Comprehensive Health Modules
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Access powerful AI-driven tools designed to enhance your healthcare experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Card 
                  key={module.title} 
                  className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`h-12 w-12 rounded-lg ${module.color} flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="outline">{module.stats}</Badge>
                    </div>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                    <CardDescription className="text-base">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={module.href}>
                      <Button className="w-full group-hover:bg-primary/90">
                        Access Module
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Join thousands of users who trust AI Health Hub for their healthcare needs
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button size="lg" variant="secondary">
              Create Account
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;