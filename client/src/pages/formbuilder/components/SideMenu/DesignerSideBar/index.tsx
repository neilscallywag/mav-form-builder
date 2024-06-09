import {
  Flex,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useBreakpointValue,
  Button,
  DrawerCloseButton,
    Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
} from '@chakra-ui/react';

import useDesigner from '../../../hooks/useDesigner';
import PropertiesFormSideBar from '../PropertiesFormSideBar';
import FormElementsSideBar from '../FormElementsSideBar';


export function DesignerSidebarModal() {
  const { selectedElement, disclosure } = useDesigner();

  // Use Chakra UI's useBreakpointValue to get the current breakpoint
  const isSmallScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });

  return (
    <>
      <Button onClick={disclosure.onOpen}>Open</Button>
      <Drawer
        placement={'left'}
        onClose={disclosure.onClose}
        isOpen={disclosure.isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Form Elements</DrawerHeader>
          <DrawerBody>
            <Flex
              width={isSmallScreen ? '100%' : '400px'}
              flexDirection="column"
              flexGrow={1}
              gap={2}
              borderRight="2px solid"
              borderColor="gray.100"
              padding={4}
              background="whiteAlpha.100"
              overflowY="auto"
              height="100vh"
            >
              {isSmallScreen && selectedElement && (
                <Breadcrumb>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Form Elements</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="#">
                      {selectedElement.type}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              )}
              {!selectedElement && (
                <>
                  {!isSmallScreen && <Text>Form Elements</Text>}
                  <FormElementsSideBar />
                </>
              )}
              {selectedElement && <PropertiesFormSideBar />}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function DesignerSideBar() {
  const { selectedElement } = useDesigner();

  // Use Chakra UI's useBreakpointValue to get the current breakpoint
  const isSmallScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
  });

  return (
    <>
      {!isSmallScreen && (
        <Flex
          width="400px"
          maxWidth="400px"
          flexDirection="column"
          flexGrow={1}
          gap={2}
          borderRight="2px solid"
          borderColor="gray.100"
          padding={4}
          background="whiteAlpha.100"
          overflowY="auto"
          height="100vh"
        >
          {!selectedElement && (
            <>
              <Text>Form Elements</Text>
              <FormElementsSideBar />
            </>
          )}
          {selectedElement && <PropertiesFormSideBar />}
        </Flex>
      )}
    </>
  );
}

export default DesignerSideBar;