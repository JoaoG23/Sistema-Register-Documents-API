/*
  Warnings:

  - You are about to drop the `cats` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[cats];

-- CreateTable
CREATE TABLE [dbo].[Documentos] (
    [id] NVARCHAR(1000) NOT NULL,
    [nomeDocumento] VARCHAR(30) NOT NULL,
    [caminho] VARCHAR NOT NULL,
    [tipo] VARCHAR(10) NOT NULL,
    [usuarioId] NVARCHAR(1000),
    CONSTRAINT [Documentos_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Usuarios] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) CONSTRAINT [Usuarios_email_df] DEFAULT '',
    [usuario] NVARCHAR(1000) NOT NULL CONSTRAINT [Usuarios_usuario_df] DEFAULT '',
    [senha] VARCHAR(255) NOT NULL,
    CONSTRAINT [Usuarios_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Usuarios_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [Usuarios_usuario_key] UNIQUE NONCLUSTERED ([usuario])
);

-- AddForeignKey
ALTER TABLE [dbo].[Documentos] ADD CONSTRAINT [Documentos_usuarioId_fkey] FOREIGN KEY ([usuarioId]) REFERENCES [dbo].[Usuarios]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
