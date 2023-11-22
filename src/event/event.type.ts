export class CreateEventDto {
  id: string;
  readonly name: string;
  readonly description: string;
  readonly date: Date;
  readonly imageUrl: string;
  readonly location: string;
}


export class UpdateEventDto {
  name?: string;
  description?: string;
  date?: Date;
  location?: string;
  imageUrl?: string;
}
