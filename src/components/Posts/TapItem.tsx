import { Flex, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { TabItem } from "./NewPostForm";

type TapItemProps = {
  item: TabItem;
  selected: boolean;
  setSelectedTab: (value: string) => void;
};

const TapItem: React.FC<TapItemProps> = ({
  item,
  selected,
  setSelectedTab,
}) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      p="14px 0px"
      cursor="pointer"
      _hover={{ bg: "#0079D30D" }}
      color={selected ? "blue.500" : "gray.500"}
      bg={selected ? "#0079D30D" : "white"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 2px 0px"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      borderRightColor="gray.200"
      onClick={() => {
        setSelectedTab(item.title);
      }}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon as={item.icon} boxSize={6} />
      </Flex>
      <Text fontSize="14px" fontWeight={600}>
        {item.title}
      </Text>
    </Flex>
  );
};
export default TapItem;
