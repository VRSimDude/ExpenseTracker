import { Injectable } from '@angular/core';
import { Expense } from './expense.model';
import { ExpenseFilter } from './expense-filter.model';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private maxId = 0;
  private categories = ['none'];
  private expenses = new Array<Expense>();

  constructor() {
    const expenses = localStorage.getItem('expenses');

    if (expenses) {
      this.expenses = JSON.parse(expenses);
      this.maxId = expenses.length;
    }

    const categories = localStorage.getItem('categories');

    if (categories) {
      this.categories = JSON.parse(categories);
    }
  }

  getAllExpenses() {
    return this.expenses;
  }

  getFilteredExpenses(filter: ExpenseFilter) {
    let filteredExpenses = this.expenses;

    if (filter.minAmount > 0 && filter.maxAmount > 0) {
      // min & max amount
      filteredExpenses = filteredExpenses.filter((expense) =>
        expense.value >= filter.minAmount && expense.value <= filter.maxAmount
          ? true
          : false
      );
    } else if (filter.minAmount > 0 && filter.maxAmount <= 0) {
      // min amount only
      filteredExpenses = filteredExpenses.filter((expense) =>
        expense.value >= filter.minAmount ? true : false
      );
    } else if (filter.minAmount <= 0 && filter.maxAmount > 0) {
      // max amount only
      filteredExpenses = filteredExpenses.filter((expense) =>
        expense.value <= filter.maxAmount ? true : false
      );
    }

    if (filter.minDate.length && filter.maxDate.length) {
      // min & max date
      filteredExpenses = filteredExpenses.filter((expense) =>
        expense.date >= filter.minDate && expense.date <= filter.maxDate
          ? true
          : false
      );
    } else if (filter.minDate.length && !filter.maxDate.length) {
      // min amount only
      filteredExpenses = filteredExpenses.filter((expense) =>
        expense.date >= filter.minDate ? true : false
      );
    } else if (!filter.minDate.length && filter.maxDate.length) {
      // max amount only
      filteredExpenses = filteredExpenses.filter((expense) =>
        expense.date <= filter.maxDate ? true : false
      );
    }

    // category filter
    if (filter.category !== 'all') {
      filteredExpenses = filteredExpenses.filter((expense) =>
        expense.category === filter.category ? true : false
      );
    }

    return filteredExpenses;
  }

  getCategories() {
    return this.categories;
  }

  addExpense(expense: Expense) {
    this.maxId++;
    expense.id = this.maxId;
    if (!expense.category.length) {
      expense.category = 'none';
    }
    this.expenses.push(expense);

    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  addCategory(category: string) {
    if (!this.categories.find((element) => element === category)) {
      this.categories.push(category);
    }
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  deleteExpense(id: number) {
    this.expenses = this.expenses.filter((expense) =>
      expense.id === id ? false : true
    );
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }
}
