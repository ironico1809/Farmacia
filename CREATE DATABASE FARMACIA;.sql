CREATE DATABASE FARMACIA;
USE FARMACIA;
	
CREATE TABLE Personal (
    ID INT PRIMARY KEY,
    CI VARCHAR(20),
    Nombre VARCHAR(100),
    Sexo VARCHAR(10),
    Telefono VARCHAR(20),
    Correo VARCHAR(100),
    Domicilio VARCHAR(150)
);

CREATE TABLE Rol (
    ID INT PRIMARY KEY,
    Nombre VARCHAR(50),
    Descripcion VARCHAR(150)
);

CREATE TABLE Usuario (
    ID INT PRIMARY KEY,
    Usuario VARCHAR(50),
    Contraseña VARCHAR(100),
    PersonalID INT UNIQUE,
    RolID INT,
    FOREIGN KEY (PersonalID) REFERENCES Personal(ID),
    FOREIGN KEY (RolID) REFERENCES Rol(ID)
);

CREATE TABLE Privilegio (
    ID INT PRIMARY KEY,
    Descripcion VARCHAR(150)
);

CREATE TABLE Permiso (
    RolID INT,
    PrivilegioID INT,
    Fecha DATE,
    PRIMARY KEY (PrivilegioID, RolID),
    FOREIGN KEY (PrivilegioID) REFERENCES Privilegio(ID),
    FOREIGN KEY (RolID) REFERENCES Rol(ID)
);

CREATE TABLE Bitacora (
    ID INT PRIMARY KEY,
    Fecha DATE,
    Hora TIME,
    Accion VARCHAR(150),
    UsuarioID INT,
    FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID)
);

CREATE TABLE Proveedor (
    ID INT PRIMARY KEY,
    Nombre VARCHAR(100),
    Dirección VARCHAR(150),
    Telefono VARCHAR(20),
    E_mail VARCHAR(100)
);

CREATE TABLE Nota_compra (
    ID INT PRIMARY KEY,
    Fecha DATE,
    Hora TIME,
    Monto_Total DECIMAL(10,2),
    UsuarioID INT,
    ProveedorID INT,
    FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID),
    FOREIGN KEY (ProveedorID) REFERENCES Proveedor(ID)
);

CREATE TABLE Categoria (
    ID INT PRIMARY KEY,
    Nombre VARCHAR(100)
);

CREATE TABLE Marca (
    ID INT PRIMARY KEY,
    Nombre VARCHAR(100)
);

CREATE TABLE Producto (
    ID INT PRIMARY KEY,
    Nombre VARCHAR(100),
    Descripcion VARCHAR(200),
    Forma_Farmaceutica VARCHAR(100),
    Concentracion VARCHAR(100),
    Via_Administracion VARCHAR(100),
    Oferta BOOLEAN,
    Precio_Compra DECIMAL(10,2),
    Precio_Venta DECIMAL(10,2),
    Stock INT,
    Receta BOOLEAN,
    MarcaID INT,
    CategoriaID INT,
    FOREIGN KEY (MarcaID) REFERENCES Marca(ID),
    FOREIGN KEY (CategoriaID) REFERENCES Categoria(ID)
);

CREATE TABLE Detalle_Nota_Compra (
    NotaCompraID INT,
    ProductoID INT,
    Cantidad INT,
    Costo DECIMAL(10,2),
    Importe DECIMAL(10,2),
    PRIMARY KEY (NotaCompraID, ProductoID),
    FOREIGN KEY (NotaCompraID) REFERENCES Nota_compra(ID),
    FOREIGN KEY (ProductoID) REFERENCES Producto(ID)
);

CREATE TABLE Nota_de_Salida (
    ID INT PRIMARY KEY,
    Fecha DATE,
    Hora TIME
);

CREATE TABLE Detalle_Nota_Salida (
    NotaSalidaID INT,
    ProductoID INT,
    Cantidad INT,
    PRIMARY KEY (NotaSalidaID, ProductoID),
    FOREIGN KEY (NotaSalidaID) REFERENCES Nota_de_Salida(ID),
    FOREIGN KEY (ProductoID) REFERENCES Producto(ID)
);

CREATE TABLE Cliente (
    ID INT PRIMARY KEY,
    Nombre VARCHAR(100),
    Telefono VARCHAR(20),
    Email VARCHAR(100)
);

CREATE TABLE Factura (
    ID INT PRIMARY KEY,
    Fecha DATE,
    Hora TIME,
    Monto_Total DECIMAL(10,2),
    Descuento DECIMAL(10,2),
    UsuarioID INT,
    ClienteID INT,
    FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID),
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ID)
);

CREATE TABLE Detalle_Nota_Venta (
    FacturaID INT,
    ProductoID INT,
    Cantidad INT,
    Precio DECIMAL(10,2),
    Total DECIMAL(10,2),
    PRIMARY KEY (FacturaID, ProductoID),
    FOREIGN KEY (FacturaID) REFERENCES Factura(ID),
    FOREIGN KEY (ProductoID) REFERENCES Producto(ID)
);




-- Insertar datos en la tabla Personal (solo las 3 personas originales)
INSERT INTO Personal (ID, CI, Nombre, Sexo, Telefono, Correo, Domicilio) VALUES
(111, '12345678', 'Nirvana Arias Canaviri', 'Femenino', '74646279', 'nirvanAriasCanaviri@gmail.com', 'Av. Moscú'),
(222, '87654321', 'Ema Canaviri Fernandez', 'Femenino', '72173918', 'emacanavuriF@gmail.com', 'Av. Moscú'),
(333, '11223344', 'Gigrioly Arias Canaviri', 'Femenino', '63558068', 'gigriolyACanaviri@gamil.com', 'Av. Moscú');

