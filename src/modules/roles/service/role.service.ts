/**
 * @fileOverview - role domain service layer implementation
 */
import { BadRequestException } from '../../../exceptions/bad-request-exception';
import { NotFoundException } from '../../../exceptions/not-found-exception';
import { IPaginatedResults } from '../../../interfaces/paginated-results.interface';
import objectPicker from '../../../utils/object-picker';
import { RoleCreateDto } from '../dtos/request/role-create.dto';
import { RoleQueryDto } from '../dtos/request/role-query.dto';
import { RoleUpdateDto } from '../dtos/request/role-update.dto';
import { RoleResponseDto } from '../dtos/response/role-response.dto';
import { RoleEntity } from '../entity/role.entity';
import { RoleRepository } from '../repository/role.repository';
import { mapper } from '../utils/mapper';

export class RoleService {
    private roleRepository: RoleRepository;
    constructor() {
        this.roleRepository = new RoleRepository();
    }

    /**
     * Creates a new role.
     *
     * @param {RoleCreateDto} roleCreateDto - The DTO containing the data to create a new role.
     * @returns {RoleResponseDto} The created role.
     */
    create = async (roleCreateDto: RoleCreateDto): Promise<RoleResponseDto> => {
        // check role name already exists
        await this.__validateRoleName(roleCreateDto.name);

        const role = mapper.map(roleCreateDto, RoleCreateDto, RoleEntity);

        const createdRole = await this.roleRepository.create(role);
        const roleDto = mapper.map(createdRole, RoleEntity, RoleResponseDto);

        return roleDto;
    };

    /**
     * Retrieves all roles.
     *
     * @returns {RoleResponseDto[]} An array of role DTOs.
     */
    findAll = async (
        roleQueryDto: RoleQueryDto
    ): Promise<IPaginatedResults<RoleResponseDto>> => {
        const options = objectPicker(roleQueryDto, ['page', 'limit']);

        const paginateData = await this.roleRepository.findAll(options);
        const results = mapper.mapArray(
            paginateData.results,
            RoleEntity,
            RoleResponseDto
        );

        return { ...paginateData, results };
    };

    /**
     * Retrieves a role by ID.
     *
     * @param {string} id - The ID of the role to retrieve.
     * @returns {RoleResponseDto} The role DTO.
     */
    findOne = async (id: string): Promise<RoleResponseDto> => {
        const role = await this.roleRepository.findOne(id);
        if (!role) {
            throw new NotFoundException(`Role not found given id '${id}'`);
        }
        const roleDto = mapper.map(role, RoleEntity, RoleResponseDto);

        return roleDto;
    };

    /**
     * Updates an existing role.
     *
     * @param {string} id - The ID of the role to update.
     * @param {RoleUpdateDto} roleUpdateDto - The DTO containing the data to update the role.
     * @returns {RoleResponseDto} The updated role DTO.
     */
    update = async (
        id: string,
        roleUpdateDto: RoleUpdateDto
    ): Promise<RoleResponseDto> => {
        // validate id
        const found = await this.findOne(id);

        // check new role name already exists
        if (found.name !== roleUpdateDto.name) {
            await this.__validateRoleName(roleUpdateDto.name);
        }

        const role = mapper.map(roleUpdateDto, RoleUpdateDto, RoleEntity);

        const updatedRole = await this.roleRepository.update(id, role);
        const roleDto = mapper.map(updatedRole, RoleEntity, RoleResponseDto);

        return roleDto;
    };

    /**
     * Deletes a role by ID.
     *
     * @param {string} id - The ID of the role to delete.
     * @returns {RoleResponseDto} The deleted role DTO.
     */
    delete = async (id: string): Promise<RoleResponseDto> => {
        // validate id
        await this.findOne(id);

        const deletedRole = await this.roleRepository.delete(id);
        const roleDto = mapper.map(deletedRole, RoleEntity, RoleResponseDto);

        return roleDto;
    };

    private __validateRoleName = async (name: string) => {
        const role = await this.roleRepository.findByName(name);

        if (role) {
            throw new BadRequestException(
                `Role name already exists given name '${name}'`
            );
        }
    };
}
