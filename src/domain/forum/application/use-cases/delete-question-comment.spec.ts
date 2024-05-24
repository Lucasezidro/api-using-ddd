import { InMemoryQuestionsCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factiories/make-question-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionCommentsRepository: InMemoryQuestionsCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete question comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionsCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete question comment', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should be not able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryQuestionCommentsRepository.create(questionComment)

    await expect(() =>
      sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
