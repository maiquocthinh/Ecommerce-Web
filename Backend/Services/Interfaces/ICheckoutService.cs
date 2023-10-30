using Backend.DTOs;

namespace Backend.Services.Interfaces;

public interface ICheckoutService
{
    Task<CheckoutSuccessDto> CheckoutWithCartItems(CheckoutWithCartItemsInputDto checkoutInput);
    Task<CheckoutSuccessDto> CheckoutWithProducts(CheckoutInputDto checkoutInput);
}