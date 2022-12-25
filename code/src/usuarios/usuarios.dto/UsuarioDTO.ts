import { IsNotEmpty } from 'class-validator';

export class UsuarioDTO {
  id?: string;

  @IsNotEmpty({
    message: 'Nao pode ser vazio',
  })
  public email: string;

  @IsNotEmpty({
    message: 'Usuário não pode ser vazio',
  })
  public usuario: string;

  @IsNotEmpty({
    message: 'Senha não pode ser vazio',
  })
  public senha: string;
}
