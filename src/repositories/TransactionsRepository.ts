import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionCTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactions = this.all();
    const income: number = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((accumulator, val) => {
        return accumulator + val.value;
      }, 0);
    const outcome: number = transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((accumulator, val) => {
        return accumulator + val.value;
      }, 0);
    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionCTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
