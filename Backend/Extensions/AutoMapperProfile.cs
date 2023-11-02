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
    }
}