import animalBear from './animal_bear.png';
import animalCat from './animal_cat.png';
import animalChicken from './animal_chicken.png';
import animalDog from './animal_dog.png';
import animalPanda from './animal_panda.png';
import animalRabbit from './animal_rabbit.png';

interface AnimalImages {
  [key: string]: string;
}

const animals: AnimalImages = {
  "animalBear": animalBear,
  "animalCat": animalCat,
  "animalChicken": animalChicken,
  "animalDog": animalDog,
  "animalPanda": animalPanda,
  "animalRabbit": animalRabbit,
};

export default animals;
