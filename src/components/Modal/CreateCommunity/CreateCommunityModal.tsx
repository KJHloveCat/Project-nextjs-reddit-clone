import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Icon,
  Text,
  Checkbox,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "@fontsource/ibm-plex-sans";
import { FaUserAlt } from "react-icons/fa";
import { HiLockClosed } from "react-icons/hi";
import { MdRemoveRedEye } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { InfoIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, firestore } from "@/src/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

type CreateCommunityModalProps = {
  open: boolean;
  closeHandler: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  closeHandler,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [value, setValue] = React.useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const changeCharHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityName(event.target.value);
    setError("");
    //calculate how many chars user can write in the community name.
    setCharsRemaining(21 - event.target.value.length);
  };

  const createCommunityHandler = async () => {
    // Validate the community
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (charsRemaining === 21) {
      setError("A community name is required");
      return;
    } else if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
      );
      return;
    }

    setLoading(true);

    try {
      await runTransaction(firestore, async (transaction) => {
        const communityDocRef = doc(firestore, "communities", communityName);

        // Check if community exists in db
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, r/${communityName} is taken. Try another.`);
        }

        // Create Community
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: value,
        });

        // create communitySnippet on user
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      console.log("Create Community error", error);
      setError(error.message);
    }

    setLoading(false);
  };
  return (
    <>
      <Modal isOpen={open} onClose={closeHandler}>
        <ModalOverlay />
        <ModalContent maxW="530px">
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600}>Name</Text>
              <Flex align="center">
                <Text
                  fontFamily="IBM Plex Sans"
                  fontWeight={300}
                  fontSize="12px"
                  color="#7C7C7C"
                >
                  Community names including capitalization cannot be changed.
                </Text>
                <Tooltip
                  hasArrow
                  label='Names cannot have spaces (e.g., "r/bookclub" not "r/book club"), must be between 3-21 characters, and underscores ("_") are the only special characters allowed. Avoid using solely trademarked names (e.g., "r/FansOfAcme" not "r/Acme").'
                  bg="black"
                  fontSize="12px"
                  width="216px"
                  padding="8px 8px 8px 8px"
                  textAlign="center"
                >
                  <InfoOutlineIcon height="12px" color="#878a8c" ml={1} />
                  {/* <Icon height={10} as={AiOutlineInfoCircle} /> */}
                </Tooltip>
              </Flex>
              <Text
                position="relative"
                top="30px"
                left="10px"
                width="20px"
                color="#878a8c"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="24px"
                onChange={changeCharHandler}
                focusBorderColor="black"
                borderRadius={5}
                height="37px"
              />
              <Text
                fontFamily="IBM Plex Sans"
                fontWeight={300}
                fontSize="12px"
                color="#7C7C7C"
                mt={3}
              >
                {charsRemaining} Characters remaining
              </Text>
              {error && (
                <Text fontSize="12px" color="red">
                  {error}
                </Text>
              )}
              <Box mt={7} mb={4}>
                <Text fontWeight={600} fontSize={15} mb={2}>
                  Community Type
                </Text>
                {/* checkbox */}
                <Stack spacing={2}>
                  <RadioGroup onChange={setValue} value={value}>
                    <Stack direction="column">
                      <Radio value="public">
                        <Flex direction="row" align="center">
                          <Icon
                            height="14px"
                            as={FaUserAlt}
                            mr={2}
                            ml={0.5}
                            color="#878a8c"
                          />
                          <Text fontSize="14px" fontWeight={500} mr={2}>
                            Public
                          </Text>
                          <Text fontSize="12px" color="#7C7C7C" mt={1}>
                            Anyone can view, post, and comment to this community
                          </Text>
                        </Flex>
                      </Radio>
                      <Radio value="restricted">
                        <Flex direction="row" align="center">
                          <Icon
                            width="19px"
                            height="19px"
                            as={MdRemoveRedEye}
                            mr={2}
                            color="#878a8c"
                          />
                          <Text fontSize="14px" fontWeight={500} mr={2}>
                            Restricted
                          </Text>
                          <Text fontSize="12px" color="#7C7C7C" mt={1}>
                            Anyone can view this community, but only approved
                            users can post
                          </Text>
                        </Flex>
                      </Radio>
                      <Radio value="private">
                        <Flex direction="row" align="center">
                          <Icon
                            width="18px"
                            height="18px"
                            as={HiLockClosed}
                            mr={2}
                            color="#878a8c"
                          />
                          <Text fontSize="14px" fontWeight={500} mr={2}>
                            Private
                          </Text>
                          <Text fontSize="12px" color="#7C7C7C" mt={1}>
                            Anyone can view, post, and comment to this community
                          </Text>
                        </Flex>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Stack>
                <Flex mt={10} direction="column">
                  <Text fontWeight={600} fontSize={15}>
                    Adult content
                  </Text>
                  <Checkbox name="public" size="lg">
                    <Flex align="center">
                      <Text
                        fontSize="11px"
                        bg="rgb(255, 88, 91)"
                        color="white"
                        fontWeight={700}
                        mr={2}
                        padding="0 3px 0 3px"
                      >
                        NSFW
                      </Text>
                      <Text fontSize="14px" fontWeight={500}>
                        18+ year old community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Flex>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="#edeff1" borderRadius="0px 0px 10px 10px">
            <Button
              height="32px"
              colorScheme="blue"
              mr={3}
              onClick={closeHandler}
              variant="outline"
            >
              <Text fontSize="14px">Cancel</Text>
            </Button>
            <Button
              height="32px"
              onClick={createCommunityHandler}
              isLoading={loading}
            >
              <Text fontSize="14px">Create Community</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
