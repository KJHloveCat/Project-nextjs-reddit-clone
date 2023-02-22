import { communityState } from "@/src/atoms/communitiesAtom";
import useCommunityData from "@/src/hooks/useCommunityData";
import { Flex, Image, MenuItem, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { IconType } from "react-icons";
import { useRecoilValue } from "recoil";
import { UpDownIcon } from "../../Community/HeaderIcon";

type MenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}) => {
  const router = useRouter();
  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      _hover={{ bg: "gray.100" }}
      onClick={() => {
        router.push(link);
      }}
    >
      <Flex align="center">
        {imageURL ? (
          <Image src={imageURL} mr={2} boxSize={"20px"} borderRadius="full" />
        ) : (
          <Icon as={UpDownIcon} fontSize={20} mr={2} color={iconColor} />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};
export default MenuListItem;
