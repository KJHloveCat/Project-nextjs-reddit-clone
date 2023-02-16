import { Button, Flex, Icon, Input, Stack, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import TagButton from "./TagButton";
import { IoPricetagOutline } from "react-icons/io5";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width="100%" padding="16px 16px">
      <Input
        name="title"
        value={textInputs.title}
        placeholder="Title"
        _placeholder={{ fontSize: "14px" }}
        onChange={onChange}
      />
      <Textarea
        name="body"
        value={textInputs.body}
        placeholder="Text (optional)"
        _placeholder={{ fontSize: "14px" }}
        onChange={onChange}
      />
      <Flex
        justify={{ base: "center", md: "flex-start" }}
        borderBottom="1px solid"
        borderColor="rgba(135, 138, 140, 0.2)"
        height="45px"
      >
        <TagButton title="OC" icon={AddIcon} />
        <TagButton title="Spoiler" icon={AddIcon} />
        <TagButton title="NSFW" icon={AddIcon} />
        <TagButton title="Flair" icon={IoPricetagOutline} />
      </Flex>
      <Flex justify="flex-end">
        <Button fontSize={14} height="32px" variant="outline" mr={2}>
          Save Draft
        </Button>
        <Button
          fontSize={14}
          height="32px"
          isLoading={loading}
          isDisabled={!textInputs.title || !textInputs.body}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
