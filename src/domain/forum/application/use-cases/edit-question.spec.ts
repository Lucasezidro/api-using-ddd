import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factiories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      title: 'Pergunta teste',
      content: 'Conteudo teste',
      questionId: newQuestion.id.toValue(),
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'Pergunta teste',
      content: 'Conteudo teste',
    })
  })

  it('should be not able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        title: 'Pergunta teste',
        content: 'Conteudo teste',
        questionId: newQuestion.id.toValue(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
