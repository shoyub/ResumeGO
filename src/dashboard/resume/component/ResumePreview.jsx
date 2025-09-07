/* eslint-disable no-unused-vars */
import { ResumeContext } from "@/context/ResumeContext";
import { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryDetails from "./preview/SummaryDetails";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";

const ResumePreview = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);

  if (!resumeInfo) {
    return (
      <div className="text-center text-gray-500 text-lg font-medium py-20">
        Data needs to be added in the resume.
      </div>
    );
  }

  const templateType = resumeInfo?.templateType || "modern";

  // Different layout styles based on template type
  const getLayoutStyles = () => {
    switch (templateType) {
      case "modern":
        return {
          container: "shadow-lg h-full p-14 border-t-[20px]",
          spacing: "space-y-6",
        };
      case "classic":
        return {
          container: "shadow-lg h-full p-14 border-2 border-gray-300",
          spacing: "space-y-4",
        };
      case "minimal":
        return {
          container: "shadow-lg h-full p-8 border-l-4",
          spacing: "space-y-3",
        };
      case "creative":
        return {
          container: "shadow-lg h-full p-12 border-t-8 border-b-8",
          spacing: "space-y-5",
        };
      case "professional":
        return {
          container: "shadow-lg h-full p-16 border-4",
          spacing: "space-y-6",
        };
      case "elegant":
        return {
          container: "shadow-lg h-full p-10 border-2 border-dashed",
          spacing: "space-y-5",
        };
      case "compact":
        return {
          container: "shadow-lg h-full p-6 border-t-4",
          spacing: "space-y-2",
        };
      default:
        return {
          container: "shadow-lg h-full p-14 border-t-[20px]",
          spacing: "space-y-6",
        };
    }
  };

  const layoutStyles = getLayoutStyles();

  return (
    <div
      className={`${layoutStyles.container} ${layoutStyles.spacing}`}
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {resumeInfo && (
        <>
          <PersonalDetailPreview
            resumeInfo={resumeInfo}
            templateType={templateType}
          />
          <SummaryDetails resumeInfo={resumeInfo} templateType={templateType} />
          <ExperiencePreview
            resumeInfo={resumeInfo}
            templateType={templateType}
          />
          <EducationalPreview
            resumeInfo={resumeInfo}
            templateType={templateType}
          />
          <SkillsPreview resumeInfo={resumeInfo} templateType={templateType} />
        </>
      )}
    </div>
  );
};

export default ResumePreview;
