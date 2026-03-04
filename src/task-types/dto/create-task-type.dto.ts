import { IsNotEmpty, IsOptional } from "class-validator";
import { IsString } from "class-validator/types/decorator/typechecker/IsString";

export class CreateTaskTypeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
}
