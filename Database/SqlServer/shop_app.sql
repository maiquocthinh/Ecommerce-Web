USE shop_app;

CREATE TABLE [addresses]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [specific_address] NVARCHAR(255) NOT NULL,
  [province] NVARCHAR(100) NOT NULL,
  [districts] NVARCHAR(100) NOT NULL,
  [wards] NVARCHAR(100) NOT NULL,
  [updated_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
);

CREATE TABLE [roles]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [name] NVARCHAR(255) NOT NULL,
  [permissions] VARCHAR(500) DEFAULT '[]',
  [updated_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
);

CREATE TABLE [categories]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [name] NVARCHAR(255) NOT NULL,
  [description] NVARCHAR(255) NOT NULL,
  [updated_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE [brands]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [name] NVARCHAR(255) NOT NULL,
  [description] NVARCHAR(255) NOT NULL,
  [updated_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE [needs]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [title] NVARCHAR(255) NOT NULL,
  [description] NVARCHAR(255),
  [updated_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE [products]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [name] NVARCHAR(255) NOT NULL,
  [detail] NVARCHAR(1000) NOT NULL,
  [images] VARCHAR(500) DEFAULT '[]',
  [warranty] NVARCHAR(255) NOT NULL,
  [discount_percent] DECIMAL(3,2) NOT NULL CHECK ([discount_percent] >= 0.00 AND [discount_percent] <= 1.00),
  [discount_active] BIT DEFAULT 0,
  [reviews_score] DECIMAL(3,2) NOT NULL CHECK ([reviews_score] >= 0.00 AND [reviews_score] <= 5.00),
  [category_id] BIGINT NOT NULL,
  [need_id] BIGINT NOT NULL,
  [brand_id] BIGINT NOT NULL,
  [updated_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  CONSTRAINT FK_Product_Category FOREIGN KEY ([category_id]) REFERENCES [categories] ([id]),
  CONSTRAINT FK_Product_Need FOREIGN KEY ([need_id]) REFERENCES [needs] ([id]),
  CONSTRAINT FK_Product_Brand FOREIGN KEY ([brand_id]) REFERENCES [brands] ([id]),
);

CREATE TABLE [product_versions]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [product_id] BIGINT NOT NULL,
  [name] NVARCHAR(255) NOT NULL,
  [description] NVARCHAR(500) NOT NULL,
  [color] NVARCHAR(100) NOT NULL,
  [specifications] NVARCHAR(1000) NOT NULL,
  [price] BIGINT NOT NULL CHECK([price] >= 0),
  [inventory] INT NOT NULL CHECK([inventory] >= 0),
  [updated_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  CONSTRAINT FK_ProductVersion_Product FOREIGN KEY ([product_id]) REFERENCES [products] ([id]),
);

CREATE TABLE [customers]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [first_name] NVARCHAR(255) NOT NULL,
  [last_name] NVARCHAR(255) NOT NULL,
  [gender] BIT DEFAULT 1,
  [birthday] DATE NOT NULL,
  [email] VARCHAR(255) NOT NULL,
  [phone_number] VARCHAR(20) NOT NULL,
  [hashed_password] VARCHAR(255) NOT NULL,
  [avatar] VARCHAR(255) DEFAULT 'https://i.imgur.com/Th0n214.jpg',
  [address_id] BIGINT NOT NULL,
  [updated_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  CONSTRAINT FK_Customer_Address FOREIGN KEY ([address_id]) REFERENCES [addresses] ([id]),
);

CREATE TABLE [employees]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [first_name] NVARCHAR(255) NOT NULL,
  [last_name] NVARCHAR(255) NOT NULL,
  [gender] BIT DEFAULT 1,
  [birthday] DATE NOT NULL,
  [citizen_id] VARCHAR(255) NOT NULL,
  [email] VARCHAR(255) NOT NULL,
  [phone_number] VARCHAR(20) NOT NULL,
  [hashed_password] VARCHAR(255) NOT NULL,
  [avatar] VARCHAR(255) DEFAULT 'https://i.imgur.com/Th0n214.jpg',
  [address_id] BIGINT NOT NULL,
  [role_id] BIGINT NOT NULL,
  [updated_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  CONSTRAINT FK_Employee_Address FOREIGN KEY ([address_id]) REFERENCES [addresses] ([id]),
  CONSTRAINT FK_Employee_Role FOREIGN KEY ([role_id]) REFERENCES [roles] ([id]),
);

CREATE TABLE [suppliers]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [name] NVARCHAR(100) NOT NULL,
  [email] VARCHAR(255) NOT NULL,
  [phone_number] VARCHAR(20) NOT NULL,
  [address_id] BIGINT NOT NULL,
  [updated_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  CONSTRAINT FK_Supplier_Address FOREIGN KEY ([address_id]) REFERENCES [addresses] ([id]),
);

CREATE TABLE [cart_item]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [quantity] INT NOT NULL CHECK([quantity] > 0),
  [customer_id] BIGINT NOT NULL,
  [products_versions_id] BIGINT NOT NULL,
  [updated_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  CONSTRAINT FK_CartItem_Customer FOREIGN KEY ([customer_id]) REFERENCES [customers] ([id]),
  CONSTRAINT FK_CartItem_ProductVersion FOREIGN KEY ([products_versions_id]) REFERENCES [product_versions] ([id]),
);

CREATE TABLE [orders]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [status] VARCHAR(255) NOT NULL CHECK ([status] IN ('processing', 'shipped', 'delivering', 'cancelled')) DEFAULT 'processing',
  [employee_id] BIGINT NOT NULL,
  [customer_id] BIGINT NOT NULL,
  [customer_fullname] NVARCHAR(255) NOT NULL,
  [phone_number] VARCHAR(20) NOT NULL,
  [address] NVARCHAR(255) NOT NULL,
  [total_price] INT NOT NULL CHECK([total_price] >= 0),
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  CONSTRAINT FK_Order_Employee FOREIGN KEY ([employee_id]) REFERENCES [employees] ([id]),
  CONSTRAINT FK_Order_Customer FOREIGN KEY ([customer_id]) REFERENCES [customers] ([id]),
);

CREATE TABLE [order_items]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [order_id] BIGINT NOT NULL,
  [product_version_id] BIGINT NOT NULL,
  [price] INT NOT NULL CHECK([price] >= 0),
  [quantity] INT NOT NULL CHECK([quantity] > 0),
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  CONSTRAINT FK_OrderItem_Order FOREIGN KEY ([order_id]) REFERENCES [orders] ([id]),
  CONSTRAINT FK_OrderItem_ProductVersion FOREIGN KEY ([product_version_id]) REFERENCES [product_versions] ([id]),
);

CREATE TABLE [imports]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [employee_id] BIGINT NOT NULL,
  [supplier_id] BIGINT NOT NULL,
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  CONSTRAINT FK_Import_Employee FOREIGN KEY ([employee_id]) REFERENCES [employees] ([id]),
  CONSTRAINT FK_Import_Supplier FOREIGN KEY ([supplier_id]) REFERENCES [suppliers] ([id]),
);

