import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
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