-- Insertar datos en la tabla Rol
INSERT INTO Rol (ID, Nombre, Descripcion) VALUES
(110, 'Administrador', 'Gestiona toda la farmacia'),
(220, 'Farmacéutico', 'Controla medicamentos y ventas'),
(330, 'Cajero', 'Procesa pagos y facturas'),
(440, 'Almacenero', 'Administra inventario'),
(550, 'Supervisor', 'Supervisa operaciones diarias');

-- Insertar datos en la tabla Usuario (solo los 3 usuarios correspondientes a Personal)
INSERT INTO Usuario (ID, Usuario, Contraseña, PersonalID, RolID) VALUES
(1001, 'nirvanAC', 'contraseña123', 111, 110),
(2002, 'emaC', 'contraseña456', 222, 220),
(3003, 'gigriolyAC', 'contraseña789', 333, 330);

-- Insertar datos en la tabla Privilegio
INSERT INTO Privilegio (ID, Descripcion) VALUES
(150, 'Agregar Producto'),
(260, 'Eliminar Producto'),
(370, 'Ver Reportes'),
(480, 'Modificar Producto'),
(590, 'Gestionar Proveedores');

-- Insertar datos en la tabla Permiso (ajustado para roles 110, 220, 330)
INSERT INTO Permiso (RolID, PrivilegioID, Fecha) VALUES
(110, 150, '2025-03-05'),
(110, 260, '2025-03-12'),
(110, 370, '2025-03-19'),
(220, 370, '2025-03-03'),
(220, 480, '2025-03-27'),
(330, 590, '2025-03-15');

-- Insertar datos en la tabla Proveedor
INSERT INTO Proveedor (ID, Nombre, Dirección, Telefono, E_mail) VALUES
(8300, 'INDUFAR', 'Av. Industrial #456, Zona Franca, La Paz', '+591 76543210', 'contacto@indufar.com.bo'),
(8400, 'PROCAPS', 'Calle Farmacéutica #789, Parque Industrial, Santa Cruz', '+591 71234567', 'ventas@procaps.com.bo'),
(8500, 'PROMEDICAL', 'Av. de la Salud #321, Sopocachi, La Paz', '+591 62345678', 'info@promedical.com.bo'),
(8600, 'SOLUCION', 'Calle Soluciones Médicas #654, Cochabamba', '+591 73456789', 'solucionesmed@solucion.com.bo'),
(8700, 'CHILE/SAE', 'Av. Internacional #987, Zona Sur, Santa Cruz', '+591 67891234', 'importaciones@sae.com.bo'),
(8800, 'TELCHI', 'Av. Tecnológica #159, Parque Industrial, El Alto', '+591 74567890', 'telefonia@telchi.com.bo'),
(8900, 'SAN FERNANDO', 'Calle Farmacológica #753, La Paz', '+591 61234567', 'ventas@sfernando.com.bo'),
(9000, 'MHEDICAL PHARMA', 'Av. Innovación #258, Santa Cruz', '+591 72345678', 'innovacion@mhpharma.com.bo'),
(9100, 'UNIVERSAL PHARMA', 'Av. Global #852, Zona Norte, Cochabamba', '+591 63456789', 'global@universalpharma.bo'),
(9200, 'QUIMFA', 'Calle Química Farmacéutica #147, La Paz', '+591 75678901', 'laboratorio@quimfa.com.bo'),
(9300, 'KAIS', 'Av. Cosmética #369, Sopocachi, La Paz', '+591 61234568', 'dermocosmeticos@kais.com.bo'),
(9400, 'COFAR', 'Calle Cooperativa Farmacéutica #123, El Alto', '+591 72345679', 'cooperativa@cofar.com.bo'),
(9500, 'VITA', 'Av. Nutrición #753, Zona Este, Santa Cruz', '+591 63456780', 'vitaminas@vita.com.bo'),
(9600, 'ARGEBOL GMP', 'Av. GMP #456, Parque Industrial, Cochabamba', '+591 75678912', 'calidad@argebolgmp.com.bo'),
(9700, 'DISMEDIN', 'Calle Dermatológica #852, La Paz', '+591 61234569', 'dermatologia@dismedin.com.bo'),
(9800, 'CHINOIN', 'Av. Internacional #753, Zona Franca, Santa Cruz', '+591 72345670', 'bolivia@chinoin.com'),
(9900, 'SANAT', 'Calle Sanitaria #147, Sopocachi, La Paz', '+591 63456781', 'sanidad@sanat.com.bo'),
(10000, 'IFARBO', 'Av. Industrial Farmacéutica #321, El Alto', '+591 75678913', 'produccion@ifarbo.com.bo'),
(10100, 'BAYER', 'Av. Multinacional #654, Santa Cruz', '+591 61234570', 'bolivia@bayer.com'),
(10200, 'ESPECIALIDADES FARMACÉUTICAS', 'Calle Especializada #987, La Paz', '+591 72345671', 'especialidades@efarma.com.bo'),
(10300, 'SAE', 'Av. Comercial #852, Zona Franca, Cochabamba', '+591 63456782', 'comercial@sae.com.bo'),
(10400, 'ROEMMERS', 'Av. Farmacéutica Internacional #1234, Santa Cruz', '+591 75678914', 'bolivia@roemmers.com.ar');

 -- Insertar datos en la tabla Categoria
