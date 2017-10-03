/*basic and test*/
PRAGMA foreign_key=ON;
CREATE TABLE IF NOT EXISTS "User" (
  "Id" INTEGER PRIMARY KEY,
  "UserName" TEXT UNIQUE,
  "Password" TEXT,
  "Active" BOOLEAN
);

CREATE TABLE IF NOT EXISTS "Group" (
  "Id" INTEGER PRIMARY KEY,
  "Name" TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS "UserGroup" (
  "UserId" INTEGER REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE,
  "GroupId" INTEGER REFERENCES "Group"("Id") ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY ("UserId", "GroupId")
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
  "Cliente" TEXT,
  "Proveedor" TEXT,
  "Empleado" TEXT,
  UNIQUE ("TipoDeIdentificacion", "NumeroDeIdentificacion", "DigitoDeVerificacion")
);
