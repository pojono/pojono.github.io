import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorIf } from '../../lib/error.if';
import { OBJECT_NOT_FOUND } from '../../lib/errors';
import { User } from '../../user/user.entity';
import { PromocodeActivateRequestDto } from '../dto/promocode.activate.request.dto';
import { Promocode } from '../entity/promocode.entity';
import { PromocodeHistoryRepository } from '../repository/promocode.history.repository';
import { PromocodeRepository } from '../repository/promocode.repository';
import { UserService } from '../../user/user.service';

@Injectable()
export class PromocodeService {
  constructor(
    @InjectRepository(PromocodeRepository)
    private promocodeRepository: PromocodeRepository,
    private promocodeHistoryRepository: PromocodeHistoryRepository,
    private userService: UserService,
  ) {}

  async activatePromocode(
    promocodeActivateRequestDto: PromocodeActivateRequestDto,
  ): Promise<void> {
    const promocode: Promocode = await this.promocodeRepository.findByText(
      promocodeActivateRequestDto.promocode,
    );
    ErrorIf.isEmpty(promocode, OBJECT_NOT_FOUND);
    const user: User = await this.userService.getUserByPhone(
      promocodeActivateRequestDto.phone,
    );
    ErrorIf.isEmpty(promocode, OBJECT_NOT_FOUND);

    await this.promocodeHistoryRepository.createPromocodeHistory({
      promocodeId: promocode.id,
      userId: user.id,
    });
    // decrease amountLeft
    // add subscriptionEndDate and subscriptionLastValidation
    // что-то поменять с квизами
  }
}
