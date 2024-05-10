import { Answer } from '@/domain/forum/enterprise/entities/answer'

export interface AnsewersRepository {
  create(answer: Answer): Promise<void>
}
