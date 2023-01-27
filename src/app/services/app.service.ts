import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProductModel } from '../models/product-model';

@Injectable()
export class AppService {

    constructor (
        private http: HttpClient
    ) {}

    public createProduct(dataValidade: string) {
        const header = new HttpHeaders().set('Content-Type', 'application/json');

        const optionsObject = {
            headers: header
        };

        return this.http.post('https://localhost:5000/Product/AddProduct/'+`${dataValidade}`, optionsObject);
    }

    public getProductList() {
        return this.http.get<ProductModel[]>('https://localhost:5000/Product/GetProducts');
    }

    public deleteProduct(productId: number) {
        return this.http.post('https://localhost:5000/Product/DeleteProduct', productId);
    }

    public recoverProduct(productId: number) {
        return this.http.post('https://localhost:5000/Product/RecoverProduct', productId);
    }
}