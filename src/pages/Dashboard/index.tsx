import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import {Food} from '../../components/Food';
import {ModalAddFood} from '../../components/ModalAddFood';
import  { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { ProductProps } from '../../../types';

/*constructor(props) {
  super(props);
  this.state = {
    
  }
}*/

//class Dashboard extends Component {
export function Dashboard() {
  const [foods, setFood] = useState<ProductProps[]>([] as ProductProps[]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState({} as ProductProps);

  async function getFoods() {
    const response = await api.get<ProductProps[]>('/foods');
    setFood(response.data);
  }

  useEffect(()=> {
    getFoods();
  }, []);

  async function handleAddFood (food: ProductProps) {
    const newFoods = [...foods];
    try {
      console.log(food.image);
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFood([
        ...newFoods,
          response.data        
      ])
    } catch (err) {
      console.log(err);
    }
  }

  

  async function handleUpdateFood (Food: ProductProps) {
    //const { foods, editingFood } = this.state;
    const newFoods = [...foods];

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...Food },
      );

      const foodsUpdated = newFoods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFood(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood (productId: number) {
    const newFoods = [...foods];

    await api.delete(`/foods/${productId}`);

    const foodsFiltered = newFoods.filter(food => food.id !== productId);

    setFood(foodsFiltered);
    //this.setState({ foods: foodsFiltered });
  }
  //handleDeleteFood = async id => {

  function toggleModal () {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal () {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood (food: ProductProps) {
  //handleEditFood = food => {
    setEditingFood(food);
    setEditModalOpen(true);
   // this.setState({ editingFood: food, editModalOpen: true });
  }

  //render() {
    //const { modalOpen, editModalOpen, editingFood, foods } = this.state;

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />
          
        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))
            }
        </FoodsContainer>
      </>
    );
}
