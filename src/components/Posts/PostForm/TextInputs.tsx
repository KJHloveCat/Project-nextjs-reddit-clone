import { Button, Flex, Img, Input, Stack, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";

type TextInputsProps = {};

const TextInputs: React.FC<TextInputsProps> = () => {
  return (
    <Stack spacing={3} width="100%" padding="16px 16px">
      <Input
        name="title"
        placeholder="Title"
        _placeholder={{ fontSize: "14px" }}
        // onChange={}
      />
      <Textarea
        name="body"
        placeholder="Text (optional)"
        _placeholder={{ fontSize: "14px" }}
      />
      {/* <Flex width={{ base: "100%", md: "100%" }} border="1px solid blue"> */}
      <Flex
        justify={{ base: "center", md: "space-around" }}
        width={{ base: "100%", md: "35%" }}
      >
        <Button border="1px solid gray" color="gray.500" variant="outline">
          OC
        </Button>
        <Button border="1px solid gray" color="gray.500" variant="outline">
          Spoiler
        </Button>
        <Button border="1px solid gray" color="gray.500" variant="outline">
          NSFW
        </Button>
        <Button border="1px solid gray" color="gray.500" variant="outline">
          Flair
        </Button>
      </Flex>
      {/* </Flex> */}
      <Flex justify="flex-end">
        <Button height="32px" variant="outline" mr={2}>
          Save Draft
        </Button>
        <Button height="32px">Post</Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
