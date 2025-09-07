/* eslint-disable react/prop-types */
const ExperiencePreview = ({ resumeInfo, templateType = "modern" }) => {
  const experience = resumeInfo?.experience || [];

  if (experience.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm font-medium py-4">
        No job experience data added.
      </div>
    );
  }

  const renderExperience = () => {
    switch (templateType) {
      case "modern":
        return (
          <div className="my-6">
            <h2
              className="text-center font-bold text-lg mb-4 uppercase tracking-wide"
              style={{ color: resumeInfo?.themeColor }}
            >
              Professional Experience
            </h2>
            <hr
              className="border-2 my-3 rounded"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            {experience.map((exp, index) => (
              <div key={index} className="my-6">
                <h2 className="text-base font-bold mb-1">
                  {exp?.title || "Position title not provided"}
                </h2>
                <h2 className="text-sm flex justify-between font-medium">
                  <span>
                    {(exp?.companyName || "Company not specified") +
                      (exp?.city ? `, ${exp.city}` : "") +
                      (exp?.state ? `, ${exp.state}` : "")}
                  </span>
                  <span className="text-gray-600">
                    {(exp?.duration?.startDate || "Start date not provided") +
                      " - " +
                      (exp?.duration?.endDate || "Present")}
                  </span>
                </h2>
                <div
                  className="text-sm my-3 text-justify leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: exp?.workSummery || "No work summary provided.",
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
              Experience
            </h2>
            <hr
              className="border-[1.5px] my-2"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            {experience.map((exp, index) => (
              <div key={index} className="my-4">
                <h2 className="text-sm font-bold">
                  {exp?.title || "Position title not provided"}
                </h2>
                <h2 className="text-xs flex justify-between">
                  <span>
                    {(exp?.companyName || "Company not specified") +
                      (exp?.city ? `, ${exp.city}` : "") +
                      (exp?.state ? `, ${exp.state}` : "")}
                  </span>
                  <span>
                    {(exp?.duration?.startDate || "Start date not provided") +
                      " To " +
                      (exp?.duration?.endDate || "End date not provided")}
                  </span>
                </h2>
                <div
                  className="text-xs my-2 text-justify"
                  dangerouslySetInnerHTML={{
                    __html: exp?.workSummery || "No work summary provided.",
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
              Experience
            </h2>
            <hr
              className="border my-2"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            {experience.map((exp, index) => (
              <div key={index} className="my-3">
                <h2 className="text-sm font-semibold">
                  {exp?.title || "Position title not provided"}
                </h2>
                <h2 className="text-xs text-gray-600 mb-1">
                  {(exp?.companyName || "Company not specified") +
                    (exp?.city ? `, ${exp.city}` : "") +
                    (exp?.state ? `, ${exp.state}` : "")}
                </h2>
                <h2 className="text-xs text-gray-500 mb-2">
                  {(exp?.duration?.startDate || "Start date not provided") +
                    " - " +
                    (exp?.duration?.endDate || "Present")}
                </h2>
                <div
                  className="text-xs text-justify leading-4"
                  dangerouslySetInnerHTML={{
                    __html: exp?.workSummery || "No work summary provided.",
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
              Work Experience
            </h2>
            <hr
              className="border-3 my-3 rounded"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            {experience.map((exp, index) => (
              <div key={index} className="my-5 relative">
                <div
                  className="absolute left-0 top-0 w-2 h-full rounded"
                  style={{ backgroundColor: resumeInfo?.themeColor }}
                ></div>
                <div className="pl-4">
                  <h2 className="text-base font-bold mb-1">
                    {exp?.title || "Position title not provided"}
                  </h2>
                  <h2 className="text-sm font-medium mb-1">
                    {(exp?.companyName || "Company not specified") +
                      (exp?.city ? `, ${exp.city}` : "") +
                      (exp?.state ? `, ${exp.state}` : "")}
                  </h2>
                  <h2 className="text-xs text-gray-600 mb-2">
                    {(exp?.duration?.startDate || "Start date not provided") +
                      " - " +
                      (exp?.duration?.endDate || "Present")}
                  </h2>
                  <div
                    className="text-sm text-justify leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: exp?.workSummery || "No work summary provided.",
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
              Professional Experience
            </h2>
            <hr
              className="border-2 my-3"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            {experience.map((exp, index) => (
              <div key={index} className="my-5">
                <h2 className="text-sm font-bold uppercase">
                  {exp?.title || "Position title not provided"}
                </h2>
                <h2 className="text-xs flex justify-between font-medium mt-1">
                  <span>
                    {(exp?.companyName || "Company not specified") +
                      (exp?.city ? `, ${exp.city}` : "") +
                      (exp?.state ? `, ${exp.state}` : "")}
                  </span>
                  <span>
                    {(exp?.duration?.startDate || "Start date not provided") +
                      " - " +
                      (exp?.duration?.endDate || "Present")}
                  </span>
                </h2>
                <div
                  className="text-xs my-3 text-justify leading-5"
                  dangerouslySetInnerHTML={{
                    __html: exp?.workSummery || "No work summary provided.",
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
              Professional Experience
            </h2>
            <hr
              className="border-dashed my-2"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            {experience.map((exp, index) => (
              <div key={index} className="my-4">
                <h2 className="text-sm font-semibold">
                  {exp?.title || "Position title not provided"}
                </h2>
                <h2 className="text-xs text-gray-700 mb-1">
                  {(exp?.companyName || "Company not specified") +
                    (exp?.city ? `, ${exp.city}` : "") +
                    (exp?.state ? `, ${exp.state}` : "")}
                </h2>
                <h2 className="text-xs text-gray-500 mb-2">
                  {(exp?.duration?.startDate || "Start date not provided") +
                    " - " +
                    (exp?.duration?.endDate || "Present")}
                </h2>
                <div
                  className="text-xs text-justify leading-5"
                  dangerouslySetInnerHTML={{
                    __html: exp?.workSummery || "No work summary provided.",
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
              Experience
            </h2>
            <hr
              className="border my-1"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            {experience.map((exp, index) => (
              <div key={index} className="my-2">
                <h2 className="text-xs font-bold">
                  {exp?.title || "Position title not provided"}
                </h2>
                <h2 className="text-xs text-gray-600 mb-1">
                  {(exp?.companyName || "Company not specified") +
                    (exp?.city ? `, ${exp.city}` : "") +
                    (exp?.state ? `, ${exp.state}` : "")}
                </h2>
                <h2 className="text-xs text-gray-500 mb-1">
                  {(exp?.duration?.startDate || "Start date not provided") +
                    " - " +
                    (exp?.duration?.endDate || "Present")}
                </h2>
                <div
                  className="text-xs text-justify leading-3"
                  dangerouslySetInnerHTML={{
                    __html: exp?.workSummery || "No work summary provided.",
                  }}
                />
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="my-6">
            <h2 className="text-center font-bold text-sm mb-2">
              Professional Experience
            </h2>
            <hr
              className="border-[1.5px] my-2"
              style={{
                borderColor: resumeInfo?.themeColor || "rgb(107 114 128 ",
              }}
            />
            {experience.map((exp, index) => (
              <div key={index} className="my-5">
                <h2 className="text-sm font-bold">
                  {exp?.title || "Position title not provided"}
                </h2>
                <h2 className="text-xs flex justify-between">
                  {(exp?.companyName || "Company not specified") +
                    (exp?.city ? `, ${exp.city}` : "") +
                    (exp?.state ? `, ${exp.state}` : "")}
                  <span>
                    {(exp?.duration?.startDate || "Start date not provided") +
                      " To " +
                      (exp?.duration?.endDate || "End date not provided")}
                  </span>
                </h2>
                <div
                  className="text-xs my-2 text-justify"
                  dangerouslySetInnerHTML={{
                    __html: exp?.workSummery || "No work summary provided.",
                  }}
                />
              </div>
            ))}
          </div>
        );
    }
  };

  return renderExperience();
};

export default ExperiencePreview;
