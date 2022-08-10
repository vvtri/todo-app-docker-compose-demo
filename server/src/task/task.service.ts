import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './entities/task.entity'

@Injectable()
export class TaskService {
  private taskRepo: Repository<Task>

  constructor(private dataSource: DataSource) {
    this.taskRepo = dataSource.getRepository(Task)
  }

  async create(createTaskDto: CreateTaskDto) {
    const { name } = createTaskDto
    const task = this.taskRepo.create({ name })
    return this.taskRepo.save(task)
  }

  async findAll() {
    return this.taskRepo.find()
  }

  findOne(id: number) {
    return this.taskRepo.findOneBy({ id })
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const { name } = updateTaskDto
    return this.taskRepo.save({ id, name: updateTaskDto.name })
  }

  async remove(id: number) {
    return this.taskRepo.delete(id)
  }
}
