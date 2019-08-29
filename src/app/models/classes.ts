import { Tests } from './tests';

export class Classes{
    id: number;
    className: string;
    deleted: boolean;
    testList: Tests[];
    constructor(className: string, deleted: boolean, testList: Tests[]){
        this.className=className;
        this.deleted=deleted;
        this.testList=testList;
    }
}