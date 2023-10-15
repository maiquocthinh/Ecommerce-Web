using AutoMapper;
using Backend.DTOs;
using Backend.Models;

namespace Backend.Extensions;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Customer, CustomerProfileDto>();
    }
}