INSERT INTO Categoria (ID, Nombre) VALUES
(130, 'Analgésicos y Antipiréticos'),
(240, 'Antibióticos'),
(350, 'Antiinflamatorios'),
(460, 'Suplementos de Hierro'),
(570, 'Digestivos y Gastrointestinales'),
(790, 'Cuidado e Higiene Personal'),
(800, 'Antigripales y Respiratorios'),
(810, 'Corticosteroides'),
(820, 'Anticoagulantes'),
(830, 'Soluciones y Electrolitos'),
(840, 'Medicamentos Cardiovasculares'),
(850, 'Dermatológicos y Antimicóticos'),
(860, 'Antisépticos'),
(870, 'Vitaminas y Suplementos'),
(880, 'Anestésicos'),
(891, 'Salud Sexual y Anticonceptivos'),
(892, 'Salud Masculina'),
(893, 'Salud Femenina'),
(894, 'Antiparasitarios'),
(895, 'Tratamientos Hemorroidales');

INSERT INTO Marca (ID, Nombre) VALUES
(2500, 'Bagó'),
(3600, 'Terbol'),
(4700, 'Ifa'), 
(5800, 'Inti'),
(9700, 'Lafar'),
(9800, 'Indufar'),
(9900, 'Roemmers'),
(10000, 'Procaps'),
(10200, 'Solucion'),
(10800, 'Cofar'),
(10900, 'Vita'),
(11700, 'Bayer'),
(12000, 'Terbol'),
(12100, 'Flogiatrin'),
(12300, 'Maxmen'),
(12500, 'Hemorsan'),
(12700, 'Zmol'),
(13000, 'Banes'),
(13100, 'Azimut'),
(13400, 'Dioxadol'),
(13500, 'Migranol'),
(13600, 'Pen Di Ben'),
(13700, 'Hexacol'),
(14100, 'Antigripal Lch'),
(14200, 'Abrilar'),
(14300, 'Pan Vimin'),
(14500, 'Anara'),
(14600, 'Antiflu-Des'),
(14700, 'Diposan'),
(14800, 'Quetorol'),
(15000, 'Germiderm'),
(15200, 'Folta'),
(15600, 'Neo Bac'),
(15700, 'Neocor'),
(15800, 'Lactibon');

-- Insertar datos en la tabla Producto
INSERT INTO Producto (ID, Nombre, Descripcion, Forma_Farmaceutica, Concentracion, 
                     Via_Administracion, Oferta, Precio_Compra, Precio_Venta, Stock, 
                     Receta, MarcaID, CategoriaID) VALUES
