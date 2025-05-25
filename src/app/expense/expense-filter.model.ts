export interface ExpenseFilter {
  minAmount: number;
  maxAmount: number;
  minDate: string;
  maxDate: string;
  category: string;
}