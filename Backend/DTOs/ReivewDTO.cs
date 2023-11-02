using Backend.Models;

namespace Backend.DTOs;

//Input Dto
public class ReviewInputDto
{
    public int ProductVersionId { get; set; }

    public string Content { get; set; } 

    public byte Score { get; set; }

}

//Output Dto

public class AllReviewOfProductDto
{
    public IEnumerable<ReviewOfProductDto> Reviews { get; set; }
    public int TotalReview {  get; set; }
    public decimal AveraegScore { get; set; }
}

public class ReviewOfProductDto
{
    public int Id { get; set; }
    public string Content { get; set; }
    public byte Score { get; set; } 
    public string ProductVersionName{ get; set; }
    public ReviewReplyDto? Reply { get; set; }
}

public class ReviewReplyDto
{
    public int Id { get; set; }
    public string Content { get; set; }
}