import { FormElements } from '../../FormElements';
import { SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import SideBarButtonElement from '../SideBarButtonElement';

function FormElementsSideBar() {
  const columns = useBreakpointValue({
    sm: true,
    md: true,
    lg: false,
    base: true,
  });
  return (
    <SimpleGrid columns={columns ? 1 : 2} spacingY={2}>
      <SideBarButtonElement formElement={FormElements.TextField} />
      {/* <SideBarButtonElement formElement={FormElements.NumberField} />
      <SideBarButtonElement formElement={FormElements.TextAreaField} />
      <SideBarButtonElement formElement={FormElements.CheckboxField} />
      <SideBarButtonElement formElement={FormElements.EmailField} />
      <SideBarButtonElement formElement={FormElements.TitleField} /> */}
    </SimpleGrid>
  );
}

export default FormElementsSideBar;
