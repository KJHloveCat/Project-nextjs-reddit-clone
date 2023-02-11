import { Flex, MenuItem, Icon, Text } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CreateCommunityModal
        open={open}
        closeHandler={() => {
          setOpen(false);
        }}
      />
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
          <Text fontSize={15}>Create Community</Text>
        </Flex>
      </MenuItem>
    </>
  );
};
export default Communities;
