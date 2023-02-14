import { Community } from "@/src/atoms/communitiesAtom";
import { UpDownIcon } from "@/src/components/Community/HeaderIcon";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import useCommunityData from "@/src/hooks/useCommunityData";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const [onBtnText, setOnBtnText] = useState("Joined");
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  ); // read the communitySnippets

  function over() {
    setOnBtnText("Leave");
  }

  function out() {
    setOnBtnText("Joined");
  }

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="#33a8ff" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="95%" maxWidth="990px">
          {communityData.imageURL ? (
            <Image />
          ) : (
            <Icon
              top={-3}
              boxSizing="border-box"
              position="relative"
              borderRadius="full"
              as={UpDownIcon}
              border="4px solid white"
              boxShadow="0 0 0 1px white inset"
              boxSize="72px"
              color="#0079d3"
            />
          )}
          <Flex padding="0 0 0 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={700} fontSize="28px">
                {communityData.id}
              </Text>
              <Text fontWeight={500} fontSize="14px" color="#7C7C7C">
                r/{communityData.id}
              </Text>
            </Flex>

            <Button
              variant={isJoined ? "outline" : "solid"}
              fontWeight="700"
              fontSize="14px"
              width="96px"
              height="32px"
              mt={2}
              isLoading={loading}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
              onMouseOver={over}
              onMouseOut={out}
            >
              {isJoined ? onBtnText : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
