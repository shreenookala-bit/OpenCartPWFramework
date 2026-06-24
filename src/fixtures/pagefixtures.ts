
import{ test as Basetest} from '@playwright/test';
import { Loginpage } from '../pages/Loginpage';
import { Homepage } from '../pages/Homepage';
import { CsvHelper } from '../utils/CsvHelper';
import { SearchResultpage } from '../pages/SearchResultpage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { Basepage } from '../pages/Basepage';


type pagefixtures = {
    basepage: Basepage,
    loginpage: Loginpage,
    homepage: Homepage,
    searchresultpage: SearchResultpage,
    productinfopage: ProductInfoPage,
    testData: Record<string, string>[]
};
 
  export let test=Basetest.extend<pagefixtures>({

    basepage: async({page},use)=>{
        let basepage= new Basepage(page);
        await use(basepage);
    },
    loginpage: async({page},use)=>{
        let loginpage= new Loginpage(page);
        await use(loginpage);
    },
    homepage: async({page},use)=>{
        let homepage= new Homepage(page);
        await use(homepage);
    },
    searchresultpage :async({page},use)=>{
        let searchresultpage= new SearchResultpage(page);
        await use(searchresultpage)
    },
    productinfopage : async({page},use)=>{
        let productinfopage= new ProductInfoPage(page);
        await use(productinfopage)
    },
    testData : async({},use)=>{
       let testData=CsvHelper.readCsv('src/data/loginData.csv')
       await use(testData);
    }
  });
   export{ expect} from '@playwright/test';