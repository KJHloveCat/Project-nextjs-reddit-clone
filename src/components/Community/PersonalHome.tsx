import React from "react";
import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import useDirectory from "@/src/hooks/useDirectory";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";

const PersonalHome: React.FC = () => {
  const { toggleMenuOpen } = useDirectory();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  const createPostHandler = () => {
    if (!user) {
      setAuthModalState((prev) => ({
        open: true,
        view: "login",
      }));
      return;
    }

    toggleMenuOpen();
  };

  const createCommunityHandler = () => {
    if (!user) {
      setAuthModalState((prev) => ({
        open: true,
        view: "login",
      }));
      return;
    }

    toggleMenuOpen();
  };
  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
      position="sticky"
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="34px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/redditPersonalHome.png)"
        backgroundSize="cover"
      ></Flex>
      <Flex direction="column" p="12px">
        <Flex align="center" mb={2}>
          <Icon as={FaReddit} fontSize={50} color="#00aeff" mr={2} />
          <Text fontWeight={600}>Home</Text>
        </Flex>
        <Stack spacing={3}>
          <Text fontSize="9pt">
            Your personal Reddit frontpage, built for you.
          </Text>
          <Button height="30px" onClick={createPostHandler}>
            Create Post
          </Button>
          <Button
            variant="outline"
            height="30px"
            onClick={createCommunityHandler}
          >
            Create Community
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};
export default PersonalHome;
