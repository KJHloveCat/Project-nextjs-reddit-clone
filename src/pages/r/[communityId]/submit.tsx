import PostPageContent from "@/src/components/Layout/PostPageContent";
import NewPostForm from "@/src/components/Posts/NewPostForm";
import { Box, Img, Text } from "@chakra-ui/react";
import React from "react";

const SubmitPostPage: React.FC = () => {
  return (
    <PostPageContent>
      <>
        <Box
          borderBottom="1px solid rgba(255,255,255,0.5)"
          margin="16px 0px"
          padding="4px"
          height="41px"
        >
          <Text fontWeight={600}>Create a post</Text>
        </Box>
        <NewPostForm />
      </>
      <>
        <Box w="310px" bg="tomato" mt={10}>
          This is Box
        </Box>
        {/* About */}{" "}
      </>
    </PostPageContent>
  );
};
export default SubmitPostPage;