(1015, 'AMOXIFAR DUO', 'Amoxicilina 1G', 'Suspensión', '60ml', 'Oral', FALSE, 30.00, 40.00, 0, TRUE, 6900, 240),
(2025, 'BAMMOX', 'Amoxicilina + Sulbactam', 'Suspensión', '1000/250mg', 'Oral', FALSE, 35.00, 45.00, 0, TRUE, 6900, 240),
(3035, 'DOLOTERM', 'Ibuprofeno', 'Suspensión', '200mg/100ml', 'Oral', FALSE, 20.00, 25.00, 0, FALSE, 6900, 350),
(4045, 'FERROFAR', 'Sulfato ferroso', 'Gotas', '125mg', 'Oral', FALSE, 15.00, 20.00, 0, FALSE, 6900, 460),
(5055, 'FLUCONAL', 'Fluconazol', 'Suspensión', '50mg/50ml', 'Oral', FALSE, 25.00, 35.00, 0, TRUE, 6900, 850),
(6065, 'CLOTRIMAZOL', 'Antimicótico', 'Crema', '1%', 'Tópica', FALSE, 20.00, 30.00, 0, FALSE, 7200, 850),
(7075, 'FLOGIATRIN B12', 'Piroxicam + Vitaminas', 'Inyectable', '20mg', 'Intramuscular', FALSE, 53.00, 65.00, 1, TRUE, 8700, 350),
(8085, 'ALCOHOL 70%', 'Antiséptico', 'Gel', '120ml', 'Tópica', FALSE, 4.00, 5.00, 3, FALSE, 7800, 860),
(9095, 'VASELINA', 'Protector dérmico', 'Pasta', '14g', 'Tópica', FALSE, 3.50, 5.00, 0, FALSE, 7300, 790),
(1010, 'DIGESTAN', 'Combinación digestiva', 'Comprimido', 'Compuesto', 'Oral', FALSE, 8.80, 11.00, 9, FALSE, 5800, 570),
(1115, 'REFRIANEX DIA', 'Antigripal', 'Sobres', 'Naranja-Miel', 'Oral', FALSE, 3.50, 6.00, 14, FALSE, 2500, 800),
(1215, 'BETAMETASONA', 'Corticosteroide + Antimicótico', 'Crema', '0.1%', 'Tópica', FALSE, 32.50, 39.00, 1, TRUE, 4700, 810),
(1325, 'HEMORSAN', 'Tratamiento hemorroides', 'Supositorio', 'Extractos naturales', 'Rectal', FALSE, 5.00, 6.00, 2, FALSE, 3600, 890),
(1430, 'RIFAMICINA', 'Antibiótico tópico', 'Spray', '10mg/50ml', 'Tópica', FALSE, 25.00, 30.00, 1, TRUE, 8700, 860),
(1535, 'OMNIVAL', 'Multivitamínico', 'Jarabe', '100ml', 'Oral', FALSE, 60.00, 66.00, 1, FALSE, 3600, 870),
(1640, 'SOLUCIÓN FISIOLÓGICA', 'Cloruro de sodio', 'Solución', '0.9%', 'Nasal', FALSE, 9.30, 12.00, 2, FALSE, 3600, 830),
(1745, 'PARACETAMOL', 'Analgésico/antipirético', 'Comprimido', '500mg', 'Oral', FALSE, 1.30, 2.00, 14, FALSE, 3600, 130),
(1850, 'IBUPROFENO', 'Antiinflamatorio', 'Comprimido', '400mg', 'Oral', FALSE, 2.00, 3.00, 10, FALSE, 3600, 350),
(1955, 'AMIKACINA', 'Antibiótico', 'Inyectable', '500mg/2ml', 'Intramuscular', FALSE, 22.00, 30.00, 9, TRUE, 3600, 240),
(2060, 'T36 PLUS', 'Disfunción eréctil + Eyaculación precoz', 'Comprimido', '20/60mg', 'Oral', FALSE, 2.20, 5.00, 3, TRUE, 3600, 890),
(2165, 'KETOCONAZOL', 'Antifúngico', 'Crema', '2%', 'Tópica', FALSE, 25.00, 36.85, 0, FALSE, 8700, 850),
(2270, 'DICLOFENACO', 'Antiinflamatorio', 'Gel', '20g', 'Tópica', FALSE, 30.00, 35.00, 0, FALSE, 8700, 350),
(2375, 'NEOCOR-ANTIACNE', 'Tratamiento acné', 'Crema', '20g', 'Tópica', FALSE, 64.00, 75.00, 0, FALSE, 5800, 850),
(2480, 'METRONIDAZOL', 'Antiparasitario', 'Óvulo', '500mg', 'Vaginal', FALSE, 6.23, 7.50, 11, TRUE, 5800, 890),
(2585, 'PREDNISONA', 'Corticosteroide', 'Comprimido', '20mg', 'Oral', FALSE, 1.50, 1.98, 0, TRUE, 8700, 810),
(2690, 'ENOXAPARINA', 'Anticoagulante', 'Inyectable', '40mg', 'Subcutánea', FALSE, 65.00, 85.20, 0, TRUE, 9000, 820),
(2795, 'CLENOX', 'Anticoagulante', 'Inyectable', '20mg/0.2ml', 'Subcutánea', FALSE, 50.00, 65.00, 0, TRUE, 9200, 820),
(2800, 'RINGER LACTATO', 'Solución electrolítica', 'Solución', '1000ml', 'Intravenosa', FALSE, 8.50, 10.75, 0, TRUE, 8900, 830),
(2905, 'GLUCOSA', 'Solución glucosada', 'Solución', '10%', 'Intravenosa', FALSE, 9.00, 11.25, 0, TRUE, 8700, 830),
(3010, 'VITAMINA E', 'Suplemento vitamínico', 'Cápsula', '1000 UI', 'Oral', FALSE, 6.06, 7.00, 0, FALSE, 5800, 870),
(3115, 'PROTEÍNA WHEY', 'Suplemento proteico', 'Polvo', '900g', 'Oral', FALSE, 25.00, 40.00, 0, FALSE, 2500, 570),
(3220, 'HEXACOL', 'Antiséptico genital', 'Crema', '20g', 'Tópica', FALSE, 30.00, 35.00, 1, FALSE, 3600, 860),
(3325, 'GRIFANTIL', 'Antitusivo', 'Jarabe', '60ml', 'Oral', FALSE, 30.00, 40.00, 1, FALSE, 3600, 800),
(3430, 'ZINC OXIDO', 'Protector dérmico', 'Ungüento', '50g', 'Tópica', FALSE, 50.00, 55.00, 1, FALSE, 3600, 790),
(3535, 'PRESERVATIVO', 'Profiláctico', 'Unidad', '38mm', 'Tópica', FALSE, 3.33, 5.00, 27, FALSE, 3600, 890),
(3640, 'JABÓN LÍQUIDO', 'Higiene infantil', 'Líquido', '350ml', 'Tópica', FALSE, 8.00, 10.00, 0, FALSE, 7300, 790),
(3745, 'CICATRICURE', 'Tratamiento cicatrices', 'Gel', '30g', 'Tópica', FALSE, 12.00, 17.38, 0, FALSE, 8700, 850),
(3850, 'LIDOCAÍNA', 'Anestésico local', 'Crema', '5%', 'Tópica', FALSE, 30.00, 35.00, 1, TRUE, 3600, 880),
(3955, 'DIPIRONA', 'Analgésico', 'Inyectable', '2ml', 'Intramuscular', FALSE, 2.50, 3.75, 0, TRUE, 8700, 130),
(4060, 'MELOXICAM', 'Antiinflamatorio', 'Comprimido', '15mg', 'Oral', FALSE, 6.06, 7.00, 10, FALSE, 5800, 350),
(4165, 'SILDENAFIL', 'Disfunción eréctil', 'Comprimido', '50mg', 'Oral', FALSE, 2.20, 5.00, 4, TRUE, 3600, 890),
(4270, 'DEXAMETASONA', 'Corticosteroide', 'Inyectable', '8mg', 'Intramuscular', FALSE, 1.20, 1.75, 0, TRUE, 8700, 810),
(4375, 'OMEPRAZOL', 'Protector gástrico', 'Cápsula', '20mg', 'Oral', FALSE, 2.00, 3.00, 0, FALSE, 3600, 570),
(4480, 'LORATADINA', 'Antihistamínico', 'Comprimido', '10mg', 'Oral', FALSE, 3.50, 4.00, 21, FALSE, 2500, 800),
(4585, 'METFORMINA', 'Antidiabético', 'Comprimido', '850mg', 'Oral', FALSE, 2.00, 3.00, 0, TRUE, 3600, 840),
(4690, 'ATENOLOL', 'Antihipertensivo', 'Comprimido', '50mg', 'Oral', FALSE, 1.50, 2.00, 0, TRUE, 3600, 840),
(4795, 'BACTICEL', 'Cotrimoxazol', 'Suspensión', '200/40mg', 'Oral', FALSE, 3.50, 6.00, 0, TRUE, 2500, 240),
(4800, 'BACTICEL FORTE', 'Cotrimoxazol', 'Suspensión', '400/80mg', 'Oral', FALSE, 4.20, 7.00, 0, TRUE, 2500, 240),
(4810, 'BRONCOTEROL', 'Ambroxol', 'Jarabe', '100ml', 'Oral', FALSE, 49.00, 60.00, 5, FALSE, 2500, 800),
(4820, 'SUPER TAHUICHI', 'Combinación herbal', 'Jarabe', '240ml', 'Oral', FALSE, 30.00, 40.00, 5, FALSE, 3600, 800),
(4830, 'MEMOVITAL B12', 'Complejo vitamínico', 'Jarabe', '120ml', 'Oral', FALSE, 20.00, 25.00, 0, FALSE, 3600, 870),
(4840, 'AZIMUT', 'Azitromicina', 'Suspensión', '200mg/5ml', 'Oral', FALSE, 22.00, 30.00, 0, TRUE, 3600, 240),
(4850, 'BANES', 'Ibuprofeno', 'Suspensión', '100mg/5ml', 'Oral', FALSE, 15.00, 20.00, 0, FALSE, 3600, 350),
(4860, 'ENTEL PLUS', 'Albendazol', 'Suspensión', '400mg', 'Oral', FALSE, 25.50, 30.00, 0, TRUE, 3600, 890),
(4870, 'FERROCAL', 'Suplemento de hierro', 'Jarabe', '120ml', 'Oral', FALSE, 30.00, 35.00, 0, FALSE, 3600, 460),
(4880, 'ZMOL', 'Paracetamol', 'Gotas', '15ml', 'Oral', FALSE, 20.00, 25.00, 1, FALSE, 3600, 130),
(4890, 'CLOFENAC', 'Diclofenaco', 'Comprimido', '50mg', 'Oral', FALSE, 4.20, 5.00, 7, FALSE, 2500, 350),
(4900, 'DIOXADOL', 'Terapidol', 'Comprimido', '500mg', 'Oral', FALSE, 2.00, 3.00, 12, FALSE, 2500, 130),
(4910, 'MIGRANOL', 'Ergotamina', 'Comprimido', 'Compuesto', 'Oral', FALSE, 5.26, 6.00, 4, TRUE, 2500, 840),
(4920, 'PEN DI BEN', 'Penicilina G', 'Inyectable', '2.4MU', 'Intramuscular', FALSE, 25.50, 30.00, 1, TRUE, 2500, 240),
(4930, 'HEXACOL', 'Antiséptico genital', 'Crema', '20g', 'Tópica', FALSE, 30.00, 35.00, 1, FALSE, 3600, 860),
(4940, 'PROCOPS', 'Sildenafil', 'Comprimido', '50mg', 'Oral', FALSE, 2.20, 5.00, 4, TRUE, 3600, 890),
(4950, 'BIENEX', 'Meloxicam', 'Cápsula', '15mg', 'Oral', FALSE, 6.06, 7.00, 10, FALSE, 5800, 350),
(4960, 'METROCAPS', 'Metronidazol', 'Óvulo', '500mg', 'Vaginal', FALSE, 6.23, 7.50, 11, TRUE, 5800, 890),
(4970, 'ANTIGRIPAL LCH', 'Combinación', 'Comprimido', 'Compuesto', 'Oral', FALSE, 8.80, 11.00, 2, FALSE, 5800, 800),
(4980, 'MAXMEN', 'Preservativo', 'Unidad', '38mm', 'Tópica', FALSE, 9.60, 12.00, 11, FALSE, 3600, 890),
(4990, 'ABRILAR', 'Antitusivo', 'Jarabe', '100ml', 'Oral', FALSE, 57.00, 65.00, 1, FALSE, 3600, 800),
(5000, 'PAN VIMIN', 'Multivitamínico', 'Jarabe', '240ml', 'Oral', FALSE, 70.00, 75.00, 1, FALSE, 3600, 870),
(5010, 'ACD-VIMIN', 'Vitamina A+C+D', 'Gotas', '20ml', 'Oral', FALSE, 65.00, 70.00, 1, FALSE, 3600, 870),
(5020, 'ANARA', 'Analgésico', 'Comprimido', '500mg', 'Oral', FALSE, 1.30, 2.00, 14, FALSE, 3600, 130),
(5030, 'ANTIFLU-DES', 'Amantadina', 'Cápsula', '100mg', 'Oral', FALSE, 2.70, 4.00, 8, TRUE, 3600, 800),
(5040, 'DIPOSAN', 'Dimetilpolisiloxano', 'Comprimido', '40mg', 'Oral', FALSE, 2.00, 2.50, 36, FALSE, 3600, 570),
(5050, 'QUETOROL', 'Ketorolaco', 'Comprimido', '20mg', 'Oral', FALSE, 2.80, 3.00, 29, TRUE, 3600, 350),
(5060, 'PLIDAN', 'Analgésico', 'Comprimido', '500mg', 'Oral', FALSE, 3.65, 5.00, 11, FALSE, 8700, 130),
(5070, 'FLOGIATRIN POM', 'Salicilato de metilo', 'Pomada', '30g', 'Tópica', FALSE, 65.00, 70.00, 1, FALSE, 8700, 850),
(5080, 'GERMIDERM', 'Betametasona + Gentamicina', 'Crema', '20g', 'Tópica', FALSE, 32.50, 39.00, 0, TRUE, 8700, 810),
(5090, 'NISTATINA COFAR', 'Antimicótico', 'Crema', '15g', 'Tópica', FALSE, 6.23, 7.50, 0, TRUE, 8700, 850),
(5100, 'VITABEL', 'Hidratante', 'Crema', '30g', 'Tópica', FALSE, 30.00, 40.00, 0, FALSE, 7300, 790),
(5110, 'KETOCONAZOL', 'Antifúngico', 'Crema', '2%', 'Tópica', FALSE, 25.00, 36.85, 0, TRUE, 8700, 850),
(5120, 'FOLTA GEL', 'Diclofenaco', 'Gel', '30g', 'Tópica', FALSE, 30.00, 35.00, 0, FALSE, 8700, 350),
(5130, 'DICOLATE-L', 'Diclofenaco + Mentol', 'Gel', '30g', 'Tópica', FALSE, 30.00, 35.00, 0, FALSE, 8700, 350),
(5140, 'CLOTRIPSA', 'Clotrimazol', 'Crema', '2%', 'Tópica', FALSE, 25.00, 30.00, 0, TRUE, 8700, 850),
(5150, 'DICLOP GEL', 'Diclofenaco', 'Gel', '1%', 'Tópica', FALSE, 30.00, 35.00, 0, FALSE, 8700, 350),
(5160, 'NEO BAC', 'Neomicina + Bacitracina', 'Pomada', '12g', 'Tópica', FALSE, 32.50, 39.00, 0, TRUE, 5800, 850),
(5170, 'NEOCOR-ANTIACNE', 'Tratamiento acné', 'Crema', '20g', 'Tópica', FALSE, 64.00, 75.00, 0, FALSE, 5800, 850),
(5180, 'RIFAMICINA', 'Antibiótico', 'Spray', '50ml', 'Tópica', FALSE, 25.00, 30.00, 1, TRUE, 8700, 860),
(5190, 'LACTIBON', 'Limpiador dérmico', 'Loción', '200ml', 'Tópica', FALSE, 20.00, 25.00, 0, FALSE, 8700, 790);

