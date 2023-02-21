import { Community, communityState } from "@/src/atoms/communitiesAtom";
import { UpDownIcon } from "./HeaderIcon";
import {
  Box,
  Flex,
  Text,
  Icon,
  Stack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Switch,
  Divider,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { HiDotsHorizontal, HiOutlineCake } from "react-icons/hi";
import React, { useState, useRef } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { SlPencil } from "react-icons/sl";
import { AiOutlineEye } from "react-icons/ai";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "@/src/firebase/clientApp";
import useSelectedFile from "@/src/hooks/useSelectFile";
import { FaReddit } from "react-icons/fa";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import useCommunityData from "@/src/hooks/useCommunityData";

type AboutProps = {
  communityData: Community;
  about?: boolean;
};

const About: React.FC<AboutProps> = ({ communityData, about }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  console.log(communityData);
  const [CommunityOptions, setCommunityOptions] = useState(false);
  const {
    selectedFile,
    setSelectedFile,
    onSelectImage,
    selectedBanner,
    setSelectedBanner,
    onSelectBanner,
  } = useSelectedFile();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const selectedBannerRef = useRef<HTMLInputElement>(null);
  const setCommunityStateValue = useSetRecoilState(communityState);

  const onUpdateImage = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      });
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        } as Community,
      }));
    } catch (error: any) {
      console.log("onUpdateImage error", error.message);
    }
    setUploadingImage(false);
  };

  const onUpdateBanner = async () => {
    if (!selectedBanner) return;
    setUploadingBanner(true);
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/banner`);
      await uploadString(imageRef, selectedBanner, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        BannerURL: downloadURL,
      });
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          BannerURL: downloadURL,
        } as Community,
      }));
    } catch (error: any) {
      console.log("onUpdateImage error", error.message);
    }
    setUploadingBanner(false);
  };

  return (
    <Box position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        bg="#0079D3"
        color="white"
        height="46px"
        borderRadius="4px 4px 0px 0px"
        p="12px"
      >
        <Text fontWeight={600} fontSize="14px">
          About Community
        </Text>

        <Menu matchWidth={false}>
          <MenuButton
            as={IconButton}
            icon={<HiDotsHorizontal />}
            bg="#0079D3"
            _hover={{ bg: "#1A1A1B1A" }}
            _expanded={{ bg: "#0079D3" }}
          ></MenuButton>
          <MenuList
            maxWidth="auto"
            fontFamily="IBM Plex Sans"
            fontSize="14px"
            color="#878a8c"
          >
            <MenuItem _hover={{ color: "#1C1C1C" }}>
              Add To Custom Feed
            </MenuItem>
            <MenuItem _hover={{ color: "#1C1C1C" }}>Add To Favorites</MenuItem>
            <MenuItem _hover={{ color: "#1C1C1C" }}>Mute r/test</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
        <Stack spacing="12px">
          <Text fontSize="14px">Welcome to {communityData.id}</Text>
          <Flex direction="row" mt={-10}>
            <Icon as={HiOutlineCake} boxSize={21} mr={1} />

            <Text fontSize="14px" color="#7C7C7C">
              Created{" "}
              {moment(new Date(communityData.createdAt.seconds * 1000)).format(
                "MMM DD, YYYY"
              )}
            </Text>
            {/* <Text>{communityData.createAt}</Text> */}
          </Flex>
          <Flex
            direction="row"
            borderTop="1px solid #1A1A1B12"
            borderBottom={about ? "1px solid #1A1A1B12" : "unset"}
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
                {communityData.numberOfMembers.toLocaleString()}
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

          {about && (
            <Link href={`/r/${router.query.communityId}/submit`}>
              <Button width="100%" fontSize="14px" height="32px" bg="#0079d3">
                Create Post
              </Button>
            </Link>
          )}

          <Flex
            width="100%"
            direction="column"
            borderTop={"1px solid #1A1A1B12"}
            borderBottom="1px solid #1A1A1B12"
            p="16px 0px"
          >
            <Flex direction="row" justifyContent="space-between" mt={2}>
              <Text color="#1A1A1B" fontWeight={700} fontSize="10px">
                USER FLAIR PREVIEW
              </Text>

              <IconButton
                aria-label="Profile"
                icon={<SlPencil />}
                colorScheme="teal"
                size="sm"
                fontSize={19}
                bg="white"
                color="#0079d3"
                _hover={{ bg: "rgba(135,138,140,0.2)" }}
                _active={{ bg: "rgba(135,138,140,0.5)" }}
              />
            </Flex>
          </Flex>

          {user?.uid === communityData.creatorId && about ? (
            <>
              <Stack fontSize="11px">
                <Text fontWeight={700}>Admin</Text>
                <Flex justify="space-between" direction="row" align="center">
                  <Text
                    color="blue.500"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    Change Logo
                  </Text>
                  {communityData.imageURL || selectedFile ? (
                    <Image
                      src={selectedFile || communityData.imageURL}
                      borderRadius="full"
                      boxSize="40px"
                      alt="Community Image"
                      mr={5}
                    />
                  ) : (
                    <Icon
                      as={UpDownIcon}
                      boxSize="40px"
                      color="#0079d3"
                      mr={5}
                    />
                  )}
                </Flex>
                {uploadingImage ? (
                  <Spinner />
                ) : (
                  <Text cursor="pointer" onClick={onUpdateImage}>
                    Save Changes
                  </Text>
                )}

                <Flex justify="space-between" direction="row" align="center">
                  <Text
                    color="blue.500"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => selectedBannerRef.current?.click()}
                  >
                    Change Banner
                  </Text>
                  {communityData.BannerURL || selectedBanner ? (
                    <Image
                      src={selectedBanner || communityData.BannerURL}
                      borderRadius="full"
                      boxSize="40px"
                      alt="Community Banner"
                      mr={5}
                    />
                  ) : (
                    <Icon
                      as={UpDownIcon}
                      boxSize="40px"
                      color="#0079d3"
                      mr={5}
                    />
                  )}
                </Flex>
                {uploadingBanner ? (
                  <Spinner />
                ) : (
                  <Text cursor="pointer" onClick={onUpdateBanner}>
                    Save Changes
                  </Text>
                )}

                <input
                  id="file-upload"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  hidden
                  ref={selectedFileRef}
                  onChange={onSelectImage}
                />
                <input
                  id="banner-upload"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  hidden
                  ref={selectedBannerRef}
                  onChange={onSelectBanner}
                />
                <Divider />
              </Stack>
            </>
          ) : (
            ""
          )}

          <Button
            height="30px"
            fontSize="11px"
            color="#1C1C1C"
            bg="white"
            justifyContent="space-between"
            _hover={{ bg: "rgba(135,138,140,0.2)" }}
            _active={{ bg: "rgba(135,138,140,0.5)" }}
            onClick={() => {
              setCommunityOptions((prev) => {
                return !prev;
              });
            }}
          >
            COMMUNITY OPTIONS
            <Icon
              boxSize={21}
              as={CommunityOptions ? RiArrowDownSLine : RiArrowUpSLine}
            />
          </Button>
          {CommunityOptions && (
            <Flex direction="row" align="center">
              <Flex align="center" mr={110}>
                <Icon fontSize={25} as={AiOutlineEye} mr={1} />
                <Text fontSize="12px">Community theme</Text>
              </Flex>
              <Switch size="md" />
            </Flex>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
export default About;
