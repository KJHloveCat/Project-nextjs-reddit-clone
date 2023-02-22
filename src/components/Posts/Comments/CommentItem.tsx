import { Box, Flex, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createAt: Timestamp;
};

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  userId: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDeleteComment,
  loadingDelete,
  userId,
}) => {
  return (
    <Flex align="center" p={1}>
      <Icon as={FaReddit} fontSize={35} color="gray.300" mb={14} mr={2} />
      <Stack spacing="3px">
        <Stack direction="row" align="center" fontSize="8pt">
          <Text fontSize="12px" fontWeight={600}>
            {comment.creatorDisplayText}
          </Text>
          <Text fontSize="12px" color="#7C7C7C">
            {moment(new Date(comment.createAt?.seconds * 1000)).fromNow()}
          </Text>
          {loadingDelete && <Spinner />}
        </Stack>

        <Text fontSize="14px">{comment.text}</Text>
        <Stack
          direction="row"
          fontSize="12px"
          align="center"
          cursor="pointer"
          color="#878a8c"
          fontWeight={700}
          spacing={2}
        >
          <Icon
            as={BsArrowUpCircle}
            _hover={{ bg: "rgba(135,138,140,0.2)", color: "#ff4500" }}
            boxSize="20px"
          />
          <Text color="black">0</Text>
          <Icon
            as={BsArrowDownCircle}
            _hover={{ bg: "rgba(135,138,140,0.2)", color: "#7193ff" }}
            boxSize="20px"
          />
          {userId === comment.creatorId && (
            <>
              <Text p="6px" _hover={{ bg: "rgba(135,138,140,0.2)" }}>
                Edit
              </Text>
              <Text
                p="6px"
                _hover={{ bg: "rgba(135,138,140,0.2)" }}
                onClick={() => {
                  onDeleteComment(comment);
                }}
              >
                Delete
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
export default CommentItem;
