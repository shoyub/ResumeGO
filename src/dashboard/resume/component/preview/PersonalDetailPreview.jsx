/* eslint-disable react/prop-types */
const PersonalDetailPreview = ({ resumeInfo, templateType = "modern" }) => {
  const personalDetail = resumeInfo?.personalDetail;

  if (!personalDetail) {
    return (
      <div className="text-center text-gray-500 text-sm font-medium py-4">
        No personal data added.
      </div>
    );
  }

  const renderPersonalDetails = () => {
    const name = `${personalDetail.firstName || "First Name"} ${
      personalDetail.lastName || "Last Name"
    }`;
    const jobTitle = personalDetail.jobTitle || "Job Title not specified";
    const address = personalDetail.address || "Address not provided";
    const phone = personalDetail.phone || "Phone not provided";
    const email = personalDetail.email || "Email not provided";

    switch (templateType) {
      case "modern":
        return (
          <div className="text-center">
            <h2
              className="font-bold text-2xl mb-2"
              style={{ color: resumeInfo?.themeColor }}
            >
              {name}
            </h2>
            <h2 className="text-lg font-medium mb-3">{jobTitle}</h2>
            <h2 className="text-sm font-normal mb-4">{address}</h2>
            <div className="flex justify-center space-x-6 text-sm">
              <span>{phone}</span>
              <span>|</span>
              <span>{email}</span>
            </div>
            <hr
              className="border-2 my-4"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
          </div>
        );

      case "classic":
        return (
          <div className="text-center">
            <h2 className="font-bold text-xl mb-1">{name}</h2>
            <h2 className="text-sm font-medium mb-2">{jobTitle}</h2>
            <h2 className="text-xs font-normal mb-3">{address}</h2>
            <div className="flex justify-between text-xs">
              <span>{phone}</span>
              <span>{email}</span>
            </div>
            <hr
              className="border-[1.5px] my-3"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
          </div>
        );

      case "minimal":
        return (
          <div className="text-left">
            <h2
              className="font-bold text-xl mb-1"
              style={{ color: resumeInfo?.themeColor }}
            >
              {name}
            </h2>
            <h2 className="text-sm font-medium mb-2">{jobTitle}</h2>
            <div className="text-xs space-y-1">
              <p>{address}</p>
              <p>
                {phone} | {email}
              </p>
            </div>
            <hr
              className="border my-2"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
          </div>
        );

      case "creative":
        return (
          <div className="text-center relative">
            <div
              className="absolute inset-0 rounded-full opacity-10"
              style={{ backgroundColor: resumeInfo?.themeColor }}
            ></div>
            <h2
              className="font-bold text-3xl mb-3 relative z-10"
              style={{ color: resumeInfo?.themeColor }}
            >
              {name}
            </h2>
            <h2 className="text-lg font-medium mb-4">{jobTitle}</h2>
            <h2 className="text-sm font-normal mb-3">{address}</h2>
            <div className="flex justify-center space-x-4 text-sm">
              <span>{phone}</span>
              <span>•</span>
              <span>{email}</span>
            </div>
            <hr
              className="border-4 my-5 rounded"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
          </div>
        );

      case "professional":
        return (
          <div className="text-center">
            <h2 className="font-bold text-2xl mb-2 uppercase tracking-wide">
              {name}
            </h2>
            <h2 className="text-base font-semibold mb-3">{jobTitle}</h2>
            <h2 className="text-sm font-normal mb-4">{address}</h2>
            <div className="flex justify-center space-x-8 text-sm font-medium">
              <span>{phone}</span>
              <span>{email}</span>
            </div>
            <hr
              className="border-2 my-4"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
          </div>
        );

      case "elegant":
        return (
          <div className="text-center">
            <h2
              className="font-serif text-2xl mb-2 italic"
              style={{ color: resumeInfo?.themeColor }}
            >
              {name}
            </h2>
            <h2 className="text-base font-medium mb-3">{jobTitle}</h2>
            <h2 className="text-sm font-normal mb-4">{address}</h2>
            <div className="flex justify-center space-x-6 text-sm">
              <span className="font-medium">{phone}</span>
              <span className="text-gray-400">|</span>
              <span className="font-medium">{email}</span>
            </div>
            <hr
              className="border-dashed my-4"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
          </div>
        );

      case "compact":
        return (
          <div className="text-left">
            <h2 className="font-bold text-lg mb-1">{name}</h2>
            <h2 className="text-xs font-medium mb-1">{jobTitle}</h2>
            <h2 className="text-xs font-normal mb-2">{address}</h2>
            <div className="text-xs">
              <p>
                {phone} • {email}
              </p>
            </div>
            <hr
              className="border my-2"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
          </div>
        );

      default:
        return (
          <div>
            <h2 className="font-bold text-xl text-center">{name}</h2>
            <h2 className="text-center text-sm font-medium">{jobTitle}</h2>
            <h2 className="text-center font-normal text-xs">{address}</h2>
            <div className="flex justify-between">
              <h2 className="font-normal text-xs">{phone}</h2>
              <h2 className="font-normal text-xs">{email}</h2>
            </div>
            <hr
              className="border-[1.5px] my-2"
              style={{ borderColor: resumeInfo?.themeColor || "#000" }}
            />
          </div>
        );
    }
  };

  return renderPersonalDetails();
};

export default PersonalDetailPreview;
