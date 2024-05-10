import { Answer } from '../entities/answer'

export interface AnsewersRepository {
  create(answer: Answer): Promise<void>
}
