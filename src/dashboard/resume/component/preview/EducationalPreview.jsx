/* eslint-disable react/prop-types */
const EducationalPreview = ({ resumeInfo, templateType = "modern" }) => {
  const education = resumeInfo?.education || []; // Default to an empty array if undefined

  if (education.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm font-medium py-4">
        No educational data added.
      </div>
    );
  }

  const renderEducation = () => {
    switch (templateType) {
      case "modern":
        return (
          <div className="my-6">
            <h2
              className="text-center font-bold text-lg mb-4 uppercase tracking-wide"
              style={{ color: resumeInfo?.themeColor }}
            >
              Education
            </h2>
            <hr
              className="border-2 my-3 rounded"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            {education.map((educationItem, index) => (
              <div key={index} className="my-6">
                <h2 className="text-base font-bold mb-1">
                  {educationItem?.universityName || "University Not Specified"}
                </h2>
                <h2 className="text-sm flex justify-between font-medium">
                  <span>
                    {educationItem?.degree || "Degree not specified"} in{" "}
                    {educationItem?.major || "Field not specified"}
                  </span>
                  <span className="text-gray-600">
                    {educationItem?.startDate || "Start date not provided"} -{" "}
                    {educationItem?.endDate || "End date not provided"}
                  </span>
                </h2>
                <div
                  className="text-sm my-3 text-justify leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html:
                      educationItem?.description || "No description provided.",
                  }}
                />
              </div>
            ))}
          </div>
        );

      case "classic":
        return (
          <div className="my-5">
            <h2
              className="text-center font-semibold text-base mb-3"
              style={{ color: resumeInfo?.themeColor }}
            >
              Education
            </h2>
            <hr
              className="border-[1.5px] my-2"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            {education.map((educationItem, index) => (
              <div key={index} className="my-4">
                <h2 className="text-sm font-bold">
                  {educationItem?.universityName || "University Not Specified"}
                </h2>
                <h2 className="text-xs flex justify-between">
                  <span>
                    {educationItem?.degree || "Degree not specified"} in{" "}
                    {educationItem?.major || "Field not specified"}
                  </span>
                  <span>
                    {educationItem?.startDate || "Start date not provided"} -{" "}
                    {educationItem?.endDate || "End date not provided"}
                  </span>
                </h2>
                <div
                  className="text-xs my-2 text-justify"
                  dangerouslySetInnerHTML={{
                    __html:
                      educationItem?.description || "No description provided.",
                  }}
                />
              </div>
            ))}
          </div>
        );

      case "minimal":
        return (
          <div className="my-4">
            <h2
              className="font-medium text-sm mb-2 uppercase"
              style={{ color: resumeInfo?.themeColor }}
            >
              Education
            </h2>
            <hr
              className="border my-2"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            {education.map((educationItem, index) => (
              <div key={index} className="my-3">
                <h2 className="text-sm font-semibold">
                  {educationItem?.universityName || "University Not Specified"}
                </h2>
                <h2 className="text-xs text-gray-600 mb-1">
                  {educationItem?.degree || "Degree not specified"} in{" "}
                  {educationItem?.major || "Field not specified"}
                </h2>
                <h2 className="text-xs text-gray-500 mb-2">
                  {educationItem?.startDate || "Start date not provided"} -{" "}
                  {educationItem?.endDate || "End date not provided"}
                </h2>
                <div
                  className="text-xs text-justify leading-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      educationItem?.description || "No description provided.",
                  }}
                />
              </div>
            ))}
          </div>
        );

      case "creative":
        return (
          <div className="my-6">
            <h2
              className="font-bold text-lg mb-4"
              style={{ color: resumeInfo?.themeColor }}
            >
              Education
            </h2>
            <hr
              className="border-3 my-3 rounded"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            {education.map((educationItem, index) => (
              <div key={index} className="my-5 relative">
                <div
                  className="absolute left-0 top-0 w-2 h-full rounded"
                  style={{ backgroundColor: resumeInfo?.themeColor }}
                ></div>
                <div className="pl-4">
                  <h2 className="text-base font-bold mb-1">
                    {educationItem?.universityName ||
                      "University Not Specified"}
                  </h2>
                  <h2 className="text-sm font-medium mb-1">
                    {educationItem?.degree || "Degree not specified"} in{" "}
                    {educationItem?.major || "Field not specified"}
                  </h2>
                  <h2 className="text-xs text-gray-600 mb-2">
                    {educationItem?.startDate || "Start date not provided"} -{" "}
                    {educationItem?.endDate || "End date not provided"}
                  </h2>
                  <div
                    className="text-sm text-justify leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html:
                        educationItem?.description ||
                        "No description provided.",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "professional":
        return (
          <div className="my-6">
            <h2
              className="font-bold text-base mb-4 uppercase tracking-wider"
              style={{ color: resumeInfo?.themeColor }}
            >
              Education
            </h2>
            <hr
              className="border-2 my-3"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            {education.map((educationItem, index) => (
              <div key={index} className="my-5">
                <h2 className="text-sm font-bold uppercase">
                  {educationItem?.universityName || "University Not Specified"}
                </h2>
                <h2 className="text-xs flex justify-between font-medium mt-1">
                  <span>
                    {educationItem?.degree || "Degree not specified"} in{" "}
                    {educationItem?.major || "Field not specified"}
                  </span>
                  <span>
                    {educationItem?.startDate || "Start date not provided"} -{" "}
                    {educationItem?.endDate || "End date not provided"}
                  </span>
                </h2>
                <div
                  className="text-xs my-3 text-justify leading-5"
                  dangerouslySetInnerHTML={{
                    __html:
                      educationItem?.description || "No description provided.",
                  }}
                />
              </div>
            ))}
          </div>
        );

      case "elegant":
        return (
          <div className="my-5">
            <h2
              className="font-serif text-base mb-3 italic"
              style={{ color: resumeInfo?.themeColor }}
            >
              Education
            </h2>
            <hr
              className="border-dashed my-2"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            {education.map((educationItem, index) => (
              <div key={index} className="my-4">
                <h2 className="text-sm font-semibold">
                  {educationItem?.universityName || "University Not Specified"}
                </h2>
                <h2 className="text-xs text-gray-700 mb-1">
                  {educationItem?.degree || "Degree not specified"} in{" "}
                  {educationItem?.major || "Field not specified"}
                </h2>
                <h2 className="text-xs text-gray-500 mb-2">
                  {educationItem?.startDate || "Start date not provided"} -{" "}
                  {educationItem?.endDate || "End date not provided"}
                </h2>
                <div
                  className="text-xs text-justify leading-5"
                  dangerouslySetInnerHTML={{
                    __html:
                      educationItem?.description || "No description provided.",
                  }}
                />
              </div>
            ))}
          </div>
        );

      case "compact":
        return (
          <div className="my-3">
            <h2
              className="font-semibold text-xs mb-2 uppercase"
              style={{ color: resumeInfo?.themeColor }}
            >
              Education
            </h2>
            <hr
              className="border my-1"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            {education.map((educationItem, index) => (
              <div key={index} className="my-2">
                <h2 className="text-xs font-bold">
                  {educationItem?.universityName || "University Not Specified"}
                </h2>
                <h2 className="text-xs text-gray-600 mb-1">
                  {educationItem?.degree || "Degree not specified"} in{" "}
                  {educationItem?.major || "Field not specified"}
                </h2>
                <h2 className="text-xs text-gray-500 mb-1">
                  {educationItem?.startDate || "Start date not provided"} -{" "}
                  {educationItem?.endDate || "End date not provided"}
                </h2>
                <div
                  className="text-xs text-justify leading-3"
                  dangerouslySetInnerHTML={{
                    __html:
                      educationItem?.description || "No description provided.",
                  }}
                />
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="my-6">
            <h2 className="text-center font-bold text-sm mb-2">Education</h2>
            <hr
              className="border-[1.5px] my-2"
              style={{
                borderColor: resumeInfo?.themeColor || "rgb(107 114 128 ",
              }}
            />
            {education.map((educationItem, index) => (
              <div key={index} className="my-5">
                <h2 className="text-sm font-bold">
                  {educationItem?.universityName || "University Not Specified"}
                </h2>
                <h2 className="text-xs flex justify-between">
                  {educationItem?.degree || "Degree not specified"} in{" "}
                  {educationItem?.major || "Field not specified"}
                  <span>
                    {educationItem?.startDate || "Start date not provided"} -{" "}
                    {educationItem?.endDate || "End date not provided"}
                  </span>
                </h2>
                <div
                  className="text-xs my-2 text-justify"
                  dangerouslySetInnerHTML={{
                    __html:
                      educationItem?.description || "No description provided.",
                  }}
                />
              </div>
            ))}
          </div>
        );
    }
  };

  return renderEducation();
};

export default EducationalPreview;
