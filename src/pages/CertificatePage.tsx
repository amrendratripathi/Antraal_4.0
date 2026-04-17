import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import { searchStudent, createCertificateZip, downloadBlob } from "@/lib/certificateUtils";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

export default function CertificatePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [studentFound, setStudentFound] = useState(false);
  const [studentInfo, setStudentInfo] = useState<{
    teamLeader: string;
    teamName?: string;
    teamMembers: string[];
    event: string;
  } | null>(null);

  const events = [
    "Battle Arena",
    "CloneCraft",
    "Prompathon",
    "Treasure Trial",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setSuccess(null);
  };

  const handleEventChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      event: value,
    }));
    setError(null);
    setSuccess(null);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!formData.name.trim() || !formData.email.trim() || !formData.event) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const student = await searchStudent(formData.name, formData.event, formData.email);

      if (student) {
        setStudentInfo({
          teamLeader: student.teamLeader,
          teamName: student.teamName,
          teamMembers: student.teamMembers,
          event: student.event,
        });
        setStudentFound(true);
        setSuccess("Student found! Ready to download certificates.");
      } else {
        setError("Student not found in the selected event. Please check the details and try again.");
        setStudentFound(false);
        setStudentInfo(null);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("An error occurred while searching. Please try again.");
      setStudentFound(false);
      setStudentInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!studentInfo) return;

    setLoading(true);
    setError(null);

    try {
      const zipBlob = await createCertificateZip(
        studentInfo.teamLeader,
        studentInfo.teamMembers,
        studentInfo.event
      );

      const allMembers = [studentInfo.teamLeader, ...studentInfo.teamMembers];
      const zipFileName = `${studentInfo.event}_Certificates_${allMembers.length}Members.zip`;

      downloadBlob(zipBlob, zipFileName);
      setSuccess(`Successfully downloaded certificates for ${allMembers.length} team member(s)!`);
    } catch (err) {
      console.error("Download error:", err);
      setError("An error occurred while generating certificates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      event: "",
    });
    setStudentFound(false);
    setStudentInfo(null);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Download Certificates
            </h1>
            <p className="text-lg text-muted-foreground">
              Enter your details to find and download your event certificates
            </p>
          </div>

          {/* Main Card */}
          <Card className="bg-surface-glass/80 border-primary/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Certificate Details</CardTitle>
              <CardDescription>
                Provide your information to retrieve your team's certificates
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Success Alert */}
              {success && !studentFound && (
                <Alert className="bg-green-950/30 border-green-500/30 text-green-100">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              {/* Search Form */}
              {!studentFound ? (
                <form onSubmit={handleSearch} className="space-y-4">
                  {/* Team Leader Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">
                      Team Leader Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter team leader name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-slate-950/50 border-primary/20 text-white placeholder:text-slate-500"
                      disabled={loading}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base">
                      Email ID
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-slate-950/50 border-primary/20 text-white placeholder:text-slate-500"
                      disabled={loading}
                    />
                  </div>

                  {/* Event Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="event" className="text-base">
                      Event
                    </Label>
                    <Select value={formData.event} onValueChange={handleEventChange} disabled={loading}>
                      <SelectTrigger className="bg-slate-950/50 border-primary/20 text-white">
                        <SelectValue placeholder="Select an event" />
                      </SelectTrigger>
                      <SelectContent>
                        {events.map((event) => (
                          <SelectItem key={event} value={event}>
                            {event}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 h-11"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      "Search"
                    )}
                  </Button>
                </form>
              ) : (
                /* Student Found Section */
                <div className="space-y-4">
                  <Alert className="bg-green-950/30 border-green-500/30 text-green-100">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>Student found! Ready to download certificates.</AlertDescription>
                  </Alert>

                  {/* Student Info Display */}
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-950/50 rounded-lg border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">Team Leader</p>
                      <p className="text-lg font-semibold text-primary">{studentInfo?.teamLeader}</p>
                    </div>

                    {studentInfo?.teamName && (
                      <div className="p-4 bg-slate-950/50 rounded-lg border border-primary/20">
                        <p className="text-sm text-muted-foreground mb-1">Team Name</p>
                        <p className="text-lg font-semibold text-primary">{studentInfo.teamName}</p>
                      </div>
                    )}

                    <div className="p-4 bg-slate-950/50 rounded-lg border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">Event</p>
                      <p className="text-lg font-semibold text-primary">{studentInfo?.event}</p>
                    </div>

                    {studentInfo?.teamMembers && studentInfo.teamMembers.length > 0 && (
                      <div className="p-4 bg-slate-950/50 rounded-lg border border-primary/20">
                        <p className="text-sm text-muted-foreground mb-2">Team Members</p>
                        <ul className="space-y-1">
                          {studentInfo.teamMembers.map((member, idx) => (
                            <li key={idx} className="text-primary">
                              • {member}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleDownload}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-2 h-11"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Download Certificates"
                      )}
                    </Button>

                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="flex-1 border-primary/20 hover:bg-primary/10"
                      disabled={loading}
                    >
                      Search Again
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <Card className="bg-surface-glass/50 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">How it works</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>1. Enter your name, email, and event</p>
                <p>2. We'll search our database for your information</p>
                <p>3. Once found, download certificates for all team members</p>
                <p>4. Your ZIP file will contain personalized certificates</p>
              </CardContent>
            </Card>

            <Card className="bg-surface-glass/50 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Ensure your name matches exactly as registered</p>
                <p>• Use the email associated with your registration</p>
                <p>• Certificates are personalized for each team member</p>
                <p>• Downloads are available for all participated events</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
