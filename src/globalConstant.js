
import { v4 as uuidv4 } from "uuid";
import Instance from "./AxiosConfig";
import Swal from "sweetalert2";

export const REACT_APP_FRONTEND_URL_WEBSITE = "https://bilkins.com/";
export const REACT_APP_FRONTEND_URL_CMS = "https://cms.bilkins.com/";
export const IMG_URL = `https://bilkins-bucket.s3.amazonaws.com`;

export const handleFileUpload = async (file, fileName, type) => {
  try {
    const response = await Instance.get('/getUploadUrl', {
      params: {
        fileName: fileName,
        contentType: type,
      },
    });
    const presignedUrl = response?.data?.url;

    await Instance.put(presignedUrl, file, {
      headers: {
        'Content-Type': type,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const createUniqueS3FilenameWithDate = (filename) => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const uniqueId = uuidv4();
  const ext = filename.split('.').pop();
  const baseName = filename.replace(`.${ext}`, '');
  const validBaseName = baseName.replace(/[^a-zA-Z0-9-_]/g, '_');
  const uniqueFilename = `${validBaseName}-${date}-${uniqueId}.${ext}`;
  return uniqueFilename;
}

export const showErrorAlert = (message) => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Error",
    text: message,
    customClass: {
      icon: "centered-icon",
    },
  });
};
export const showSuccessAlert = (message) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Successful",
    text: message,
    customClass: {
      icon: "centered-icon",
    },
  });
};

export const formateDate = (date) => {
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

export const GOOGLE_CLIENT_ID = "49511576255-g6b4e7gdsi49nuablpttnuf27j3970tv.apps.googleusercontent.com";

export const JobCategoryOptions = [
  { label: "Allied Jobs", value: "Allied Jobs" },
  { label: "Nursing Jobs", value: "Nursing Jobs" }
];

export const JobTypeOptions = [
  { value: "Part Time", label: "Part Time" },
  { value: "Full Time", label: "Full Time" },
  { value: 'Travel Contact', label: 'Travel Contact' },
  { value: 'Per Diem', label: 'Per Diem' },
  { value: "Internship", label: "Internship" },
  { value: "Contract", label: "Contract" }
];

export const ShiftTypeOptions = [
  { value: "Day", label: "Day Shift" },
  { value: "Mid", label: "Mid Shift" },
  { value: "Evening", label: "Evening Shift" },
  { value: "Night", label: "Night Shift" },
  { value: "Rotating", label: "Rotating" }
];

export const ShiftHoursOptions = [
  { value: "5x8", label: "5x8" },
  { value: "4x10", label: "4x10" },
  { value: "4x12", label: "4x12" },
  { value: "3x12", label: "3x12" }
];

export const ExperienceLevelOptions = [
  { label: "Entry Level", value: "Entry Level" },
  { label: "Mid-Level", value: "Mid-Level" },
  { label: "Senior Level", value: "Senior Level" }
]

export const formatUrl = (str) => {
  return str.toLowerCase().replace(/\s+/g, '-');
};