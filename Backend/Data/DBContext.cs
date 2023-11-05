using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace Backend.Data;

public partial class DBContext : DbContext
{
    public DBContext()
    {
    }

    public DBContext(DbContextOptions<DBContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<Brand> Brands { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Discount> Discounts { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Import> Imports { get; set; }

    public virtual DbSet<ImportShipment> ImportShipments { get; set; }

    public virtual DbSet<Need> Needs { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductVersion> ProductVersions { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<ReviewsReply> ReviewsReplies { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<ShippingAddress> ShippingAddresses { get; set; }

    public virtual DbSet<Supplier> Suppliers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Addresses");

            entity.ToTable("addresses");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Districts)
                .HasMaxLength(100)
                .HasColumnName("districts");
            entity.Property(e => e.Province)
                .HasMaxLength(100)
                .HasColumnName("province");
            entity.Property(e => e.SpecificAddress)
                .HasMaxLength(255)
                .HasColumnName("specific_address");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
            entity.Property(e => e.Wards)
                .HasMaxLength(100)
                .HasColumnName("wards");
        });

        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Brands");

            entity.ToTable("brands");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Carts");

            entity.ToTable("carts");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.ProductsVersionId).HasColumnName("products_version_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Customer).WithMany(p => p.Carts)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CartItem_Customer");

            entity.HasOne(d => d.ProductsVersion).WithMany(p => p.Carts)
                .HasForeignKey(d => d.ProductsVersionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CartItem_ProductVersion");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Categories");

            entity.ToTable("categories");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Customers");

            entity.ToTable("customers");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AvatarUrl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasDefaultValueSql("('https://i.imgur.com/Th0n214.jpg')")
                .HasColumnName("avatar_url");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DayOfBirth)
                .HasColumnType("smalldatetime")
                .HasColumnName("day_of_birth");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .HasColumnName("first_name");
            entity.Property(e => e.Gender).HasColumnName("gender");
            entity.Property(e => e.HashedPassword)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("hashed_password");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .HasColumnName("last_name");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone_number");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<Discount>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Discounts");

