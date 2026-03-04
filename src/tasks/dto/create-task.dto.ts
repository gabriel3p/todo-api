import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, isString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    completed: boolean;

    @IsNumber()
    @IsNotEmpty()
    ownerId: number;

    @IsNumber()
    @IsNotEmpty()
    taskTypeId: number;
}
