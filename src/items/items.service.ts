import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from "./schemas/item.schema";
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private itemModel: Model<Item>) { }

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findById(id).exec();
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = new this.itemModel(createItemDto);
    return await newItem.save();
  }

  async update(id: string, item: CreateItemDto): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true })
  }

  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove({ _id: id });
  }
}
