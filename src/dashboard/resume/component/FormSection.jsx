import { Button } from "@/components/ui/button";
import PersonalDetailForm from "./form/PersonalDetailForm";
import { ArrowLeft, ArrowRight, Home, ChevronLeft } from "lucide-react";
import { useState } from "react";

import SummaryForm from "./form/SummaryForm";
import ExperienceForm from "./form/ExperienceForm";
import Education from "./form/Education";
import Skills from "./form/Skills";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import ThemeColor from "./ThemeColor";

const FormSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId, email } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    if (activeIndex > 1) {
      setActiveIndex(activeIndex - 1);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex justify-between items-center p-4 border-b bg-card hover:shadow-md transition-shadow duration-200">
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <Link to={"/dashboard"}>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <Home className="h-4 w-4" />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveIndex(activeIndex - 1)}
              variant="outline"
              className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
          )}
          <Button
            onClick={() => setActiveIndex(activeIndex + 1)}
            disabled={!enableNext}
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-md shadow-sm text-sm hover:bg-black transition-colors duration-200"
            size="sm"
          >
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {activeIndex === 1 ? (
        <PersonalDetailForm
          resumeId={resumeId}
          email={email}
          enableNext={(v) => setEnableNext(v)}
        />
      ) : activeIndex === 2 ? (
        <SummaryForm
          resumeId={resumeId}
          email={email}
          enableNext={(v) => setEnableNext(v)}
        />
      ) : activeIndex === 3 ? (
        <ExperienceForm
          resumeId={resumeId}
          email={email}
          enableNext={(v) => setEnableNext(v)}
        />
      ) : activeIndex === 4 ? (
        <Education
          resumeId={resumeId}
          email={email}
          enableNext={(v) => setEnableNext(v)}
        />
      ) : activeIndex === 5 ? (
        <Skills
          resumeId={resumeId}
          email={email}
          enableNext={(v) => setEnableNext(v)}
        />
      ) : activeIndex === 6 ? (
        <Navigate to={`/dashboard/${email}/${resumeId}/view`} />
      ) : null}
    </div>
  );
};

export default FormSection;
