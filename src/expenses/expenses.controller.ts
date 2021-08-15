import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { response } from 'express';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto, @Res() response) {
    const expense = this.expensesService.create(createExpenseDto);
    response.status(201).send({ data: expense });
  }

  @Get()
  findAll() {
    const expenses = this.expensesService.findAll();
    return { data: expenses };
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() response) {
    const expense = this.expensesService.findOne(id);
    if (expense) {
      response.status(200).send({ data: expense });
    } else {
      response.status(404).send({ errors: [{ message: 'not found' }] });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto, @Res() response) {
    try {
      const expense = this.expensesService.update(id, updateExpenseDto);
      response.status(200).send({ data: expense });
    } catch (e) {
      const { message } = e;
      response.status(404).send({ errors: [{ message }] });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() response) {
    try {
      this.expensesService.remove(id);
      response.status(204).send();
    } catch(e) {
      const { message } = e;
      response.status(404).send({ errors: [{ message }] });
    }
  }
}
