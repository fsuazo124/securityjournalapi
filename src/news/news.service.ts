import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { sj_posta, Prisma } from '@prisma/client';

@Injectable()
export class NewsService {

  constructor(
    private prisma: PrismaService
    ){}

    async create(data: Prisma.sj_postaCreateInput): Promise<sj_posta> {
      return this.prisma.sj_posta.create({
        data,
      });
    }

  findAll() {
    return `This action returns all news`;
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
