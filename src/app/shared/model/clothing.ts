import { Kit } from './kit';

export class Clothing {
  constructor(
    public id: string,
    public description: string,
    public brand: string,
    public size: string,
    public color: string,
    public material: string,
    public kit: Kit | null = null
  ) {}
}
