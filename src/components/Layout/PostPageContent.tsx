import { Flex } from "@chakra-ui/react";
import React from "react";

type PostPageContent = {
  children: React.ReactNode;
};

const PostPageContent: React.FC<PostPageContent> = ({ children }) => {
  return (
    <Flex justify="center">
      <Flex width="100%" maxWidth="1150px" padding="20px 24px">
        {/* LHS (Left Hand Side) */}
        <Flex
          direction="column"
          width={{ base: "100%", lg: "67%" }}
          mr={{ base: "none", lg: "23px" }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>

        {/* RHS (Right Hand Side) */}
        <Flex
          direction="column"
          display={{ base: "none", lg: "flex" }}
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostPageContent;
