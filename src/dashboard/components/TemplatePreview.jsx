import React from "react";

const TemplatePreview = ({ template, isSelected = false }) => {
  if (!template) return null;

  const templateType = template.templateType || "modern";

  const getPreviewStyles = () => {
    switch (templateType) {
      case "modern":
        return {
          container: "border-2 rounded-lg p-4 bg-white shadow-lg",
          header: "text-center mb-3",
          title: "font-bold text-sm",
          subtitle: "text-sm font-medium",
          section: "mb-3",
          sectionTitle: "font-semibold text-xs mb-2 uppercase tracking-wide",
          skills: "flex flex-wrap gap-2",
          skillTag: "text-xs bg-gray-100 px-2 py-1 rounded",
        };
      case "classic":
        return {
          container:
            "border-2 border-gray-300 rounded-lg p-3 bg-white shadow-md",
          header: "text-center mb-2",
          title: "font-bold text-xs",
          subtitle: "text-xs font-medium",
          section: "mb-2",
          sectionTitle: "font-semibold text-xs mb-1",
          skills: "flex flex-wrap gap-1",
          skillTag: "text-xs bg-gray-200 px-1 py-0.5 rounded",
        };
      case "minimal":
        return {
          container: "border border-gray-200 rounded p-3 bg-white shadow-sm",
          header: "text-left mb-2",
          title: "font-bold text-sm",
          subtitle: "text-xs font-medium",
          section: "mb-2",
          sectionTitle: "font-medium text-xs mb-1 uppercase",
          skills: "flex flex-wrap gap-2",
          skillTag: "text-xs bg-gray-50 px-2 py-1 rounded border",
        };
      case "creative":
        return {
          container:
            "border-4 rounded-xl p-4 bg-white shadow-xl relative overflow-hidden",
          header: "text-center mb-3 relative z-10",
          title: "font-bold text-base",
          subtitle: "text-sm font-medium",
          section: "mb-3",
          sectionTitle: "font-bold text-sm mb-2",
          skills: "flex flex-wrap gap-2",
          skillTag:
            "text-xs bg-gradient-to-r from-blue-100 to-purple-100 px-2 py-1 rounded-full",
        };
      case "professional":
        return {
          container: "border-2 rounded p-4 bg-white shadow-md",
          header: "text-center mb-3",
          title: "font-bold text-sm uppercase tracking-wide",
          subtitle: "text-sm font-semibold",
          section: "mb-3",
          sectionTitle: "font-bold text-xs mb-2 uppercase tracking-wider",
          skills: "grid grid-cols-2 gap-1",
          skillTag:
            "text-xs bg-gray-800 text-white px-2 py-1 rounded text-center",
        };
      case "elegant":
        return {
          container: "border-2 border-dashed rounded-lg p-3 bg-white shadow-sm",
          header: "text-center mb-2",
          title: "font-serif text-sm italic",
          subtitle: "text-xs font-medium",
          section: "mb-2",
          sectionTitle: "font-serif text-xs mb-1 italic",
          skills: "flex flex-wrap gap-1",
          skillTag: "text-xs border border-gray-300 px-2 py-1 rounded italic",
        };
      case "compact":
        return {
          container: "border rounded p-2 bg-white shadow-sm",
          header: "text-left mb-1",
          title: "font-bold text-xs",
          subtitle: "text-xs font-medium",
          section: "mb-1",
          sectionTitle: "font-semibold text-xs mb-1 uppercase",
          skills: "flex flex-wrap gap-1",
          skillTag: "text-xs bg-gray-200 px-1 py-0.5 rounded text-xs",
        };
      default:
        return {
          container: "border-2 rounded-lg p-3 bg-white shadow-sm",
          header: "text-center mb-2",
          title: "font-bold text-xs",
          subtitle: "text-xs font-medium",
          section: "mb-2",
          sectionTitle: "font-semibold text-xs mb-1",
          skills: "flex flex-wrap gap-1",
          skillTag: "text-xs bg-gray-100 px-1 py-0.5 rounded",
        };
    }
  };

  const styles = getPreviewStyles();

  return (
    <div
      className={`${styles.container} ${
        isSelected ? "ring-2 ring-blue-500 ring-opacity-50" : ""
      }`}
      style={{
        borderColor: isSelected ? template.themeColor : undefined,
        maxWidth: "320px",
        fontSize: templateType === "compact" ? "9px" : "11px",
        lineHeight: "1.3",
      }}
    >
      {/* Creative background effect */}
      {templateType === "creative" && (
        <div
          className="absolute inset-0 rounded-xl opacity-5"
          style={{ backgroundColor: template.themeColor }}
        ></div>
      )}

      {/* Header */}
      <div className={styles.header}>
        <h3 className={`${styles.title} text-gray-800`}>
          {template.firstName} {template.lastName}
        </h3>
        <p className={styles.subtitle} style={{ color: template.themeColor }}>
          {template.jobTitle}
        </p>
        {templateType !== "compact" && (
          <>
            <p className="text-xs text-gray-600">{template.phone}</p>
            <p className="text-xs text-gray-600">{template.email}</p>
          </>
        )}
      </div>

      {/* Summary */}
      <div className={styles.section}>
        <h4
          className={styles.sectionTitle}
          style={{ color: template.themeColor }}
        >
          {templateType === "creative" ? "About" : "Summary"}
        </h4>
        <p className="text-xs text-gray-700 leading-tight">
          {template.summery.length > (templateType === "compact" ? 80 : 120)
            ? template.summery.substring(
                0,
                templateType === "compact" ? 80 : 120
              ) + "..."
            : template.summery}
        </p>
      </div>

      {/* Experience */}
      <div className={styles.section}>
        <h4
          className={styles.sectionTitle}
          style={{ color: template.themeColor }}
        >
          Experience
        </h4>
        {template.experience.slice(0, 1).map((exp, index) => (
          <div key={index} className="mb-1">
            <p className="text-xs font-medium text-gray-800">{exp.title}</p>
            <p className="text-xs text-gray-600">{exp.companyName}</p>
            {templateType !== "compact" && (
              <p className="text-xs text-gray-500">
                {exp.startDate} - {exp.endDate || "Present"}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className={styles.section}>
        <h4
          className={styles.sectionTitle}
          style={{ color: template.themeColor }}
        >
          Skills
        </h4>
        <div className={styles.skills}>
          {template.skills
            .slice(0, templateType === "compact" ? 4 : 6)
            .map((skill, index) => (
              <span key={index} className={styles.skillTag}>
                {skill.name}
              </span>
            ))}
        </div>
      </div>

      {/* Template type indicator */}
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-500 capitalize">
          {templateType} style
        </span>
        <div
          className="w-3 h-3 rounded-full border border-gray-300"
          style={{ backgroundColor: template.themeColor }}
        ></div>
      </div>
    </div>
  );
};

export default TemplatePreview;
