import React, { useState } from "react";

const useSelectedFile = () => {
  const [selectedFile, setSelectedFile] = useState<string>();
  const [selectedBanner, setSelectedBanner] = useState<string>();
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  const onSelectBanner = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedBanner(readerEvent.target.result as string);
      }
    };
  };

  return {
    selectedFile,
    setSelectedFile,
    onSelectImage,

    selectedBanner,
    setSelectedBanner,
    onSelectBanner,
  };
};
export default useSelectedFile;
