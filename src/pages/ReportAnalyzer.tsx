import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Upload, 
  X, 
  Eye, 
  Download, 
  AlertCircle,
  CheckCircle2,
  FileImage,
  File
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportAnalyzer = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const validFiles = Array.from(files).filter(file => {
      const isValidType = file.type.includes('pdf') || 
                          file.type.includes('image') || 
                          file.type.includes('text');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported format`,
          variant: "destructive",
        });
        return false;
      }
      
      if (!isValidSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 10MB limit`,
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const analyzeReports = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload at least one medical report",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setUploadProgress(0);

    // Simulate file processing with progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call - replace with actual Supabase edge function
    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setAnalysisResults({
          summary: "Blood test results show normal glucose levels (95 mg/dL) and cholesterol within healthy range. Vitamin D levels are slightly low (25 ng/mL), recommend supplementation.",
          keyFindings: [
            { metric: "Blood Glucose", value: "95 mg/dL", status: "normal", range: "70-100 mg/dL" },
            { metric: "Total Cholesterol", value: "185 mg/dL", status: "normal", range: "<200 mg/dL" },
            { metric: "Vitamin D", value: "25 ng/mL", status: "low", range: "30-100 ng/mL" },
            { metric: "Hemoglobin", value: "14.2 g/dL", status: "normal", range: "12-16 g/dL" }
          ],
          recommendations: [
            "Consider Vitamin D supplementation (1000 IU daily)",
            "Maintain current diet and exercise routine",
            "Recheck Vitamin D levels in 3 months",
            "Continue regular health screenings"
          ],
          riskFactors: ["Low Vitamin D"],
          confidence: 92
        });
        setIsAnalyzing(false);
        setUploadProgress(0);
      }, 1000);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "text-medical-success";
      case "low": return "text-medical-warning";
      case "high": return "text-medical-error";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal": return <CheckCircle2 className="h-4 w-4 text-medical-success" />;
      case "low":
      case "high": return <AlertCircle className="h-4 w-4 text-medical-warning" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Medical Report Analyzer</h1>
        <p className="text-muted-foreground text-lg">
          Upload your medical reports for AI-powered analysis and insights
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Upload Medical Reports</CardTitle>
              <CardDescription>
                Supported formats: PDF, Images (JPG, PNG), Text files (up to 10MB each)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                  <p className="text-sm text-muted-foreground">
                    Upload lab results, X-rays, prescriptions, and other medical documents
                  </p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.txt"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />

                {uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <Label>Uploaded Files ({uploadedFiles.length})</Label>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            {file.type.includes('image') ? (
                              <FileImage className="h-5 w-5 text-blue-500" />
                            ) : (
                              <File className="h-5 w-5 text-gray-500" />
                            )}
                            <div>
                              <p className="text-sm font-medium truncate max-w-48">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Processing reports...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}

                <Button 
                  onClick={analyzeReports} 
                  className="w-full" 
                  disabled={isAnalyzing || uploadedFiles.length === 0}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Analyzing Reports...
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      Analyze Reports
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {analysisResults && (
            <>
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Analysis Summary
                    <Badge variant="secondary">{analysisResults.confidence}% confidence</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{analysisResults.summary}</p>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Key Findings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResults.keyFindings.map((finding, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(finding.status)}
                          <div>
                            <p className="font-medium">{finding.metric}</p>
                            <p className="text-sm text-muted-foreground">Normal: {finding.range}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${getStatusColor(finding.status)}`}>
                            {finding.value}
                          </p>
                          <Badge variant="outline" className={finding.status !== "normal" ? "border-medical-warning" : ""}>
                            {finding.status}
                          </Badge>
                        </div>
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
                    {analysisResults.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-medical-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileText className="mr-2 h-4 w-4" />
                  Save to Records
                </Button>
              </div>
            </>
          )}

          <Card className="shadow-medium border-medical-warning/20 bg-medical-warning/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-medical-warning mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-medical-warning mb-1">Privacy & Security</p>
                  <p className="text-muted-foreground">
                    All uploaded files are encrypted and processed securely. Reports are automatically deleted 
                    after analysis unless saved to your account.
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

export default ReportAnalyzer;