import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Estudar Nest.js"
    })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Começar os estudos em Nest.js e..."
    })
    description: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        example: true
    })
    completed: boolean;
    
}
