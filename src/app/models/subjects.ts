import {Part} from './part';

export class Subjects {
  id: number;
  subjectName: string;
  description: string;
  imgUrl: string;
  parentId: number;
  priority: number;
  partList: Part[];
  deleted: boolean;
  constructor(subjectName: string, description: string, imgUrl: string, parentId: number, priority: number, partList: Part[], deleted: boolean) {
    this.subjectName=subjectName;
    this.deleted=deleted;
    this.description=description;
    this.imgUrl=imgUrl;
    this.parentId=parentId;
    this.priority=priority;
    this.partList=partList;
  }

}
