import { Component, inject, signal } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { HeaderComponent } from './header/header.component';
import { Expense } from './expense/expense.model';
import { ExpenseService } from './expense/expense.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [DashboardComponent, ListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private expenseService = inject(ExpenseService);
  title = 'expense-tracker';
  expensesMaxValue = signal<number>(0);
  expensesCategorised = signal<Expense[]>([]);

  setExpensesList(expensesList: Expense[]) {
    let tempExpenses = Array<Expense>();
    let index = 0;
    let maxValue = 0;

    this.expenseService.getCategories().forEach((category) => {
      let value = 0;
      index++;
      expensesList.forEach((expense) => {
        if (category === expense.category) {
          value += expense.value;
        }
      });

      if (value) {
        if (value > maxValue) {
          maxValue = value;
        }
        tempExpenses.push({
          id: index,
          description: category,
          value: value,
          category: category,
          date: '',
        });
      }
    });

    tempExpenses.sort((one, two) => (one.value >= two.value ? -1 : 1));

    this.expensesMaxValue.set(maxValue);
    this.expensesCategorised.set(tempExpenses);
  }
}
