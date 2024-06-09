import { AiOutlineClose } from "react-icons/ai";
import { IconButton, Box, Flex, Text, Divider } from "@chakra-ui/react";
import useDesigner from "~pages/formbuilder/hooks/useDesigner";
import { FormElements } from "../../FormElements";

function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent;

  return (
    <Box p={2} flexDirection="column">
      <Flex justify="space-between" align="center">
        <Text fontSize="sm" color="gray.500">Element properties</Text>
        <IconButton
          size="sm"
          variant="ghost"
          icon={<AiOutlineClose />}
          onClick={() => setSelectedElement(null)}
          aria-label="Close"
        />
      </Flex>
      <Divider mb={4} />
      <PropertiesForm elementInstance={selectedElement} />
    </Box>
  );
}

export default PropertiesFormSidebar;