-- Insertar datos en la tabla Nota_compra
INSERT INTO Nota_compra (ID, Fecha, Hora, Monto_Total, UsuarioID, ProveedorID) VALUES
(1105, '2025-01-01', '10:00:00', 500.00, 1001, 1200),
(2210, '2025-01-02', '11:00:00', 300.00, 2002, 2300),
(3315, '2025-01-03', '12:00:00', 450.00, 1001, 3400),
(4420, '2025-01-04', '13:00:00', 600.00, 2002, 4500),
(5525, '2025-01-05', '14:00:00', 700.00, 1001, 5600),
(6630, '2025-01-06', '15:00:00', 800.00, 2002, 1200),
(7735, '2025-01-07', '16:00:00', 550.00, 1001, 2300),
(8840, '2025-01-08', '17:00:00', 900.00, 2002, 3400),
(9945, '2025-01-09', '18:00:00', 350.00, 1001, 4500),
(1050, '2025-01-10', '19:00:00', 400.00, 3003, 5600),
(10000, '2025-04-01', '09:00:00', 5000.00, 1001, 7800),
(10001, '2025-04-01', '10:00:00', 6000.00, 2002, 7900),
(10002, '2025-04-02', '11:00:00', 4500.00, 1001, 8000),
(10003, '2025-04-02', '12:00:00', 7000.00, 2002, 8100),
(10004, '2025-04-03', '13:00:00', 5500.00, 1001, 8200);

