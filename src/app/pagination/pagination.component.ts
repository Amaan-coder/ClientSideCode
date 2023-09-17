import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 5;
  @Input() totalItems: number = 0;

  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    const numPagesToShow = Math.min(this.totalPages, 5); // Set the maximum number of buttons to display
    const pagesArray = [];

    // Determine the range of page numbers to display
    let startPage = Math.max(this.currentPage - Math.floor(numPagesToShow / 2), 1);
    let endPage = startPage + numPagesToShow - 1;

    // Ensure that the range doesn't go beyond the total number of pages
    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(endPage - numPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesArray.push(i);
    }

    return pagesArray;
  }

  changePage(page: number): void {
    this.pageChange.emit(page);
  }
}
