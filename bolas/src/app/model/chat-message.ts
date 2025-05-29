import { UserResumeDTO } from "@dto/userResumeDTO";

export interface ChatMessage {
    message:string;
    user: UserResumeDTO;
}