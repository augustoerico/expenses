import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpensesService {

  private expenses: Expense[] = [
    new Expense({ value: 120, description: 'Open lap at TMP' })
  ];

  create(dto: CreateExpenseDto): Expense {
    const expense = new Expense(dto);
    this.expenses.push(expense);
    return expense;
  }

  findAll(): Expense[] {
    return this.expenses;
  }

  findOne(id: string): Expense | undefined {
    const expensesById = this.expenses.filter(e =>  e.id === id);
    return expensesById.length ? expensesById[0] : undefined;
  }

  update(id: string, dto: UpdateExpenseDto) {
    const expense = this.findOne(id);
    if (expense) {
      expense.patch(dto);
      return expense;
    } else {
      throw new Error(`expense.id = ${id} does not exist`);
    }
  }

  remove(id: string) {
    const index = this.expenses.findIndex(e => e.id === id);
    if (index > -1) {
      this.expenses.splice(index, 1);
    } else {
      throw new Error(`expense.id = ${id} does not exist`);
    }
  }
}
