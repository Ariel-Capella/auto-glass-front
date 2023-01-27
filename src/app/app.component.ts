import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModel } from './models/product-model';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

  constructor(
    private appService: AppService,
    private datePipe: DatePipe
  ) {
    this.getProductList();
  }

  public columns = [
    {
      columnDef: 'codigoProduto',
      header: 'Código do Produto',
      cell: (element: ProductModel) => `${element.codigoProduto}`
    },
    {
      columnDef: 'descricaoProduto',
      header: 'Descrição do Produto',
      cell: (element: ProductModel) => `${element.descricaoProduto}`
    },
    {
      columnDef: 'situacao',
      header: 'Situação',
      cell: (element: ProductModel) => `${element.situacao}`
    },
    {
      columnDef: 'dataFabricacao',
      header: 'Data de Fabricação',
      cell: (element: ProductModel) => `${element.dataFabricacao}`
    },
    {
      columnDef: 'dataValidade',
      header: 'Data de Validade',
      cell: (element: ProductModel) => `${element.dataValidade}`
    },
    {
      columnDef: 'codigoFornecedor',
      header: 'Código do Fornecedor',
      cell: (element: ProductModel) => `${element.codigoFornecedor}`
    },
    {
      columnDef: 'descricaoFornecedor',
      header: 'Descrição do Fornecedor',
      cell: (element: ProductModel) => `${element.descricaoFornecedor}`
    },
    {
      columnDef: 'cNPJFornecedor',
      header: 'CNPJ do Fornecedor',
      cell: (element: ProductModel) => `${element.cNPJFornecedor}`
    }
  ];
  public displayedColumns = this.columns.map(c => c.columnDef);

  dataProduto = new FormGroup({
    dataValidade: new FormControl()
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource = new MatTableDataSource<ProductModel>();

  public ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public changeProductStatus(productId: number, situacao: string) {
    console.log(productId);
    if (situacao == "ativo") {
      this.appService.deleteProduct(productId).subscribe();
    } else {
      this.appService.recoverProduct(productId).subscribe();
    }
  }

  public createProduct(dataValidade: Date) {
    var parsedDate = this.datePipe.transform(dataValidade,"MM-dd-yyyy");
    var response = this.appService.createProduct(parsedDate!).subscribe();
    console.log(response);
  }

  private getProductList() {
    this.appService.getProductList()
      .subscribe(
        data => {
          this.dataSource.data = data;
        }
      )
  }
}
