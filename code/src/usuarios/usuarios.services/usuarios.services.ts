import { Injectable, ConflictException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/database/PrismaService';
import { UsuarioDTO } from '../usuarios.dto/UsuarioDTO';

@Injectable()
export class UsuariosServices {
  constructor(private prisma: PrismaService) {}
  async create(data: UsuarioDTO) {
    const usuarioExiste = await this.listarPeloUsuario(data.usuario);
    const emailUsuarioExiste = await this.listarPeloEmail(data.email);

    if (emailUsuarioExiste) {
      throw new ConflictException('Esse email já existe');
    }
    if (usuarioExiste) {
      throw new ConflictException('Esse usuário já existe! Tente outro');
    }

    const usuario = await this.prisma.usuarios.create({
      data: data,
    });

    return usuario;
  }

  async listarTodos() {
    const usuarios = await this.prisma.usuarios.findMany();
    return usuarios
      ? usuarios
      : new NotFoundError('Não há nenhum usuário cadastrado');
  }

  async listarUmPeloId(id: string) {
    const usuario = await this.prisma.usuarios.findFirst({
      where: {
        id: id,
      },
    });
    return usuario ? usuario : [];
    // ? usuario
    // : new NotFoundError('Não nenhum usuário com esse id');
  }
  async deletarPeloId(id: string) {
    const existeIdUsuario = await this.listarUmPeloId(id);
    // if (existeIdUsuario) {
    //   throw new ConflictException('Esse id não foi encontrado');
    // }
    const usuario = await this.prisma.usuarios.delete({
      where: {
        id: id,
      },
    });
    return usuario;
  }

  async listarPeloEmail(email: string) {
    return this.prisma.usuarios.findFirst({
      where: {
        email,
      },
    });
  }
  async listarPeloUsuario(usuario: string) {
    return this.prisma.usuarios.findFirst({
      where: {
        usuario,
      },
    });
  }
  async editar(id: string, data: UsuarioDTO) {
    const usuario = await this.prisma.usuarios.update({
      data: data,
      where: {
        id: id,
      },
    });
    return usuario;
  }
}
