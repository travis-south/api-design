import { Injectable } from "@nestjs/common";
import { GitProvider } from "../git-provider.interface";
import { CreateOrgDto } from "../dto/create-org-dto";
import { Org } from "../org.interface";

@Injectable()
export class GithubOrgService implements GitProvider {
    
    constructor(private owner: string, private token: string){}

    async createOrg(createOrgDto: CreateOrgDto): Promise<Org> {
        const org = new Promise<Org>((resolve, reject) => resolve(createOrgDto));

        // Put here all Github API related logic for create organization
        // I didn't included it here since I don't have enterprise account. 

        return org;
    }
}
