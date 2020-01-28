import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { GithubOrgService } from './adapters/github-org.service';
import { CreateOrgDto } from './dto/create-org-dto';
import { Org } from './org.interface';
import { OrgsService } from './orgs.service';

@Controller('orgs')
export class OrgsController {

    constructor(private orgsService: OrgsService, @Inject('GIT_TOKEN') private gitToken: string) {}

    @ApiBody({ type: CreateOrgDto })
    @Post()
    async createOrg(@Body() createOrgDto: CreateOrgDto): Promise<Org> {
        const { owner } = createOrgDto;
        const gitOrgService = new GithubOrgService(owner, this.gitToken); // You can add a logic here to select which git service provider you want
        return await this.orgsService.createOrg(createOrgDto, gitOrgService);
    }
}
