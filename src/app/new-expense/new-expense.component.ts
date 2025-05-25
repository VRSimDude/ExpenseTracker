import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../expense/expense.service';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';

@Component({
  standalone: true,
  selector: 'app-new-expense',
  imports: [FormsModule],
  templateUrl: './new-expense.component.html',
  styleUrl: './new-expense.component.css',
})
export class NewExpenseComponent {
  private expenseService = inject(ExpenseService);
  categories = ['none'];
  close = output<void>();
  added = output<void>();
  enteredDescription = '';
  enteredValue = 0;
  enteredDate = '';
  enteredCategory = '';

  constructor() {
    this.categories = this.expenseService.getCategories();
  }

  onCancel() {
    this.close.emit();
  }

  onCategoryChanged(category: string) {
    this.enteredCategory = category;
  }

  onAdd() {
    if (!this.enteredDescription.length) {
      alert('Please add a description!');
      return;
    }

    if (this.enteredValue <= 0) {
      alert('Please enter a value more than 0!');
      return;
    }

    if (!this.enteredDate.length) {
      alert('Please choose a date!');
      return;
    }

    this.expenseService.addExpense({
      id: 0,
      description: this.enteredDescription,
      value: this.enteredValue,
      date: this.enteredDate,
      category: this.enteredCategory,
    });

    this.close.emit();
    this.added.emit();
  }
}
