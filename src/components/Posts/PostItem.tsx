import { Post } from "@/src/atoms/postsAtom";
import { UpDownIcon } from "../Community/HeaderIcon";
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
import { useRouter } from "next/router";
import Link from "next/link";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (post: Post, vote: number, communityId: string) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
  homePage,
}) => {
  const [error, setError] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const router = useRouter();
  const singlePostPage = !onSelectPost;
  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error("Failed to delete the post");
      }

      console.log("Post was successfully delete");
      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      setError(error.message);
    }

    setLoadingDelete(false);
  };

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={singlePostPage ? "white" : "gray.300"}
      borderRadius={"4px"}
      _hover={{ borderColor: singlePostPage ? "none" : "gray.500" }}
      cursor={singlePostPage ? "unset" : "pointer"}
      onClick={() => {
        onSelectPost && onSelectPost(post);
      }}
    >
      <Flex
        direction="column"
        align="center"
        bg={singlePostPage ? "white" : "rgba(135,138,140,0.1)"}
        p={2}
        width="40px"
        borderRadius={4}
      >
        <Icon
          as={userVoteValue === 1 ? BsArrowUpCircleFill : BsArrowUpCircle}
          color={userVoteValue === 1 ? "#ff4500" : "#878a8c"}
          fontSize={22}
          onClick={(event: React.MouseEvent) => {
            onVote(post, 1, post.communityId);
            event.stopPropagation();
          }}
          _hover={{ bg: "rgba(135,138,140,0.2)", color: "#ff4500" }}
        />
        <Text margin="5px 0px" fontSize="9pt" fontWeight={700}>
          {post.voteStatus}
        </Text>
        <Icon
          as={userVoteValue === -1 ? BsArrowDownCircleFill : BsArrowDownCircle}
          color={userVoteValue === -1 ? "#7193ff" : "#878a8c"}
          fontSize={22}
          onClick={(event: React.MouseEvent) => {
            onVote(post, -1, post.communityId);
            event.stopPropagation();
          }}
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
            {homePage && (
              <>
                {post.communityImageURL ? (
                  <Image
                    src={post.communityImageURL}
                    borderRadius="full"
                    boxSize="12px"
                    mr={2}
                  />
                ) : (
                  <Icon
                    as={UpDownIcon}
                    boxSize={21}
                    mr={1}
                    color={"blue.500"}
                  />
                )}
                <Link href={`r/${post.communityId}`}>
                  <Text
                    fontWeight={700}
                    fontSize="12px"
                    _hover={{ textDecoration: "underline" }}
                    onClick={(event: React.MouseEvent) => {
                      event.stopPropagation();
                    }}
                  >{`r/${post.communityId}`}</Text>
                </Link>
                <Icon as={BsDot} color="gray.500" fontSize="8px" />
              </>
            )}
            <Text fontSize="9pt" color="#787C7E" mr={1}>
              Posted by u/{post.creatorEmail} {post.creatorDisplayName}
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
                onClick={(event: React.MouseEvent) => {
                  event.stopPropagation();
                  handleDelete();
                }}
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
