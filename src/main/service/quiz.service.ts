import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizRepository } from '../repository/quiz.repository';
import { GetQuizResponseDto } from '../response/get.quiz.response';
import { Quiz } from '../entity/quiz.entity';
import { ErrorIf } from '../../lib/error.if';
import { OBJECT_NOT_FOUND } from '../../lib/errors';
import { MessageResponseDto } from '../response/dto/quiz/message.response';
import { ChoiceResponseDto } from '../response/dto/quiz/choice.response';
import { ChoiceForMultichoiceResponseDto } from '../response/dto/quiz/choice.for.multichoice.response';
import { QuizMessageRepository } from '../repository/quiz.message.repository';
import { QuizChoiceRepository } from '../repository/quiz.choice.repository';
import { QuizMultichoiceRepository } from '../repository/quiz.multichoice.repository';
import { PostQuizResponseDto } from '../response/post.quiz.response';
import { QuizAnswerDto } from '../dto/quiz.answer.dto';
import { User } from '../../user/user.entity';
import { AnswerRepository } from '../repository/answer.repository';
import { Answer } from '../entity/answer.entity';
import { AnswerActionEnum } from '../answer.action.enum';
import { UserService } from '../../user/user.service';
import { UserUpdateDto } from '../../user/dto/user.update.dto';
import { EventDescriptionEnum } from '../event.description.enum';

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
      message.text = message.text.split('%USERNAME%').join(user.firstName);
      return message;
    });

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
