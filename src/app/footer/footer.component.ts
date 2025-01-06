import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
    <p>Contact us: arshand&#64;gamil.com | Phone: 123456789</p>
    <p>&copy; 2024 IBM E-commerce site. All rights reserved.</p>
  </footer>
  `,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {}
