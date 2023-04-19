import {
  Flex,
  Text,
  Icon,
  Stack,
  Divider,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import React from "react";
import { FcReddit } from "react-icons/fc";

type PostingRuleProps = {};

const PostingRule: React.FC<PostingRuleProps> = () => {
  return (
    <Flex mt="15px" p="12px" bg="white" direction="column" borderRadius={5}>
      <Flex direction="row" align="center">
        <Icon boxSize={39} as={FcReddit} mr={3} />
        <Text fontFamily={"IBM Plex Sans"} fontWeight={600} fontSize="16px">
          Posting to Beddit
        </Text>
      </Flex>
      <Divider margin="7px 0px" />
      <OrderedList spacing="10px" fontSize="14px" fontWeight={600}>
        <ListItem>Remember the human</ListItem>
        <Divider />
        <ListItem>Behave like you would in real life</ListItem>
        <Divider />
        <ListItem>Look for the original source of content</ListItem>
        <Divider />
        <ListItem>Search for duplicates before posting</ListItem>
        <Divider />
        <ListItem>Read the community’s rules</ListItem>
        <Divider />
      </OrderedList>
    </Flex>
  );
};
export default PostingRule;
