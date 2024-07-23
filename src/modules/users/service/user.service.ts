/**
 * @fileOverview - user domain service layer implementation
 */

import { UseCreateDto } from "../dtos/request/user-create.dto";
import { UserUpdateDto } from "../dtos/request/user-update.dto";
import { UserResponseDto } from "../dtos/response/user-response.dto";
import { UserEntity } from "../entity/user.entity";
import { mapper } from "../utils/mapper";
import { UserRepository } from "../repository/user.repository";
import { NotFoundException } from "../../../exceptions/not-found-exception";
import { UserQueryDto } from "../dtos/request/user-query.dto";
import objectPicker from "../../../utils/object-picker";
import { IPaginatedResults } from "../../../interfaces/paginated-results.interface";

export class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Creates a new user.
   *
   * @param {UserCreateDto} userCreateDto - The DTO containing the data to create a new user.
   * @returns {UserResponseDto} The created user.
   */
  create = async (userCreateDto: UseCreateDto): Promise<UserResponseDto> => {
    const user = mapper.map(userCreateDto, UseCreateDto, UserEntity);

    const createdUser = await this.userRepository.create(user);
    const userDto = mapper.map(createdUser, UserEntity, UserResponseDto);

    return userDto;
  };

  /**
   * Retrieves all users.
   *
   * @returns {UserResponseDto[]} An array of user DTOs.
   */
  findAll = async (
    userQueryDto: UserQueryDto
  ): Promise<IPaginatedResults<UserResponseDto>> => {
    const options = objectPicker(userQueryDto, ["page", "limit"]);

    const paginateData = await this.userRepository.findAll(options);
    const results = mapper.mapArray(
      paginateData.results,
      UserEntity,
      UserResponseDto
    );

    return { ...paginateData, results };
  };

  /**
   * Retrieves a user by ID.
   *
   * @param {string} id - The ID of the user to retrieve.
   * @returns {UserResponseDto} The user DTO.
   */
  findOne = async (id: string): Promise<UserResponseDto> => {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User not found given id ${id}`);
    }
    const userDto = mapper.map(user, UserEntity, UserResponseDto);

    return userDto;
  };

  /**
   * Updates an existing user.
   *
   * @param {string} id - The ID of the user to update.
   * @param {UserUpdateDto} userUpdateDto - The DTO containing the data to update the user.
   * @returns {UserResponseDto} The updated user DTO.
   */
  update = async (
    id: string,
    userUpdateDto: UserUpdateDto
  ): Promise<UserResponseDto> => {
    // Validate id
    await this.findOne(id);

    const user = mapper.map(userUpdateDto, UserUpdateDto, UserEntity);

    const updatedUser = await this.userRepository.update(id, user);
    const userDto = mapper.map(updatedUser, UserEntity, UserResponseDto);

    return userDto;
  };

  /**
   * Deletes a user by ID.
   *
   * @param {string} id - The ID of the user to delete.
   * @returns {UserResponseDto} The deleted user DTO.
   */
  delete = async (id: string): Promise<UserResponseDto> => {
    // Validate id
    await this.findOne(id);

    const deletedUser = await this.userRepository.delete(id);
    const userDto = mapper.map(deletedUser, UserEntity, UserResponseDto);

    return userDto;
  };
}
