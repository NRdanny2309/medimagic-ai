import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Stethoscope, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      toast({
        title: "Please describe your symptoms",
        description: "Enter at least one symptom to get started",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call - replace with actual Supabase edge function
    setTimeout(() => {
      setResults({
        primaryConditions: [
          { name: "Common Cold", probability: 78, severity: "low" },
          { name: "Seasonal Allergies", probability: 65, severity: "low" },
          { name: "Viral Infection", probability: 45, severity: "medium" }
        ],
        recommendations: [
          "Rest and stay hydrated",
          "Consider over-the-counter medications",
          "Monitor symptoms for 3-5 days",
          "Consult a doctor if symptoms worsen"
        ],
        urgency: "low"
      });
      setIsLoading(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-medical-success";
      case "medium": return "bg-medical-warning";
      case "high": return "bg-medical-error";
      default: return "bg-muted";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low": return <CheckCircle className="h-4 w-4" />;
      case "medium": return <Clock className="h-4 w-4" />;
      case "high": return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
          <Stethoscope className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">AI Symptom Checker</h1>
        <p className="text-muted-foreground text-lg">
          Describe your symptoms and get AI-powered health insights
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Describe Your Symptoms</CardTitle>
            <CardDescription>
              Please provide detailed information about what you're experiencing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms *</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Describe your symptoms in detail (e.g., headache, fever, cough, fatigue...)"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="1"
                    max="120"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Analyzing Symptoms...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Check Symptoms
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {results && (
            <>
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Possible Conditions
                    <Badge variant={results.urgency === "high" ? "destructive" : "secondary"}>
                      {results.urgency} priority
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.primaryConditions.map((condition, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full ${getSeverityColor(condition.severity)} flex items-center justify-center text-white`}>
                            {getSeverityIcon(condition.severity)}
                          </div>
                          <span className="font-medium">{condition.name}</span>
                        </div>
                        <Badge variant="outline">{condition.probability}% match</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-medical-success mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          <Card className="shadow-medium border-medical-warning/20 bg-medical-warning/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-medical-warning mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-medical-warning mb-1">Medical Disclaimer</p>
                  <p className="text-muted-foreground">
                    This tool is for informational purposes only and should not replace professional medical advice. 
                    Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;