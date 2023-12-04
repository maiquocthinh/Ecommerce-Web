using Backend.Data;
using Backend.DTOs;
using Backend.Infrastructure.Uploader.Uploadcare;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/upload")]
public class UploadController : BaseController
{
    private readonly IUploadcareService _uploadcareService;

    public UploadController(IUploadcareService uploadcareService)
    {
        _uploadcareService = uploadcareService;
    }
    [AllowAnonymous]
    [HttpPost("image/single")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<string>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> UploadSingleImage([FromForm] ImageUploadDto uploadDto)
    {
        string imageUrl;

        if (!string.IsNullOrEmpty(uploadDto.ImageUrl))
        {
            imageUrl = await _uploadcareService.UploadImageFromUrlAsync(uploadDto.ImageUrl, uploadDto.Filename);
        }
        else if (uploadDto.ImageFile != null)
        {
            string fileName = uploadDto.ImageFile.FileName;

            using (var memoryStream = new MemoryStream())
            {
                await uploadDto.ImageFile.CopyToAsync(memoryStream);
                byte[] imageBytes = memoryStream.ToArray();
                imageUrl = await _uploadcareService.UploadImageFromFileAsync(imageBytes, uploadDto.Filename ?? fileName);
            }
        }
        else
        {
            throw new BadHttpRequestException("Invalid request. Please provide either an image URL or file.");
        }

        return Ok(RenderSuccessResponse(data: imageUrl, message: "Image uploaded success."));
    }
}
