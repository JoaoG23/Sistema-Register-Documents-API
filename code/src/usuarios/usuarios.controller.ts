import {
  Controller,
  Post,
  HttpCode,
  Body,
  Get,
  Param,
  Delete,
  Put
} from '@nestjs/common';
import { UsuarioDTO } from './usuarios.dto/UsuarioDTO';
import { UsuariosServices } from './usuarios.services/usuarios.services';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosServices) {}

  @Post('/registrar')
  @HttpCode(201)
  registrarUsuario(@Body() data: UsuarioDTO) {
    return this.usuariosService.create(data);
  }

  @Get()
  listaTodosUsuarios() {
    return this.usuariosService.listarTodos();
  }

  @Get(':id')
  listaUmLivro(@Param('id') id: string) {
    return this.usuariosService.listarUmPeloId(id);
  }
  @Delete(':id')
  deletarUmUsuario(@Param('id') id: string) {
    return this.usuariosService.deletarPeloId(id);
  }

  @Put(':id')
  atualizarUmUsuario(@Param('id') id: string, @Body() data: UsuarioDTO) {
    return this.usuariosService.editar(id, data);
  }
}
