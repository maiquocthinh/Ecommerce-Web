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
    }
}