import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskTypeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
}
