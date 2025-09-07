/* eslint-disable react/prop-types */
const SummaryDetails = ({ resumeInfo, templateType = "modern" }) => {
  if (!resumeInfo || !resumeInfo.personalDetail) {
    return (
      <div className="text-center text-gray-500 text-sm font-medium py-4">
        No summary data added.
      </div>
    );
  }

  const summary = resumeInfo?.summary || "No summary provided.";

  const renderSummary = () => {
    switch (templateType) {
      case "modern":
        return (
          <div>
            <h3
              className="font-bold text-lg mb-3 uppercase tracking-wide"
              style={{ color: resumeInfo?.themeColor }}
            >
              Professional Summary
            </h3>
            <p className="text-sm text-justify leading-relaxed">{summary}</p>
          </div>
        );

      case "classic":
        return (
          <div>
            <h3
              className="font-semibold text-base mb-2"
              style={{ color: resumeInfo?.themeColor }}
            >
              Summary
            </h3>
            <p className="text-xs text-justify leading-5">{summary}</p>
          </div>
        );

      case "minimal":
        return (
          <div>
            <h3
              className="font-medium text-sm mb-2 uppercase"
              style={{ color: resumeInfo?.themeColor }}
            >
              Summary
            </h3>
            <p className="text-xs text-justify leading-4">{summary}</p>
          </div>
        );

      case "creative":
        return (
          <div className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded"
              style={{ backgroundColor: resumeInfo?.themeColor }}
            ></div>
            <div className="pl-4">
              <h3
                className="font-bold text-lg mb-3"
                style={{ color: resumeInfo?.themeColor }}
              >
                About Me
              </h3>
              <p className="text-sm text-justify leading-relaxed italic">
                {summary}
              </p>
            </div>
          </div>
        );

      case "professional":
        return (
          <div>
            <h3
              className="font-bold text-base mb-3 uppercase tracking-wider"
              style={{ color: resumeInfo?.themeColor }}
            >
              Executive Summary
            </h3>
            <p className="text-sm text-justify leading-6 font-medium">
              {summary}
            </p>
          </div>
        );

      case "elegant":
        return (
          <div>
            <h3
              className="font-serif text-base mb-3 italic"
              style={{ color: resumeInfo?.themeColor }}
            >
              Professional Summary
            </h3>
            <p className="text-sm text-justify leading-5">{summary}</p>
          </div>
        );

      case "compact":
        return (
          <div>
            <h3
              className="font-semibold text-xs mb-1 uppercase"
              style={{ color: resumeInfo?.themeColor }}
            >
              Summary
            </h3>
            <p className="text-xs text-justify leading-4">{summary}</p>
          </div>
        );

      default:
        return (
          <div>
            <h3
              className="font-bold text-sm mb-2"
              style={{ color: resumeInfo?.themeColor }}
            >
              Summary
            </h3>
            <p className="text-xs text-justify">{summary}</p>
          </div>
        );
    }
  };

  return renderSummary();
};

export default SummaryDetails;
