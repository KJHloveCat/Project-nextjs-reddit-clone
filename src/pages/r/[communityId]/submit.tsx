import { communityState } from "@/src/atoms/communitiesAtom";
import PostPageContent from "@/src/components/Layout/PostPageContent";
import NewPostForm from "@/src/components/Posts/NewPostForm";
import { auth } from "@/src/firebase/clientApp";
import { Box, Img, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);

  if (!user) {
  }
  return (
    <PostPageContent>
      <>
        <Box
          borderBottom="1px solid rgba(255,255,255,0.5)"
          margin="16px 0px"
          padding="4px"
          height="41px"
        >
          {user && <Text fontWeight={600}>Create a post</Text>}
          {!user && (
            <Text fontWeight={600}>
              You need to login before submit the post!
            </Text>
          )}
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <>
        {user && (
          <Box w="310px" bg="tomato" mt={10}>
            This is Box
          </Box>
        )}

        {/* About */}
      </>
    </PostPageContent>
  );
};
export default SubmitPostPage;
