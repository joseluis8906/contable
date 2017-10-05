CREATE TABLE IF NOT EXISTS "User" (
  "Id" BIGSERIAL PRIMARY KEY,
  "UserName" TEXT UNIQUE,
  "Password" TEXT,
  "Active" TEXT
);

CREATE TABLE IF NOT EXISTS "Group" (
  "Id" BIGSERIAL PRIMARY KEY,
  "Name" TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS "UserGroup" (
  "UserId" BIGINT REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE,
  "GroupId" BIGINT REFERENCES "Group"("Id") ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY ("UserId", "GroupId")
);

/*empresa*/
CREATE TABLE IF NOT EXISTS "Tercero" (
  "Id" BIGSERIAL PRIMARY KEY,
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

CREATE TABLE IF NOT EXISTS "PUC" (
  "Id" BIGSERIAL PRIMARY KEY,
  "Type" TEXT,
  "Code" TEXT,
  "Name" TEXT,
  UNIQUE("Type", "Code")
);
