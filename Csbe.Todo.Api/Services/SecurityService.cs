using System.Security.Cryptography;
using System;
using System.Text;

namespace Csbe.Todo.Api.Services
{
    public static class SecurityService
    {
        //auth
        public static bool CanAuthenticate(byte[] userPassword, byte[] storedPassword)
        {
            for(int i = 0; i < userPassword.Length; i++)
            {
                if (userPassword[i] != storedPassword[i]) return false;
            }
            return true;
        }    

        //Hash method
        public static byte[] HashPassword(byte[] passwordToHash)
        {
            byte[] hInput;
            byte[] hSalt = GetSalt();
            using(SHA256 sh = SHA256.Create())
            {
                hInput = sh.ComputeHash(passwordToHash);
            }
            int sizeofh = hInput.Length + 1;
            byte[] SaltedPw = new byte[(hInput.Length + 1) + (hSalt.Length + 3)];
            Array.Copy(hInput,0, SaltedPw, 0,hInput.Length);
            Array.Copy(hSalt, 0, SaltedPw, hInput.Length, hSalt.Length);
            return SaltedPw;
        }
        //Method to generate pw with hash, salt is also byte and pepper
        public static string HashPasswordWithSalt(byte[] userPassword)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            var pbkdf2 = new Rfc2898DeriveBytes(userPassword,salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            string savedPasswordHash = Convert.ToBase64String(hashBytes);
            return savedPasswordHash;
        }
        
        public static byte[] GetSalt()
        {
            byte[] salt = new byte[16];
            return salt;
        }

        /*public static bool Verify(string pw, string hashedPassword) //add to salt to param. + Save salt in db to compare.
        {
            var splittedHashString = hashedPassword.Replace("AAAAAAAAAAAAAAAAAAAAAA==", "").Split('$');
            var iterations = int.Parse(splittedHashString[0]);
            var base64Hash = splittedHashString[1];

            var hashBytes = Convert.FromBase64String(base64Hash);
        }*/
    }        
}