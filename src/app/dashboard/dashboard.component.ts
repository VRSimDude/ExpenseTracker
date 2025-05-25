import { Component, input } from '@angular/core';
import { Expense } from '../expense/expense.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  expensesMaxValue = input<number>(0);
  expensesCategorised = input<Expense[]>([]);
}
