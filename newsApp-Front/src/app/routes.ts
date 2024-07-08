import { Routes } from "@angular/router";
import { NewsCategoryComponent } from "./news-category/news-category.component";
import { NewsHomeComponent } from "./news-home/news-home.component";




const routeConfig: Routes = [
    {
        path: '',
        component: NewsHomeComponent,
        title: 'Home page'
    },
    {
        path: 'category/:category',
        component: NewsCategoryComponent,
        title: 'News by Category'
    }
];

export default routeConfig;