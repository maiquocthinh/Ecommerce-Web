namespace Backend.Extensions;

public static class CorsExtension
{
    public static IApplicationBuilder UseCustomCors(this IApplicationBuilder applicationBuilder,
        IConfiguration configuration)
    {
        applicationBuilder.UseCors(corsPolicyBuilder =>
        {
            var allowedOrigins = configuration.GetSection("CorsPolicy:AllowedOrigins").Get<string[]>() ??
                                 Array.Empty<string>();
            var allowedMethods = configuration.GetSection("CorsPolicy:AllowedMethods").Get<string[]>() ??
                                 Array.Empty<string>();
            var allowedHeaders = configuration.GetSection("CorsPolicy:AllowedHeaders").Get<string[]>() ??
                                 Array.Empty<string>();

            corsPolicyBuilder.WithOrigins(allowedOrigins)
                .WithMethods(allowedMethods)
                .WithHeaders(allowedHeaders);
        });

        return applicationBuilder;
    }
}