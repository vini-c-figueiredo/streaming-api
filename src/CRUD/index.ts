import { StreamingModule } from "./streaming/streaming.module";
import { UserStreamingModule } from "./user-streaming/user-streaming.module";
import { UserModule } from "./user/user.module";

export const crudModules = [
    UserModule,
    StreamingModule,
    UserStreamingModule
]