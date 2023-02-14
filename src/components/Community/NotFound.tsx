import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import "@fontsource/ibm-plex-sans";

const CommunityNotFound: React.FC = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <Text fontWeight="600" fontSize="18px" mb={4}>
        Sorry, there aren’t any communities on Reddit with that name.
      </Text>
      <Text
        fontFamily={"IBM Plex Sans"}
        fontSize="14px"
        fontWeight="400"
        mb={8}
      >
        This community may have been banned or the community name is incorrect.
      </Text>

      <Flex>
        <Button height="32px" mt={4} mr={4} variant="outline">
          <Text fontSize="14px" fontWeight="700">
            Create Community
          </Text>
        </Button>
        <Link href="/">
          <Button height="32px" mt={4}>
            <Text fontSize="14px" fontWeight="700">
              GO HOME
            </Text>
          </Button>
        </Link>
      </Flex>
      <Flex width="476px" mt="45px" display="flex">
        <Text
          fontFamily={"IBM Plex Sans"}
          fontSize="12px"
          color="#878A8C"
          align="center"
        >
          Use of this site constitutes acceptance of our
          <Text as="u" margin="0 4px 0 4px">
            User Agreement
          </Text>
          and
          <Text as="u" ml="4px">
            Privacy Policy
          </Text>
          . ©2023 reddit inc. All rights reserved. REDDIT and the ALIEN Logo are
          registered trademarks of reddit inc.
        </Text>
      </Flex>
    </Flex>
  );
};
export default CommunityNotFound;
