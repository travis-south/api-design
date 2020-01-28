import { Injectable } from '@nestjs/common';
import { Org } from './org.interface';
import { CreateOrgDto } from './dto/create-org-dto';
import { GitProvider } from './git-provider.interface';

@Injectable()
export class OrgsService {
    private orgs: Org[] = [];

    async createOrg(createOrgDto: CreateOrgDto, gitOrgService: GitProvider): Promise<Org> {
        const org: Org = createOrgDto;
        return await gitOrgService.createOrg(org);
    }
}
