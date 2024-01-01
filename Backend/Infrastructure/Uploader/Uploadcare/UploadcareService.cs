using Backend.Common.Exceptions;
using Newtonsoft.Json.Linq;

namespace Backend.Infrastructure.Uploader.Uploadcare;

public class UploadcareService : IUploadcareService
{
    private readonly string _publicKey;
    private readonly HttpClient _httpClient;

    public UploadcareService(IConfiguration configuration, HttpClient httpClient)
    {
        _publicKey = configuration["Uploadcare:PublicKey"] ?? string.Empty;
        _httpClient = httpClient;
    }

    public async Task<string> UploadImageFromFileAsync(string imagePath, string? fileName)
    {
        byte[] imageBytes = await File.ReadAllBytesAsync(imagePath);
        fileName = fileName ?? Path.GetFileName(imagePath);
        return await UploadImageFromFileAsync(imageBytes, fileName);
    }

    public async Task<string> UploadImageFromFileAsync(byte[] imageBytes, string fileName)
    {
        try
        {
            string uploadUrl = "https://upload.uploadcare.com/base/";

            using (var formData = new MultipartFormDataContent())
            {
                formData.Add(new StringContent(_publicKey), "UPLOADCARE_PUB_KEY");
                formData.Add(new StringContent("auto"), "UPLOADCARE_STORE");
                formData.Add(new ByteArrayContent(imageBytes), "file", fileName);

                var response = await _httpClient.PostAsync(uploadUrl, formData);

                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    JObject json = JObject.Parse(responseData);
                    string fileId = ((Newtonsoft.Json.Linq.JValue)json["file"])?.Value?.ToString();
                    return GetImageUrl(fileId);
                }
                else
                {
                    throw new InternalServerException("Upload failed. Status code: " + response.StatusCode);
                }
            }
        }
        catch (Exception ex)
        {
            throw new InternalServerException("An error occurred: " + ex.Message);
        }
    }

    public async Task<string> UploadImageFromUrlAsync(string imageUrl, string? fileName)
    {
        try
        {
            string uploadUrl = "https://upload.uploadcare.com/from_url/";

            using (var formData = new MultipartFormDataContent())
            {
                formData.Add(new StringContent(_publicKey), "pub_key");
                formData.Add(new StringContent("auto"), "store");
                formData.Add(new StringContent(imageUrl), "source_url");
                if (fileName != null) formData.Add(new StringContent(fileName), "filename");

                var response = await _httpClient.PostAsync(uploadUrl, formData);

                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    JObject json = JObject.Parse(responseData);
                    string token = ((Newtonsoft.Json.Linq.JValue)json["token"])?.Value?.ToString(); ;
                    string fileId = await GetFileIdByTokensAsync(token);
                    return GetImageUrl(fileId);
                }
                else
                {
                    throw new InternalServerException("Upload failed. Status code: " + response.StatusCode);
                }
            }
        }
        catch (Exception ex)
        {
            throw new InternalServerException("An error occurred: " + ex.Message);
        }
    }

    private async Task<string> GetFileIdByTokensAsync(string token)
    {
        try
        {
            string statusUrl = $"https://upload.uploadcare.com/from_url/status/?token={token}";
            var response = await _httpClient.GetStringAsync(statusUrl);

            if (!string.IsNullOrEmpty(response))
            {
                JObject json = JObject.Parse(response);
                string? status = ((JValue)json["status"])?.Value?.ToString();
                string? fileId = ((JValue)json["file_id"])?.Value?.ToString();

                if (status == "success" && fileId != null)
                {
                    return fileId;
                }
                else if (status == "failed")
                {
                    throw new InternalServerException("Upload from URL failed.");
                }
                else
                {
                    throw new InternalServerException("Upload still in progress. Check again later.");
                }
            }
            else
            {
                throw new InternalServerException("Failed to retrieve file details.");
            }
        }
        catch (Exception ex)
        {
            throw new InternalServerException("An error occurred while getting file details: " + ex.Message);
        }
    }

    private static string GetImageUrl(string fileId)
    {
        return $"https://ucarecdn.com/{fileId}/-/preview/1024x1024/-/quality/smart_retina/-/format/auto/";
    }

}
