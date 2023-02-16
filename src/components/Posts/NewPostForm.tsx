import { Checkbox, Flex, Icon, Link, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TapItem from "./TapItem";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";

type NewPostFormProps = {};

const formTabs: TabItem[] = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostFormProps> = () => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {};

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile((prev) => [
          ...prev,
          readerEvent.target?.result as string,
        ]);
      }
    };

    event.target.value = "";
  };

  const onDeleteImage = (imageURL: string) => {
    setSelectedFile((prev) => {
      return prev.filter((item) => item !== imageURL);
    });
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius="4px" mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <TapItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectImage}
            setSelectedTab={setSelectedTab}
            onDeleteImage={onDeleteImage}
          />
        )}
      </Flex>

      <Flex
        direction="column"
        height="89px"
        bg="rgba(135, 138, 140, 0.1)"
        padding="17px 16px"
      >
        <Checkbox defaultChecked mb={2}>
          <Text fontWeight={600} fontSize={13}>
            Send me post reply notifications
          </Text>
        </Checkbox>
        <Link fontWeight={600} fontSize={13} color="#0079D3" href="#">
          Connect accounts to share your post
        </Link>
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
