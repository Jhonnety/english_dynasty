import { DateOnly } from ".";

export interface EnglishUser {
    first_name?: string;
    second_name?: string;
    first_lastname?: string;
    second_lastname?: string;
    birthdate?: DateOnly;
    country?:string;
    english_level?:string;
  }
      