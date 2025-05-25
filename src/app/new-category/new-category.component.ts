import { Component, inject, output } from '@angular/core';
import { ExpenseService } from '../expense/expense.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-new-category',
  imports: [FormsModule],
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css',
})
export class NewCategoryComponent {
  private expenseService = inject(ExpenseService);
  close = output<void>();
  added = output<void>();
  enteredCategory = '';

  onCancel() {
    this.close.emit();
  }

  onAdd() {
    if (!this.enteredCategory.length) {
      alert('Please add a category!');
      return;
    }

    this.expenseService.addCategory(this.enteredCategory);

    this.close.emit();
    this.added.emit();
  }
}
