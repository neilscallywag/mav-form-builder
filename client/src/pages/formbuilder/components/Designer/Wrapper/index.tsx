import { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import useDesigner from '../../../hooks/useDesigner';
import { DesignerElementWrapperProps } from '../../../types/DesignerElementWrapperProps';
import { ElementsType, FormElements } from '../../FormElements';


function DesignerElementWrapper({ element }: DesignerElementWrapperProps) {
  const { removeElement, setSelectedElement, disclosure } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const smallScreen = useBreakpointValue({
    sm: true,
    md: true,
    base: true,
    lg: false,
  });

  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });
  const elementType = element.type as ElementsType;
  const DesignerElement = FormElements[elementType].designerComponent;

  if (draggable.isDragging) return null;

  return (
    <Box
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      position="relative"
      display="flex"
      flexDirection="column"
      color="black"
      _hover={{ cursor: 'pointer' }}
      rounded="md"
      borderWidth="1px"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
        disclosure.onOpen();
      }}
    >
      <Box
        ref={topHalf.setNodeRef}
        position="absolute"
        width="100%"
        height="50%"
        borderTopRadius="md"
      />
      <Box
        ref={bottomHalf.setNodeRef}
        position="absolute"
        width="100%"
        height="50%"
        bottom={0}
        borderBottomRadius="md"
      />
      {smallScreen && (
        <Box position="absolute" right={0} height="100%">
          <Button
            display="flex"
            height="100%"
            justifyContent="center"
            borderRadius="md"
            borderLeftRadius="none"
            backgroundColor="red.500"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              removeElement(element.id);
            }}
          >
            <Icon color="blue" as={BiTrash} h={6} w={6} />
          </Button>
        </Box>
      )}
      {mouseIsOver && (
        <>
          <Box position="absolute" right={0} height="100%">
            <Button
              display="flex"
              height="100%"
              justifyContent="center"
              borderRadius="md"
              borderLeftRadius="none"
              backgroundColor="red.500"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <Icon color="white" as={BiTrash} h={6} w={6} />
            </Button>
          </Box>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
          >
            <Text fontSize="sm" color="gray.400">
              Click for properties or drag to move
            </Text>
          </Box>
        </>
      )}
      {topHalf.isOver && (
        <Box
          as="div"
          position="absolute"
          top={0}
          width="100%"
          borderRadius="md"
          h="7px"
          backgroundColor="black"
          borderBottomRadius="none"
        />
      )}

      <Flex
        width={{ base: '80%', sm: '80%', md: '80%', lg: '95%' }}
        alignItems="left"
        rounded="md"
        bg="accent.40"
        paddingX="4"
        paddingY="2"
        pointerEvents="none"
        opacity={mouseIsOver ? 0.3 : 1}
      >
        <DesignerElement elementInstance={element} />
      </Flex>
      {bottomHalf.isOver && (
        <Box
          as="div"
          position="absolute"
          bottom={0}
          width="100%"
          borderRadius="md"
          h="7px"
          backgroundColor="black"
          borderTopRadius="none"
        />
      )}
    </Box>
  );
}

export default DesignerElementWrapper;
