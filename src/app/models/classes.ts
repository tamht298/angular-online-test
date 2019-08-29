import { Tests } from './tests';

export class Classes{
    id: number;
    className: string;
    
    testList: Tests[];
    constructor(className: string, deleted: boolean, testList: Tests[]){
        this.className=className;
        
        this.testList=testList;
    }
}