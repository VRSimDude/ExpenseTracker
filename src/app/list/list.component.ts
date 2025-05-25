import { Component, inject, output, signal } from '@angular/core';
import { ExpenseService } from '../expense/expense.service';
import { ExpenseFilter } from '../expense/expense-filter.model';
import { Expense } from '../expense/expense.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewExpenseComponent } from '../new-expense/new-expense.component';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  standalone: true,
  selector: 'app-list',
  imports: [
    CommonModule,
    NewExpenseComponent,
    NewCategoryComponent,
    FormsModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  private expenseService = inject(ExpenseService);
  categories = ['none'];
  isAddingExpense = false;
  isAddingCategory = false;
  isAscendingSort = true;
  isFilterVisible = false;
  filter: ExpenseFilter = {
    minAmount: 0,
    maxAmount: 0,
    minDate: '',
    maxDate: '',
    category: 'all',
  };
  currentColumnSort = 1;
  expenses = signal<Expense[]>([]);
  sendExpenses = output<Expense[]>();

  constructor() {
    this.expenses.set(this.expenseService.getAllExpenses());
    this.categories = this.expenseService.getCategories();
  }

  ngOnInit() {
    this.listChanged(false);
  }

  listChanged(isCategoryChanged: boolean) {
    if (isCategoryChanged) {
      this.categories = this.expenseService.getCategories();
    } else {
      this.sendExpenses.emit(this.expenses());
    }
  }

  onStartAddExpense() {
    this.isAddingExpense = true;
  }

  onCloseAddExpense() {
    this.isAddingExpense = false;
  }

  onStartAddCategory() {
    this.isAddingCategory = true;
  }

  onCloseAddCategory() {
    this.isAddingCategory = false;
  }

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  onFilterCategoryChanged(category: string) {
    this.filter.category = category;
  }

  onResetFilter() {
    this.filter.minAmount = 0;
    this.filter.maxAmount = 0;
    this.filter.minDate = '';
    this.filter.maxDate = '';
    this.filter.category = 'all';
    let category = <HTMLSelectElement>document.getElementById('category');
    category.value = 'all';
    this.onApplyFilter();
  }

  onApplyFilter() {
    if (
      this.filter.minAmount == 0 &&
      this.filter.maxAmount == 0 &&
      !this.filter.minDate.length &&
      !this.filter.maxDate.length &&
      this.filter.category === 'all'
    ) {
      this.expenses.set(this.expenseService.getAllExpenses());
    } else {
      this.expenses.set(this.expenseService.getFilteredExpenses(this.filter));
    }
    this.listChanged(false);
  }

  onSortDescription() {
    if (this.currentColumnSort == 1) {
      this.isAscendingSort = !this.isAscendingSort;
    } else {
      this.currentColumnSort = 1;
      this.isAscendingSort = true;
    }

    if (this.isAscendingSort) {
      this.expenses().sort((one, two) =>
        one.description >= two.description ? -1 : 1
      );
    } else {
      this.expenses().sort((one, two) =>
        one.description < two.description ? -1 : 1
      );
    }
  }

  onSortAmount() {
    if (this.currentColumnSort === 2) {
      this.isAscendingSort = !this.isAscendingSort;
    } else {
      this.currentColumnSort = 2;
      this.isAscendingSort = true;
    }

    if (this.isAscendingSort) {
      this.expenses().sort((one, two) => (one.value >= two.value ? -1 : 1));
    } else {
      this.expenses().sort((one, two) => (one.value < two.value ? -1 : 1));
    }
  }

  onSortDate() {
    if (this.currentColumnSort === 3) {
      this.isAscendingSort = !this.isAscendingSort;
    } else {
      this.currentColumnSort = 3;
      this.isAscendingSort = true;
    }

    if (this.isAscendingSort) {
      this.expenses().sort((one, two) => (one.date >= two.date ? -1 : 1));
    } else {
      this.expenses().sort((one, two) => (one.date < two.date ? -1 : 1));
    }
  }

  onSortCategory() {
    if (this.currentColumnSort === 4) {
      this.isAscendingSort = !this.isAscendingSort;
    } else {
      this.currentColumnSort = 4;
      this.isAscendingSort = true;
    }

    if (this.isAscendingSort) {
      this.expenses().sort((one, two) =>
        one.category >= two.category ? -1 : 1
      );
    } else {
      this.expenses().sort((one, two) =>
        one.category < two.category ? -1 : 1
      );
    }
  }

  onDeleteExpense(id: number) {
    this.expenseService.deleteExpense(id);

    this.expenses.set(this.expenseService.getAllExpenses());
    this.listChanged(false);
  }
}
