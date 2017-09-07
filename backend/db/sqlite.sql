/*basic and test*/
PRAGMA foreign_key=ON;
CREATE TABLE IF NOT EXISTS "User" (
  "Id" INTEGER PRIMARY KEY,
  "UserName" TEXT UNIQUE,
  "Password" TEXT,
  "Active" BOOLEAN
);

/*empresa*/
PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS "Tercero" (
  "Id" INTEGER PRIMARY KEY,
  "TipoDeIdentificacion" TEXT NOT NULL,
  "NumeroDeIdentificacion" TEXT NOT NULL,
  "DigitoDeVerificacion" TEXT,
  "PrimerApellido" TEXT,
  "SegundoApellido" TEXT,
  "PrimerNombre" TEXT,
  "OtrosNombres" TEXT,
  "RazonSocial" TEXT,
  "Direccion" TEXT,
  "CodigoDepartamento" TEXT,
  "CodigoMunicipio" TEXT,
  "PaisDeResidencia" TEXT,
  UNIQUE ("TipoDeIdentificacion", "NumeroDeIdentificacion", "DigitoDeVerificacion")
);
