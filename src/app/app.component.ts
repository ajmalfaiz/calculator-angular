import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  input: string = '';
  result: string = '';

  logs: Array<{
    count: number;
    calculation: string;
  }> = [];

  formula: string;
  count: number = 0;

  onPress(num: string) {
    if (num == '0') {
      if (this.input == '') {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (
        PrevKey === '/' ||
        PrevKey === '*' ||
        PrevKey === '-' ||
        PrevKey === '+'
      ) {
        return;
      }
    }

    this.input = this.input + num;
    this.calcAnswer();
  }

  getLastOperand() {
    let pos: number;
    console.log(this.input);
    pos = this.input.toString().lastIndexOf('+');
    if (this.input.toString().lastIndexOf('-') > pos)
      pos = this.input.lastIndexOf('-');
    if (this.input.toString().lastIndexOf('*') > pos)
      pos = this.input.lastIndexOf('*');
    if (this.input.toString().lastIndexOf('/') > pos)
      pos = this.input.lastIndexOf('/');
    console.log('Last ' + this.input.substr(pos + 1));
    return this.input.substr(pos + 1);
  }

  pressOperator(op: string) {
    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+'
    ) {
      return;
    }

    this.input = this.input + op;
    this.calcAnswer();
  }

  clear() {
    if (this.input != '') {
      this.input = this.input.substr(0, this.input.length - 1);
    }
  }

  allClear() {
    this.result = '';
    this.input = '';
  }

  calcAnswer() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+' ||
      lastKey === '.'
    ) {
      formula = formula.substr(0, formula.length - 1);
    }
    this.formula = formula;
    this.result = eval(formula);
  }

  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if (this.input == '0') this.input = '';
    console.log(this.input.toString().length);

    this.count++;
    this.logs.push({
      count: this.count,
      calculation: this.formula + '=' + this.input,
    });
  }
}