-- Insertar datos en la tabla Detalle_Nota_Compra
INSERT INTO Nota_compra (ID, Fecha, Hora, Monto_Total, UsuarioID, ProveedorID) VALUES
(1105, '2025-01-01', '10:00:00', 500.00, 1001, 2500),
(2210, '2025-01-02', '11:00:00', 300.00, 2002, 3600),
(3315, '2025-01-03', '12:00:00', 450.00, 1001, 4700),
(4420, '2025-01-04', '13:00:00', 600.00, 2002, 5800),
(5525, '2025-01-05', '14:00:00', 700.00, 1001, 9700),
(6630, '2025-01-06', '15:00:00', 800.00, 2002, 9800),
(7735, '2025-01-07', '16:00:00', 550.00, 1001, 9900),
(8840, '2025-01-08', '17:00:00', 900.00, 2002, 10000),
(9945, '2025-01-09', '18:00:00', 350.00, 1001, 10200),
(1050, '2025-01-10', '19:00:00', 400.00, 3003, 10800),
(10000, '2025-04-01', '09:00:00', 5000.00, 1001, 10900),
(10001, '2025-04-01', '10:00:00', 6000.00, 2002, 11700),
(10002, '2025-04-02', '11:00:00', 4500.00, 1001, 12000),
(10003, '2025-04-02', '12:00:00', 7000.00, 2002, 12100),
(10004, '2025-04-03', '13:00:00', 5500.00, 1001, 12300),
(10005, '2025-04-03', '14:00:00', 3500.00, 2002, 12500),
(10006, '2025-04-04', '15:00:00', 4200.00, 1001, 12700),
(10007, '2025-04-04', '16:00:00', 6500.00, 3003, 13000),
(10008, '2025-04-05', '09:30:00', 8000.00, 2002, 13100),
(10009, '2025-04-05', '10:45:00', 7500.00, 1001, 13400),
(10010, '2025-04-06', '11:15:00', 9000.00, 2002, 13500),
(10011, '2025-04-06', '13:20:00', 4800.00, 1001, 13600),
(10012, '2025-04-07', '14:30:00', 5300.00, 3003, 13700),
(10013, '2025-04-07', '15:45:00', 6200.00, 2002, 14100),
(10014, '2025-04-08', '16:00:00', 7100.00, 1001, 14200),
(10015, '2025-04-08', '09:15:00', 8400.00, 2002, 14300),
(10016, '2025-04-09', '10:30:00', 5900.00, 1001, 14500),
(10017, '2025-04-09', '11:45:00', 6700.00, 3003, 14600),
(10018, '2025-04-10', '13:00:00', 7800.00, 2002, 14700),
(10019, '2025-04-10', '14:15:00', 8900.00, 1001, 14800);

