import { UserEntity } from "./UserEntity";

// Interface
export interface MessageEntity  {
    id?: number;
    user_id?: UserEntity;
    subject: string;
    content: string;
}
