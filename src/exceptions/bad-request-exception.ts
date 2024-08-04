import { BaseException } from './base-exception';

export class BadRequestException extends BaseException {
    constructor(message: string) {
        super(message, 'BAD-REQUEST', 400);
    }
}