            entity.ToTable("discounts", tb =>
            {
                tb.HasTrigger("trg_CheckConcurrentDiscountsForProduct");
            });

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Active)
                .HasDefaultValueSql("((0))")
                .HasColumnName("active");
            entity.Property(e => e.DiscountPercent)
                .HasDefaultValueSql("((0.00))")
                .HasColumnType("decimal(3, 2)")
                .HasColumnName("discount_percent");
            entity.Property(e => e.EndDate)
                .HasColumnType("datetime")
                .HasColumnName("end_date");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.StartDate)
                .HasColumnType("datetime")
                .HasColumnName("start_date");

            entity.HasOne(d => d.Product).WithMany(p => p.Discounts)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Discount_Product");
        });
        
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Employees");

            entity.ToTable("employees");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Active).HasColumnName("active");
            entity.Property(e => e.AddressId).HasColumnName("address_id");
            entity.Property(e => e.AvatarUrl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasDefaultValueSql("('https://i.imgur.com/Th0n214.jpg')")
                .HasColumnName("avatar_url");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DayOfBirth)
                .HasColumnType("smalldatetime")
                .HasColumnName("day_of_birth");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .HasColumnName("first_name");
            entity.Property(e => e.Gender).HasColumnName("gender");
            entity.Property(e => e.HashedPassword)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("hashed_password");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .HasColumnName("last_name");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone_number");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Address).WithMany(p => p.Employees)
                .HasForeignKey(d => d.AddressId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Employee_Address");

            entity.HasOne(d => d.Role).WithMany(p => p.Employees)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Employee_Role");
        });

        modelBuilder.Entity<Import>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Imports");

            entity.ToTable("imports");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            entity.Property(e => e.SupplierId).HasColumnName("supplier_id");

            entity.HasOne(d => d.Employee).WithMany(p => p.Imports)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Import_Employee");

            entity.HasOne(d => d.Supplier).WithMany(p => p.Imports)
                .HasForeignKey(d => d.SupplierId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Import_Supplier");
        });

        modelBuilder.Entity<ImportShipment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ImportShipments");

            entity.ToTable("import_shipments", tb =>
            {
                tb.HasTrigger("trg_SetRemainingAndInventoryOnInsert");
            });

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Cost).HasColumnName("cost");
            entity.Property(e => e.ImportId).HasColumnName("import_id");
            entity.Property(e => e.ProductVersionId).HasColumnName("product_version_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.Remaining).HasColumnName("remaining");

            entity.HasOne(d => d.Import).WithMany(p => p.ImportShipments)
                .HasForeignKey(d => d.ImportId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ImportShipment_Import");

            entity.HasOne(d => d.ProductVersion).WithMany(p => p.ImportShipments)
                .HasForeignKey(d => d.ProductVersionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ImportShipment_ProductVersion");
        });

        modelBuilder.Entity<Need>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Needs");

            entity.ToTable("needs");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Orders");

            entity.ToTable("orders", tb =>
            {
                tb.HasTrigger("trg_PreventUpdateOrderStatus");
                tb.HasTrigger("trg_UpdateInventoryOnOrderCancel");
            });

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone_number");
            entity.Property(e => e.RecipientName)
                .HasMaxLength(255)
                .HasColumnName("recipient_name");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasDefaultValueSql("('processing')")
                .HasColumnName("status");
            entity.Property(e => e.TotalPrice).HasColumnName("total_price");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK_Order_Customer");

            entity.HasOne(d => d.Employee).WithMany(p => p.Orders)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Order_Employee");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_OrderDetails");

            entity.ToTable("order_details", tb =>
            {
                tb.HasTrigger("trg_DecreaseProductInventory");
            });

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.ImportShipmentId).HasColumnName("import_shipment_id");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.OriginPrice).HasColumnName("origin_price");
            entity.Property(e => e.ProductVersionId).HasColumnName("product_version_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");

            entity.HasOne(d => d.ImportShipment).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.ImportShipmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrderDetail_ImportShipment");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrderDetail_Order");

            entity.HasOne(d => d.ProductVersion).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.ProductVersionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrderDetail_ProductVersion");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Products");

            entity.ToTable("products", tb =>
            {
                tb.HasTrigger("trg_CheckViewableOnProductUpdate");
            });

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BrandId).HasColumnName("brand_id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("image_url");
            entity.Property(e => e.Description)
                .HasMaxLength(1000)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.NeedId).HasColumnName("need_id");
            entity.Property(e => e.ReviewsScore)
                .HasColumnType("decimal(3, 2)")
                .HasColumnName("reviews_score");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
            entity.Property(e => e.Viewable).HasColumnName("viewable");
            entity.Property(e => e.Warranty)
                .HasMaxLength(255)
                .HasColumnName("warranty");

            entity.HasOne(d => d.Brand).WithMany(p => p.Products)
                .HasForeignKey(d => d.BrandId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Product_Brand");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Product_Category");

            entity.HasOne(d => d.Need).WithMany(p => p.Products)
                .HasForeignKey(d => d.NeedId)
                .HasConstraintName("FK_Product_Need");
        });

        modelBuilder.Entity<ProductVersion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ProductVersions");

            entity.ToTable("product_versions");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Color)
                .HasMaxLength(100)
                .HasColumnName("color");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("image_url");
            entity.Property(e => e.Inventory).HasColumnName("inventory");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductVersions)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_ProductVersion_Product");

            entity.OwnsOne(e => e.Specifications, builder =>
            {
                builder.ToJson("specifications");
            });

        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_RefreshTokens");

            entity.ToTable("refresh_tokens");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            entity.Property(e => e.ExpiresAt)
                .HasColumnType("datetime")
                .HasColumnName("expires_at");
            entity.Property(e => e.Revoked).HasColumnName("revoked");
            entity.Property(e => e.Token)
                .HasMaxLength(300)
                .HasColumnName("token");

            entity.HasOne(d => d.Employee).WithMany(p => p.RefreshTokens)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RefreshToken_Employee");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Reviews");

            entity.ToTable("reviews");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Content)
                .HasMaxLength(500)
                .HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.ProductVersionId).HasColumnName("product_version_id");
            entity.Property(e => e.Score)
                .HasColumnType("tinyint")
                .HasColumnName("score");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Customer).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Review_Customer");

            entity.HasOne(d => d.ProductVersion).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.ProductVersionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Review_ProductVersion");
        });

        modelBuilder.Entity<ReviewsReply>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ReviewsReply");

            entity.ToTable("reviews_reply");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Content)
                .HasMaxLength(500)
                .HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            entity.Property(e => e.ReviewsId).HasColumnName("reviews_id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Employee).WithMany(p => p.ReviewsReplies)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReviewReply_Employee");

            entity.HasOne(d => d.Reviews).WithMany(p => p.ReviewsReplies)
                .HasForeignKey(d => d.ReviewsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReviewReply_Review");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Roles");

            entity.ToTable("roles");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Permissions)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasDefaultValueSql("('[]')")
                .HasColumnName("permissions");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });
        
        modelBuilder.Entity<ShippingAddress>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ShippingAddresses");

            entity.ToTable("shipping_addresses", tb =>
            {
                tb.HasTrigger("trg_ShippingAddressDefault");
                tb.HasTrigger("trg_RequireOneShippingAddressDefault");
                tb.HasTrigger("trg_PreventShippingAddressDefaultDeletion");
            });

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AddressId).HasColumnName("address_id");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.IsDefault)
                .HasDefaultValueSql("((0))")
                .HasColumnName("is_default");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone_number");
            entity.Property(e => e.RecipientName)
                .HasMaxLength(255)
                .HasColumnName("recipient_name");

            entity.HasOne(d => d.Address).WithMany(p => p.ShippingAddresses)
                .HasForeignKey(d => d.AddressId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ShippingAddress_Address");

            entity.HasOne(d => d.Customer).WithMany(p => p.ShippingAddresses)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ShippingAddress_Customer");
        });

        modelBuilder.Entity<Supplier>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Suppliers");

            entity.ToTable("suppliers");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AddressId).HasColumnName("address_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone_number");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Address).WithMany(p => p.Suppliers)
                .HasForeignKey(d => d.AddressId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Supplier_Address");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