CREATE TABLE [import_batches]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [import_id] BIGINT NOT NULL,
  [product_version_id] BIGINT NOT NULL,
  [quantity] INT NOT NULL CHECK([quantity] > 0),
  [remaining] INT NOT NULL CHECK([remaining] > 0),
  [cost] INT NOT NULL CHECK([cost] > 0),
  CONSTRAINT FK_ImportBatch_Import FOREIGN KEY ([import_id]) REFERENCES [imports] ([id]),
  CONSTRAINT FK_ImportBatch_ProductVersion FOREIGN KEY ([product_version_id]) REFERENCES [product_versions] ([id]),
);

CREATE TABLE [reviews]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [content] NVARCHAR(500) NOT NULL,
  [product_id] BIGINT NOT NULL,
  [product_version_id] BIGINT NOT NULL,
  [customer_id] BIGINT NOT NULL,
  [score] DECIMAL(3,2) NOT NULL,
  [updated_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  CONSTRAINT FK_Review_Product FOREIGN KEY ([product_id]) REFERENCES [products] ([id]),
  CONSTRAINT FK_Review_ProductVersion FOREIGN KEY ([product_version_id]) REFERENCES [product_versions] ([id]),
  CONSTRAINT FK_Review_Customer FOREIGN KEY ([customer_id]) REFERENCES [customers] ([id]),
);

CREATE TABLE [reviews_reply]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [reviews_id] BIGINT NOT NULL,
  [content] NVARCHAR(500) NOT NULL,
  [employee_id] BIGINT NOT NULL,
  [updated_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [created_at] DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  CONSTRAINT FK_ReviewReply_Review FOREIGN KEY ([reviews_id]) REFERENCES [reviews] ([id]),
  CONSTRAINT FK_ReviewReply_Employee FOREIGN KEY ([employee_id]) REFERENCES [employees] ([id]),
);

CREATE TABLE [customer_shipping_contact]
(
  [id] BIGINT PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [customer_id] BIGINT NOT NULL,
  [fullname] NVARCHAR(255) NOT NULL,
  [address_id] BIGINT NOT NULL,
  [phone_number] VARCHAR(20) NOT NULL,
  CONSTRAINT FK_CustomerShippingContact_Customer FOREIGN KEY ([customer_id]) REFERENCES [customers] ([id]),
  CONSTRAINT FK_CustomerShippingContact_Address FOREIGN KEY ([address_id]) REFERENCES [addresses] ([id]),
);
