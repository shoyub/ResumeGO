import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../component/FormSection";
import ResumePreview from "../../component/ResumePreview";
import { ResumeContext } from "@/context/ResumeContext";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/utils/firebase_config";

const EditResume = () => {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = async () => {
    try {
      // Reference to the Firestore document
      const resumeRef = doc(
        db,
        "usersByEmail",
        params.email,
        "resumes",
        `resume-${params.resumeId}`
      );

      const resumeDoc = await getDoc(resumeRef);

      if (resumeDoc.exists()) {
        setResumeInfo(resumeDoc.data());
      } else {
        console.error("No such document! Check Firestore path.");
        setResumeInfo(null);
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  return (
    <ResumeContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
          <FormSection />
          <ResumePreview />
        </div>
        <footer className="border-t bg-card">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="text-sm text-muted-foreground text-center">
                Developed by{" "}
                <span className="font-semibold text-foreground">
                  Shoyub Khan
                </span>
              </div>
              <a
                href="https://shoyub.site"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ResumeContext.Provider>
  );
};

export default EditResume;
