import { IsString, isString } from "class-validator";
export class AuthDto {
    @IsString()
    public MTN_ID!: string;
    @IsString()
    public Name!: string
}