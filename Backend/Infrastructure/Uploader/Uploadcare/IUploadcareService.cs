namespace Backend.Infrastructure.Uploader.Uploadcare;

public interface IUploadcareService
{
    Task<string> UploadImageFromFileAsync(byte[] imageBytes, string fileName);
    Task<string> UploadImageFromFileAsync(string imagePath, string? fileName);
    Task<string> UploadImageFromUrlAsync(string imageUrl, string? fileName);
}
