
import DesignerContextProvider from '~pages/formbuilder/context'
import FormBuilder from './components/FormBuilder';

function FormBuilderPage() {
  return (
    <DesignerContextProvider>
      <FormBuilder />
    </DesignerContextProvider>
  );
}

export default FormBuilderPage;