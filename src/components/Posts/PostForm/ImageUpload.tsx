import { Button, Flex, Image } from "@chakra-ui/react";
import React, { useRef } from "react";

type ImageUploadProps = {
  selectedFile?: string[];
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  onDeleteImage: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  onSelectImage,
  setSelectedTab,
  onDeleteImage,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <Flex justify="center" align="center" width="100%">
      <Flex
        direction="column"
        justify="center"
        align="center"
        p={selectedFile![0] ? 10 : 20}
        border="1px dashed"
        borderColor="gray.200"
        width="100%"
        borderRadius={4}
      >
        {selectedFile?.map((image, index) => (
          <>
            <Image key={index} src={image} maxWidth="600px" />
            <Button
              top={-7}
              display="relative"
              height={"28px"}
              onClick={() => onDeleteImage(image)}
            >
              Remove
            </Button>
          </>
        ))}
        <Button
          variant="outline"
          height={"28px"}
          onClick={() => {
            selectedFileRef.current?.click();
          }}
        >
          Upload
        </Button>
        <input
          ref={selectedFileRef}
          type="file"
          hidden
          onChange={onSelectImage}
        />
      </Flex>
    </Flex>
  );
};
export default ImageUpload;
