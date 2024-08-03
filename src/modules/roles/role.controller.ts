/**
 * @fileOverview - role domain REST controller layer implementation
 */
import { IPaginatedResults } from '../../interfaces/paginated-results.interface';
import { RoleCreateDto } from './dtos/request/role-create.dto';
import { RoleUpdateDto } from './dtos/request/role-update.dto';
import { RoleResponseDto } from './dtos/response/role-response.dto';
import { RoleService } from './service/role.service';
import { Body, Delete, Get, Patch, Path, Post, Query, Route, Tags } from 'tsoa';

@Route('roles')
@Tags('Roles')
export class RoleController {
    private roleService: RoleService;
    constructor() {
        this.roleService = new RoleService();
    }

    @Post()
    public async create(
        @Body() roleCreateDto: RoleCreateDto
    ): Promise<RoleResponseDto> {
        return this.roleService.create(roleCreateDto);
    }

    @Get()
    public async findAll(
        @Query() page?: number,
        @Query() limit?: number
    ): Promise<IPaginatedResults<RoleResponseDto>> {
        return this.roleService.findAll({
            page,
            limit,
        });
    }

    @Get('{id}')
    public async findOne(@Path() id: string): Promise<RoleResponseDto> {
        return this.roleService.findOne(id);
    }

    @Patch('{id}')
    public async update(
        @Path() id: string,
        @Body() roleUpdateDto: RoleUpdateDto
    ): Promise<RoleResponseDto> {
        return this.roleService.update(id, roleUpdateDto);
    }

    @Delete('{id}')
    public async delete(@Path() id: string): Promise<RoleResponseDto> {
        return this.roleService.delete(id);
    }
}
