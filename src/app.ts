import { Invoice } from './classes/Invoice.js';

const invoiceOne = new Invoice('mario', 'work on the mario website', 250);
const invoiceTwo = new Invoice('luigi', 'work on the luigi website', 300);

let invoices: Invoice[] = [];
invoices.push(invoiceOne);
invoices.push(invoiceTwo);
invoices.forEach(invoice => {
  console.log(invoice.client, invoice.amount, invoice.format())
})



const form = document.querySelector('.new-item-form') as HTMLFormElement;

const type = document.querySelector('#type') as HTMLSelectElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

form.addEventListener('submit', (e: Event) => {
  e.preventDefault()

  console.log(
    type.value,
    tofrom.value,
    details.value,
    amount.valueAsNumber,
  )
});
