import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {
  children: React.ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex justify="center" p="20px 24px 0px 24px " border="1px solid red">
      <Flex
        width="100%"
        border="1px solid green"
        // justify="center"
        maxWidth="977px"
      >
        {/* LHS (Left Hand Side) */}
        <Flex
          direction="column"
          width={{ base: "100%", lg: "65.5%" }}
          mr={{ base: "none", lg: "23px" }}
          border="1px solid blue"
        >
          {children && children[0 as keyof typeof children]}
        </Flex>

        {/* RHS (Right Hand Side) */}
        <Flex
          direction="column"
          display={{ base: "none", lg: "flex" }}
          flexGrow={1}
          border="1px solid orange"
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
