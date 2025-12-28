import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(5, 1024, { message: 'Text must be between 5 and 1024 characters' })
  public text!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  public rating!: number;
}

