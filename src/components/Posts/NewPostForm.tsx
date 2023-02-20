import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Checkbox,
  Flex,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TapItem from "./TapItem";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "@/src/atoms/postsAtom";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/src/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

type NewPostFormProps = {
  user: User;
};

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

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { communityId } = router.query;

  const handleCreatePost = async () => {
    setLoading(true);
    const { title, body } = textInputs;
    try {
      // store the post in db
      const postDocRef = await addDoc(
        collection(firestore, "posts"),

        {
          communityId,
          creatorId: user?.uid,
          creatorDisplayName: user?.displayName,
          creatorEmail: user?.email,
          title,
          body,
          numberOfComments: 0,
          voteStatus: 0,
          createdAt: serverTimestamp(),
        }
      );

      // check for selectedFile
      if (selectedFile) {
        // store in storage => getDownloadURL (return imageURL)

        const postsImages: string[] = [];

        for (let i = 0; i < selectedFile.length; i++) {
          const imageRef = ref(storage, `posts/${postDocRef.id}/image${i}`);
          await uploadString(imageRef, selectedFile[i], "data_url");
          const downloadURL = await getDownloadURL(imageRef);

          postsImages.push(downloadURL);
        }
        console.log(postsImages);
        await updateDoc(postDocRef, {
          imageURL: postsImages,
        });
      }

      // redirect the user back to the communityPage using the router
      router.back();
    } catch (error: any) {
      console.log("handleCreatePost Error", error.message);
      setError(true);
    }
    setLoading(false);
  };

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
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Error Creating Post.</AlertDescription>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
