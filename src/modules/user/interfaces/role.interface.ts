export interface IRole extends Document {
  readonly name: string;
  enabled: boolean;
}
