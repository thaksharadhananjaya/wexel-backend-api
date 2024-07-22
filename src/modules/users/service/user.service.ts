/**
 * @fileOverview - user domain service layer implementation
 */

import { UseCreateDto } from "../dtos/request/user-create.dto";
import { UserUpdateDto } from "../dtos/request/user-update.dto";
import { UserResponseDto } from "../dtos/response/user-response.dto";
import { UserEntity } from "../entity/user.entity";
import { mapper } from "../utils/mapper";
import { UserRepository } from "../repository/user.repository";

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
  create(userCreateDto: UseCreateDto): UserResponseDto {
    const user = mapper.map(userCreateDto, UseCreateDto, UserEntity);
    const createdUser = this.userRepository.create(user);
    const userDto = mapper.map(createdUser, UserEntity, UserResponseDto);

    return userDto;
  }

  /**
   * Retrieves all users.
   *
   * @returns {UserResponseDto[]} An array of user DTOs.
   */
  findAll = (): UserResponseDto[] => {
    const user = this.userRepository.findAll();
    const userDtos = mapper.mapArray(user, UserEntity, UserResponseDto);

    return userDtos;
  };

  /**
   * Retrieves a user by ID.
   *
   * @param {string} id - The ID of the user to retrieve.
   * @returns {UserResponseDto} The user DTO.
   */
  findOne = (id: string): UserResponseDto => {
    const user = this.userRepository.findOne(id);
    const userDtos = mapper.map(user, UserEntity, UserResponseDto);

    return userDtos;
  };

  /**
   * Updates an existing user.
   *
   * @param {string} id - The ID of the user to update.
   * @param {UserUpdateDto} userUpdateDto - The DTO containing the data to update the user.
   * @returns {UserResponseDto} The updated user DTO.
   */
  update(id: string, userUpdateDto: UserUpdateDto): UserResponseDto {
    const user = mapper.map(userUpdateDto, UserUpdateDto, UserEntity);

    const updatedUser = this.userRepository.update(id, user);
    const userDto = mapper.map(updatedUser, UserEntity, UserResponseDto);

    return userDto;
  }

  /**
   * Deletes a user by ID.
   *
   * @param {string} id - The ID of the user to delete.
   * @returns {UserResponseDto} The deleted user DTO.
   */
  delete(id: string): UserResponseDto {
    const deletedUser = this.userRepository.delete(id);
    const userDto = mapper.map(deletedUser, UserEntity, UserResponseDto);

    return userDto;
  }
}
