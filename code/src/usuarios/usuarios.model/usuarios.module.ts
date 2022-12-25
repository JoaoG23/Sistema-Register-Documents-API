import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UsuariosController } from '../usuarios.controller';
import { UsuariosServices } from '../usuarios.services/usuarios.services';

@Module({
  imports: [],
  controllers: [UsuariosController],
  providers: [UsuariosServices, PrismaService],
})
export class UsuariosModule {}
