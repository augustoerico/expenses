import { CreateExpenseDto } from "../dto/create-expense.dto";
import { UpdateExpenseDto } from "../dto/update-expense.dto";

export class Expense {
    
    readonly id: string;
    readonly createdAt: string;
    value: number;
    description: string;

    constructor(createDto: CreateExpenseDto) {
        const now = new Date().toISOString();
        
        this.id = now.replace(/\D/g, '');
        
        const { description, value } = createDto;
        this.description = description;
        this.value = value;
        
        this.createdAt = now;
    }
    
    patch(patchDto: UpdateExpenseDto) {
        const { value, description } = patchDto;
        this.value = value || this.value;
        this.description = description || this.description;
    }
}
