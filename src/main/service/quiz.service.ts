import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorIf } from '../../lib/error.if';
import { OBJECT_NOT_FOUND } from '../../lib/errors';
import { getMonthText } from '../../lib/promocode.month.text';
import { UserUpdateDto } from '../../user/dto/user.update.dto';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { AnswerActionEnum } from '../answer.action.enum';
import { QuizAnswerDto } from '../dto/quiz.answer.dto';
import { Answer } from '../entity/answer.entity';
import { Quiz } from '../entity/quiz.entity';
import { EventDescriptionEnum } from '../event.description.enum';
import { AnswerRepository } from '../repository/answer.repository';
import { QuizChoiceRepository } from '../repository/quiz.choice.repository';
import { QuizMessageRepository } from '../repository/quiz.message.repository';
import { QuizMultichoiceRepository } from '../repository/quiz.multichoice.repository';
import { QuizRepository } from '../repository/quiz.repository';
import { ChoiceForMultichoiceResponseDto } from '../response/dto/quiz/choice.for.multichoice.response';
import { ChoiceResponseDto } from '../response/dto/quiz/choice.response';
import { MessageResponseDto } from '../response/dto/quiz/message.response';
import { GetQuizResponseDto } from '../response/get.quiz.response';
import { PostQuizResponseDto } from '../response/post.quiz.response';
import { PromocodeService } from './promocode.service';
import { Promocode } from '../entity/promocode.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizRepository)
    private quizRepository: QuizRepository,

    @InjectRepository(QuizMessageRepository)
    private quizMessageRepository: QuizMessageRepository,

    @InjectRepository(QuizChoiceRepository)
    private quizChoiceRepository: QuizChoiceRepository,

    @InjectRepository(QuizMultichoiceRepository)
    private quizMultichoiceRepository: QuizMultichoiceRepository,

    @InjectRepository(AnswerRepository)
    private answerRepository: AnswerRepository,

    private userService: UserService,

    private promocodeService: PromocodeService,
  ) {}

  async getByEventDescription(
    eventDescription: EventDescriptionEnum,
  ): Promise<Quiz | undefined> {
    return this.quizRepository.findByEventDescription(eventDescription);
  }

  async postQuiz(
    user: User,
    quizAnswerDto: QuizAnswerDto,
  ): Promise<PostQuizResponseDto> {
    const answer: Answer | undefined = await this.answerRepository.findById(
      quizAnswerDto.answerId,
    );
    ErrorIf.isEmpty(answer, OBJECT_NOT_FOUND);

    if (answer.answerAction === AnswerActionEnum.SET_NAME) {
      const userUpdate = new UserUpdateDto();
      userUpdate.firstName = quizAnswerDto.input;
      await this.userService.editMyself(user, userUpdate);
    }

    if (answer.answerAction === AnswerActionEnum.FIRST_QUIZ_FINISHED) {
      const userUpdate = new UserUpdateDto();
      userUpdate.firstQuizFinished = true;
      await this.userService.editMyself(user, userUpdate);
    }

    return { quizId: answer.quizId };
  }

  async getQuiz(quizId: number, user: User): Promise<GetQuizResponseDto> {
    const quiz: Quiz | undefined = await this.quizRepository.findById(quizId);
    ErrorIf.isEmpty(quiz, OBJECT_NOT_FOUND);

    let messages: MessageResponseDto[] = await this.quizMessageRepository.findByQuizId(
      quizId,
    );

    messages = messages.map(message => {
      message.text = message.text
        ? message.text.split('%USERNAME%').join(user.firstName)
        : null;
      return message;
    });

    if (
      quiz.eventDescription === EventDescriptionEnum.GO_TO_GIFT_QUIZ &&
      user.promocodeId
    ) {
      const promocode: Promocode = await this.promocodeService.getPromocodeById(
        user.promocodeId,
      );
      if (promocode) {
        const months = promocode.months;
        const monthsText = getMonthText(months);
        messages = messages.map(message => {
          message.text = message.text
            ? message.text
                .split('%GIFT_MONTHS%')
                .join(`${months} ${monthsText}`)
            : null;
          return message;
        });
      }
    }

    const choice: ChoiceResponseDto[] = await this.quizChoiceRepository.findByQuizId(
      quizId,
    );

    const choices: ChoiceForMultichoiceResponseDto[] = await this.quizMultichoiceRepository.findByQuizId(
      quizId,
    );

    return {
      messages,
      quiz: {
        id: quiz.id,
        type: quiz.type,
        choice,
        multichoice: {
          answerId: quiz.multichoiceAnswerId,
          choices,
        },
        range: {
          answerId: quiz.rangeAnswerId,
          from: quiz.rangeFrom,
          to: quiz.rangeTo,
          step: quiz.rangeStep,
        },
        input: {
          answerId: quiz.inputAnswerId,
        },
        action: {
          answerId: quiz.actionAnswerId,
          name: quiz.actionName,
        },
        goto: {
          entity: quiz.gotoEntity,
          entityId: quiz.gotoEntityId,
        },
        checkbox: {
          checkboxText: quiz.checkboxText,
          checkboxButton: quiz.checkboxButton,
          checkboxAnswerId: quiz.checkboxAnswerId,
        },
        timepicker: {
          timepickerTitle: quiz.timepickerTitle,
          timepickerActiveButton: quiz.timepickerActiveButton,
          timepickerActiveButtonAnswerId: quiz.timepickerActiveButtonAnswerId,
          timepickerInactiveButton: quiz.timepickerInactiveButton,
          timepickerInactiveButtonAnswerId:
            quiz.timepickerInactiveButtonAnswerId,
        },
      },
    };
  }
}
