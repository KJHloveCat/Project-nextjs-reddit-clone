import { Flex, MenuItem, Icon, Text, Box } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { useRecoilValue } from "recoil";
import { communityState } from "@/src/atoms/communitiesAtom";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;

  return (
    <>
      <CreateCommunityModal
        open={open}
        closeHandler={() => {
          setOpen(false);
        }}
      />
      <Box>
        <Text
          fontWeight={500}
          fontFamily="Arial"
          fontSize="10px"
          color="#878A8C"
          p="16px 24px 8px"
        >
          MODERATING
        </Text>
      </Box>
      {mySnippets
        .filter((snippet) => snippet.isModerator)
        .map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            displayText={`r/${snippet.communityId}`}
            icon={FaReddit}
            link={`/r/${snippet.communityId}`}
            iconColor={"blue.500"}
            imageURL={snippet.imageURL}
          />
        ))}
      <Box>
        <Text
          fontWeight={500}
          fontFamily="Arial"
          fontSize="10px"
          color="#878A8C"
          p="16px 24px 8px"
        >
          YOUR COMMUNITIES
        </Text>
      </Box>

      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          <Text fontFamily="IBM Flex Sans" fontSize="14px" color="#1C1C1C">
            Create Community
          </Text>
        </Flex>
      </MenuItem>

      {mySnippets.map((snippet) => (
        <MenuListItem
          key={snippet.communityId}
          displayText={`r/${snippet.communityId}`}
          icon={FaReddit}
          link={`/r/${snippet.communityId}`}
          iconColor={"blue.500"}
          imageURL={snippet.imageURL}
        />
      ))}
    </>
  );
};
export default Communities;
