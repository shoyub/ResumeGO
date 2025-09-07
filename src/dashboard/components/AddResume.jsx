import { Loader2, PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import templates from "@/data/dummy";
import TemplatePreview from "./TemplatePreview";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [step, setStep] = useState(1); // 1: template selection, 2: title input
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const db = getFirestore();

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setStep(2);
  };

  const handleBackToTemplates = () => {
    setStep(1);
    setSelectedTemplate(null);
    setResumeTitle("");
  };

  const onCreate = async () => {
    if (!user?.uid) {
      console.error("User is not authenticated.");
      return;
    }

    setLoading(true);
    try {
      const db = getFirestore();
      const resumesRef = collection(db, "usersByEmail", user.email, "resumes");

      // Query to get the highest resumeId
      const q = query(resumesRef, orderBy("resumeId", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      let newResumeId = 1; // Default to 1 if no resumes exist
      if (!querySnapshot.empty) {
        const lastResume = querySnapshot.docs[0].data();
        newResumeId = (lastResume.resumeId || 0) + 1;
      }

      // Create a new resume document with selected template data
      const resumeDocRef = doc(resumesRef, `resume-${newResumeId}`);
      const resumeData = selectedTemplate
        ? { ...selectedTemplate, resumeId: newResumeId }
        : { resumeId: newResumeId };
      await setDoc(resumeDocRef, resumeData);
      console.log("Resume created successfully!");
      setLoading(false);
      setOpenDialog(false);
      navigate(`/dashboard/${user.email}/${newResumeId}/edit`);
    } catch (error) {
      console.error("Error creating resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-14 py-24 border flex items-center justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-sm cursor-pointer border-dashed border-black"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog
        open={openDialog}
        onOpenChange={(open) => {
          setOpenDialog(open);
          if (!open) {
            // Reset state when dialog closes
            setStep(1);
            setSelectedTemplate(null);
            setResumeTitle("");
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {step === 1 ? "Choose a Template" : "Create New Resume"}
            </DialogTitle>
            <DialogDescription>
              {step === 1
                ? "Select a template to start building your resume"
                : "Add a title for your new resume"}
            </DialogDescription>
          </DialogHeader>

          {step === 1 ? (
            <div className="flex gap-6">
              {/* Template Grid */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.slice(0, 21).map((template, index) => (
                  <div
                    key={index}
                    className="border-2 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => handleTemplateSelect(template)}
                    onMouseEnter={() => setHoveredTemplate(template)}
                    onMouseLeave={() => setHoveredTemplate(null)}
                    style={{
                      borderColor:
                        hoveredTemplate === template
                          ? template.themeColor
                          : "#e5e7eb",
                      backgroundColor:
                        hoveredTemplate === template ? "#f9fafb" : "white",
                    }}
                  >
                    <div className="text-center">
                      <div
                        className="w-full h-16 rounded mb-2 mx-auto"
                        style={{ backgroundColor: template.themeColor }}
                      ></div>
                      <h3 className="font-semibold text-sm mb-1">
                        {template.jobTitle}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {template.firstName} {template.lastName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {template.experience.length} experience
                        {template.experience.length !== 1 ? "s" : ""} •{" "}
                        {template.skills.length} skills
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Preview Panel */}
              <div className="w-80 flex-shrink-0">
                <div className="sticky top-0">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 text-center">
                    Template Preview
                  </h4>
                  {hoveredTemplate ? (
                    <TemplatePreview template={hoveredTemplate} />
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
                      <p className="text-sm">
                        Hover over a template to see preview
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Input
                className="my-2"
                placeholder="Ex. Full Stack Developer"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
              <div className="flex justify-between mt-4">
                <Button onClick={handleBackToTemplates} variant="outline">
                  Back to Templates
                </Button>
                <div className="flex gap-2">
                  <Button onClick={() => setOpenDialog(false)} variant="ghost">
                    Cancel
                  </Button>
                  <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                    {loading ? <Loader2 className="animate-spin" /> : "Create"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
