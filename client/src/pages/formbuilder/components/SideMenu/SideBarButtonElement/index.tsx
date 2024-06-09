import { Button, Text } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';
import { FormElement } from '../../FormElements';

export function SidebarButtonElement({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true
    }
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      gap={4}
      height="45px"
      width="100%"
      cursor="grab"
      borderColor={draggable.isDragging ? "blue.500" : undefined}
      borderWidth={draggable.isDragging ? "2px" : undefined}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon style={{ height: '20px', width: '20px', color: 'blue.500' }} />
      <Text fontSize="xs">{label}</Text>
    </Button>
  );
}

export function SideBarButtonElementDragOverlay({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerBtnElement;

  return (
    <Button
      variant="outline"
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      gap={2}
      height="45px"
      width="100%"
      cursor="grab"
    >
      <Icon style={{ height: '20px', width: '20px', color: 'blue.500' }} />
      <Text fontSize="xs">{label}</Text>
    </Button>
  );
}
export default SidebarButtonElement;

