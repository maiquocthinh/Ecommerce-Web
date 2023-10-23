USE newdb;

CREATE TABLE [addresses]
(
    [id]               INT CONSTRAINT PK_Addresses PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [specific_address] NVARCHAR(255)   NOT NULL,
    [province]         NVARCHAR(100)   NOT NULL,
    [districts]        NVARCHAR(100)   NOT NULL,
    [wards]            NVARCHAR(100)   NOT NULL,
    [updated_at]       DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    [created_at]       DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
);

CREATE TABLE [roles]
(
    [id]          INT CONSTRAINT PK_Roles PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [name]        NVARCHAR(255)   NOT NULL,
    [permissions] VARCHAR(500)             DEFAULT '[]',
    [updated_at]  DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    [created_at]  DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
);

CREATE TABLE [categories]
(
    [id]          INT CONSTRAINT PK_Categories PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [name]        NVARCHAR(255)   NOT NULL,
    [description] NVARCHAR(255)   NOT NULL,
    [updated_at]  DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    [created_at]  DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE [brands]
(
    [id]          INT CONSTRAINT PK_Brands PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [name]        NVARCHAR(255)   NOT NULL,
    [description] NVARCHAR(255)   NOT NULL,
    [updated_at]  DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    [created_at]  DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE [needs]
(
    [id]          INT CONSTRAINT PK_Needs PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [title]       NVARCHAR(255)   NOT NULL,
    [description] NVARCHAR(255),
    [updated_at]  DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    [created_at]  DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE [products]
(
    [id]            INT CONSTRAINT PK_Products PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [name]          NVARCHAR(255)   NOT NULL,
    [description]   NVARCHAR(1000)  NOT NULL,
    [warranty]      NVARCHAR(255)   NOT NULL,
    [reviews_score] DECIMAL(3, 2)   NOT NULL CHECK ([reviews_score] >= 0.00 AND [reviews_score] <= 5.00),
    [viewable]      BIT             NOT NULL DEFAULT 0,
    [category_id]   INT             NOT NULL,
    [need_id]       INT,
    [brand_id]      INT             NOT NULL,
    [updated_at]    DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    [created_at]    DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT FK_Product_Category FOREIGN KEY ([category_id]) REFERENCES [categories] ([id]),
    CONSTRAINT FK_Product_Need FOREIGN KEY ([need_id]) REFERENCES [needs] ([id]),
    CONSTRAINT FK_Product_Brand FOREIGN KEY ([brand_id]) REFERENCES [brands] ([id]),
);

CREATE TABLE [product_versions]
(
    [id]             INT CONSTRAINT PK_ProductVersions PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [product_id]     INT             NOT NULL,
    [name]           NVARCHAR(255)   NOT NULL,
    [image_url]      VARCHAR(500)    NOT NULL,
    [color]          NVARCHAR(100)   NOT NULL,
    [specifications] NVARCHAR(1000)  NOT NULL,
    [price]          INT             NOT NULL CHECK ([price] >= 0),
    [inventory]      INT             NOT NULL CHECK ([inventory] >= 0),
    [updated_at]     DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    [created_at]     DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT FK_ProductVersion_Product FOREIGN KEY ([product_id]) REFERENCES [products] ([id]),
);

CREATE TABLE [discounts]
(
    [id]               INT CONSTRAINT PK_Discounts PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [product_id]       INT             NOT NULL,
    [discount_percent] DECIMAL(3, 2) DEFAULT 0.00 CHECK ([discount_percent] >= 0.00 AND [discount_percent] <= 1.00),
    [start_date]       DATETIME        NOT NULL,
    [end_date]         DATETIME        NOT NULL,
    [quantity]         INT             NOT NULL CHECK ([quantity] >= 0),
    [active]           BIT           DEFAULT 0,
    CONSTRAINT FK_Discount_Product FOREIGN KEY ([product_id]) REFERENCES [products] ([id])
);

CREATE TABLE [customers]
(
    [id]              INT CONSTRAINT PK_Customers PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [first_name]      NVARCHAR(255)   NOT NULL,
    [last_name]       NVARCHAR(255)   NOT NULL,
    [gender]          BIT,
    [day_of_birth]    SMALLDATETIME,
    [email]           VARCHAR(255)    NOT NULL,
    [phone_number]    VARCHAR(20)     NOT NULL,
    [hashed_password] VARCHAR(255)    NOT NULL,
    [avatar_url]      VARCHAR(255)             DEFAULT 'https://i.imgur.com/Th0n214.jpg',
    [updated_at]      DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    [created_at]      DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
);

CREATE TABLE [employees]
(
    [id]              INT CONSTRAINT PK_Employees PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [first_name]      NVARCHAR(255)   NOT NULL,
    [last_name]       NVARCHAR(255)   NOT NULL,
    [gender]          BIT             NOT NULL,
    [day_of_birth]    SMALLDATETIME   NOT NULL,
    [email]           VARCHAR(255)    NOT NULL,
    [phone_number]    VARCHAR(20)     NOT NULL,
    [hashed_password] VARCHAR(255)    NOT NULL,
    [avatar_url]      VARCHAR(255)             DEFAULT 'https://i.imgur.com/Th0n214.jpg',
    [active]          BIT             NOT NULL DEFAULT 0,
    [address_id]      INT             NOT NULL,
    [role_id]         INT             NOT NULL,
    [updated_at]      DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    [created_at]      DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT FK_Employee_Address FOREIGN KEY ([address_id]) REFERENCES [addresses] ([id]),
    CONSTRAINT FK_Employee_Role FOREIGN KEY ([role_id]) REFERENCES [roles] ([id]),
);

CREATE TABLE [suppliers]
(
    [id]           INT CONSTRAINT PK_Suppliers PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [name]         NVARCHAR(100)   NOT NULL,
    [email]        VARCHAR(255)    NOT NULL,
    [phone_number] VARCHAR(20)     NOT NULL,
    [address_id]   INT             NOT NULL,
    [updated_at]   DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    [created_at]   DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT FK_Supplier_Address FOREIGN KEY ([address_id]) REFERENCES [addresses] ([id]),
);

CREATE TABLE [carts]
(
    [id]                   INT CONSTRAINT PK_Carts PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [quantity]             INT             NOT NULL CHECK ([quantity] > 0),
    [customer_id]          INT             NOT NULL,
    [products_versions_id] INT             NOT NULL,
    [updated_at]           DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    [created_at]           DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT FK_CartItem_Customer FOREIGN KEY ([customer_id]) REFERENCES [customers] ([id]),
    CONSTRAINT FK_CartItem_ProductVersion FOREIGN KEY ([products_versions_id]) REFERENCES [product_versions] ([id]),
);

CREATE TABLE [imports]
(
    [id]          INT CONSTRAINT PK_Imports PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [employee_id] INT             NOT NULL,
    [supplier_id] INT             NOT NULL,
    [created_at]  DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT FK_Import_Employee FOREIGN KEY ([employee_id]) REFERENCES [employees] ([id]),
    CONSTRAINT FK_Import_Supplier FOREIGN KEY ([supplier_id]) REFERENCES [suppliers] ([id]),
);

CREATE TABLE import_shipments
(
    [id]                 INT CONSTRAINT PK_ImportShipments PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [import_id]          INT             NOT NULL,
    [product_version_id] INT             NOT NULL,
    [quantity]           INT             NOT NULL CHECK ([quantity] > 0),
    [remaining]          INT             NOT NULL CHECK ([remaining] >= 0),
    [cost]               INT             NOT NULL CHECK ([cost] > 0),
    CONSTRAINT FK_ImportShipment_Import FOREIGN KEY ([import_id]) REFERENCES [imports] ([id]),
    CONSTRAINT FK_ImportShipment_ProductVersion FOREIGN KEY ([product_version_id]) REFERENCES [product_versions] ([id]),
);

CREATE TABLE [orders]
(
    [id]                INT CONSTRAINT PK_Orders PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [status]            VARCHAR(255)    NOT NULL CHECK ([status] IN ('processing', 'shipped', 'delivering', 'cancelled')) DEFAULT 'processing',
    [employee_id]       INT             NOT NULL,
    [customer_id]       INT,
    [recipient_name] NVARCHAR(255)   NOT NULL,
    [phone_number]      VARCHAR(20)     NOT NULL,
    [address]           NVARCHAR(255)   NOT NULL,
    [total_price]       INT             NOT NULL CHECK ([total_price] >= 0),
    [created_at]        DATETIME        NOT NULL                                                                          DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT FK_Order_Employee FOREIGN KEY ([employee_id]) REFERENCES [employees] ([id]),
    CONSTRAINT FK_Order_Customer FOREIGN KEY ([customer_id]) REFERENCES [customers] ([id]),
);

CREATE TABLE [order_details]
(
    [id]                 INT CONSTRAINT PK_OrderDetails PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [order_id]           INT             NOT NULL,
    [product_version_id] INT             NOT NULL,
    [import_shipment_id] INT             NOT NULL,
    [price]              INT             NOT NULL CHECK ([price] >= 0),
    [quantity]           INT             NOT NULL CHECK ([quantity] > 0),
    [created_at]         DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT FK_OrderDetail_Order FOREIGN KEY ([order_id]) REFERENCES [orders] ([id]),
    CONSTRAINT FK_OrderDetail_ProductVersion FOREIGN KEY ([product_version_id]) REFERENCES [product_versions] ([id]),
    CONSTRAINT FK_OrderDetail_ImportShipment FOREIGN KEY ([import_shipment_id]) REFERENCES import_shipments ([id]),
);

CREATE TABLE [reviews]
(
    [id]                 INT CONSTRAINT PK_Reviews PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [content]            NVARCHAR(500)   NOT NULL,
    [product_id]         INT             NOT NULL,
    [product_version_id] INT             NOT NULL,
    [customer_id]        INT             NOT NULL,
    [score]              DECIMAL(3, 2)   NOT NULL,
    [updated_at]         DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    [created_at]         DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT FK_Review_Product FOREIGN KEY ([product_id]) REFERENCES [products] ([id]),
    CONSTRAINT FK_Review_ProductVersion FOREIGN KEY ([product_version_id]) REFERENCES [product_versions] ([id]),
    CONSTRAINT FK_Review_Customer FOREIGN KEY ([customer_id]) REFERENCES [customers] ([id]),
);

CREATE TABLE [reviews_reply]
(
    [id]          INT CONSTRAINT PK_ReviewsReply PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [reviews_id]  INT             NOT NULL,
    [content]     NVARCHAR(500)   NOT NULL,
    [employee_id] INT             NOT NULL,
    [updated_at]  DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    [created_at]  DATETIME        NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT FK_ReviewReply_Review FOREIGN KEY ([reviews_id]) REFERENCES [reviews] ([id]),
    CONSTRAINT FK_ReviewReply_Employee FOREIGN KEY ([employee_id]) REFERENCES [employees] ([id]),
);

CREATE TABLE [shipping_addresses]
(
    [id]             INT CONSTRAINT PK_ShippingAddresses PRIMARY KEY NOT NULL IDENTITY (1, 1),
    [customer_id]    INT             NOT NULL,
    [address_id]     INT             NOT NULL,
    [recipient_name] NVARCHAR(255)   NOT NULL,
    [phone_number]   VARCHAR(20)     NOT NULL,
    [is_default]     BIT DEFAULT 0,
    CONSTRAINT FK_ShippingAddress_Customer FOREIGN KEY ([customer_id]) REFERENCES [customers] ([id]),
    CONSTRAINT FK_ShippingAddress_Address FOREIGN KEY ([address_id]) REFERENCES [addresses] ([id]),
);

-- Out of system db design -- 

CREATE TABLE refresh_tokens
(
    [id]          UNIQUEIDENTIFIER CONSTRAINT PK_RefreshTokens PRIMARY KEY DEFAULT NEWID(),
    [employee_id] INT      NOT NULL,
    [token]       NVARCHAR(300),
    [expires_at]  DATETIME NOT NULL,
    [revoked]     BIT      NOT NULL            DEFAULT 0,
    CONSTRAINT FK_RefreshToken_Employee FOREIGN KEY ([employee_id]) REFERENCES [employees] ([id])
);

-- Triggers -- 

-- Đây là ràng buộc khi INSERT hoặc UPDATE 1 row thì nếu đặt nó là địa chỉ giao hàng mặc định 
-- thì các địa chỉ giao hàng khác sẽ không được đặt là mặc định
CREATE TRIGGER trg_ShippingAddressDefault
    ON shipping_addresses
    INSTEAD OF INSERT, UPDATE
    AS
BEGIN
    -- Nếu trong insert hoặc update có is_default = 1 thì đặt tất cả các row khác is_default = 0
    IF EXISTS (SELECT 1 FROM INSERTED WHERE is_default = 1)
        BEGIN
            DISABLE TRIGGER trg_RequireOneShippingAddressDefault ON shipping_addresses;

            UPDATE [shipping_addresses]
            SET [is_default] = 0
            WHERE [customer_id] IN (SELECT [customer_id] FROM INSERTED WHERE is_default = 1);

            ENABLE TRIGGER trg_RequireOneShippingAddressDefault ON shipping_addresses;
        END

    -- Thực hiện UPDATE
    IF EXISTS (SELECT 1 FROM INSERTED WHERE [id] != 0)
        UPDATE sa
        SET sa.customer_id    = i.customer_id,
            sa.address_id     = i.address_id,
            sa.recipient_name = i.recipient_name,
            sa.phone_number   = i.phone_number,
            sa.is_default     = i.is_default
        FROM shipping_addresses sa
                 INNER JOIN INSERTED i ON sa.id = i.id
        WHERE sa.id != 0;

    -- Thực hiện INSERT
    IF EXISTS (SELECT 1 FROM INSERTED WHERE [id] = 0)
        BEGIN
            INSERT INTO shipping_addresses (customer_id, address_id, recipient_name, phone_number, is_default)
            SELECT customer_id, address_id, recipient_name, phone_number, is_default
            FROM INSERTED
            WHERE id = 0;
            -- Có thể bỏ câu lệnh phía dưới vì tui thêm nó để tránh lỗi trong entity framework :v
            SELECT [id] FROM [shipping_addresses] WHERE @@ROWCOUNT > 0 AND [id] = scope_identity();
        END;
END;

-- Đây ràng buộc nếu địa chỉ giao hàng đang là mặc định thì nếu set nó về is_default = 0 thì sẽ báo lỗi
CREATE TRIGGER trg_RequireOneShippingAddressDefault
    ON shipping_addresses
    AFTER UPDATE
    AS
BEGIN
    IF EXISTS (SELECT 1
               FROM INSERTED i
                        INNER JOIN DELETED d ON i.id = d.id
               WHERE d.is_default = 1
                 AND i.is_default = 0)
        BEGIN
            RAISERROR ('Không thể thay đổi trạng thái mặc định của địa chỉ giao hàng.', 16, 1);
            ROLLBACK TRANSACTION;
        END
END;