-- Insertar datos en la tabla Cliente
INSERT INTO Cliente (ID, Nombre, Telefono, Email) VALUES
(1150, 'Ana López', '73501111', 'ana.lopez@gmail.com'),
(2250, 'Pedro Gómez', '71212222', 'pedro.gomez@gmail.com'),
(3350, 'Lucía Martínez', '63523333', 'lucia.martinez@gmail.com'),
(4450, 'Carlos Ruiz', '74434444', 'carlos.ruiz@gmail.com'),
(5550, 'María Torres', '67845555', 'maria.torres@gmail.com'),
(6650, 'José Pérez', '72256666', 'jose.perez@gmail.com'),
(7750, 'Sofía Díaz', '73567777', 'sofia.diaz@gmail.com'),
(8850, 'Luis Sánchez', '61278888', 'luis.sanchez@gmail.com'),
(9950, 'Clara Morales', '74489999', 'clara.morales@gmail.com'),
(1055, 'Diego Castro', '67891010', 'diego.castro@gmail.com'),
(1160, 'Elena Vargas', '72201111', 'elena.vargas@gmail.com'),
(1265, 'Miguel Ramírez', '63511212', 'miguel.ramirez@gmail.com'),
(1370, 'Laura Herrera', '74421313', 'laura.herrera@gmail.com'),
(1475, 'Andrés Flores', '67831414', 'andres.flores@gmail.com'),
(1580, 'Julia Rojas', '71241515', 'julia.rojas@gmail.com');

-- Insertar datos en la tabla Factura (UsuarioID ajustado a 1001, 2002, 3003)
INSERT INTO Factura (ID, Fecha, Hora, Monto_Total, Descuento, UsuarioID, ClienteID) VALUES
(5001, '2025-01-01', '09:15:00', 150.00, 0.00, 1001, 3001),
(5002, '2025-01-01', '10:30:00', 485.50, 2.00, 2002, 3002),
(5003, '2025-01-01', '11:45:00', 220.00, 0.00, 1001, 3003),
(5004, '2025-01-01', '14:20:00', 45.00, 0.00, 2002, 3004),
(5005, '2025-01-02', '09:00:00', 180.00, 0.00, 1001, 3005),
(5006, '2025-01-02', '10:15:00', 95.00, 0.00, 2002, 3006),
(5007, '2025-01-02', '11:30:00', 620.00, 1.00, 1001, 3007),
(5008, '2025-01-02', '15:45:00', 75.50, 0.00, 2002, 3008),
(5009, '2025-01-03', '09:30:00', 450.00, 0.00, 1001, 3009),
(5010, '2025-01-03', '10:45:00', 65.00, 0.00, 2002, 3010),
(5011, '2025-01-03', '12:00:00', 185.00, 0.00, 1001, 3011),
(5012, '2025-01-03', '16:15:00', 95.50, 0.00, 2002, 3012),
(5013, '2025-01-04', '09:45:00', 275.00, 0.00, 1001, 3013),
(5014, '2025-01-04', '11:00:00', 125.00, 0.00, 2002, 3014),
(5015, '2025-01-04', '12:15:00', 420.00, 0.00, 1001, 3015),
(5016, '2025-01-04', '16:30:00', 155.50, 0.00, 2002, 3016),
(5017, '2025-01-05', '10:00:00', 580.00, 0.00, 1001, 3017),
(5018, '2025-01-05', '11:15:00', 195.00, 0.00, 2002, 3018),
(5019, '2025-01-05', '12:30:00', 245.00, 0.00, 1001, 3019),
(5020, '2025-01-05', '16:45:00', 175.50, 0.00, 2002, 3020),
(5021, '2025-01-06', '09:15:00', 650.00, 0.00, 1001, 3021),
(5022, '2025-01-06', '10:30:00', 225.00, 0.00, 2002, 3022),
(5023, '2025-01-06', '11:45:00', 285.00, 0.00, 1001, 3023),
(5024, '2025-01-06', '17:00:00', 195.50, 0.00, 2002, 3024),
(5025, '2025-01-07', '09:30:00', 720.00, 0.00, 1001, 3025),
(5026, '2025-01-07', '10:45:00', 255.00, 0.00, 2002, 3026),
(5027, '2025-01-07', '12:00:00', 325.00, 0.00, 1001, 3027),
(5028, '2025-01-07', '17:15:00', 215.50, 0.00, 2002, 3028),
(5029, '2025-01-08', '09:45:00', 790.00, 0.00, 1001, 3029),
(5030, '2025-01-08', '11:00:00', 285.00, 0.00, 2002, 3030);

