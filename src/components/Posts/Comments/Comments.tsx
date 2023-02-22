import { Post } from "@/src/atoms/postsAtom";
import { firestore } from "@/src/firebase/clientApp";
import { Box, Flex, Stack, Text, Icon } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import CommentInput from "./CommentInput";
import { postState } from "../../../atoms/postsAtom";
import CommentItem, { Comment } from "./CommentItem";
import { IoIosChatboxes } from "react-icons/io";

type CommentsProps = {
  user: User;
  selectedPost: Post | null;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingDeleteId, setLoadingDeleteId] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const setPostState = useSetRecoilState(postState);

  const onCreateComment = async () => {
    setCreateLoading(true);
    try {
      const batch = writeBatch(firestore);

      // create a comment document
      const commentDocRef = doc(collection(firestore, "comments"));

      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.displayName!,
        communityId,
        postId: selectedPost?.id!,
        postTitle: selectedPost?.title!,
        text: commentText,
        createAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentDocRef, newComment);

      newComment.createAt = { seconds: Date.now() / 1000 } as Timestamp;

      // update post numberOfComments + 1
      const postDocRef = doc(firestore, "posts", selectedPost?.id!);

      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      // update client recoil state
      setCommentText("");
      setComments((prev) => [...prev, newComment]);
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));
    } catch (error) {
      console.log("onCreateComment error", error);
    }

    setCreateLoading(false);
  };

  const onDeleteComment = async (comment: Comment) => {
    setLoadingDeleteId(comment.id);
    // update client recoil state
    try {
      const batch = writeBatch(firestore);

      // delete a comment document
      const commentDocRef = doc(firestore, "comments", comment.id);
      batch.delete(commentDocRef);

      // update post numberOfComments - 1
      const postDocRef = doc(firestore, "posts", selectedPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(-1),
      });

      await batch.commit();
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! - 1,
        } as Post,
      }));

      setComments((prev) => prev.filter((item) => item.id !== comment.id));
    } catch (error) {
      console.log("onDeleteComment Error", error);
    }

    setLoadingDeleteId("");
  };

  const getPostComments = async () => {
    try {
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost?.id),
        orderBy("createAt", "desc")
      );
      const commentsDocs = await getDocs(commentsQuery);

      const comments = commentsDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments as Comment[]);
    } catch (error) {
      console.log("getPostError", error);
    }
  };

  useEffect(() => {
    if (!selectedPost) return;
    getPostComments();
  }, [selectedPost]);

  return (
    <Box bg="white" borderRadius="0px 0px 4px 4px" p={2}>
      <Flex
        direction="column"
        pl={10}
        pr={4}
        mb={6}
        fontSize="10pt"
        width="100%"
      >
        <CommentInput
          commentText={commentText}
          createLoading={createLoading}
          onCreateComment={onCreateComment}
          setCommentText={setCommentText}
          user={user}
        />
      </Flex>
      <Stack spacing={1}>
        {comments.length === 0 ? (
          <>
            <Stack direction={"column"} align="center" p={25} spacing={3}>
              <Icon
                boxSize={30}
                color="rgba(0,121,211,0.4)"
                as={IoIosChatboxes}
              />
              <Text
                fontSize="18px"
                fontWeight={600}
                color="#7c7c7c"
                opacity="0.6"
              >
                No Comments Yet
              </Text>
              <Text fontSize="14px" color="#7C7C7C" opacity="0.6">
                Be the first to share what you think!
              </Text>
            </Stack>
          </>
        ) : (
          comments.map((item) => (
            <CommentItem
              key={item.id}
              comment={item}
              userId={user?.uid}
              onDeleteComment={onDeleteComment}
              loadingDelete={loadingDeleteId === item.id}
            />
          ))
        )}
      </Stack>
    </Box>
  );
};
export default Comments;
