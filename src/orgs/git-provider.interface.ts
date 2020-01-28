import { CreateOrgDto } from "./dto/create-org-dto";
import { Org } from "./org.interface";

export interface GitProvider {
    createOrg: (createOrgDto: CreateOrgDto) => Promise<Org>;
}
