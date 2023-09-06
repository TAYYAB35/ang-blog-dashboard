import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  useYear!: number;
  
  ngOnInit() {
    this.currentYear(); // Call the function in ngOnInit()
  }

  currentYear(){
    const date = new Date()
    this.useYear = date.getUTCFullYear();
    console.log(this.useYear)
  }

}
