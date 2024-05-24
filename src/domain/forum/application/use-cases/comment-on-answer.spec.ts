import { makeAnswer } from 'test/factiories/make-answer'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-question'
import { InMemoryAnswersCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'

let inMemoryAAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswersCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on answer', () => {
  beforeEach(() => {
    inMemoryAAnswerRepository = new InMemoryAnswerRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswersCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAAnswerRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'Comentario teste',
    )
  })
})
