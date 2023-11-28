export class CreateEventDto {
  id: string;
  readonly name: string;
  readonly description: string;
  readonly date: Date;
  imageUrl: string;
  readonly location: string;
  imageData: Buffer;
}

export class UpdateEventDto {
  name?: string;
  description?: string;
  date?: Date;
  location?: string;
  imageUrl?: string;
}
