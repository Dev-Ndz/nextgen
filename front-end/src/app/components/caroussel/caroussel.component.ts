import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-caroussel',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './caroussel.component.html',
  styleUrl: './caroussel.component.scss',
})
export class CarousselComponent {
  galleryItems = [
    {
      title: 'Efficient Prospect to Customer Conversion Strategies.',
      text: `Provide a complimentary trial or demonstration of your product or service, enabling the customer to experience it firsthand.`,
    },
    { title: 'Item 2', text: 'This is the description for item 2.' },
    { title: 'Item 3', text: 'This is the description for item 3.' },
  ];
}
