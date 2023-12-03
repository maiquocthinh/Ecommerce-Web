using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.DTOs;

//Input Dto
public class ReviewInputDto
{
    public int ProductVersionId { get; set; }

    public string Content { get; set; }

    public byte Score { get; set; }

}

public class ReviewFilterDto
{
    public bool? IsReply { get; set; } = null;

    public decimal? MinScore { get; set; } = null;

    public decimal? MaxScore { get; set; } = null;

    public DateTime? StartDate { get; set; } = null;

    public DateTime? EndDate { get; set; } = null;
}

public class ReviewReplyInputDto
{
    [Required(ErrorMessage = "Content is required")]
    public string Content { get; set; }
}

//Output Dto

public class AllReviewOfProductDto
{
    public IEnumerable<ReviewDto> Reviews { get; set; }
    public int TotalReview { get; set; }
    public decimal AveraegScore { get; set; }
}

public class ReviewTinyDto
{
    public int Id { get; set; }
    public string Content { get; set; }
    public byte Score { get; set; }
    public string ProductVersionName { get; set; }
    public string ProductVersionImgUrl { get; set; }
    public string Fullname { get; set; }
    public string AvatarUrl { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class ReviewDto: ReviewTinyDto
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public ReviewReplyDto? Reply { get; set; }
}

public class ReviewReplyDto
{
    public int Id { get; set; }
    public string Content { get; set; }
    public string Fullname { get; set; }
    public string AvatarUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}