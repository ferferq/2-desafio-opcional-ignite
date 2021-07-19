import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Input } from '../Input';
import { ProductProps } from '../../../types';
import {Modal} from '../Modal';

/** constructor(props) {
    super(props);

    this.formRef = createRef();
  }
  */

interface ModalAddFoodProps {
    isOpen: boolean,
    setIsOpen: () => void,
    handleAddFood: (Food: ProductProps) => void,
}

export function ModalAddFood ({isOpen, setIsOpen, handleAddFood} : ModalAddFoodProps) {
//class ModalAddFood extends Component

  async function handleSubmit (food : ProductProps){
    //const { setIsOpen, handleAddFood } = this.props;
    handleAddFood(food);
    setIsOpen();
  };

  return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form onSubmit={handleSubmit}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui"
          />

          <Input name="name" placeholder="Ex: Moda Italiana" 
          />
          
          <Input name="price" placeholder="Ex: 19.90" 
          />

          <Input name="description" placeholder="Descrição" 
          />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
};

