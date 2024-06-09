import { Box, Flex, Text } from '@chakra-ui/react';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import DesignerSideBar from '../SideMenu/DesignerSideBar';
import useDesigner from '../../hooks/useDesigner';
import DesignerElementWrapper from './Wrapper/';
import { ElementsType, FormElementInstance, FormElements } from '../FormElements';
import { idGenerator } from '~pages/formbuilder/utils/idGenerator';

function Designer() {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner();

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: { isDesignerDropArea: true },
  });

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over || !active.data.current || !over.data.current) return;

      const isDesignerBtnElement = active.data.current.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea = over.data.current.isDesignerDropArea;
      const droppingSidebarBtnOverDesignerDropArea = isDesignerBtnElement && isDroppingOverDesignerDropArea;

      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active.data.current.type;
        const newElement = FormElements[type as ElementsType].construct(idGenerator());

        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverDesignerElementTopHalf = over.data.current.isTopHalfDesignerElement;
      const isDroppingOverDesignerElementBottomHalf = over.data.current.isBottomHalfDesignerElement;
      const isDroppingOverDesignerElement = isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf;
      const droppingSidebarBtnOverDesignerElement = isDesignerBtnElement && isDroppingOverDesignerElement;

      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data.current.type;
        const newElement = FormElements[type as ElementsType].construct(idGenerator());

        const overId = over.data.current.elementId;
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error('element not found');
        }

        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }

      const isDraggingDesignerElement = active.data.current.isDesignerElement;
      const draggingDesignerElementOverAnotherDesignerElement = isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data.current.elementId;
        const overId = over.data.current.elementId;

        const activeElementIndex = elements.findIndex((el) => el.id === activeId);
        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error('element not found');
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <Flex width="full" height="full">
      <DesignerSideBar />
      <Box
        p={4}
        width="full"
        onClick={() => {
          if (selectedElement) {
            setSelectedElement(null);
          }
        }}
      >
        <Flex
          flexDirection="column"
          flexGrow={1}
          align="center"
          justify="center"
          flex={1}
          overflowY="auto"
          backgroundColor={droppable.isOver ? '#acc7fa' : 'grey.50'}
          maxWidth="100%"
          height="100vh"
          m="auto"
          borderRadius="xl"
          ref={droppable.setNodeRef}
          ring={droppable.isOver ? '2' : undefined}
          ringColor={droppable.isOver ? 'blue.200' : undefined}
        >
          <Flex
            width="100%"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
            flexGrow={1}
            flexDirection="column"
            textAlign="center"
          >
            {!droppable.isOver && elements.length === 0 && (
              <Text fontSize={{ base: '2xl', md: '3xl' }} color="gray.500">
                Drop Here
              </Text>
            )}
            {droppable.isOver && elements.length === 0 && (
              <Box p={{ base: 2, md: 4 }} width="full">
                <Text fontSize={{ base: '2xl', md: '3xl' }} color="grey.800">
                  Release
                </Text>
              </Box>
            )}

            {elements.length > 0 && (
              <Flex
                flexDirection="column"
                width={{ base: '50%', sm: '80%', md: '80%', lg: '100%' }}
                gap={2}
                p={4}
              >
                {elements?.map((element: FormElementInstance) => (
                  <DesignerElementWrapper key={element.id} element={element} />
                ))}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Designer;
