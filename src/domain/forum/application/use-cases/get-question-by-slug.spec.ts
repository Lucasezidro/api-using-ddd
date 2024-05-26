import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factiories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('exemple-question'),
    })

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'exemple-question',
    })

    expect(result.value?.question.id).toBeTruthy()
    expect(result.value?.question.title).toEqual(newQuestion.title)
  })
})
