/**
 * @fileOverview - Doctor Details domain service layer implementation
 */
import { NotFoundException } from '../../../exceptions/not-found-exception';
import { DoctorDetailsCreateDto } from '../dtos/request/doctor-details-create.dto';
import { DoctorDetailsUpdateDto } from '../dtos/request/doctor-details-update.dto';
import { DoctorDetailsResponseDto } from '../dtos/response/doctor-details-response.dto';
import { DoctorDetailsEntity } from '../entity/doctor-details.entity';
import { DoctorDetailsRepository } from '../repository/doctor-details.repository';
import { mapper } from '../utils/mapper';

export class DoctorDetailsService {
    private doctorDetailsRepository: DoctorDetailsRepository;

    constructor() {
        this.doctorDetailsRepository = new DoctorDetailsRepository();
    }

    /**
     * Creates a new doctorDetail.
     *
     * @param {string} userId - The User ID of the doctorDetails to create.
     * @param {DoctorDetailsCreateDto} doctorDetailsCreateDto - The DTO containing the data to create a new doctorDetails.
     * @returns {DoctorDetailsResponseDto} The created doctorDetails.
     */
    create = async (
        userId: string,
        doctorDetailsCreateDto: DoctorDetailsCreateDto
    ): Promise<DoctorDetailsResponseDto> => {
        const doctorDetails = mapper.map(
            doctorDetailsCreateDto,
            DoctorDetailsCreateDto,
            DoctorDetailsEntity
        );

        doctorDetails.userId = userId;

        const createdDoctorDetails =
            await this.doctorDetailsRepository.create(doctorDetails);
        const doctorDetailsDto = mapper.map(
            createdDoctorDetails,
            DoctorDetailsEntity,
            DoctorDetailsResponseDto
        );

        return doctorDetailsDto;
    };

    /**
     * Retrieves a doctorDetails by User ID.
     *
     * @param {string} userId - The User ID of the doctorDetails to retrieve.
     * @returns {DoctorDetailsResponseDto} The doctorDetails DTO.
     */
    findByUserId = async (
        userId: string
    ): Promise<DoctorDetailsResponseDto> => {
        const doctorDetails =
            await this.doctorDetailsRepository.findByUserId(userId);
        if (!doctorDetails) {
            throw new NotFoundException(
                `DoctorDetail not found given user id '${userId}'`
            );
        }
        const doctorDetailsDto = mapper.map(
            doctorDetails,
            DoctorDetailsEntity,
            DoctorDetailsResponseDto
        );

        return doctorDetailsDto;
    };

    /**
     * Updates an existing doctorDetails by User ID.
     *
     * @param {string} userId - The User ID of the doctorDetails to update.
     * @param {DoctorDetailsUpdateDto} doctorDetailsUpdateDto - The DTO containing the data to update the doctorDetails.
     * @returns {DoctorDetailsResponseDto} The updated doctorDetails DTO.
     */
    update = async (
        userId: string,
        doctorDetailsUpdateDto: DoctorDetailsUpdateDto
    ): Promise<DoctorDetailsResponseDto> => {
        // Validate id
        await this.findByUserId(userId);

        const doctorDetails = mapper.map(
            doctorDetailsUpdateDto,
            DoctorDetailsUpdateDto,
            DoctorDetailsEntity
        );

        const updatedDoctorDetails = await this.doctorDetailsRepository.update(
            userId,
            doctorDetails
        );
        const doctorDetailsDto = mapper.map(
            updatedDoctorDetails,
            DoctorDetailsEntity,
            DoctorDetailsResponseDto
        );

        return doctorDetailsDto;
    };

    /**
     * Retrieves a doctorDetails by ID.
     *
     * @param {string} userId - The ID of the doctorDetails to retrieve.
     * @returns {DoctorDetailsResponseDto} The doctorDetails DTO.
     */
    findById = async (id: string): Promise<DoctorDetailsResponseDto> => {
        const doctorDetails =
            await this.doctorDetailsRepository.findById(id);
        if (!doctorDetails) {
            throw new NotFoundException(
                `DoctorDetail not found given id '${id}'`
            );
        }
        const doctorDetailsDto = mapper.map(
            doctorDetails,
            DoctorDetailsEntity,
            DoctorDetailsResponseDto
        );

        return doctorDetailsDto;
    };
}
