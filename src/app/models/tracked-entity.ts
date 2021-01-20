import { v4 as uuidv4 } from 'uuid';

export abstract class TrackedEntitiy {
  public id: string;

  constructor() {
    this.id = uuidv4();
  }

}
