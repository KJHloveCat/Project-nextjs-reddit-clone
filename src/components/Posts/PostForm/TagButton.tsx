import { Button, ComponentWithAs, Icon, IconProps } from "@chakra-ui/react";
import React, { useState } from "react";
import { IconType } from "react-icons/lib";
import { CheckIcon } from "@chakra-ui/icons";

type TagButtonProps = {
  title: string;
  icon: ComponentWithAs<"svg", IconProps> | IconType;
};

const TagButton: React.FC<TagButtonProps> = ({ title, icon }) => {
  const [tagClick, setTagClick] = useState(false);

  const tagClickHandler = () => {
    setTagClick((prev) => {
      return !prev;
    });
  };
  return (
    <Button
      border={tagClick ? "1px solid transparent" : "1px solid gray"}
      color={tagClick ? "white" : "#878a8c"}
      variant="outline"
      fontSize={14}
      height="30px"
      mr={2}
      onClick={tagClickHandler}
      bg={tagClick ? (title === "NSFW" ? "rgba(255,88,91)" : "black") : ""}
      _hover={tagClick ? { bg: "color" } : { bg: "white" }}
    >
      <Icon boxSize={5} as={tagClick ? CheckIcon : icon} mr={2} />
      {title}
    </Button>
  );
};
export default TagButton;
