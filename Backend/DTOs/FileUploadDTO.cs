using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

// Input Dto
public class ImageUploadDto
{
    [Url(ErrorMessage = "Invalid URL format.")]
    public string? ImageUrl { get; set; }

    [ImageFileValidation(ErrorMessage = "Please provide a valid image file.")]
    public IFormFile? ImageFile { get; set; }

    public string? Filename { get; set; }
}

// custom Attribute
public class ImageFileValidationAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var file = value as IFormFile;
        if (file != null && (file.Length == 0 || !IsImageFile(file.ContentType)))
        {
            return new ValidationResult(ErrorMessage);
        }

        return ValidationResult.Success;
    }

    private bool IsImageFile(string contentType)
    {
        return contentType.StartsWith("image/");
    }
}