

using DataAccess.Entities;
using Microsoft.AspNetCore.Identity;
using static API.DTO.DTOs;
using System;
using DataAccess;

namespace API.Service
{
    public class AuthService
    {
        private readonly Context _context;
        private readonly JwtService _jwtService;

        public AuthService(Context context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        public async Task<string> RegisterAsync(RegisterDto model)
        {
            if (_context.Users.Any(u => u.Email == model.Email))
            {
                throw new Exception("User already exists.");
            }

            var hasher = new PasswordHasher<User>();
            var user = new User
            {
                FullName = model.FullName,
                Email = model.Email,
                PasswordHash = hasher.HashPassword(null, model.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return _jwtService.GenerateToken(user);
        }

        public async Task<string> LoginAsync(LoginDto model)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email);
            if (user == null) throw new Exception("Invalid credentials");

            var hasher = new PasswordHasher<User>();
            var result = hasher.VerifyHashedPassword(null, user.PasswordHash, model.Password);

            if (result == PasswordVerificationResult.Failed)
            {
                throw new Exception("Invalid credentials");
            }

            return _jwtService.GenerateToken(user);
        }
    }
}
