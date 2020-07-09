import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestedTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestedTransaction): Transaction {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total < value) {
        throw Error(`You don't have enough money to do it`);
      }
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
