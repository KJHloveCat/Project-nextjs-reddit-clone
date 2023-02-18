import { Post } from "@/src/atoms/postsAtom";
import {
  Flex,
  Image,
  Icon,
  Text,
  Stack,
  Skeleton,
  Spinner,
  AlertDescription,
  AlertTitle,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineShareAlt } from "react-icons/ai";
import {
  BsArrowDownCircle,
  BsArrowDownCircleFill,
  BsArrowUpCircle,
  BsArrowUpCircleFill,
  BsChat,
  BsDot,
} from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { TbArrowBigTop, TbArrowBigDown } from "react-icons/tb";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoBookmarksOutline,
} from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { TfiShare } from "react-icons/tfi";
import moment from "moment";
import { HiOutlineChat } from "react-icons/hi";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => {};
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  const [error, setError] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error("Failed to delete the post");
      }

      console.log("Post was successfully delete");
    } catch (error: any) {
      setError(error.message);
    }

    setLoadingDelete(false);
  };
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor="gray.300"
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      cursor="pointer"
    >
      <Flex
        direction="column"
        align="center"
        bg="rgba(135,138,140,0.1)"
        p={2}
        width="40px"
        borderRadius={4}
      >
        <Icon
          as={false ? BsArrowUpCircleFill : BsArrowUpCircle}
          color={false ? "#ff4500" : "#878a8c"}
          fontSize={22}
          onClick={onVote}
          _hover={{ bg: "rgba(135,138,140,0.2)", color: "#ff4500" }}
        />
        <Text margin="5px 0px" fontSize="9pt">
          {post.voteStatus}
        </Text>
        <Icon
          as={false ? BsArrowDownCircleFill : BsArrowDownCircle}
          color={false ? "#7193ff" : "#878a8c"}
          fontSize={22}
          onClick={onVote}
          _hover={{ bg: "rgba(135,138,140,0.2)", color: "#7193ff" }}
        />
      </Flex>
      <Flex direction="column" width="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Stack spacing={1} p="8px">
          <Stack direction="row" spacing={0.6} align="center">
            {/* Homepage Check */}
            <Text fontSize="9pt" color="#787C7E" mr={1}>
              Posted by u/{post.creatorDisplayName}
            </Text>
            <Text fontSize="9pt" color="#787C7E">
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize="18px" fontWeight={600} color="#222222">
            {post.title}
          </Text>
          <Text fontSize="14px" color="#1C1C1C">
            {post.body}
          </Text>
          {post.imageURL &&
            post.imageURL.map((image, index) => (
              <Image key={index} src={image} alt="Post Image" />
            ))}
        </Stack>
        <Flex fontSize="12px" color="#878A8C" fontWeight={600} ml={1} mb={1}>
          <Flex align="center" direction="row">
            <Flex
              align="center"
              p="8px"
              cursor="pointer"
              _hover={{ bg: "#1A1A1B1A" }}
            >
              <Icon as={HiOutlineChat} mr={1} boxSize={25}></Icon>
              <Text>{post.numberOfComments} Comments</Text>
            </Flex>
            <Flex
              align="center"
              p="8px"
              cursor="pointer"
              _hover={{ bg: "#1A1A1B1A" }}
            >
              <Icon as={GoGift} mr={1} boxSize={25}></Icon>
              <Text>Award</Text>
            </Flex>
            <Flex
              align="center"
              p="8px"
              cursor="pointer"
              _hover={{ bg: "#1A1A1B1A" }}
            >
              <Icon as={AiOutlineShareAlt} mr={2} boxSize={25}></Icon>
              <Text>Share</Text>
            </Flex>

            {userIsCreator && (
              <Flex
                align="center"
                p="8px"
                cursor="pointer"
                _hover={{ bg: "#1A1A1B1A" }}
                onClick={handleDelete}
              >
                {loadingDelete ? (
                  <Spinner size="sm" />
                ) : (
                  <>
                    <Icon as={AiOutlineDelete} mr={1} boxSize={25}></Icon>
                    <Text>Delete</Text>
                  </>
                )}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>

      {/* {post.imageURL && <Image src={post.imageURL[0]} />} */}
    </Flex>
  );
};
export default PostItem;
