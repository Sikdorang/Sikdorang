import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  category: string;
<<<<<<< HEAD

=======
>>>>>>> 506c5f0869fc50350649bc795c7e98854553159c
  @IsNotEmpty()
  order: string;
}
