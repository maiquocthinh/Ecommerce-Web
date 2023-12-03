using AutoMapper;
using Backend.DTOs;
using Backend.Models;

namespace Backend.Extensions;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Customer, CustomerProfileDto>();
        CreateMap<ShippingAddress, ShippingAddressDto>()
            .ForMember(dest => dest.SpecificAddress, otp => otp.MapFrom(src => src.Address.SpecificAddress))
            .ForMember(dest => dest.Wards, otp => otp.MapFrom(src => src.Address.Wards))
            .ForMember(dest => dest.Districts, otp => otp.MapFrom(src => src.Address.Districts))
            .ForMember(dest => dest.Province, otp => otp.MapFrom(src => src.Address.Province));
        CreateMap<ShippingAddressCreateDto, Address>();
        CreateMap<Specifications, SpecificationsOfLaptop>();
        CreateMap<Specifications, SpecificationsOfSmartPhone>();
        CreateMap<Category, CategoryDto>();
        CreateMap<Brand, BrandDto>();
        CreateMap<Need, NeedDto>();
        CreateMap<ProductCreateInputDto, Product>();
        CreateMap<ProductVersionCreateInputDto, ProductVersion>();
        CreateMap<Discount, DiscountDTO>()
            .ForMember(dest => dest.ProductName, otp => otp.MapFrom(src => src.Product.Name))
            .ForMember(dest => dest.IsExpired, otp => otp.MapFrom(src => src.EndDate < DateTime.Now));
        CreateMap<DiscountCreateInputDto, Discount>();
        CreateMap<AddressCreateInputDto, Address>();
        CreateMap<Employee, EmployeeShortDto>();
        CreateMap<Employee, EmployeeDetailDto>()
            .ForMember(dest => dest.Address, otp => otp.MapFrom(src => new AddressDto
            {
                SpecificAddress = src.Address.SpecificAddress,
                Wards = src.Address.Wards,
                Districts = src.Address.Districts,
                Province = src.Address.Province,
            }));
        CreateMap<Customer, CustomerShortDto>();
        CreateMap<Customer, CustomerDetailDto>();
        CreateMap<CustomerCreateInputDto, Customer>()
             .ForMember(dest => dest.HashedPassword, otp => otp.MapFrom(src => BCrypt.Net.BCrypt.HashPassword(src.Password)));
        CreateMap<CustomerUpdateInputDto, Customer>()
             .ForMember(dest => dest.HashedPassword, otp => otp.MapFrom(src => BCrypt.Net.BCrypt.HashPassword(src.Password)));
        CreateMap<CategoryCreateInputDto, Category>();
        CreateMap<BrandCreateInputDto, Brand>();
        CreateMap<NeedCreateInputDto, Need>();
        CreateMap<Supplier, SupplierTinyDto>();
        CreateMap<Supplier, SupplierDto>();
        CreateMap<Supplier, SupplierDetailDto>()
            .ForMember(dest => dest.Address, otp => otp.MapFrom(src => new AddressDto
            {
                SpecificAddress = src.Address.SpecificAddress,
                Wards = src.Address.Wards,
                Districts = src.Address.Districts,
                Province = src.Address.Province,
            }));
        CreateMap<Role, RoleTinyDto>();
        CreateMap<Role, RoleDto>();
        CreateMap<Role, RoleDetailDto>()
            .ForMember(dest => dest.Permissions, otp => otp.MapFrom(src => src.PermissionList));
        CreateMap<Import, ImportDto>()
            .ForMember(dest => dest.Employee, otp => otp.MapFrom(src => $"{src.Employee.LastName} {src.Employee.FirstName}"))
            .ForMember(dest => dest.Supplier, otp => otp.MapFrom(src => src.Supplier.Name))
            .ForMember(dest => dest.TotalAmount, otp => otp.MapFrom(src => src.ImportShipments.Sum(ishp => ishp.Cost)));
        CreateMap<Import, ImportDetailDto>()
            .ForMember(dest => dest.Employee, otp => otp.MapFrom(src => $"{src.Employee.LastName} {src.Employee.FirstName}"))
            .ForMember(dest => dest.Supplier, otp => otp.MapFrom(src => src.Supplier.Name))
            .ForMember(dest => dest.TotalAmount, otp => otp.MapFrom(src => src.ImportShipments.Sum(ishp => ishp.Cost)))
            .ForMember(dest => dest.ImportShipments, otp => otp.MapFrom(src => src.ImportShipments.Select(ishp => new ImportShipmentDto
            {
                Id = ishp.Id,
                ProductVersionName = ishp.ProductVersion.Name, 
                Cost = ishp.Cost,
                Quantity = ishp.Quantity,
            })));
        CreateMap<ImportShipment, ImportShipmentDto>()
            .ForMember(dest => dest.ProductVersionName, otp => otp.MapFrom(src => src.ProductVersion.Name));

    }
}