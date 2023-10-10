using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Common.Exceptions;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Infrastructure.Jwt;

public class JwtUtil
{
    private readonly string _secretKey;
    private readonly string _issuer;
    private readonly string _audience;

    public JwtUtil(IConfiguration configuration)
    {
        _secretKey = configuration["Jwt:Key"] ?? string.Empty;
        _issuer = configuration["Jwt:Issuer"] ?? string.Empty;
        _audience = configuration["Jwt:Audience"] ?? string.Empty;
    }

    public string GenerateToken(IEnumerable<Claim> claims, string expiredIn)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_secretKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.Add(ParseTimeSpan(expiredIn)),
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Audience = _audience,
            Issuer = _issuer,
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public List<Claim>? ValidateToken(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);

            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = _issuer,
                ValidateAudience = true,
                ValidAudience = _audience,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ClockSkew = TimeSpan.Zero,
            }, out var validatedToken);

            var jwtSecurityToken = validatedToken as JwtSecurityToken;
            return jwtSecurityToken?.Claims?.ToList();
        }
        catch (Exception e)
        {
            throw e is SecurityTokenExpiredException
                ? new UnauthorizedException("Refresh Token Expired")
                : new UnauthorizedException("Refresh Token Invalid");
        }
    }
    
    private static TimeSpan ParseTimeSpan(string input)
    {
        // Kiểm tra và trích xuất giá trị số và đơn vị thời gian
        int value = int.Parse(input.Substring(0, input.Length - 1));
        char unit = input[input.Length - 1];

        // Dựa vào đơn vị thời gian, tạo TimeSpan tương ứng
        switch (unit)
        {
            case 'd':
                return TimeSpan.FromDays(value);
            case 'h':
                return TimeSpan.FromHours(value);
            case 'm':
                return TimeSpan.FromMinutes(value);
            case 's':
                return TimeSpan.FromSeconds(value);
            default:
                throw new ArgumentException("Invalid time unit");
        }
    }
}