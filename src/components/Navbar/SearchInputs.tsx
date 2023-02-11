import React from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { IoSearchOutline } from "react-icons/io5";
import "@fontsource/ibm-plex-sans";

type SearchInputsProps = {
  children: React.ReactNode;
};

const SearchInputs: React.FC = () => {
  return (
    <Flex flexGrow={1} mr={2} align="center">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={
            <Icon
              as={IoSearchOutline}
              color="#878a8c"
              ml={6}
              mr={4}
              mt={1}
              fontSize={25}
            />
          }
        />
        <Input
          placeholder="Search Reddit"
          borderRadius={20}
          fontSize="14"
          fontFamily="IBM Plex Sans"
          _placeholder={{ color: "#878a8c" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            bg: "white",
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="40px"
          bg="#F6F6F8"
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInputs;
