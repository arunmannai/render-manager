import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DropdownItemTagsExample() {
  return (
    <DropdownButton id="dropdown-item-button" title="Apps">
      <Dropdown.ItemText>arun cms</Dropdown.ItemText>
      <Dropdown.Item as="button">Env var name</Dropdown.Item>
      <Dropdown.Item as="button">value</Dropdown.Item>
    </DropdownButton>
     
  );
 }
export default DropdownItemTagsExample;