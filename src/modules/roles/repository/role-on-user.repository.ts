/**
 * @fileOverview - role domain data access layer implementation
 */
import prisma from '../../../config/prisma-client';
import { RoleOnUserEntity } from '../entity/role-on-user.entity';

export class RoleOnUserRepository {
    async createRolesOnUser(
        roleOnUser: RoleOnUserEntity
    ): Promise<RoleOnUserEntity> {
        return prisma.rolesOnUser.create({
            data: roleOnUser,
        });
    }
}
