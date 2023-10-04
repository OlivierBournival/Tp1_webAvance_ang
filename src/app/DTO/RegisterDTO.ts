export class RegisterDTO {
  constructor(
    public email: string,
    public password: string,
    public passwordConfirm: string
  ) {}
}
