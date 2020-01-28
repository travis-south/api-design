import { ApiProperty } from "@nestjs/swagger";

export class CreateOrgDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    owner: string;

    @ApiProperty()
    description: string;
}
