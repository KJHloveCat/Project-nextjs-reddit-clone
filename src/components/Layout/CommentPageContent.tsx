import { Flex } from "@chakra-ui/react";
import React from "react";

type CommentPageContentProps = {
  children: React.ReactNode;
};

const CommentPageContent: React.FC<CommentPageContentProps> = ({
  children,
}) => {
  return (
    <Flex justify="center" p="20px 24px 24px 24px ">
      <Flex width="100%" maxWidth="1000px">
        {/* LHS (Left Hand Side) */}
        <Flex
          direction="column"
          width={{ base: "100%", lg: "76%" }}
          mr={{ base: "none", lg: "23px" }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>

        {/* RHS (Right Hand Side) */}
        <Flex
          direction="column"
          width="310px"
          display={{ base: "none", lg: "flex" }}
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default CommentPageContent;