-- Insertar datos en la tabla Detalle_Nota_Venta
INSERT INTO Detalle_Nota_Venta (FacturaID, ProductoID, Cantidad, Precio, Total) VALUES
(5001, 1745, 3, 30.00, 90.00),
(5001, 4890, 2, 30.00, 60.00),
(5002, 4375, 2, 150.00, 300.00),
(5002, 4480, 1, 185.50, 185.50),
(5003, 4970, 1, 120.00, 120.00),
(5003, 4900, 2, 50.00, 100.00),
(5004, 1745, 3, 15.00, 45.00),
(5005, 4990, 2, 90.00, 180.00),
(5006, 5110, 1, 95.00, 95.00),
(5007, 1015, 2, 310.00, 620.00),
(5008, 1745, 3, 25.17, 75.50),
(5009, 5000, 2, 225.00, 450.00),
(5010, 8085, 1, 65.00, 65.00),
(5011, 4970, 1, 85.00, 85.00),
(5011, 4900, 2, 50.00, 100.00),
(5012, 5080, 1, 95.50, 95.50),
(5013, 4840, 1, 275.00, 275.00),
(5014, 1745, 5, 25.00, 125.00),
(5015, 4990, 2, 210.00, 420.00),
(5016, 5110, 1, 155.50, 155.50),
(5017, 1015, 2, 290.00, 580.00),
(5018, 4375, 3, 65.00, 195.00),
(5019, 4970, 1, 245.00, 245.00),
(5020, 5080, 1, 175.50, 175.50),
(5021, 4990, 2, 325.00, 650.00),
(5022, 1745, 3, 75.00, 225.00),
(5023, 4900, 3, 95.00, 285.00),
(5024, 5110, 1, 195.50, 195.50),
(5025, 1015, 2, 360.00, 720.00),
(5026, 4375, 3, 85.00, 255.00),
(5027, 4970, 1, 325.00, 325.00),
(5028, 5080, 1, 215.50, 215.50),
(5029, 4990, 2, 395.00, 790.00),
(5030, 1745, 3, 95.00, 285.00);

-- Insertar datos en la tabla Nota_de_Salida
INSERT INTO Nota_de_Salida (ID, Fecha, Hora) VALUES
(7001, '2025-01-01', '08:30:00'),
(7002, '2025-01-01', '10:00:00'),
(7003, '2025-01-01', '11:15:00'),
(7004, '2025-01-02', '08:45:00'),
(7005, '2025-01-02', '10:00:00'),
(7006, '2025-01-03', '09:00:00'),
(7007, '2025-01-03', '11:30:00'),
(7008, '2025-01-04', '09:15:00'),
(7009, '2025-01-04', '11:45:00'),
(7010, '2025-01-05', '09:30:00'),
(7011, '2025-01-06', '08:45:00'),
(7012, '2025-01-06', '11:15:00'),
(7013, '2025-01-07', '09:00:00'),
(7014, '2025-01-07', '11:30:00'),
(7015, '2025-01-08', '09:15:00');

INSERT INTO Detalle_Nota_Salida (NotaSalidaID, ProductoID, Cantidad) VALUES
(7001, 1745, 3),
(7001, 4890, 2),
(7002, 4375, 2),
(7002, 4480, 1),
(7003, 4970, 1),
(7003, 4900, 2),
(7004, 4990, 2),
(7005, 5110, 1),
(7006, 5000, 2),
(7007, 4970, 1),
(7007, 4900, 2),
(7008, 4840, 1),
(7009, 4990, 2),
(7010, 1015, 2),
(7011, 4990, 2),
(7012, 4900, 3),
(7013, 1015, 2),
(7014, 4970, 1),
(7015, 4990, 2);

-- Insertar datos en la tabla Bitacora (UsuarioID ajustado a 1001, 2002, 3003)
INSERT INTO Bitacora (ID, Fecha, Hora, Accion, UsuarioID) VALUES
(1405, '2025-01-01', '10:00:00', 'Ingreso de nuevo producto: Paracetamol', 1001),
(2510, '2025-01-02', '11:00:00', 'Venta realizada a Carlos García', 2002),
(3615, '2025-01-03', '12:00:00', 'Compra de productos a Proveedores S.A.', 1001),
(4720, '2025-01-04', '13:00:00', 'Eliminación de producto: Ibuprofeno', 1001),
(5825, '2025-01-05', '14:00:00', 'Modificación de precio de Amoxicilina', 2002),
(6930, '2025-01-06', '15:00:00', 'Consulta de stock de productos', 1001),
(7035, '2025-01-07', '16:00:00', 'Generación de reporte de ventas', 2002),
(8140, '2025-01-08', '17:00:00', 'Ingreso de nuevo cliente: Ana Martínez', 1001),
(9245, '2025-01-09', '18:00:00', 'Venta realizada a Ana Martínez', 2002),
(1035, '2025-01-10', '19:00:00', 'Consulta de proveedores', 1001);

