/* eslint-disable react/prop-types */
const SkillsPreview = ({ resumeInfo, templateType = "modern" }) => {
  const skills = resumeInfo?.skills;

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm font-medium py-4">
        No skills data added.
      </div>
    );
  }

  const renderSkills = () => {
    switch (templateType) {
      case "modern":
        return (
          <div className="my-6">
            <h2
              className="text-center font-bold text-lg mb-4 uppercase tracking-wide"
              style={{ color: resumeInfo?.themeColor }}
            >
              Skills
            </h2>
            <hr
              className="border-2 my-3 rounded"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            <div className="grid grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {skill?.name || "Skill not specified"}
                  </span>
                  <div className="flex">
                    {Array.from({ length: skill?.rating || 0 }, (_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "classic":
        return (
          <div className="my-5">
            <h2
              className="text-center font-semibold text-base mb-3"
              style={{ color: resumeInfo?.themeColor }}
            >
              Skills
            </h2>
            <hr
              className="border-[1.5px] my-2"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-sm font-medium mr-2">
                    {skill?.name || "Skill not specified"}
                  </span>
                  <span className="text-xs">
                    {skill?.rating ? "★".repeat(skill.rating) : "No rating"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className="my-4">
            <h2
              className="font-medium text-sm mb-2 uppercase"
              style={{ color: resumeInfo?.themeColor }}
            >
              Skills
            </h2>
            <hr
              className="border my-2"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {skill?.name || "Skill not specified"}
                </span>
              ))}
            </div>
          </div>
        );

      case "creative":
        return (
          <div className="my-6">
            <h2
              className="font-bold text-lg mb-4"
              style={{ color: resumeInfo?.themeColor }}
            >
              Skills & Competencies
            </h2>
            <hr
              className="border-3 my-3 rounded"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div key={index} className="relative">
                  <div
                    className="absolute left-0 top-0 w-1 h-full rounded"
                    style={{ backgroundColor: resumeInfo?.themeColor }}
                  ></div>
                  <div className="pl-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">
                        {skill?.name || "Skill not specified"}
                      </span>
                      <div className="flex">
                        {Array.from({ length: skill?.rating || 0 }, (_, i) => (
                          <span key={i} className="text-yellow-500 text-xs">
                            ●
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "professional":
        return (
          <div className="my-6">
            <h2
              className="font-bold text-base mb-4 uppercase tracking-wider"
              style={{ color: resumeInfo?.themeColor }}
            >
              Technical Skills
            </h2>
            <hr
              className="border-2 my-3"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            <div className="grid grid-cols-1 gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm font-medium uppercase">
                    {skill?.name || "Skill not specified"}
                  </span>
                  <div className="flex">
                    {Array.from({ length: skill?.rating || 0 }, (_, i) => (
                      <span key={i} className="text-gray-600 text-xs">
                        ■
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "elegant":
        return (
          <div className="my-5">
            <h2
              className="font-serif text-base mb-3 italic"
              style={{ color: resumeInfo?.themeColor }}
            >
              Skills
            </h2>
            <hr
              className="border-dashed my-2"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs border border-gray-300 px-2 py-1 rounded italic"
                >
                  {skill?.name || "Skill not specified"}
                </span>
              ))}
            </div>
          </div>
        );

      case "compact":
        return (
          <div className="my-3">
            <h2
              className="font-semibold text-xs mb-2 uppercase"
              style={{ color: resumeInfo?.themeColor }}
            >
              Skills
            </h2>
            <hr
              className="border my-1"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-200 px-1 py-0.5 rounded"
                >
                  {skill?.name || "Skill not specified"}
                </span>
              ))}
            </div>
          </div>
        );

      default:
        // Split skills array into two arrays for two columns
        const midPoint = Math.ceil(skills.length / 2);
        const leftColumnSkills = skills.slice(0, midPoint);
        const rightColumnSkills = skills.slice(midPoint);

        const SkillColumn = ({ skillList }) => (
          <ul className="list-none p-0">
            {skillList.map((skill, index) => (
              <li key={index} className="flex items-center mb-2">
                <span className="text-sm font-medium mr-2">
                  {skill?.name || "Skill not specified"}
                </span>
                <span>
                  {skill?.rating
                    ? Array.from({ length: skill.rating }, () => "⭐").join(" ")
                    : "No rating provided"}
                </span>
              </li>
            ))}
          </ul>
        );

        return (
          <div className="my-6">
            <h2 className="text-center font-bold text-sm mb-2">Skills</h2>
            <hr
              className="border-[1.5px] my-2"
              style={{
                borderColor: resumeInfo?.themeColor || "rgb(107 114 128 ",
              }}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="pr-2">
                <SkillColumn skillList={leftColumnSkills} />
              </div>
              <div className="pl-2">
                <SkillColumn skillList={rightColumnSkills} />
              </div>
            </div>
          </div>
        );
    }
  };

  return renderSkills();
};

export default SkillsPreview;
