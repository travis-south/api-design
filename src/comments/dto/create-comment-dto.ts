import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty()
    comment: string;

    @ApiProperty()
    user: string;

    @ApiProperty()
    org: string;
}
