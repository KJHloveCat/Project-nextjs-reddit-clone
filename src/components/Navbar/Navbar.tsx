import { defaultMenuItem } from "@/src/atoms/directoryMenuAtom";
import { auth } from "@/src/firebase/clientApp";
import useDirectory from "@/src/hooks/useDirectory";
import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInputs from "./SearchInputs";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();
  return (
    <Flex bg="white" height="49px" padding="6px 15px">
      <Flex
        align="center"
        cursor="pointer"
        onClick={() => {
          onSelectMenuItem(defaultMenuItem);
        }}
      >
        <Image
          src="/images/redditFace.svg"
          height="32px"
          mr={{ base: "2", md: "0" }}
        />
        <Image
          src="/images/redditText.svg"
          height="48px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      <Directory />
      <SearchInputs />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
