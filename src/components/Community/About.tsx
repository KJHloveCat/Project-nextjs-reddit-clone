import { Community } from "@/src/atoms/communitiesAtom";
import { Box, Flex, Text, Icon, Stack, Button } from "@chakra-ui/react";
import { HiDotsHorizontal, HiOutlineCake } from "react-icons/hi";
import React from "react";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  return (
    <Box position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        bg="#0079D3"
        color="white"
        borderRadius="4px 4px 0px 0px"
        p="12px"
      >
        <Text fontWeight={600} fontSize="14px">
          About Community
        </Text>
        <Icon as={HiDotsHorizontal} cursor="pointer" />
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
        <Stack spacing="12px">
          <Text fontSize="14px">Welcome to {communityData.id}</Text>
          <Flex direction="row" mt={-10}>
            <Icon as={HiOutlineCake} boxSize={21} mr={1} />

            <Text fontSize="14px" color="#7C7C7C">
              Created Jan 25, 2008
            </Text>
            {/* <Text>{communityData.createAt}</Text> */}
          </Flex>
          <Flex
            direction="row"
            borderTop="1px solid #1A1A1B12"
            borderBottom="1px solid #1A1A1B12"
            p="16px 0px"
            justifyContent="space-between"
          >
            <Flex direction="column">
              <Text
                fontFamily="IBM Plex Sans"
                fontWeight={500}
                fontSize="16px"
                color="#1A1A1B"
              >
                14.7K
              </Text>
              <Text
                fontFamily="IBM Plex Sans"
                fontWeight={500}
                fontSize="12px"
                color="#7C7C7C"
              >
                Members
              </Text>
            </Flex>
            <Flex direction="column">
              <Flex align="center" direction="row">
                <Text fontSize={4} color="#46d160" mr={1}>
                  ●
                </Text>
                <Text
                  fontFamily="IBM Plex Sans"
                  fontWeight={500}
                  fontSize="16px"
                  color="#1A1A1B"
                >
                  66
                </Text>
              </Flex>
              <Text
                fontFamily="IBM Plex Sans"
                fontWeight={500}
                fontSize="12px"
                color="#7C7C7C"
              >
                Online
              </Text>
            </Flex>
            <Flex direction="column" mr="50px">
              <Text
                fontFamily="IBM Plex Sans"
                fontWeight={500}
                fontSize="16px"
                color="#1A1A1B"
              >
                Top 5%
              </Text>
              <Text
                fontFamily="IBM Plex Sans"
                fontWeight={500}
                fontSize="12px"
                color="#7C7C7C"
              >
                Ranked by Size
              </Text>
            </Flex>
          </Flex>
          <Button fontSize="14px" height="32px" bg="#0079d3">
            Create Post
          </Button>
          <Flex
            direction="row"
            borderTop="1px solid #1A1A1B12"
            borderBottom="1px solid #1A1A1B12"
            p="16px 0px"
            justifyContent="space-between"
          >
            <Text color="#1A1A1B" fontWeight={700} fontSize="10px">
              USER FLAIR PREVIEW
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};
export default About;
