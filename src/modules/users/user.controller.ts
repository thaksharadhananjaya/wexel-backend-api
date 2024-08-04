/**
 * @fileOverview - user domain REST controller layer implementation
 */
import { IPaginatedResults } from '../../interfaces/paginated-results.interface';
import { UserCreateDto } from './dtos/request/user-create.dto';
import { UserUpdateDto } from './dtos/request/user-update.dto';
import { UserResponseDto } from './dtos/response/user-response.dto';
import { UserService } from './service/user.service';
import { Body, Delete, Get, Patch, Path, Post, Query, Route, Security, Tags } from 'tsoa';

@Route('users')
@Tags('Users')
@Security("bearerAuth")
export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    @Post()
    public async create(
        @Body() userCreateDto: UserCreateDto
    ): Promise<UserResponseDto> {
        return this.userService.create(userCreateDto);
    }

    @Get()
    public async findAll(
        @Query() page?: number,
        @Query() limit?: number
    ): Promise<IPaginatedResults<UserResponseDto>> {
        return this.userService.findAll({
            page,
            limit,
        });
    }

    @Get('{id}')
    public async findOne(@Path() id: string): Promise<UserResponseDto> {
        return this.userService.findOne(id);
    }

    @Patch('{id}')
    public async update(
        @Path() id: string,
        @Body() userUpdateDto: UserUpdateDto
    ): Promise<UserResponseDto> {
        return this.userService.update(id, userUpdateDto);
    }

    @Delete('{id}')
    public async delete(@Path() id: string): Promise<UserResponseDto> {
        return this.userService.delete(id);
    }
}
