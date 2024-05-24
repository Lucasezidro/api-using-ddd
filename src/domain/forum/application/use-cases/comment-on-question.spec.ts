import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factiories/make-question'
import { InMemoryQuestionsCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryAQuestionRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionsCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryAQuestionRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionsCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryAQuestionRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryAQuestionRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'Comentario teste',
    )
  })
})
