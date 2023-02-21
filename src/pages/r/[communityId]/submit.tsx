import { authModalState } from "@/src/atoms/authModalAtom";
import { communityState } from "@/src/atoms/communitiesAtom";
import About from "@/src/components/Community/About";
import PostingRule from "@/src/components/Community/PostingRule";
import PostPageContent from "@/src/components/Layout/PostPageContent";
import NewPostForm from "@/src/components/Posts/NewPostForm";
import { auth } from "@/src/firebase/clientApp";
import useCommunityData from "@/src/hooks/useCommunityData";
import { Box, Img, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue } from "recoil";

const SubmitPostPage: React.FC = () => {
  const { communityStateValue } = useCommunityData();
  const [modalSTate, setModalState] = useRecoilState(authModalState);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      setModalState((prev) => ({
        open: true,
        view: "login",
      }));
    }
  }, [user]);

  return (
    <PostPageContent>
      {user && (
        <>
          <Box
            borderBottom="1px solid rgba(255,255,255,0.5)"
            margin="16px 0px"
            padding="4px"
            height="41px"
          >
            <Text fontWeight={600}>Create a post</Text>
          </Box>
          <NewPostForm user={user} />
        </>
      )}

      {user && (
        <>
          {communityStateValue.currentCommunity && (
            <About communityData={communityStateValue.currentCommunity} />
          )}
          <PostingRule />
        </>
      )}
    </PostPageContent>
  );
};
export default SubmitPostPage;
